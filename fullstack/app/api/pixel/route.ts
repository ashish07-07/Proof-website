


// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//     const { searchParams } = new URL(req.url);
//     const siteId = searchParams.get("site-id");

//     if (!siteId) {
//         return new NextResponse("Missing site-id", { status: 400 });
//     }

//     const scriptContent = `
//         (function () {
//             const siteId = "${siteId}";
//             if (!siteId) return;

//             // Create single WebSocket connection
//             const socket = new WebSocket("wss://your-websocket-server.com");

//             socket.addEventListener("open", function () {
//                 console.log("Connected to WebSocket");

//                 // Send initial page view event

//                 socket.send(JSON.stringify({
//                     event: "page_view",
//                     siteId: siteId,
//                     url: window.location.href,
//                     timestamp: new Date().toISOString()
//                 }));
//             });

//             socket.addEventListener("error", function (error) {
//                 console.error("WebSocket Error:", error);
//             });

//             // Form tracking logic
//             const observer = new MutationObserver(function () {
//                 document.querySelectorAll("form").forEach(function (form) {
//                     if (form._alreadyTracked) return;
//                     form._alreadyTracked = true;

//                     const formId = form.id || "unknown_form";
//                     const requiredFields = form.querySelectorAll(
//                         "input[required], textarea[required], select[required]"
//                     );
//                     const filledStatus = new Set();
//                     let formAlreadyReported = false;

//                     requiredFields.forEach(function (field) {
//                         field.addEventListener("input", function () {
//                             if (field.value.trim() !== "") {
//                                 filledStatus.add(field.name || field.id);
//                             } else {
//                                 filledStatus.delete(field.name || field.id);
//                             }

//                             if (filledStatus.size === requiredFields.length && !formAlreadyReported) {
//                                 formAlreadyReported = true;
                                
//                                 if (socket.readyState === WebSocket.OPEN) {
//                                     socket.send(JSON.stringify({
//                                         event: "form_filled",
//                                         siteId: siteId,
//                                         form: formId,
//                                         filledFields: Array.from(filledStatus),
//                                         timestamp: new Date().toISOString()
//                                     }));
//                                 }
//                             }
//                         });
//                     });
//                 });
//             });

//             // Start observing the DOM for form changes
//             observer.observe(document.body, { 
//                 childList: true, 
//                 subtree: true 
//             });
//         })();
//     `;

//     return new NextResponse(scriptContent, {
//         status: 200,
//         headers: {
//             "Content-Type": "application/javascript",
//             "Cache-Control": "no-store",
//         },
//     });
// }

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const siteId = searchParams.get("site-id");

    if (!siteId) {
        return new NextResponse("Missing site-id", { status: 400 });
    }

    const pixelContent = `
        (function() {
            const siteId = "${siteId}";
            if (!siteId) return;

            // Create notification container
            const container = document.createElement('div');
            container.style = \`
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
                font-family: Arial, sans-serif;
                max-width: 300px;
                pointer-events: none;
            \`;

            // Viewer counter element
            const counter = document.createElement('div');
            counter.style = \`
                background: rgba(0,0,0,0.8);
                color: #fff;
                padding: 12px 20px;
                border-radius: 8px;
                margin-bottom: 8px;
                backdrop-filter: blur(5px);
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.3s ease;
            \`;
            counter.innerHTML = \`👥 <span id="live-counter">0</span> viewers\`;

            // Form notification element
            const formAlert = document.createElement('div');
            formAlert.style = \`
                background: #4CAF50;
                color: white;
                padding: 12px;
                border-radius: 6px;
                margin-top: 8px;
                display: none;
                align-items: center;
                animation: slideIn 0.3s ease;
            \`;
            formAlert.innerHTML = \`🎉 Form submitted <span style="margin-left:8px;font-size:0.8em"></span>\`;

            container.appendChild(counter);
            container.appendChild(formAlert);
            document.body.appendChild(container);

            // Add animations
            const style = document.createElement('style');
            style.textContent = \`
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeOut {
                    to { transform: translateX(100%); opacity: 0; }
                }
            \`;
            document.head.appendChild(style);

            // WebSocket connection
            const ws = new WebSocket("ws://localhost:8080");

            ws.addEventListener('message', (event) => {
                const data = JSON.parse(event.data);
                
                if (data.event === 'viewer_count') {
                    counter.style.opacity = '1';
                    counter.style.transform = 'translateY(0)';
                    document.getElementById('live-counter').textContent = data.count;
                }

                if (data.event === 'form_count') {
                    formAlert.style.display = 'flex';
                    formAlert.querySelector('span').textContent = 
                        new Date(data.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    
                    setTimeout(() => {
                        formAlert.style.animation = 'fadeOut 0.3s forwards';
                        setTimeout(() => formAlert.remove(), 300);
                    }, 3000);
                }
            });

            // Show counter after initial load
            setTimeout(() => {
                counter.style.opacity = '1';
                counter.style.transform = 'translateY(0)';
            }, 1000);
        })();
    `;

    return new NextResponse(pixelContent, {
        headers: {
            "Content-Type": "application/javascript",
            "Cache-Control": "no-store"
        }
    });
}