import { useEffect, useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

// Tipo para produtos
type ProdutoType = {
  id: number;
  nome: string;
  preco: string;
  descricao: string;
  imagem: string;
  modelo: string;
  marca: string;
};

function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);

  // useEffect para carregar produtos
  useEffect(() => {
    fetch("https://one022a-marketplace-bggt.onrender.com/produtos")
      .then(resposta => resposta.json())
      .then(dados => setProdutos(dados));
  }, []);

  function handleExcluir(id: number) {
    alert(`Excluir o produto com id ${id}`);
    fetch(`https://one022a-marketplace-bggt.onrender.com/produtos/${id}`, {
      method: 'DELETE'
    })
    .then(resposta => {
      if (resposta.status === 200) {
        alert("Produto excluído com sucesso");
        setProdutos(produtos.filter(produto => produto.id !== id));
      } else {
        alert("Erro ao excluir o produto: Confira o terminal do backend");
      }
    });
  }

  return (
    <>
      <div className="produtos-container">
        <Link to="/cadastro-produto" className='estilizar-cadastro-botao'>Cadastro de Produto</Link>
        <h1 className='titulo-produto'>Vanguard Store</h1>
        <div className="produtos-list">
          {produtos.map(produto => (
            <div key={produto.id} className="produto-item">
              <h3 className="produto-nome">{produto.nome}</h3>
              <div className='container-imagem'>
                <img src={produto.imagem} alt="Imagem do produto" />
              </div>
              <p className="produto-preco">{produto.preco}</p>
              <p className="produto-descricao">{produto.descricao}</p>
              <p className="produto-modelo">Modelo: {produto.modelo}</p>
              <p className="produto-marca">Marca: {produto.marca}</p>
              <button className="botao-comprar">Comprar</button>
              <button className="botao-excluir" onClick={() => handleExcluir(produto.id)}>Excluir</button>
              <Link to={`/alterar-produto/${produto.id}`} className="botao-alterar">Alterar</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
