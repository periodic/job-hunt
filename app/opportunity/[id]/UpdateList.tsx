'use client'

import Button from "@/components/Button";
import Note from "@/components/Note";
import StatePill from "@/components/StatePill";
import Timestamp from "@/components/Timestamp";
import type { Update } from "@/model/update"
import { useState } from "react";

export type Props = {
  updates: Update[];
}

export default function UpdateList({ updates }: Props) {
  const [showAll, setShowAll] = useState(false);

  const visibleUpdates =
    showAll
      ? updates
      : updates.slice(-3);

  return <div>
    { updates.length > 3 &&
      <Button onClick={() => setShowAll(!showAll)}>
        { showAll ? 'Hide Old' : 'Show All'}
      </Button>
    }
    {
      visibleUpdates.map(update => 
        <div key={update.id} className="my-2">
          <div className="flex flex-row gap-4 items-center">
            <StatePill state={update.state} />
            <Timestamp timestamp={update.created} />
          </div>
          <Note>
            {update.notes}
          </Note>
        </div>
      )
    }
  </div> 
}