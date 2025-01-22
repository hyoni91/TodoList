import React, { useEffect, useState } from 'react'
import './Todo.css'

const Task = () => {
  const [taskList, setTaskList] = useState([{
    // completed : false,
    // content : ''
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
    if(indexChk.length == 0){
      alert('削除する項目を選んでください')
      return;
    }
    const filteredList = taskList.filter((_,index)=> !indexChk.includes(index))
    setTaskList(filteredList)
    window.localStorage.setItem('tasked', JSON.stringify(filteredList))

    const filteredChks = chks.filter((_,index)=>!indexChk.includes(index))
    setChks(filteredChks)

    setIndexChk([])
  }

  const completedTask = () => {
    if(indexChk.length == 0){
      alert('完了した項目を選んでください')
      return;
    }
    // 완료된 항목의 completed 상태를 true로 업데이트
    const updatedTasks = taskList.map((task, index) => {
      if (indexChk.includes(index)) {
        alert('よくやりました😍')
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

  function isShowBtn(){
    if(taskList.length != 0 &&taskList.some(task => task.completed === false)){
      return(
        <>
          <button type="button" class="btn btn-success" onClick={()=> {completedTask()}}>Done</button>
          <button type="button" class="btn btn-danger" onClick={()=>{removeTask()}}>Cancle</button>
        </>
      )
    }
  }



  return (
    <div className='todo-wrap'>
      <h2><i className="fa-solid fa-hourglass-end" /> TODO LIST</h2>
      <h4>Write down your goals or to-dos.</h4>
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
          <button type="button" className="btn btn-light" onClick={()=>{addTask()}}> 
              Add 
          </button> 
      </div>
      {
        taskList.map((task,index)=>{
          if(task.completed === false){
            return(
              <div className='today-content'>
                <input 
                  type='checkbox'
                  checked={chks[index]}
                  value={index}
                  onChange={(e)=>{handleChk(e,index)}}
                />
                <span>{task.content}</span>
              </div>
            )
          }      
        })
      }
      <div className='todo-button'>
        {isShowBtn()}
      </div>
    </div>
    
  )
}

export default Task