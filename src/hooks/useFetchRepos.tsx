import { useEffect } from 'react';
import axios from 'axios';

export function useFetchRepos(displayUser: any, setDisplayUser: any, setLoading: any, setDisplayCard: any, loading:any) {
  useEffect(() => {
    axios.get(`${displayUser.repos_url}`).then((res)=>{
      const newRepos = res.data.map((repo:any) => {
        return {
          name: repo.name,
          html_url: repo.html_url,
          description: repo.description,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
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
      setLoading(false);
      setDisplayCard(true);
      console.log(loading);
    }); 
  }, [displayUser.repos_url]);
}