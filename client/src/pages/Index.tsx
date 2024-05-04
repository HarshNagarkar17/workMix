import axiosInstance from '@/utils/axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [profileImage, setProfileImage] = useState();
  const navigate = useNavigate();
  async function getUser() {
    try {
      const res = await axiosInstance.post("/api/getUser");
      if (res.data.user)
        setUser(res.data.user);
      if (res.data.img)
        setProfileImage(res.data.img)
    } catch (error: any) {
      navigate("/login")
      console.log({ error: error.response })
    }
  }
  useEffect(() => {
    getUser()
  }, [])
  return (
    <div>
      {user && (<p>{user.email}</p>)}
      {profileImage && (
        <div className='w-[90px] mx-auto h-[90px] mb-6 rounded-full bg-[#474648]'>
          <img src={profileImage} className='w-full h-full rounded-full' />
        </div>
      )}
    </div>
  )
}

export default Index