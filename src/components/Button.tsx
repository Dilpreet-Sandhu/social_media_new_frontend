const Button = ({
  type,
  text,
  width,
  onClick,
  buttonType,
  height,
}: {
  type?: "button" | "reset" | "submit";
  text: string;
  width: string;
  onClick?: () => void;
  buttonType: "bgfilled" | "outline";
  height?: string;
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
  }
};

export default Button;
