import { type OpportunityState } from "@/model/opportunity-state"

export type Props = {
  state: OpportunityState;
  className?: string;
}

const colors = (state: OpportunityState) => {
  switch (state) {
    // Early interaction
    case 'inbound':
    case 'outbound':
      return 'bg-yellow-200 text-gray-950'
      
    // Moving along
    case 'inbound':
    case 'interview':
    case 'assignment':
      return 'bg-orange-200 text-gray-950'

    // Good outcomes!
    case 'offer':
      return 'bg-green-200 text-gray-950'
    case 'offer-accepted':
      return 'bg-green-400 text-gray-600'

    // Negative outcomes to close the opportunity
    case 'rejected':
    case 'ghosted':
    case 'offer-rejected':
      return 'bg-gray-200 text-gray-600'

    // Waiting
    case 'scheduled':
    case 'reference-check':
    case 'awaiting-response':
    default:
      return 'bg-blue-200 text-gray-950'
  }
}

export default function StatePill({state, className}: Props) {
  return <span
    className={`rounded-full px-2 inline-block text-center ${colors(state)} ${className}`}>
      {state || "Unknown"}
    </span>;
}