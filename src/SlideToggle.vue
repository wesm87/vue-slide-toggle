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
     * The duration of the slide transition. Must be a number, a numeric string,
     * or a valid duration (e.g. '500ms', '1s'). Numbers and numeric strings
     * will be converted to 'ms' values (e.g. 750 -> '750ms').
     */
    duration: {
      type: [Number, String],
      default: 500,
    },
  },

  data () {
    return {
      // TODO: Make sure this works if `active` is `true` on initial render
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
    durationNormalized () {
      if (typeof this.duration === 'string') {
        return this.duration
      }

      return `${this.duration}ms`
    },

    containerClassMap () {
      return {
        'vue-slide-toggle': true,
        'vue-slide-toggle--active': this.active,
      }
    },

    contentClassMap () {
      return {
        'vue-slide-toggle__content': true,
      }
    },

    containerStyleMap () {
      if (this.isAbsolute) {
        return {
          overflow: 'hidden',
        }
      }

      const maxHeight = `${this.maxHeight}px`

      return {
        overflow: 'hidden',
        'max-height': maxHeight,
        'transition-property': 'max-height',
        'transition-duration': this.durationNormalized,
      }
    },

    contentStyleMap () {
      if (!this.isAbsolute) {
        return null
      }

      const yPosition = this.active ? '0' : '-100%'

      return {
        transform: `translateY(${yPosition})`,
        'transition-property': 'transform',
        'transition-duration': this.durationNormalized,
      }
    },
  },

  methods: {
    /**
     * Checks if the container element has a position of `absolute` or `fixed`;
     * if so, the slide transition can be done using `translateY` instead of
     * `max-height`, which allows for hardware-acceleration.
     *
     * @todo See if we can support `position: sticky` as well.
     * @todo Maybe make this a prop instead? The end result differs slightly
     *       between the two implementations - with `max-height` the content
     *       stays in place while the visible area slides down, whereas with
     *       `translateY` the content itself is what slides down. Not a major
     *       issue but something to consider, it might be unexpected behavior
     *       in certain edge cases.
     */
    checkIfAbsolutelyPositioned () {
      // Bail if we're not in a browser environment
      if (typeof window === 'undefined') {
        return false
      }

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

      // Collapse the content if `active` is now `false`.
      if (!newValue) {
        this.maxHeight = 0
        return
      }

      // Set `max-height` to the height of the content.
      const { content } = this.$refs

      this.maxHeight = content.offsetHeight
    },
  },
}
</script>
