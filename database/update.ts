import type { Update } from "@/model/update";
import { makeClient } from "./client";
import type { OpportunityState } from "@/model/opportunity-state";

const updates = () =>
  makeClient<Update>('update');

const fixDates = (update: Update) => ({ ...update, created: new Date(update.created) })

export const latestUpdate = async () =>
  (await updates()).client
    .orderBy('created', 'desc')
    .limit(1);

export const getUpdates = async (opportunityId: number): Promise<Update[]> =>
  (await updates()).client
    .select('*')
    .where('opportunity_id', opportunityId)
    .then(updates => updates.map(fixDates));

export const createUpdate = async (opportunityId: number, state: OpportunityState, notes: string): Promise<number> =>
  (await updates()).client
    .insert({
      opportunity_id: opportunityId,
      state,
      notes,
      created: new Date()
    })
    .returning('id');