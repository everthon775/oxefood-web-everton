import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Menu from "../../../shared/components/Menu";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import BackButton from "../../../shared/components/BackButton";
import SaveButton from "../../../shared/components/SaveButton";
import Footer from "../../../shared/components/Footer";
import { cadastrar, atualizar, buscarPorId } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_PRODUTO } from "./service/produtoService";

export default function ProdutoForm() {
    const [produto, setProduto] = useState({ nome: "", codigo: "", tipo: "" });
    const [id, setId] = useState(null);

    useEffect(() => {
        const idUrl = new URLSearchParams(window.location.search).get("id");
        if (idUrl) {
            setId(idUrl);
            buscarPorId(MAPPING_CONTROLLER_PRODUTO, idUrl).then(setProduto);
        }
    }, []);

    async function salvar() {
        try {
            if (id) {
                await atualizar(MAPPING_CONTROLLER_PRODUTO + "/" + id, { ...produto, id: Number(id) });
                toast.success("Produto alterado!");
            } else {
                await cadastrar(MAPPING_CONTROLLER_PRODUTO, produto);
                toast.success("Produto cadastrado!");
                setProduto({ nome: "", codigo: "", tipo: "" });
            }
        } catch (erro) {
            toast.error("Erro ao salvar produto.");
        }
    }

    return (
        <div>
            <Menu />
            <Breadcrumbs items={[{ label: "Produto" }, { label: "Cadastrar" }]} />
            <div style={{ margin: "40px 10%" }}>
                <h1 className="text-3xl font-bold">{id ? "Alterar Produto" : "Novo Produto"}</h1>
                <div className="divider" />

                <label className="fieldset-legend">Nome</label>
                <input className="input input-bordered w-full mb-4" value={produto.nome}
                    onChange={(e) => setProduto({ ...produto, nome: e.target.value })} />

                <label className="fieldset-legend">Código</label>
                <input className="input input-bordered w-full mb-4" value={produto.codigo}
                    onChange={(e) => setProduto({ ...produto, codigo: e.target.value })} />

                <label className="fieldset-legend">Tipo</label>
                <input className="input input-bordered w-full mb-4" value={produto.tipo}
                    onChange={(e) => setProduto({ ...produto, tipo: e.target.value })} />

                <div className="flex justify-between mt-6">
                    <BackButton destino="/produto" />
                    <SaveButton save={salvar} />
                </div>
            </div>
            <Footer />
        </div>
    );
}
