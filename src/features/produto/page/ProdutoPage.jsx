import { useEffect, useState } from "react";

import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import CrudActions from "../../../shared/components/CrudActions";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import NewButton from "../../../shared/components/NewButton";

import { listar } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_PRODUTO } from "../../cliente/service/produtoService";


export default function ProdutoPage() {

   const [lista, setLista] = useState([]);

   useEffect(() => {
       carregar();
   }, []);

   async function carregar() {
       const data = await listar(MAPPING_CONTROLLER_PRODUTO);
       setLista(data);
   }

   function editar(id) {}

   async function confirmarRemoer(id) {
    if (confirm("Deseja realmente excluir estee cliente?")) {
        console.log(id);
    }
   }

   return (
    
       <div>
           <h1>Produto</h1>
           {lista.map(produto => (
               <div key={produto.id}>
                   {produto.nome} - {produto.dto}
               </div>
           ))}
       </div>
   );
}
