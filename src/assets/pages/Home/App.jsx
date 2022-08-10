import React,{useState,useEffect} from 'react'
import './App.css';
import {Card} from './../../components/card';

export default function App() {
  const [studentName, setStudentName] = useState('');
  const [studants, setStudants] = useState([]);
  const [user, setUser] = useState({name:'', avatar:''})

  function handleAddStudant(){
    const newStudant = {
      name: studentName,
      time: new Date().toLocaleDateString("pt-br",{
        hour:'2-digit',
        minute:'2-digit',
        second:'2-digit'
      })
    };
    setStudants(prevState => [...prevState,newStudant])
    console.log(newStudant)
  }

  useEffect(()=>{
    fetch('https://api.github.com/users/anselmojsantos')
    .then(response => response.json())
    .then(data=>{
      setUser({
        name:data.name,
        avatar:data.avatar_url
      })
    })
  },[]);

  return (
    <div className="App">
      <header>
        <section className="ct-header">
          <strong>{user.name}</strong>
          <img src={user.avatar} alt='Foto de Perfil'/>
        </section>
      </header>
      <h1>Lista de Presença</h1>
      <h3>Projeto com React.Js e Vite.js</h3>
      <h2>Nome: {studentName}</h2>
      
      <input type="text" placeholder="Adicione um nome..." onChange ={e => setStudentName(e.target.value)}></input>
      <button type="button" onClick={handleAddStudant}>Adcionar</button>
      {
        studants.map(studant => <Card key={studant.time} name={studant.name} time={studant.time}/>)
        
      }
    </div>
  )
}

