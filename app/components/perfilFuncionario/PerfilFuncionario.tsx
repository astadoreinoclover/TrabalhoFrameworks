import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import { AuthContext } from '@/contexts/Auth';
import ItemPerfilComponent from './ItemComponenteFuncionario';
import { useRoute } from '@react-navigation/native';
import { getFuncionario } from '@/services/FuncionarioService';
import HabilidadeCard from './HabilidadeCard';

type RouteParams = {
    itemName: string;
    itemDepartament: string;
    itemId: number;
};

type Habilidade = {
    nome: string;
    nivel: number;
};

type Funcionario = {
    habilidades?: Habilidade[];
    id: number;
    name: string;
    department: string;
    funcao: string;
    numero: string;
    dataNasc: string;
    email: string;
    xp: number;
    xpNescessario: number;
    nivel: number;
};

const FuncionarioProfile: React.FC = () => {
    const { width, height } = useWindowDimensions();
    const heigthCards = width >= 768 ? height * 0.4 : 210;
    const widthCards = width >= 768 ? width * 0.25 : width * 0.8;
    const authContext = useContext(AuthContext);
    const [funcionario, setFuncionario] = useState<Funcionario | null>(null);

    const route = useRoute();
    const { itemName, itemDepartament, itemId } = route.params as RouteParams;

    useEffect(() => {
        const fetchFuncionario = async () => {
            try {
                const data = await getFuncionario(itemDepartament, itemName, itemId);
                console.log('Dados do funcionário recebidos:', data);
                setFuncionario(data.length > 0 ? data[0] : null);
            } catch (error) {
                console.error('Erro ao buscar funcionário:', error);
            }
        };

        fetchFuncionario();
    }, [itemDepartament, itemName, itemId]);

    if (!funcionario) {
        return (
            <View style={styles.container}>
                <Text>Nenhum funcionário encontrado.</Text>
            </View>
        );
    }

    return (
        <ScrollView>
            <View style={{ height: height * 0.8, width: width * 0.95, paddingBottom: 20 }}>
                <View style={[styles.headerContainer, { flexDirection: width >=768?'row': 'column', width:width*0.9}]}>
                    <View style={styles.profileImageContainer}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            color={'#2C3E50'}
                            width={125}
                            height={125}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </View>
                    <View style={[styles.progressBarContainer, {width:width>=768?width*0.6:width*0.7}]}>
                        <View style={styles.progressBar}>
                            <View style={[styles.progress, { width: `${(funcionario.xp / funcionario.xpNescessario) * 100}%` }]} />    
                        </View>
                        <Text style={{marginLeft: 20}}>{funcionario.xp}/{funcionario.xpNescessario}</Text>
                    </View>
                </View>
                <View style={[styles.headerContainer, { flexDirection: width >=768?'row': 'column', width:width*0.9, justifyContent:width>=768?'space-around':'center', alignItems:width>=768?'baseline':'center'}]}>
                    <View style={{flexDirection: width >=768?'row': 'column'}}>
                       <Text style={{ fontWeight: 'bold', color: '#2C3E50', fontSize: 20, marginRight:10 }}>Habilidades:</Text>
                        {funcionario.habilidades?.map((habilidade, index) => (
                            <HabilidadeCard 
                                key={index} 
                                title={habilidade.nome} 
                                content={habilidade.nivel} 
                            />
                        ))} 
                    </View>
                    
                    <Text style={{fontWeight: 'bold', color: '#2C3E50', fontSize:20}}>Nivel: {funcionario.nivel}</Text>
                </View>
                <View style={[styles.container, { flexDirection: width >= 768 ? 'row' : 'column' }]}>
                    <View style={[styles.areaItem, { height: heigthCards, width: widthCards }]}>
                        <ItemPerfilComponent title="Nome Completo" content={funcionario.name} />
                        <ItemPerfilComponent title="Data de Nascimento" content={funcionario.dataNasc} />
                    </View>
                    <View style={[styles.areaItem, { height: heigthCards, width: widthCards }]}>
                        <ItemPerfilComponent title="Email" content={funcionario.email} />
                        <ItemPerfilComponent title="Número" content={funcionario.numero} />
                    </View>
                    <View style={[styles.areaItem, { height: heigthCards, width: widthCards }]}>
                        <ItemPerfilComponent title="Departamento" content={funcionario.department} />
                        <ItemPerfilComponent title="Função" content={funcionario.funcao} />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    headerContainer: {
        display: 'flex',
        marginBottom: 20,
    },
    profileImageContainer: {
        marginHorizontal: 'auto'
    },
    progressBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 'auto'
    },
    areaItem: {
        paddingTop: 20,
        margin: 'auto',
    },
    progressBar: {
        height: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        overflow: 'hidden',
        width: '80%',
    },
    progress: {
        height: '100%',
        backgroundColor: '#8A79AF',
    },
});

export default FuncionarioProfile;