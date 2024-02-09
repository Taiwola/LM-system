import {NextResponse} from "next/server";

interface userBody {
    Id: string,
    accessToken: string
}
export async function POST(req: Request) {
    try {
        const reqBody: userBody = await req.json();
    
    const {Id, accessToken} = reqBody;

    if (!Id || !accessToken) {
        return NextResponse.json("Missing required fields");
    }

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${accessToken}`
          }
    }
    const data = await fetch(`http://localhost:8000/api/user/${Id}`, options);
    if (data.status === 200) {
        const jsonData = await data.json();
        const userData = jsonData.data;
        return NextResponse.json({success:true, data: userData });
    } else {
        console.log("failed")
        return NextResponse.json({success: false, message: "Failed"});
    }
    } catch (error) {
         // Handle any errors during the request
         console.error(error);
         return NextResponse.json({ message: 'failed', success: false});
    }
    
}