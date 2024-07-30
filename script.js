document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  const cartLink = document.getElementById('cart-link');
  const cartCount = document.getElementById('cart-count');

  function updateCartCount() {
      let totalItems = 0;
      for (const quantity of Object.values(cart)) {
          totalItems += quantity;
      }
      cartCount.textContent = totalItems;
  }

  updateCartCount();

  document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', (event) => {
          if (sessionStorage.getItem('isLoggedIn') !== 'true') {
              window.location.href = 'login.html';
              return;
          }

          const card = event.target.closest('.card');
          const id = card.dataset.id;
          const quantityElement = card.querySelector('.quantity');
          const quantityNumber = quantityElement.querySelector('.quantity-number');
          
          if (!cart[id]) {
              cart[id] = 0;
          }
          
          cart[id]++;
          quantityNumber.textContent = cart[id];
          quantityElement.style.display = 'flex';

          localStorage.setItem('cart', JSON.stringify(cart));
          updateCartCount();
      });
  });

  document.querySelectorAll('.increase').forEach(button => {
      button.addEventListener('click', (event) => {
          const id = event.target.dataset.id;
          if (cart[id]) {
              cart[id]++;
              document.querySelector(`.card[data-id="${id}"] .quantity-number`).textContent = cart[id];
              localStorage.setItem('cart', JSON.stringify(cart));
              updateCartCount();
          }
      });
  });

  document.querySelectorAll('.decrease').forEach(button => {
      button.addEventListener('click', (event) => {
          const id = event.target.dataset.id;
          if (cart[id] > 0) {
              cart[id]--;
              if (cart[id] === 0) {
                  delete cart[id];
              }
              document.querySelector(`.card[data-id="${id}"] .quantity-number`).textContent = cart[id];
              if (cart[id] === 0) {
                  document.querySelector(`.card[data-id="${id}"] .quantity`).style.display = 'none';
              }
              localStorage.setItem('cart', JSON.stringify(cart));
              updateCartCount();
          }
      });
  });
});
