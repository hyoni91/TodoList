import React, { useState } from 'react'
import './Private.css'
import './Schedule.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import ReactModal from 'react-modal';
import ModalContent from './ModalContent';

const Schedule = () => {
   //날짜 계산
  const today = new Date(); 
  const [value, onChange] = useState(today) 

  //모달창 여부 
  const [modalOpen, setModalOpen] = useState(true)
  //클릭하면 모달창 열고 닫기
  const showModal = () => {
    setModalOpen(!modalOpen)
  }

  console.log(value)

  return (
    <div className='calendar-wrap'>
      <h2>SCHEDULE</h2>
      <h4>일정을 입력하고 확인하세요</h4>
      <div className='calendar-flex'>
        <div className='calendar'>
          <Calendar 
            locale="en"
            onChange={onChange}
            value={value}
            showNeighboringMonth={false}
          />
        </div>
        <div>
          <div className='calendar-content'>
            날짜 클릭 시 일정확인 하는 곳
          </div>
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
                height: '40%',
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
              <ModalContent />
            </ReactModal>
            
            :
            null
          }
    </div>
  )
}

export default Schedule