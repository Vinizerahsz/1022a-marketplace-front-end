import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';
import  './CadastroProduto.css';
function CadastroProduto() {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [imagem, setImagem] = useState("");

    async function handleForm(event: FormEvent) {
        event.preventDefault();
        try {
            const resposta = await fetch("https://one022a-marketplace-bggt.onrender.com/produtos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    nome: nome,
                    descricao: descricao,
                    preco: preco,
                    imagem: imagem
                })
            });
            if (resposta.status != 500) {
                alert("Produto Cadastrado com Sucesso");
                navigate("/");
            } else {
                const mensagem = await resposta.text();
                alert("Erro ao Cadastrar Produto - Error: " + mensagem);
            }
        } catch (e) {
            alert("Servidor não está respondendo.");
        }
    }

    function handleId(event: ChangeEvent<HTMLInputElement>) {
        setId(event.target.value);
    }

    function handleNome(event: ChangeEvent<HTMLInputElement>) {
        setNome(event.target.value);
    }

    function handleDescricao(event: ChangeEvent<HTMLInputElement>) {
        setDescricao(event.target.value);
    }

    function handlePreco(event: ChangeEvent<HTMLInputElement>) {
        setPreco(event.target.value);
    }

    function handleImagem(event: ChangeEvent<HTMLInputElement>) {
        setImagem(event.target.value);
    }

    return (
        <div className="cadastro-produto-container">
            <h1>Cadastro de Produtos</h1>
            <form onSubmit={handleForm}>
                <div>
                    <input className='componente-botao' placeholder="Id" type="text" name="id" id="id" onChange={handleId} />
                </div>
                <div>
                    <input className='componente-botao' placeholder="Nome" type="text" name="nome" id="nome" onChange={handleNome} />
                </div>
                <div>
                    <input className='componente-botao' placeholder="Descrição" type="text" name="descricao" id="descricao" onChange={handleDescricao} />
                </div>
                <div>
                    <input className='componente-botao' placeholder="Preço" type="text" name="preco" id="preco" onChange={handlePreco} />
                </div>
                <div>
                    <input className='componente-botao' placeholder="URL Imagem" type="text" name="imagem" id="imagem" onChange={handleImagem} />
                </div>
                <input className='componente-botao' type="submit" value="Cadastrar" />
            </form>
        </div>
    );
}

export default CadastroProduto;