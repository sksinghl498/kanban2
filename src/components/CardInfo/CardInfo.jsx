import { Calendar, CheckSquare, List, Tag, Trash, Trash2, Type } from 'react-feather';
import Modal from '../Modal/Modal';
import './cardInfo.css';
import Editable from '../Editable/Editable';
import { useEffect, useState } from 'react';
import Chip from '../Chip/Chip';

export default function CardInfo(props){

    const colors= [
        "#a8193d",
        "#4fcc25",
        "#1ebffa",
        "#8da377",
        "#9975bd",
        "#cf61a1",
        "#240959"
    ]

    const [activeColor,setActiveColor]=useState("");

    const [values,setValues]= useState({...props.card})

    const calculatePercent= ()=>{
        if(values.tasks?.length===0) return "0";
        const completed= values.tasks?.filter(item=> item.completed)?.length;

        return (completed/values.tasks.length)*100+""

    }

    const addLabel= (value,color)=>{
        const index= values.labels?.findIndex((item)=> item.text===value);
        if(index>-1) return;
        const label= {
            text: value,
            color,
        }
        setValues({...values, labels: [...values.labels,label]})
        setActiveColor("");
    }

    const removeLabels= (text)=>{
        const tempLabels= values.labels?.filter(item=> item.text!==text)

        setValues({...values, labels: tempLabels})
    
    }

    const addTask= (value)=>{
        const task= {
            id: Date.now() + Math.random(),
            text: value,
            complete: false
        }
        setValues({...values,tasks: [...values.tasks,task]})
    }

    const removeTask= (id)=>{
        const index= values.tasks?.findIndex((item)=> item.id===id)

        if(index<0) return;

        const tempTasks= values.tasks?.filter((item)=> item.id!==id)

        setValues({...values,tasks: tempTasks})
    }

    const updateTask= (id,completed)=>{
        const index= values.tasks?.findIndex((item)=> item.id===id);
        if(index<0) return;

        const tempTasks= [...values.tasks];
        tempTasks[index].completed= completed;

        setValues({...values,tasks: tempTasks});

    }
    useEffect(()=>{
        props.updateCard(props.card.id,props.boardId,values);
    },[values])


    return (
        <Modal  onClose={()=> props.onClose()}>
            <div className="cardinfo">
                <div className="cardinfo_box">
                     <div className="cardinfo_box_title">
                         <Type/>
                         Title no 1
                     </div>

                     <div className="cardinfo_box_body">
                     <Editable 
                     text={values.title}
                     default={values.title}
                     placeholder="Enter Title"
                     buttonText="Set title"
                     onSubmit={(value)=> setValues({...values,title: value})}
                     />
                     </div>
                </div>


                <div className="cardinfo_box">
                     <div className="cardinfo_box_title">
                         <List/>
                         Description
                     </div>

                     <div className="cardinfo_box_body">
                     <Editable 
                     text={values.desc}
                     placeholder="Enter Description"
                     buttonText="Set Description"
                     onSubmit={(value)=> setValues({...values,desc: value})}
                     />
                     </div>
                </div>



                <div className="cardinfo_box">
                     <div className="cardinfo_box_title">
                         <Calendar/>
                         Date
                     </div>

                     <div className="cardinfo_box_body">
                       <input type="date" defaultValue={values.date ? new Date(values.date).toISOString().substr(0,10) : ""}
                       onChange={(event)=> setValues({...values,date: event.target.value})}
                       />
                     </div>
                </div>



                <div className="cardinfo_box">
                     <div className="cardinfo_box_title">
                         <Tag/>
                         Label
                     </div>
                     <div className="cardinfo_box_labels">
                         {
                             values.labels?.map((item,index)=> <Chip close onClose={()=> removeLabels(item.text)} key={item.text+index}
                             color={item.color}
                             text={item.text}
                             />)
                         }
                     </div>
                     <div className="cardinfo_box_colors">
                         {
                             colors.map((color,index)=> <li key={index} style={{backgroundColor: color }}
                             className={color===activeColor ? "active": ""}
                             onClick={()=> setActiveColor(color)}
                             />)
                         }
                     </div>
                     <div className="cardinfo_box_body">
                     <Editable 
                     text="Add Label"
                     placeholder="Enter Label"
                     buttonText="Add"
                     onSubmit={(value)=> addLabel(value,activeColor)}
                     />
                     </div>
                </div>



                <div className="cardinfo_box">
                     <div className="cardinfo_box_title">
                         <CheckSquare/>
                         Tasks
                     </div>

                    <div className="cardinfo_box_progress_bar">
                        <div className={`cardinfo_box_progress ${calculatePercent()==="100"? "cardinfo_box_progress_active": ""}`} style={{width: calculatePercent()+"%"}}/>
                    </div>



                    <div className="cardinfo_box_list">
                        {
                            values.tasks?.map((item)=>(<div 
                                key={item.id}
                                className="cardinfo_task">
                                <input type="checkbox" defaultChecked={item.completed}
                                onChange={(event)=> updateTask(item.id,event.target.checked)}
                                />
                                <p>{item.text}</p>
                                <Trash2 onClick={()=> removeTask(item.id)} />
                            </div>))
                        }
                    </div>


                     <div className="cardinfo_box_body">
                     <Editable 
                     text="Add new Task"
                     placeholder="Enter Task"
                     buttonText="Add Tasks"
                     onSubmit={(value)=> addTask(value)}
                     />
                     </div>
                </div>

              
            </div>
        </Modal>
    )
}