import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const {accessToken, name} = await req.json();

    const data = await fetch("http://localhost:8000/api/department", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${accessToken}`
        }, 
        body: JSON.stringify({name})
    });

    if (data.status === 200) {
        const res = await data.json();
        const message = res.message;
        const response = res.data;
        return NextResponse.json({
            message, data: response, success: true
        });
    } else {
        const res = await data.json();
        const message = res.message;
        return NextResponse.json({success: false, message});
    }
}