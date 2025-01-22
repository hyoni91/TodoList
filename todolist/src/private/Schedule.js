import React, { useEffect, useState } from 'react'
import './Private.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './Schedule.css'

const Schedule = () => {
   //날짜 계산
  const date = new Date()
  date.setDate(date.getDay() + 1)
  const today = date
  
  const [value, onChange] = useState(date) 
  console.log(value)

  //모달창 여부 
  const [modalOpen, setModalOpen] = useState(false)
  //클릭하면 모달창 열고 닫기
  const showModal = () => {
    setModalOpen(!modalOpen)
  }

  //일정 list
  const [schList, setSchList] = useState([])
  const [schDateList, setSchDateList] = useState([])
  const [sch, setSch] = useState({
    title : '',
    content : '',
    date : value //초기값
  })

  // 초기 로드 시 로컬 스토리지에서 스케줄 불러오기
  useEffect(() => {
  const storedSchedules = JSON.parse(localStorage.getItem('schList')) || [];
  setSchList(storedSchedules);
  const newDateArr = []
  storedSchedules.forEach((date,i)=>{
    newDateArr.push(date.date)
  })
  setSchDateList(newDateArr)
  }, []);

  //date리스트 재랜더링
  useEffect(()=>{
    console.log(schDateList)
  },[schDateList])


  // 스케줄 추가 함수
  const addSchedule = () => {
    const updatedSchedules = [...schList, { ...sch }];
    setSchList(updatedSchedules);
    localStorage.setItem('schList', JSON.stringify(updatedSchedules));
    
    setSch({title: '', content: '', date:''}); 
  };

  const removeSch = (i) => {
    const filteredSch = schList.filter((_,index)=> index !== i)
    localStorage.setItem('schList', JSON.stringify(filteredSch))
    setSchList(filteredSch)
  
  }

  //이벤트가 있는 날짜에 콘텐츠 추가 
  const titleContet = ({date, view}) => {
    const dateString = date.toLocaleDateString('en-CA')
    if(schDateList.includes(dateString)){
      console.log(schDateList)
      return(
        <span>
          <i className="fa-regular fa-calendar-check" />
        </span>
      )
    }
  }

  const addSch = (e) => {
    setSch({...sch,
      [e.target.name] : e.target.value,
      date: value.toLocaleDateString('en-CA')
    })
  }



  


  return (
  <div className='todo-wrap'>
    <div className='calendar-wrap'>
      <h2><i className="fa-solid fa-calendar-day" /> SCHEDULE</h2>
      <h4>Please enter the schedule and check it</h4>
      <div className='calendar-flex'>
        <div className='calendar'>
          <Calendar 
            className='reactCalendar'
            locale="en"
            tileContent={titleContet}
            onChange={onChange}
            value={value}
            showNeighboringMonth={false}
          />
        </div>
          <div className='calendar-add-div'>
          {/* <h4>New Schedule</h4> */}
          <p>DATE</p>
          <input type='text' value={value.toLocaleDateString('en-CA')} readOnly/>
          <p>TITLE</p>
          <input name='title' type='text' onChange={(e)=>addSch(e)}/>
          <p>CONTETN</p>
          <textarea name='content' onChange={(e)=>addSch(e)}/>
          <div className='sch-btn'>
            <button type="button" class="btn btn-success" onClick={()=> {addSchedule()}}>Save</button>
          </div>
        </div>
      </div>
      <div className="card">
        { schList.map((sch , i)=>{
              const formattedValue = value.toLocaleDateString('en-CA');
              if(sch.date === formattedValue){
                return(
                  <div key={i} className='card-header'>
                      {sch.title} 
                  </div>
                  
                )
              }
              return null
            })
            
          }
      { schList.map((sch , i)=>{
            const formattedValue = value.toLocaleDateString('en-CA');
            if(sch.date === formattedValue){
              return(
                <div key={i} className='card-body'>
                  <div >
                    <p><i class="fa-regular fa-clock"></i> {sch.date}</p>
                    <p><i class="fa-solid fa-pencil"></i> {sch.content}</p>
                   
                  </div>
                  <div className='card-btn'>
                    <button type="button" class="btn btn-danger" onClick={()=>{removeSch(i)}}>Delete</button>
                  </div>
                </div>
              )
            }
            return null
          })
          
          }
    </div>
    </div>
  </div>  
    
  )
}

export default Schedule