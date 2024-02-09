import {NextResponse} from "next/server";


export async function POST(req: Request) {
    const {accessToken, dept_id, name, director_id} = await req.json();

    const dataBody = {
        name, id: director_id
    }

    const data = await fetch(`http://localhost:8000/api/department/${dept_id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(dataBody)
    });

    if (data.status === 200) {
        return NextResponse.json({message:"Successfully updated department", success: true});
    } else {
        const message = await data.json();
        return NextResponse.json({message, sucess: false})
    }
}