import {NextResponse} from "next/server";

interface Body {
    accessToken: string;
    title: string;
    description: string;
    end: string;
    start: string;
    days: string;
    weeks: string;
    leave_type: string
}
export async function POST(req: Request) {
    try {
        const body: Body = await req.json();
        const {accessToken, description, title, days, weeks, start, end, leave_type} = body;
        const leaveData = {
            description,
            title,
            startDate: start,
            endDate: end,
            number_of_days: days,
            leave_type: leave_type
        }
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            'authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(leaveData)
        }
        const data = await fetch("http://localhost:8000/api/leave", options);

        if (data.status === 200) {
            const res = await data.json();
            const message = res.message;
            return NextResponse.json({ message, success: true });
        } else {
            const res = await data.json();
            const message = res.message;
            return NextResponse.json({
                message: message,
                success: false,
                status: 500,
              });
        }


    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "Error"});
    }
}