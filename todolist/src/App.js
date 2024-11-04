import logo from './logo.svg';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Todo from './private/Todo';
import { useState } from 'react';

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
            <p>개인아이콘</p>
            <span 
              className={activeTab === 'today' ? 'active' : ''}
              onClick={()=>{
                navigate('/pr_list')
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
          <div className='public'>
            <p>공공아이콘</p>
            <span>계획</span>
            <span>완료</span>
            <span>달력</span>
          </div>
        </div>
      </div>
      <div className='content'>
        <Routes>
          <Route path='/pr_list' element={<Todo />}/>
          <Route path='/pr_ing' element={<p>ing</p>}/>
          <Route path='/pr_done' element={<p>done</p>}/>
          <Route path='/pr_calendar' element={<p>calendar</p>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
