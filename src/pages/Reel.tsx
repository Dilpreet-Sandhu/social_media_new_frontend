import Reels from "@/components/Reels/Reels"
import AppLayout from "@/layout/Applayout"


const Reel = () => {
  return (
    <div className="w-full flex items-center justify-center lg:mr-24 h-screen">


        <Reels/>
       
       
        
    </div>
  )
}

export default AppLayout()(Reel)