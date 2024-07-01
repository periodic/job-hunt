import type { HTMLProps, PropsWithChildren } from "react";

export default function ButtonLink(props: PropsWithChildren<HTMLProps<HTMLButtonElement>>) {
  return <button
    {...props}
    className="px-4 py-2 border border-slate-400 text-slate-200"
    >
    </button>
}