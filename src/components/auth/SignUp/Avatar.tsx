import {Avatar} from '@mui/material';

const AvatarInput = ({avatar} :{avatar : any}) => {
  return (
    <div className='space-y-4 w-full flex items-center justify-center'>
        <div className='w-[100px]  flex flex-col items-center justify-center'>
            <label htmlFor='Image'>    
           <Avatar src={avatar.preview || ""} sx={{width : "100px",height : "100px"}}/>
            </label>
            <h1 className='text-[20px] text-nowrap tracking-normal mt-2 text-black/80 '>Choose a avatar</h1>
        </div>
      <input onChange={avatar.changeHandler} type='file' className='hidden' id="Image"/>
    </div>
  )
}

export default AvatarInput;
