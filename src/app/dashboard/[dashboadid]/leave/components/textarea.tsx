import { ChangeEvent } from "react";

type Prop = {
    name: string;
    value: string;
    onchange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export default function Textarea({name, value, onchange}: Prop) {
  return (
    <>
    <textarea name={name} id="" value={value} onChange={onchange} cols={30} rows={10} placeholder="Enter your description"></textarea>
    </>
  )
}
