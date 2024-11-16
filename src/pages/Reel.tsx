import Reels from "@/components/Reels/Reels"
import AppLayout from "@/layout/Applayout"


const Reel = () => {
  return (
    <div className="w-full ml-[46px] overflow-y-hidden flex items-center justify-center h-screen">


        <Reels/>
       
       
        
    </div>
  )
}

export default AppLayout()(Reel)