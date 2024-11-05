import React, { useEffect, useState } from 'react'
import './Private.css'
import Calendar from 'react-calendar'
import ReactModal from 'react-modal';
import ModalContent from './ModalContent';
import 'react-calendar/dist/Calendar.css';
import './Schedule.css'


const Schedule = () => {
   //날짜 계산
  const today = new Date(); 
  console.log(today)
  const [value, onChange] = useState(today) 

  //모달창 여부 
  const [modalOpen, setModalOpen] = useState(false)
  //클릭하면 모달창 열고 닫기
  const showModal = () => {
    setModalOpen(!modalOpen)
  }

  const [schList, setSchList] = useState([])

  // 초기 로드 시 로컬 스토리지에서 스케줄 불러오기
  useEffect(() => {
  const storedSchedules = JSON.parse(localStorage.getItem('schList')) || [];
  setSchList(storedSchedules);
  }, []);


  const [sch, setSch] = useState({
    title : '',
    content : '',
    date : value, //초기값
  })

    // 스케줄 추가 함수
    const addSchedule = () => {
      const updatedSchedules = [...schList, { ...sch, date: value.toISOString().split('T')[0] }];
      setSchList(updatedSchedules);
      localStorage.setItem('schList', JSON.stringify(updatedSchedules));
      
      setSch({title: '', content: '', date:''}); 
    };


    


  return (
    <div className='calendar-wrap'>
      <h2>SCHEDULE</h2>
      <h4>일정을 입력하고 확인하세요</h4>
      <div className='calendar-flex'>
        <div className='calendar'>
          <Calendar 
            className='reactCalendar'
            locale="en"
            onChange={onChange}
            value={value}
            showNeighboringMonth={false}
          />
          <div className='calendar-add'>
            <span onClick={()=>showModal()}>
              <i className="fa-solid fa-circle-plus"/>
            </span>
          </div>
        </div>
        <div>
          {/* toDateSting 은 문자열!
          객체는 toISOString().split('T')[0]사용해야함... */}
          { schList.map((sch , i)=>{
            const formattedValue = value.toISOString().split('T')[0];
            if(sch.date === formattedValue){
              return(
                <div key={i} className='calendar-content'>
                  <div >
                    <p>TITLE</p>
                    <span>{sch.title}</span>
                    <p>CONTENT</p>
                    <span>{sch.content}</span>
                  </div>
                  <span>
                  <i className="fa-regular fa-trash-can"/>
                  </span>
                </div>
              )
            }
            return null
          })
          
          }
        </div>
      </div>
        { modalOpen?
          <ReactModal
            isOpen={true}
            ariaHideApp={false}
            onRequestClose={() => {setModalOpen(false)}}
            style={{
              overlay: {
                position: 'fixed',
                borderRadius : 10,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0, 0.6)'
              },
              content: {
                position: 'absolute',
                width: '550px',
                height: '45%',
                top: '180px',
                left: '30%',
                right: '80%',
                bottom: '50%',
                border: '1px solid #ccc',
                background: '#fff',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '4px',
                outline: 'none',
              }
            }}
            >
              <ModalContent sch={sch} setSch={setSch} value={value} addSchedule={addSchedule}/>
            </ReactModal>
            
            :
            null
          }

    </div>
  )
}

export default Schedule