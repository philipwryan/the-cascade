import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { session_id, clue_id } = body;

        if (!session_id || !clue_id) {
            return NextResponse.json(
                { error: 'Missing session_id or clue_id' },
                { status: 400 }
            );
        }

        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

        // We forward the discovery request to the Python backend so it can persist state
        // and broadcast via WebSocket to the main dashboard clients
        const response = await fetch(`${API_URL}/api/game/${session_id}/clues/discover`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ clue_id: clue_id }),
        });

        // The python backend will return 400 if the clue is already found or doesn't exist
        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data.detail || 'Failed to unlock clue.' },
                { status: response.status }
            );
        }

        return NextResponse.json({ success: true, message: 'Clue unlocked and broadcasted.', data });

    } catch (error: any) {
        console.error('Scan proxy error:', error);
        return NextResponse.json(
            { error: 'Internal server error processing scan.' },
            { status: 500 }
        );
    }
}
