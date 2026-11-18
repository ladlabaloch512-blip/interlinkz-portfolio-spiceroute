// Spice Route Kitchen store logic: cart, rendering, filters, forms, FAQ.
// One single delegated click listener handles every add-to-cart button on the
// site, guarded so it can only ever be bound once. Re-rendering grids never
// rebinds it, so one click always adds exactly one item.
(function () {
  "use strict";

  var CART_KEY = "srk_cart_v1";
  var DELIVERY_FLAT = 250;
  var FREE_ABOVE = 5000;

  function loadCart() {
    try {
      var raw = localStorage.getItem(CART_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) { return []; }
  }
  function saveCart(cart) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
  }
  function cartCount(cart) {
    return cart.reduce(function (sum, line) { return sum + line.qty; }, 0);
  }
  function cartSubtotal(cart) {
    return cart.reduce(function (sum, line) { return sum + line.price * line.qty; }, 0);
  }
  function deliveryFor(subtotal) {
    if (subtotal <= 0) return 0;
    return subtotal > FREE_ABOVE ? 0 : DELIVERY_FLAT;
  }

  function updateCartBadge() {
    var cart = loadCart();
    var n = cartCount(cart);
    var badges = document.querySelectorAll("[data-cart-count]");
    badges.forEach(function (b) { b.textContent = n; });
  }

  var toastTimer = null;
  function showToast(msg) {
    var toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      toast.setAttribute("role", "status");
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2200);
  }

  function addToCart(productId, weightLabel, qty) {
    var p = productById(productId);
    if (!p) return;
    var w = null;
    for (var i = 0; i < p.weights.length; i++) { if (p.weights[i].label === weightLabel) w = p.weights[i]; }
    if (!w) w = p.weights[0];
    qty = Math.max(1, parseInt(qty, 10) || 1);
    var cart = loadCart();
    var found = null;
    cart.forEach(function (line) {
      if (line.id === p.id && line.weight === w.label) found = line;
    });
    if (found) { found.qty += qty; } else {
      cart.push({ id: p.id, name: p.name, weight: w.label, price: w.price, img: p.img, qty: qty });
    }
    saveCart(cart);
    updateCartBadge();
    showToast(p.name + " (" + w.label + ") added to cart");
    var cartPage = document.querySelector("[data-cart-page]");
    if (cartPage) renderCartPage();
    var checkoutPage = document.querySelector("[data-checkout-page]");
    if (checkoutPage) renderCheckoutSummary();
  }

  // ---------- Product cards ----------
  function cardHTML(p) {
    var options = p.weights.map(function (w) {
      return '<option value="' + w.label + '" data-price="' + w.price + '">' + w.label + " - " + formatRs(w.price) + "</option>";
    }).join("");
    return '<article class="card">' +
      '<a class="card-img" href="product.html?id=' + p.id + '"><img src="' + p.img + '" alt="' + p.name + '" loading="lazy"></a>' +
      '<div class="card-body">' +
      '<h3><a href="product.html?id=' + p.id + '">' + p.name + "</a></h3>" +
      '<p class="card-line">' + p.short + "</p>" +
      '<label class="card-weight"><span class="sr-only">Weight for ' + p.name + '</span>' +
      '<select data-weight-select="' + p.id + '">' + options + "</select></label>" +
      '<div class="card-row"><span class="price" data-card-price="' + p.id + '">' + formatRs(p.weights[0].price) + "</span>" +
      '<button type="button" class="btn btn-green btn-small" data-add="' + p.id + '">Add to Cart</button></div>' +
      "</div></article>";
  }

  function renderGrid(el, list) {
    if (!el) return;
    el.innerHTML = list.length ? list.map(cardHTML).join("") :
      '<p class="empty-note">No products in this category yet.</p>';
  }

  // ---------- Home ----------
  function initHome() {
    var grid = document.querySelector("[data-best-grid]");
    if (grid) renderGrid(grid, PRODUCTS.filter(function (p) { return p.bestseller; }));
  }

  function initDry() {
    var grid = document.querySelector("[data-dry-grid]");
    if (grid) renderGrid(grid, PRODUCTS.filter(function (p) { return p.category === "Dry Fruits and Nuts"; }));
  }

  // ---------- Shop ----------
  var shopState = { category: "All", sort: "featured" };
  function shopList() {
    var list = PRODUCTS.filter(function (p) { return p.category !== "Gift Boxes"; });
    if (shopState.category !== "All") {
      list = list.filter(function (p) { return p.category === shopState.category; });
    }
    if (shopState.sort === "price-low") list = list.slice().sort(function (a, b) { return a.weights[0].price - b.weights[0].price; });
    if (shopState.sort === "price-high") list = list.slice().sort(function (a, b) { return b.weights[0].price - a.weights[0].price; });
    if (shopState.sort === "name") list = list.slice().sort(function (a, b) { return a.name.localeCompare(b.name); });
    return list;
  }
  function renderShop() {
    var grid = document.querySelector("[data-shop-grid]");
    if (!grid) return;
    var list = shopList();
    renderGrid(grid, list);
    var count = document.querySelector("[data-shop-count]");
    if (count) count.textContent = "Showing " + list.length + " of 14 products";
    document.querySelectorAll("[data-filter]").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-filter") === shopState.category);
    });
    var select = document.querySelector("[data-filter-select]");
    if (select) select.value = shopState.category;
  }
  function initShop() {
    var grid = document.querySelector("[data-shop-grid]");
    if (!grid) return;
    var params = new URLSearchParams(window.location.search);
    var cat = params.get("cat");
    var valid = ["All", "Whole Spices", "Ground Spices", "Spice Blends", "Dry Fruits and Nuts", "Pantry"];
    if (cat && valid.indexOf(cat) >= 0) shopState.category = cat;
    renderShop();
  }

  // ---------- Product page ----------
  function initProduct() {
    var root = document.querySelector("[data-product-page]");
    if (!root) return;
    var params = new URLSearchParams(window.location.search);
    var p = productById(params.get("id")) || PRODUCTS[0];
    document.title = p.name + " - Spice Route Kitchen";
    root.querySelector("[data-p-img]").src = p.img;
    root.querySelector("[data-p-img]").alt = p.name;
    root.querySelector("[data-p-cat]").textContent = p.category;
    root.querySelector("[data-p-name]").textContent = p.name;
    root.querySelector("[data-p-long]").textContent = p.long;
    root.querySelector("[data-p-storage]").textContent = p.storage;
    var priceEl = root.querySelector("[data-p-price]");
    var weightWrap = root.querySelector("[data-p-weights]");
    var selected = p.weights[0];
    function drawWeights() {
      weightWrap.innerHTML = p.weights.map(function (w) {
        return '<button type="button" class="weight-pill' + (w.label === selected.label ? " active" : "") +
          '" data-weight="' + w.label + '">' + w.label + "</button>";
      }).join("");
      priceEl.textContent = formatRs(selected.price);
    }
    drawWeights();
    weightWrap.addEventListener("click", function (ev) {
      var btn = ev.target.closest("[data-weight]");
      if (!btn) return;
      for (var i = 0; i < p.weights.length; i++) {
        if (p.weights[i].label === btn.getAttribute("data-weight")) selected = p.weights[i];
      }
      drawWeights();
    });
    var qtyInput = root.querySelector("[data-p-qty]");
    root.querySelector("[data-qty-minus]").addEventListener("click", function () {
      qtyInput.value = Math.max(1, (parseInt(qtyInput.value, 10) || 1) - 1);
    });
    root.querySelector("[data-qty-plus]").addEventListener("click", function () {
      qtyInput.value = Math.min(99, (parseInt(qtyInput.value, 10) || 1) + 1);
    });
    root.querySelector("[data-p-add]").addEventListener("click", function () {
      addToCart(p.id, selected.label, parseInt(qtyInput.value, 10) || 1);
    });
    var recipeWrap = root.querySelector("[data-p-recipes]");
    if (p.recipes && p.recipes.length) {
      recipeWrap.innerHTML = "<h2>Try it in</h2>" + p.recipes.map(function (rid) {
        var r = recipeById(rid);
        return r ? '<p><a class="text-link" href="recipes.html#' + r.id + '">' + r.name + "</a></p>" : "";
      }).join("");
      recipeWrap.hidden = false;
    }
    var related = PRODUCTS.filter(function (x) { return x.category === p.category && x.id !== p.id; }).slice(0, 4);
    renderGrid(root.querySelector("[data-related-grid]"), related);
  }

  // ---------- Blends page ----------
  function initBlends() {
    var grid = document.querySelector("[data-blends-grid]");
    if (!grid) return;
    renderGrid(grid, PRODUCTS.filter(function (p) { return p.category === "Spice Blends"; }));
  }

  // ---------- Bulk page gift boxes ----------
  function initBulk() {
    var grid = document.querySelector("[data-gift-grid]");
    if (grid) renderGrid(grid, PRODUCTS.filter(function (p) { return p.category === "Gift Boxes"; }));
  }

  // ---------- Recipes page ----------
  function initRecipes() {
    var wrap = document.querySelector("[data-recipes]");
    if (!wrap) return;
    wrap.innerHTML = RECIPES.map(function (r) {
      var links = r.products.map(function (pid) {
        var p = productById(pid);
        return p ? '<a class="chip-link" href="product.html?id=' + p.id + '">' + p.name + "</a>" : "";
      }).join("");
      var steps = r.steps.map(function (s) { return "<li>" + s + "</li>"; }).join("");
      return '<article class="recipe-card" id="' + r.id + '">' +
        '<img src="' + r.img + '" alt="' + r.name + '" loading="lazy">' +
        '<div class="recipe-body"><h3>' + r.name + "</h3>" +
        '<p class="recipe-meta">' + r.time + " - " + r.serves + "</p>" +
        "<p>" + r.intro + "</p><ol>" + steps + "</ol>" +
        '<p class="recipe-uses"><strong>Uses:</strong></p><div class="chip-row">' + links + "</div>" +
        "</div></article>";
    }).join("");
  }

  // ---------- Cart page ----------
  function renderCartPage() {
    var wrap = document.querySelector("[data-cart-lines]");
    if (!wrap) return;
    var cart = loadCart();
    var empty = document.querySelector("[data-cart-empty]");
    var main = document.querySelector("[data-cart-main]");
    if (!cart.length) {
      if (empty) empty.hidden = false;
      if (main) main.hidden = true;
      return;
    }
    if (empty) empty.hidden = true;
    if (main) main.hidden = false;
    wrap.innerHTML = cart.map(function (line, idx) {
      return '<div class="cart-line">' +
        '<img src="' + line.img + '" alt="' + line.name + '">' +
        '<div class="cart-line-info"><h3>' + line.name + "</h3>" +
        "<p>" + line.weight + " - " + formatRs(line.price) + " each</p>" +
        '<button type="button" class="remove-btn" data-remove="' + idx + '">Remove</button></div>' +
        '<div class="qty-stepper"><button type="button" data-dec="' + idx + '" aria-label="Decrease quantity">-</button>' +
        '<span data-line-qty>' + line.qty + "</span>" +
        '<button type="button" data-inc="' + idx + '" aria-label="Increase quantity">+</button></div>' +
        '<div class="cart-line-total">' + formatRs(line.price * line.qty) + "</div></div>";
    }).join("");
    var subtotal = cartSubtotal(cart);
    var delivery = deliveryFor(subtotal);
    document.querySelector("[data-cart-subtotal]").textContent = formatRs(subtotal);
    document.querySelector("[data-cart-delivery]").textContent = delivery === 0 ? "Free" : formatRs(delivery);
    document.querySelector("[data-cart-total]").textContent = formatRs(subtotal + delivery);
    var note = document.querySelector("[data-delivery-note]");
    if (note) {
      note.textContent = delivery === 0
        ? "Your order is above Rs 5,000, so delivery is free."
        : "Delivery is a flat Rs 250. Add " + formatRs(FREE_ABOVE + 1 - subtotal) + " more to get free delivery.";
    }
  }
  function initCartPage() {
    if (document.querySelector("[data-cart-page]")) renderCartPage();
  }

  // ---------- Checkout ----------
  function renderCheckoutSummary() {
    var wrap = document.querySelector("[data-checkout-lines]");
    if (!wrap) return;
    var cart = loadCart();
    wrap.innerHTML = cart.map(function (line) {
      return '<div class="summary-line"><span>' + line.name + " (" + line.weight + ") x " + line.qty + "</span><span>" +
        formatRs(line.price * line.qty) + "</span></div>";
    }).join("");
    var subtotal = cartSubtotal(cart);
    var delivery = deliveryFor(subtotal);
    document.querySelector("[data-co-subtotal]").textContent = formatRs(subtotal);
    document.querySelector("[data-co-delivery]").textContent = delivery === 0 ? "Free" : formatRs(delivery);
    document.querySelector("[data-co-total]").textContent = formatRs(subtotal + delivery);
    var note = document.querySelector("[data-co-note]");
    if (note) {
      note.textContent = subtotal === 0 ? "" : (delivery === 0
        ? "Your order is above Rs 5,000, so delivery is free."
        : "Delivery is a flat Rs 250. Add " + formatRs(FREE_ABOVE + 1 - subtotal) + " more to get free delivery.");
    }
  }
  function initCheckout() {
    var page = document.querySelector("[data-checkout-page]");
    if (!page) return;
    renderCheckoutSummary();
    var form = document.querySelector("[data-checkout-form]");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var cart = loadCart();
      var errorBox = document.querySelector("[data-form-error]");
      if (!cart.length) {
        errorBox.textContent = "Your cart is empty. Add something from the shop first.";
        errorBox.hidden = false;
        return;
      }
      var missing = [];
      form.querySelectorAll("[required]").forEach(function (field) {
        if (!field.value.trim()) missing.push(field.getAttribute("data-label") || field.name);
      });
      if (missing.length) {
        errorBox.textContent = "Please fill in: " + missing.join(", ") + ".";
        errorBox.hidden = false;
        errorBox.scrollIntoView({ block: "center" });
        return;
      }
      errorBox.hidden = true;
      var orderNo = "SR-" + Math.floor(100000 + Math.random() * 900000);
      document.querySelector("[data-order-number]").textContent = orderNo;
      document.querySelector("[data-checkout-main]").hidden = true;
      var success = document.querySelector("[data-checkout-success]");
      success.hidden = false;
      success.scrollIntoView({ block: "start" });
      saveCart([]);
      updateCartBadge();
    });
  }

  // ---------- Simple validated forms (contact, bulk) ----------
  function initSimpleForms() {
    document.querySelectorAll("[data-simple-form]").forEach(function (form) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var errorBox = form.querySelector("[data-form-error]");
        var missing = [];
        form.querySelectorAll("[required]").forEach(function (field) {
          if (!field.value.trim()) missing.push(field.getAttribute("data-label") || field.name);
        });
        if (missing.length) {
          if (errorBox) {
            errorBox.textContent = "Please fill in: " + missing.join(", ") + ".";
            errorBox.hidden = false;
          }
          return;
        }
        if (errorBox) errorBox.hidden = true;
        var success = form.querySelector("[data-form-success]");
        if (success) success.hidden = false;
        form.querySelectorAll("input, textarea, select").forEach(function (f) {
          if (f.type !== "submit") f.value = "";
        });
        if (success) success.scrollIntoView({ block: "center" });
      });
    });
  }

  // ---------- FAQ accordion ----------
  function initFaq() {
    document.querySelectorAll(".faq-item").forEach(function (item) {
      var btn = item.querySelector(".faq-q");
      var panel = item.querySelector(".faq-a");
      if (!btn || !panel) return;
      btn.addEventListener("click", function () {
        var isOpen = item.classList.contains("open");
        document.querySelectorAll(".faq-item.open").forEach(function (other) {
          other.classList.remove("open");
          other.querySelector(".faq-a").style.maxHeight = null;
          other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("open");
          panel.style.maxHeight = panel.scrollHeight + "px";
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  // ---------- Global delegated clicks (bound once, guarded) ----------
  if (!window.__srkBound) {
    window.__srkBound = true;
    document.addEventListener("click", function (ev) {
      var addBtn = ev.target.closest("[data-add]");
      if (addBtn) {
        var id = addBtn.getAttribute("data-add");
        var card = addBtn.closest(".card");
        var select = card ? card.querySelector("[data-weight-select]") : null;
        addToCart(id, select ? select.value : null, 1);
        return;
      }
      var filterBtn = ev.target.closest("[data-filter]");
      if (filterBtn) {
        shopState.category = filterBtn.getAttribute("data-filter");
        renderShop();
        return;
      }
      var inc = ev.target.closest("[data-inc]");
      var dec = ev.target.closest("[data-dec]");
      var rem = ev.target.closest("[data-remove]");
      if (inc || dec || rem) {
        var cart = loadCart();
        var idx = parseInt((inc || dec || rem).getAttribute("data-inc") || (inc || dec || rem).getAttribute("data-dec") || (inc || dec || rem).getAttribute("data-remove"), 10);
        if (rem) { cart.splice(idx, 1); }
        else if (inc) { cart[idx].qty = Math.min(99, cart[idx].qty + 1); }
        else if (dec) { cart[idx].qty = Math.max(1, cart[idx].qty - 1); }
        saveCart(cart);
        updateCartBadge();
        renderCartPage();
      }
    });
    document.addEventListener("change", function (ev) {
      var weightSelect = ev.target.closest("[data-weight-select]");
      if (weightSelect) {
        var cardEl = weightSelect.closest(".card");
        var priceEl = cardEl ? cardEl.querySelector("[data-card-price]") : null;
        var opt = weightSelect.options[weightSelect.selectedIndex];
        if (priceEl && opt) priceEl.textContent = formatRs(parseInt(opt.getAttribute("data-price"), 10));
        return;
      }
      if (ev.target.closest("[data-sort]")) {
        shopState.sort = ev.target.value;
        renderShop();
        return;
      }
      if (ev.target.closest("[data-filter-select]")) {
        shopState.category = ev.target.value;
        renderShop();
      }
    });
  }

  // ---------- Mobile nav ----------
  function initNav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var nav = document.querySelector("[data-nav]");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    updateCartBadge();
    initNav();
    initHome();
    initDry();
    initShop();
    initProduct();
    initBlends();
    initBulk();
    initRecipes();
    initCartPage();
    initCheckout();
    initSimpleForms();
    initFaq();
  });
})();
