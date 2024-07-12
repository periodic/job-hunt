import Link from "next/link";

export default function OpportunityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>
    <div className="header my-8 border-b-2">
      <Link href="/">&larr; All Opportunities</Link>
    </div>
    <div>
      {children}
    </div>
  </div>;
}