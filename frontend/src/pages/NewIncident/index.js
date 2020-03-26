import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg'
import api from '../../services/api';

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })

            history.push('/profile');
        } catch (error) {
            alert('Not able to register new incident, please try again.');
            
        }

    }    

    return(
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be The Hero" />

                <h1>Register New Case</h1>
                <p>Please give a detailed description of your incident in order to find a HERO to solve it!</p>

                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041"/>
                    Back to Home
                </Link>
            </section>

            <form onSubmit={handleNewIncident}>
                <input 
                    placeholder="Incident's title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />

                <textarea 
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                <input 
                    placeholder="Value (R$)"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />


                <button className="button" type="submit">Register Incident</button>

            </form>
        </div>
    </div>
    );
}