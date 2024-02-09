import {NextResponse} from "next/server"

export async function POST(req: Request) {
    const {Id, deptId, accessToken} = await req.json();

    const data = {
        deptId
    }

    const response = await fetch(`http://localhost:8000/api/user/change/${Id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(data)
    });

    
    if (response.ok) {
        const res = await response.json();
        return NextResponse.json({
            message: res.message,
            success: true
        })
    } else {
        const res = await response.json();
        return NextResponse.json({
            message: res.message,
            success: false
        })
    }
}