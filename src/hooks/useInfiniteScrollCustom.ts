import { useCallback, useRef } from "react";


interface useInfiniteScrollProps {
    fetchMore : () => void;
    hasMore : boolean;
    threshold ?: number
}


export function useInfiniteScrollCustom({
    fetchMore,
    hasMore,
    threshold = 1.0
} : useInfiniteScrollProps) {

    const observerRef = useRef<IntersectionObserver | null>(null);

    const lastElementRef = useCallback((node : HTMLElement | null) => {

        if (observerRef.current) observerRef.current.disconnect();

        if (node && hasMore) {
            observerRef.current = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    fetchMore();
                }
            },{threshold});


            observerRef.current.observe(node);
        }

    },[fetchMore,hasMore,threshold]);


    return lastElementRef;



}