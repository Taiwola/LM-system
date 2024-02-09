import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const {requestingOfficerId, leaveId, relievingOfficerId, accessToken} = await req.json();

    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            relievingOfficerId, requestingOfficerId, leaveId
        }),
      };

   const res = await fetch("http://localhost:8000/api/relieving_officer", options);

   const response = await res.json();
   if (res.ok) {
    const message = response.message;
    return NextResponse.json({
        message: message,
        success: false
    })
   } else {
    const message = response.message;
    const error = response?.error;

    return NextResponse.json({
        success: false,
        message: message
    })
   }

}