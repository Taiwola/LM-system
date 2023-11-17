import { NextResponse } from "next/server"

interface Body {
    email: string,
    password: string,
}
export async function POST(req: Request) {
    try {
        // Extract the request body
        const body: Body = await req.json();
        console.log(body);

        // Destructure the body data
        const { email, password } = body;
        if (!email || !password) return NextResponse.json("Missing required fields");

        // Prepare the fetch request options
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        };

        // Send the POST request to the backend
        const data = await fetch('http://localhost:8000/api/auth/signin', options);
        console.log(data.status);

        // Check the response status
        if (data.status === 200) {
            // Parse the successful response
            const response = await data.json();
            const accessToken = response.accessToken;
            const message = response.message;
            const id = response.id;

            console.log(id);

            // Return a successful response with the access token and message
            return NextResponse.json({success:true, message: message, accessToken, id: id });
        } else {
            // Handle an unsuccessful response
            return NextResponse.json({false:false, message: "failed" });
        }
    } catch (error) {
        // Handle any errors during the request
        console.error(error);
        return NextResponse.json({ message: 'failed' });
    }
}