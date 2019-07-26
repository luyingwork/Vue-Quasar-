<template>
  <div class="validation-box relative-position row items-center" >
    <span class="validation-error-label">!</span>
    <span class="tooltip-text">{{this.tooltip}}</span>
  </div>
</template>

<script>
export default {
  name: 'ValidationTooltip'
}
</script>

<style lang="stylus">
  @import '~variables'
  .validation-box
    width 32px;
  .validation-box .tooltip-text
    cursor pointer
    visibility: hidden
    width 220px
    background-color #f44336
    color $white
    text-align center
    font-size 20px
    border-radius 5px
    padding 14px 16px
    position: absolute
    z-index 1
    top 150%
    left 50%
    margin-left -110px
    opacity 0
    transition opacity 0.3s

  .validation-box .tooltip-text::after
    cursor pointer
    content ""
    position absolute
    bottom 100%
    left 50%
    margin-left -5px
    border-width 10px
    border-style solid
    border-color transparent transparent #f44336 transparent

  .validation-box:hover .tooltip-text
    cursor pointer
    visibility visible
    opacity 1
</style>
<script>
  export default {
    props: ['tooltip'],
    created() {
      console.log(this.tooltip)
    }
  }
</script>
