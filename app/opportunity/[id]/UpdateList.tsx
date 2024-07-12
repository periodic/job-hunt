'use client';

import Button from "@/components/Button";
import Note from "@/components/Note";
import StatePill from "@/components/StatePill";
import Timestamp from "@/components/Timestamp";
import type { Update } from "@/model/update";
import { useState } from "react";

export type Props = {
  updates: Update[];
};

export default function UpdateList({ updates }: Props) {
  const [showAll, setShowAll] = useState(false);

  const visibleUpdates =
    showAll
      ? updates
      : updates.slice(-3);

  return <div>
    {updates.length > 3 &&
      <a
        className="border-b border-dotted text-cyan-700 border-cyan-700 cursor-pointer"
        onClick={e => { setShowAll(!showAll); e.preventDefault(); }}>
        {showAll ? 'Hide old' : `Show ${updates.length - 3} older`}
      </a>
    }
    {
      visibleUpdates.map(update =>
        <div key={update.id} className="my-4">
          <div className="flex flex-row gap-4 items-center">
            <StatePill state={update.state} />
          </div>
          <Note text={update.notes} />
          <Timestamp timestamp={update.created} />
        </div>
      )
    }
  </div>;
}