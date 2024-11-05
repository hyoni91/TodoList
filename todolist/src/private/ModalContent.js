import React from 'react'
import './ModalContent.css'

const ModalContent = () => {
  return (
    <div className='modal-div'>
      <p>TITLE: <input type='text'/></p>
      <p>DATE:</p>
      <p>CONTETN</p>
      <textarea value={1231321321321321}/>
      <div className='modal-btn'>
        <button type='button'>등록</button>
        <button type='button'>취속</button>
      </div>
  </div>
  )
}

export default ModalContent