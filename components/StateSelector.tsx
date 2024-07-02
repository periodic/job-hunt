import { opportunityStates, type OpportunityState } from "@/model/opportunity-state";
import Select from "./Select";

const opportunityItems =
  Object.fromEntries(opportunityStates.map(val => [val, val])) as Record<OpportunityState, string>

export type Props = {
  name?: string;
  value?: OpportunityState;
  onChange?: (state: OpportunityState) => void;
}

export default function StateSelector(props: Props) {
  return <Select items={opportunityItems} {...props} />;
}