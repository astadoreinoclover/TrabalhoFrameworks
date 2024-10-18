import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions, ScrollView } from 'react-native';
import { AuthContext } from '@/contexts/Auth';
import ScrollViewIndicator from 'react-native-scroll-indicator';
import { getTasks } from '@/services/TaskService';
import { TaskContext } from '@/contexts/TaskContaxt';

type EmployeeTask = {
  id: number;
  name: string;
  department: string;
  points: number;
  funcionario: string;
  descricao: string;
  fechamento: string;
  status: string;
};

export default function Ranking() {
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [employeesTask, setEmployeesTask] = useState<EmployeeTask[]>([]);
  const { filterTask } = useContext(TaskContext);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setEmail(authContext.authData?.email || null);
    setName(authContext.authData?.name || null);
  }, [authContext.authData]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const data = await getTasks( authContext.authData?.departament || 'Geral', filterTask);
        console.log('Dados do ranking recebidos:', data);
        setEmployeesTask(data);
      } catch (error) {
        console.error('Erro ao buscar ranking:', error);
      }
    };

    fetchRanking();
  }, [filterTask]);

  

  const renderEmployee = ({ item, index }: { item: EmployeeTask; index: number }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { fontSize: width >= 990 ? 18 : 12, minWidth: width>=581?180:100 }]}>{item.name}</Text>
      <Text style={[styles.cell, { fontSize: width >= 990 ? 18 : 12, minWidth: width>=581?180:100 }]}>{item.descricao}</Text>
      <Text style={[styles.cell, { fontSize: width >= 990 ? 18 : 12, minWidth: width>=581?180:100 }]}>{item.funcionario}</Text>
      <Text style={[styles.cell, { fontSize: width >= 990 ? 18 : 12, minWidth: width>=581?180:100 }]}>{item.fechamento}</Text>
      <Text style={[styles.cell, { fontSize: width >= 990 ? 18 : 12, minWidth: width>=581?180:100 }]}>{item.points}</Text>
    </View>
  );

  return (
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <View style={[styles.container, {height: height * 0.5 }]}>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, { fontSize: width >= 990 ? 18 : 12, minWidth: 100 }]}>Task</Text>
        <Text style={[styles.headerCell, { fontSize: width >= 990 ? 18 : 12, minWidth: 100 }]}>Descrição</Text>
        <Text style={[styles.headerCell, { fontSize: width >= 990 ? 18 : 12, minWidth: 100 }]}>Funcionario</Text>
        <Text style={[styles.headerCell, { fontSize: width >= 990 ? 18 : 12, minWidth: 100 }]}>Fechamento</Text>
        <Text style={[styles.headerCell, { fontSize: width >= 990 ? 18 : 12, minWidth: 100, maxWidth: 200 }]}>Pts Possiveis</Text>
        
      </View>

      <ScrollViewIndicator>
        <FlatList
          data={employeesTask}
          renderItem={renderEmployee}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </ScrollViewIndicator>
      
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2C3E50',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
