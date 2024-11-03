import { ChangeEvent, useState } from "react";
import InputAndLabelContainer from "../Input";
import Button from "../../Button";
import Avatar from "./Avatar";
import { useFileHandler } from "6pp";
import { toast } from "react-toastify";
import axios from "axios";
axios.defaults.withCredentials= true;

const SignUpForm = ({
  handleCurrentStep,
  currentStep,
  handleLastStep ,
  setIsLoggingIn
}: {
  handleCurrentStep: () => void;
  currentStep: number;
  handleLastStep : () => void;
  setIsLoggingIn : any
}) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const avatar = useFileHandler("single");


  async function handleSignUp() {

    const {username,email,password} = formData;


    if (!username || !email || !password) {
        toast("please provide all the fields",{type : "warning"});
        return;
    }



    const data = {
        username,
        email,
        password,
        avatar : avatar.file
    }

    try {

        const res = await axios.postForm("http://localhost:4000/api/users/sign-up",data,{withCredentials : true});

        if (res.data) {
            toast("user registed succesfully",{type : "success"});
            setIsLoggingIn((prev : any) => !prev);
        }
        
    } catch (error) {
        console.log("error while signing up: ",error);
        toast("error while signing up",{type :"error"});
    }
   
  }

  function setInputVal(e : ChangeEvent<HTMLInputElement>) {
    console.log(e.target.name);
    setFormData({...formData,[e.target.name] : e.target.value});
  }


  return (
    <div className="space-y-5 w-full flex justify-center  h-[100px]">
      <div className="my-6">

        <>
        {currentStep == 1 && (
          <InputAndLabelContainer
          value={formData.username} 
          setValue={setInputVal}
            width="700px"
            placeholder="enter your username"
            name="username"
            label="username"
          />
        ) 
        }</>
        <>
        {currentStep == 2 && (
          <InputAndLabelContainer
          value={formData.email} 
          setValue={setInputVal}
            width="700px"
            placeholder="enter your email"
            name="email"
            label="email"
          />
        ) 
        }</>
        <>
        {currentStep == 3 && (
          <InputAndLabelContainer
          value={formData.password} 
          setValue={setInputVal}
            width="700px"
            placeholder="enter your password"
            name="password"
            label="password"
          />
        ) 
        }</>
        <>
        {currentStep == 4 && (
          <Avatar
            avatar={avatar}
          />
        ) 
        }</>
       
        <div className="mt-4 w-full gap-3 flex items-center justify-center">
            
            <Button onClick={() => handleLastStep()} buttonType="bgfilled" width="336px" height="55px" text={"Prev"}/>
            <Button onClick={() => currentStep < 4 ? handleCurrentStep() : handleSignUp()} buttonType="bgfilled" width="336px" height="55px" text={currentStep < 4 ? "Next" :"Sign Up"}/>
        </div>

      </div>
    </div>
  );
};

export default SignUpForm;
