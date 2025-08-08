const products = [
  {
    id: 1,
    name: "Product 1",
    price: 25.0,
    image: "assets/images/photo1.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    price: 30.0,
    image: "assets/images/photo2.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    price: 22.0,
    image: "assets/images/photo3.jpg",
  },
  {
    id: 4,
    name: "Product 4",
    price: 18.0,
    image: "assets/images/photo4.jpg",
  },
  {
    id: 5,
    name: "Product 5",
    price: 27.0,
    image: "assets/images/photo5.jpg",
  },
  {
    id: 6,
    name: "Product 6",
    price: 35.0,
    image: "assets/images/photo6.jpg",
  },
];

const selected = new Set();

const grid = document.getElementById("productGrid");
const list = document.getElementById("selectedList");
const subtotalEl = document.getElementById("subtotal");
const discountEl = document.getElementById("discount");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const bundleBtn = document.getElementById("bundleBtn");

// Render product cards
products.forEach((product) => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}"/>
    <h4>${product.name}</h4>
    <p>$${product.price.toFixed(2)}</p>
    <button class="toggle-btn" data-id="${product.id}">
      <span class="btn-text">Add to Bundle</span>
      <span class="btn-icon">+</span>
    </button>
  `;
  grid.appendChild(card);
});

// Event delegation
grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".toggle-btn");
  if (btn) {
    const id = parseInt(btn.dataset.id);
    const isSelected = selected.has(id);

    if (isSelected) {
      selected.delete(id);
    } else {
      selected.add(id);
    }

    updateUI();
  }
});

function updateUI() {
  // Update all buttons
  document.querySelectorAll(".toggle-btn").forEach((btn) => {
    const id = parseInt(btn.dataset.id);
    const isSelected = selected.has(id);

    if (isSelected) {
      btn.classList.add("added");
      btn.innerHTML = `<span class="btn-text">Added to Bundle</span><span class="btn-icon">✓</span>`;
    } else {
      btn.classList.remove("added");
      btn.innerHTML = `<span class="btn-text">Add to Bundle</span><span class="btn-icon">+</span>`;
    }
  });

  // Update sidebar
  const count = selected.size;
  progressText.textContent = `${count}/3 added`;
  progressFill.style.width = `${(Math.min(count, 3) / 3) * 100}%`;

  list.innerHTML = "";
  let total = 0;

  selected.forEach((id) => {
    const product = products.find((p) => p.id === id);
    total += product.price;

    const item = document.createElement("li");
    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}"/>
      <div>
        <p>${product.name}</p>
        <p>$${product.price.toFixed(2)}</p>
      </div>
    `;
    list.appendChild(item);
  });

  const discount = count >= 3 ? 0.3 : 0;
  const discountedTotal = total * (1 - discount);

  discountEl.textContent = `${discount * 100}%`;
  subtotalEl.textContent = discountedTotal.toFixed(2);
  bundleBtn.disabled = count < 3;
}

bundleBtn.addEventListener("click", () => {
  const bundle = Array.from(selected).map((id) =>
    products.find((p) => p.id === id)
  );
  console.log("Bundle Submitted:", bundle);
  alert("Bundle submitted!");
});
