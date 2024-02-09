import { ChangeEvent } from "react";

type Prop = {
    name: string;
    label: string;
    value: string;
    onchange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export default function Date({name, label, value, onchange}: Prop) {
  return (
   <>
    <label htmlFor="start">{label}:</label>
    <input type="date" id="start" name={name} value={value} onChange={onchange}  min="2018-01-01" max="2030-12-31" />
   </>
  )
}
