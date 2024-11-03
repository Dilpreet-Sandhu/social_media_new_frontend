import { Instagram } from "lucide-react";
import LoginForm from "./login/loginForm";
import Button from "../Button";

const Login = ({ setIsLoggingIn }: { setIsLoggingIn: any }) => {


    const changeSignUp = () => {
        setIsLoggingIn((prev : any) => !prev);
    }


  return (
    <div className="w-full max-h-screen">
      <div className="w-full h-[40px] mt-20 flex justify-center">
        <Instagram color="gray" width={"30px"} height={"30px"} />
      </div>

      <div className="w-[450px] text-center h-[400px] rounded-xl mt-5 border-[2px] px-8 border-gray-300 mx-auto">
        <h1 className="mt-5 text-black/80 tracking-normal font-medium text-2xl text-pretty">
          Sign In
        </h1>

        <LoginForm />

        <p className="text-[11px] text-black/80 mt-2">
          By countinuing,you agree to the{" "}
          <span className="underline">Term of use</span> and{" "}
          <span className="underline">privacy policy</span>
        </p>

        <div className="mt-6 w-full text-[11px] h-10 flex items-center justify-between">
          <span className="underline cursor-pointer text-black/80">
            report issues with sign in
          </span>

          <span className="underline cursor-pointer text-black/80">
            forgot your password
          </span>
        </div>
      </div>

      <div className="w-full flex mt-7 items-center justify-center">
        <div className="w-[470px] flex items-center justify-center gap-3">
          <div className="w-32 h-[2px] bg-[#cecece]" />
          <p className="text-[#828282] text-[17px] tracking-wider text-nowrap text-center">
            New To Our Community
          </p>
          <div className="w-32 h-[2px] bg-[#cecece]" />
        </div>
      </div>

      <div className="w-full flex mt-5 items-center justify-center ">
        <Button buttonType="outline" onClick={changeSignUp} type="button" width="420px" text="Create an account"/>
      </div>

    </div>
  );
};

export default Login;
