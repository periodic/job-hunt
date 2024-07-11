import OpportunityList from "@/components/OpportunityList";
import PageTitle from "@/components/PageTitle";
import { getOpportunitiesWithLastUpdate } from "@/database/opportunity";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const opportunities = await getOpportunitiesWithLastUpdate();

  return (
    <main>
      <div className="header">
        <PageTitle>Active Opportunities</PageTitle>
      </div>
      <div className="my-4 w-full">
        <OpportunityList opportunities={opportunities} />
      </div>
    </main>
  );
}
