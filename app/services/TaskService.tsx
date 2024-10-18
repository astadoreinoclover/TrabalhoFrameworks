type Tasks = {
  id: number;
  name: string;
  department: string;
  points: number;
  funcionario: string;
  descricao: string;
  fechamento: string;
  status: string;
};
  
  // Dados simulados para cada período
  const TasksTotais: Tasks[] = [
    { id: 1, name: 'Campanha', department: 'Marketing', points: 75, funcionario: 'Ana', descricao: 'Campanha de mídias sociais', fechamento: '2024-10-01',status: 'Entregue'},
    { id: 2, name: 'Renda', department: 'Financeiro', points: 90, funcionario: 'Carlos', descricao: 'Fechamento mensal', fechamento: '2024-10-05', status: 'Em Desenvolvimento'},
    { id: 3, name: 'Atualização', department: 'TI', points: 65, funcionario: 'Maria', descricao: 'Atualização de sistemas', fechamento: '2024-10-10', status: 'Não Entregue'},
    { id: 4, name: 'Relatorio', department: 'Vendas', points: 80, funcionario: 'João', descricao: 'Relatório de vendas trimestral', fechamento: '2024-10-15', status: 'Em Desenvolvimento' },
  ];
  
  export async function getTasks(department: string, status: string): Promise<Tasks[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredTasksByDepartment = department === 'Geral'
        ? TasksTotais
        : TasksTotais.filter(task => task.department === department);

      const filteredTasks = status === 'Em Desenvolvimento'
        ? filteredTasksByDepartment
        : filteredTasksByDepartment.filter(task => task.status === status);

      resolve(filteredTasks);
      }, 500); // Simula um tempo de resposta de 500ms
    });
  }