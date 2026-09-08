// ========================================
// INICIALIZAÇÃO
// ========================================

const carta = document.getElementById('carta');
const botaoAbrir = document.getElementById('botaoAbrir');
const envelope = document.getElementById('envelope');
const mensagemCarta = document.getElementById('mensagemCarta');
const body = document.body;
const musica = document.getElementById('musica');

let cartaAberta = false;
let cartaAbrindo = false;

// ========================================
// EVENTOS DO BOTÃO
// ========================================

botaoAbrir.addEventListener('click', abrirCarta);
botaoAbrir.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        abrirCarta();
    }
});

function abrirCarta() {
    if (cartaAberta || cartaAbrindo) return;

    cartaAbrindo = true;

    // Toca a música
    musica.play().catch(() => {
        console.log('Autoplay bloqueado - usuário precisa interagir primeiro');
    });

    // Adiciona classe de abertura
    carta.classList.add('abrindo');

    // Mostra a mensagem da carta
    setTimeout(() => {
        mensagemCarta.setAttribute('aria-hidden', 'false');
    }, 500);

    // Finaliza a abertura
    setTimeout(() => {
        carta.classList.remove('abrindo');
        carta.classList.add('aberta');
        cartaAberta = true;
        cartaAbrindo = false;

        // Ativa o scroll depois de 1.5s
        setTimeout(() => {
            body.classList.add('scroll');
            botaoAbrir.style.pointerEvents = 'none';
        }, 1500);
    }, 900);
}

// ========================================
// OBSERVER PARA ANIMAR SEÇÕES
// ========================================

const secoes = document.querySelectorAll('.secao');

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
        }
    });
}, observerOptions);

secoes.forEach(secao => {
    observer.observe(secao);
});

// ========================================
// CORAÇÕES - MENSAGENS OCULTAS
// ========================================

const coracoes = document.querySelectorAll('.coracao');
const mensagemCoracao = document.getElementById('mensagemCoracao');

coracoes.forEach(coracao => {
    coracao.addEventListener('click', function() {
        const mensagem = this.getAttribute('data-mensagem');
        
        // Adiciona animação
        this.classList.add('clicado');
        
        // Remove a classe depois da animação
        setTimeout(() => {
            this.classList.remove('clicado');
        }, 500);

        // Mostra a mensagem
        mensagemCoracao.textContent = mensagem;
        mensagemCoracao.classList.add('mostrar');

        // Cria partículas de corações
        criarParticulas(this);

        // Esconde a mensagem depois de 3s
        setTimeout(() => {
            mensagemCoracao.classList.remove('mostrar');
        }, 3000);
    });
});

// ========================================
// ESTRELAS - MENSAGENS OCULTAS
// ========================================

const estrelas = document.querySelectorAll('.estrela');
const efeitoEstrela = document.getElementById('efeitoEstrela');

estrelas.forEach(estrela => {
    estrela.addEventListener('click', function() {
        const mensagem = this.getAttribute('data-mensagem');
        
        efeitoEstrela.textContent = mensagem;
        efeitoEstrela.classList.remove('mostrar');
        
        // Força o reflow para resetar a animação
        void efeitoEstrela.offsetWidth;
        
        efeitoEstrela.classList.add('mostrar');

        // Remove após 2s
        setTimeout(() => {
            efeitoEstrela.classList.remove('mostrar');
        }, 2000);
    });
});

// ========================================
// PARTÍCULAS
// ========================================

function criarParticulas(elemento) {
    const rect = elemento.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    for (let i = 0; i < 8; i++) {
        const particula = document.createElement('div');
        particula.className = 'particula';
        particula.textContent = '♡';
        
        // Posição aleatória
        const angulo = (i / 8) * Math.PI * 2;
        const distancia = 80 + Math.random() * 50;
        const moveX = Math.cos(angulo) * distancia;
        const moveY = Math.sin(angulo) * distancia;
        
        particula.style.left = x + 'px';
        particula.style.top = y + 'px';
        particula.style.setProperty('--x', moveX + 'px');
        particula.style.setProperty('--y', moveY + 'px');
        particula.style.color = '#b7838c';
        
        document.body.appendChild(particula);
        
        // Remove depois da animação
        setTimeout(() => {
            particula.remove();
        }, 900);
    }
}

// ========================================
// ACESSIBILIDADE
// ========================================

// Permite abrir com Enter/Space
document.addEventListener('keydown', (e) => {
    if (!cartaAberta && (e.key === 'Enter' || e.key === ' ')) {
        if (document.activeElement === botaoAbrir) {
            e.preventDefault();
            abrirCarta();
        }
    }
});
