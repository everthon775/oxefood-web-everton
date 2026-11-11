import { useState } from "react";
import { IMaskInput } from 'react-imask';
import { toast } from 'react-toastify';
import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";;
import { buscarPorId, cadastrar } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_CATEGORIAPRODUTO } from "../../clienteservicategoriaService";

export default function CategoriaProdutoForm() {

    const [CategoriaProdutoForm, setCategoriaProdutoForm] = useState({
        id: null,
        tipo: "",
        nome: "",
        código: "",
        foneFixo: "",
    });

