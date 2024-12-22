import React, { useEffect, useState } from 'react'
import './Private.css'

const Todo = () => {

  const [list, setList] = useState([])
  const [inputValue, setInputValue] = useState('')

  //체크박스 체크상태관라
  const [chks, setChks] = useState([])
  const [indexChk, setIndexChk] = useState([])


  //마운트시 세션스토리지의 데이터 불러오기 
  useEffect(()=>{
    const storedList = window.sessionStorage.getItem('list');
    if (storedList) {
      const parsedList = JSON.parse(storedList)
      setList(parsedList);
      let chkarr = new Array(parsedList.length).fill(false)
      console.log(chkarr)
      setChks(chkarr)
    }
    
  },[])


  const handleChk = (e,index) => {
    const newChks=[...chks]
    newChks[index] = !newChks[index]
    setChks(newChks)
    if(newChks[index]){
      setIndexChk(indexChk => [
        ...indexChk,
        index
      ])
    }else{
      setIndexChk(indexChk =>
        indexChk.filter(num => num !== index)
      )
    }
  }



  const addTodo = () => {
    const newTodos = [...list, inputValue]
    setList(newTodos)
    window.sessionStorage.setItem('list',JSON.stringify(newTodos));
    setInputValue('')
  }

  const removeTodo = () => {
    alert('よくやりました😘')

    //체크된 배열 새롭게 필터링! 세션스토리지에 담기
    const filteredList = list.filter((_, index)=> !indexChk.includes(index) ) 
    setList(filteredList)
    window.sessionStorage.setItem('list',JSON.stringify(filteredList))

    //체크박스 상태 배열 업데이트 
    const filteredChks  = chks.filter((_, index)=> !indexChk.includes(index) ) 
    setChks(filteredChks)

  }

  
  return (
    <div>
      <h2>TODAY</h2>
      <h4>What's today?</h4>
      <div>
        <div className='todo-button'>
          <button type='button' onClick={()=>{removeTodo()}}
            >削除
          </button>
        </div>
        <div>
        <div className='addTask-div'>
          <input 
            className='addtask-text' 
            value={inputValue}  
            type='text' 
            placeholder="メモや今日やることを入力ください。"
            onChange={(e)=>{
              setInputValue(e.target.value)
            }}
          />
          <span 
            type='button'
            onClick={()=>{addTodo()}}
          >
            <i className="fa-solid fa-circle-plus" />
          </span>
      </div>
          {
            list.map((list,index)=>{
              return(
                <div className='today-content'>
                  <input 
                    type='checkbox'
                    value={index}
                    checked={chks[index]}
                    onChange={(e)=>{handleChk(e,index)}}
                  />
                   <span 
                    style={{
                      textDecoration: chks[index] ? 'line-through' : 'none',
                    }}
                  >
                    {list}
                  </span>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Todo