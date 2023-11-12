import Image from "next/image"

export default function Imgbar() {
  return (
    <>
    <Image src="/image/logo.png" alt="" width={300} height={60} priority={true}  />
    </>
  )
}
