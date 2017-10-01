<template>
  <div ref="container" :class="containerClassMap" :style="containerStyleMap">
    <div ref="content" :class="contentClassMap" :style="contentStyleMap">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vue-slide-toggle',
  props: {
    /**
     * When `active` becomes true, the content slides down; when it becomes
     * false, the content slides back up.
     */
    active: {
      type: Boolean,
      default: false,
    },

    /**
     * The duration of the slide transition. Must either be a number or a valid
     * duration string (e.g. '500ms').
     */
    duration: {
      type: [Number, String],
      default: 500,
    },
  },
  data () {
    return {
      maxHeight: 0,
      isAbsolute: false,
    }
  },
  mounted () {
    this.checkIfAbsolutelyPositioned()
  },
  updated () {
    this.checkIfAbsolutelyPositioned()
  },
  computed: {
    containerClassMap () {
      return {
        'vue-slide-toggle': true,
        'vue-slide-toggle--active': this.active,
        'vue-slide-toggle--absolute': this.isAbsolute,
      }
    },
    contentClassMap () {
      return {
        'vue-slide-toggle__content': true,
      }
    },
    containerStyleMap () {
      if (this.isAbsolute) {
        return {}
      }

      const hasMaxHeight = this.maxHeight !== 'none'
      const maxHeight = hasMaxHeight ? `${this.maxHeight}px` : 'none'

      return {
        'max-height': maxHeight,
        'transition-duration': `${this.duration}ms`,
      }
    },
    contentStyleMap () {
      if (!this.isAbsolute) {
        return {}
      }

      const yPosition = this.active ? '0' : '-100%'
      const transform = `translateY(${yPosition})`

      return {
        transform,
        'transition-duration': `${this.duration}ms`,
      }
    },
  },
  methods: {
    /**
     * Checks if the container element has a position of `absolute` or `fixed`;
     * if so, the slide transition can be done using `translateY` instead of
     * `max-height`, which allows for hardware-acceleration.
     *
     * @TODO See if we can support `position: sticky` as well.
     */
    checkIfAbsolutelyPositioned () {
      const { container } = this.$refs

      if (!container) {
        return false
      }

      const style = window.getComputedStyle(container)

      const absolutePositions = [
        'absolute',
        'fixed',
      ]

      this.isAbsolute = absolutePositions.includes(style.position)
    },

    /**
     * Returns the height of the toggleable content.
     */
    getContentHeight () {
      const { content } = this.$refs

      return content.offsetHeight
    },
  },
  watch: {
    active (newValue, oldValue) {
      // Bail if the container element has an absolute position since we can use
      // `translateY(-100%)` / `translateY(0)` to slide the content up & down.
      if (this.isAbsolute) {
        return
      }

      // Don't re-calculate the height if the value hasn't changed.
      if (newValue === oldValue) {
        return
      }

      if (!newValue) {
        this.maxHeight = 0
        return
      }

      // Set `max-height` to `none`, wait for the DOM changes to be applied,
      // and set the `max-height` to the actual content height.
      this.maxHeight = 'none'
      this.$nextTick(() => {
        this.maxHeight = this.getContentHeight()
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.vue-slide-toggle {
  overflow: hidden;
  transition-property: max-height;
}

.vue-slide-toggle--absolute {
  transition-property: none;

  .vue-slide-toggle__content {
    transition-property: transform;
  }
}
</style>
