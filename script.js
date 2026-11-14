
/* =================================
   NOCTURNE | PRODUTOS
================================= */

// Edite esta lista para trocar os produtos,
// preços, categorias e fotografias.

const products = [

  {
    id: 1,
    name: "Anel Serpente de prata",
    category: "Acessórios",
    price: 79.90,
    tag: "MAIS VENDIDO",
    image: "https://images.openai.com/static-rsc-4/LcEf1Uc1NBHvU4Bosf94VpJ7-jIwv-C1BP27TUTyssg_dUdTviMZUcyZGopxdxFxoabbOZZJSz86YrwUBwk2ZJZ9GKHIeyK8ZGIYdT-8JcORUDYrQe0zXZ-m4sGCRNcYEjYNCMARdK0-tphdkO0QobcIJE2o0OU4U-1zUHkp0bKPVX2vsPOlEtiMLo8L1Fg5?purpose=fullsize"
  },

  {
    id: 2,
    name: "Brinco de Cruz",
    category: "Acessórios",
    price: 17.90,
    tag: "NOVO",
    image: "https://i.pinimg.com/736x/ab/b2/fa/abb2fa68e9446d5a4f636999ef373066.jpg"
  },

  {
    id: 3,
    name: "Vestido Midnight",
    category: "Roupas",
    price: 249.90,
    tag: "EDIÇÃO ESPECIAL",
    image: "https://i.pinimg.com/1200x/57/c3/e7/57c3e7602610b3d35ad1ace666a4e50a.jpg"
  },

  {
    id: 4,
    name: "Vela Nocturna",
    category: "Decoração",
    price: 54.90,
    tag: "NOVO",
    image: "https://i.pinimg.com/1200x/9c/ab/23/9cab23629016fea63654e7c020f904d6.jpg"
  },

  {
    id: 5,
    name: "Brincos Eclipse",
    category: "Acessórios",
    price: 64.90,
    tag: "",
    image: "https://i.pinimg.com/1200x/62/fc/ca/62fccadd1c104423e07163e901fd8390.jpg"
  },

  {
    id: 6,
    name: "Corset Victorian",
    category: "Roupas",
    price: 189.90,
    tag: "DESTAQUE",
    image: "https://i.pinimg.com/736x/83/ba/5a/83ba5a45ad3f50c56f4f0b119bb8f139.jpg"
  },

  {
    id: 7,
    name: "Castiçal Antique",
    category: "Decoração",
    price: 89.90,
    tag: "",
    image: "https://i.pinimg.com/736x/d3/d7/69/d3d769a3966615b5696a1f357b92b7ad.jpg"
  },

  {
    id: 8,
    name: "Pulseira Raven de prata",
    category: "Acessórios",
    price: 49.90,
    tag: "",
    image: "https://i.pinimg.com/736x/fb/d7/f0/fbd7f0a37d5d6a8c50b4e507da67fdb2.jpg"
  }

];


// =================================
// CONFIGURAÇÕES INICIAIS
// =================================

let selectedCategory = "Todos";

let cart = [];

const productGrid = document.getElementById("productGrid");

const searchInput = document.getElementById("searchInput");

const resultCount = document.getElementById("resultCount");

const emptyState = document.getElementById("emptyState");


// Formatação de preços em reais.

const money = value => {

  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

};


// =================================
// MOSTRAR PRODUTOS
// =================================

function renderProducts() {

  const term = searchInput.value
    .trim()
    .toLocaleLowerCase("pt-BR");

  const visible = products.filter(product => {

    const matchesCategory =
      selectedCategory === "Todos" ||
      product.category === selectedCategory;

    const matchesSearch =
      product.name.toLocaleLowerCase("pt-BR").includes(term) ||
      product.category.toLocaleLowerCase("pt-BR").includes(term);

    return matchesCategory && matchesSearch;

  });


  productGrid.innerHTML = visible.map(product => `

    <article class="product-card">

      <div class="product-image">

        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >

        ${product.tag
          ? `<span class="product-tag">${product.tag}</span>`
          : ""
        }

        <button
          class="add-button"
          data-add="${product.id}"
        >
          ADICIONAR À SACOLA +
        </button>

      </div>

      <div class="product-info">

        <span class="product-category">
          ${product.category}
        </span>

        <h3>${product.name}</h3>

        <span class="product-price">
          ${money(product.price)}
        </span>

      </div>

    </article>

  `).join("");


  resultCount.textContent =
    `${visible.length} ${
      visible.length === 1
        ? "peça encontrada"
        : "peças encontradas"
    }`;

  emptyState.hidden = visible.length !== 0;

}


// =================================
// CARRINHO DE COMPRAS
// =================================

function renderCart() {

  const cartItems = document.getElementById("cartItems");

  const count = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );


  document.getElementById("cartCount").textContent = count;

  document.getElementById("cartTotal").textContent = money(total);


  if (!cart.length) {

    cartItems.innerHTML = `
      <p class="cart-empty">
        Sua sacola ainda está vazia.
      </p>
    `;

    return;

  }


  cartItems.innerHTML = cart.map(item => `

    <div class="cart-row">

      <img
        src="${item.image}"
        alt=""
      >

      <div>

        <h4>${item.name}</h4>

        <p>
          ${item.quantity} × ${money(item.price)}
        </p>

      </div>

      <button
        class="remove-item"
        data-remove="${item.id}"
      >
        REMOVER
      </button>

    </div>

  `).join("");

}


// ADICIONAR PRODUTOS

productGrid.addEventListener("click", event => {

  const button = event.target.closest("[data-add]");

  if (!button) return;

  const product = products.find(
    item => item.id === Number(button.dataset.add)
  );

  const existing = cart.find(
    item => item.id === product.id
  );


  if (existing) {

    existing.quantity += 1;

  } else {

    cart.push({
      ...product,
      quantity: 1
    });

  }

  renderCart();

  openCart();

});


// REMOVER PRODUTOS

document.getElementById("cartItems").addEventListener("click", event => {

  const button = event.target.closest("[data-remove]");

  if (!button) return;

  cart = cart.filter(
    item => item.id !== Number(button.dataset.remove)
  );

  renderCart();

});


// =================================
// FILTROS DE CATEGORIA
// =================================

document.getElementById("filters").addEventListener("click", event => {

  const button = event.target.closest("[data-filter]");

  if (!button) return;

  selectedCategory = button.dataset.filter;


  document.querySelectorAll(".filter").forEach(filter => {

    filter.classList.toggle(
      "active",
      filter === button
    );

  });

  renderProducts();

});


// =================================
// PESQUISA
// =================================

searchInput.addEventListener("input", renderProducts);


// =================================
// ABRIR E FECHAR CARRINHO
// =================================

const drawer = document.getElementById("cartDrawer");

const overlay = document.getElementById("overlay");


function openCart() {

  drawer.classList.add("open");

  overlay.classList.add("visible");

  drawer.setAttribute("aria-hidden", "false");

}


function closeCart() {

  drawer.classList.remove("open");

  overlay.classList.remove("visible");

  drawer.setAttribute("aria-hidden", "true");

}


document.getElementById("openCart")
  .addEventListener("click", openCart);


document.getElementById("closeCart")
  .addEventListener("click", closeCart);


overlay.addEventListener("click", closeCart);


document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    closeCart();

  }

});


// =================================
// CLIQUE NAS COLEÇÕES
// =================================

document.querySelectorAll(".collection-card").forEach(card => {

  card.addEventListener("click", () => {

    selectedCategory = card.dataset.category;

    document.querySelectorAll(".filter").forEach(filter => {

      filter.classList.toggle(
        "active",
        filter.dataset.filter === selectedCategory
      );

    });

    renderProducts();

    document.getElementById("produtos")
      .scrollIntoView({ behavior: "smooth" });

  });

});


// =================================
// NEWSLETTER DEMONSTRATIVA
// =================================

document.getElementById("newsletterForm")
  .addEventListener("submit", event => {

    event.preventDefault();

    document.getElementById("newsletterMessage").textContent =
      "Inscrição demonstrativa recebida. Configure um serviço de e-mail para receber cadastros reais.";

    event.target.reset();

  });


// =================================
// FINALIZAÇÃO DO PEDIDO
// =================================

document.getElementById("checkoutButton")
  .addEventListener("click", () => {

    alert(
      "Esta é uma loja demonstrativa. Para receber pagamentos, será necessário integrar um sistema de checkout seguro."
    );

  });


// =================================
// MENU PARA CELULARES
// =================================

document.getElementById("menuToggle")
  .addEventListener("click", () => {

    const nav = document.getElementById("mainNav");

    const opened = nav.classList.toggle("open");

    document.getElementById("menuToggle")
      .setAttribute("aria-expanded", String(opened));

  });


document.querySelectorAll(".main-nav a").forEach(link => {

  link.addEventListener("click", () => {

    document.getElementById("mainNav")
      .classList.remove("open");

  });

});


// =================================
// INICIALIZAÇÃO
// =================================

renderProducts();

renderCart();
