import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png' 
// automaticamente pega qual das opções é melhor para cada tela

import styles from './styles';

export default function Incidents(){
    const [total, setTotal] = useState(0);
    const [incidents, setIncidents] = useState([]);
    const navigation = useNavigation();
    //para ir adicionando mais casos conforme vai "rolando a tela"
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navigateToDetail(incident){
        navigation.navigate('Detail', {incident});
    }

    async function loadIncidents(){
        if (loading){
            return;
        }

        if (total > 0 && incidents.length == total){
            return;
        }

        setLoading(true);
        
        const response = await api.get('incidents', {params: {page}});
        
        //para n ficar recarregando a página,ir anexando (anexa dois vetores em um)
        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);
  
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total of <Text style={styles.headerTextBold}>{total} incidents</Text>
                </Text>
            </View> 

            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.description}>HERO, choose one of the incidents bellow and SAVE the day!</Text>
            
            <FlatList //permit screen scroll
                data={incidents}
                style={styles.incidentList}
                // showsVerticalScrollIndicator={false}
                keyExtractor={incident => String(incident.id)}
                onEndReached={loadIncidents}//dispara a função quando o usuário chega ao final da lista
                onEndReachedThreshold={0.2} //qual o percentual do final da lista o usuário precisa estar para carregar novos itens 
                renderItem={({item: incident}) => (
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>

                    <Text style={styles.incidentProperty}>INCIDENT:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>VALUE:</Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR',
                     {style: 'currency', currency: 'BRL'}).format(incident.value)}
                    </Text>

                    <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={() => navigateToDetail(incident)}
                    >
                        <Text style={styles.detailsButtonText}>More</Text>
                        <Feather name="arrow-right" size={16} color="#E02041"/>
                    </TouchableOpacity>
                </View>
                )}
            />

        </View>
    );
}