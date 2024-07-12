import type { Update } from "./update";

export type Opportunity = {
  id: number;
  company: string;
  role: string;
  notes: string;
  created: Date;
}

export type OpportunityWithUpdate = Opportunity & { lastUpdate: Update };

export type SortOption = 'company' | 'oldest' | 'newest' | 'activity';

function sortByCompany(a: Opportunity, b: Opportunity) {
  if (a.company > b.company) {
    return 1;
  }
  if (a.company < b.company) {
    return -1;
  }
  return 0;
}
function sortByOldest(a: Opportunity, b: Opportunity) {
  // Oldest, so we want smaller numbers to come first and invert the comparison.
  return a.created.valueOf() - b.created.valueOf();
}
function sortByNewest(a: Opportunity, b: Opportunity) {
  // Newest, so we want bigger numbers to come first.
  return b.created.valueOf() - a.created.valueOf();
}
function sortByActivity(a: OpportunityWithUpdate, b: OpportunityWithUpdate) {
  return b.lastUpdate.created.valueOf() - a.lastUpdate.created.valueOf();
}

export function getSortFunction(option: SortOption) {
  switch (option) {
    case 'company': return sortByCompany;
    case 'oldest': return sortByOldest;
    case 'newest': return sortByNewest;
    case 'activity':
    default:
      return sortByActivity;
  }
}