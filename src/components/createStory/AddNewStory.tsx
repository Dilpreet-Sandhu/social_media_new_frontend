import { setCreateStory } from '@/redux/slices/miscSlice';
import { useAppSelector } from '@/redux/store'
import { Avatar } from '@mui/material'
import { PlusCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddNewStory = () => {

    const { user } = useAppSelector(state => state.user);
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    function handleOpenAddStoryDialog() {
        dispatch(setCreateStory());
        navigate('/');
    }


  return (
    <div className="w-[300px] absolute ml-[200px] h-[500px] top-[100px] bg-black/10 flex items-center justify-center flex-col   rounded-md">
        <div className='cursor-pointer' onClick={handleOpenAddStoryDialog}>
          <Avatar variant="square" sx={{width : "70px",height : "70px"}} src={user?.avatar}/>
        </div>
          <span className="absolute right-[110px] top-[250px]"><PlusCircle color="white"/></span>
          <p className="text-white text-[20px] font-medium">
            Add New Story
          </p>
  </div>
  )
}

export default AddNewStory
