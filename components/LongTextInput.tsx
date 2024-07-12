import type { HTMLProps } from "react";

export default function LongTextInput(props: HTMLProps<HTMLTextAreaElement>) {
  return <textarea
    {...props}
    className={`border-slate-300 text-slate-100 bg-slate-800 w-full p-2 ${props.className}`}
  />;
}