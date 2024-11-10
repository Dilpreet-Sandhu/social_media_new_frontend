


import { Avatar } from '@mui/material';
import { useAppSelector } from '../../redux/store';
import Button from '../Button';
import { MoreHorizontal } from 'lucide-react';


const Profile = ({user} : {user : any}) => {

  const {user : myUser} = useAppSelector((state) => state.user);


  
  

  return (
    <div className='max-w-full h-[300px]  relatvie flex gap-16 pt-10 px-24'>

    <div >

   <Avatar sx={{width :"150px",height : '150px',border : "4px solid gray"}} src={user?.avatar}/>
    </div>

      <div className='w-full h-[200px] pt-5'>
        <div className='flex items-center gap-5'>
          <span className='text-[20px] flex font-medium tracking-normal'>{user?.username}</span>

          <div className='flex gap-2 items-center'>

          {
            user?._id.toString() == myUser?._id.toString() ?<Button    buttonType='profile' text='Edit profile'/> : <Button bg={myUser?.following.includes(user?._id) ? "" : "#0094f7"} style={{color : "black"}} buttonType='profile' text={myUser?.following.includes(user?._id) ? "Following" : "Follow"}/>
          }

          <Button buttonType='profile' text="message"/>

          <span className='ml-2 cursor-pointer'>
            <MoreHorizontal/>
          </span>

          </div>

   
        </div>

          <div className='w-full gap-7 flex mt-10'>
            <p>{user.followers.length} followers</p>
            <p>{user.following.length} followers</p>
          </div>

      </div>

      <div className='w-[1000px]  h-[2px] absolute top-[300px] bg-gray-300'/>
      
    </div>
  )
}

export default Profile;
