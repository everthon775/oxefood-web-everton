import { useEffect, useState } from "react";
import Menu from "../../../shared/components/Menu";
import NewButton from "../../../shared/components/NewButton";
import CrudActions from "../../../shared/components/CrudActions";
import Footer from "../../../shared/components/Footer";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import { listar, remover } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_EMPRESA } from "../service/empresaService";

export default function EmpresaPage() {
    const [lista, setLista] = useState([]);

    useEffect(() => {
        carregar();
    }, []);

    async function carregar() {
        const dados = await listar(MAPPING_CONTROLLER_EMPRESA);
        setLista(dados);
    }

    async function excluir(id) {
        if (confirm("Deseja excluir esta empresa?")) {
            await remover(MAPPING_CONTROLLER_EMPRESA, id);
            carregar();
        }
    }

    function editar(id) {
        window.location.href = "/empresa-form?id=" + id;
    }

    return (
        <div>
            <Menu />
            <Breadcrumbs items={[{ label: "Empresa" }, { label: "Listar" }]} />

            <div style={{ margin: "40px 10%" }}>
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">Empresas</h1>
                    <NewButton destino="/empresa-form" />
                </div>

                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>CNPJ</th>
                            <th>Telefone</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map((empresa) => (
                            <tr key={empresa.id}>
                                <td>{empresa.nome}</td>
                                <td>{empresa.cnpj}</td>
                                <td>{empresa.foneFixo}</td>
                                <td>
                                    <CrudActions
                                        onEdit={() => editar(empresa.id)}
                                        onDelete={() => excluir(empresa.id)}
                                        onDetail={() => alert(`Empresa: ${empresa.nome}`)}
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
