function injectFooter() {
    const footerHTML = `
    <footer class="main-footer">
        <div class="footer-container">
            <div class="footer-col">
                <h3>Atendimento</h3>
                <ul>
                    <li><a href="#">Status do Pedido</a></li>
                    <li><a href="#">Trocas e Devoluções</a></li>
                    <li><a href="#">Envio e Entrega</a></li>
                    <li><a href="#">Dúvidas Frequentes</a></li>
                </ul>
            </div>

            <div class="footer-col">
    <h3>Categorias</h3>
    <ul>
        <li><a href="catalogo.html">Coleções</a></li>
        
        <li><a href="catalogo.html?cat=Masculino">Masculino</a></li> 
        <li><a href="catalogo.html?cat=Feminino">Feminino</a></li>
        
        <li><a href="index.html#novidades">Novidades</a></li>
    </ul>
</div>

            <div class="footer-col">
                <h3>UrbanStyle</h3>
                <ul>
                    <li><a href="#">Nossa História</a></li>
                    <li><a href="#">Sustentabilidade</a></li>
                    <li><a href="#">Trabalhe Conosco</a></li>
                    <li><a href="#">Políticas de Privacidade</a></li>
                </ul>
            </div>

            <div class="footer-col">
                <h3>Siga-nos</h3>
                <ul class="social-links">
                    <li><a href="#">Instagram</a></li>
                    <li><a href="#">TikTok</a></li>
                    <li><a href="#">Pinterest</a></li>
                </ul>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; 2026 UrbanStyle. Todos os direitos reservados.</p>
        </div>
    </footer>
    `;

    const placeholder = document.getElementById('footer-placeholder');
    if (placeholder) {
        placeholder.innerHTML = footerHTML;
    }
}

injectFooter();

// Configuração do Favicon Global
function setGlobalFavicon(path) {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = path;
    link.type = 'image/png';
}

// Chama a função apontando para onde seu ícone está
setGlobalFavicon('Assets/img/favicon.png');