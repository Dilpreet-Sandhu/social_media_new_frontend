


import { Skeleton } from '@mui/material'


const UserProfileLoader = () => {
  return (
    <div className='w-full cursor-pointer pl-2 h-[50px] rounded-md gap-2 flex items-start'>

        <Skeleton className='w-[40px] h-[40px] bg-black/5 rounded-full'/>

        <Skeleton className='w-3/4 h-[15px]'/>
      
    </div>
  )
}

export default UserProfileLoader
