import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'; //para quando clicar em um link ele não recarregue toda página, queremos que o react mude de rota sem mudar de página (SPA)
import{ FiLogIn} from 'react-icons/fi';//fi é o feather icons, o font awesome, por ex, seria fa

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import herosImg from '../../assets/heroes.png';

export default function Logon(){
    const [id,setId] = useState('');
    const hisory = useHistory();

    async function handleLogin(e){
        //o importante aqui é validar se o ID existe
        e.preventDefault();

        try{
            const response = await api.post('sessions',{id});//note que é o caminho do controller criado no backend

            localStorage.setItem('ongId',id);
            localStorage.setItem('ongName', response.data.name);

            hisory.push('/profile');
        }catch(err){
            alert("Not able to Login, try again.");

        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Login:</h1>

                    <input 
                        placeholder="Your ID"
                        value= {id}
                        onChange={e => setId(e.target.value)}
                    ></input>
                    <button className="button" type="submit">Sign in</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Register Now!
                    </Link>
                </form>
            </section>

            <img src={herosImg} alt="Heroes"/>
        </div>
    );
}