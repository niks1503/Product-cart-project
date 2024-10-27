let minusBtns = document.querySelectorAll(".minus_btn");
let plusBtns = document.querySelectorAll(".plus_btn");
let cartContainer = document.querySelector(".cart_product_div");

// Function to display total amount or "Cart is empty" message
function updateTotal() {
  let totalAmount = 0;
  document.querySelectorAll(".cart_list").forEach((item) => {
    const itemTotal = parseInt(
      item.querySelector(".cart_total").innerText.replace("$", "")
    );
    totalAmount += itemTotal;
  });

  // Check if totalElement already exists, if not create it
  let totalElement = document.querySelector(".cart_total_amount");
  if (!totalElement) {
    totalElement = document.createElement("div");
    totalElement.className = "cart_total_amount";
    cartContainer.appendChild(totalElement);
  }

  if (totalAmount > 0) {
    totalElement.innerHTML = `<strong>Total:</strong> ${totalAmount}`;
  } else {
    totalElement.innerHTML = "No product is added to the cart!";
  }
}

// Function to update cart items
function updateCart(productName, productPrice, quantity) {
  let existingCartItem = document.querySelector(
    `.cart_list[data-name="${productName}"]`
  );

  if (existingCartItem) {
    // Update quantity and total price for an existing product in cart
    let quantityElem = existingCartItem.querySelector(".cart_quantity");
    quantityElem.innerText = `${quantity} × ${productPrice}`;
    let totalElem = existingCartItem.querySelector(".cart_total");
    totalElem.innerText = `${productPrice * quantity}`;

    // Remove item if quantity is zero
    if (quantity === 0) {
      existingCartItem.remove();
    }
  } else if (quantity > 0) {
    // Create a new cart item if it doesn't already exist
    let cartList = document.createElement("div");
    cartList.className = "cart_list";
    cartList.setAttribute("data-name", productName);

    let product_Name = document.createElement("p");
    product_Name.innerText = productName;

    let product_quantity = document.createElement("p");
    product_quantity.className = "cart_quantity";
    product_quantity.innerText = `${quantity} × ${productPrice}`;

    let total = document.createElement("p");
    total.className = "cart_total";
    total.innerText = `${productPrice * quantity}`;

    cartList.appendChild(product_Name);
    cartList.appendChild(product_quantity);
    cartList.appendChild(total);

    cartContainer.appendChild(cartList);
  }

  // Update total and check for empty cart message
  updateTotal();
}

// Add event listeners to "+" buttons to increase quantity
plusBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let productContainer = btn.closest(".product_container");
    let productName = productContainer.querySelector(".product_name").innerText;
    let productPrice = parseInt(
      productContainer.querySelector(".product_price").innerText
    );
    let productUpdatePara = productContainer.querySelector(".product_update");

    // Increase product quantity
    let quantity = parseInt(productUpdatePara.innerText) + 1;
    productUpdatePara.innerText = quantity;

    // Update cart with new quantity
    updateCart(productName, productPrice, quantity);
  });
});

// Add event listeners to "-" buttons to decrease quantity
minusBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let productContainer = btn.closest(".product_container");
    let productName = productContainer.querySelector(".product_name").innerText;
    let productPrice = parseInt(
      productContainer.querySelector(".product_price").innerText
    );
    let productUpdatePara = productContainer.querySelector(".product_update");

    // Decrease product quantity but don't go below 0
    let quantity = Math.max(0, parseInt(productUpdatePara.innerText) - 1);
    productUpdatePara.innerText = quantity;

    // Update cart with new quantity
    updateCart(productName, productPrice, quantity);
  });
});

// Initial call to display "Cart is empty" when the page loads
updateTotal();
