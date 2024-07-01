import { opportunityStates } from "@/model/opportunity-state";
import type { HTMLProps } from "react";

export default function StateSelector(props: HTMLProps<HTMLSelectElement>) {
  return <select
    className="border border-slate-300 text-slate-100 bg-slate-800 w-40 p-2"
    {...props}
    >
      {
        opportunityStates.map(state => 
          <option key={state}>{state}</option>
        )
      }
    </select>
}