import { useCallback, useEffect, useRef, useState } from "react";
import { arquivarConversaIA, buscarModosIA, criarConversaIA, enviarMensagemIA, listarConversasIA, listarMensagensIA, mensagemErroIA, type ConversaIA, type MensagemIA, type ModoIA } from "../../services/Auth/controllers/ia";

export default function useAssistenteIA() {
    const formatarHora = (data: string) =>
        new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(new Date(data));

    const fimRef = useRef<HTMLDivElement | null>(null);
    const [modos, setModos] = useState<ModoIA[]>([]);
    const [modo, setModo] = useState("geral");
    const [conversas, setConversas] = useState<ConversaIA[]>([]);
    const [conversaAtiva, setConversaAtiva] = useState<ConversaIA | null>(null);
    const [mensagens, setMensagens] = useState<MensagemIA[]>([]);
    const [texto, setTexto] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState("");

    const carregarMensagens = useCallback(async (conversa: ConversaIA) => {
        setConversaAtiva(conversa);
        setErro("");
        try {
            setMensagens(await listarMensagensIA(conversa.id_conversa));
        } catch (error) {
            setErro(mensagemErroIA(error));
        }
    }, []);

    useEffect(() => {
        const carregar = async () => {
            try {
                const [opcoes, historico] = await Promise.all([buscarModosIA(), listarConversasIA()]);
                setModos(opcoes);
                setConversas(historico);
                if (historico[0]) await carregarMensagens(historico[0]);
            } catch (error) {
                setErro(mensagemErroIA(error));
            } finally {
                setCarregando(false);
            }
        };
        void carregar();
    }, [carregarMensagens]);

    useEffect(() => {
        fimRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mensagens, enviando]);

    const novaConversa = () => {
        setConversaAtiva(null);
        setMensagens([]);
        setTexto("");
        setModo("geral");
        setErro("");
    };

    const enviar = async () => {
        const conteudo = texto.trim();
        if (!conteudo || enviando) return;
        setEnviando(true);
        setErro("");
        setTexto("");
        try {
            let conversa = conversaAtiva;
            if (!conversa) {
                conversa = await criarConversaIA(conteudo.slice(0, 55));
                setConversaAtiva(conversa);
                setConversas((atuais) => [conversa!, ...atuais]);
            }
            const resposta = await enviarMensagemIA(conversa.id_conversa, conteudo, modo);
            setMensagens((atuais) => [
                ...atuais,
                resposta.mensagem_usuario,
                resposta.mensagem_assistente,
            ]);
            setConversaAtiva(resposta.conversa);
            setConversas((atuais) => [
                resposta.conversa,
                ...atuais.filter((item) => item.id_conversa !== resposta.conversa.id_conversa),
            ]);
        } catch (error) {
            setTexto(conteudo);
            setErro(mensagemErroIA(error));
        } finally {
            setEnviando(false);
        }
    };

    const arquivar = async () => {
        if (!conversaAtiva || enviando) return;
        try {
            await arquivarConversaIA(conversaAtiva.id_conversa);
            setConversas((atuais) =>
                atuais.filter((item) => item.id_conversa !== conversaAtiva.id_conversa),
            );
            novaConversa();
        } catch (error) {
            setErro(mensagemErroIA(error));
        }
    };

    const modoAtivo = modos.find((item) => item.id === modo);

    return {
        formatarHora,
        conversas,
        carregando,
        modoAtivo,
        arquivar,
        enviar,
        erro,
        novaConversa,
        carregarMensagens,
        conversaAtiva,
        mensagens,
        modos,
        setModo,
        setTexto,
        enviando,
        fimRef,
        modo,
        texto,
        

    }
}