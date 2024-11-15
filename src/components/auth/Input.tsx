//@ts-nocheck
import {ChangeEvent} from 'react'

interface InputAndLabelContainerProps {
    label : string;
    placeholder : string;
    name : string;
    width ?: string;
    value ?: string;
    setValue ?: (e : ChangeEvent<HTMLInputElement>) => void;
}

interface InputProps {
    placeholder : string;
    name : string;
    width ?: string;
    value ?: string;
    setValue ?: (e : ChangeEvent<HTMLInputElement>) => void;
}


export default function InputAndLabelContainer({label,placeholder,name,width,value,setValue } : InputAndLabelContainerProps) {

    

    return (
        <div className=" w-full text-start py-2">
            <label className="light-gray text-[13px] tracking-wider">
                {label}
            </label>
            <input value={value} onChange={(e) => setValue(e)} style={{width : width}} placeholder={placeholder} name={name} className="border-[2px] light-gray block text-[14px] mt-[2px] placeholder:text-[13px] pl-1 w-[380px] rounded-lg h-[40px] border-[#dedede] outline-none "/>
        </div>
    )

}

export function Input({label,placeholder,name,width,value,setValue} : InputProps) {

    return (
        <div className='w-full py-2'>
            <input value={value} onChange={(e) => setValue(e)} style={{width : width}} placeholder={placeholder} name={name} className="border-[2px] light-gray block text-[14px] mt-[2px] placeholder:text-[13px] pl-1 w-[380px] rounded-lg h-[40px] border-[#dedede] outline-none "/>
        </div>
    )
}