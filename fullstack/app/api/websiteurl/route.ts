// interface Webdetails{
//     websiteurl:string
//     name:string
//     email:string,
//     id:number
// }

// import prisma from "@/app/db";
// export async function POST(req:Request,res:Response)
// {

//     try 
//     {    
//          const body:Webdetails= await  req.json()

//          if (!body)
//          {
//             console.log("No body item has been found");
//             return Response.json(
//                 {
//                     message:"No url provided"
//                 },
//                 {
//                      status:400
//                 }


//             )
//          }
//          console.log(body.websiteurl) 

//          const response=await prisma.website.create(
//             {
//                 data:
//                 {
//                       websiteUrl:body.websiteurl,
//                       userId:body.id
                      

                      
//                 }
//             }
//          )
         

        

//          return Response.json(
//             {
//                   response
//             },
//             {
//                 status:201
//             }
//          )    

//     }

//     catch (e:any)
//     {
//            return Response.json(
//             {
//                 message:"Error"
//             },{
//                 status:200
//             }
//            )
//     }
    

    
// }
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db";

interface Webdetails {
  websiteurl: string;
  name: string;
  email: string;
  id: number;
}

export async function POST(req: NextRequest) {
  try {
    const body: Webdetails = await req.json();

    if (!body.websiteurl || !body.id) {
      console.log("No proper data found.");
      return NextResponse.json(
        { message: "Website URL and user ID are required" },
        { status: 400 }
      );
    }

    console.log(body.websiteurl);

    const response = await prisma.website.create({
      data: {
        websiteUrl: body.websiteurl,
        userId: body.id,
      },
    });

    return NextResponse.json({ response }, { status: 201 });
  } catch (e) {
    console.error("Error in POST API:", e);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
