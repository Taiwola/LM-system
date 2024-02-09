import { ChangeEvent } from "react";

type Prop = {
    name: string;
    label: string;
    value: string;
    onchange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export default function Iput({name, label, value, onchange}: Prop) {
  return (
   <>
    <label htmlFor="start">{label}:</label>
    <input type="text" name={name} value={value} onChange={onchange} />
   </>
  )
}