// ========================================
// INICIALIZAÇÃO
// ========================================

const carta = document.getElementById('carta');
const botaoAbrir = document.getElementById('botaoAbrir');
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

musica.volume = Number(volumeSlider.value);

volumeSlider.addEventListener('input', (e) => {
    musica.volume = Number(e.target.value);
});

btnMusica.addEventListener('click', async () => {

    if (musicaTocando) {

        musica.pause();

        musicaTocando = false;

        btnMusica.textContent = '🔇';
        btnMusica.title = 'Tocar música';
        btnMusica.setAttribute(
            'aria-label',
            'Tocar música'
        );

        return;
    }

    try {

        await musica.play();

        musicaTocando = true;

        btnMusica.textContent = '🎵';
        btnMusica.title = 'Pausar música';
        btnMusica.setAttribute(
            'aria-label',
            'Pausar música'
        );

    } catch (erro) {

        console.log(
            'Não foi possível iniciar a música.',
            erro
        );

        musicaTocando = false;

        btnMusica.textContent = '🔇';
    }
});


// ========================================
// MODO ESCURO
// ========================================

const btnToggleDarkMode =
    document.getElementById('btnToggleDarkMode');

const savedDarkMode =
    localStorage.getItem('darkMode');

if (savedDarkMode === 'true') {

    body.classList.add('dark-mode');

    btnToggleDarkMode.textContent = '☀️';
}

btnToggleDarkMode.addEventListener('click', () => {

    body.classList.toggle('dark-mode');

    const isDarkMode =
        body.classList.contains('dark-mode');

    btnToggleDarkMode.textContent =
        isDarkMode ? '☀️' : '🌙';

    btnToggleDarkMode.title =
        isDarkMode
            ? 'Desativar modo escuro'
            : 'Ativar modo escuro';

    btnToggleDarkMode.setAttribute(
        'aria-label',
        isDarkMode
            ? 'Desativar modo escuro'
            : 'Ativar modo escuro'
    );

    localStorage.setItem(
        'darkMode',
        String(isDarkMode)
    );
});


// ========================================
// EVENTOS DO BOTÃO CARTA
// ========================================

botaoAbrir.addEventListener(
    'click',
    abrirCarta
);


function abrirCarta() {

    if (cartaAberta || cartaAbrindo) {
        return;
    }

    cartaAbrindo = true;


    // Tenta começar a música
    musica.play()
        .then(() => {

            musicaTocando = true;

            btnMusica.textContent = '🎵';

            btnMusica.title =
                'Pausar música';

            btnMusica.setAttribute(
                'aria-label',
                'Pausar música'
            );

        })
        .catch(() => {

            console.log(
                'Autoplay bloqueado pelo navegador.'
            );

        });


    // Começa a animação
    carta.classList.add('abrindo');


    // Mostra a mensagem
    setTimeout(() => {

        mensagemCarta.setAttribute(
            'aria-hidden',
            'false'
        );

    }, 500);


    // Termina a abertura
    setTimeout(() => {

        carta.classList.remove('abrindo');

        carta.classList.add('aberta');

        cartaAberta = true;
        cartaAbrindo = false;


        // Confete
        criarConfete();


        // Libera o scroll
        setTimeout(() => {

            body.classList.add('scroll');

            botaoAbrir.style.pointerEvents =
                'none';

            botaoAbrir.setAttribute(
                'aria-hidden',
                'true'
            );

        }, 1500);

    }, 900);
}


// ========================================
// CONFETE
// ========================================

function criarConfete() {

    const emojis = [
        '🎉',
        '✨',
        '💗',
        '🌸',
        '⭐',
        '🎊'
    ];

    for (let i = 0; i < 50; i++) {

        setTimeout(() => {

            const confete =
                document.createElement('div');

            confete.className =
                'confete';

            confete.textContent =
                emojis[
                    Math.floor(
                        Math.random() *
                        emojis.length
                    )
                ];

            confete.style.left =
                Math.random() * 100 + 'vw';

            confete.style.top =
                '-20px';

            confete.style.fontSize =
                (Math.random() * 20 + 15) +
                'px';

            confete.style.opacity =
                Math.random() * 0.5 + 0.5;

            confete.style.transform =
                `rotate(${Math.random() * 360}deg)`;


            document.body.appendChild(
                confete
            );


            setTimeout(() => {
                confete.remove();
            }, 3000);

        }, i * 30);
    }
}


// ========================================
// OBSERVER PARA ANIMAR SEÇÕES
// ========================================

const secoes =
    document.querySelectorAll('.secao');

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        'visivel'
                    );

                }

            });

        },
        observerOptions
    );

secoes.forEach(secao => {
    observer.observe(secao);
});


// ========================================
// CORAÇÕES
// ========================================

const coracoes =
    document.querySelectorAll('.coracao');

const mensagemCoracao =
    document.getElementById(
        'mensagemCoracao'
    );

let mensagemCoracaoTimeout;


coracoes.forEach(coracao => {

    coracao.addEventListener(
        'click',
        function () {

            const mensagem =
                this.getAttribute(
                    'data-mensagem'
                );


            this.classList.remove(
                'clicado'
            );

            void this.offsetWidth;

            this.classList.add(
                'clicado'
            );


            mensagemCoracao.textContent =
                mensagem;

            mensagemCoracao.classList.add(
                'mostrar'
            );


            criarParticulas(this);


            clearTimeout(
                mensagemCoracaoTimeout
            );


            mensagemCoracaoTimeout =
                setTimeout(() => {

                    mensagemCoracao.classList.remove(
                        'mostrar'
                    );

                }, 3000);

        }
    );

});


// ========================================
// ESTRELAS
// ========================================

const estrelas =
    document.querySelectorAll('.estrela');

const efeitoEstrela =
    document.getElementById(
        'efeitoEstrela'
    );

let efeitoEstrelaTimeout;


estrelas.forEach(estrela => {

    estrela.addEventListener(
        'click',
        function () {

            const mensagem =
                this.getAttribute(
                    'data-mensagem'
                );


            efeitoEstrela.textContent =
                mensagem;


            efeitoEstrela.classList.remove(
                'mostrar'
            );


            void efeitoEstrela.offsetWidth;


            efeitoEstrela.classList.add(
                'mostrar'
            );


            clearTimeout(
                efeitoEstrelaTimeout
            );


            efeitoEstrelaTimeout =
                setTimeout(() => {

                    efeitoEstrela.classList.remove(
                        'mostrar'
                    );

                }, 2000);

        }
    );

});


// ========================================
// PARTÍCULAS
// ========================================

function criarParticulas(elemento) {

    const rect =
        elemento.getBoundingClientRect();

    const x =
        rect.left + rect.width / 2;

    const y =
        rect.top + rect.height / 2;


    for (let i = 0; i < 8; i++) {

        const particula =
            document.createElement('div');

        particula.className =
            'particula';

        particula.textContent =
            '♡';


        const angulo =
            (i / 8) *
            Math.PI *
            2;

        const distancia =
            80 + Math.random() * 50;


        const moveX =
            Math.cos(angulo) *
            distancia;

        const moveY =
            Math.sin(angulo) *
            distancia;


        particula.style.left =
            `${x}px`;

        particula.style.top =
            `${y}px`;


        particula.style.setProperty(
            '--x',
            `${moveX}px`
        );

        particula.style.setProperty(
            '--y',
            `${moveY}px`
        );


        document.body.appendChild(
            particula
        );


        setTimeout(() => {

            particula.remove();

        }, 900);
    }
}


// ========================================
// PET
// ========================================

class Pet {

    constructor() {

        this.fome = 70;
        this.felicidade = 80;
        this.energia = 100;


        this.updateDisplay();


        setInterval(() => {

            this.decreaseStats();

        }, 5000);
    }


    alimentar() {

        if (this.fome < 100) {

            this.fome =
                Math.min(
                    100,
                    this.fome + 30
                );

            this.felicidade =
                Math.min(
                    100,
                    this.felicidade + 10
                );


            this.mostrarMensagem(
                'Yum! 😋'
            );


            this.updateDisplay();
        }
    }


    brincar() {

        if (this.energia > 20) {

            this.felicidade =
                Math.min(
                    100,
                    this.felicidade + 40
                );


            this.fome =
                Math.max(
                    0,
                    this.fome - 20
                );


            this.energia =
                Math.max(
                    0,
                    this.energia - 30
                );


            this.mostrarMensagem(
                'Wheee! 🎉'
            );


            this.updateDisplay();

        } else {

            this.mostrarMensagem(
                'Estou cansadinho... 😴'
            );
        }
    }


    acariciar() {

        this.felicidade =
            Math.min(
                100,
                this.felicidade + 20
            );


        this.mostrarMensagem(
            'Purr... 💚'
        );


        this.updateDisplay();
    }


    decreaseStats() {

        if (this.fome > 0) {

            this.fome =
                Math.max(
                    0,
                    this.fome - 5
                );
        }


        if (this.felicidade > 40) {

            this.felicidade =
                Math.max(
                    40,
                    this.felicidade - 3
                );
        }


        if (this.energia < 100) {

            this.energia =
                Math.min(
                    100,
                    this.energia + 2
                );
        }


        this.updateDisplay();
    }


    mostrarMensagem(msg) {

        const bubble =
            document.createElement('div');

        bubble.className =
            'pet-mensagem';

        bubble.textContent =
            msg;


        document.body.appendChild(
            bubble
        );


        setTimeout(() => {

            bubble.remove();

        }, 1000);
    }


    updateDisplay() {

        const fomeBar =
            document.getElementById(
                'fomeBar'
            );

        const felicidadeBar =
            document.getElementById(
                'felicidadeBar'
            );

        const petEmoji =
            document.getElementById(
                'petEmoji'
            );

        const petImg =
            document.getElementById(
                'petImg'
            );


        // A barra sobe quando o bichinho é alimentado.
        fomeBar.style.width =
            `${this.fome}%`;

        felicidadeBar.style.width =
            `${this.felicidade}%`;


        // Mascote feliz
        if (this.felicidade > 70) {

            petEmoji.textContent =
                '😻';

            petImg.src =
                'mascote feliz.png';

            petImg.alt =
                'Mascote feliz';


        // Mascote triste
        } else if (this.felicidade < 30) {

            petEmoji.textContent =
                '😿';

            petImg.src =
                'mascote.png';

            petImg.alt =
                'Mascote';


        // Mascote normal
        } else {

            petEmoji.textContent =
                '😸';

            petImg.src =
                'mascote.png';

            petImg.alt =
                'Mascote';
        }
    }
}


// ========================================
// INICIAR PET
// ========================================

const pet = new Pet();


document
    .getElementById('btnComida')
    .addEventListener(
        'click',
        () => pet.alimentar()
    );


document
    .getElementById('btnBrincar')
    .addEventListener(
        'click',
        () => pet.brincar()
    );


document
    .getElementById('btnAcariciar')
    .addEventListener(
        'click',
        () => pet.acariciar()
    );


document
    .getElementById('petArea')
    .addEventListener(
        'click',
        () => pet.acariciar()
    );
