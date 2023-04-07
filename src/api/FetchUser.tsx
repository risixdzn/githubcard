import React from 'react'

import axios from 'axios';
import { useState } from 'react';

export function fetchUser(loading:any, setLoading:any, setDisplayUser:any, setDisplayCard:any, setDisplayError:any, inputUsername:any, apiUrl:any){
    console.log(loading);
    //resetuser
    setDisplayUser({
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
    })      
    setDisplayError(false);
    setDisplayCard(false);  
    //get com axios
    axios.get(`${apiUrl}${inputUsername}`).then((res)=>{
      setDisplayError(false);      
      console.log(res.data);
      //define o usuario com a resposta
      setDisplayUser({
        login: res.data.login,
        name: res.data.name,
        bio: res.data.bio,
        blog: res.data.blog,
        company: res.data.company,
        location: res.data.location,
        created_at: res.data.created_at,
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
      setLoading(false);
      console.log(loading);
      setDisplayCard(false);
    })
  }