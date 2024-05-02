import axiosInstance from '@/utils/axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Index = () => {
   const [user,setUser] = useState();
  useEffect(() => {
    async function getUser(){
      try {
        const res = await axiosInstance.post("/api/getUser");
        console.log(res.data)
      } catch (error:any) {
        console.log({error:error.response})
      }
    }
    getUser()
  },[])
  return (
    <div>Index</div>
  )
}

export default Index