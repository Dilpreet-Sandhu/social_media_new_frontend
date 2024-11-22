

const Progress = ({stories,currentStep} : {stories : any[],currentStep : number}) => {

console.log(stories.length);

  return (
    <div className="w-full h-[40px] gap-1 px-1  flex items-center">

        {
            stories.map((story,idx) => (
                <div key={idx} className={`w-1/${stories?.length} h-[2px] rounded-full bg-black/60 z-10`}>
                    <div style={{
                      animationDuration :  "4s",
                      
                    }} className={`${(currentStep == idx) && "animate bg-white"} h-[2px] `}>
                    </div>
                </div>
            ))
        }
      
    </div>
  )
}

export default Progress
