import Button from "@/components/Button";
import FormRow from "@/components/FormRow";
import LongTextInput from "@/components/LongTextInput";
import PageTitle from "@/components/PageTitle";
import ShortTextInput from "@/components/ShortTextInput";
import StateSelector from "@/components/StateSelector";
import { createOpportunity } from "@/database/opportunity";
import { isValidState } from "@/model/opportunity-state";
import { redirect } from "next/navigation";

export default function CreateOpportunity() {
  async function create(formData: FormData) {
    "use server"
    const company = formData.get('company');
    const role = formData.get('role');
    const state = formData.get('state');

    if (!role || role === ''
    || !company || company === ''
    || !state) {
      throw new Error(`Missing data on opportunity: ${JSON.stringify(formData.values())}`);
    }
    const notes = formData.get('notes') || '';

    if (typeof role !== 'string'
    || typeof company !== 'string'
    || typeof state !== 'string'
    || typeof notes !== 'string'
    ) {
      throw new Error(`Got file data from form when only strings are expected.`)
    }
    
    if (!isValidState(state)) {
      throw new Error(`Invalid state`)
    }

    const opportunityId = await createOpportunity(company, role, state, notes);
    console.log('Created Opportunity');

    redirect(`/opportunity/${opportunityId}`);
  }

  return <div>
    <PageTitle>Create New Opportunity</PageTitle>
    <div>
      <form action={create}>
        <FormRow name="company" label="Company">
          <ShortTextInput name="company" />
        </FormRow>
        <FormRow name="role" label="Role">
          <ShortTextInput name="role" />
        </FormRow>
        <FormRow name="state" label="Initial State">
          <StateSelector name="state" />
        </FormRow>
        <FormRow name="notes" label="Notes">
          <LongTextInput name="notes" />
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