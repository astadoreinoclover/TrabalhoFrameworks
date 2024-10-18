type Tasks = {
  id: number;
  name: string;
  department: string;
  points: number;
  funcionario: string;
  descricao: string;
  fechamento: string;
  status: string;
  empresa: string;
};
  
  // Dados simulados para cada período
  const TasksTotais: Tasks[] = [
    { id: 1, name: 'Campanha', department: 'Marketing', points: 75, funcionario: 'Ana', descricao: 'Campanha de mídias sociais', fechamento: '2024-10-01',status: 'Entregue', empresa: 'Senac'},
    { id: 2, name: 'Renda', department: 'Financeiro', points: 90, funcionario: 'Carlos', descricao: 'Fechamento mensal', fechamento: '2024-10-05', status: 'Em Desenvolvimento', empresa: 'Senac'},
    { id: 3, name: 'Atualização', department: 'TI', points: 65, funcionario: 'Maria', descricao: 'Atualização de sistemas', fechamento: '2024-10-10', status: 'Não Entregue', empresa: 'Senac'},
    { id: 4, name: 'Relatorio', department: 'Financeiro', points: 80, funcionario: 'João', descricao: 'Relatório de vendas trimestral', fechamento: '2024-10-15', status: 'Em Desenvolvimento', empresa: 'Batata'},
  ];
  
  export async function getTasks(department: string, status: string, empresa: string): Promise<Tasks[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Filtro por departamento
        const filteredTasksByDepartment = department === 'Geral'
          ? TasksTotais
          : TasksTotais.filter(task => task.department === department);
  
        // Filtro por status
        const filteredTasksByStatus = status
          ? filteredTasksByDepartment.filter(task => task.status === status)
          : filteredTasksByDepartment;
  
        // Filtro por empresa
        const filteredTasksByEmpresa = empresa
          ? filteredTasksByStatus.filter(task => task.empresa === empresa)
          : filteredTasksByStatus;
  
        console.log('Tarefas filtradas por empresa:', filteredTasksByEmpresa); // Debug para ver o que está sendo filtrado
        resolve(filteredTasksByEmpresa);
      }, 500);
    });
  }
  
  