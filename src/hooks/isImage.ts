
export function useCheckImage(url : string) {

    const arrayOfUrl = url.split(".");
    const lastElement = arrayOfUrl[arrayOfUrl.length - 1];

    if ((lastElement === "jpg" || lastElement === "png" || lastElement === "jpeg")) {
        return true;
    }else {
        return false;
    }

}