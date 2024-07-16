import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const res = await request.json();
        console.log(`request.body`, res);
    } catch (err) {
        console.log(`request.body`, err);
    }
    return NextResponse.json({ ok: true });
}
