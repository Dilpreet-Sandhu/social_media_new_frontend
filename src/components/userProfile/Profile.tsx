import { Avatar } from "@mui/material";
import { useAppSelector } from "../../redux/store";
import Button from "../Button";
import { MoreHorizontal } from "lucide-react";
import { useSendFollowRequestMutation, useSendUnfollowRequestMutation } from "@/redux/slices/apiSlice";
import { useDispatch } from "react-redux";
import { addUserToFollowers, removeUserFromFollowers } from "@/redux/slices/userSlice";
import { useState } from "react";

const Profile = ({ user }: { user: any }) => {
  const { user: myUser } = useAppSelector((state) => state.user);
  const [sendFollowRequest] = useSendFollowRequestMutation();
  const [sendUnfollowRequest] = useSendUnfollowRequestMutation();
  const dispatch = useDispatch();
  const alreadyFollowing = myUser?.following.includes(user?._id);
  const [following,setFollowing] = useState(!!alreadyFollowing);

  function handleCLickFollow() {
    try {
      if (user?._id) {
        sendFollowRequest(user?._id);
        setFollowing(true);
        dispatch(addUserToFollowers(user?._id));
      }
    } catch (error) {
      console.log("error while adding user to followers");
    }
  }

  function handleUnfollowRequest() {
    try {
      if (user?._id) {
        sendUnfollowRequest(user?._id);
        setFollowing(true);
        dispatch(removeUserFromFollowers(user?._id));
      }
      
    } catch (error) {
      console.log("error while removing user from followers");
    }
  }

  return (
    <div className="max-w-full h-[300px]  relatvie flex gap-16 pt-10 px-24">
      <div>
        <Avatar
          sx={{ width: "150px", height: "150px", border: "4px solid gray" }}
          src={user?.avatar}
        />
      </div>

      <div className="w-full h-[200px] pt-5">
        <div className="flex items-center gap-5">
          <span className="text-[20px] flex font-medium tracking-normal">
            {user?.username}
          </span>

          <div className="flex gap-2 items-center">
            {user?._id.toString() == myUser?._id.toString() ? (
              <Button buttonType="profile" text="Edit profile" />
            ) : (
              <Button
                onClick={() => {
                  following
                    ? handleUnfollowRequest()
                    : handleCLickFollow();
                }}
                bg={following ? "" : "#0094f7"}
                style={{ color: "black" }}
                buttonType="profile"
                text={
                  following ? "Following" : "Follow"
                }
              />
            )}

            <Button buttonType="profile" text="message" />

            <span className="ml-2 cursor-pointer">
              <MoreHorizontal />
            </span>
          </div>
        </div>

        <div className="w-full gap-7 flex mt-10">
          <p>{user.followers.length} followers</p>
          <p>{user.following.length} following</p>
        </div>
      </div>

      <div className="w-[1000px]  h-[2px] absolute top-[300px] bg-gray-300" />
    </div>
  );
};

export default Profile;
