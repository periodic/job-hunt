export type Props<T extends string> = {
  name?: string;
  value?: T;
  items: Record<T, string>,
  required?: boolean
  onChange?: (value: T) => void,
};

export default function Select<T extends string>({name, value, onChange, items, required}: Props<T>) {
  return <select
    className="border border-slate-300 text-slate-100 bg-slate-800 w-40 p-2"
    name={name}
    value={value}
    required={required}
    onChange={onChange && ((e) => onChange(e.target.value as T))}
  >
    {
      Object.entries<string>(items).map(([value, label]) =>
        <option key={value} value={value}>{label}</option>
      )
    }
  </select>
}