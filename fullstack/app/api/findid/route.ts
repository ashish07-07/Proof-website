// interface bodydetails{

//     email:string
// }

// import prisma from "@/app/db";

// export default async function GET(req:Request,res:Response)
// {
//      try 
//      {
//         const body:bodydetails= await req.json();

//         if (!body)
//         {
//            return Response.json(
//                {
//                    message:"Error  invalid body found"
//                },
//                {
//                    status:400
//                }
//            )
//         }
   
//         const email= body.email;
   
//         const response=await prisma.user.findUnique(
//            {
//                where:
//                {
//                    email:email
//                },
//                select:
//                {
//                    id:true
//                }
               
//            }
//         )

//         return Response.json(
//             {
//                 message:"Successfully found the users user id",
//                 response
//             }
//         )
//      }

//      catch (e:any)
//      {
//         console.log(e)
//         return Response.json(
//             {
//                 message:"error while finding users user id"
//             },
//             {
//                 status:400
//             }
//         )
//      }
    

     

     
// }

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Invalid email parameter" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ id: user.id }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
