<template>
  <div>
    <div class="cart-header">
      <span>{{ title }}</span>
      <svg
        t="1664679353574"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2552"
        width="16"
        height="16"
      >
        <path
          d="M512 958.016C266.08 958.016 65.984 757.952 65.984 512 65.984 266.08 266.08 65.984 512 65.984c245.952 0 446.016 200.064 446.016 446.016C958.016 757.952 757.952 958.016 512 958.016zM512 129.984C301.344 129.984 129.984 301.344 129.984 512c0 210.624 171.36 382.016 382.016 382.016 210.624 0 382.016-171.36 382.016-382.016C894.016 301.344 722.624 129.984 512 129.984z"
          p-id="2553"
          fill="#bfbfbf"
        />
        <path
          d="M512 304m-48 0a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0Z"
          p-id="2554"
          fill="#bfbfbf"
        />
        <path
          d="M512 768c-17.664 0-32-14.304-32-32l0-288c0-17.664 14.336-32 32-32s32 14.336 32 32l0 288C544 753.696 529.664 768 512 768z"
          p-id="2555"
          fill="#bfbfbf"
        />
      </svg>
    </div>
    <div class="cart-content">
      <span>{{ count }}</span>
      <div class="charts">
        <slot name="charts" />
      </div>
    </div>
    <div class="cart-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: ['title', 'count']
}
</script>

<style>
.cart-header {
  display: flex;
  justify-content: space-between;
}
.cart-header span {
  font-size: 14px;
  color: #bfbfbf;
}
.cart-content {
  margin: 10px 0;
}
.cart-content span {
  font-size: 24px;
}
.cart-content .charts {
  height: 50px;
  margin: 10px 0;
  display: flex;
}
.cart-content .charts div {
  height: 50px;
  line-height: 50px;
}
.cart-content .charts div span {
  font-size: 14px;
}
.cart-footer {
  border-top: 1px solid #eee;
  display: flex;
}
.cart-footer span {
  display: inline-block;
  font-size: 14px;
  padding-top: 10px;
}
</style>