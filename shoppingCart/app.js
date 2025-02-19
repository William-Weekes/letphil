let products = [
    {
        name: "shirt",
        price: 50,
        image: "https://media.istockphoto.com/id/488160041/photo/mens-shirt.jpg?s=612x612&w=0&k=20&c=xVZjKAUJecIpYc_fKRz_EB8HuRmXCOOPOtZ-ST6eFvQ=",
        count: 1
    }
];

// Getting elements
const productName = document.querySelector("#product-name");
const productPrice = document.querySelector("#product-price");
const productImage = document.querySelector("#product-image");
const productCount = document.querySelector("#numOfUnits");
const addToCart = document.querySelector("#addButton");
const clearCart = document.createElement("button"); // Create clear cart button
const listContainer = document.querySelector("#listContainer");

// Create a total cost display
const totalCostElement = document.createElement("h2");
totalCostElement.textContent = "Total Cost: $0";
listContainer.before(totalCostElement);

// Style and add "Clear Cart" button
clearCart.textContent = "Clear Cart";
clearCart.style.marginTop = "10px";
clearCart.style.display = "block";
clearCart.style.cursor = "pointer";
clearCart.addEventListener("click", clearShoppingCart);
listContainer.before(clearCart);

// Add product to cart
addToCart.addEventListener("click", () => {
    const name = productName.value.trim();
    const price = parseFloat(productPrice.value);
    const image = productImage.value.trim();
    const count = parseInt(productCount.value, 10);

    // Validation
    if (!name || Number.isNaN(price) || price <= 0 || !image || Number.isNaN(count) || count <= 0) {
        alert("Please enter valid product details.");
        return;
    }

    // Check if product already exists, if so, update quantity
    let existingProduct = products.find(product => product.name.toLowerCase() === name.toLowerCase());
    if (existingProduct) {
        existingProduct.count += count;
    } else {
        products.push({ name, price, image, count });
    }

    // Clear input fields
    productName.value = "";
    productPrice.value = "";
    productImage.value = "";
    productCount.value = "1"; // Reset select dropdown to default

    renderListItems();
});

// Render List
function renderListItems() {
    if (!listContainer) {
        console.error("Error: listContainer element not found!");
        return;
    }

    listContainer.innerHTML = ""; // Clear list before re-rendering

    let totalCost = 0;

    products.forEach((product, index) => {
        totalCost += product.price * product.count; // Update total cost

        const li = document.createElement("div");
        li.classList.add("cart-item");
        li.innerHTML = `
            <input type="text" value="${product.name}" data-index="${index}" class="edit-name">
            <input type="number" value="${product.price}" data-index="${index}" class="edit-price">
            <input type="number" value="${product.count}" data-index="${index}" class="edit-count" min="1">
            <img src="${product.image}" alt="${product.name}" width="50" height="50">
            <button onclick="removeItem(${index})">Remove</button>
            <hr>
        `;
        listContainer.appendChild(li);
    });

    // Update total cost display
    totalCostElement.textContent = `Total Cost: $${totalCost.toFixed(2)}`;

    // Add event listeners to editable fields
    document.querySelectorAll(".edit-name").forEach(input => {
        input.addEventListener("input", updateProductName);
    });
    document.querySelectorAll(".edit-price").forEach(input => {
        input.addEventListener("input", updateProductPrice);
    });
    document.querySelectorAll(".edit-count").forEach(input => {
        input.addEventListener("input", updateProductCount);
    });
}

// Update product name
function updateProductName(event) {
    const index = event.target.getAttribute("data-index");
    products[index].name = event.target.value.trim();
}

// Update product price
function updateProductPrice(event) {
    const index = event.target.getAttribute("data-index");
    const newPrice = parseFloat(event.target.value);
    if (!Number.isNaN(newPrice) && newPrice > 0) {
        products[index].price = newPrice;
        renderListItems();
    }
}

// Update product count
function updateProductCount(event) {
    const index = event.target.getAttribute("data-index");
    const newCount = parseInt(event.target.value, 10);
    if (!Number.isNaN(newCount) && newCount > 0) {
        products[index].count = newCount;
        renderListItems();
    }
}

// Remove item from cart
function removeItem(index) {
    products.splice(index, 1);
    renderListItems();
}

// Clear entire shopping cart
function clearShoppingCart() {
    products.length = 0;
    renderListItems();
}

// Initial render
renderListItems();