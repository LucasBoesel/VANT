// ================= CONFIGURAÇÃO INICIAL =================
const carousel = document.querySelector('.carousel');
const slides = document.querySelector('.slides');
const productRow = document.getElementById("productRow");

let slidesArray = Array.from(slides.children);
const slideWidth = () => carousel.offsetWidth;
let index = 1;
let autoPlay;
let isDragging = false;
let startX = 0;
let scrollLeft = 0;
let dragged = false;

// ================= RENDERIZAÇÃO DOS PRODUTOS =================
function renderNovidades() {
    productRow.innerHTML = "";

    // 1. Limita aos 8 primeiros produtos
    const keys = Object.keys(products).slice(0, 8);

    keys.forEach(id => {
        const p = products[id];
        const imgHover = p.images[1] ? p.images[1] : p.images[0];

        // Lógica Simplificada (Igual ao seu catálogo)
        const hasPromo = p.hasDiscount || p.oldPrice;

        // Tag pré-definida
        const discountBadge = hasPromo ? `<div class="discount-tag">-20%</div>` : '';

        // Preço dinâmico (Igual ao seu catálogo)
        const priceHTML = hasPromo
            ? `<span class="current-price-discount">${p.price}</span> <span class="old-price-catalog" style="text-decoration: line-through; color: #666; font-size: 13px; margin-left: 5px;">${p.oldPrice}</span>`
            : `<span>${p.price}</span>`;

        productRow.innerHTML += `
            <div class="product-card" data-id="${id}">
                <div class="product-image">
                    ${discountBadge}
                    <img src="${p.images[0]}" class="img-main">
                    <img src="${imgHover}" class="img-hover">
                </div>
                <p>${p.name}</p>
                <div class="product-price-container">${priceHTML}</div>
            </div>
        `;
    });

    // 2. Elemento "Ver Tudo" Minimalista
    productRow.innerHTML += `
        <div class="view-all-wrapper">
            <a href="catalogo.html" class="view-all-link">
                <span class="view-all-text">VER TODA COLEÇÃO</span>
                <span class="view-all-line"></span>
            </a>
        </div>
    `;

    adicionarEventosDeClique();
}

// ================= CLIQUE NOS PRODUTOS =================
function adicionarEventosDeClique() {
    document.querySelectorAll('.product-card').forEach(card => {
        const productId = card.dataset.id;

        card.addEventListener('click', (e) => {
            if (e.button === 0 && !dragged) {
                window.location.href = `produto.html?id=${productId}`;
            }
        });

        card.addEventListener('auxclick', (e) => {
            if (e.button === 1 && !dragged) {
                window.open(`produto.html?id=${productId}`, '_blank');
            }
        });
    });
}

// ================= DRAG (ARRASTAR) PRODUTOS =================
productRow.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    isDragging = true;
    dragged = false;
    productRow.classList.add("dragging");
    startX = e.pageX;
    scrollLeft = productRow.scrollLeft;
});

document.addEventListener("mouseup", (e) => {
    if (isDragging) {
        const moved = Math.abs(e.pageX - startX);
        if (moved > 5) dragged = true;
    }
    isDragging = false;
    productRow.classList.remove("dragging");
});

productRow.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const walk = (e.pageX - startX) * 1.5;
    productRow.scrollLeft = scrollLeft - walk;
});

// ================= LÓGICA DO CARROSSEL =================
const firstClone = slidesArray[0].cloneNode(true);
const lastClone = slidesArray[slidesArray.length - 1].cloneNode(true);
slides.insertBefore(lastClone, slidesArray[0]);
slides.appendChild(firstClone);
const totalSlides = slides.children.length;

function setPosition(animate = true) {
    slides.style.transition = animate ? 'transform 0.6s ease' : 'none';
    slides.style.transform = `translate3d(${-index * slideWidth()}px, 0, 0)`;
}

slides.addEventListener('transitionend', () => {
    if (index === totalSlides - 1) { index = 1; setPosition(false); }
    if (index === 0) { index = totalSlides - 2; setPosition(false); }
});

// 1. Função de Autoplay ajustada para ser limpa e reiniciável
function startAutoplay() {
    stopAutoplay(); // Garante que não existam dois timers rodando juntos
    autoPlay = setInterval(() => {
        index++;
        setPosition();
    }, 5500);
}

// 2. Função para parar o autoplay
function stopAutoplay() {
    clearInterval(autoPlay);
}

// 3. DETECTOR DE VISIBILIDADE: A mágica acontece aqui
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        // Se o usuário saiu da aba, paramos o carrossel na hora
        stopAutoplay();
    } else {
        // Se o usuário voltou, reiniciamos o tempo do zero
        startAutoplay();
    }
});

// ================= INICIALIZAÇÃO =================
renderNovidades();
setPosition(false);
startAutoplay();

window.addEventListener('resize', () => setPosition(false));