import PageTitle from "@/components/PageTitle";
import { getOpportunity } from "@/database/opportunity";
import { getUpdates } from "@/database/update";
import UpdateList from "./UpdateList";
import AddUpdateForm from "./AddUpdateForm";
import Markdown from "@/components/Markdown";

export type Props = {
  params: { id: string };
};

export default async function OpportunityDetails({params}: Props) {
  const opportunityId = parseInt(params.id, 10);
  const opportunity = await getOpportunity(opportunityId);
  const updates = await getUpdates(opportunityId);

  return <div>
    <div className="my-4">
      <PageTitle>
        {opportunity.role} @ {opportunity.company}
      </PageTitle>
    </div>

    <p>
      <Markdown text={opportunity.notes} />
    </p>

    <UpdateList updates={updates} />

    <div>
      <h2>Update</h2>
      <AddUpdateForm opportunityId={opportunityId}/>
    </div>
  </div>
}