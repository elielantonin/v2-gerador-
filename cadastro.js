document.addEventListener("DOMContentLoaded", function () {
    let formulario = document.getElementById("formCadastro");
    let listaProdutos = document.getElementById("listaProdutos");

    let produtos = JSON.parse(localStorage.getItem("produtos")) || {};  // Carregar produtos do localStorage

    function atualizarLista() {
        listaProdutos.innerHTML = "";
        for (let numero in produtos) {
            let produto = produtos[numero];
            let item = document.createElement("li");
            item.innerHTML = `
                ${produto.nome} - R$ ${produto.preco} 
                <button onclick="removerProduto('${numero}')">❌ Remover</button>
            `;
            listaProdutos.appendChild(item);
        }
    }

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        let numero = document.getElementById("numeroProduto").value;
        let nome = document.getElementById("nomeProduto").value;
        let preco = document.getElementById("precoProduto").value;
        let imagemInput = document.getElementById("imagemProduto").files[0];

        if (numero && nome && preco && imagemInput) {
            let reader = new FileReader();
            reader.onload = function (e) {
                let imagemBase64 = e.target.result;

                let novoProduto = { numero, nome, preco, imagem: imagemBase64 };

                // Atualiza localmente antes de enviar ao backend
                produtos[numero] = novoProduto;
                localStorage.setItem("produtos", JSON.stringify(produtos));

                fetch('/produtos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(novoProduto)
                })
                .then(response => response.json())
                .then(data => {
                    alert("Produto cadastrado com sucesso!");
                    atualizarLista();
                    formulario.reset();
                })
                .catch(error => console.error('Erro ao cadastrar produto:', error));
            };
            reader.readAsDataURL(imagemInput);
        } else {
            alert("Preencha todos os campos!");
        }
    });

    window.removerProduto = function (numero) {
        delete produtos[numero];
        localStorage.setItem("produtos", JSON.stringify(produtos));
        atualizarLista();
    };

    atualizarLista();
});
