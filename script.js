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
let musicaTocando = false;

// ========================================
// CONTROLES DE MÚSICA
// ========================================

const btnMusica = document.getElementById('btnMusica');
const volumeSlider = document.getElementById('volumeSlider');

volumeSlider.addEventListener('change', (e) => {
    musica.volume = e.target.value;
});

btnMusica.addEventListener('click', () => {
    if (musicaTocando) {
        musica.pause();
        btnMusica.textContent = '🔇';
        musicaTocando = false;
    } else {
        musica.play();
        btnMusica.textContent = '🎵';
        musicaTocando = true;
    }
});

// ========================================
// MODO ESCURO
// ========================================

const btnToggleDarkMode = document.getElementById('btnToggleDarkMode');
const savedDarkMode = localStorage.getItem('darkMode');

if (savedDarkMode === 'true') {
    body.classList.add('dark-mode');
    btnToggleDarkMode.textContent = '☀️';
}

btnToggleDarkMode.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    btnToggleDarkMode.textContent = isDarkMode ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDarkMode);
});

// ========================================
// EVENTOS DO BOTÃO CARTA
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
        console.log('Autoplay bloqueado');
    });
    musicaTocando = true;
    btnMusica.textContent = '🎵';

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

        // Confete!
        criarConfete();

        // Ativa o scroll depois de 1.5s
        setTimeout(() => {
            body.classList.add('scroll');
            botaoAbrir.style.pointerEvents = 'none';
        }, 1500);
    }, 900);
}

// ========================================
// CONFETE
// ========================================

function criarConfete() {
    const cores = ['#ff69b4', '#ffd700', '#87ceeb', '#98fb98', '#dda0dd', '#f0e68c'];
    const emojis = ['🎉', '✨', '💗', '🌸', '⭐', '🎊'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confete = document.createElement('div');
            confete.className = 'confete';
            confete.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            confete.style.left = Math.random() * 100 + 'vw';
            confete.style.top = '-20px';
            confete.style.fontSize = (Math.random() * 20 + 15) + 'px';
            confete.style.opacity = Math.random() * 0.5 + 0.5;
            confete.style.transform = `rotate(${Math.random() * 360}deg)`;

            document.body.appendChild(confete);

            setTimeout(() => confete.remove(), 3000);
        }, i * 30);
    }
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
        
        this.classList.add('clicado');
        
        setTimeout(() => {
            this.classList.remove('clicado');
        }, 500);

        mensagemCoracao.textContent = mensagem;
        mensagemCoracao.classList.add('mostrar');

        criarParticulas(this);

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
        
        void efeitoEstrela.offsetWidth;
        
        efeitoEstrela.classList.add('mostrar');

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
        
        setTimeout(() => {
            particula.remove();
        }, 900);
    }
}

// ========================================
// PET FEEDER GAME
// ========================================

class Pet {
    constructor() {
        this.fome = 30;
        this.felicidade = 40;
        this.energia = 100;
        this.updateDisplay();
        
        setInterval(() => this.decreaseStats(), 5000);
    }

    alimentar() {
        if (this.fome < 100) {
            this.fome = Math.min(100, this.fome + 30);
            this.mostrarMensagem('Yum! 😋');
            this.updateDisplay();
        }
    }

    brincar() {
        if (this.energia > 20) {
            this.felicidade = Math.min(100, this.felicidade + 40);
            this.fome = Math.max(0, this.fome - 20);
            this.energia = Math.max(0, this.energia - 30);
            this.mostrarMensagem('Wheee! 🎉');
            this.updateDisplay();
        }
    }

    acariciar() {
        this.felicidade = Math.min(100, this.felicidade + 20);
        this.mostrarMensagem('Purr... 💚');
        this.updateDisplay();
    }

    decreaseStats() {
        if (this.fome > 0) this.fome -= 5;
        if (this.felicidade > 40) this.felicidade -= 3;
        if (this.energia < 100) this.energia += 2;
        this.updateDisplay();
    }

    mostrarMensagem(msg) {
        const bubble = document.createElement('div');
        bubble.textContent = msg;
        bubble.style.position = 'fixed';
        bubble.style.top = '50%';
        bubble.style.left = '50%';
        bubble.style.transform = 'translate(-50%, -50%)';
        bubble.style.background = 'rgba(255, 200, 200, 0.9)';
        bubble.style.padding = '15px 25px';
        bubble.style.borderRadius = '50px';
        bubble.style.fontSize = '18px';
        bubble.style.pointerEvents = 'none';
        bubble.style.zIndex = '999';
        bubble.style.animation = 'flutuar 1s ease-out forwards';
        document.body.appendChild(bubble);
        setTimeout(() => bubble.remove(), 1000);
    }

    updateDisplay() {
        document.getElementById('fomeBar').style.width = (100 - this.fome) + '%';
        document.getElementById('felicidadeBar').style.width = this.felicidade + '%';
        
        const petImg = document.getElementById('petImg');
        if (this.felicidade > 70) {
            petImg.src = 'mascote%20feliz.PNG';
            petImg.alt = 'Mascote feliz';
        } else {
            petImg.src = 'mascote.PNG';
            petImg.alt = 'Mascote';
        }
    }
}

const pet = new Pet();

document.getElementById('btnComida').addEventListener('click', () => pet.alimentar());
document.getElementById('btnBrincar').addEventListener('click', () => pet.brincar());
document.getElementById('btnAcariciar').addEventListener('click', () => pet.acariciar());

document.getElementById('petArea').addEventListener('click', () => pet.acariciar());

// ========================================
// ACESSIBILIDADE
// ========================================

document.addEventListener('keydown', (e) => {
    if (!cartaAberta && (e.key === 'Enter' || e.key === ' ')) {
        if (document.activeElement === botaoAbrir) {
            e.preventDefault();
            abrirCarta();
        }
    }
});