/* ==========================================================
1. INJEÇÃO DE ESTRUTURA (HEADER E SIDEBARS)
========================================================== */

// Injeta o Header simplificado no topo do Body
// No seu arquivo JS, substitua a parte do header por esta:
document.body.insertAdjacentHTML('afterbegin', `
        <header>
            <a href="index.html" class="logo">VANT</a>
            <nav>
                <div class="dropdown">
                    <a class="dropbtn">Coleções</a>
                    <div class="dropdown-content">
                        <a href="catalogo.html?collection=Vibe Tropical">Vibe Tropical</a>
                        <a href="catalogo.html?collection=VANT Essentials">VANT Essentials</a>
                        <a href="catalogo.html?collection=Original VANT">Original VANT</a>
                    </div>
                </div>
                <a href="catalogo.html?cat=Masculino">Masculino</a>
                <a href="catalogo.html?cat=Feminino">Feminino</a>
            </nav>
            <div class="icons">
                <span class="icon lupa-icon"></span>
                <span class="icon heart-icon"></span>
                <span class="icon list-icon"></span>
            </div>
        </header>
    `);

// Inserção do HTML das Sidebars e Overlay de Pesquisa
document.body.insertAdjacentHTML('beforeend', `
        <div id="search-overlay" class="search-bar-overlay">
            <div class="search-bar-container">
                <input type="text" id="main-search-input" placeholder="O que você procura?">
                <span class="close-search" id="close-search">&times;</span>
            </div>
            <div id="search-results-dropdown" class="search-results-dropdown"></div>
        </div>
    
        <div id="wishlist-sidebar" class="sidebar">
            <div class="sidebar-header">
                <h2>Favoritos</h2>
                <span class="close-sidebar" onclick="toggleWishlist()">&times;</span>
            </div>
            <div id="wishlist-items" class="sidebar-content"></div>
        </div>
    
        <div id="cart-sidebar" class="sidebar">
            <div class="sidebar-header">
                <h2>Meu Carrinho</h2>
                <span class="close-sidebar" onclick="toggleCart()">&times;</span>
            </div>
            <div id="cart-items" class="sidebar-content"></div>
            <div class="sidebar-footer">
                <div style="display: flex; justify-content: space-between; margin-bottom: 20px; font-family: 'Inter', sans-serif;">
                    <span style="font-weight: 600; text-transform: uppercase; font-size: 14px; letter-spacing: 0.5px;">Total:</span>
                    <span id="cart-total-value" style="font-weight: 700; font-size: 18px; color: #111;">R$ 0,00</span>
                </div>
                <button class="checkout-btn">Finalizar Compra</button>
            </div>
        </div>
        <div id="sidebar-overlay" class="overlay"></div>
    `);

/* ==========================================================
2. SELEÇÃO DE ELEMENTOS (AGORA ELES EXISTEM!)
========================================================== */
const heartIconHeader = document.querySelector('.heart-icon');
const cartIconHeader = document.querySelector('.list-icon');
const lupaIconHeader = document.querySelector('.lupa-icon');

const wishlistSidebar = document.getElementById('wishlist-sidebar');
const cartSidebar = document.getElementById('cart-sidebar');
const overlay = document.getElementById('sidebar-overlay');
const searchOverlay = document.getElementById('search-overlay');
const searchInput = document.getElementById('main-search-input');
const searchResults = document.getElementById('search-results-dropdown');
const closeSearch = document.getElementById('close-search');

// UTILITÁRIOS
const parsePrice = (priceStr) => parseFloat(priceStr.replace('R$', '').replace('.', '').replace(',', '.'));
const formatPrice = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

/* ==========================================================
3. FUNÇÕES DE INTERFACE (ABRIR/FECHAR)
========================================================== */
function closeNikePopup() {
    const popup = document.querySelector('.mini-cart-popup');
    if (popup) {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 500);
    }
}

function toggleWishlist() {
    closeNikePopup();
    wishlistSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    if (wishlistSidebar.classList.contains('active')) renderWishlist();
}

function toggleCart() {
    closeNikePopup();
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    if (cartSidebar.classList.contains('active')) renderCart();
}

function toggleSearch() {
    closeNikePopup();
    searchOverlay.classList.toggle('active');
    if (searchOverlay.classList.contains('active')) {
        searchInput.focus();
    } else {
        searchInput.value = '';
        searchResults.style.display = 'none';
    }
}

overlay.onclick = () => {
    wishlistSidebar.classList.remove('active');
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
};

// Eventos dos Ícones
if (heartIconHeader) heartIconHeader.addEventListener('click', toggleWishlist);
if (cartIconHeader) cartIconHeader.addEventListener('click', toggleCart);
if (lupaIconHeader) lupaIconHeader.addEventListener('click', toggleSearch);
if (closeSearch) closeSearch.addEventListener('click', toggleSearch);

/* ==========================================================
3. PESQUISA COM OTIMIZAÇÃO (DEBOUNCE)
========================================================== */
let searchTimeout;
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const buscaOriginal = e.target.value.toLowerCase().trim();
            const termosBusca = buscaOriginal.split(" ").filter(t => t !== "");

            if (termosBusca.length === 0) {
                searchResults.style.display = 'none';
                return;
            }

            const encontrados = Object.keys(products).filter(id => {
                const p = products[id];
                const conteudoProduto = `${p.name} ${p.collection || ''} ${p.category} ${p.description}`.toLowerCase();
                return termosBusca.every(termo => conteudoProduto.includes(termo));
            });

            renderSearchResults(encontrados);
        }, 300);
    });
}

function renderSearchResults(ids) {
    searchResults.innerHTML = ids.length > 0 ? '' : '<p style="padding: 20px; color: #777; font-family: Inter;">Nenhum produto encontrado.</p>';
    ids.forEach(id => {
        const p = products[id];
        searchResults.innerHTML += `
                <a href="produto.html?id=${id}" class="search-item">
                    <img src="${p.images[0]}" alt="${p.name}">
                    <div>
                        <p class="search-item-name">${p.name}</p>
                        <p class="search-item-price">${p.price}</p>
                    </div>
                </a>`;
    });
    searchResults.style.display = 'block';
}

/* ==========================================================
4. FAVORITOS (WISHLIST)
========================================================== */
/* ==========================================================
4. FAVORITOS (WISHLIST)
========================================================== */
function renderWishlist() {
    console.log("Renderizando favoritos...");
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const container = document.getElementById('wishlist-items');
    
    if (!container) return;

    container.innerHTML = wishlist.length === 0 ? "<p class='empty-msg'>Sua lista está vazia.</p>" : "";

    wishlist.forEach(wishId => {
        const [idPart, colorPart] = wishId.split('-');
        const item = (typeof products !== 'undefined') ? products[idPart] : null;

        if (item) {
            // --- LÓGICA DE IMAGEM ---
            let displayImage = "";
            if (colorPart && item.variants && item.variants[colorPart]) {
                displayImage = item.variants[colorPart][0];
            } else if (item.images && item.images.length > 0) {
                displayImage = item.images[0];
            } else {
                displayImage = 'Assets/img/placeholder.png'; 
            }

            const displayName = colorPart ? `${item.name} ${colorPart}` : item.name;

            // --- NOVA LÓGICA DE PREÇO (EMPILHADO) ---
            const priceHTML = item.oldPrice 
                ? `<div class="product-price-stack">
                     <p class="product-old-price">${item.oldPrice}</p>
                     <p class="product-price">${item.price}</p>
                   </div>`
                : `<p class="product-price">${item.price}</p>`;

            container.innerHTML += `
                <div class="cart-item-wrapper">
                    <a href="produto.html?id=${idPart}${colorPart ? `&color=${colorPart}` : ''}" class="wishlist-link">
                        <div class="wishlist-item">
                            <img src="${displayImage}" alt="${displayName}" onerror="this.src='Assets/img/logo.png'">
                            <div class="wishlist-info">
                                <p class="product-name">${displayName}</p>
                                ${priceHTML} 
                            </div>
                        </div>
                    </a>
                    <span class="remove-item" onclick="removeFromWishlist('${wishId}')">&times;</span>
                </div>`;
        }
    });
}
window.renderWishlist = renderWishlist;

function removeFromWishlist(wishId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(id => id !== wishId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    renderWishlist();

    // ADICIONE ESSA LINHA ABAIXO:
    // Se a função de checar o status existir na página atual, ela roda
    if (typeof checkWishlistStatus === 'function') {
        checkWishlistStatus();
    }
}
/* ==========================================================
5. CARRINHO (CART)
========================================================== */
/* ==========================================================
5. CARRINHO (CART)
========================================================== */
function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total-value');

    container.innerHTML = cart.length === 0 ? "<p class='empty-msg'>O carrinho está vazio.</p>" : "";

    let totalGeral = 0;

    cart.forEach((item, index) => {
        // 1. Calculamos o valor numérico unitário
        const precoUnitario = parsePrice(item.price);

        // 2. Calculamos o subtotal deste item (Preço x Quantidade)
        const subtotalItem = precoUnitario * item.quantity;

        // 3. Somamos ao total geral do carrinho
        totalGeral += subtotalItem;

        // --- LÓGICA CORRIGIDA PARA O PREÇO ANTIGO ---
        // Se houver preço antigo, calculamos o subtotal dele (Preço Antigo x Quantidade)
        let priceHTML = "";
        if (item.oldPrice) {
            const precoAntigoUnitario = parsePrice(item.oldPrice);
            const subtotalAntigo = precoAntigoUnitario * item.quantity;

            priceHTML = `
                <div class="product-price-stack">
                    <p class="product-old-price">${formatPrice(subtotalAntigo)}</p>
                    <p class="product-price">${formatPrice(subtotalItem)}</p>
                </div>`;
        } else {
            priceHTML = `<p class="product-price">${formatPrice(subtotalItem)}</p>`;
        }
        // --------------------------------------------

        const baseName = products[item.id] ? products[item.id].name : "";
        const colorInName = item.name.replace(baseName, '').trim();
        const colorParam = colorInName ? `&color=${encodeURIComponent(colorInName)}` : '';

        container.innerHTML += `
            <div class="cart-item-wrapper">
                <a href="produto.html?id=${item.id}${colorParam}" class="wishlist-link">
                    <div class="wishlist-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="wishlist-info">
                            <div class="info-top">
                                <p class="product-name">${item.name}</p>
                                <p class="product-size">Tamanho ${item.size}</p>
                            </div>
                            <div class="info-bottom">
                                <div class="quantity-control" onclick="event.preventDefault();">
                                    <button onclick="updateQuantity(${index}, -1)">-</button>
                                    <span>${item.quantity}</span>
                                    <button onclick="updateQuantity(${index}, 1)">+</button>
                                </div>
                                ${priceHTML} 
                            </div>
                        </div>
                    </div>
                </a>
                <span class="remove-item" onclick="removeFromCart(${index})">&times;</span>
            </div>`;
    });

    if (totalContainer) {
        totalContainer.innerText = formatPrice(totalGeral);
    }

    const footer = document.querySelector('.sidebar-footer');
    if (footer) {
        footer.style.display = cart.length === 0 ? "none" : "block";
    }
}

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const newQuantity = cart[index].quantity + change;
    if (newQuantity >= 1) {
        cart[index].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartBadge();
    }
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartBadge();
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItens = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartIcon = document.querySelector('.list-icon');

    if (cartIcon) {
        let badge = cartIcon.querySelector('.cart-count');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'cart-count';
            cartIcon.appendChild(badge);
        }

        if (totalItens > 0) {
            badge.innerText = totalItens;
            badge.classList.add('active');
        } else {
            badge.classList.remove('active');
        }
    }
}

// Inicializa o badge ao carregar a página
updateCartBadge();
// Torna a função global para ser acessada pelo produto.js
window.updateCartBadge = updateCartBadge;