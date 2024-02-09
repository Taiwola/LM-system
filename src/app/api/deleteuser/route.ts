import {NextResponse} from "next/server";


export async function POST(req: Request) {
    const {Id, accessToken} = await req.json();

    const data = await fetch(`http://localhost:8000/api/user/${Id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${accessToken}`
        }
    });

    if (data.status === 200) {
        const res = await data.json();
        const message = res.message;
        return NextResponse.json({message, suucess: true});
    } else {
        const res = await data.json();
        const message = res.message;
        return NextResponse.json({message, suucess: false});
    }
}