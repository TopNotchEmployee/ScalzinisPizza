const menuItems = [
  { name: 'Margherita', price: 80.99, image: 'margherita.jpg' },
  { name: 'Pepperoni', price: 90.99, image: 'pepperoni.jpg' },
  { name: 'Vegetarian', price: 100.99, image: 'vegetarian.jpg' },
  { name: 'Hawaiian', price: 110.99, image: 'hawaiian.jpg' },
  { name: 'BBQ Chicken', price: 120.99, image: 'bbq_chicken.jpg' }
];
  
  // Function to create and display the menu items
  function displayMenu() {
    const menuContainer = document.getElementById('menuItems');
  
    // Iterate over the menuItems array
    menuItems.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.classList.add('menu-item');
  
      const itemName = document.createElement('h2');
      itemName.textContent = item.name;

      const itemImage = document.createElement('img');
      itemImage.src = item.image;
      itemImage.alt = item.name;
  
      const itemPrice = document.createElement('p');
      itemPrice.textContent = `R${item.price.toFixed(2)}`;

      // Add click event listener to each menu item
    menuItem.addEventListener('click', function() {
      // Navigate to the order page with the selected pizza type as a query parameter
      window.location.href = `order.html?pizzaType=${encodeURIComponent(item.name)}`;
    });
  
      menuItem.appendChild(itemImage);
      menuItem.appendChild(itemName);
      menuItem.appendChild(itemPrice);
      menuContainer.appendChild(menuItem);
    });
  }
  
  // Call the displayMenu function to populate the menu
  displayMenu();
  