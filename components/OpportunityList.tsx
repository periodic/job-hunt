'use client';

import type { OpportunityWithUpdate } from "@/model/opportunity";
import { getSortFunction, type SortOption } from "@/model/opportunity";
import { isTerminalState } from "@/model/opportunity-state";
import Link from "next/link";
import { useState } from "react";
import ButtonLink from "./ButtonLink";
import Note from "./Note";
import Select from "./Select";
import StatePill from "./StatePill";
import Timestamp from "./Timestamp";

export type Props = {
  opportunities: Array<OpportunityWithUpdate>;
};

export default function OpportunityList({ opportunities }: Props) {
  const [filter, setFilter] = useState<'open' | 'closed' | 'all'>('open');
  const [sort, setSort] = useState<SortOption>('activity');

  const sortFn = getSortFunction(sort);

  const visibleOpportunities = opportunities
    .filter(opportunity =>
      (filter === 'open' && !isTerminalState(opportunity.lastUpdate.state))
      || (filter === 'closed' && isTerminalState(opportunity.lastUpdate.state))
      || filter === 'all'
    )
    .sort(sortFn);

  return <div>
    <div className="flex flex-row items-center w-full justify-between mb-4">
      <div className="flex flex-row items-center gap-2">
        <Select
          value={filter}
          onChange={(e) => setFilter(e)}
          items={{
            open: "Open",
            closed: "Closed",
            all: "All",
          }}
        />
        <Select
          value={sort}
          onChange={setSort}
          items={{
            activity: "Activity",
            company: "Company",
            newest: "Newest",
            oldest: "Oldest",
          }}
        />
      </div>
      <div>
        <ButtonLink href="opportunity/create">New Opportunity</ButtonLink>
      </div>
    </div>
    {
      visibleOpportunities.map(opportunity =>
        <div key={opportunity.id} className="my-4 flex flex-row gap-4 items-start">
          <div>
            <StatePill state={opportunity.lastUpdate.state} className="w-24" />
          </div>
          <div>
            <div className="flex flex-row gap-4 items-baseline">
              <Link
                className="text-xl font-bold"
                href={`/opportunity/${opportunity.id}`}>
                {opportunity.role} @ {opportunity.company}
              </Link>
            </div>
            <Note text={opportunity.lastUpdate.notes} />
            <Timestamp timestamp={opportunity.lastUpdate.created} />
          </div>
        </div>
      )
    }
  </div>;
}