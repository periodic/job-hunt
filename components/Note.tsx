import type { PropsWithChildren } from "react";

export default function Note({children}: PropsWithChildren) {
  return <div className="px-4 border-l-2 border-slate-600">
    {children}
  </div>
}