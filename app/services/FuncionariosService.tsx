type Funcionarios = {
    id: number;
    name: string;
    department: string;
    entregue: number;
    naoentregue: number;
    emdesenvolvimento: number;
  };
  
  // Dados simulados para cada período
  const funcionariosTotais: Funcionarios[] = [
    { id: 1, name: 'Ana Silva', department: 'Marketing', entregue: 5, naoentregue: 2, emdesenvolvimento: 1 },
    { id: 2, name: 'Carlos Souza', department: 'Financeiro', entregue: 7, naoentregue: 1, emdesenvolvimento: 1 },
    { id: 3, name: 'Maria Oliveira', department: 'TI', entregue: 9, naoentregue: 0, emdesenvolvimento: 2 },
    { id: 4, name: 'João Ferreira', department: 'Vendas', entregue: 1, naoentregue: 1, emdesenvolvimento: 1 },
  ];
  
  // Função para simular a API de ranking com base no período
  export async function getFuncionarios(department: string): Promise<Funcionarios[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Filtrar os empregados pelo departamento
        const filteredFuncionarios = department === 'Geral'
          ? funcionariosTotais
          : funcionariosTotais.filter(fun => fun.department === department);
  
        // Simular o resultado ordenado por pontos
        const sortedFuncionarios = filteredFuncionarios.sort((a, b) => a.name.localeCompare(b.name));
  
        resolve(sortedFuncionarios);
      }, 500); // Simula um tempo de resposta de 500ms
    });
  }
  
