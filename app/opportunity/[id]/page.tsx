import PageTitle from "@/components/PageTitle";
import { getOpportunity } from "@/database/opportunity";
import { getUpdates } from "@/database/update";
import UpdateList from "./UpdateList";
import AddUpdateForm from "./AddUpdateForm";
import OpportunityNotes from "./OpportunityNotes";

export type Props = {
  params: { id: string; };
};

export default async function OpportunityDetails({ params }: Props) {
  const opportunityId = parseInt(params.id, 10);
  const opportunity = await getOpportunity(opportunityId);
  const updates = await getUpdates(opportunityId);

  return <div>
    <div className="my-4">
      <PageTitle>
        {opportunity.role} @ {opportunity.company}
      </PageTitle>
    </div>

    <OpportunityNotes opportunity={opportunity} />

    <UpdateList updates={updates} />

    <div className="mt-8">
      <h2 className="font-semibold text-xl my-4">Add Update</h2>
      <AddUpdateForm opportunityId={opportunityId} />
    </div>
  </div>;
}