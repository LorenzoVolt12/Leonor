const carta = document.getElementById("carta");
const botao = document.getElementById("botaoAbrir");
const mensagemCarta = document.getElementById("mensagemCarta");
const musica = document.getElementById("musica");

let abriu = false;

/* ========================= */
/* ABRIR CARTA */
/* ========================= */

botao.addEventListener("click", abrirCarta);

function abrirCarta() {

```
if (abriu) return;

abriu = true;

carta.classList.add("abrindo");

botao.setAttribute("aria-hidden", "true");


/* Começa a música depois do toque */

musica.volume = 0.35;

musica.play().catch(() => {

    console.log(
        "A música não pôde começar automaticamente."
    );

});


/* Mostra a mensagem */

setTimeout(() => {

    mensagemCarta.setAttribute(
        "aria-hidden",
        "false"
    );

    carta.classList.add("aberta");

}, 900);


/* Liberta o scroll depois da abertura */

setTimeout(() => {

    document.body.classList.add("scroll");

}, 1300);
```

}

/* ========================= */
/* CORAÇÕES */
/* ========================= */

const coracoes =
document.querySelectorAll(".coracao");

const mensagemCoracao =
document.getElementById("mensagemCoracao");

coracoes.forEach(coracao => {

```
coracao.addEventListener("click", () => {

    const texto =
        coracao.dataset.mensagem;

    mensagemCoracao.textContent =
        texto;

    mensagemCoracao.classList.remove(
        "mostrar"
    );

    void mensagemCoracao.offsetWidth;

    mensagemCoracao.classList.add(
        "mostrar"
    );


    coracao.classList.add(
        "clicado"
    );


    setTimeout(() => {

        coracao.classList.remove(
            "clicado"
        );

    }, 500);

});
```

});

/* ========================= */
/* ESTRELAS */
/* ========================= */

const estrelas =
document.querySelectorAll(".estrela");

const efeitoEstrela =
document.getElementById("efeitoEstrela");

estrelas.forEach(estrela => {

```
estrela.addEventListener("click", () => {

    const texto =
        estrela.dataset.mensagem;

    efeitoEstrela.textContent =
        texto;

    efeitoEstrela.classList.remove(
        "mostrar"
    );

    void efeitoEstrela.offsetWidth;

    efeitoEstrela.classList.add(
        "mostrar"
    );


    criarParticulas(estrela);

});
```

});

/* ========================= */
/* PARTÍCULAS */
/* ========================= */

function criarParticulas(elemento) {

```
for (let i = 0; i < 8; i++) {

    const particula =
        document.createElement("span");

    particula.classList.add(
        "particula"
    );

    particula.textContent = "✦";


    particula.style.setProperty(
        "--x",
        `${(Math.random() - 0.5) * 180}px`
    );


    particula.style.setProperty(
        "--y",
        `${(Math.random() - 0.5) * 180}px`
    );


    elemento.appendChild(
        particula
    );


    setTimeout(() => {

        particula.remove();

    }, 900);

}
```

}

/* ========================= */
/* ANIMAÇÕES AO DESCER */
/* ========================= */

const elementos =
document.querySelectorAll(".secao");

const observador =
new IntersectionObserver(

```
    (entradas) => {

        entradas.forEach(entrada => {

            if (entrada.isIntersecting) {

                entrada.target.classList.add(
                    "visivel"
                );

            }

        });

    },

    {
        threshold: 0.15
    }

);
```

elementos.forEach(elemento => {

```
observador.observe(elemento);
```

});

