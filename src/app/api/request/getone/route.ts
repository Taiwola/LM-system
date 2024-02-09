import {NextResponse} from "next/server"


export async function POST(req: Request) {
    const {accessToken, Id} = await req.json();

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${accessToken}`
          }
    }
    const res = await fetch(`http://localhost:8000/api/relieving_officer/${Id}`, options);

    const response = await res.json();
    if (res.ok) {
        const message = response.message
        const data = response.data;

        return NextResponse.json({
            message: message,
            data: data,
            success: true
        })
    } else {
        const message = response.message
        return NextResponse.json({
            message: message,
            success: false
        })
    }
}