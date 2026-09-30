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
npm start -- --port 4173
```

Encerre o servidor de desenvolvimento antes do build; ambos usam a pasta `.next`.

Com o servidor na porta 4173 e Chromium em `/usr/bin/chromium`, execute `node scripts/smoke.mjs` para verificar o fluxo de mensagens, faísca e resposta simulada.

## Escopo atual

- Céu diurno/noturno, estrelas-âncora, mensagens rápidas e progressão do Ato 1.
- Faísca pendente e botão explícito para simular a resposta da outra pessoa.
- Representações conceituais das luminárias, navegação entre Mundo, História e Ajustes.
- Estado em memória: recarregar a página reinicia a demonstração.

Presença, dispositivos e mensagens são simulados. MQTT, autenticação, persistência, os Atos 2–4 e assinatura Premium ainda não estão integrados. Mensagens personalizadas e reencontro têm apenas feedback de demonstração.

Enviar este repositório ao GitHub disponibiliza o código; para acessar o site pela internet é necessário também publicar a aplicação em um serviço de hospedagem.
