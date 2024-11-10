//@ts-nocheck

import api, { useGetSingleReelQuery } from "@/redux/slices/apiSlice";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";



export function useReelLoader() {

    
    const [currentIndex,setCurrentIndex] = useState(0);
    const [currentReel,setCurrentReel] = useState(null);
    const [nextReel,setNextReel] = useState(null);


    const {data : fetchedCurrentReel} = useGetSingleReelQuery(currentIndex,{skip : currentIndex < 0});


    const {data : fetchedNextReel} = useGetSingleReelQuery(currentIndex+1,{skip : currentIndex < 0});


    useEffect(() => {

        if (fetchedCurrentReel) {
            setCurrentReel(fetchedCurrentReel?.data);
        }

        if (fetchedNextReel) {
            setNextReel(fetchedNextReel?.data);
        }

    },[fetchedCurrentReel,fetchedNextReel]);

    const handleSwipeUp = useCallback(() => {

        if (nextReel) {
            setCurrentReel(nextReel);
            setCurrentIndex(prev => prev+1);
        }

    },[nextReel]);



    return [currentReel,nextReel,handleSwipeUp];
 


}