import { NextResponse } from "next/server";


export async function GET(){
    const data = [
        { name: "John Doe", gender: "Male", income: 5000, status: "Approved" },
    { name: "Jane Smith", gender: "Female", income: 4200, status: "Rejected" },
    { name: "Alex Lee", gender: "Male", income: 6200, status: "Approved" },
    { name: "Riya Patel", gender: "Female", income: 3100, status: "Rejected" },
    ];

    return NextResponse.json(data);
}