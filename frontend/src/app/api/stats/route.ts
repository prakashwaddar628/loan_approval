import { NextResponse } from "next/server";


export async function GET() {
    return NextResponse.json({
        total: 128,
        approved: 86,
        rejected: 42,
    })
}