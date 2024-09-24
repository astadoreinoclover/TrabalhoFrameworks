import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions, ScrollView } from 'react-native';
import { AuthContext } from '@/contexts/Auth';
import ScrollViewIndicator from 'react-native-scroll-indicator';


type Employee = {
  id: number;
  name: string;
  department: string;
  points: number;
};

const employees: Employee[] = [
  { id: 1, name: 'Ana Silva', department: 'Marketing', points: 150 },
  { id: 2, name: 'Carlos Souza', department: 'Financeiro', points: 200 },
  { id: 3, name: 'Maria Oliveira', department: 'TI', points: 300 },
  { id: 4, name: 'João Ferreira', department: 'Vendas', points: 250 },
  { id: 5, name: 'Roberto Lima', department: 'Marketing', points: 180 },
  { id: 6, name: 'Fernanda Costa', department: 'Financeiro', points: 220 },
  { id: 7, name: 'Paulo Santos', department: 'TI', points: 270 },
  { id: 8, name: 'Juliana Martins', department: 'Vendas', points: 230 },
  { id: 9, name: 'Juliana Martins', department: 'Vendas', points: 230 },
  { id: 10, name: 'Juliana Martins', department: 'Vendas', points: 230 },
  { id: 11, name: 'Juliana Martins', department: 'Vendas', points: 230 },
  { id: 12, name: 'Juliana Martins', department: 'Vendas', points: 230 },
  { id: 13, name: 'Juliana Martins', department: 'Vendas', points: 230 },
  { id: 14, name: 'Juliana Martins', department: 'Vendas', points: 230 },
];

export default function Ranking() {
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setEmail(authContext.authData?.email || null);
    setName(authContext.authData?.name || null);
  }, [authContext.authData]);

  const sortedEmployees = employees.sort((a, b) => b.points - a.points);

  const renderEmployee = ({ item, index }: { item: Employee; index: number }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.department}</Text>
      <Text style={styles.cell}>{item.points}</Text>
    </View>
  );

  return (
    <View style={[styles.container, {width: width >=768? width*0.4: width*0.9, height: width >=768? height*0.6 : height*0.4}]}>
        <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, {fontSize: width >768?18:10}]}>Posição</Text>
            <Text style={[styles.headerCell, {fontSize: width >768?18:10}]}>Nome</Text>
            <Text style={[styles.headerCell, {fontSize: width >768?18:10}]}>Departamento</Text>
            <Text style={[styles.headerCell, {fontSize: width >768?18:10}]}>Pontos</Text>
        </View>
        <ScrollViewIndicator 
            shouldIndicatorHide={false}
            flexibleIndicator= {true}
            scrollIndicatorStyle = {{backgroundColor: "#2c3e50"}}
            scrollIndicatorContainerStyle= {{backgroundColor: "rgba(255, 255, 255, 0.5)"}}
        >
            <FlatList
            data={sortedEmployees}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderEmployee}
            scrollEnabled={false} // Desativar rolagem do FlatList
            />
        </ScrollViewIndicator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingRight: 2
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#2C3E50',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20, 
  },
  headerCell: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cell: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  }
});
