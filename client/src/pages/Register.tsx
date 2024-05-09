import RHFInput from '@/components/RHFInput'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from '@/schema/auth';
import { Link } from 'react-router-dom';
import RHFImageSelector from '@/components/RHFImageSelector';
import { useSnackbar } from "notistack";
import { useRouter } from '@/hooks/use-router';
import { registerUser } from '@/service/api/auth.service';
import { useProfile } from '@/hooks/use-profile';
import { useAuth } from '@/hooks/use-auth';

const Register = () => {

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { setTokens } = useAuth();
  const { setUserProfile } = useProfile();

  interface DefaultValues {
    username: string;
    email: string;
    password: string;
    profileImage: any
  }

  const defaultValues: DefaultValues = {
    username: "",
    email: "",
    password: "",
    profileImage: null
  }
  const methods = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: zodResolver(registerSchema())
  })

  const { handleSubmit, formState: { isSubmitting }, watch } = methods;

  const values = watch();

  const handleGetProfilePicture = () => {
    const fileInput = document.getElementById("profileImage");
    fileInput?.click();
  }

  const handleOnSubmit = handleSubmit(async (userData) => {
    try {
      const res = await registerUser(userData, values.profileImage);
      setTokens(res.data.tokens)
      setUserProfile(res.data.user);
      enqueueSnackbar("Account created", {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 2000,
      });
      // router.push("/");
    } catch (error: any) {
      enqueueSnackbar(error.response.data.error, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 2000,
      });
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
              <RHFInput name='username' PlaceHolder='Enter username' />
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