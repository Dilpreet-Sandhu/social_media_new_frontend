import { useEffect, useState } from "react"


const Progress = ({stories,currentStep,currentUserIdx} : {stories : any[],currentStep : number,currentUserIdx : number}) => {

    const [resetAnimation,setResetAnimation] = useState(false);

    useEffect(() => {

    setResetAnimation(true);

    const timeOut = setTimeout(() => {
    setResetAnimation(false)
    },50);


    return () => clearTimeout(timeOut);
    
    },[currentUserIdx]);

    console.log(stories.length);

  return (
    <div className="w-full h-[40px] gap-1 px-1  flex items-center">

        {
            stories.map((_,idx) => (
                <div style={{width : stories?.length === 1 ? "100%" : ""}} key={idx} className={`w-1/${stories?.length}  h-[2px] rounded-full bg-black/60 z-10`}>
                    <div style={{ 
                      animationDuration :  "4s",
                
                      
                    }} className={`${(currentStep == idx && !resetAnimation) ? "animate bg-white" : "reset" }   bg-black h-[2px] `}>
                    </div>
                </div>
            ))
        }
      
    </div>
  )
}

export default Progress
