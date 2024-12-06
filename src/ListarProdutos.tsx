import { useEffect, useState } from 'react';

type ProdutoType = {
  id: number;
  nome: string;
  imagem: string;
};

const ListarProdutos = () => {
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);

  useEffect(() => {
    // Função para obter os produtos do backend
    const fetchProdutos = async () => {
      try {
        const response = await fetch('http://localhost:8000/produtos');
        if (response.ok) {
          const produtosData = await response.json();
          setProdutos(produtosData); // Armazena os produtos no estado
        } else {
          console.error('Erro ao obter os produtos:', await response.text());
        }
      } catch (error) {
        console.error('Erro ao conectar ao servidor:', error);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <div>
      <h2>Produtos Disponíveis</h2>
      <div className="produtos-list">
        {produtos.map((produto) => (
          <div key={produto.id} className="produto-card">
            <img src={produto.imagem} alt={produto.nome} />
            <h3>{produto.nome}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListarProdutos;
