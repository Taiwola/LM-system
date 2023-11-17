
type Prop = {
    name: string
}

export default function Textarea({name}: Prop) {
  return (
    <>
    <textarea name={name} id="" cols={30} rows={10} placeholder="Enter your description"></textarea>
    </>
  )
}
