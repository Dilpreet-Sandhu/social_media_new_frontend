import useGetFileType from "@/hooks/useGetFileType";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import {File} from 'lucide-react';

const AttachmentView = ({ attachments }: { attachments: any }) => {


  return (
    <>
      {attachments?.attachments?.map((attachment: any) => {
        const getFileType = useGetFileType(attachment?.url);


        return (
            <Link to={attachment?.url}  target="_new" key={attachment?._id} className="flex flex-col gap-1">
                
            <Avatar src={attachments?.sender?.avatar} sx={{width : "30px" ,height : "30px"}}/>
          <div  className="w-[300px] flex h-[200px] ">
            {getFileType == "image" ? (
              <img src={attachment?.url} className="w-full object-cover h-full" />
            ) : getFileType == "video" ? (
              <video src={attachment?.url} className="w-full h-full" controls/>
            ) : (
              <File/>
            )}
          </div>
            </Link>
        );
      })}
    </>
  );
};

export default AttachmentView;
