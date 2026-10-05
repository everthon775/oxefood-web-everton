import { BrowserRouter, Route, Routes } from "react-router-dom";

import ClienteForm from "../features/cliente/page/ClienteForm";


import ClientePage from "../features/cliente/page/ClientePage";

import Home from "../features/home/Home";

import ProdutoPage from "../features/produto/page/Home";

import ProdutoForm from "../features/produto/page/ProdutoForm";

import EmpresaPage from "../features/empresa/page/EmpresaPage";

import EmpresaForm from "../features/empresa/page/EmpresaForm";
import CategoriaPage from "../features/categoria/page/CategoriaPage";
import CategoriaForm from "../features/categoria/page/CategoriaForm";




export default function Router() {

   return (

       <BrowserRouter>

           <Routes>

                 <Route path="/" element={<Home />} />


               <Route path="/cliente" element={<ClientePage />} />

                <Route path="/cliente-form" element={<ClienteForm />} />

                <Route path="/produto" element={<ProdutoPage/>}/>
                <Route path="/produto-form" element={<ProdutoForm/>}/>
                <Route path="/empresa" element={<EmpresaPage/>}/>
                <Route path="/empresa-form" element={<EmpresaForm/>}/>
                <Route path="/categoria" element={<CategoriaPage/>}/>
                <Route path="/categoria-form" element={<CategoriaForm/>}/>


           </Routes>

       </BrowserRouter>

   );
}
