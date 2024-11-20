



const useGetFileType = (file : string) => {
  
    const arrOfFile = file.split(".");
    const lastElement = arrOfFile[arrOfFile.length - 1];

    if (lastElement === "png" || lastElement === "jpg" || lastElement === "jpeg") {
        return "image";
    }
    else if (lastElement === "mp4" || lastElement === "mpeg" || lastElement === "gif") {
        return "video";
    }else {
        return "file";
    }



}

export default useGetFileType
