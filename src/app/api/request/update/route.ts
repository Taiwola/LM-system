import {NextResponse} from "next/server";

export async function POST(req: Request) {
        const {accept_or_decline, accessToken, relieveId} = await req.json();
        
        const options = {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  'authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                        accept_relieve: accept_or_decline
                }),
              };

        const res = await fetch(`http://localhost:8000/api/relieving_officer/${relieveId}`, options);

        if (res.ok) {
                const response = await res.json();
                const message = response.message;
                console.log(message);
                return NextResponse.json({
                        message: message
                })
        } else {
                const response = await res.json();
                const message = response.message;
                return NextResponse.json({
                        message: message
                })
        }
}