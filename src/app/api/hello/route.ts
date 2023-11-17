import { NextResponse } from "next/server"

export async function GET() {
    try {
        const url = 'http://localhost:8000/home'; // Replace with the actual backend URL

        // Make the fetch request
        const data = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the fetch request was successful
        if (!data.ok) {
            // If not, return an error message
            return NextResponse.json({ message: 'failed' });
        }

        // If successful, extract the response data
        const response = await data.json();
        const message = response.message;
        const fetchedUrl = response.url;

        // Log the fetched data and return a success message
        console.log('Fetched URL:', fetchedUrl);
        return NextResponse.json({ message, url: fetchedUrl });
    } catch (error) {
        // Handle any errors that occur during the fetch request
        console.error(error);
        return NextResponse.json({ message: 'failed' });
    }
}