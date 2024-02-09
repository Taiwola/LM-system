import {NextResponse} from "next/server";

interface Body {
    Id: string,
    accessToken: string
    status: string
}
export async function POST(req: Request) {
    const body: Body = await req.json();
    const {Id, accessToken, status} = body;
    const data = {
        Id, accessToken, status
    }

    const res = await fetch(`http://localhost:8000/api/leave/${Id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(data)
    });

    if (res.status === 200) {
        const response = await res.json();
        const message = response.message;
        return NextResponse.json({message: message, success: true});
    } else {
        console.log("failed")
        return NextResponse.json({success: false, message: "Failed"});
    }
}