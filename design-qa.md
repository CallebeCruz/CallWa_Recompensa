# Design QA — CallWa, céu imersivo

Referência: céu azul em tela cheia fornecido pelo usuário em 30 de setembro de 2026.

Viewport verificado: 390 × 844 px.

## Resultado

- A cena do mundo ocupa toda a área útil do dispositivo, sem card em volta do céu.
- A cena diurna usa um céu azul claro; à noite, a cena fica azul-marinho quase preta, com Lua crescente e nuvens baixas.
- Não há luminárias nem estrelas na abertura.
- A troca simulada cria uma única estrela de luz branca com brilho óptico, em posição aleatória e mantida no estado da sessão.
- O botão Dia/Noite alterna as cenas e torna as estrelas visíveis apenas à noite.
- A área central não contém título, ato, explicações ou cartões: permanece reservada ao céu.
- Duas camadas translúcidas de nuvens fotográficas atravessam o céu lentamente; no modo noturno, elas ficam quase imperceptíveis.
- O fluxo de mensagem continua funcional: abrir mensagens, enviar, criar faísca, simular resposta e criar estrela.
- Navegação, foco visível, anúncio de estado e redução de movimento foram preservados.

Capturas: `/tmp/callwa-home.png`, `/tmp/callwa-night.png` e `/tmp/callwa-exchange.png`.

final result: passed
