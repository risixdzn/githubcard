import React from 'react';

import { FaUser, FaGithub } from 'react-icons/fa';

function SearchScreen({ displayCard, loading, displayError, buscar, setInputUsername }:any) {
  return (
    <div className='searchscreen' style={displayCard? {display:"flex", alignItems:"center",justifyContent:"center", flexDirection:"column"} : {display:"flex", alignItems:"center",justifyContent:"center", height:"100vh", flexDirection:"column"} } >
      <h1><FaGithub/> Github Card</h1>
      <p>Gere um cartão informativo com base no seu perfil do Github</p>
      <form onSubmit={buscar}>
        <input disabled={ loading ? true : false} className='searchinput' type="user" id='user' name='user' placeholder='Usuário' onChange={(e)=>{
          setInputUsername(e.target.value)
        }}></input>
        <label className='control-label' htmlFor="user"><FaUser/></label>  
        <button onClick={buscar} className='searchbtn'>Buscar usuário</button>
      </form>

      <img className='loader' src="./rippleloader.svg" style={loading? { display:"block"} : {display:"none"}}/>

      <div className='error' style={ displayError ? {display:"block", marginTop:"15px"} : {display: 'none'}}>
        <h3 >Usuário não encontrado</h3>
        <p>Verifique a digitação e tente novamente.</p>
      </div>          
    </div> 
  );
}

export default SearchScreen;
