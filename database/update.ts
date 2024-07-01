import type { Update } from "@/model/update";
import { client } from "./client";
import type { OpportunityState } from "@/model/opportunity-state";

const updates = () =>
  client<Update>('update');

const fixDates = (update: Update) => ({ ...update, created: new Date(update.created) })

export const latestUpdate = () =>
  updates()
    .orderBy('created', 'desc')
    .limit(1);

export const getUpdates = (opportunityId: number): Promise<Update[]> =>
  updates()
    .select('*')
    .where('opportunity_id', opportunityId)
    .then(updates => updates.map(fixDates));

export const createUpdate = async (opportunityId: number, state: OpportunityState, notes: string): Promise<number> =>
  updates()
    .insert({
      opportunity_id: opportunityId,
      state,
      notes,
      created: new Date()
    })
    .returning('id');