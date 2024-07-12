import type { HTMLProps, PropsWithChildren } from "react";

// The extra override for the type prop is because somehow the HTMLProps comes back as `string` but the button expects fixed values.
export default function Button(props: PropsWithChildren<HTMLProps<HTMLButtonElement> & { type?: 'button' | 'submit' | 'reset'}>) {
  return <button
    {...props}
    className="px-4 py-2 border border-teal-700 text-slate-200 bg-teal-900"
    >
    </button>
}