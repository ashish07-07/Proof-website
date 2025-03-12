"use client"
import { useState } from "react"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';

export default  function (){

    const [websiteurl,setwebsiteurl]=useState('')

    const session =useSession()
    if (session.status!='authenticated')
    {
        
    }

    function weburl(e:any)
    {
           setwebsiteurl(e.target.value)
    }

    async function handlesubmit(e:any)
    {      e.preventDefault();
           const response=await  axios.post('/api/websiteurl',{websiteurl})
           console.log(response.data)
    }


    return <div>

    <input type="text" placeholder="Enter your website url" onChange={weburl}/>
    <button onClick={handlesubmit}>Enter the submit button</button>
    </div>

}