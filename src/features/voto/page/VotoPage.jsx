import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import CrudActions from "../../../shared/components/CrudActions";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import NewButton from "../../../shared/components/NewButton";
import { buscarPorId, listar, remover } from "../../../shared/services/crudService";
import {  MAPPING_CONTROLLER_VOTO } from "../service/votoService";


export default function VotoPage() {

    const [lista, setLista] = useState([]);
    const [voto, setVoto] = useState({
        
    });

    useEffect(() => {
        carregar();
    }, []);

    async function carregar() {
        try {
            const data = await listar(MAPPING_CONTROLLER_VOTO);
            setLista(data);
        } catch (erro) {
            console.error(erro);
            toast.error("Erro ao carregar VOTOS.");
        }
    }

    function editar(id) {
        window.location.href = `/voto-form?id=${numero}`;
    }

    async function confirmarRemover(numero) {
        if (!confirm("Deseja realmente excluir esta categoria?")) {
            return;
        }

        try {
            await remover(MAPPING_CONTROLLER_VOTO, id);
            await carregar();
            toast.success("Categoria removida com sucesso!");
        } catch (erro) {
            console.error(erro);
            toast.error("Erro ao remover categoria.");
        }
    }

    async function detalhar(id) {
        try {
            const data = await buscarPorId(MAPPING_CONTROLLER_VOTO, numero);

            setVoto({
               
            });

            document.getElementById("modal-detalhar-categoria").showModal();
        } catch (erro) {
            console.error(erro);
            toast.error("Erro ao carregar categoria.");
        }
    }

    return (
        <div>
            <Menu />

            <Breadcrumbs items={[
                { label: "Voto" },
                { label: "Listar" }
            ]} />

            <div style={{ marginTop: "40px", marginLeft: "10%", marginRight: "10%" }}>
                <div className="overflow-x-auto shadow-sm">

                    <div
                        className="flex items-center justify-between mb-6"
                        style={{ marginTop: "20px", marginLeft: "10px", marginRight: "10px" }}
                    >
                        <h1 className="text-3xl font-bold text-gray-800">
                            Categorias
                        </h1>

                        <NewButton destino="/categoria-form" />
                    </div>

                    <div className="divider divider-info" />

                    <div className="overflow-x-auto" style={{ marginTop: "30px" }}>
                        <table className="table table-zebra">
                            <thead>
                                <tr style={{ textAlign: "center" }}>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {lista.map((item) => (
                                    <tr key={item.id}>
                                        <td style={{ textAlign: "center" }}>
                                            {item.numero}
                                        </td>

                                        <td>
                                            {item.nome}
                                        </td>

                                        <td>
                                            {item.descricao}
                                        </td>

                                        <td style={{ textAlign: "center" }}>
                                            <CrudActions
                                                onDetail={() => detalhar(item.numero)}
                                                onEdit={() => editar(item.numero)}
                                                onDelete={() => confirmarRemover(item.numero)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <dialog id="modal-detalhar-categoria" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Dados da Categoria</h3>

                    <div className="divider" />

                    <p className="py-2">
                        <strong>ID:</strong> {categoria.id}
                    </p>

                    <p className="py-2">
                        <strong>Nome:</strong> {categoria.nome}
                    </p>

                    <p className="py-2">
                        <strong>Descrição:</strong> {categoria.descricao}
                    </p>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Fechar</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <Footer />
        </div>
    );
}
