import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./CadastroProduto.css";

function CadastroProduto() {
    const navigate = useNavigate();
    const [produto, setProduto] = useState({ id: "", nome: "", descricao: "", preco: "", imagem: "", modelo: "", marca: "" });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setProduto({ ...produto, [event.target.name]: event.target.value });
    };

    async function handleForm(event: FormEvent) {
        event.preventDefault();
        try {
            const resposta = await fetch("https://one022a-marketplace-bggt.onrender.com/produtos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(produto),
            });

            if (resposta.ok) {
                alert("Produto Cadastrado com Sucesso");
                navigate("/");
            } else {
                const mensagem = await resposta.text();
                alert("Erro ao Cadastrar Produto - Error: " + mensagem);
            }
        } catch {
            alert("Servidor não está respondendo.");
        }
    }

    return (
        <div className="cadastro-produto-container">
            <h1>Cadastro de Produtos</h1>
            <form onSubmit={handleForm}>
                <div>
                    <input className='componente-botao' placeholder="Id" type="text" name="id" id="id" onChange={handleChange} />
                </div>
                <div>
                    <input className='componente-botao' placeholder="Nome" type="text" name="nome" id="nome" onChange={handleChange} />
                </div>
                <div>
                    <input className='componente-botao' placeholder="Descrição" type="text" name="descricao" id="descricao" onChange={handleChange} />
                </div>
                <div>
                    <input className='componente-botao' placeholder="Preço" type="text" name="preco" id="preco" onChange={handleChange} />
                </div>
                <div>
                    <input className='componente-botao' placeholder="Modelo" type="text" name="modelo" id="modelo" onChange={handleChange} />
                </div>
                <div>
                    <input className='componente-botao' placeholder="Marca" type="text" name="marca" id="marca" onChange={handleChange} />
                </div>
                <div>
                    <input className='componente-botao' placeholder="URL Imagem" type="text" name="imagem" id="imagem" onChange={handleChange} />
                </div>
                <input className='componente-botao' type="submit" value="Cadastrar" />
            </form>
        </div>
    );
}

export default CadastroProduto;
