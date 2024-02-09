import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const {accessToken, Id, director_id} = await req.json();

    const dataBody = {director_id}

    const data = await fetch(`http://localhost:8000/api/leave/department/reject/${Id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(dataBody)
    });
    const res = await data.json()

    if (data.status === 200) {
        const message = res.message;
        return NextResponse.json({message});
    } else {
        const message = res.message;
        return NextResponse.json({message})
    }
}