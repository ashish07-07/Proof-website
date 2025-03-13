// "use client"
// import { useState } from "react"
// import axios from "axios"
// import { useSession } from "next-auth/react"
// import { useRouter } from 'next/navigation';
// import prisma from "../db";
// import { useEffect } from "react";

// export default  function (){

//     const [websiteurl,setwebsiteurl]=useState('')
//     const router = useRouter();
//     const [useremail,setemail]=useState("")
//     const [userid,setuserid]=useState("")

//     const session =useSession()

//     useEffect(()=>
//     {
//               if (session.data?.user?.email)
//               {
//                    setemail(session.data.user.email)
//               }
//     },[session.data?.user?.email])

//     useEffect(()=>
//     {
//             if (session.status==='unauthenticated')
//             {
//                  router.push('/api/auth/signin')
//             }
//     },[session,router])

//     const name= session.data?.user?.name
//     const email= session.data?.user?.email
//     // setemail(email)

//     useEffect(()=>
//     {
//          async function callapi()
//          {
//               try 
//               {
//                   const response:any= await axios.get(`/api/findid?email=${useremail}`)
//                   setuserid(response.data.id);




//               }


//               catch (e:any)
//               {

//               }

//          }

//          callapi()

//     },[useremail])

//     function weburl(e:any)
//     {
//            setwebsiteurl(e.target.value)
//     }

//     async function handlesubmit(e:any)
//     {      

         

//            try 
//            {
//                   e.preventDefault();
//                   if (!websiteurl&&!email&&!userid)
//                   {
//                       console.log('NO Proper data found. Give proper details dude')

//                   }
//                   const response=await  axios.post('/api/websiteurl',{websiteurl,name,email,userid})
//                   console.log(response.data) 

//            }

//            catch (e:any)
//            {
//               console.log(e)
//            }
//     }


//     return <div>

//     <input type="text" placeholder="Enter your website url" onChange={weburl}/>
//     <button onClick={handlesubmit}>Enter the submit button</button>
//     </div>

// }
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function WebsiteForm() {
  const [websiteurl, setWebsiteUrl] = useState("");
  const [useremail, setEmail] = useState("");
  const [userid, setUserId] = useState("");

  const router = useRouter();
  const session = useSession();

  // Update email from session
  useEffect(() => {
    if (session.data?.user?.email) {
      setEmail(session.data.user.email);
    }
  }, [session.data?.user?.email]);

  // Redirect to sign-in if unauthenticated
  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [session, router]);

  // Fetch user ID based on email
  useEffect(() => {
    if (!useremail) return; // ✅ Avoid calling API with empty email

    async function callapi() {
      try {
        const response = await axios.get(`/api/findid?email=${useremail}`);
        setUserId(response.data.id);
      } catch (e) {
        console.error("Error fetching user ID:", e);
      }
    }

    callapi();
  }, [useremail]);

  function handleWebsiteUrlChange(e: any) {
    setWebsiteUrl(e.target.value);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!websiteurl || !useremail || !userid) {
      console.log("No proper data found. Give proper details dude");
      return;
    }

    try {
      const response = await axios.post("/api/websiteurl", {
        websiteurl,
        name: session.data?.user?.name,
        email: useremail,
        userid,
      });

      console.log("Response:", response.data);
    } catch (e) {
      console.error("Error submitting data:", e);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your website URL"
        onChange={handleWebsiteUrlChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
