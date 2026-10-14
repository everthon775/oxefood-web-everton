import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";
import {atualizar,buscarPorId,cadastrar} from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_VOTO } from "../service/VotoService";


export default function VotoForm() {

    const [searchParams] = useSearchParams();

    const id = searchParams.get("id");
    const modoEdicao = Boolean(id);

    const [voto, setVoto] = useState({
       nomeEleitor: "",
       dataVotacao:"",
       numeroRegistroEleitoral: "",
       numeroCandidatoDepFederal: "",
       numeroCandidatoDepEstadual: "",
       


    });

    useEffect(() => {
        if (modoEdicao) {
            carregarVoto();
        }
    }, [id]);

    async function carregarVoto() {
        try {
            const data = await buscarPorId(MAPPING_CONTROLLER_VOTO, id);

            setVoto({
                id: data.id,
                nomeEleitor: data.nomeEleitor ?? "",
                numeroRegistroEleitoral: data.numeroRegistroEleitoral ?? "",
                numeroCandidatoDepFederal: data.numeroCandidatoDepFederal ?? "",
                

            });
        } catch (erro) {
            console.error(erro);
            toast.error("Erro ao carregar categoria.");
        }
    }

    async function salvar() {
        try {
            if (modoEdicao) {
                await atualizar(MAPPING_CONTROLLER_VOTO, voto);
                toast.success("Categoria atualizada com sucesso!");
            } else {
                await cadastrar(MAPPING_CONTROLLER_VOTO, {
                    nome: voto.nome,
                    descricao: voto.descricao
                });
                toast.success("Categoria cadastrada com sucesso!");
            }

            window.location.href = "/voto";
        } catch (erro) {
            console.error(erro);
            toast.error(
                modoEdicao
                    ? "Erro ao atualizar voto."
                    : "Erro ao cadastrar voto."
            );
        }
    }

    return (
        <div>
            <Menu />

            <Breadcrumbs items={[
                { label: "Categoria" },
                { label: modoEdicao ? "Alterar" : "Cadastrar" }
            ]} />

            <div style={{ marginTop: "40px", marginLeft: "10%", marginRight: "10%" }}>
                <div className="overflow-x-auto shadow-sm">

                    <div
                        className="flex items-center justify-between mb-6"
                        style={{ marginTop: "20px", marginLeft: "10px", marginRight: "10px" }}
                    >
                        <h1 className="text-3xl font-bold text-gray-800">
                            {modoEdicao ? "Alterar Categoria" : "Nova Categoria"}
                        </h1>
                    </div>

                    <div className="divider divider-info" />

                    <div className="overflow-x-auto" style={{ padding: "30px" }}>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                salvar();
                            }}
                        >
                            <div className="flex w-full gap-4">

                                <div className="card rounded-box grid grow p-8">
                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="nome">
                                            Nome
                                        </label>

                                        <input
                                            type="text"
                                            numero= "text"
                                            className="input input-bordered w-full"
                                            value={voto.nomeEleitor}
                                            onChange={(event) =>
                                                setVoto({
                                                    ...voto,
                                                    nomeEleitor: event.target.value
                                                })
                                            }
                                            required
                                        />
                                    </fieldset>
                                </div>

                                <div className="card rounded-box grid grow p-8">
                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="descricao">
                                            Descrição
                                        </label>

                                        <textarea
                                            id="descricao"
                                            className="textarea textarea-bordered w-full"
                                            value={voto.descricao}
                                            onChange={(event) =>
                                                setVoto({
                                                    ...voto,
                                                    descricao: event.target.value
                                                })
                                            }
                                            required
                                        />
                                    </fieldset>
                                </div>

                            </div>

                            <div className="flex w-full">
                                <div className="card rounded-box grid grow p-8">
                                    <div style={{ marginTop: "50px", textAlign: "left" }}>
                                        <BackButton destino="/voto" />
                                    </div>
                                </div>

                                <div className="card rounded-box grid grow p-8">
                                    <div style={{ marginTop: "50px", textAlign: "right" }}>
                                        <SaveButton save={() => salvar()} />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
