export default function Timestamp({ timestamp }: {timestamp: Date}) {
  return <span className="text-slate-400 text-sm">{timestamp.toLocaleDateString()} {timestamp.toLocaleTimeString()}</span>
}