import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Menu from "../../../shared/components/Menu";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import BackButton from "../../../shared/components/BackButton";
import SaveButton from "../../../shared/components/SaveButton";
import Footer from "../../../shared/components/Footer";
import { cadastrar, atualizar, buscarPorId } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_EMPRESA } from "../service/empresaService";

export default function EmpresaForm() {
    const [empresa, setEmpresa] = useState({ nome: "", cnpj: "", foneFixo: "" });
    const [id, setId] = useState(null);

    useEffect(() => {
        const idUrl = new URLSearchParams(window.location.search).get("id");
        if (idUrl) {
            setId(idUrl);
            buscarPorId(MAPPING_CONTROLLER_EMPRESA, idUrl).then(setEmpresa);
        }
    }, []);

    async function salvar() {
        try {
            if (id) {
                await atualizar(MAPPING_CONTROLLER_EMPRESA + "/" + id, { ...empresa, id: Number(id) });
                toast.success("Empresa alterada!");
            } else {
                await cadastrar(MAPPING_CONTROLLER_EMPRESA, empresa);
                toast.success("Empresa cadastrada!");
                setEmpresa({ nome: "", cnpj: "", foneFixo: "" });
            }
        } catch (erro) {
            toast.error("Erro ao salvar empresa.");
        }
    }

    return (
        <div>
            <Menu />
            <Breadcrumbs items={[{ label: "Empresa" }, { label: "Cadastrar" }]} />
            <div style={{ margin: "40px 10%" }}>
                <h1 className="text-3xl font-bold">{id ? "Alterar Empresa" : "Nova Empresa"}</h1>
                <div className="divider" />

                <label className="fieldset-legend">Nome</label>
                <input className="input input-bordered w-full mb-4" value={empresa.nome}
                    onChange={(e) => setEmpresa({ ...empresa, nome: e.target.value })} />

                <label className="fieldset-legend">CNPJ</label>
                <input className="input input-bordered w-full mb-4" value={empresa.cnpj}
                    onChange={(e) => setEmpresa({ ...empresa, cnpj: e.target.value })} />

                <label className="fieldset-legend">Telefone</label>
                <input className="input input-bordered w-full mb-4" value={empresa.foneFixo}
                    onChange={(e) => setEmpresa({ ...empresa, foneFixo: e.target.value })} />

                <div className="flex justify-between mt-6">
                    <BackButton destino="/empresa" />
                    <SaveButton save={salvar} />
                </div>
            </div>
            <Footer />
        </div>
    );
}
