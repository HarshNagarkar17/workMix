import RHFInput from '@/components/RHFInput'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { authSchema } from '@/schema/auth';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '@/utils/axios';
import { setTokens } from '@/service/token.service';

const Login = () => {

    const navigate = useNavigate();

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
        resolver: zodResolver(authSchema())
    })

    const { handleSubmit} = methods;

    const handleOnSubmit = handleSubmit(async (values) => {
        try {
            const res = await axiosInstance.post("/api/login",values);
            if(res.data.tokens)
                setTokens(JSON.stringify(res.data.tokens));
            navigate("/")
        } catch (error:any) {
            console.log(error.response.data.error);
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