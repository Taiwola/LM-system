import {NextResponse} from "next/server";


interface Body {
    accessToken: string,
    Id: string,
    firstname: string,
    lastname: string,
    email: string,
    status: string
}
export async function POST(req: Request) {
    const body: Body = await req.json();
    const {accessToken, Id, firstname, lastname, status, email} = body;

    const data = await fetch(`http://localhost:8000/api/user/${Id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            email, lastname, firstname, status
        })
    });

    if (data.status === 200) {
        const res = await data.json();
        const message = res.message;
        return NextResponse.json({message, success: true})
    } else {
        const res = await data.json();
        const message = res.message;
        return NextResponse.json({message, success: false })
    }
}