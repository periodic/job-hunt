import Button from "@/components/Button";
import FormRow from "@/components/FormRow";
import LongTextInput from "@/components/LongTextInput";
import PageTitle from "@/components/PageTitle";
import StateSelector from "@/components/StateSelector";
import { getOpportunity } from "@/database/opportunity";
import { createUpdate, getUpdates } from "@/database/update";
import { isValidState, type OpportunityState } from "@/model/opportunity-state";
import { redirect } from "next/navigation";
import UpdateList from "./UpdateList";

export type Props = {
  params: { id: string };
};

export default async function OpportunityDetails({params}: Props) {
  const opportunityId = parseInt(params.id, 10);
  const opportunity = await getOpportunity(opportunityId);
  const updates = await getUpdates(opportunityId);

  async function addUpdate(formData: FormData) {
    "use server"
    const state = formData.get('state');
    const notes = formData.get('notes') || '';

    if (!isValidState(state)) {
      throw new Error(`Invalid state transition: ${state}`);
    }

    if (typeof notes !== 'string'
    ) {
      throw new Error(`Got file data from form when only strings are expected.`)
    }
    
    await createUpdate(opportunityId, state, notes);

    redirect(`/opportunity/${opportunityId}`);
  }

  return <div>
    <PageTitle>
      {opportunity.role} @ {opportunity.company}
    </PageTitle>

    <p>
      {opportunity.notes}
    </p>

    <UpdateList updates={updates} />

    <div>
      <h2>Update</h2>
      <form action={addUpdate}>
        <FormRow name="state" label="New State"><StateSelector name="state" /></FormRow>
        <FormRow name="notes" label="Notes"><LongTextInput name="notes" /></FormRow>
        <Button type="submit">Add Update</Button>
      </form>
    </div>
  </div>
}