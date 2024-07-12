'use client';
import Button from "@/components/Button";
import FormRow from "@/components/FormRow";
import LongTextInput from "@/components/LongTextInput";
import PageTitle from "@/components/PageTitle";
import ShortTextInput from "@/components/ShortTextInput";
import StateSelector from "@/components/StateSelector";
import { createOpportunity, type ActionErrors } from "./action";
import { useFormState } from "react-dom";

const initialState: ActionErrors = {};

export default function CreateOpportunity() {
  const [errors, formAction] = useFormState(createOpportunity, initialState);
  return <div>
    <PageTitle>Create New Opportunity</PageTitle>
    <div>
      <form action={formAction}>
        <FormRow name="company" label="Company">
          <ShortTextInput name="company" />
          {errors.company && <p>{errors.company}</p>}
        </FormRow>
        <FormRow name="role" label="Role">
          <ShortTextInput name="role" />
          {errors.role && <p>{errors.role}</p>}
        </FormRow>
        <FormRow name="state" label="Initial State">
          <StateSelector name="state" />
          {errors.state && <p>{errors.state}</p>}
        </FormRow>
        <FormRow name="notes" label="Notes">
          <LongTextInput name="notes" />
          {errors.notes && <p>{errors.notes}</p>}
        </FormRow>
        <div>
          <Button type="submit">
            Create Opportunity
          </Button>
        </div>
      </form>
    </div>
  </div>;
}