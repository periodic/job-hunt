'use client'

import type { Opportunity } from "@/model/opportunity"
import type { Update } from "@/model/update"
import Link from "next/link";
import StatePill from "./StatePill";
import Note from "./Note";
import Timestamp from "./Timestamp";
import ButtonLink from "./ButtonLink";
import { useState } from "react";
import { isTerminalState } from "@/model/opportunity-state";

export type Props = {
  opportunities: Array<Opportunity & { lastUpdate: Update }>;
}

export default function OpportunityList({ opportunities }: Props) {
  const [filter, setFilter] = useState<'open' | 'closed' | 'all'>('open');

  const visibleOpportunities =
    opportunities.filter(opportunity =>
      (filter === 'open' && !isTerminalState(opportunity.lastUpdate.state))
      || (filter === 'closed' && isTerminalState(opportunity.lastUpdate.state))
      || filter === 'all'
    );

  return <div>
    <div className="flex flex-row">
      <div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value='open'>Open</option>
          <option value='closed'>Closed</option>
          <option value='all'>All</option>
        </select>
      </div>
      <div>
        <ButtonLink href="opportunity/create">New Opportunity</ButtonLink>
      </div>
    </div>
    {
      visibleOpportunities.map(opportunity =>
        <div key={opportunity.id} className="my-2">
          <div className="flex flex-row gap-4 items-baseline">
            <Link
              className="text-xl font-bold"
              href={`/opportunity/${opportunity.id}`}>
              {opportunity.role} @ {opportunity.company}
            </Link>
            <StatePill state={opportunity.lastUpdate.state} />
          </div>
          <Note>{opportunity.lastUpdate.notes}</Note>
          <div>
            <Timestamp timestamp={opportunity.lastUpdate.created} />
          </div>
        </div>
      )
    }
  </div>;
}