<script setup>
import { useCartStore } from "./stores/cart";
const store = useCartStore();
</script>

<template>
  <main>
    <h1>Super Awesome Store</h1>
    <div class="products">
      <div
        class="products__card"
        v-for="product in store.dummyProducts"
        :key="product.title"
      >
        <h2>{{ product.title }}</h2>
        <p>Unit Price: {{ product.price }}</p>
        <button @click="store.addLineItem(product)">Add to Cart</button>
      </div>
    </div>
    <button @click="store.clearCart">Clear Cart</button>
  </main>
  <div class="cart" :class="{ 'cart--shown': store.cartActive }">
    <div
      class="cart__lineItem"
      v-for="lineItem in store.lineItems"
      :key="lineItem.title"
    >
      <p class="cart__lineItemTitle">{{ lineItem.title }}</p>
      <p>Unit Price: ${{ lineItem.price }}</p>
      <p>Quanity: {{ lineItem.quantity }}</p>
      <p>Line Item Total: ${{ lineItem.quantity * lineItem.price }}</p>
    </div>
    <p>Cart Total: ${{ store.cartTotal }}</p>
    <button class="cart__closeButton" @click="store.closeCart">
      Close Cart
    </button>
  </div>
</template>

<style scoped lang="scss">
#app {
  position: relative;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 12px;
  margin: 12px;
  &__card {
    width: 300px;
    border: 1px solid black;
    padding: 12px;
  }
}

.cart {
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: absolute;
  width: 400px;
  background: papayawhip;
  height: 100vh;
  top: 0;
  right: 0;
  transform: translateX(400px);
  transition: transform 500ms;
  padding: 12px;
  &--shown {
    transform: translateX(0px);
  }
  &__lineItem {
    border: 1px solid black;
    padding: 12px;
  }
  &__lineItemTitle {
    font-weight: 700;
  }
}
</style>
