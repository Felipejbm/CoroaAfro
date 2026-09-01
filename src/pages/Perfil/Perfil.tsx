import {
  Avatar,
  Button,
  Stack,
  Typography,
  Alert,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { Logout } from "@mui/icons-material";

export default function Perfil() {
   const navigate = useNavigate();
  const [usuario, setUsuario] = useState<SessaoUsuario | null>(null);
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [editando, setEditando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erroEdicao, setErroEdicao] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [form, setForm] = useState({ nome: "", email: "", telefone: "" });

  useEffect(() => {
    let active = true;
    Promise.all([buscarSessao(), buscarMinhaEmpresa()]).then(([pessoa, negocio]) => {
      if (active) { setUsuario(pessoa); setEmpresa(negocio); }
    }).catch((error) => { if (active) setErro(mensagemErroApi(error)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const editar = () => {
    if (!usuario) return;
    setForm({ nome: usuario.nome, email: usuario.email, telefone: usuario.telefone });
    setErroEdicao("");
    setEditando(true);
  };
  const salvar = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!usuario || salvando) return;
    setSalvando(true);
    setErroEdicao("");
    try {
      await api.patch(`/empreendedor/${usuario.id}`, form);
      setUsuario(await buscarSessao());
      setEditando(false);
      setSucesso("Dados do empreendedor atualizados.");
    } catch (error) { setErroEdicao(mensagemErroApi(error)); }
    finally { setSalvando(false); }
  };

  const card = { flex: 1, bgcolor: "#16161d", borderRadius: "12px", p: 3, color: "#fff", gap: 1.5 };

  return (
    <Stack direction="row" sx={{ minHeight: "100vh", bgcolor: "#f9dde0" }}>
      <NavBar />
      <Stack
        sx={{
          flex: 1,
          minWidth: 0,
          p: { xs: 2, md: 5 },
          alignItems: "center",
          gap: 3,
        }}
      >
        <Typography variant="h2">Meu perfil</Typography>
        {loading && <CircularProgress aria-label="Carregando perfil" />}
        {erro && (
          <Alert severity="error">
            {erro}
            <Button onClick={() => window.location.reload()}>
              Tentar novamente
            </Button>
          </Alert>
        )}
        {sucesso && (
          <Alert severity="success" onClose={() => setSucesso("")}>
            {sucesso}
          </Alert>
        )}
        {usuario && (
          <>
            <Avatar sx={{ width: 80, height: 80, bgcolor: "#16161d" }}>
              {usuario.nome.charAt(0).toUpperCase()}
            </Avatar>
            <Stack alignItems="center">
              <Typography variant="h3">
                {empresa?.nome ?? "Sua empresa ainda não foi cadastrada"}
              </Typography>
              <Typography>{usuario.nome}</Typography>
            </Stack>
            <Stack
              direction={{ xs: "column", md: "row" }}
              sx={{ gap: 3, width: "100%", maxWidth: 1000 }}
            >
              <Stack sx={card}>
                <Typography variant="h3" sx={{ fontSize: "1.2rem" }}>
                  Dados do empreendedor
                </Typography>
                <Typography>Nome: {usuario.nome}</Typography>
                <Typography sx={{ overflowWrap: "anywhere" }}>
                  E-mail: {usuario.email}
                </Typography>
                <Typography>Telefone: {usuario.telefone}</Typography>
                <Typography>
                  Cadastro:{" "}
                  {usuario.data_cadastro
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join("/")}
                </Typography>
                <Button variant="contained" onClick={editar}>
                  Editar meus dados
                </Button>
              </Stack>
              <Stack sx={card}>
                <Typography variant="h3" sx={{ fontSize: "1.2rem" }}>
                  Dados da empresa
                </Typography>
                {empresa ? (
                  <>
                    <Typography>Nome: {empresa.nome}</Typography>
                    <Typography>
                      CNPJ: {empresa.cnpj || "Não informado"}
                    </Typography>
                    <Typography>Endereço: {empresa.endereco}</Typography>
                    {empresa.nome_fantasia && (
                      <Typography>
                        Nome fantasia: {empresa.nome_fantasia}
                      </Typography>
                    )}
                    <Typography>Nicho: {empresa.segmento_label}</Typography>
                    <Typography>
                      Porte / enquadramento: {empresa.porte_label}
                    </Typography>
                    <Typography>
                      Funcionários:{" "}
                      {empresa.num_funcionarios ?? "Não informado"}
                    </Typography>
                    <Typography>
                      Fundação:{" "}
                      {empresa.data_fundacao
                        ? empresa.data_fundacao.split("-").reverse().join("/")
                        : "Não informada"}
                    </Typography>
                  </>
                ) : (
                  <Typography>
                    Cadastre seu negócio para personalizar sua experiência no
                    Coroa.
                  </Typography>
                )}
                <Button
                  variant="contained"
                  onClick={() => navigate("/cadastro-empresa")}
                >
                  {empresa ? "Editar empresa" : "Cadastrar empresa"}
                </Button>
              </Stack>
            </Stack>
            <Button
              variant="outlined"
              onClick={() => navigate("/dashboard-redes")}
            >
              Ver minhas redes
            </Button>
          </>
        )}
        <Dialog
          open={editando}
          onClose={() => {
            if (!salvando) setEditando(false);
          }}
          fullWidth
          maxWidth="sm"
          slotProps={{
            paper: { sx: { bgcolor: "#e7d2d3", borderRadius: "20px" } },
          }}
        >
          <Stack component="form" onSubmit={(event) => void salvar(event)}>
            <DialogTitle>Editar meus dados</DialogTitle>
            <DialogContent>
              <Stack sx={{ gap: 2, pt: 1 }}>
                {erroEdicao && <Alert severity="error">{erroEdicao}</Alert>}
                <TextField
                  label="Nome"
                  required
                  value={form.nome}
                  disabled={salvando}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  slotProps={{ htmlInput: { maxLength: 255 } }}
                />
                <TextField
                  label="E-mail"
                  type="email"
                  required
                  value={form.email}
                  disabled={salvando}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  slotProps={{ htmlInput: { maxLength: 255 } }}
                />
                <TextField
                  label="Telefone"
                  required
                  value={form.telefone}
                  disabled={salvando}
                  onChange={(e) =>
                    setForm({ ...form, telefone: e.target.value })
                  }
                  slotProps={{ htmlInput: { maxLength: 20 } }}
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button disabled={salvando} onClick={() => setEditando(false)}>
                Cancelar
              </Button>
              <Button type="submit" variant="contained" disabled={salvando}>
                {salvando ? "Salvando..." : "Salvar"}
              </Button>
            </DialogActions>
          </Stack>
        </Dialog>
      </Stack>
    </Stack>
  );
}
