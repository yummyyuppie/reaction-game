import { useEffect, useRef, useState } from 'react';
import './Block.css'


export default function Block(props){
    let {delay} = props
    const timerRef = useRef();
    const [showBlock, setShowBlock] = useState(false);
    const [reactionTime, setReactionTime] = useState(0);

    useEffect(()=>{
        setTimeout(()=>{
            props.visibleBlock();
            setShowBlock(true);
            startTimer();
        }, delay)
        return () => clearInterval(timerRef.current);
    }, [])

    function timer(){
        setReactionTime(prev=>prev+1)
    }

    function startTimer(){
        clearInterval(timerRef.current);
        setReactionTime(0);
        timerRef.current = setInterval(timer, 1);
    }

    function stopTimer(){
        clearInterval(timerRef.current);
        props.end(reactionTime);
    }
    return (
        <>
            {showBlock && <div className="block" onClick={stopTimer}>Click me</div>}
        </>
       )
}