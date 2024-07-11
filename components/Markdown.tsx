
import { default as ReactMarkdown } from "react-markdown";
import remarkGfm from "remark-gfm";

export type Props = {
  text: string;
}

export default function Markdown({text}: Props) {
  return <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      a: props => <a className="text-teal-400" {...props} />
    }}
    >
    {text}
  </ReactMarkdown>
}