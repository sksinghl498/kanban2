import { useEffect, useRef } from 'react';
import './Dropdown.css';


export default function Dropdown(props){


    const dropdownRef= useRef();

    const handleClick= (event)=>{
        if(dropdownRef && !dropdownRef?.current?.contains(event?.target)){
            if(props.onClose) props.onClose();
        }
    }


    useEffect(()=>{
        document.addEventListener('click',handleClick,{capture: true})
        return ()=>{
            document.removeEventListener('click',handleClick,{capture: true})
        }
    })
    return (
        <div 
        style={{
            position: "absolute",
            top: "100%",
            right: "0"
        }}
        ref={dropdownRef} className="dropdown">
            {props.children}
        </div>
    )
}