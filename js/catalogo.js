const catalogGrid = document.getElementById('catalogGrid');
const params = new URLSearchParams(window.location.search);

// Parâmetros iniciais da URL
let urlCat = params.get('cat');
let urlColl = params.get("collection");

function renderCatalog() {
    const selectedGenders = Array.from(document.querySelectorAll('input[name="gender"]:checked')).map(i => i.value);
    const selectedPrices = Array.from(document.querySelectorAll('input[name="price"]:checked')).map(i => i.value);
    const selectedColls = Array.from(document.querySelectorAll('input[name="collection"]:checked')).map(i => i.value);
    const filterDiscount = document.querySelector('input[name="discount"]:checked');

    catalogGrid.innerHTML = "";

    Object.keys(products).forEach(id => {
        const p = products[id];
        const pPrice = parseFloat(p.price.replace('R$', '').replace('.', '').replace(',', '.'));

        // MELHORIA: Verifica se tem a propriedade OU se tem preço antigo
        const hasPromo = p.hasDiscount || p.oldPrice;

        const matchGender = selectedGenders.length === 0 || selectedGenders.includes(p.category);
        const matchColl = selectedColls.length === 0 || selectedColls.includes(p.collection);

        // CORREÇÃO: Agora o filtro de promoção funciona com p.oldPrice
        const matchDiscount = !filterDiscount || hasPromo;

        let matchPrice = selectedPrices.length === 0;
        selectedPrices.forEach(range => {
            const [min, max] = range.split('-').map(Number);
            if (pPrice >= min && pPrice <= max) matchPrice = true;
        });

        if (matchGender && matchPrice && matchColl && matchDiscount) {
            const imgHover = p.images[1] ? p.images[1] : p.images[0];

            // Renderização dinâmica do preço
            const priceHTML = hasPromo
                ? `<span class="current-price-discount">${p.price}</span> <span class="old-price-catalog">${p.oldPrice}</span>`
                : `<span>${p.price}</span>`;

            const discountBadge = hasPromo ? `<div class="discount-tag">-20%</div>` : '';

            catalogGrid.innerHTML += `
                <div class="product-card" onclick="window.location.href='produto.html?id=${id}'">
                    <div class="product-image">
                        ${discountBadge}
                        <img src="${p.images[0]}" class="img-main">
                        <img src="${imgHover}" class="img-hover">
                    </div>
                    <p>${p.name}</p>
                    <div class="product-price-container">${priceHTML}</div>
                </div>`;
        }
    });
}

// Escuta as mudanças nos filtros
document.querySelectorAll('.filters-sidebar input').forEach(input => {
    input.addEventListener('change', renderCatalog);
});

// Sincroniza URL com os Checkboxes (Apenas no carregamento)
if (urlCat) {
    const checkCat = document.querySelector(`input[name="gender"][value="${urlCat}"]`);
    if (checkCat) checkCat.checked = true;
}
if (urlColl) {
    const checkColl = document.querySelector(`input[name="collection"][value="${urlColl}"]`);
    if (checkColl) checkColl.checked = true;
}

// Pega o parâmetro de desconto da URL
let urlDiscount = params.get('discount');

// Se existir "discount=true" na URL, marca o checkbox e filtra
if (urlDiscount === 'true') {
    const checkDiscount = document.querySelector('input[name="discount"]');
    if (checkDiscount) {
        checkDiscount.checked = true;
        // Não precisa chamar renderCatalog() aqui pois ela já é chamada no final do arquivo
    }
}

// Inicializa
renderCatalog();