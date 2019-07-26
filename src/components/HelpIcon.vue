<template>
  <div class="help-icon-box relative-position row items-center">
    <img src="~assets/img/icon-help.png" class="help-icon-img" />
    <span class="tooltip-text">{{ this.tooltip }}</span>
  </div>
</template>

<script>
export default {
  name: 'HelpIcon'
}

</script>
<style lang="stylus">
@import '~variables'

.help-icon-img
  cursor pointer

.help-icon-box .tooltip-text
  visibility: hidden
  width 220px
  background-color $color-standard
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

.help-icon-box .tooltip-text::after
  content ""
  position absolute
  bottom 100%
  left 50%
  margin-left -5px
  border-width 10px
  border-style solid
  border-color transparent transparent $color-standard transparent

.help-icon-box:hover .tooltip-text
  visibility visible
  opacity 1

@media (max-width 582px)
  .help-icon-box
    margin 0 auto
</style>
<script>
export default {
  props:['tooltip'],
  created () {
    console.log(this.tooltip)
  }
}
</script>
