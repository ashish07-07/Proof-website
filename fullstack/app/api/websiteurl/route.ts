interface Webdetails{
    websiteurl:string
}

import prisma from "@/app/db";
export async function POST(req:Request,res:Response)
{

    try 
    {    
         const body:Webdetails= await  req.json()

         if (!body)
         {
            console.log("No body item has been found");
            return Response.json(
                {
                    message:"No url provided"
                },
                {
                     status:400
                }


            )
         }
         console.log(body.websiteurl) 
         

        

         return Response.json(
            {
                  response
            },
            {
                status:201
            }
         )    

    }

    catch (e:any)
    {
           return Response.json(
            {
                message:"Error"
            },{
                status:200
            }
           )
    }
    

    
}
