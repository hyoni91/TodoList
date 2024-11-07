import React, { useEffect, useState } from 'react'
import './ModalContent.css'
import { specialCharMap } from '@testing-library/user-event/dist/keyboard'

const ModalContent = ({setSch, sch, value, addSchedule, setModalOpen}) => {

  const addSch = (e) => {
    setSch({...sch,
      [e.target.name] : e.target.value,
      date: value.toISOString().split('T')[0]
    })
  }



  console.log(sch)

  return (
    <div className='modal-div'>
      <p>TITLE</p>
      <input name='title' type='text' onChange={(e)=>addSch(e)}/>
      <p>CONTETN</p>
      <textarea name='content' onChange={(e)=>addSch(e)}/>
      <div className='modal-btn'>
        <button type='button' onClick={addSchedule}>등록</button>
        <button type='button' onClick={()=>{setModalOpen(false)}}>취소</button>
      </div>
  </div>
  )
}

export default ModalContent