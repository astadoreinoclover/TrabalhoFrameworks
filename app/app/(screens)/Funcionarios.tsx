import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TextInput, TouchableOpacity } from 'react-native';
import BarSuperior from '@/components/bars/BarSuperior';
import { AuthContext } from '@/contexts/Auth';
import BarInferior from '@/components/bars/BarInferior';
import { getRanking, updateEmployee, deleteEmployee } from '@/services/RankingService';

type Employee = {
  id: number;
  name: string;
  department: string;
  points: number;
};

export default function Funcionarios() {
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [editedName, setEditedName] = useState<string>('');
  const [editedDepartment, setEditedDepartment] = useState<string>('');
  const [editedPoints, setEditedPoints] = useState<number | null>(null);
  
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setEmail(authContext.authData?.email || null);
    setName(authContext.authData?.name || null);

    // Fetch employees from ranking
    const fetchRanking = async () => {
      try {
        const data = await getRanking('Geral', 'Mês');
        setEmployees(data);
      } catch (error) {
        console.error('Erro ao buscar ranking:', error);
      }
    };

    fetchRanking();
  }, [authContext.authData]);

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setEditedName(employee.name);
    setEditedDepartment(employee.department);
    setEditedPoints(employee.points);
  };

  const handleSave = async () => {
    if (editingEmployee && editedName && editedDepartment && editedPoints !== null) {
      const updatedEmployee = { ...editingEmployee, name: editedName, department: editedDepartment, points: editedPoints };
      try {
        await updateEmployee(updatedEmployee);
        setEmployees(employees.map(emp => emp.id === editingEmployee.id ? updatedEmployee : emp));
        setEditingEmployee(null);
      } catch (error) {
        console.error('Erro ao atualizar funcionário:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    Alert.alert(
      'Confirmação',
      'Você tem certeza que deseja excluir este funcionário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteEmployee(id);
              setEmployees(employees.filter(emp => emp.id !== id));
            } catch (error) {
              console.error('Erro ao excluir funcionário:', error);
            }
          },
        },
      ],
    );
  };

  const renderEmployee = ({ item }: { item: Employee }) => (
    <View style={styles.employeeRow}>
      <Text style={styles.employeeText}>{item.name}</Text>
      <Text style={styles.employeeText}>{item.department}</Text>
      <Text style={styles.employeeText}>{item.points} pontos</Text>
      <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
        <Text style={styles.buttonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', top: 0 }}><BarSuperior /></View>
      <Text style={styles.title}>Bem-vindo à Tela Funcionários!</Text>
      <Text style={styles.subTitle}>Seu e-mail é: {email ? email : 'Não disponível'}</Text>
      <Text style={styles.subTitle}>Seu nome é: {name ? name : 'Não disponível'}</Text>

      <FlatList
        data={employees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEmployee}
        style={styles.list}
      />

      {editingEmployee && (
        <View style={styles.editContainer}>
          <Text style={styles.editTitle}>Editando Funcionário</Text>
          <TextInput
            style={styles.input}
            value={editedName}
            onChangeText={setEditedName}
            placeholder="Nome"
          />
          <TextInput
            style={styles.input}
            value={editedDepartment}
            onChangeText={setEditedDepartment}
            placeholder="Departamento"
          />
          <TextInput
            style={styles.input}
            value={editedPoints ? editedPoints.toString() : ''}
            onChangeText={(text) => setEditedPoints(Number(text))}
            placeholder="Pontos"
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{ position: 'absolute', bottom: 0 }}><BarInferior /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  list: {
    width: '100%',
  },
  employeeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  employeeText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  editButton: {
    backgroundColor: '#00A699',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#FF5A5F',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  editContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  editTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  saveButton: {
    backgroundColor: '#00A699',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
});
