import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import "./AlterarProduto.css";

function AlterarProduto() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [produto, setProduto] = useState({ nome: "", descricao: "", preco: "", imagem: "", modelo: "", marca: "" });

    useEffect(() => {
        fetch(`https://one022a-marketplace-bggt.onrender.com/produtos/${id}`)
            .then(res => res.json())
            .then(dados => setProduto(dados))
            .catch(() => alert("Erro ao carregar os dados do produto."));
    }, [id]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setProduto({ ...produto, [event.target.name]: event.target.value });
    };

    async function handleForm(event: FormEvent) {
        event.preventDefault();
        try {
            const resposta = await fetch(`https://one022a-marketplace-bggt.onrender.com/produtos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(produto),
            });

            if (resposta.ok) {
                alert("Produto Alterado com Sucesso");
                navigate("/");
            } else {
                const mensagem = await resposta.text();
                alert("Erro ao Alterar Produto - Error: " + mensagem);
            }
        } catch {
            alert("Servidor não está respondendo.");
        }
    }

    return (
        <div className="alterar-produto-container">
            <h1>Alterar Produto</h1>
            <form onSubmit={handleForm}>
                <div>
                    <label htmlFor="id">Id</label>
                    <input type="text" id="id" value={id} readOnly />
                </div>
                <div>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" name="nome" value={produto.nome} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="descricao">Descrição</label>
                    <input type="text" id="descricao" name="descricao" value={produto.descricao} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="preco">Preço</label>
                    <input type="text" id="preco" name="preco" value={produto.preco} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="modelo">Modelo</label>
                    <input type="text" id="modelo" name="modelo" value={produto.modelo} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="marca">Marca</label>
                    <input type="text" id="marca" name="marca" value={produto.marca} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="imagem">URL Imagem</label>
                    <input type="text" id="imagem" name="imagem" value={produto.imagem} onChange={handleChange} />
                    {produto.imagem && <img className="imagem-produto-reduzida" src={produto.imagem} alt="Imagem do Produto" />}
                </div>
                <div>
                    <input type="submit" value="Alterar" />
                </div>
            </form>
        </div>
    );
}

export default AlterarProduto