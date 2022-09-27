import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", () => {
  const dummyProducts = ref([
    {
      title: "Coffee Grinder",
      price: 299.0,
    },
    {
      title: "Coffee Kettle",
      price: 165.0,
    },
  ]);

  const lineItems = ref([]);

  const cartTotal = computed(() => {
    return lineItems.value.reduce((acc, lineItem) => {
      return (acc += lineItem.price * lineItem.quantity);
    }, 0);
  });

  const cartActive = ref(false);

  function addLineItem(product) {
    const existingLineItem = lineItems.value.find(
      (lineItem) => lineItem.title === product.title
    );
    if (existingLineItem !== undefined) {
      existingLineItem.quantity++;
    } else {
      lineItems.value.push({ ...product, quantity: 1 });
    }
    openCart();
  }

  function clearCart() {
    lineItems.value = [];
    openCart();
  }

  function openCart() {
    cartActive.value = true;
  }

  function closeCart() {
    cartActive.value = false;
  }

  return {
    dummyProducts,
    cartActive,
    clearCart,
    openCart,
    closeCart,
    addLineItem,
    lineItems,
    cartTotal,
  };
});
