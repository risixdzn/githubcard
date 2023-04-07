import React from 'react'

import languageColors from '../../languageColors'

import { FaStar } from 'react-icons/fa'
import { TbGitFork } from 'react-icons/tb'
import { GoLaw } from 'react-icons/go'

function RepoInfo({displayUser}:any) {
  return (
    <div className='repoinfo'>
        <span className='title'><h2>Repositórios</h2><h3>{displayUser.public_repos}</h3></span>
        
        <div className='repos'>
        {/* Para verificar se o array de repositórios em displayUser está vazio,
        você pode usar a função length do array.
        Se o length for igual a zero, o array está vazio. */}
        { displayUser && displayUser.repos && displayUser.repos.length !== 0 ?
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
  )
}

export default RepoInfo