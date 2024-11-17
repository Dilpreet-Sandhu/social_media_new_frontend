

interface reelProps {
    Reelicon : any;
    label : string;
    onClick ?: (props : any | void) => void;
    alreadyLiked?: boolean;
}

const ReelButton = ({
    Reelicon ,
    label,
    onClick,
    alreadyLiked
} : reelProps) => {

   
  return (
    <>
    <div  onClick={onClick} className='w-12 h-12 cursor-pointer rounded-full flex items-center justify-center bg-white/10 text-white'>

     

        <Reelicon className={`${alreadyLiked ? "fill-white" : ""}`}/>
        
      
    </div>
    <p className='text-[12px] text-white'>{label}</p>
    </>
  )
}

export default ReelButton
