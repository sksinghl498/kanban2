import { useRef, useState } from 'react';
import { X } from 'react-feather';
import './Editable.css';

export default function Editable(props){
    const [showEdit,setShowEdit]= useState(false);
    const [inputValue, setInputValue]= useState(props.default || "");

    
    
    return (
        <div className="editable">

            {
                showEdit ? 
               (
                <form className={`editable_edit ${props.editClass || ""}`} onSubmit={(e)=> {
                    e.preventDefault();
                    if(props.onSubmit) props.onSubmit(inputValue)
                    setShowEdit(false)
                    setInputValue("")
                }} className="editable_edit">
                    <input type="text" 
                    autoFocus
                    value={inputValue}
                    onChange={(e)=> setInputValue(e.target.value)}
                    placeholder={props.placeholder || "Enter Item"} />
                    <div className="editable_edit_footer">
                        <button type="submit">{props.buttonText || "Add"}</button>
                        <X onClick={()=> setShowEdit(false)} />
                    </div>
                </form>)  : ( <p className={`editable_display ${props.displayClass || ""}`} onClick={()=> setShowEdit(true)}>{props.text || "Add items"}</p>)
            }
         
        </div>
    )
}

