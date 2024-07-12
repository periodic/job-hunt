import type { HTMLProps } from "react";

export default function LongTextInput(props: HTMLProps<HTMLTextAreaElement>) {
  return <textarea
    className="border-slate-300 text-slate-100 bg-slate-800 w-full h-40 p-2"
    {...props}
  />
}