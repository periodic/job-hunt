export const terminalStates = [
  'offer-accepted',
  'offer-rejected',
  'rejected',
  'ghosted',
] as const;

export const openStates = [
  'inbound',
  'outbound',
  'scheduling',
  'scheduled', // Deprecated
  'interview',
  'awaiting-response',
  'assignment',
  'reference-check',
  'offer',
] as const;

export const opportunityStates = [
  ...openStates,
  ...terminalStates,
] as const;

export type OpportunityState = typeof opportunityStates[number];

export const isValidState = (state: unknown): state is OpportunityState =>
  opportunityStates.includes(state as OpportunityState);

/** Tests if a state is terminal and should close the opportunity */
export const isTerminalState = (state: OpportunityState) =>
  (terminalStates as readonly OpportunityState[]).includes(state);