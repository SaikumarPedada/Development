import {useState, useEffect} from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
//import { Button } from 'bootstrap';
import axios from 'axios';

function Todo(){
    let [task,setTask]=useState('')
    let [showAddInput,setShowAddInput]=useState(false)
    let [taskList,setTaskList]=useState([]);
    let [isCompletedList,setIsCompletedList]=useState([]);
    let [fetchList,setFetchList]=useState([]);
    console.log(fetchList)
    
    useEffect(()=>{
        const fetchTasks=async()=>{
            const res=await axios.get("http://localhost:3000/todo_info");
            setFetchList(res.data);
        };
        fetchTasks();    
    },[])
    async function addTask(){
        if (task.trim() !== "") {
            const newTask = { task_title: task, isCompleted: false };
            await axios.post("http://localhost:3000/todo_info", newTask);
            setTask('');
            setShowAddInput(false);
            setFetchList([...fetchList, newTask]);
        }
    };
    function EnterKey(e){
        if(e.key==='Enter'){
            addTask();
        }
    }
    async function taskComplete(id){
        // setTaskList(taskList.map((task,id)=>
        //     idx==id?{...task,isCompleted:!task.isCompleted}:task
        // ))
        const res=await axios.get(`http://localhost:3000/todo_info/${id}`);
        const existingTask=res.data;
        const updatedTask={...existingTask,isCompleted:!existingTask.isCompleted};
        await axios.put(`http://localhost:3000/todo_info/${id}`,updatedTask);
        setFetchList(fetchList.map(task => (task.id === id ? updatedTask : task)));
    }
    async function taskDelete(id){
        //setTaskList(taskList.filter((_, id) => id !== idx))
        await axios.delete(`http://localhost:3000/todo_info/${id}`)
        setFetchList(fetchList.filter(task => task.id !== id));
    }
    return(
        <>
        <div className='card'>
            <div className='card-title d-flex justify-content-between align-items-center' style={{gap:'20px'}}>
                <h1 className='text-primary'><i>ToDo List</i></h1>
                <button type='button' className='btn btn-primary ms-5' onClick={()=>{setShowAddInput(true)} }onDoubleClick={()=>{setShowAddInput(false)}}>+Add Task</button>
            </div>
            <hr className='cardSeparator'/>
            <div className='card-body d-inline'>
                {showAddInput&& (
                <div className="alert alert-primary d-flex align-items-center justify-content-between p-2 mb-2" style={{gap:'5px'}} role="alert">
                    <input
                        type="text"
                        className="form-control"
                        value={task}
                        onChange={(p) => {
                        setTask(p.target.value);
                        }}
                        onKeyDown={EnterKey}
                        placeholder="Enter your task and press Enter"
                    />
                    <button type='submit' className='btn btn-danger btn-sm' onClick={()=>{setShowAddInput(false)}}>Cancel</button>
                </div>
                )}
                {/* <div className='form-check form-switch'>
                    <input className='form-check-input' type='checkbox' checked={isCompletedList} onChange={()=>{
                        setIsCompletedList(!isCompletedList);
                    }}/>
                </div> */}
                <div className="p-3 d-flex align-items-center gap-3">
                    <button className='btn btn-light'><span className={`fw-bold ${!isCompletedList ? "text-primary" : "text-secondary"}`}
                        onClick={() => setIsCompletedList(false)}>Pending Tasks</span></button>
                    <span>|</span>
                    <button className='btn btn-light'><span className={`fw-bold ${isCompletedList ? "text-primary" : "text-secondary"}`}
                        onClick={() => setIsCompletedList(true)}> Completed Tasks</span></button>
                </div>
                {!isCompletedList?
                
                    <div> {fetchList.length>0&&(<ol className='list-group mt-2'>
                    
                        {fetchList.map((t,idx)=>(
                            !t.isCompleted&&
                            <div className='d-flex align-items-center justify-content-between p-2 mb-2' style={{border:"1px solid #ddd", borderRadius: "10px",gap: "20px"}}key={idx}>
                                <input type='checkbox'className='form-check fw-bold' checked={t.isCompleted} onChange={()=>{taskComplete(t.id)}}/>
                                <li className='list-group-item' style={{border: "none"}}>{t.task_title}</li>
                                <button className='btn btn-danger' onClick={()=>{taskDelete(t.id)}}><i className='bi bi-trash'></i></button>
                            </div>
                        ))}</ol>)}
                    </div>:
                    <div>
                        {fetchList.length>0&&(<ol className='list-group mt-2'>
                            {fetchList.map((t,idx)=>(
                                t.isCompleted&&
                                <div className='d-flex align-items-center justify-content-between p-2 mb-2' style={{border:"1px solid #ddd", borderRadius: "10px",gap: "20px"}}key={idx}>
                                    <li className='list-group-item' style={{border: "none"}}>{t.task_title}</li>
                                    <button className='btn btn-danger' onClick={()=>{taskDelete(t.id)}}><i className='bi bi-trash'></i></button>
                                </div>
                            ))}</ol>)}
                    </div>
                }
            </div>
        </div></>
    );

}
export default Todo