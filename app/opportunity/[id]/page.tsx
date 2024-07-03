import PageTitle from "@/components/PageTitle";
import { getOpportunity } from "@/database/opportunity";
import { getUpdates } from "@/database/update";
import UpdateList from "./UpdateList";
import AddUpdateForm from "./AddUpdateForm";

export type Props = {
  params: { id: string };
};

export default async function OpportunityDetails({params}: Props) {
  const opportunityId = parseInt(params.id, 10);
  const opportunity = await getOpportunity(opportunityId);
  const updates = await getUpdates(opportunityId);

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
      <AddUpdateForm opportunityId={opportunityId}/>
    </div>
  </div>
}