import { useState } from 'react'
import './App.css'

import SearchScreen from './components/SearchScreen'
import { fetchUser } from './api/FetchUser'
import { useFetchRepos } from './api/hooks/useFetchRepos'
import UserProfile from './components/UserCard.tsx/components/UserProfile'
import UserDesc from './components/UserCard.tsx/components/UserDesc'
import RepoInfo from './components/UserCard.tsx/components/RepoInfo'

function App() {
  const apiUrl = "https://api.github.com/users/"
  
  const [loading , setLoading] = useState(false);
  const [inputUsername, setInputUsername] = useState("")
  const [displayError, setDisplayError] = useState(false);
  const [displayCard, setDisplayCard] = useState(false); 

  //define o usuario
  const [displayUser, setDisplayUser] = useState({
    login: "",
    name: "",
    bio: "",
    blog: "",
    company: "",
    location: "",
    created_at: "",
    public_repos: 0,
    followers: 0,
    following: 0,
    avatar_url: "",
    html_url: "",
    repos_url: "",
    repos: [],
  }as any);  
  
  //função de busca
  const buscar = (e: { preventDefault: () => void })=>{
    e.preventDefault();
    setLoading(true);
    fetchUser(loading, setLoading, setDisplayUser, setDisplayCard, setDisplayError, inputUsername, apiUrl);
  }    
  
  //useeffect para procurar repositórios se houver
  useFetchRepos(displayUser, setDisplayUser, setLoading, setDisplayCard, loading);  
  
  return (
    <div className="App">      
      <div className="attention"><h1>Desenvolvido por <a href='https://github.com/risixdzn' target='_blank'>Ricardo Amorim</a></h1></div>
      <main className='main'>       
        <SearchScreen displayCard={displayCard} loading={loading} displayError={displayError} buscar={buscar} setInputUsername={setInputUsername}/> 

        <div className='usercard' id='usercard' style={ displayCard ? {display:"block"} : {display: 'none'}}>  
          <UserProfile displayUser={displayUser}/>
          <UserDesc displayUser={displayUser}/>
          <RepoInfo displayUser={displayUser}/>                           
        </div>
      </main>  
    </div>
  )
}

export default App   