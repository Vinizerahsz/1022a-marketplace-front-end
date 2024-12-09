import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";

// Tipo para produtos
type ProdutoType = {
  id: number;
  nome: string;
  preco: string;
  descricao: string;
  imagem: string;
};

// Tipo para itens do carrinho
type CarrinhoItemType = {
  id: number;
  nome: string;
  preco: string;
  imagem: string;
};

// Componente para cadastrar produto
function CadastroProduto({
  onCadastro,
}: {
  onCadastro: (produto: Omit<ProdutoType, "id">) => void;
}) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState("");
  const navigate = useNavigate();

  const handleCadastro = () => {
    if (!nome || !descricao || !preco || !imagem) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    onCadastro({ nome, descricao, preco, imagem });
    navigate("/"); // Após o cadastro, redireciona para a página inicial.
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastrar Produto</h2>
      <form>
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
        <label>
          Descrição:
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          ></textarea>
        </label>
        <label>
          Preço:
          <input
            type="text"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />
        </label>
        <label>
          URL da Imagem:
          <input
            type="text"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleCadastro}>
          Cadastrar
        </button>
      </form>
      <Link to="/">
        <button className="voltar-home">Voltar para Produtos</button>
      </Link>
    </div>
  );
}

// Componente Carrinho
function Carrinho({
  carrinho,
  removerDoCarrinho,
}: {
  carrinho: CarrinhoItemType[];
  removerDoCarrinho: (id: number) => void;
}) {
  return (
    <div className="carrinho-container">
      <h2>Carrinho</h2>
      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul>
          {carrinho.map((item) => (
            <li key={item.id}>
              <div className="carrinho-item">
                <img src={item.imagem} alt="Imagem do produto no carrinho" />
                <p>
                  <strong>{item.nome}</strong> - {item.preco}
                </p>
                <button
                  className="botao-remover"
                  onClick={() => removerDoCarrinho(item.id)}
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Link to="/">
        <button className="voltar-home">Voltar para Produtos</button>
      </Link>
    </div>
  );
}

// Componente principal
function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const [carrinho, setCarrinho] = useState<CarrinhoItemType[]>([]);

  // useEffect para carregar produtos
  useEffect(() => {
    fetch("http://localhost:8000/produtos")
      .then((resposta) => resposta.json())
      .then((dados) => setProdutos(dados));

    fetch("http://localhost:8000/carrinho")
      .then((resposta) => resposta.json())
      .then((dados) => setCarrinho(dados));
  }, []);

  // Função para cadastrar produto
  const cadastrarProduto = async (produto: Omit<ProdutoType, "id">) => {
    try {
      const response = await fetch("http://localhost:8000/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
      });

      if (response.ok) {
        const novoProduto = await response.json();
        setProdutos([...produtos, novoProduto]); // Atualiza a lista de produtos.
        alert("Produto cadastrado com sucesso!");
      } else {
        console.error("Erro ao cadastrar produto:", await response.text());
      }
    } catch (error) {
      console.error("Erro ao conectar ao servidor:", error);
    }
  };

  // Função para adicionar produto ao carrinho
  const adicionarAoCarrinho = async (produto: ProdutoType) => {
    try {
      const response = await fetch("http://localhost:8000/carrinho", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: produto.nome,
          preco: produto.preco,
          imagem: produto.imagem,
        }),
      });

      if (response.ok) {
        const novoItem = await response.json();
        setCarrinho((prevCarrinho) => [...prevCarrinho, novoItem]); // Atualiza o carrinho.
      } else {
        console.error("Erro ao adicionar ao carrinho:", await response.text());
      }
    } catch (error) {
      console.error("Erro ao conectar ao servidor:", error);
    }
  };

  // Função para remover produto do carrinho
  const removerDoCarrinho = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/carrinho/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCarrinho(carrinho.filter((item) => item.id !== id));
      } else {
        console.error("Erro ao remover do carrinho:", await response.text());
      }
    } catch (error) {
      console.error("Erro ao conectar ao servidor:", error);
    }
  };

  return (
    <>
      <header className="site-header">
        <nav className="navigation">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/carrinho">Carrinho</Link>
            </li>
            <li>
              <Link to="/cadastrar">Cadastrar Produto</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        {/* Página Principal */}
        <Route
          path="/"
          element={
            <div className="produtos-container">
              <h1 className="titulo-produto">Produtos</h1>
              <div className="produtos-list">
                {produtos.map((produto) => (
                  <div key={produto.id} className="produto-item">
                    <h3 className="produto-nome">{produto.nome}</h3>
                    <div className="container-imagem">
                      <img src={produto.imagem} alt="Imagem do produto" />
                    </div>
                    <p className="produto-preco">{produto.preco}</p>
                    <p className="produto-descricao">{produto.descricao}</p>
                    <button
                      className="botao-comprar"
                      onClick={() => adicionarAoCarrinho(produto)}
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                ))}
              </div>
            </div>
          }
        />
        {/* Página do Carrinho */}
        <Route
          path="/carrinho"
          element={
            <Carrinho carrinho={carrinho} removerDoCarrinho={removerDoCarrinho} />
          }
        />
        {/* Página de Cadastro */}
        <Route
          path="/cadastrar"
          element={<CadastroProduto onCadastro={cadastrarProduto} />}
        />
      </Routes>
  </>)}
  export default App
