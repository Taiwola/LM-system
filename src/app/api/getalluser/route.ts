import {NextResponse} from "next/server";


interface Body {
    accessToken: string
}
export async function POST(req: Request) {
    const body: Body = await req.json();
    const {accessToken} = body;

    const data = await fetch(`http://localhost:8000/api/user/all`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${accessToken}`
        }
    });

    if (data.status === 200) {
        const user = await data.json();
        //console.log(res);
        return NextResponse.json({user, success: true});
    } else {
        const res = await data.json();
        console.log(res);
        const user = res.users;
        return NextResponse.json({user, success: false});
    }
}