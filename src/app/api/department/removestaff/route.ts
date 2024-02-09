import {NextResponse} from "next/server";


export async function POST(req:Request) {
    const {accessToken, dept_id, staff_id} = await req.json();

    const dataBody = {
        id: staff_id
    }

    const data = await fetch(`http://localhost:8000/api/department/remove/${dept_id}`, {
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
        return NextResponse.json({message, success: true})
    } else {
        const res = await data.json();
        const message = res.message;
        return NextResponse.json({message, success: false})
    }
}