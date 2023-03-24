let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart")

let mybasket = JSON.parse(localStorage.getItem("data")) || [];

let totalCartQuantity = () => {
  let cartQuantity = document.getElementById("cartQuantity")
  cartQuantity.innerHTML = mybasket.map((x) => x.item).reduce((x, y) => x + y, 0);
}

totalCartQuantity();

let generateCartItems = () => {
  if (mybasket.length !== 0) {
    return (ShoppingCart.innerHTML = mybasket.map((x) => {
      let { id, item } = x;
      let search = shopItemsData.find((y) => y.id === id) || [];
      let { img, price, productName } = search;
      return `
      <div>
        <div class="cart-item-container">
          <div>
            <img class="cart-product-image" src=${img} alt="product-${id}" />
          </div>
          <div class="cart-product-details-container">
              <div class="d-flex flex-row">
                <h5 class="cart-product-name">${productName}</h5>
                <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
              </div>
              <p class="cart-item-price">Price : ₹ ${price}</p>
              <div class="d-flex flex-row align-item-center">
                  <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                  <div id=${id} class="quantity">${item}</div>
                  <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
              </div>
          </div>
        </div>
      </div>`
    }).join(""))
  }
  else {
    ShoppingCart.innerHTML = ``
    label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html"> 
            <button class="btn btn-secondary">Back to Home Page</button>
        </a>`
  }
};

generateCartItems();



let increment = (id) => {
  let selectedItem = id;
  let search = mybasket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    mybasket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(mybasket));
}



let decrement = (id) => {
  let selectedItem = id;
  let search = mybasket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  mybasket = mybasket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(mybasket));
}

let update = (id) => {
  let search = mybasket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  totalCartQuantity();
  TotalAmount();
};



let removeItem = (id) => {
  let selectedItem = id;
  mybasket = mybasket.filter((x) => x.id !== selectedItem.id);
  totalCartQuantity();
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(mybasket));
};



let TotalAmount = () => {
  if (mybasket.length !== 0) {
    let amount = mybasket.map((x) => {
      let { id, item } = x;
      let search = shopItemsData.find((y) => y.id === id) || [];
      return search.price * item;
    }).reduce((x, y) => x + y, 0);

    return (label.innerHTML = `
      <div>
        <p> <i class="bi bi-check-circle"></i> Your order is eligible for FREE Delivery.</p>
        <h2>Total Cart Value : ₹ ${amount}</h2>
        <div>
          <button class="btn btn-primary">Proceed to Buy</button>
          <button onclick="clearCart()" class="btn btn-danger" >Clear Cart</button>
        </div>
        
      </div>
      `);
  } else return;
};

TotalAmount();




let clearCart = () => {
  mybasket = [];
  generateCartItems();
  totalCartQuantity();
  localStorage.setItem("data", JSON.stringify(mybasket));
};
