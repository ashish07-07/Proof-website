
// import express from 'express'
// import { WebSocket,WebSocketEventMap, WebSocketServer } from 'ws';

// const app=express();

// const server= app.listen(8080,function ()
// {
//       console.log(`server is listening on port 8000`)
// })

// interface Messagedetails{
 
//     event:string,
//     siteId:string,
//     url:string,
//     timestamp:string

// }
// const sitedetails: { [key: string]: number } = {};

// const formFilleddetails:{[key:string]:any}={};


// const wss= new WebSocketServer({server});

// wss.on('connection', function (socket:any)
// {
//       console.log('A client connected to me');

    
      
//       socket.on('message',async function (message:any)
//     {
        
          
//            console.log(`the message i recieved is ${message}`);
//            const data:Messagedetails= await JSON.parse(message);

//            if (data.event==='page_view'&&data.siteId)
//            {    
                
//                 socket.siteId=data.siteId
//                  if(!sitedetails[data.siteId])
//                  {
//                        sitedetails[data.siteId]=1;
//                  }

//                  else 
//                  {
//                     sitedetails[data.siteId]++;
//                  }
//            }

//            if (data.event==='form_filled' && data.siteId)
//            {
//                  const siteId=data.siteId;

//                   if (!formFilleddetails[siteId])
//                   {
//                            formFilleddetails[siteId]=1;
//                   }

//                   else 
//                   {
//                           formFilleddetails[siteId]++;
//                   }

//            }



//     })
//     socket.send("Thank you for connecting me bro")
// })


// async function broadcastcount(siteId:string)
// {
//       const payload=JSON.stringify(
//         {
//               event:"viewer_count",
//               count:sitedetails[siteId],

//         }
//       )
//       wss.clients.forEach(function(client)
//     {     const socket = client as WebSocket & { siteId?: string };
//           if (socket.readyState===WebSocket.OPEN && socket.siteId===siteId) 
//             {
//                  socket.send(payload)
//             } 
//     })    
// }

// async function broadcastformfilled(siteid:string,date:string)
// {
//     const payload=JSON.stringify(
//       {
//                event:"form_count",
//                count:formFilleddetails[siteid],
//                time:date

//       }
//     )
// }



import express from 'express';
import { WebSocket, WebSocketServer } from 'ws';

const app = express();
const server = app.listen(8080, () => {
    console.log(`Server is listening on port 8080`);
});

interface WebSocketMessage {
    event: string;
    siteId: string;
    url?: string;
    timestamp?: string;
    form?: string;
    filledFields?: string[];
}

const siteStats = {
    viewers: {} as { [key: string]: number },
    forms: {} as { [key: string]: { count: number, lastSubmission?: string } }
};

const wss = new WebSocketServer({ server });

wss.on('connection', (socket: WebSocket & { siteId?: string }) => {
    console.log('Client connected');

    socket.on('message', (rawMessage) => {
        try {
            const data: WebSocketMessage = JSON.parse(rawMessage.toString());
            
            if (!data.siteId) return;

            // Handle page views
            if (data.event === 'page_view') {
                socket.siteId = data.siteId;
                siteStats.viewers[data.siteId] = (siteStats.viewers[data.siteId] || 0) + 1;
                broadcastCount(data.siteId);
            }

            // Handle form submissions
            if (data.event === 'form_filled') {
                siteStats.forms[data.siteId] = siteStats.forms[data.siteId] || { count: 0 };
                siteStats.forms[data.siteId].count++;
                siteStats.forms[data.siteId].lastSubmission = new Date().toISOString();
                broadcastForm(data.siteId);
            }

        } catch (error) {
            console.error('Error processing message:', error);
        }
    });

    socket.on('close', () => {
        if (socket.siteId && siteStats.viewers[socket.siteId] > 0) {
            siteStats.viewers[socket.siteId]--;
            broadcastCount(socket.siteId);
        }
    });
});

function broadcastCount(siteId: string) {
    const payload = JSON.stringify({
        event: 'viewer_count',
        count: siteStats.viewers[siteId] || 0
    });

    wss.clients.forEach(client => {
        const ws = client as WebSocket & { siteId?: string };
        if (ws.readyState === WebSocket.OPEN && ws.siteId === siteId) {
            ws.send(payload);
        }
    });
}

function broadcastForm(siteId: string) {
    const payload = JSON.stringify({
        event: 'form_count',
        count: siteStats.forms[siteId]?.count || 0,
        time: siteStats.forms[siteId]?.lastSubmission || new Date().toISOString()
    });

    wss.clients.forEach(client => {
        const ws = client as WebSocket & { siteId?: string };
        if (ws.readyState === WebSocket.OPEN && ws.siteId === siteId) {
            ws.send(payload);
        }
    });
}