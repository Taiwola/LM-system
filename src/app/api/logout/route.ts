import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const {accessToken} = body;

    const res = await fetch("http://localhost:8000/api/auth/logout", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${accessToken}`
        }
    });

    if (res.status === 200) {
        const response = await res.json();
        const message = response.message;
        return NextResponse.json({ message, success: true });
    } else {
        const response = await res.json();
        const status = response.status;
        const message = response.message;

        return NextResponse.json({ message, success: false, status });
    }
}