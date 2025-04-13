
// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import Script from "next/script";

// interface responsedetails{
 
//   id:number,
//   websiteUrl:string,
//   siteId:string,
//   userId:number,


// }

// export default function WebsiteForm() {
//   const [websiteurl, setWebsiteUrl] = useState("");
//   const [useremail, setEmail] = useState("");
//   const [userid, setUserId] = useState("");

//   const router = useRouter();
//   const session = useSession();

//   // Update email from session
//   useEffect(() => {
//     if (session.data?.user?.email) {
//       setEmail(session.data.user.email);
//     }
//   }, [session.data?.user?.email]);

//   // Redirect to sign-in if unauthenticated
//   useEffect(() => {
//     if (session.status === "unauthenticated") {
//       router.push("/api/auth/signin");
//     }
//   }, [session, router]);

//   // Fetch user ID based on email
//   useEffect(() => {
//     if (!useremail) return; 

//     async function callapi() {
//       try {
//         const response:any= await axios.get(`/api/findid?email=${useremail}`);
//         setUserId(response.data.id);
//       } catch (e) {
//         console.error("Error fetching user ID:", e);
//       }
//     }

//     callapi();
//   }, [useremail]);



//   // console.log(`are the email is ${useremail}or ${session.data?.user?.email}`)

//   function handleWebsiteUrlChange(e: any) {
//     setWebsiteUrl(e.target.value);
//   }

//   async function handleSubmit(e: any) {
//     e.preventDefault();

//     if (!websiteurl || !useremail || !userid) {
//       console.log("No proper data found. Give proper details dude");
//       return;
//     }

//     try {
//       const response:any= await axios.post("/api/websiteurl", {
//         websiteurl,
//         name: session.data?.user?.name,
//         email:session.data?.user?.email,
//         id:userid,
       
//       });
  
//     //  const data:responsedetails= response.data;
//       const data= response.data.response; 
//       console.log("Response:", response.data);
//       console.log(`now i am checking response data ${response.data.response.siteId}`)

//       if(response.data.response.siteId)
//       {
//           console.log(response.data.response.siteId)
//           console.log("inside the if blaock of client ")

    
      
     
//       if (data.siteId && data.websiteUrl) {
       
//         const sanitizedUrl = data.websiteUrl.replace(/(^\w+:|^)\/\//, "");
      
//         alert(`Copy and paste this script into your website:
//         <script async src="https://${sanitizedUrl}/api/pixel.js?site-id=${data.siteId}"></script>
//         `);
//       }
      
      
        

        
//       }
      
//     } catch (e) {
//       console.error("Error submitting data:", e);
//     }
//   }

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Enter your website URL"
//         onChange={handleWebsiteUrlChange}
//       />
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// }

// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import Script from "next/script";

// interface ResponseDetails {
//   id: number;
//   websiteUrl: string;
//   siteId: string;
//   userId: number;
// }

// export default function WebsiteForm() {
//   const [websiteurl, setWebsiteUrl] = useState("");
//   const [useremail, setEmail] = useState("");
//   const [userid, setUserId] = useState("");
//   const [scriptCode, setScriptCode] = useState("");
//   const [showScriptModal, setShowScriptModal] = useState(false);
//   const [copySuccess, setCopySuccess] = useState(false);

//   const router = useRouter();
//   const session = useSession();

//   // Update email from session
//   useEffect(() => {
//     if (session.data?.user?.email) {
//       setEmail(session.data.user.email);
//     }
//   }, [session.data?.user?.email]);

//   // Redirect to sign-in if unauthenticated
//   useEffect(() => {
//     if (session.status === "unauthenticated") {
//       router.push("/api/auth/signin");
//     }
//   }, [session, router]);

//   // Fetch user ID based on email
//   useEffect(() => {
//     if (!useremail) return;

//     async function callapi() {
//       try {
//         const response: any = await axios.get(`/api/findid?email=${useremail}`);
//         setUserId(response.data.id);
//       } catch (e) {
//         console.error("Error fetching user ID:", e);
//       }
//     }

//     callapi();
//   }, [useremail]);

//   function handleWebsiteUrlChange(e: any) {
//     setWebsiteUrl(e.target.value);
//   }

//   // Function to copy script to clipboard
//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(scriptCode)
//       .then(() => {
//         setCopySuccess(true);
//         setTimeout(() => setCopySuccess(false), 2000);
//       })
//       .catch(err => {
//         console.error('Failed to copy: ', err);
//       });
//   };

//   async function handleSubmit(e: any) {
//     e.preventDefault();

//     if (!websiteurl || !useremail || !userid) {
//       console.log("No proper data found. Give proper details dude");
//       return;
//     }

//     try {
//       const response: any = await axios.post("/api/websiteurl", {
//         websiteurl,
//         name: session.data?.user?.name,
//         email: session.data?.user?.email,
//         id: userid,
//       });

//       const data = response.data.response;

//       console.log("Response:", response.data);
      
//       if (data.siteId && data.websiteUrl) {
//         const sanitizedUrl = data.websiteUrl.replace(/(^\w+:|^)\/\//, "");
//         const scriptText = `<script async src="https://${sanitizedUrl}/api/pixel.js?site-id=${data.siteId}"></script>`;
//         setScriptCode(scriptText);
//         setShowScriptModal(true);
//       }
//     } catch (e) {
//       console.error("Error submitting data:", e);
//     }
//   }

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <div className="flex items-center mb-4">
//         <input
//           type="text"
//           placeholder="Enter your website URL"
//           onChange={handleWebsiteUrlChange}
//           className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-300"
//         />
//         <button 
//           onClick={handleSubmit}
//           className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r"
//         >
//           Submit
//         </button>
//       </div>

//       {showScriptModal && (
//         <div className="mt-6 p-4 border rounded bg-gray-50">
//           <h3 className="text-lg font-medium mb-2">Copy this script to your website</h3>
//           <div className="relative">
//             <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto whitespace-pre-wrap break-all text-sm">
//               {scriptCode}
//             </pre>
//             <button
//               onClick={copyToClipboard}
//               className={`absolute top-2 right-2 p-2 rounded ${
//                 copySuccess ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'
//               } text-white text-sm`}
//             >
//               {copySuccess ? 'Copied!' : 'Copy'}
//             </button>
//           </div>
//           <p className="text-sm text-gray-600 mt-3">
//             Add this script to the &lt;head&gt; section of your website to enable tracking.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Script from "next/script";

interface ResponseDetails {
  id: number;
  websiteUrl: string;
  siteId: string;
  userId: number;
}

export default function WebsiteForm() {
  const [websiteurl, setWebsiteUrl] = useState("");
  const [useremail, setEmail] = useState("");
  const [userid, setUserId] = useState("");
  const [scriptCode, setScriptCode] = useState("");
  const [showScriptModal, setShowScriptModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

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
    if (!useremail) return;

    async function callapi() {
      try {
        const response: any = await axios.get(`/api/findid?email=${useremail}`);
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

  // Function to copy script to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(scriptCode)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!websiteurl || !useremail || !userid) {
      console.log("No proper data found. Give proper details dude");
      return;
    }

    try {
      const response: any = await axios.post("/api/websiteurl", {
        websiteurl,
        name: session.data?.user?.name,
        email: session.data?.user?.email,
        id: userid,
      });

      const data = response.data.response;

      console.log("Response:", response.data);
      
      if (data.siteId && data.websiteUrl) {
        const sanitizedUrl = data.websiteUrl.replace(/(^\w+:|^)\/\//, "");
        // const scriptText = `<script async src="https://${sanitizedUrl}/api/pixel.js?site-id=${data.siteId}"></script>`;
        const scriptText = `<script async src="https://proof-website.vercel.app/api/pixel.js?site-id=${data.siteId}"></script>`
        setScriptCode(scriptText);
        setShowScriptModal(true);
      }
    } catch (e) {
      console.error("Error submitting data:", e);
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Enter your website URL"
          onChange={handleWebsiteUrlChange}
          className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button 
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r"
        >
          Submit
        </button>
      </div>

      {showScriptModal && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Copy this script to your website</h3>
            <button
              onClick={copyToClipboard}
              className={`p-2 rounded ${
                copySuccess ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'
              } text-white text-sm`}
            >
              {copySuccess ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="relative">
            <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto whitespace-pre-wrap break-all text-sm">
              {scriptCode}
            </pre>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Add this script to the &lt;head&gt; section of your website to enable tracking.
          </p>
        </div>
      )}
    </div>
  );
}


