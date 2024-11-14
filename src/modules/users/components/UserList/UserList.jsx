import React from 'react'
import avatar from '../../../../assets/userlist.png';
import Header from '../../../shared/components/Header/Header'

export default function UserList() {
  return (
    <Header 
    title={'Users '} 
    textLight={' List !'} 
    description={'This is a welcoming screen for the entry of the application, you can now see the options'}
    img={<img src={avatar} alt="User Avatar" />}
    height={"30vh"}
  />
  )
}
