import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import axios from 'axios'

function App() {
  const apiUrl = "https://api.github.com/users/"

  const [inputUsername, setInputUsername] = useState("")

  const [displayUser, setDisplayUser] = useState({
    login: "",
    name: "",
    bio: "",
    blog: "",
    public_repos: 0,
    followers: 0,
    following: 0,
    avatar_url: "",
    html_url: "",
    repos_url: "",
    repos: [],
  })

  const [displayError, setDisplayError] = useState(false);
  const [displayCard, setDisplayCard] = useState(false);
  
  function fetchUser(){
    setDisplayError(false);
    setDisplayCard(false);
  
    axios.get(`${apiUrl}${inputUsername}`).then((res)=>{
      setDisplayError(false);
      setDisplayCard(true);
      console.log(res.data);
      setDisplayUser({
        login: res.data.login,
        name: res.data.name,
        bio: res.data.bio,
        blog: res.data.blog,
        public_repos: res.data.public_repos,
        followers: res.data.followers,
        following: res.data.following,
        avatar_url: res.data.avatar_url,
        html_url: res.data.html_url,
        repos_url: res.data.repos_url + "?sort=updated&direction=desc&per_page=2&type=owner",
        repos: [], // inicializa o array de repositórios vazio
      });
    }).catch(function (e){
      if(e.response.status == 404){
        setDisplayError(true);
      } 
    })
  }
  
  useEffect(() => {
    if (displayUser.public_repos > 0){
      axios.get(`${displayUser.repos_url}`).then((res)=>{
        const newRepos = res.data.map((repo:any) => {
          return {
            name: repo.name,
            html_url: repo.html_url,
            description: repo.description,
            language: repo.language,
            startgazers_count: repo.startgazers_count,
            forks_count: repo.forks_count,
            license: repo.license?.name || "", // acessa o nome da licença, se houver, ou retorna uma string vazia
          };
        });  
        setDisplayUser((prevUser) => {
          return {
            ...prevUser,
            repos: newRepos, // atualiza o array de repositórios com os novos valores
          };
        });
      });
    } 
  }, [displayUser.repos_url]);

  const buscar = (e: { preventDefault: () => void })=>{
    e.preventDefault();
    fetchUser()
  }

  return (
    <div className="App">
      <form onSubmit={buscar}>
        <input type="text" onChange={(e)=>{
          setInputUsername(e.target.value)
        }}></input>

        <button onClick={buscar}>Buscar usuario</button>
      </form>

      <h3 style={ displayError ? {display:"block"} : {display: 'none'}}>Usuário nao encontrado</h3>

      <div className='usercard' style={ displayCard ? {display:"block"} : {display: 'none'}}>        
        <div className='usercard'>
          <h1>{displayUser.name}</h1>
          <h1>{displayUser.login}</h1>
          <h1>{displayUser.bio}</h1>
          <h1>{displayUser.blog}</h1>
          <h1>{displayUser.followers}</h1>
          <h1>{displayUser.following}</h1>
          <h1>{displayUser.public_repos}</h1>
          <img src={displayUser.avatar_url}></img>
        </div>        
      </div>      
    </div>
  )
}

export default App
