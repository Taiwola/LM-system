import {NextResponse} from "next/server";

interface Body {
    accessToken: string
}
export async function POST(req: Request) {
    try {
        const body: Body = await req.json();
        const {accessToken} = body;
        const data = await fetch("http://localhost:8000/api/leave/user", {
            method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${accessToken}`
        },
        });
        if (data.status === 200) {
            const leave = await data.json();
            return NextResponse.json({success: true, data: leave});
        } else {
            return NextResponse.json({success: false});
        }
    } catch (error) {
        console.error(error);
    return NextResponse.json({message: "Error"});
    }
}