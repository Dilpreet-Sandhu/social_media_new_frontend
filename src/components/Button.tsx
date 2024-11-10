import {ButtonHTMLAttributes} from "react";


const Button = ({
  type,
  text,
  width,
  onClick,
  buttonType,
  height,
  bg,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &  {
  type?: "button" | "reset" | "submit";
  text: string;
  width?: string;
  onClick?: () => void;
  buttonType: "bgfilled" | "outline" | "profile";
  height?: string;
  props? : any,
  bg ?: string;
}) => {
  if (buttonType == "bgfilled") {
    return (
      <button
        onClick={onClick}
        style={{ width: width }}
        className="bg-[#c2c2c2] py-2 text-white text-[17px] rounded-full h-[43px]"
        type={type || "button"}
      >
        <p>{text}</p>
      </button>
    );
  } else if (buttonType == "outline") {
    return (
      <button
        onClick={onClick}
        style={{ width: width, height: height }}
        className=" border-[1px] py-2 border-black/80 text-black  text-[16px] rounded-full h-[43px]"
        type={type || "button"}
      >
        <p>{text}</p>
      </button>
    );
  }else if (buttonType === "profile") {
    return (
      <button {...props} style={{background : bg}} onClick={onClick} className='w-[120px] h-[35px] text-[14px]   flex items-center justify-center text-black/70  cursor-pointer bg-gray-200 rounded-xl'>{text}</button>
    )
  }
};

export default Button;
