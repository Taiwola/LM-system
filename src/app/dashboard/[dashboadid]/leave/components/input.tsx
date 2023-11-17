
type Prop = {
    name: string;
    label: string
}

export default function Iput({name, label}: Prop) {
  return (
   <>
    <label htmlFor="start">{label}:</label>
    <input type="text" name={name} />
   </>
  )
}