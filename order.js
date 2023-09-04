window.addEventListener('DOMContentLoaded', function() {
  const addPizzaButton = document.getElementById('addPizzaButton');
  const placeOrderButton = document.getElementById('placeOrderButton');
  const clearCartButton = document.getElementById('clearCartButton');
  const pizzaContainer = document.getElementById('pizzaContainer');
  const submitButton = document.getElementById('submitButton');
  const cartKey = 'pizzaCart'; // Key to store the cart data in Local Storage

  let pizzaList = []; // Array to store the pizzas in the cart

  addPizzaButton.addEventListener('click', function() {
    const initialPizza = document.querySelector('.initial-pizza');
    const pizzaTypeSelect = initialPizza.querySelector('.pizzaCombo');
    const pizzaSizeSelect = initialPizza.querySelector('.sizeCombo');

    const pizzaDiv = document.createElement('div');
    pizzaDiv.classList.add('pizza');

    const pizzaTypeLabel = document.createElement('label');
    pizzaTypeLabel.textContent = 'Pizza Type:';
    const pizzaTypeText = document.createElement('span');
    pizzaTypeText.textContent = pizzaTypeSelect.value;

    const pizzaSizeLabel = document.createElement('label');
    pizzaSizeLabel.textContent = ' Size: ';
    const pizzaSizeText = document.createElement('span');
    pizzaSizeText.textContent = pizzaSizeSelect.value;

    pizzaDiv.appendChild(pizzaTypeLabel);
    pizzaDiv.appendChild(pizzaTypeText);
    pizzaDiv.appendChild(pizzaSizeLabel);
    pizzaDiv.appendChild(pizzaSizeText);

    const pizzaPrice = calculatePizzaPrice(pizzaTypeSelect.value) * sizePrice(pizzaSizeSelect.value);
    console.log("The pizza will cost R" + pizzaPrice.toFixed(2));

    pizzaList.push({ type: pizzaTypeSelect.value, price: pizzaPrice.toFixed(2), size: pizzaSizeSelect.value });

    pizzaContainer.appendChild(pizzaDiv);

    updateCartData();
  });

  placeOrderButton.addEventListener('click', function() {
    const totalPrice = calculateTotalPrice();
    const confirmation = confirm(`Your order total is R${totalPrice.toFixed(2)}. Do you want to proceed?`);

    if (confirmation) {
      console.log("Button pressed!");
      let pizzaString = '';
  
    pizzaList.forEach((pizza, index) => 
  {
    pizzaString += `Pizza ${index + 1}: ${pizza.type} (${pizza.size}), `;
  });
  
  localStorage.setItem('pizzaString', pizzaString);
  
		window.open('order_confirmation.html', '_blank');
     
	  
	
    
    } else {
      clearCart();
      clearCartData();
    }
  });
	

  

  clearCartButton.addEventListener('click', function() {
    clearCart();
    clearCartData();
  });


  function updatePizzaImage(selectElement) {
    var pizzaType = selectElement.value;
    var pizzaImage = document.getElementById("pizzaImage");

    console.log(pizzaType);
    switch (pizzaType) {
      case "Margherita":
        pizzaImage.src = "margherita.jpg";
        break;
      case "Pepperoni":
        pizzaImage.src = "pepperoni.jpg";
        break;
      case "Vegetarian":
        pizzaImage.src = "vegetarian.jpg";
        break;
      case "Hawaiian":
        pizzaImage.src = "hawaiian.jpg";
        break;
      case "BBQ Chicken":
        pizzaImage.src = "bbq_chicken.jpg";
        break;
      default:
        pizzaImage.src = "margherita.jpg";
        break;
    }
  }

  const pizzaTypeSelect = document.querySelector('.pizzaCombo');
  updatePizzaImage(pizzaTypeSelect);

  pizzaTypeSelect.addEventListener('change', function() {
    updatePizzaImage(this);
  });

  const urlParams = new URLSearchParams(window.location.search);
  const pizzaType = urlParams.get('pizzaType');

  if (pizzaType) {
    pizzaTypeSelect.value = pizzaType;
    updatePizzaImage(pizzaTypeSelect);
  }

  function calculatePizzaPrice(pizzaType) {
    switch (pizzaType) {
      case 'Margherita':
        return 80.99;
      case 'Pepperoni':
        return 90.99;
      case 'Vegetarian':
        return 100.99;
      case 'Hawaiian':
        return 110.99;
      case 'BBQ Chicken':
        return 120.99;
      default:
        return 0;
    }
  }

  function sizePrice(pizzaSize) {
    switch (pizzaSize) {
      case 'Small':
        return 0.5;
      case 'Medium':
        return 0.75;
      case 'Large':
        return 1;
    }
  }

  function calculateTotalPrice() {
    let total = 0;
    for (let i = 0; i < pizzaList.length; i++) {
      total += parseFloat(pizzaList[i].price);
    }
    console.log("The total price is R" + total.toFixed(2));
    return total;
  }

  // This clears the array
  function clearCart() {
    pizzaList = [];
    pizzaContainer.innerHTML = '';
  }

  function updateCartData() {
    localStorage.setItem(cartKey, JSON.stringify(pizzaList));
  }

  // This removes the cart data from the local storage of the user
  function clearCartData() {
    localStorage.removeItem(cartKey);
  }

  // Load cart data from Local Storage when the page loads
  const storedCartData = localStorage.getItem(cartKey);
  if (storedCartData) {
    pizzaList = JSON.parse(storedCartData);
    for (let i = 0; i < pizzaList.length; i++) {
      const pizza = pizzaList[i];
      const pizzaDiv = document.createElement('div');
      pizzaDiv.classList.add('pizza');

      const pizzaTypeLabel = document.createElement('label');
      pizzaTypeLabel.textContent = 'Pizza Type:';
      const pizzaTypeText = document.createElement('span');
      pizzaTypeText.classList.add('pizzaTypeText');
      pizzaTypeText.textContent = pizza.type;

      const pizzaSizeLabel = document.createElement('label');
      pizzaSizeLabel.textContent = ' Size: ';
      const pizzaSizeText = document.createElement('span');
      pizzaSizeText.classList.add('pizzaSizeText');
      pizzaSizeText.textContent = pizza.size;

      pizzaDiv.appendChild(pizzaTypeLabel);
      pizzaDiv.appendChild(pizzaTypeText);
      pizzaDiv.appendChild(pizzaSizeLabel);
      pizzaDiv.appendChild(pizzaSizeText);

      pizzaContainer.appendChild(pizzaDiv);
    }
  }

  
 

  
});
