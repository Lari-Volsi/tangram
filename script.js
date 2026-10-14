const peca = document.querySelectorAll('.tangram-imagem');
const caixa = document.getElementById('tangram-caixa');
const btnEsquerda = document.getElementById('btn-gira-esquerda');
const btnDireita = document.getElementById('btn-gira-direita');
const btnAlternar = document.getElementById('btn-alternar-peca'); // Botão "Mudar cor"

let pecaSelecionada = null;
let offsetX, offsetY, taArrastando = false;
let ponteiroAtivo = null; // pointerId do toque/mouse que está arrastando a peça
const versaoAtual = {};
const angulosPecas = {};

function posicaoAleatoria(peca) {
    const caixaRect = caixa.getBoundingClientRect();
    const pecaWidth = peca.offsetWidth;
    const pecaHeight = peca.offsetHeight;

    // Math.max evita posições negativas caso a peça seja maior que a área
    const randomX = Math.random() * Math.max(0, caixaRect.width - pecaWidth);
    const randomY = Math.random() * Math.max(0, caixaRect.height - pecaHeight);

    peca.style.left = `${randomX}px`;
    peca.style.top = `${randomY}px`;
    peca.style.position = 'absolute';
}

// Seleção visual: só uma peça fica com a classe .selecionada por vez
function selecionarPeca(p) {
    if (pecaSelecionada && pecaSelecionada !== p) {
        pecaSelecionada.classList.remove('selecionada');
    }
    pecaSelecionada = p;
    pecaSelecionada.classList.add('selecionada');
}

// Gira a peça selecionada em 15 graus (sentido: -1 esquerda, +1 direita)
function girarPeca(sentido) {
    if (!pecaSelecionada) return;
    const id = pecaSelecionada.id;
    angulosPecas[id] += 15 * sentido; // Ângulo individual de cada peça
    pecaSelecionada.style.transform = `rotate(${angulosPecas[id]}deg)`;
}

// Alterna a cor da peça selecionada entre as cinco versões de imagem
function mudarCor() {
    if (!pecaSelecionada) return;
    const id = pecaSelecionada.id;
    let versao = versaoAtual[id];
    versao = versao < 5 ? versao + 1 : 1;
    versaoAtual[id] = versao;
    pecaSelecionada.src = `img/${id}-${versao.toString().padStart(2, '0')}.svg`;
}

// Encerra o arraste com segurança (pointerup, pointercancel ou perda de captura)
function finalizarArraste(e) {
    if (!taArrastando || e.pointerId !== ponteiroAtivo) return;
    const p = pecaSelecionada;

    taArrastando = false;
    ponteiroAtivo = null;

    if (p.hasPointerCapture && p.hasPointerCapture(e.pointerId)) {
        try { p.releasePointerCapture(e.pointerId); } catch (erro) { /* captura já liberada */ }
    }
    p.style.cursor = 'grab';
}

// Inicialização única: estado + posição aleatória + eventos de cada peça
function iniciarPecas() {
    peca.forEach(p => {
        const id = p.id;
        versaoAtual[id] = 1;
        angulosPecas[id] = 0; // Inicializa o ângulo de cada peça em 0
        posicaoAleatoria(p);

        // Evita o "arrastar imagem" nativo do navegador, que cancela o ponteiro
        p.addEventListener('dragstart', (e) => e.preventDefault());

        p.addEventListener('pointerdown', (e) => {
            // Ignora um segundo dedo enquanto outra peça já está sendo arrastada
            if (taArrastando) return;
            // Com mouse, só o botão principal arrasta
            if (e.pointerType === 'mouse' && e.button !== 0) return;

            selecionarPeca(e.currentTarget);
            ponteiroAtivo = e.pointerId;

            try {
                pecaSelecionada.setPointerCapture(e.pointerId); // Prende o toque na peça
            } catch (erro) { /* ponteiro já não está ativo */ }

            offsetX = e.clientX - parseFloat(pecaSelecionada.style.left);
            offsetY = e.clientY - parseFloat(pecaSelecionada.style.top);
            taArrastando = true;
            pecaSelecionada.style.cursor = 'grabbing';
        });

        p.addEventListener('lostpointercapture', finalizarArraste);
    });
}

// Só posiciona as peças depois que as imagens carregaram (offsetWidth/Height corretos)
if (document.readyState === 'complete') {
    iniciarPecas();
} else {
    window.addEventListener('load', iniciarPecas, { once: true });
}

btnEsquerda.addEventListener('click', () => girarPeca(-1));
btnDireita.addEventListener('click', () => girarPeca(1));

document.addEventListener('pointermove', (e) => {
    // Só o ponteiro que iniciou o arraste move a peça
    if (pecaSelecionada && taArrastando && e.pointerId === ponteiroAtivo) {
        const caixaRect = caixa.getBoundingClientRect();

        // Calculamos a nova posição livremente baseada no clique
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        // Criamos uma "folga" baseada no tamanho da própria peça
        // Isso permite que as pontas da peça encostem na borda sem travar o movimento
        const folgaX = pecaSelecionada.offsetWidth * 0.5;
        const folgaY = pecaSelecionada.offsetHeight * 0.5;

        // Limites flexíveis: a peça pode "sair" um pouco da borda técnica para compensar o giro
        // O 'overflow: hidden' no CSS vai esconder o que passar da linha amarela
        newX = Math.max(-folgaX, Math.min(newX, caixaRect.width - (folgaX / 2)));
        newY = Math.max(-folgaY, Math.min(newY, caixaRect.height - (folgaY / 2)));

        pecaSelecionada.style.left = `${newX}px`;
        pecaSelecionada.style.top = `${newY}px`;
    }
});

// Fim do arraste ouvido no documento: funciona mesmo se a captura falhar
document.addEventListener('pointerup', finalizarArraste);
document.addEventListener('pointercancel', finalizarArraste);

// Botão "Mudar cor" (funciona com clique e toque)
btnAlternar.addEventListener('click', mudarCor);

// Atalho de teclado: tecla C (maiúscula ou minúscula)
document.addEventListener('keydown', (e) => {
    if (e.key !== 'c' && e.key !== 'C') return;
    if (e.ctrlKey || e.metaKey || e.altKey || e.repeat) return; // Não atrapalha Ctrl+C

    const alvo = e.target;
    const editavel = alvo.isContentEditable ||
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(alvo.tagName);
    if (editavel) return;

    mudarCor();
});
