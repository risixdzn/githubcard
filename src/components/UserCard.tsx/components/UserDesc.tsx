import React from 'react'

import UserCreationDate from '../../../UserCreationDate'

import { FaCalendar } from 'react-icons/fa'
import { HiLocationMarker } from 'react-icons/hi'
import { TbLink } from 'react-icons/tb'
import { RiSuitcaseLine } from 'react-icons/ri'

function UserDesc({displayUser}:any) {
  return (
    <div className="userdesc">
    <div className='enterdate'><span><FaCalendar className='icon small'/> Entrou em: <UserCreationDate creationDate={displayUser.created_at}/></span></div>            
    <div className='enterdate' style={displayUser.location !== null ? {display:"block"}:{display:"none"}}><span><HiLocationMarker className='icon small'/>{displayUser.location}</span></div>
    <div className="divisoria"></div>
    <p>{displayUser.bio}</p>
    <span style={displayUser.blog !== "" ? {display: "flex"}:{display:"none"}}>
    <TbLink className='icon'/><a href={`https://${displayUser.blog}`}>{displayUser.blog}</a>
    </span>
    <span style={displayUser.company !== null ? {display: "flex"}:{display:"none"}}>
    <RiSuitcaseLine className='icon'/><h4>{displayUser.company}</h4>
    </span>
</div>
  )
}

export default UserDesc