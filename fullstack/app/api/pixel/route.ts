export async function GET(req:Request,res:Response)
{
      const {searchParams}= new URL(req.url);
      const siteId = searchParams.get("site-id");
      
      if (!siteId)
      {
          return Response.json(
            {
                message:"missing Site-Id"
            },
            
            {
                status:400
            }
           
          )
      }

      const scriptContent=`(
      
        function ()
        {
            const siteId= ""
        
        }
      )`









}