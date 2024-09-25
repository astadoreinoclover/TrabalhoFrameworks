import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { AuthContext } from '@/contexts/Auth';
import { employees } from './Ranking';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Filter() {
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const authContext = useContext(AuthContext);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Mês');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('Geral');

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const storedDepartment = await AsyncStorage.getItem('Departament-Ranking');
        setSelectedDepartment(storedDepartment || 'Geral');
      } catch (error) {
        console.error('Erro ao recuperar departamento:', error);
        setSelectedDepartment('Geral');
      }
    };

    const fetchPeriod = async () => {
        try {
          const storedPeriod = await AsyncStorage.getItem('Period-Ranking');
          setSelectedPeriod(storedPeriod || 'Mês');
        } catch (error) {
          console.error('Erro ao recuperar periodo:', error);
          setSelectedDepartment('Mês');
        }
      };

    setEmail(authContext.authData?.email || null);
    setName(authContext.authData?.name || null);
    fetchDepartment();
    fetchPeriod();
  }, [authContext.authData]);

  const uniqueDepartments = Array.from(new Set(employees.map(employee => employee.department)));

  const departmentsWithGeneral = ['Geral', ...uniqueDepartments];

  return (
    <View style={[styles.container, { width: width >= 768 ? width * 0.4 : width * 0.9, height: width >= 768 ? height * 0.6 : height * 0.3 }]}>
      <Text style={[styles.title, {fontSize: width >=768 ? 16:12}]}>Periodo</Text>
      <View style={styles.grid}>
        <TouchableOpacity onPress={async () => { setSelectedPeriod('Semana');await AsyncStorage.setItem('Period-Ranking', 'Semana');}} style={styles.departamentContainer}>
            <Text style={[ styles.filterDepartament, selectedPeriod === 'Semana' && styles.selectedText, {fontSize: width >= 768 ? 15:10}]}>Semana</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={async () => { setSelectedPeriod('Mês');await AsyncStorage.setItem('Period-Ranking', 'Mês');}} style={styles.departamentContainer}>
            <Text style={[ styles.filterDepartament, selectedPeriod === 'Mês' && styles.selectedText, {fontSize: width >= 768 ? 15:10}]}>Mês</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={async () => { setSelectedPeriod('Ano');await AsyncStorage.setItem('Period-Ranking', 'Ano');}} style={styles.departamentContainer}>
            <Text style={[ styles.filterDepartament, selectedPeriod === 'Ano' && styles.selectedText, {fontSize: width >= 768 ? 15:10}]}>Ano</Text>    
        </TouchableOpacity>
      </View>

      <Text style={[styles.title, {fontSize: width >=768 ? 16:12, marginTop: width >=768 ? 20:8}]}>Departamentos</Text>

      <View style={styles.grid}>
        {departmentsWithGeneral.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={async () => {
                setSelectedDepartment(item);
                await AsyncStorage.setItem('Departament-Ranking', item);
            }}
            style={styles.departamentContainer}
          >
            <Text
              style={[
                styles.filterDepartament,
                item === selectedDepartment && styles.selectedText 
              , {fontSize: width >= 768 ? 15:10}]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    color: '#2c3e50',
    fontWeight: '700',
    marginTop:5,
    marginBottom:5,
    margin: 'auto'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  departamentContainer: {
    margin: 5,
  },
  filterDepartament: {
    backgroundColor: '#2c3e50',
    color: '#fff',
    padding: 10,
    paddingLeft:20,
    paddingRight:20,
    textAlign: 'center',
    fontWeight: '600',
    borderRadius: 30,
    alignItems: 'center',
  },
  selectedText: {
    color: '#2c3e50',
    backgroundColor: '#fff',
    padding: 10,
    paddingLeft:20,
    paddingRight:20,
    textAlign: 'center',
    fontWeight: '600',
    borderRadius: 30,
    alignItems: 'center',
  },
});