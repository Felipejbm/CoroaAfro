export const iniciaisUsuario = (nome: string) => {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  return partes.length ? (partes[0][0] + (partes.length > 1 ? partes.at(-1)![0] : "")).toUpperCase() : "?";
};
