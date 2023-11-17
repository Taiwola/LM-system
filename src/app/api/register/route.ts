import {NextResponse} from "next/server";

interface Register {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    confirm_password: string
}

interface Response {
    message: string
}

export async function POST(req: Request) {
    try {
        // Extract the request body
        const body: Register = await req.json();
    
        // Destructure the body data
        const { firstname, lastname, email, password, confirm_password } = body;
    
        // Validate required fields
        if (!email || !password || !firstname || !lastname || !confirm_password) {
          return NextResponse.json({ message: "Missing fields", status: 404 });
        }
    
        // Check if passwords match
        if (password !== confirm_password) {
          return NextResponse.json({ message: 'Passwords do not match', status: 401 });
        }
    
        // Prepare the fetch request options
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
          }),
        };
    
        // Send the POST request to the backend
        const data = await fetch("http://localhost:8000/api/auth/register", options);
    
        // Handle the response status
        if (data.status === 201) {
          // Parse the successful response
          const response: Response = await data.json();
          const message = response.message;
    
          // Return a successful response with the message
          return NextResponse.json({ message, success: true });
        } else {
          // Handle an unsuccessful response
          return NextResponse.json({
            message: "Registration failed",
            success: false,
            status: 500,
          });
        }
      } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Registration failed", success: false });
      }
}