import React from 'react'
import character from '../../../../assets/character.svg'

export default function NoData() {
  return (
   <>
   <div className='text-center'>
   <img src={character} alt="" />
   <h3 className='m-2 fw-medium'>No Data !</h3>
   <p className='fw-light'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
   
   </div>
  </>
  )
}
