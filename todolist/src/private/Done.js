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
            <h5>計画したことや目標の達成をおめでとう</h5>
       {

        taskList? 
            taskList.map((task,index)=>{
              if(task.completed === true){
                return(
                  <div className='task-content'>
                    <><i className="fa-regular fa-circle-check"/> </>{task.content}
                    {/* <span className="replyicon" onClick={()=>{alert('現在工事中です。')}}><i className="fa-solid fa-reply" /></span> */}
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