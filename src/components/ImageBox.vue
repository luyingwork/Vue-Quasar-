<template>
  <div
    :class="boxClass"
    :style="boxStyle"
  >
    <img :src="src" :style="imgStyle" />
  </div>
</template>

<script>
export default {
  name: 'ImageBox',
  data () {
    return {
    }
  },
  props: {
    src: {
      type: String
    },
    width: {
      type: String
    },
    height: {
      type: String
    },
    round: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: 'transparent'
    },
    imageFix: {
      type: Boolean,
      default: false
    },
    scale: {
      type: String
    },
    color: {
      type: String,
      default: 'white'
    },
    outline: {
      type: Boolean
    },
    outlineColor: {
      type: String
    }
  },
  computed: {
    shape () {
      return `box-${this.round ? 'round' : 'rectangle'}`
    },
    boxClass () {
      let className = [ this.shape, 'flex flex-center' ]
      return className
    },
    boxStyle () {
      let style = [
        {width: `${this.width}px`},
        {height: `${this.height}px`},
        {backgroundColor: `${this.backgroundColor}`},
        {borderColor: `${this.outlineColor}`}
      ]
      if (this.round) {
        style.push({borderRadius: '50%'})
      }
      style.push(
        {margin: '0'}
      )
      return style
    },
    imgStyle () {
      let style = []
      if (this.round) style.push({ borderRadius: '50%' })
      if (this.imageFix) {
        style.push({ width: `${this.scale}%` })
      }

      return style
    }
  }
}
</script>

<style>
</style>
