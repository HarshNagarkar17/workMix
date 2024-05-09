import RHFInput from '@/components/RHFInput'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from '@/schema/auth';
import { Link } from 'react-router-dom';
import { useSnackbar } from "notistack"
import { useRouter } from '@/hooks/use-router';
import { loginUser } from '@/service/api/auth.service';
import { useProfile } from '@/hooks/use-profile';
import { useAuth } from '@/hooks/use-auth';

const Login = () => {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const { setTokens } = useAuth();
    const { setUserProfile } = useProfile();

    interface DefaultValues {
        email: string;
        password: string;
    }
    const defaultValues: DefaultValues = {
        email: "",
        password: ""
    }
    const methods = useForm({
        defaultValues,
        mode: "onBlur",
        resolver: zodResolver(loginSchema())
    })
    const { handleSubmit } = methods;

    const handleOnSubmit = handleSubmit(async (values) => {
        try {
            const res = await loginUser(values);
            setTokens(res.data.tokens);
            setUserProfile(res.data.user);
            enqueueSnackbar("Logged In", {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 2000,
            });
            router.push("/");
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
                <h2 className='mb-4 text-[22px] font-medium'>Login</h2>
                <FormProvider {...methods}>
                    <form onSubmit={handleOnSubmit}>
                        <div className='flex flex-col'>
                            <RHFInput name='email' PlaceHolder='Enter email' />
                            <RHFInput name='password' PlaceHolder='Enter password' />
                            <Link to="/register" className='mb-2'>Register</Link>
                            <button type="submit" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg 
            text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Login</button>
                        </div>
                    </form>
                </FormProvider>

            </div>
        </div>
    )
}

export default Login