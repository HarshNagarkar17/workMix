import NavBar from '@/components/NavBar'
import axiosInstance from '@/utils/axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const fakeTypes = [
    { id: 1, type: "Trending Topic" },
    { id: 2, type: "Recent" }
]
const Explore = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const [profileImage, setProfileImage] = useState("");
    const [selectedType, setSelectedType] = useState(0);
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

    const handleSelectedType = (id: number) => {
        if (selectedType === id)
            return;
        setSelectedType(id);
    }
    useEffect(() => {
        getUser()
    }, [])
    return (
        <div>
            <NavBar email={user.email} profileImage={profileImage} />
            <div className='mt-8'>
                <div className='flex gap-4 items-center'>
                    {
                        fakeTypes.map((f: any) => (
                            <div key={f.id}>
                                <div onClick={() => handleSelectedType(f.id)} className={`w-fit h-fit px-6 py-1 ${f.id === selectedType ? "bg-slate-400" : "bg-slate-800"} rounded-[6px] cursor-pointer`}>
                                    <p className='text-white font-medium text-[14px]'>{f.type}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Explore