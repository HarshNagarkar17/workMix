import { useRouter } from '@/hooks/use-router';
import { getTokensFromLocalStorage } from '@/service/token.service';
import React, { useEffect } from 'react'

interface Props{
    children: React.ReactNode
}
const AuthContainer = ({children}:Props) => {
    const router = useRouter();
    const tokens = getTokensFromLocalStorage();        
    useEffect(() => {
        if(!tokens)
            router.push("/login");
    },[])
  return (
    <>
  {children}
    </>
  )
}

export default AuthContainer