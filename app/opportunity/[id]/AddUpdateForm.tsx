'use client'

import Button from "@/components/Button";
import FormRow from "@/components/FormRow";
import LongTextInput from "@/components/LongTextInput";
import StateSelector from "@/components/StateSelector";
import { useState } from "react";
import { useFormState } from "react-dom";
import { addUpdate } from "./action";

export type Props = {
  opportunityId: number;
}

export default function AddUpdateForm({ opportunityId }: Props) {
  const [key, setKey] = useState(0);
  const [errors, formAction] = useFormState((prevState: unknown, formData: FormData) => {
    setKey(key + 1);
    return addUpdate(opportunityId, prevState, formData);
  }, {})

  return <form action={formAction} key={key}>
    <FormRow name="state" label="New State">
      <StateSelector name="state" />
      { errors?.state && <p>{errors.state}</p>}
    </FormRow>
    <FormRow name="notes" label="Notes">
      <LongTextInput name="notes" />
      { errors?.notes && <p>{errors.notes}</p>}
    </FormRow>
    <Button type="submit">Add Update</Button>
  </form>;
}