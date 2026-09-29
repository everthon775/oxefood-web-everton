import { BrowserRouter, Route, Routes } from "react-router-dom";

import ClienteForm from "../features/cliente/page/ClienteForm";


import ClientePage from "../features/cliente/page/ClientePage";

import Home from "../features/home/Home";

import ProdutoPage from "../features/prodto/page/Home";



export default function Router() {

   return (

       <BrowserRouter>

           <Routes>

                 <Route path="/" element={<Home />} />


               <Route path="/cliente" element={<ClientePage />} />

                <Route path="/cliente-form" element={<ClienteForm />} />

                <Route path="/produto" element={<ProdutoPage/>}/>
                <Route path="/empresa" element={<EmpresaPage/>}/>

           </Routes>

       </BrowserRouter>

   );
}
