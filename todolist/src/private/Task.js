import React, { useEffect, useState } from 'react'
import './Private.css'

const Task = () => {
  const [taskList, setTaskList] = useState([])
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
    const newTasks = [...taskList, inputValue ]
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
      <h4>자신의 목표나 해야할 일을 작성해 보세요.</h4>
      <div className='todo-button'>
          <button type='button'>완료</button>
          <button type='button' onClick={()=>{removeTask()}}>삭제</button>
        </div>
        <div className='addTask-div'>
          <input 
            className='addtask-text' 
            type='text'
            value={inputValue} 
            placeholder="목표 또는 계획을 입력하세요."
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
          return(
            <div>
              <input 
                type='checkbox'
                checked={chks[index]}
                value={index}
                onChange={(e)=>{handleChk(e,index)}}
              />
              {task}
            </div>
          )
        })
      }
    </div>
  )
}

export default Task