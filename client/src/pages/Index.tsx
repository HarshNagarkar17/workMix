import NavBar from '@/components/NavBar';
import CreateArticleForm from '@/components/forms/CreateArticleForm';
import { useProfile } from '@/hooks/use-profile';

const Index = () => {

  return (
    <div>
      <NavBar />
      {/* {profileImage && (
        <div className='w-[90px] mx-auto h-[90px] mb-6 rounded-full bg-[#474648]'>
          <img src={profileImage} className='w-full h-full rounded-full' />
        </div>
      )} */}
      <div className='mt-4'>
        <div>
          <CreateArticleForm />
        </div>
      </div>
    </div>
  )
}

export default Index