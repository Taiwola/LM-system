import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { accessToken } = await req.json();


        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'authorization': `Bearer ${accessToken}`
            },
        };

        const res = await fetch("http://localhost:8000/api/relieving_officer", options);

        if (res.ok) {
            const response = await res.json();
            
            // Return the data or an appropriate response
            return NextResponse.json(response.data);
        } else {
            // Handle non-OK response
            console.error(`HTTP error! Status: ${res.status}`);
            return NextResponse.json({
                message: "No request at the moment"
            });
        }
    } catch (error) {
        // Handle unexpected errors
        console.error("Unexpected error:", error);
        return NextResponse.json({
            message: "Internal server error"
        });
    }
}
