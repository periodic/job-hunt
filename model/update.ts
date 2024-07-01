import type { OpportunityState } from "./opportunity-state";

export type Update = {
  id: number;
  opportunity_id: number;
  state: OpportunityState;
  notes: string;
  created: Date;
}