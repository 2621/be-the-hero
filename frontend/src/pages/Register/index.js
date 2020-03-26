import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import{ FiArrowLeft} from 'react-icons/fi';//fi é o feather icons, o font awesome, por ex, seria fa

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';


export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    
    const history = useHistory(); //navegação através de uma função quando não se pode usar o Link
    
    async function handleRegister(e){
        //Responsável por fazer o cadastro do usuário
        e.preventDefault();//impede o comportamento default de recarregar a página quando o formulário é enviado
        
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        try{
            const response = await api.post('ongs', data);//já envia em formato json
            //o response é para conseguir mostrar uma resposta para o cliente
        
            alert(`Your access ID : ${response.data.id}`);//crase para conseguir usar variável dentro do texto
            
            history.push('/');
        }catch(err){
            alert('Not able to Register');
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Register</h1>
                    <p>Register, enter the plataform and help people to find you ONG's incidents!</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Back to Login
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="ONG's name"
                        value={name}
                        onChange={e => setName(e.target.value)} //essa última parte representa o valor no input; e é o estado de transição
                    />

                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input 
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    {/* espaços de cidade e estado ficarão lado a lado */}
                    <div className="input-group">
                        <input 
                            placeholder="City"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />

                        <input 
                            placeholder="UF" style={{width:80}}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                        {/* primeira chave é para dizer que vai inserir um código javascript, a segunda é que está incluindo um objeto */}
                    </div>

                    <button className="button" type="submit">Register Now!</button>

                </form>
            </div>
        </div>
    );
}