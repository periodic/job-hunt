'use client'

import { useState } from "react";

const cutOffs = [
  { unit: 'second', value: 1 },
  { unit: 'minute', value: 60 },
  { unit: 'hour', value: 60*60 },
  { unit: 'day', value: 60*60*24 },
  { unit: 'month', value: 60*60*24*30 },
  { unit: 'year', value: 60*60*365 },
] as const;


export default function Timestamp({ timestamp }: {timestamp: Date}) {
  const [isPrecise, setIsPrecise] = useState(false);

  if (isPrecise) {
    return <span
      onClick={() => setIsPrecise(false)}
      className="text-slate-400 text-sm">
        {timestamp.toLocaleDateString()} {timestamp.toLocaleTimeString()}
      </span>
  } 

  const seconds = (Date.now() - timestamp.getTime()) / 1000;
  const { unit, value: divisor } = cutOffs.find((_, i) => (cutOffs[i + 1].value ?? Infinity) > seconds) ?? cutOffs[4];
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: "auto" });

  return <span
    onClick={() => setIsPrecise(true)}
    className="text-slate-400 text-sm">
      {rtf.format(-1 * Math.floor(seconds / divisor), unit)}
    </span>
}