interface Webdetails{
    websiteurl:string
    name:string
    email:string,
    id:number
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

         const response=await prisma.website.create(
            {
                data:
                {
                      websiteUrl:body.websiteurl,
                      userId:body.id
                      

                      
                }
            }
         )
         

        

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
