import { useState } from "react";
import { IMaskInput } from 'react-imask';
import { toast } from 'react-toastify';
import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";
import { cadastrar } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_PRODUTO } from "../../cliente/service/produtoService";

export default function ProdutoForm() {

    const [produto, setProduto] = useState({
        nome: "",
        tipo: "",
        codigo: "",
        
    });

    async function salvar() {
        
        try {
            await cadastrar(MAPPING_CONTROLLER_PRODUTO, produto);
            toast.success("Produto cadastrado com sucesso!");
        } catch (erro) {
            toast.error("Erro ao cadastrar produto.");
        }
    }

    return (

        <div>
            <Menu />

            <Breadcrumbs items={[
                { label: "Produto" },
                { label: "Cadastrar" }
            ]} />
            <div/>
                <div style={{ marginTop: '40px', marginLeft: '10%', marginRight: '10%' }}>

                <div className="overflow-x-auto shadow-sm">

                    <div className="flex items-center justify-between mb-6" style={{marginTop: '20px', marginLeft: '10px', marginRight: '10px'}}>

                        <h1 className="text-3xl font-bold text-gray-800">
                            Novo PRODUTO
                        </h1>

                    </div>

                    <div className="divider divider-info" />

                    <div className="overflow-x-auto" style={{padding: '30px'}}>
                        <form>

                            <div className="flex w-full" >
                                <div className="card rounded-box grid grow p-8" style={{padding: '30px'}}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="nome">Nome</label>
                                        <input
                                            type="text"
                                            id="nome"
                                            className="input input-bordered w-full"
                                            value={produto.nome}
                                            onChange={(e) => 
                                                setCliente({ ...produto, nome: e.target.value }) 
                                            }
                                        />
                                    </fieldset>
                                    
                                </div>
                                <div className="card rounded-box grid grow p-8" style={{padding: '30px'}}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="tipo">tipo</label>
                                        <IMaskInput
                                            mask="000.000.000-00"
                                            value={produto.tipo}
                                            onAccept={(value) =>
                                                setProduto({ ...produto, tipo: value })
                                            }
                                            className="input input-bordered w-full"
                                            id="tipo"
                                        />
                                    </fieldset>

                                </div>
                            </div>

                            <div className="flex w-full" >
                                <div className="card rounded-box grid grow p-8" style={{padding: '30px'}}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="foneCelular">Fone Celular</label>
                                        <IMaskInput
                                            mask="(00) 0 0000.0000"
                                            value={produto.foneCelular}
                                            onAccept={(value) =>
                                                setProduto({ ...cliente, foneCelular: value })
                                            }
                                            className="input input-bordered w-full"
                                            id="foneCelular"
                                        />
                                    </fieldset>
                                    
                                </div>

                                    <div className="card rounded-box grid grow p-8" style={{padding: '30px'}}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="foneFixo">Fone Fixo</label>
                                        <IMaskInput
                                            mask="qual tipo de produto voce quer"
                                            value={produto.tipo}
                                            onAccept={(value) =>
                                                setCliente({ ...cliente, foneFixo: value })
                                            }
                                            className="input input-bordered w-full"
                                            id="foneFixo"
                                        />
                                    </fieldset>
                                    
                                </div>
                                <div className="card rounded-box grid grow p-8" style={{padding: '30px'}}>

                                    <fieldset className="fieldset w-full">
                                        <legend className="fieldset-legend" htmlFor="dataNascimento">Data de Nascimento</legend>
                                        <input 
                                            type=""  
                                            id="dataNascimento" 
                                            className="input input-bordered w-full"
                                            value={produto.codigo} 
                                            onChange={(e) => 
                                                setProduto({ ...cliente, dataNascimento: e.target.value }) 
                                            }
                                        />
                                    </fieldset>

                                </div>
                            </div>
<div className="flex w-full" >
                                <div className="card rounded-box grid grow p-8" style={{padding: '30px'}}>

                                    <div style={{marginTop: '50px', textAlign: 'left'}}>
                                        <BackButton destino="/cliente" />
                                    </div>
                                    
                                </div>
                                <div className="card rounded-box grid grow p-8" style={{padding: '30px'}}>

                                    <div style={{marginTop: '50px', textAlign: 'right'}}>
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
