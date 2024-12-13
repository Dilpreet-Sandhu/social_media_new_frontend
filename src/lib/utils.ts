import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




export function getOrSaveToLocalStorage({get,value,key} : {get?: boolean,value ?: any[],key : string}) {


  if (get) {
    return JSON.parse(localStorage.getItem(key) || "");
  }
  else {
     localStorage.setItem(key,JSON.stringify(value));
  }

}