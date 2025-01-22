import { useEffect, useState } from "react"
import './Todo.css'

const Done = () => {

    const [taskList,setTaskList] = useState([])
    const completedTask = JSON.parse(window.localStorage.getItem('tasked'))

    useEffect(()=>{
    const completedTask = JSON.parse(window.localStorage.getItem('tasked'))
     setTaskList(completedTask)
    },[])

    

    return(
        <div className="todo-wrap">
            <h2><i class="fa-solid fa-rainbow"></i> DONE LIST</h2>
            <h4>Congratulations! 🎉</h4>
            <div class="container text-center">
              <div class="row row-cols-3">
       {
        taskList? 
            taskList.map((task,index)=>{
              if(task.completed === true){
                return(
                  <div className="col" key={index}>
                    <div className="done-col-content">
                      {task.content}
                    </div>
                  </div>

                )
              }      
            })
            :
            <></>
          }
            </div>
          </div>
    </div>
    )
}

export default Done;