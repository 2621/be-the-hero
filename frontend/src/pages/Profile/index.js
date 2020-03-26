import React,{useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import api from '../../services/api';
import './style.css';

import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    //disparar uma função em um momento do componente
    //primeiro parâmetro: qual função quero que seja executada; segundo parm: quando será executada, toda vez que o valor
    //que vai ali dentro mudar, vai executar novamente. Se for vazio, executa uma vez só
    useEffect(()=>{
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            //Para fazer com que o incidente seja apagado da tela assim que apagar ele; vai retornar apenas os incidentes que não são o q deletou
            setIncidents(incidents.filter( incident => incident.id != id));
        } catch (err) {
            alert('Not able to delete incident, please try again.');
        }
    }

    function handleLgout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
               <img src={logoImg} alt="Be The Hero" />
               <span>Welcome, {ongName}!</span>
               <Link className="button" to="incidents/new">Register New Incident</Link>

               <button onClick={handleLgout} type="button">
                   <FiPower size={18} color="#e02041" />
               </button>
            </header>

            <h1>Registered Incidents</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>INCIDENT:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIPTION:</strong>
                        <p>{incident.description}</p>

                        <strong>VALUE:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                        {/* Intl -> internacionalização, é do js */}

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                         {/* no onClick, tinha que fazer aparecer essa função dessa forma, se não executaria a função e passaria o retorno dela para o onCLick, iria pagar todos os casos assim q o componetente fosse lançado em tela*/}
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}