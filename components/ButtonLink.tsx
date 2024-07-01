import Link, { type LinkProps } from "next/link";
import type { PropsWithChildren } from "react";

export default function ButtonLink(props: PropsWithChildren<LinkProps>) {
  return <Link
    {...props}
    className="px-4 py-2 border border-slate-400 text-slate-200"
    >
    </Link>
}