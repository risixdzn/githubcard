import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactFragment } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import axios from 'axios'

import languageColors from './languageColors';

import { FaGithub } from 'react-icons/fa'
import { RiSuitcaseLine } from 'react-icons/ri'
import { TbLink } from 'react-icons/tb'

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
  
  const buscar = (e: { preventDefault: () => void })=>{
    e.preventDefault();
    fetchUser()
  }

  function fetchUser(){
    //resetuser
    setDisplayUser({
      login: "",
      name: "",
      bio: "",
      blog: "",
      company: "",
      public_repos: 0,
      followers: 0,
      following: 0,
      avatar_url: "",
      html_url: "",
      repos_url: "",
      repos: [],    
    })      

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
        company: res.data.company,
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

  

  return (
    <div className="App">  
    
      <div className='searchscreen' style={displayCard? {display:"flex", alignItems:"center",justifyContent:"center", flexDirection:"column"} : {display:"flex", alignItems:"center",justifyContent:"center", height:"100vh", flexDirection:"column"} }>
        <h1><FaGithub/> Github Card</h1>
        <form onSubmit={buscar}>
          <input type="text" onChange={(e)=>{
            setInputUsername(e.target.value)
          }}></input>

          <button onClick={buscar}>Buscar usuario</button>
        </form>

        <h3 style={ displayError ? {display:"block"} : {display: 'none'}}>Usuário nao encontrado</h3>
      </div>    
      
      <div className='usercard' style={ displayCard ? {display:"block"} : {display: 'none'}}>  
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
                <h5>Seguidores</h5>
              </div>
              <div className='stat'>
                <h4>{displayUser.following}</h4>
                <h5>Seguindo</h5>
              </div>
            </div>            
          </div>          
        </div>
        <div className="userdesc">
          <p>{displayUser.bio}</p>
          <span style={displayUser.blog !== "" ? {display: "flex"}:{display:"none"}}>
            <TbLink className='icon'/><a href={`https://${displayUser.blog}`}>{displayUser.blog}</a>
          </span>
          <span style={displayUser.company !== null ? {display: "flex"}:{display:"none"}}>
            <RiSuitcaseLine className='icon'/><h4>{displayUser.company}</h4>
          </span>
        </div>
          
          <div className='repoinfo'>
            <span className='title'><h2>Repositórios</h2><h3>{displayUser.public_repos}</h3></span>
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
                    <a target='_blank' href={repo.html_url}>
                      <div key={repo.id} className='repo'>     
                        <h1 >{repo.name}</h1>    
                        <p>{repo.description}</p> 
                        <h3 style={{color: languageColors[repo.language]}}>{repo.language}</h3> 
                        <div className='langcolor' style={{backgroundColor: languageColors[repo.language], width: 5, height: 5}}></div>
                        <h4>Estrelas: {repo.startgazers_count}</h4>
                        <h5>Forks: {repo.forks_count}</h5>
                        <h3>{repo.license}</h3>
                      </div> 
                    </a>
                  
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
      </div>  
    </div>
  )
}

export default App
