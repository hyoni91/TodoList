import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Todo from './private/Todo';
import { useState } from 'react';
import Task from './private/Task';
import Schedule from './private/Schedule';
import Done from './private/Done';

function App() {
  const navigate = useNavigate()

 // 선택된 메뉴를 관리하는 상태
  const [activeTab, setActiveTab] = useState('');

  function handleClick(tab) {
    setActiveTab(tab);
  }
  

  return (
    <div className="contailner">
      <div className='mainbar'>
        <div className='menu'>
          <div className='private'>
            <p onClick={()=>{navigate('/TodoList/')}}>MY SCHEDULER</p>
            <span 
              className={activeTab === 'today' ? 'active' : ''}
              onClick={()=>{
                navigate('/TodoList/')
                handleClick('today')
                }}>
                TODAY
            </span>
            <span 
              className={activeTab === 'todo' ? 'active' : ''}
              onClick={()=>{
                navigate('/pr_ing')
                handleClick('todo')
              }}
            >
                TODO_LIST
            </span>
            <span 
              className={activeTab === 'calendar' ? 'active' : ''}
              onClick={()=>{
                navigate('/pr_calendar')
                handleClick('calendar')
              }}
            >
              CALENDAR
            </span>
            <span 
              className={activeTab === 'done' ? 'active' : ''}
              onClick={()=>{
                navigate('/pr_done')
                handleClick('done')
              }}
            >
              DONE
            </span>
          </div>
        </div>
      </div>
      <div className='content'>
        <Routes>
          <Route path='/TodoList/' element={<Todo />}/>
          <Route path='/pr_ing' element={<Task />}/>
          <Route path='/pr_done' element={<Done />}/>
          <Route path='/pr_calendar' element={<Schedule/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
