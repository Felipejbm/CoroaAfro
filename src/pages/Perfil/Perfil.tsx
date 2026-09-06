import {
  Alert,
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import NavBar from "../../components/NavBar/NavBar";
import { fonts } from "../../styles/theme";
import { usePerfil } from "./Perfil.hook";
import { ajudaFotoPerfil, formatosFotoPerfil } from "./Perfil.utils";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";

export default function Perfil() {
  const {
    navigate,
    usuario,
    empresa,
    loading,
    erro,
    editando,
    setEditando,
    salvando,
    erroEdicao,
    sucesso,
    setSucesso,
    form,
    setForm,
    editar,
    salvar,
    fotoAtual,
    editandoFoto,
    previaFoto,
    arquivoFoto,
    erroFoto,
    erroCarregarFoto,
    salvandoFoto,
    seletorFoto,
    abrirFoto,
    fecharFoto,
    selecionarFoto,
    salvarFoto,
    escolherArquivoFoto,
  } = usePerfil();

  const theme = useTheme();
  const card = {
    flex: 1,
    bgcolor: theme.palette.secondary.light,
    border: `1px solid ${alpha(theme.palette.primary.dark, 0.1)}`,
    borderRadius: 3,
    p: 3,
    color: theme.palette.text.primary,
    gap: 1.5,
    boxShadow: `0 10px 24px ${alpha(theme.palette.primary.dark, 0.08)}`,
  };

  return (
    <Stack direction="row" sx={{ minHeight: "100vh", bgcolor: theme.palette.secondary.light }}>
      <NavBar />
      <Stack
        sx={{
          flex: 1,
          minWidth: 0,
          p: { xs: 2.5, md: 4, lg: 5 },
          alignItems: "stretch",
          gap: 3,
        }}
      >
        <Stack
          sx={{
            p: { xs: 2.5, md: 3.5 },
            borderRadius: 4,
            color: "secondary.light",
            background: `linear-gradient(125deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            boxShadow: `0 16px 34px ${alpha(theme.palette.primary.dark, 0.2)}`,
          }}
        >
          <Typography variant="h2" sx={{ fontFamily: fonts.hero, fontSize: { xs: "2rem", md: "2.6rem" } }}>
            Meu perfil
          </Typography>
          <Typography sx={{ color: alpha(theme.palette.secondary.light, 0.78) }}>
            Gerencie seus dados e as informações do seu negócio.
          </Typography>
        </Stack>
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
            <Stack direction={{ xs: "column", sm: "row" }} alignItems="center" gap={2}>
            <Avatar src={fotoAtual || undefined} alt={`Foto de ${usuario.nome}`} sx={{ width: 80, height: 80, bgcolor: theme.palette.primary.main }}>
              {usuario.nome.charAt(0).toUpperCase()}
            </Avatar>
            <Stack alignItems="center">
              <Typography variant="h3" sx={{ fontFamily: fonts.heading, color: theme.palette.primary.dark }}>
                {empresa?.nome ?? "Sua empresa ainda não foi cadastrada"}
              </Typography>
              <Typography color="text.secondary">{usuario.nome}</Typography>
              <Button startIcon={<PhotoCameraOutlinedIcon />} onClick={abrirFoto}>
                {usuario.foto_perfil_url ? "Alterar foto" : "Adicionar foto"}
              </Button>
            </Stack>
            </Stack>
            {erroCarregarFoto && <Alert severity="warning">{erroCarregarFoto}</Alert>}
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
          open={editandoFoto}
          onClose={fecharFoto}
          fullWidth
          maxWidth="xs"
          aria-labelledby="titulo-foto-perfil"
        >
          <DialogTitle id="titulo-foto-perfil">Foto de perfil</DialogTitle>
          <DialogContent>
            <Stack alignItems="center" gap={2} sx={{ pt: 1 }}>
              {erroFoto && <Alert severity="error" sx={{ width: "100%" }}>{erroFoto}</Alert>}
              <Avatar
                src={previaFoto || fotoAtual || undefined}
                alt="Prévia da foto de perfil"
                sx={{ width: 180, height: 180, bgcolor: theme.palette.primary.main, fontSize: "3rem" }}
              >
                {usuario?.nome.charAt(0).toUpperCase()}
              </Avatar>
              <input
                ref={seletorFoto}
                type="file"
                accept={formatosFotoPerfil.join(",")}
                onChange={selecionarFoto}
                disabled={salvandoFoto}
                hidden
                aria-label="Escolher foto de perfil"
              />
              <Button variant="outlined" startIcon={<PhotoCameraOutlinedIcon />} onClick={escolherArquivoFoto} disabled={salvandoFoto}>
                {arquivoFoto ? "Escolher outra foto" : "Escolher imagem"}
              </Button>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                {ajudaFotoPerfil} A foto será atualizada ao salvar.
              </Typography>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={fecharFoto} disabled={salvandoFoto}>Cancelar</Button>
            <Button
              variant="contained"
              onClick={() => void salvarFoto()}
              disabled={!arquivoFoto || salvandoFoto}
              startIcon={salvandoFoto ? <CircularProgress size={16} color="inherit" /> : undefined}
            >
              {salvandoFoto ? "Salvando..." : "Salvar foto"}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={editando}
          onClose={() => {
            if (!salvando) setEditando(false);
          }}
          fullWidth
          maxWidth="sm"
          slotProps={{
            paper: { sx: { bgcolor: theme.palette.secondary.main, borderRadius: "20px" } },
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
