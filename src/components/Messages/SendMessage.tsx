

const SendMessage = () => {
  return (
    <div className="w-full px-5 h-[70px]">
      <div className="w-full h-[50px] flex rounded-full border-black/40 border-[2px]">

      <input className="flex-1 pl-6 outline-none border-none bg-transparent" placeholder="type a message...."/>
    <div className="w-[70px] flex items-center justify-center h-full">
      <span  className="text-blue-500 cursor-pointer text-[16px] font-medium">
        Send
      </span>
    </div>
      </div>
    </div>
  )
}

export default SendMessage
