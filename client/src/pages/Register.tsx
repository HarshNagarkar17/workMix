import RHFInput from '@/components/RHFInput'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { authSchema } from '@/schema/auth';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '@/utils/axios';
import RHFImageSelector from '@/components/RHFImageSelector';
import { setAccesToken } from '@/service/token.service';

const Register = () => {
  const navigate = useNavigate();

  interface DefaultValues {
    email: string;
    password: string;
    profileImage: any
  }
  const defaultValues: DefaultValues = {
    email: "",
    password: "",
    profileImage: null
  }
  const methods = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: zodResolver(authSchema())
  })

  const { handleSubmit, formState: { isSubmitting }, watch } = methods;

  const values = watch();

  const handleGetProfilePicture = () => {
    const fileInput = document.getElementById("profileImage");
    fileInput?.click();
  }

  const handleOnSubmit = handleSubmit(async (userData) => {
    try {
      const data = new FormData();
      data.append("email", userData.email)
      data.append("password", userData.password)
      data.append("profileImage", values.profileImage)
      const res = await axiosInstance.post("/api/register", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      if (res.data.tokens.accessToken) {
        setAccesToken(JSON.stringify(res.data.tokens.accessToken))
      }
      navigate("/");
    } catch (error: any) {
      console.log({ error:error.response })
    }
  })
  return (
    <div>
      <div className='max-w-lg mx-auto min-h-screen flex flex-col items-center justify-center'>
        <h2 className='mb-4 text-[22px] font-medium'>Register</h2>
        <FormProvider {...methods}>
          <form onSubmit={handleOnSubmit}>
            <div className='flex flex-col'>
              <RHFImageSelector name='profileImage' />
              <div className='w-[90px] mx-auto h-[90px] mb-6 rounded-full bg-[#474648]' onClick={handleGetProfilePicture}>
                {values.profileImage && (
                  <img src={URL.createObjectURL(values.profileImage)} className='w-full h-full rounded-full' alt="profile image" />
                )}
              </div>
              <RHFInput name='email' PlaceHolder='Enter email' />
              <RHFInput name='password' PlaceHolder='Enter password' />
              <Link to="/login" className='mb-2'>login</Link>
              <button type="submit" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg 
            text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{isSubmitting ? "Loading" : "Register"}</button>
            </div>
          </form>
        </FormProvider>

      </div>
    </div>
  )
}

export default Register