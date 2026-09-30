# Design QA — CallWa, céu imersivo

Referência: céu azul em tela cheia fornecido pelo usuário em 30 de setembro de 2026.

Viewport verificado: 390 × 844 px.

## Resultado

- A cena do mundo ocupa toda a área útil do dispositivo, sem card em volta do céu.
- A cena diurna usa um céu azul claro e a cena noturna mantém o tom vinho do CallWa.
- Não há luminárias nem estrelas na abertura.
- A troca simulada cria uma única estrela em posição aleatória, mantida no estado da sessão.
- O botão Dia/Noite alterna as cenas e torna as estrelas visíveis apenas à noite.
- O fluxo de mensagem continua funcional: abrir mensagens, enviar, criar faísca, simular resposta e criar estrela.
- Navegação, foco visível, anúncio de estado e redução de movimento foram preservados.

Capturas: `/tmp/callwa-home.png`, `/tmp/callwa-night.png` e `/tmp/callwa-exchange.png`.

final result: passed
