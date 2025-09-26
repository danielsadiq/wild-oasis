import { useCallback, useEffect, useRef } from "react";

export function useOutClick(closeFn: ()=> void, listenCapturing=true){
  const ref = useRef<HTMLDivElement>(null);

  const handleEscape = useCallback((e: KeyboardEvent) =>{
    if (e.key === 'Escape') closeFn();
  }, [closeFn])
  const handleClick = useCallback((e: MouseEvent)=>{
    if (ref.current && !ref.current.contains(e.target as Node)) closeFn();
  }, [closeFn]);

  useEffect(()=>{
    // The true allows the event to be captured in the capturing phase (as the event moves down the tree)
    document.addEventListener('click', handleClick, listenCapturing);
    document.addEventListener('keydown', handleEscape, listenCapturing);
    return ()=> {
      document.removeEventListener('click', handleClick, listenCapturing);
      document.removeEventListener('keydown', handleEscape, listenCapturing);
    }
  }, [closeFn, handleClick, handleEscape, listenCapturing]);

  return ref
}