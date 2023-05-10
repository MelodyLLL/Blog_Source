<template>
  <button @click="modalOpen = true">开启</button>
  <teleport to="body">
    <div v-if="modalOpen" class="modal">
      <div>
        我是一个模态框
        <button @click="modalOpen = false">关闭模态框</button>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  data() {
    return {
      modalOpen: false,
    };
  },
};
</script>
<style scopde>
.modal {
  position: fixed;
  z-index: 9999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background: white; */
  color: var(--c-brand);
  width: 300px;
  height: 300px;
  padding: 5px;
}
</style>
