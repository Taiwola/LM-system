import {NextResponse} from "next/server";

interface Body {
    accessToken: string
}

export async function POST(req: Request) {
    const body: Body = await req.json();

    const {accessToken} = body;

    const data = await fetch("http://localhost:8000/api/department", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${accessToken}`
        }
    });

    if (data.status === 200) {
        const res = await data.json();
        const message = res.message;
        const response = res.data;
        return NextResponse.json({
            message, data: response, success: true
        });
    } else {
        return NextResponse.json({success: false, message: "Failed"});
    }
}