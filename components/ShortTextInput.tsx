import type { HTMLProps } from "react";

export default function ShortTextInput(props: HTMLProps<HTMLInputElement>) {
  return <input
    type="text"
    className="border-slate-300 text-slate-100 bg-slate-800 w-80 p-2"
    {...props}
  />;
}