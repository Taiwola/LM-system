
type Prop = {
    name: string;
    label: string
}

export default function Date({name, label}: Prop) {
  return (
   <>
    <label htmlFor="start">{label}:</label>
    <input type="date" id="start" name={name}  min="2018-01-01" max="2030-12-31" />
   </>
  )
}
