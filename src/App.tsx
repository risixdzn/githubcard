import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactFragment } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import axios from 'axios'

import languageColors from './languageColors';

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
  }as any);

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
            id: repo.id,
            license: repo.license?.name || "", // acessa o nome da licença, se houver, ou retorna uma string vazia
          };
        });  
        setDisplayUser((prevUser:any) => {
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
          <h1>/{displayUser.login}</h1>
          <h1>{displayUser.bio}</h1>
          <a href={`https://${displayUser.blog}`}>{displayUser.blog}</a>
          <h1>Seguidores: {displayUser.followers}</h1>
          <h1>Seguindo: {displayUser.following}</h1>
          <h1>Repositórios: {displayUser.public_repos}</h1>
          <img src={displayUser.avatar_url}></img>
        </div>        
      </div>      
      
      <h2>Repositórios</h2>
      {/* Para verificar se o array de repositórios em displayUser está vazio,
      você pode usar a função length do array.
      Se o length for igual a zero, o array está vazio. */}
      { displayUser.repos.length !== 0 ?
        (
          displayUser.repos.map((repo: { name: String,
            html_url: string,
            description: string,
            language: string,
            startgazers_count: number,
            forks_count: number,
            id: number,
            license: string })=>( 
            <div key={repo.id}>     
              <a href={repo.html_url} target='_blank'>{repo.name}</a>    
              <p>{repo.description}</p> 
              <h3 style={{color: languageColors[repo.language]}}>{repo.language}</h3> 
              <h4>Estrelas: {repo.startgazers_count}</h4>
              <h5>Forks: {repo.forks_count}</h5>
              <h3>{repo.license}</h3>
            </div> 
          ))         
        )
        :
        (
          <>
            <p>Este usuário nao possui repositórios</p>
          </>          
        )
      }
    </div>
  )
}

export default App
