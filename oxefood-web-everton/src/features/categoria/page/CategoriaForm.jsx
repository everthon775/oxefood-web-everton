import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";
import {
    atualizar,
    buscarPorId,
    cadastrar
} from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_CATEGORIA } from "../service/categoriaService";

export default function CategoriaForm() {

    const [searchParams] = useSearchParams();

    const id = searchParams.get("id");
    const modoEdicao = Boolean(id);

    const [categoria, setCategoria] = useState({
        id: "",
        nome: "",
        descricao: ""
    });

    useEffect(() => {
        if (modoEdicao) {
            carregarCategoria();
        }
    }, [id]);

    async function carregarCategoria() {
        try {
            const data = await buscarPorId(MAPPING_CONTROLLER_CATEGORIA, id);

            setCategoria({
                id: data.id,
                nome: data.nome ?? "",
                descricao: data.descricao ?? ""
            });
        } catch (erro) {
            console.error(erro);
            toast.error("Erro ao carregar categoria.");
        }
    }

    async function salvar() {
        try {
            if (modoEdicao) {
                await atualizar(MAPPING_CONTROLLER_CATEGORIA, categoria);
                toast.success("Categoria atualizada com sucesso!");
            } else {
                await cadastrar(MAPPING_CONTROLLER_CATEGORIA, {
                    nome: categoria.nome,
                    descricao: categoria.descricao
                });
                toast.success("Categoria cadastrada com sucesso!");
            }

            window.location.href = "/categoria";
        } catch (erro) {
            console.error(erro);
            toast.error(
                modoEdicao
                    ? "Erro ao atualizar categoria."
                    : "Erro ao cadastrar categoria."
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
                                            id="nome"
                                            className="input input-bordered w-full"
                                            value={categoria.nome}
                                            onChange={(event) =>
                                                setCategoria({
                                                    ...categoria,
                                                    nome: event.target.value
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
                                            value={categoria.descricao}
                                            onChange={(event) =>
                                                setCategoria({
                                                    ...categoria,
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
                                        <BackButton destino="/categoria" />
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
