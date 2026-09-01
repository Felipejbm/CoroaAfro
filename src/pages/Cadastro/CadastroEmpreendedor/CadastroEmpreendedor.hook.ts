import { useState } from "react";


export function useCadastroEmpreendedor() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [telefone, setTelefone] = useState("");
    const [dataNascimento, setDataNascimento] = useState(Date);
    const [cpf, setCpf] = useState("");
    const [genero, setGenero] = useState("");

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
        setGenero
    }
}

