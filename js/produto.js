/* ==========================================================================
   CONFIGURAÇÃO E VARIÁVEIS GLOBAIS
   ========================================================================== */
   const params = new URLSearchParams(window.location.search);
   const id = params.get("id") || "1";
   
   const mainImage = document.getElementById("mainImage");
   const productNameH1 = document.getElementById("productName");
   const thumbnailsContainer = document.querySelector(".thumbnails");
   const lightbox = document.getElementById('lightbox');
   const lightboxImg = document.getElementById('lightbox-img');
   const closeBtn = document.querySelector('.close');
   const lightboxNumber = document.getElementById('lightbox-number');
   const leftArrow = document.querySelector('.lightbox-arrow.left');
   const rightArrow = document.querySelector('.lightbox-arrow.right');
   const colorOptionsContainer = document.getElementById("colorOptions");
   const favBtn = document.querySelector('.favorite-square-button');
   
   let currentIndex = 0;
   let images = [];
   let totalImages = 0;
   let isZoomed = false;
   let selectedSize = "P";
   let selectedColor = "";
   
   /* ==========================================================================
      INICIALIZAÇÃO DO PRODUTO
      ========================================================================== */
   if (products[id]) {
       const product = products[id];
   
       // 1. Pega a cor da URL se existir (ex: ?id=1&color=Preta)
       const urlColor = params.get("color");
   
       // Define se o produto tem variantes de cores ou apenas imagens simples
       if (product.variants) {
           // Se a cor da URL for válida, usa ela. Se não, usa a primeira disponível.
           if (urlColor && product.variants[urlColor]) {
               selectedColor = urlColor;
           } else {
               selectedColor = Object.keys(product.variants)[0];
           }
           images = product.variants[selectedColor];
       } else {
           images = product.images || [];
           selectedColor = "";
       }
   
       totalImages = images.length;
   
       // Atualiza Textos da Página e Título H1
       updateProductName(product.name);
   
       if (document.getElementById("productPrice")) {
           const priceContainer = document.getElementById("productPrice");
           // Verifica se há preço antigo ou flag de desconto
           if (product.oldPrice || product.hasDiscount) {
               priceContainer.innerHTML = `
           <span class="current-price-discount">${product.price}</span>
           <span class="old-price">${product.oldPrice}</span>
       `;
           } else {
               // Se não houver desconto, garante que não use classes de cor vermelha
               priceContainer.innerHTML = `<span>${product.price}</span>`;
           }
       }
       if (document.getElementById("productDescription")) {
           document.getElementById("productDescription").innerText = product.description;
       }
   
       // Breadcrumb Dinâmico
       const breadcrumbContainer = document.getElementById("productBreadcrumb");
       if (breadcrumbContainer && product) {
           // Verifica se existe coleção, se não existir, coloca um texto padrão ou vazio
           const collectionName = product.collection || "Lançamentos";
   
           breadcrumbContainer.innerHTML = `
           <a href="index.html">Início</a> / 
           <a href="catalogo.html?cat=${product.category}">${product.category}</a> / 
           <a href="catalogo.html?collection=${encodeURIComponent(collectionName)}">${collectionName}</a> /
           <span class="current-product">${product.name}</span>
       `;
       }
   
       // Breadcrumb e o restante da inicialização...
       renderColorOptions(product);
       renderThumbnails();
       updateImages();
       checkWishlistStatus();
   
       // Faz o destaque visual do tamanho padrão (P) ao carregar
       const allSizeButtons = document.querySelectorAll('.size-options button');
       allSizeButtons.forEach(btn => {
           if (btn.innerText === selectedSize) {
               btn.classList.add('selected');
           }
       });
   }
   
   /* ==========================================================================
      FUNÇÕES DE ATUALIZAÇÃO DE INTERFACE
      ========================================================================== */
   
   function updateProductName(baseName) {
       if (productNameH1) {
           productNameH1.innerText = selectedColor ? `${baseName} ${selectedColor}` : baseName;
       }
   }
   
   function renderColorOptions(product) {
       if (product.variants && colorOptionsContainer) {
           colorOptionsContainer.innerHTML = "";
           Object.keys(product.variants).forEach((colorName) => {
               const btn = document.createElement("button");
               btn.className = "color-btn";
   
               // --- AJUSTE AQUI: Adiciona a classe is-white se a cor for Branca ---
               if (colorName === "Branca") {
                   btn.classList.add("is-white");
               }
               // -----------------------------------------------------------------
   
               btn.style.backgroundColor = getColorHex(colorName);
               btn.title = colorName;
   
               if (colorName === selectedColor) btn.classList.add("active");
   
               btn.onclick = () => {
                   document.querySelectorAll(".color-btn").forEach(b => b.classList.remove("active"));
                   btn.classList.add("active");
   
                   selectedColor = colorName;
                   images = product.variants[colorName];
                   totalImages = images.length;
                   currentIndex = 0;
   
                   updateProductName(product.name);
                   renderThumbnails();
                   updateImages();
                   checkWishlistStatus();
               };
               colorOptionsContainer.appendChild(btn);
           });
       } else {
           const colorSection = document.querySelector(".colors");
           if (colorSection) colorSection.style.display = "none";
       }
   }
   
   function renderThumbnails() {
       if (!thumbnailsContainer) return;
       thumbnailsContainer.innerHTML = "";
       images.forEach((src, i) => {
           const img = document.createElement("img");
           img.src = src;
           if (i === currentIndex) img.classList.add("active");
           img.onclick = () => {
               currentIndex = i;
               updateImages();
           };
           thumbnailsContainer.appendChild(img);
       });
   }
   
   function updateImages() {
       if (images.length > 0) {
           mainImage.src = images[currentIndex];
           lightboxImg.src = images[currentIndex];
           if (lightboxNumber) lightboxNumber.innerText = `${currentIndex + 1} / ${totalImages}`;
   
           document.querySelectorAll(".thumbnails img").forEach((img, i) => {
               img.classList.toggle("active", i === currentIndex);
           });
       }
   }
   
   function getColorHex(colorName) {
       const colors = {
           "Branca": "#FFFFFF",
           "Preta": "#1a1a1a",
           "Off White": "#d6d6d6",
           "Azul": "#61758e",
           "Roxa": "#523361",
       };
       return colors[colorName] || "#ccc";
   }
   
   /* ==========================================================================
      LÓGICA DE FAVORITOS (WISHLIST)
      ========================================================================== */
   
   function checkWishlistStatus() {
       if (!favBtn) return;
       const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
       const wishId = selectedColor ? `${id}-${selectedColor}` : id;
   
       if (wishlist.includes(wishId)) {
           favBtn.classList.add('active');
       } else {
           favBtn.classList.remove('active');
       }
   }
   
   if (favBtn) {
       favBtn.onclick = function () {
           let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
   
           // Monta o ID corretamente (Ex: "1-Preta" ou apenas "1")
           const wishId = selectedColor ? `${id}-${selectedColor}` : id;
   
           if (wishlist.includes(wishId)) {
               // Remove
               wishlist = wishlist.filter(itemId => itemId !== wishId);
               this.classList.remove('active');
           } else {
               // Adiciona
               wishlist.push(wishId);
               this.classList.add('active');
           }
   
           localStorage.setItem('wishlist', JSON.stringify(wishlist));
   
           // CHAMA A ATUALIZAÇÃO DA SIDEBAR
           if (window.renderWishlist) {
               window.renderWishlist();
           }
       };
   }
   
   /* ==========================================================================
      LÓGICA DE COMPRA 
      ========================================================================== */
   
   const buyButton = document.querySelector('.buy-button');
   if (buyButton) {
       buyButton.onclick = () => {
           const product = products[id];
           const dynamicName = selectedColor ? `${product.name} ${selectedColor}` : product.name;
   
           // Objeto unificado para evitar bugs de referência
           const itemData = {
               id: id,
               name: dynamicName,
               price: product.price,
               oldPrice: product.oldPrice || null, // Guardamos o preço antigo se existir
               size: selectedSize,
               image: images[0],
               quantity: 1
           };
   
           let cart = JSON.parse(localStorage.getItem('cart')) || [];
   
           // Usando o índice para facilitar a atualização (Otimizado com findIndex)
           const itemIndex = cart.findIndex(item =>
               item.id === id && item.size === selectedSize && item.name === dynamicName
           );
   
           if (itemIndex > -1) {
               cart[itemIndex].quantity += 1;
           } else {
               cart.push(itemData);
           }
   
           localStorage.setItem('cart', JSON.stringify(cart));
   
           // Feedback Visual
           showMiniCartPopup(itemData.name, itemData.image, itemData.size, itemData.price, itemData.oldPrice);
   
           // Garante que o badge lá no topo atualize
           if (typeof updateCartBadge === 'function') {
               updateCartBadge();
           }
       };
   }
   
   function showMiniCartPopup(name, image, size, price, oldPrice) {
       const existingPopup = document.querySelector('.mini-cart-popup');
       if (existingPopup) existingPopup.remove();
   
       // Lógica de Preço para o Pop-up
       const priceHTML = oldPrice 
           ? `<div class="product-price-stack">
                <p class="product-old-price" style="margin:0; font-size:14px;">${oldPrice}</p>
                <p class="p-price" style="margin:0;">${price}</p>
              </div>`
           : `<p class="p-price">${price}</p>`;
   
       const popup = document.createElement('div');
       popup.className = 'mini-cart-popup';
       popup.innerHTML = `
               <div class="popup-header"><span>✓ Adicionado ao Carrinho</span><span class="close-popup">&times;</span></div>
               <div class="popup-body">
                   <img src="${image}" alt="${name}">
                   <div class="popup-info">
                       <p class="p-name">${name}</p>
                       <p class="p-size">Tamanho: ${size}</p>
                       ${priceHTML}
                   </div>
               </div>
               <button class="view-cart-btn" onclick="toggleCart(); this.parentElement.classList.remove('show');">FINALIZAR COMPRA</button>
          `;
       document.body.appendChild(popup);
   
       setTimeout(() => popup.classList.add('show'), 10);
       popup.querySelector('.close-popup').onclick = () => popup.classList.remove('show');
   
       setTimeout(() => {
           if (popup.parentNode && popup.classList.contains('show')) {
               popup.classList.remove('show');
           }
       }, 4000);
   }
   
   /* ==========================================================================
      LIGHTBOX E SELEÇÃO DE TAMANHO
      ========================================================================== */
   
   // Seleção de Tamanho
   const sizeButtons = document.querySelectorAll('.size-options button');
   sizeButtons.forEach(button => {
       button.addEventListener('click', () => {
           sizeButtons.forEach(btn => btn.classList.remove('selected'));
           button.classList.add('selected');
           selectedSize = button.innerText;
       });
   });
   
   // Navegação Lightbox
   if (mainImage) {
       mainImage.onclick = () => {
           lightbox.style.display = "flex";
           updateImages();
       };
   }
   
   if (closeBtn) {
       closeBtn.onclick = () => {
           lightbox.style.display = "none";
       };
   }
   
   if (leftArrow) {
       leftArrow.onclick = () => {
           currentIndex = (currentIndex - 1 + totalImages) % totalImages;
           updateImages();
       };
   }
   
   if (rightArrow) {
       rightArrow.onclick = () => {
           currentIndex = (currentIndex + 1) % totalImages;
           updateImages();
       };
   }
   
   // Zoom no Lightbox
   if (lightboxImg) {
       lightboxImg.onclick = (e) => {
           if (!isZoomed) {
               const rect = lightboxImg.getBoundingClientRect();
               const x = ((e.clientX - rect.left) / rect.width) * 100;
               const y = ((e.clientY - rect.top) / rect.height) * 100;
               lightboxImg.style.transformOrigin = `${x}% ${y}%`;
               lightboxImg.style.transform = "scale(2.5)";
               lightboxImg.style.cursor = "zoom-out";
               isZoomed = true;
           } else {
               lightboxImg.style.transform = "scale(1)";
               lightboxImg.style.cursor = "zoom-in";
               isZoomed = false;
           }
       };
   }
   
   /* ==========================================================================
   ATALHOS DE TECLADO (ESC, SETAS E A/D)
   ========================================================================== */
   window.addEventListener('keydown', (e) => {
       // Só executa se o Lightbox estiver aberto
       if (lightbox.style.display === "flex") {
   
           // Fechar com ESC
           if (e.key === "Escape") {
               lightbox.style.display = "none";
               // Reseta o zoom se fechar
               if (isZoomed) {
                   lightboxImg.style.transform = "scale(1)";
                   isZoomed = false;
               }
           }
   
           // Próxima foto (Seta Direita ou tecla D)
           if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
               currentIndex = (currentIndex + 1) % totalImages;
               updateImages();
           }
   
           // Foto anterior (Seta Esquerda ou tecla A)
           if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
               currentIndex = (currentIndex - 1 + totalImages) % totalImages;
               updateImages();
           }
       }
   });