# CallWa — mundo compartilhado

Protótipo do Ato 1 do sistema de progressão do CallWa, em Next.js 15, React 19 e TypeScript.

## Executar

Requer Node.js 20.9 ou superior e npm. No diretório do projeto:

```sh
npm ci
npm run dev -- --hostname 0.0.0.0 --port 4173
```

Abra a porta 4173 no navegador da máquina onde executou o projeto.

## Validar

```sh
npm run lint
npm run build
```

Encerre o servidor de desenvolvimento antes do build; ambos usam a pasta `.next`.
O build exporta o site estático na pasta `out/`. Sirva essa pasta com um servidor HTTP para validar a versão de produção; `next start` não é usado na exportação estática.

Com o servidor na porta 4173 e Chromium em `/usr/bin/chromium`, execute `node scripts/smoke.mjs` para verificar o fluxo de mensagens, faísca e resposta simulada.
Para testar outro endereço, defina `CALLWA_PREVIEW_URL` antes de executar o teste.

## Publicar na Cloudflare Pages

Conecte este repositório a um projeto **Pages** na Cloudflare com estas opções:

| Opção | Valor |
| --- | --- |
| Branch de produção | `main` |
| Preset | Next.js (Static HTML Export), ou None com os campos abaixo |
| Comando de build | `npm run build` |
| Diretório de saída | `out` |
| Diretório raiz | raiz do repositório |
| Node.js | `22` (variável `NODE_VERSION`) |

Esta demonstração não requer variáveis secretas. Após a primeira publicação, a Cloudflare fornece um endereço HTTPS `pages.dev`; futuros pushes para `main` atualizam o site automaticamente. Não publique pela modalidade Next.js SSR/Workers: esta configuração exporta apenas o frontend estático.

## Escopo atual

- Céu diurno/noturno, estrelas-âncora, mensagens rápidas e progressão do Ato 1.
- Faísca pendente e botão explícito para simular a resposta da outra pessoa.
- Representações conceituais das luminárias, navegação entre Mundo, História e Ajustes.
- Estado em memória: recarregar a página reinicia a demonstração.

Presença, dispositivos e mensagens são simulados. MQTT, autenticação, persistência, os Atos 2–4 e assinatura Premium ainda não estão integrados. Mensagens personalizadas e reencontro têm apenas feedback de demonstração.

Enviar este repositório ao GitHub disponibiliza o código; para acessar o site pela internet é necessário também publicar a aplicação em um serviço de hospedagem.

## Prévia no GitHub Pages

Cada push para `main` também publica uma prévia estática no GitHub Pages. O workflow habilita o serviço no primeiro deploy e a página fica em `https://callebecruz.github.io/CallWa_Recompensa/`.
