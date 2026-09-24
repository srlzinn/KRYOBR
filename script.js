/* ==========================================================================
   ACHADINHOS BR — script.js
   Toda a lógica do site: render de cards, busca, filtros, categorias,
   ordenação, modal, menu mobile e botão "voltar ao topo".
   ========================================================================== */

(function () {
  "use strict";

  const state = {
    query: "",
    category: null,
    sort: "default",
  };

  const els = {
    categoryRow: document.getElementById("categoryRow"),
    featuredGrid: document.getElementById("featuredGrid"),
    productGrid: document.getElementById("productGrid"),
    dealOfDay: document.getElementById("dealOfDay"),
    resultsCount: document.getElementById("resultsCount"),
    filterBar: document.getElementById("filterBar"),
    clearFiltersBtn: document.getElementById("clearFiltersBtn"),
    searchInput: document.getElementById("searchInput"),
    searchInputMobile: document.getElementById("searchInputMobile"),
    statCount: document.getElementById("statCount"),
    backToTopBtn: document.getElementById("backToTopBtn"),
    modal: document.getElementById("productModal"),
    modalBody: document.getElementById("modalBody"),
    modalCloseBtn: document.getElementById("modalCloseBtn"),
    menuToggleBtn: document.getElementById("menuToggleBtn"),
    mobileMenu: document.getElementById("mobileMenu"),
    mobileMenuClose: document.getElementById("mobileMenuClose"),
    searchToggleBtn: document.getElementById("searchToggleBtn"),
    mobileSearchBar: document.getElementById("mobileSearchBar"),
  };

  const currency = (v) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  function starString(rating) {
    const full = Math.round(rating);
    return "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(0, 5 - full);
  }

  function categoryLabel(id) {
    const found = CATEGORIES.find((c) => c.id === id);
    return found ? found.label : id;
  }

  /* ---------------- CARD TEMPLATE ---------------- */
  function productCard(p) {
    return `
      <article class="product-card" data-id="${p.id}">
        <div class="card-media">
          <img src="${p.image}" alt="${p.name}" loading="lazy" />
          <div class="badge-row">
            <span class="badge badge-oferta">OFERTA</span>
            <span class="badge badge-discount">-${p.discount}%</span>
          </div>
        </div>
        <div class="card-body">
          <span class="card-category">${categoryLabel(p.category)}</span>
          <h3 class="card-name">${p.name}</h3>
          <div class="card-rating">
            <span class="stars">${starString(p.rating)}</span>
            <span>${p.rating.toFixed(1)} · ${p.sold}</span>
          </div>
          <p class="card-desc">${p.description}</p>
          <div class="price-row">
            <span class="old-price">De ${currency(p.oldPrice)}</span>
            <div class="price-line">
              <span class="new-price">${currency(p.price)}</span>
              <span class="discount-pill">-${p.discount}%</span>
            </div>
            <span class="price-note">Preço e disponibilidade podem mudar.</span>
          </div>
          <a class="card-cta" href="${p.affiliateLink}" target="_blank" rel="nofollow sponsored noopener" data-stop>VER OFERTA →</a>
        </div>
      </article>`;
  }

  /* ---------------- RENDER: CATEGORIES ---------------- */
  function renderCategories() {
    els.categoryRow.innerHTML = CATEGORIES.map(
      (c) => `
      <button class="category-card${state.category === c.id ? " is-active" : ""}" data-category="${c.id}">
        <span class="emoji">${c.emoji}</span>
        <span class="label">${c.label}</span>
      </button>`
    ).join("");
  }

  /* ---------------- RENDER: FEATURED ---------------- */
  function renderFeatured() {
    const featured = products.filter((p) => p.featured);
    els.featuredGrid.innerHTML = featured.map(productCard).join("");
  }

  /* ---------------- RENDER: DEAL OF THE DAY ---------------- */
  function renderDealOfDay() {
    const featured = products.filter((p) => p.featured);
    if (!featured.length) return;
    const deal = featured.reduce((max, p) => (p.discount > max.discount ? p : max), featured[0]);
    els.dealOfDay.innerHTML = `
      <div class="deal-media">
        <img src="${deal.image}" alt="${deal.name}" loading="lazy" />
      </div>
      <div class="deal-content">
        <span class="deal-tag">🔥 ACHADO DO DIA</span>
        <h3>${deal.name}</h3>
        <div class="card-rating">
          <span class="stars">${starString(deal.rating)}</span>
          <span>${deal.rating.toFixed(1)} · ${deal.sold}</span>
        </div>
        <div class="deal-price-row">
          <span class="old-price">De ${currency(deal.oldPrice)}</span>
          <span class="new-price">${currency(deal.price)}</span>
          <span class="discount-pill">-${deal.discount}%</span>
        </div>
        <a class="btn btn-primary" href="${deal.affiliateLink}" target="_blank" rel="nofollow sponsored noopener">CONFERIR OFERTA</a>
      </div>`;
  }

  /* ---------------- FILTER + SORT ---------------- */
  function getFilteredProducts() {
    let list = products.slice();

    if (state.category) {
      list = list.filter((p) => p.category === state.category);
    }

    if (state.query.trim()) {
      const q = state.query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          categoryLabel(p.category).toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    switch (state.sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "discount":
        list.sort((a, b) => b.discount - a.discount);
        break;
      case "sold":
        list.sort((a, b) => b.reviews - a.reviews);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "recent":
        list.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return list;
  }

  /* ---------------- RENDER: PRODUCT GRID ---------------- */
  function renderProductGrid() {
    const list = getFilteredProducts();

    els.resultsCount.innerHTML = `<strong>${list.length}</strong> produto${list.length === 1 ? "" : "s"} encontrado${list.length === 1 ? "" : "s"}`;

    if (!list.length) {
      els.productGrid.innerHTML = `
        <div class="empty-state">
          <div class="emoji">🔍</div>
          <h3>Nenhum produto encontrado</h3>
          <p>Tente outra busca ou remova alguns filtros.</p>
        </div>`;
      return;
    }

    els.productGrid.innerHTML = list.map(productCard).join("");
  }

  function renderAll() {
    renderCategories();
    renderProductGrid();
    if (els.statCount) els.statCount.textContent = products.length;
  }

  /* ---------------- EVENTS: SEARCH ---------------- */
  function handleSearchInput(value) {
    state.query = value;
    els.searchInput.value = value;
    els.searchInputMobile.value = value;
    renderProductGrid();
  }
  els.searchInput.addEventListener("input", (e) => handleSearchInput(e.target.value));
  els.searchInputMobile.addEventListener("input", (e) => handleSearchInput(e.target.value));

  /* ---------------- EVENTS: CATEGORY CLICK ---------------- */
  els.categoryRow.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-category]");
    if (!btn) return;
    const cat = btn.dataset.category;
    state.category = state.category === cat ? null : cat;
    renderAll();
    document.getElementById("produtos").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* ---------------- EVENTS: SORT / FILTER CHIPS ---------------- */
  els.filterBar.addEventListener("click", (e) => {
    const chip = e.target.closest(".filter-chip");
    if (!chip) return;
    state.sort = chip.dataset.sort;
    document.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("is-active"));
    chip.classList.add("is-active");
    renderProductGrid();
  });

  els.clearFiltersBtn.addEventListener("click", () => {
    state.query = "";
    state.category = null;
    state.sort = "default";
    els.searchInput.value = "";
    els.searchInputMobile.value = "";
    document.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("is-active"));
    document.querySelector('.filter-chip[data-sort="default"]').classList.add("is-active");
    renderAll();
  });

  /* ---------------- PRODUCT MODAL ---------------- */
  function openModal(product) {
    els.modalBody.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div>
        <span class="card-category">${categoryLabel(product.category)}</span>
        <h3>${product.name}</h3>
      </div>
      <div class="card-rating">
        <span class="stars">${starString(product.rating)}</span>
        <span>${product.rating.toFixed(1)} (${product.reviews} avaliações) · ${product.sold}</span>
      </div>
      <p class="card-desc">${product.description}</p>
      <div class="price-row">
        <span class="old-price">De ${currency(product.oldPrice)}</span>
        <div class="price-line">
          <span class="new-price">${currency(product.price)}</span>
          <span class="discount-pill">-${product.discount}%</span>
        </div>
        <span class="price-note">Preço e disponibilidade podem mudar.</span>
      </div>
      <a class="btn btn-primary" style="width:100%" href="${product.affiliateLink}" target="_blank" rel="nofollow sponsored noopener">🔥 VER OFERTA</a>
    `;
    els.modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    els.modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function handleGridClick(e) {
    if (e.target.closest("[data-stop]")) return; // deixa o botão VER OFERTA abrir o link normalmente
    const card = e.target.closest(".product-card");
    if (!card) return;
    const id = Number(card.dataset.id);
    const product = products.find((p) => p.id === id);
    if (product) openModal(product);
  }
  els.featuredGrid.addEventListener("click", handleGridClick);
  els.productGrid.addEventListener("click", handleGridClick);

  els.modalCloseBtn.addEventListener("click", closeModal);
  els.modal.addEventListener("click", (e) => {
    if (e.target === els.modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  /* ---------------- MOBILE MENU ---------------- */
  els.menuToggleBtn.addEventListener("click", () => {
    els.mobileMenu.classList.add("is-open");
    document.body.style.overflow = "hidden";
  });
  els.mobileMenuClose.addEventListener("click", closeMobileMenu);
  function closeMobileMenu() {
    els.mobileMenu.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  els.mobileMenu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", closeMobileMenu)
  );

  /* ---------------- MOBILE SEARCH TOGGLE ---------------- */
  els.searchToggleBtn.addEventListener("click", () => {
    els.mobileSearchBar.classList.toggle("is-open");
    if (els.mobileSearchBar.classList.contains("is-open")) {
      els.searchInputMobile.focus();
    }
  });

  /* ---------------- BACK TO TOP ---------------- */
  window.addEventListener("scroll", () => {
    if (window.scrollY > 480) {
      els.backToTopBtn.classList.add("is-visible");
    } else {
      els.backToTopBtn.classList.remove("is-visible");
    }
  });
  els.backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------------- INIT ---------------- */
  renderFeatured();
  renderDealOfDay();
  renderAll();
})();
