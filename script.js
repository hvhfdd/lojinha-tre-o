let CartView = document.querySelector(".total");
let CartBTN = document.querySelector("#shop");
CartBTN.addEventListener("change", OpenCart);

function OpenCart() {
    CartView.style.display = CartBTN.checked ? "block" : "none";
}

const Products = [
    { id: 0, name: "Produto 1", preco: 10, quantity: 0, img: "img/produto1.jpg" },
    { id: 1, name: "Produto 2", preco: 15, quantity: 0, img: "img/produto2.jpg" },
    { id: 2, name: "Produto 3", preco: 25, quantity: 0, img: "img/produto3.jpg" },
    { id: 3, name: "Produto 4", preco: 10, quantity: 0, img: "img/produto4.jpg" },
    { id: 4, name: "Produto 5", preco: 15, quantity: 0, img: "img/produto5.jpg" },
    { id: 5, name: "Perfume", preco: 2500, quantity: 0, img: "img/perfume.jpg" }
];

let Create = () => {
    let chooser = document.querySelector(".loja");
    chooser.innerHTML = "";
    Products.map(product => {
        chooser.innerHTML += `
        <div class="produto-compra">
            <img src="${product.img}" class="img-produto" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>R$${product.preco},00</p>
            <button id="${product.id}" class="AddCart">Adicionar ao Carrinho</button>
        </div>`;
    });
};
Create();

let Cart = document.querySelector(".conta");
let Added = [];

let LoadCart = () => {
    Cart.innerHTML = "";
    Added = [];
    Products.map(product => {
        if (product.quantity > 0) {
            Added.push(product.id);
            document.querySelector(".PCart").innerHTML = addzero(Added.length, 2);
            Cart.innerHTML += `
            <div class="produto">
                <h3>${product.name}</h3>
                <p>Quantidade: ${product.quantity}</p>
                <p>Preço: R$${product.preco * product.quantity},00</p>
            </div>`;
        }
    });
};

let AddBtn = document.getElementsByClassName("AddCart");
for (let n = 0; n < AddBtn.length; n++) {
    AddBtn[n].addEventListener("click", function () {
        let id = this.getAttribute("id");
        Products[id].quantity++;
        LoadCart();
    });
}

let CheckCart = () => {
    Cart.innerHTML = `
    <div class="produto">
        <h4>O carrinho está vazio</h4>
    </div>`;
};
CheckCart();

let DeleteCart = document.querySelector("#DeleteCart");
DeleteCart.addEventListener("click", () => {
    Products.map(product => product.quantity = 0);
    Added = [];
    document.querySelector(".PCart").innerHTML = addzero(Added.length, 2);
    CheckCart();
});

let addzero = (n, width, z) => {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

// Enviar carrinho via WhatsApp
let SendWhatsApp = document.querySelector("#SendWhatsApp");
SendWhatsApp.addEventListener("click", () => {
    let message = "Meu pedido:\n";
    Products.map(product => {
        if (product.quantity > 0) {
            message += `${product.name} - Quantidade: ${product.quantity} - Preço: R$${product.preco * product.quantity},00\n`;
        }
    });
    let url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
});
