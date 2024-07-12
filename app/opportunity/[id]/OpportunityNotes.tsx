'use client';

import Button from "@/components/Button";
import LongTextInput from "@/components/LongTextInput";
import Markdown from "@/components/Markdown";
import { updateNotes } from "@/database/opportunity";
import type { Opportunity } from "@/model/opportunity";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export type Props = {
  opportunity: Opportunity;
};

export default function OpportunityNotes({ opportunity }: Props) {
  const router = useRouter();
  const [notes, setNotes] = useState(opportunity.notes);
  const [isEditing, setIsEditing] = useState(false);

  const saveNotes = useCallback(() => {
    setIsEditing(false);
    updateNotes(opportunity.id, notes);
  }, [opportunity, notes]);

  if (!isEditing) {
    return <div className="max-h-40 overflow-scroll" onClick={() => setIsEditing(true)}>
      <Markdown text={notes} />
    </div>;
  }

  return <div>
    <LongTextInput value={notes} onChange={e => setNotes(e.target.value)} className="h-40"/>
    <Button onClick={saveNotes}>Save</Button>
  </div>;
}