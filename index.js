document.addEventListener("DOMContentLoaded", function () {
    let catalogo = document.querySelector(".catalogo");

    function carregarProdutos() {
        fetch('/produtos')
            .then(response => response.json())
            .then(produtos => {
                catalogo.innerHTML = "";
                produtos.forEach(produto => {
                    let produtoHTML = `
                        <div class="produto">
                            <img src="${produto.imagem}" alt="${produto.nome}">
                            <h2>${produto.nome}</h2>
                            <span>R$ ${produto.preco}</span>
                            <button onclick="enviarWhatsApp('${produto.nome}', '${produto.preco}', '${produto.imagem}')">
                                <img src="whatsapp-icon.png" alt="WhatsApp"> Pedir pelo WhatsApp
                            </button>
                        </div>
                    `;
                    catalogo.innerHTML += produtoHTML;
                });
            })
            .catch(error => console.error("Erro ao carregar produtos:", error));
    }

    carregarProdutos();
});
