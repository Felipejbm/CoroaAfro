import { useState } from "react";
import { formatCpf, formatTelefone, initialFormData } from "./CadastroEmpreendedor.utils";
import { useNavigate } from "react-router-dom";
import type { FormData } from "./CadastroEmpreendedor.types";
import { criarEmpreendedor, mensagemErroCadastro } from "../../../services/Auth/controllers/empreendedor";


export function useCadastroEmpreendedor() {
    const navigate = useNavigate()
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [telefone, setTelefone] = useState("");
    const [dataNascimento, setDataNascimento] = useState(Date);
    const [cpf, setCpf] = useState("");
    const [genero, setGenero] = useState("");
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successOpen, setSuccessOpen] = useState(false);

    const handleChange =
        (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
            let value = e.target.value;
            if (field === "cpf") value = formatCpf(value);
            if (field === "telefone") value = formatTelefone(value);
            setFormData((prev) => ({ ...prev, [field]: value }));
        };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (
            !formData.nomeCompleto?.trim() ||
            !formData.email?.trim() ||
            !formData.senha ||
            !formData.telefone?.trim()
        ) {
            setError("Preencha nome, e-mail, senha e telefone para continuar.");
            return;
        }

        setLoading(true);
        try {
            await criarEmpreendedor({
                nome: formData.nomeCompleto.trim(),
                email: formData.email.trim(),
                senha: formData.senha,
                telefone: formData.telefone.trim(),
                data_cadastro: new Date().toISOString().slice(0, 10),
            });
            setSuccessOpen(true);
        } catch (requestError) {
            setError(mensagemErroCadastro(requestError));
        } finally {
            setLoading(false);
        }
    };

    const goToLogin = () => {
        setSuccessOpen(false);
        navigate("/login", { replace: true });
    };
    return {
        nome,
        setNome,
        email,
        setEmail,
        senha,
        setSenha,
        telefone,
        setTelefone,
        dataNascimento,
        setDataNascimento,
        cpf,
        setCpf,
        genero,
        setGenero,
        loading,
        goToLogin,
        error,
        successOpen,
        handleChange,
        handleSubmit,
        formData,

    }
}

