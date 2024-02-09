import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const {accessToken, id} = await req.json();

    const data = await fetch(`http://localhost:8000/api/department/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${accessToken}`
        }
    });

    if (data.status === 200) {
        const res = await data.json();
        const response = res.data;
        return NextResponse.json({
            success: true,
            data: response
        });
    } else {
        const res = await data.json();
        const message = res.message;
        return NextResponse.json({
            success: false,
            message
        });
    }
}