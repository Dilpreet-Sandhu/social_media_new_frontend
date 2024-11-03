


import { Avatar } from '@mui/material';
import { useAppSelector } from '../../redux/store';


const Profile = ({user} : {user : any}) => {

  const {user : myUser} = useAppSelector((state) => state.user);

  return (
    <div className='max-w-full h-[400px] relative px-24'>

      <div className='w-full relative h-[200px] bg-gray-300'>
          <div className='absolute left-10 right-0 bottom-[-90px]'>
            <Avatar sx={{width :"140px",height : '140px',border : "4px solid gray"}} src={user?.avatar}/>
          </div>
      </div>
      <div className='w-full h-[200px]  ml-[200px] pt-5'>
        <div className='flex items-center gap-5'>
          <span className='text-[20px] flex font-medium tracking-normal'>{user?.username}</span>

          {
            user?._id.toString() == myUser?._id.toString() ? <button onClick={() => console.log("hello wolrd")} className='w-[120px] h-[40px] flex items-center justify-center text-black/70 cursor-pointer bg-gray-200 rounded-md'>Edit profile</button> : <button onClick={() => console.log("hello wolrd")} className='w-[120px]  h-[40px] flex items-center justify-center text-white cursor-pointer bg-blue-500 rounded-md'>Follow</button>
          }

   
        </div>

          <div className='w-full gap-7 flex mt-5'>
            <p>{user.followers.length} followers</p>
            <p>{user.following.length} followers</p>
          </div>
      </div>

      <div className='w-full h-[2px] bg-gray-300'/>
      
    </div>
  )
}

export default Profile;
