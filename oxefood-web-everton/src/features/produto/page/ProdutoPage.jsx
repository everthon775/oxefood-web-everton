import { useEffect, useState } from "react";
import Menu from "../../../shared/components/Menu";
import NewButton from "../../../shared/components/NewButton";
import CrudActions from "../../../shared/components/CrudActions";
import Footer from "../../../shared/components/Footer";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import { listar, remover } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_PRODUTO } from "./service/produtoService";

export default function ProdutoPage() {
    const [lista, setLista] = useState([]);

    useEffect(() => { carregar(); }, []);

    async function carregar() {
        const dados = await listar(MAPPING_CONTROLLER_PRODUTO);
        setLista(dados);
    }

    async function excluir(id) {
        if (confirm("Deseja excluir este produto?")) {
            await remover(MAPPING_CONTROLLER_PRODUTO, id);
            carregar();
        }
    }

    function editar(id) {
        window.location.href = "/produto-form?id=" + id;
    }

    return (
        <div>
            <Menu />
            <Breadcrumbs items={[{ label: "Produto" }, { label: "Listar" }]} />
            <div style={{ margin: "40px 10%" }}>
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">Produtos</h1>
                    <NewButton destino="/produto-form" />
                </div>
                <table className="table table-zebra">
                    <thead>
                        <tr><th>Nome</th><th>Código</th><th>Tipo</th><th>Ações</th></tr>
                    </thead>
                    <tbody>
                        {lista.map((produto) => (
                            <tr key={produto.id}>
                                <td>{produto.nome}</td>
                                <td>{produto.codigo}</td>
                                <td>{produto.tipo}</td>
                                <td>
                                    <CrudActions
                                        onEdit={() => editar(produto.id)}
                                        onDelete={() => excluir(produto.id)}
                                        onDetail={() => alert(`Produto: ${produto.nome}`)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}
