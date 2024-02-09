import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const {accessToken, staff_id, id} = await req.json();

    const dataBody = {
        accessToken, id: staff_id
    }

    const data = await fetch(`http://localhost:8000/api/department/add/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(dataBody)
    });

    if (data.status === 200) {
        const res = await data.json();
        const message = res.message;
        return NextResponse.json({
            success: true,
            message
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