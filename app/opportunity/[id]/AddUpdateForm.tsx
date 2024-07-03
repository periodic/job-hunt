'use client'
import Button from "@/components/Button";
import FormRow from "@/components/FormRow";
import LongTextInput from "@/components/LongTextInput";
import StateSelector from "@/components/StateSelector";
import { addUpdate } from "./action";
import { useFormState } from "react-dom";

export type Props = {
  opportunityId: number;
}

export default function AddUpdateForm({ opportunityId }: Props) {
  const [errors, formAction] = useFormState(addUpdate.bind(null, opportunityId), {})

  return <form action={formAction}>
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