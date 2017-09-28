<template>
  <div class="vue-slide-toggle" :style="style">
    <div ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vue-slide-toggle',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  data () {
    return {
      maxHeight: 0,
    }
  },
  computed: {
    style () {
      return {
        'max-height': this.maxHeight === 'auto' ? 'auto' : `${this.maxHeight}px`,
        'transition-duration': `${this.duration}ms`,
      }
    },
  },
  watch: {
    active (newValue, oldValue) {
      if (newValue === oldValue) {
        return
      }

      if (!newValue) {
        this.maxHeight = 0
        return
      }

      this.maxHeight = 'auto'

      this.$nextTick(() => {
        const { content } = this.$refs

        this.maxHeight = content.offsetHeight
      })
    },
  },
}
</script>

<style scoped>
.vue-slide-toggle {
  overflow: hidden;
  transition-property: max-height;
}
</style>
