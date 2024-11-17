import { useState } from "react";

const CreateCommentButton = () => {

    const [inputVal,setInputVal] = useState("");


  return (
    <div className="w-full h-[50px] border-t-[2px] flex border-black/50">

        <input value={inputVal} onChange={(e) => setInputVal(e.target.value)} className="outline-none flex-1 pl-6 bg-transparent"/>

        <div>
            <button disabled={inputVal.length <= 0} className="w-[70px] h-full ml-4 bg-transparent text-blue-700 disabled:text-blue-400">Post</button>
        </div>
      
    </div>
  )
}

export default CreateCommentButton
