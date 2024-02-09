import {NextResponse} from "next/server";

type Body = {
    accessToken: string,
    Id: string
}

export async function DELETE(req:Request) {
    const body: Body = await req.json();

    const {accessToken, Id} = body;

    const request = await fetch(`http://localhost:8000/api/leave/${Id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${accessToken}`
        },
    });

    if (request.status === 200) {
        const res = await request.json();
        const message = res.message;
        return NextResponse.json({ message, success: true });
    } else {
        const res = await request.json();
        const status = res.status;
        const message = res.message;

        return NextResponse.json({ message, success: false, status });
    }
}