import {NextResponse} from "next/server";


interface Body {
    accessToken: string,
    comment: string,
    Id: string
}
export async function POST(req: Request) {
    const body:Body = await req.json();
    const {accessToken, comment, Id} = body;

    const options = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        'authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({comment})
    }

    const data  = await fetch(`http://localhost:8000/api/leave/comment/${Id}`, options);

    if (data.status === 200) {
        const res = await data.json();
        const message = res.message;
        return NextResponse.json({ message, success: true });
    } else {
        const res = await data.json();
        const message = res.message;
        return NextResponse.json({
            message: message,
            success: false,
            status: 500,
          });
    }
}