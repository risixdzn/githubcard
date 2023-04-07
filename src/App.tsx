import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactFragment } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import axios from 'axios'
import html2canvas from 'html2canvas';

import UserCreationDate from './UserCreationDate'
import languageColors from './languageColors';

import { FaStar, FaGithub, FaUser, FaCalendar } from 'react-icons/fa'
import { RiSuitcaseLine } from 'react-icons/ri'
import { TbLink, TbGitFork } from 'react-icons/tb'
import { GoLaw } from 'react-icons/go'
import { HiLocationMarker } from 'react-icons/hi'

import SearchScreen from './components/SearchScreen'
import { fetchUser } from './components/FetchUser'
import { useFetchRepos } from './hooks/useFetchRepos'

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
              
            <div className='repoinfo'>
              <span className='title'><h2>Repositórios</h2><h3>{displayUser.public_repos}</h3></span>
              
              <div className='repos'>
                {/* Para verificar se o array de repositórios em displayUser está vazio,
                você pode usar a função length do array.
                Se o length for igual a zero, o array está vazio. */}
                { displayUser.repos.length !== 0 ?
                  (
                    displayUser.repos.map((repo: { name: String,
                      html_url: string,
                      description: string,
                      language: string,
                      stargazers_count: number,
                      forks_count: number,
                      id: number,
                      license: string })=>( 
                        <a target='_blank' href={repo.html_url} className='repo'>
                          <div key={repo.id}>     
                            <div className="titlesec">
                              <h1>{repo.name}</h1>
                              <div className='stats'>
                                <h4><FaStar/>{repo.stargazers_count}</h4>
                                <h4><TbGitFork/>{repo.forks_count}</h4>    
                              </div>
                            </div>                            
                            <p>{repo.description}</p> 
                            <div className="info">   
                              <div className="language">
                                <div className='langcolor' style={{backgroundColor: languageColors[repo.language]}}></div>
                                <h3>{repo.language}</h3> 
                              </div>
                              <div className="license" style={ repo.license !== "" ? {display:"flex"} : {display: 'none'}}>
                                <GoLaw className='icon'/>
                                <h3>{repo.license}</h3>
                              </div>   
                            </div>
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
      </main>  
    </div>
  )
}

export default App   