import React, { useEffect, useState } from 'react'
import './Private.css'

const Task = () => {
  const [taskList, setTaskList] = useState([{
    completed : false,
    content : ''
  }])
  const [inputValue, setInputValue] = useState('')
  const [chks, setChks] = useState([])
  const [indexChk, setIndexChk] = useState([])
  useEffect(()=>{
    const taskedList = window.localStorage.getItem('tasked')
    if(taskedList){
      const parsedList = JSON.parse(taskedList)
      setTaskList(parsedList)
      let chkarr = new Array(parsedList.length).fill(false)
      setChks(chkarr)
    }
  },[])

  const addTask = () =>{
    const newTasks = [...taskList, {content : inputValue , completed : false} ]
    setTaskList(newTasks)
    window.localStorage.setItem('tasked', JSON.stringify(newTasks))
    setInputValue('')
  }

  const removeTask = () => {
    const filteredList = taskList.filter((_,index)=> !indexChk.includes(index))
    setTaskList(filteredList)
    window.localStorage.setItem('tasked', JSON.stringify(filteredList))

    const filteredChks = chks.filter((_,index)=>!indexChk.includes(index))
    setChks(filteredChks)

    setIndexChk([])
  }

  const completedTask = () => {
    // 완료된 항목의 completed 상태를 true로 업데이트
    const updatedTasks = taskList.map((task, index) => {
      if (indexChk.includes(index)) {
        return { ...task, completed: true }; // 선택된 항목을 완료 처리
      }
      return task; // 선택되지 않은 항목은 그대로 유지
    });
  
    setTaskList(updatedTasks); // 업데이트된 리스트로 상태 설정
    window.localStorage.setItem('tasked', JSON.stringify(updatedTasks)); // 로컬 스토리지에 업데이트된 리스트 저장
    setIndexChk([]); // 체크 상태 초기화
  };
  

  const handleChk = (e,index) => {
    const newChks = [...chks]
    newChks[index] = !newChks[index]
    setChks(newChks)
    if(newChks[index]){
      setIndexChk(indexChk => [
        ...indexChk,
          index
      ])
    }else{
      setIndexChk(indexChk=>
        indexChk.filter(num => 
          num !== index
        ))
    }
  }



  return (
    <div>
      <h2>TODO LIST</h2>
      <h4>Write down your goals or to-dos.</h4>
      <div className='todo-button'>
          <button type='button' onClick={()=> {completedTask()}}>完了</button>
          <button type='button' onClick={()=>{removeTask()}}>削除</button>
        </div>
        <div className='addTask-div'>
          <input 
            className='addtask-text' 
            type='text'
            value={inputValue} 
            placeholder="計画や目標を入力してください。"
            onChange={(e)=>{
              setInputValue(e.target.value)
            }}
          />
          <span 
            type='button'
            onClick={()=>{addTask()}}
          >
            <i className="fa-solid fa-circle-plus" />
          </span>
      </div>
      {
        taskList.map((task,index)=>{
          if(task.completed === false){
            return(
              <div className='task-content'>
                <input 
                  type='checkbox'
                  checked={chks[index]}
                  value={index}
                  onChange={(e)=>{handleChk(e,index)}}
                />
                {task.content}
              </div>
            )
          }      
        })
      }
    </div>
  )
}

export default Task