import { useEffect, useState } from "react"

const Done = () => {

    const [taskList,setTaskList] = useState([])
    const completedTask = JSON.parse(window.localStorage.getItem('tasked'))

    useEffect(()=>{
    const completedTask = JSON.parse(window.localStorage.getItem('tasked'))
     setTaskList(completedTask)
    },[])

    return(
        <div>
            <h2>DONE LIST</h2>
            <h4>Congratulations! 🎉</h4>
       {

        taskList? 
            taskList.map((task,index)=>{
              if(task.completed === true){
                return(
                  <div className='task-content'>
                    {task.content}
                    <span className="replyicon"><i className="fa-solid fa-reply" /></span>
                  </div>
                )
              }      
            })
            :
            <></>
          }
    </div>
    )
}

export default Done;