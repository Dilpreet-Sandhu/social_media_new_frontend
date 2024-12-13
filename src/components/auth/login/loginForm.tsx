import InputAndLabelContainer from "../Input";
import Button from "../../Button";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const identifier = formData.get("identifier");
    const password = formData.get("password");

    if (!identifier || !password) {
      toast("all fields are neccesary",{type :"error"});
    }

    const data = {
      identifier,
      password
    };

    try {

      const res = await axios.post("http://localhost:4000/api/users/sign-in",data,{withCredentials : true});
        console.log(res.data?.success);
      if (res.data?.success) {
        console.log(res?.data?.data);
        toast("you are logged in succesfully",{type : "success"});
        dispatch(setUser(res?.data?.data));
        navigate("/");
      }
      
    } catch (error) {
        console.log("error while logging in: ",error);
        toast("error while logging in",{type :"error"});
    }


  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <InputAndLabelContainer
        name="identifier"
        placeholder="enter your username or email"
        label="username or email"
      />
      <InputAndLabelContainer
        name="password"
        placeholder="enter your password"
        label="password"
        type={"password"}
      />

      <div className="mt-3">
        <Button width="370px" buttonType="bgfilled" type="submit" text="Log In" />
      </div>
    </form>
  );
};

export default LoginForm;
