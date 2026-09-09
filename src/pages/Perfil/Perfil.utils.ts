export const formatosFotoPerfil = ["image/jpeg", "image/png", "image/webp"];
export const limiteFotoPerfil = 5 * 1024 * 1024;
export const ajudaFotoPerfil = "JPG, PNG ou WebP, até 5 MB.";

export function formatarTelefone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  const local = digits.slice(2);
  const corte = local.length > 8 ? 5 : 4;
  return `(${digits.slice(0, 2)}) ${local.slice(0, corte)}${local.length > corte ? `-${local.slice(corte)}` : ""}`;
}

export function errosPerfil(form: { nome: string; email: string; telefone: string }) {
  return {
    nome: form.nome.trim().length < 2 ? "Informe um nome com pelo menos 2 caracteres." : "",
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) ? "Informe um e-mail válido." : "",
    telefone: !/^\d{10,11}$/.test(form.telefone.replace(/\D/g, "")) ? "Informe 10 ou 11 números, incluindo o DDD." : "",
  };
}
