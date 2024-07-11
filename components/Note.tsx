import Markdown from "./Markdown";

export type Props = {
  text: string;
}

export default function Note({text}: Props) {
  return <div
    className="px-4 border-l-2 border-slate-600"
  >
    <Markdown text={text} />
  </div>;
}