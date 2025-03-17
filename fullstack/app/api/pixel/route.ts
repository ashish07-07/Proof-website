import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const siteId = searchParams.get("site-id");

    if (!siteId) {
        return new NextResponse("Missing site-id", { status: 400 });
    }

    // JavaScript content for pixel.js (dynamic)
    const scriptContent =`
        (function () {
            const siteId = "${siteId}";
            if (!siteId) return;

            // Connect to WebSocket Server
            const socket = new WebSocket("wss://your-websocket-server.com");

            socket.addEventListener("open", function () {
                console.log("Connected to WebSocket");

                // Send "page view" event when user visits the page
                socket.send(JSON.stringify({
                    event: "page_view",
                    siteId: siteId,
                    url: window.location.href,
                    timestamp: new Date().toISOString()
                }));
            });

            socket.addEventListener("error", function (error) {
                console.error("WebSocket Error:", error);
            });
        })();
    `;

    return new NextResponse(scriptContent, {
        status: 200,
        headers: {
            "Content-Type": "application/javascript",
            "Cache-Control": "no-store", // Prevent caching
        },
    });
}
