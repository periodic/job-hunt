import type { PropsWithChildren } from "react";

export type Props = {
  label: string;
  name: string;
}

export default function FormRow({label, name, children}: PropsWithChildren<Props>) {
  return <div className="flex flex-row my-2 items-center">
    <label
      className="grow-0 w-32"
      htmlFor={name}>
        {label}
    </label>
    <div className="grow">
      {children}
    </div>
  </div>;
}