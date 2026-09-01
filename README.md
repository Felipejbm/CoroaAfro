# Coroa Afro — Frontend

Frontend do TCC Coroa Afro, desenvolvido com React, TypeScript, Vite e Material UI.

## Instalação em uma nova máquina

Pré-requisitos: Git e Node.js/npm. O backend deve estar configurado e em execução.

```powershell
git clone https://github.com/Felipejbm/CoroaAfro.git
cd CoroaAfro
npm install
Copy-Item .env.example .env.local
npm run dev
```

Abra `http://localhost:5173`. O `.env.example` aponta para o backend local:

```env
VITE_API_URL=http://localhost:8000
```

Em outro ambiente, altere somente o `.env.local`, que é ignorado pelo Git. Nunca coloque senhas, tokens, App Secret ou chaves em variáveis `VITE_*`: elas ficam visíveis no navegador.

## Verificação antes do commit

```powershell
npm run build
npm run lint
git status
```

Não envie `node_modules`, `dist` ou `.env.local`. As rotas privadas dependem do cookie de sessão criado pelo backend, portanto use `localhost` no front e no back durante o desenvolvimento local.
