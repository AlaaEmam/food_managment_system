import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import character from '../../../../assets/character.svg'
import closeButton from '../../../../assets/closeButton.png'

export default function DeleteConfirmation({showDelete ,handleCloseDelete, deleteItem  , deleteFunction}) {

  return (
   <>
        <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header >
        <img src={closeButton} onClick={handleCloseDelete} alt="" />
        </Modal.Header>
        <Modal.Body>
         <div className="text-center">
         <img src={character} alt="" />
          <h5 className='mt-4'>Delete This {deleteItem} </h5>
          <p className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>  
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button 
          className="btn-danger" 
          onClick={deleteFunction} // CALL API DELETE
          aria-hidden="true"
          >
          Delete this {deleteItem}
          </Button>
        </Modal.Footer>
      </Modal> 
   </>
  )
}
