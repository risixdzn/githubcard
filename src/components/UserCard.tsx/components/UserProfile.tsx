import React from 'react'

function UserProfile({displayUser}:any) {
  return (
    <div className='userProfile'>
        <div className="pic">
            <img className='avatar' src={displayUser.avatar_url}></img>
        </div>
        <div className="userinfo">
            <div className="usernames">
            <h1 className='displayname'>{displayUser.name}</h1>
            <h3 className='login'>/{displayUser.login}</h3>
            </div>            
        <div className='userstats'>
            <div className='stat'>
                <h4>{displayUser.followers}</h4>
                <h5>{displayUser.followers == 1 ? "Seguidor" : "Seguidores"}</h5>
            </div>
            <div className='stat'>
                <h4>{displayUser.following}</h4>
                <h5>Seguindo</h5>
            </div>
            </div>            
        </div>          
    </div>
  )
}

export default UserProfile