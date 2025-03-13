interface bodydetails{

    email:string
}

import prisma from "@/app/db";

export default async function GET(req:Request,res:Response)
{
     try 
     {
        const body:bodydetails= await req.json();

        if (!body)
        {
           return Response.json(
               {
                   message:"Error  invalid body found"
               },
               {
                   status:400
               }
           )
        }
   
        const email= body.email;
   
        const response=await prisma.user.findUnique(
           {
               where:
               {
                   email:email
               },
               select:
               {
                   id:true
               }
               
           }
        )

        return Response.json(
            {
                message:"Successfully found the users user id",
                response
            }
        )
     }

     catch (e:any)
     {
        console.log(e)
        return Response.json(
            {
                message:"error while finding users user id"
            },
            {
                status:400
            }
        )
     }
    

     

     
}