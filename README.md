# Tangram 

Tangram Start é um projeto interativo desenvolvido para que crianças possam explorar e criar imagens personalizadas usando as peças do tangram. 
Este projeto incentiva o uso do **mouse**, do **teclado** e da **tela sensível ao toque**, ajudando no desenvolvimento das habilidades **motoras** e **cognitivas**. Funciona em computadores e em tablets.

Ele também trabalha ativamente a habilidade da BNCC de Computação: 
* (EF02CO04) Diferenciar componentes físicos (hardware) e programas que fornecem as instruções (software) para o hardware.
* (EF03CO06) Reconhecer que, para um computador realizar tarefas, ele se comunica com o mundo exterior com o uso de interfaces físicas (dispositivos de entrada e saída).

## Recursos
* **👆 Seleção das Peças:** Ao tocar ou clicar em uma peça, ela fica selecionada e ganha uma sombra que acompanha o seu formato.
* **➡️ Movimentação das Peças:** As peças do tangram podem ser arrastadas livremente dentro da área do jogo, com o mouse ou com o dedo.
* **↩️ Rotação das Peças:** Botões de rotação permitem girar a peça selecionada em 15 graus para a esquerda ou direita.
* **🔄 Troca de Cor:** O botão "Mudar cor" (ou a tecla "C" no computador) alterna a cor da peça selecionada entre as opções disponíveis, permitindo personalizar o tangram.
* **Posicionamento Aleatório Inicial:** As peças começam em posições aleatórias para estimular a criatividade e a exploração.

## Como Usar
* **Seleção:** Toque ou clique em uma peça para selecioná-la.
* **Movimentação:** Arraste a peça com o dedo ou com o mouse para movê-la dentro da área do tangram.
* **Rotação:** Com a peça selecionada, use os botões "Girar Esquerda" ou "Girar Direita" para ajustar a orientação.
* **Troca de cor:** Com a peça selecionada, use o botão "Mudar cor" ou pressione a tecla "C" no teclado.

## Para quem mantém o projeto
* **Versão dos arquivos:** o `index.html` carrega `style.css?v=3` e `script.js?v=3`. Sempre que alterar o CSS ou o JavaScript, aumente esse número no `index.html` e também a variável `--versao-css` no `style.css`. Assim os navegadores dos alunos baixam a versão nova em vez de usar uma cópia antiga guardada.
* **Destaque da peça selecionada:** usa um único `filter: drop-shadow()` na classe `.selecionada`, e cada peça tem `padding: 5px` (uma folga transparente). A folga mantém a sombra dentro da área da imagem; sem ela, alguns navegadores de tablet (como o Safari do iPad) deixam rastros ao arrastar a peça. Não remova a folga.
* **Imagens:** cada peça tem cinco versões de cor em `img/` (por exemplo, `A1-01.svg` até `A1-05.svg`).

## Contribuição
Contribuições são bem-vindas! Se você tiver sugestões de melhorias, novos recursos ou encontrar problemas, fique à vontade para abrir um problema ou enviar um pull request.
