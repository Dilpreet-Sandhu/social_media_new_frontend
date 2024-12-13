import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




export function getOrSaveToLocalStorage({get,value,key} : {get?: boolean,value ?: any[],key : string}) {



  if (get) {

    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : null;
  }
  else {
     localStorage.setItem(key,JSON.stringify(value));
  }

}