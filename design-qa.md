# Design QA — CallWa, céu imersivo

Referência: céu azul em tela cheia fornecido pelo usuário em 30 de setembro de 2026.

Viewport verificado: 390 × 844 px.

## Resultado

- A cena do mundo ocupa toda a área útil do dispositivo, sem card em volta do céu.
- A cena diurna usa um céu azul claro e limpo, com nuvens baixas; à noite, a cena fica azul-marinho quase preta, também com nuvens baixas.
- O Sol não faz parte do fundo: é um elemento independente, menor e suave, flutua de leve e pode ter o brilho alterado ao toque.
- A Lua não faz parte do fundo: é um elemento independente em escala discreta, flutua de leve e pode ter o brilho alterado ao toque.
- Não há luminárias nem estrelas na abertura.
- A troca simulada cria uma única estrela de luz branca com brilho óptico, em posição aleatória e mantida no estado da sessão.
- O botão Dia/Noite alterna as cenas e torna as estrelas visíveis apenas à noite.
- A área central não contém título, ato, explicações ou cartões: permanece reservada ao céu.
- Duas camadas translúcidas de nuvens fotográficas atravessam o céu lentamente; no modo noturno, elas ficam quase imperceptíveis.
- O céu recebe deriva de câmera e respiração de luz discretas; Sol e Lua flutuam e uma estrela cadente aparece ocasionalmente à noite.
- O controle de progresso navega pelos quatro atos sem mudar de tela: Céu, Terra/semente, Jardim e Vagalumes.
- No protótipo, trocas completas também liberam o próximo ato automaticamente aos 3, 6 e 10 retornos; esses limiares são demonstrativos até a configuração de balanceamento do backend entrar.
- A mudança de ato usa uma transição breve de câmera/luz. A Terra mantém o céu como fundo, a árvore nasce sem raízes expostas e os vagalumes ficam acima do jardim.
- O fluxo de mensagem continua funcional: abrir mensagens, enviar, criar faísca, simular resposta e criar estrela.
- Navegação, foco visível, anúncio de estado e redução de movimento foram preservados.

Capturas: `/tmp/callwa-home.png`, `/tmp/callwa-earth.png`, `/tmp/callwa-tree.png`, `/tmp/callwa-fireflies.png`, `/tmp/callwa-night.png` e `/tmp/callwa-exchange.png`.

final result: passed
