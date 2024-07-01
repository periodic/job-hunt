import { openStates, type OpportunityState } from "@/model/opportunity-state";
import { client } from "./client";
import type { Opportunity } from "@/model/opportunity";
import { createUpdate, latestUpdate } from "./update";
import type { Update } from "@/model/update";

const opportunities = () =>
  client<Opportunity>('opportunity');

const fixDates = <T extends { created: number | Date }>(opportunity: T): T & { created: Date } => ({
  ...opportunity,
  created: new Date(opportunity.created)
});

export const getOpportunitiesWithLastUpdate = (): Promise<(Opportunity & { lastUpdate: Update })[]> => {
  const query = opportunities()
    .select({
      id: 'opportunity.id',
      company: 'opportunity.company',
      role: 'opportunity.role',
      notes: 'opportunity.notes',
      created: 'opportunity.created',
      updateId: 'update.id',
      updateState: 'update.state',
      updateNotes: 'update.notes',
      updateCreated: 'update.created',
    })
    .join('update', 'update.opportunity_id', 'opportunity.id')
    .leftJoin('update AS u2', function () {
      this.on('opportunity.id', 'u2.opportunity_id')
        .andOn('update.created', '<', 'u2.created')
    })
    .whereNull('u2.id')
    .orderBy('opportunity.created');

  return query
    .then(opportunities => opportunities.map(opportunity => ({
        ...fixDates(opportunity),
        lastUpdate: fixDates({
          id: opportunity.updateId,
          state: opportunity.updateState,
          created: opportunity.updateCreated,
          notes: opportunity.updateNotes,
        }),
    })));
  }

export const getOpportunity = (id: number): Promise<Opportunity> =>
  opportunities()
    .first('*')
    .where('id', id)
    .then(fixDates);

export const createOpportunity = async (company: string, role: string, state: OpportunityState, notes: string): Promise<number> => {
  const insertedIds = await opportunities()
    .insert({
      company,
      role,
      notes,
      created: new Date(),
    })
    .returning('id');

  const opportunityId = insertedIds[0]?.id;

  if (!opportunityId) {
    throw new Error('Unable to create new opportunity');
  }

  await createUpdate(opportunityId, state, notes);

  return opportunityId;
}