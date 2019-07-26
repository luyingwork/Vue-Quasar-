<template>
  <div class="optional-extra-box" >
    <div class="optional-extra">
      <p class="text-font-8">{{title}}</p>
      <div class="row">
        <p class="text-font-9 col-10 info">{{description}}</p>
      </div>
      <div class="plan-upgrade-box">
        <p class="text-font-8">Upgrade from only £{{initPrice}} a month</p>
        <div class="plan-upgrade-detail">
          <div class="content-header">
            <div class="row-box row">
              <div class="info-box"></div>
              <div class="status-box"></div>
              <div class="status-box row flex flex-center">
                <div class="float-left" v-for="n in 2" :key="`star-${n}`">
                  <span class="img-icon-star"></span>
                </div>
              </div>
              <div class="status-box"></div>
            </div>
            <div class="row-box row">
              <div class="info-box"></div>
              <div class="status-box row flex-center">
                <div class="float-left" v-for="n in 1" :key="`star-${n}`">
                  <span class="img-icon-star"></span>
                </div>
              </div>
              <div class="status-box most-popular row flex-center">
                <span class="upgrade-info">MOST POPULAR</span>
              </div>
              <div v-if = "kind==='cover'" class="status-box row flex-center">
                <div  class="float-left" v-for="n in 3" :key="`star-${n}`">
                  <span class="img-icon-star"></span>
                </div>
              </div>
            </div>
            <div class="row-box car-info row">
              <div class="info-box"></div>
              <div class="status-box">
                <div class="basic row flex-center">
                  <p class="upgrade-info">basic</p>
                  <p v-if = "kind==='cover'" class="upgrade-info col-12 row flex-center">Rescue</p>
                </div>
              </div>
              <div class="status-box">
                <div class="next-first row flex-center">
                  <p v-if = "kind==='cover'" class="upgrade-info">gold</p>
                  <p v-if = "kind==='cover'" class="upgrade-info col-12 row flex-center">
                    Rescue Plus & Home Start
                  </p>
                  <p v-else class="upgrade-info">replacement car</p>
                </div>
              </div>
              <div v-if = "kind==='cover'" class="status-box">
                <div class="next-second row flex-center">
                  <p v-if = "kind==='cover'" class="upgrade-info">platinum</p>
                  <p v-if = "kind==='cover'" class="upgrade-info col-12 row flex-center">
                    Rescue Plus & Europe
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="content-body row">
            <div class="info-box">
              <div class="content-box" v-for="item in upgradeItemList" :key="`${item.label}`">
                <p class="text-font-9 row items-center">{{item.label}}</p>
              </div>
            </div>
            <div :class=firstStepStatusBoxClass>
              <div class="content-box row flex-center" v-for="item in upgradeItemList" :key="`${item.label}`">
                <div v-if="item.type == 'budget'" class="row flex-center">
                  <span class="text-font-11 align-center">{{item.initStep}}</span>
                </div>
                <div v-else class="row flex-center">
                  <div v-if="item.initStep == 'checked'" class="img-icon-check-wrapper row flex-center">
                    <img src="~assets/img/icon-tick-medium.png" />
                  </div>
                  <span v-else class="text-font-10 align-center">{{item.initStep}}</span>
                </div>
              </div>
            </div>
            <div :class=secondStepStatusBoxClass>
              <div class="content-box row flex-center" v-for="item in upgradeItemList" :key="`${item.label}`">
                <div class="flex flex-center">
                  <div v-if="item.type == 'budget'" class="row flex-center">
                    <span class="text-font-11 align-center">£{{item.middleStep}} per month</span>
                  </div>
                  <div v-else class="row flex-center">
                    <div v-if="item.middleStep == 'checked'" class="img-icon-check-wrapper row flex-center">
                      <img src="~assets/img/icon-tick-medium.png" />
                    </div>
                    <span v-else class="text-font-10">{{item.middleStep}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if = "kind==='cover'" :class=thirdStepStatusBoxClass>
              <div class="content-box row flex-center" v-for="item in upgradeItemList" :key="`${item.label}`">
                <div class="flex flex-center">
                  <div v-if="item.type == 'budget'" class="row flex-center">
                    <span class="text-font-11 align-center">£{{item.lastStep}} per month</span>
                  </div>
                  <div v-else class="row flex-center">
                    <div v-if="item.lastStep == 'checked'" class="img-icon-check-wrapper row flex-center">
                      <img src="~assets/img/icon-tick-medium.png" />
                    </div>
                    <span v-else class="text-font-10">{{item.lastStep}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div  class="content-footer">
            <div class="row-box row">
              <div class="info-box">
                <span class="text-font-9 row items-center"></span>
              </div>
              <div class="status-box row flex-center">
                <q-btn
                  :class=firstStepBtnUpgradeClass
                  :label=firstStepUpgradeLabel
                  @click="setUpgradeStep('first')"
                />
              </div>
              <div class="status-box row flex-center">
                <q-btn
                  :class=secondStepBtnUpgradeClass
                  :label=secondStepUpgradeLabel
                  @click="setUpgradeStep('second')"
                />
              </div>
              <div v-if = "kind==='cover'" class="status-box row flex-center">
                <q-btn
                  :class=thirdStepBtnUpgradeClass
                  :label=thirdStepUpgradeLabel
                  @click="setUpgradeStep('third')"
                />
              </div>
            </div>
          </div>
        </div>
        <div v-if="usedPage==='QuoteJourney'" class="plan-upgrade-status">
          <p class="text-font-12">You have selected basic cover only.</p>
          <p class="text-font-main" v-if="kind === 'cover'">Now you can <b>check your details</b> below, or you can continue to payment.</p>
          <q-btn
            v-if="kind === 'cover'"
            to="/QuoteJourney/payment"
            class="btn-nav bg-color-secondary"
            label="Continue to payment" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OptionalExtra',
  props: {
    usedPage: {
      type: String,
      default: 'QuoteJourney'
    },
    kind: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    initPrice: {
      type: String,
      default: '0'
    },
    upgradeItemList: {
      type: Array
    },
    selected: {
      type: Function
    }
  },
  data () {
    return {
      upgradeStep: this.$store.state.quoteJourney.coverPlan
    }
  },
  computed: {
    firstStepStatusBoxClass () {
      let className = [ 'status-box' ]
      if (this.upgradeStep === 'first') {
        className.push('selected')
      }
      return className
    },
    secondStepStatusBoxClass () {
      let className = [ 'status-box' ]
      if (this.upgradeStep === 'second') {
        className.push('selected')
      }
      return className
    },
    thirdStepStatusBoxClass () {
      let className = [ 'status-box' ]
      if (this.upgradeStep === 'third') {
        className.push('selected')
      }
      return className
    },
    firstStepBtnUpgradeClass () {
      let className = [ 'btn-upgrade' ]
      if (this.upgradeStep === 'first') {
        className.push('selected')
      }
      return className
    },
    secondStepBtnUpgradeClass () {
      let className = [ 'btn-upgrade' ]
      if (this.upgradeStep === 'second') {
        className.push('selected')
      }
      return className
    },
    thirdStepBtnUpgradeClass () {
      let className = [ 'btn-upgrade' ]
      if (this.upgradeStep === 'third') {
        className.push('selected')
      }
      return className
    },
    firstStepUpgradeLabel () {
      let labelName = this.upgradeStep === 'first' ? 'selected' : 'select'
      return labelName
    },
    secondStepUpgradeLabel () {
      let labelName = this.upgradeStep === 'second' ? 'selected' : 'select'
      return labelName
    },
    thirdStepUpgradeLabel () {
      let labelName = this.upgradeStep === 'third' ? 'selected' : 'select'
      return labelName
    }
  },
  methods: {
    setUpgradeStep (step) {
      this.upgradeStep = step
      this.$props.selected(step)
      this.$store.commit('quoteJourney/setCoverPlan', step)
    }
  }
}
</script>
<style lang="stylus">
@import '~variables'

.optional-extra-box
  .optional-extra
    margin-top 53px
  .info
    margin-top 23px
    line-height 36px
  .plan-upgrade-box
    margin-top 34px
    .plan-upgrade-detail
      .row-box
        height 50px
      .info-box
        width 31%
      .status-box
        width 20%
        margin-left 3%
      .content-header
        .row-box
          height 50px
          .most-popular
            background-color $color-main
        .car-info
          height: inherit
          .status-box
            .basic, .next-first, .next-second
              height 100%
              padding 13px 6px 11px
            .basic
              background-color $color-standard
            .next-first
              background-color #B7AA08
            .next-second
              background-color #A1B1BD
      .content-body
        .content-box
          height 50px
        .content-box:nth-child(odd)
          background-color #F7F9FD
        .info-box
          .content-box
            padding-left 10px
        .status-box.selected
          border-left 1px solid $color-standard
          border-right 1px solid $color-standard
        .text-font-9
          height 50px
      .content-footer
        .btn-upgrade
          width 100%
          height 100%
          background-color #4BC6DF
          border-radius 0
          .q-btn-inner
            color $white
            font-size 16px
            font-weight: $font-weight-regular
        .btn-upgrade.selected
          background-color $color-standard
        .row-box
          .status-box
            span
              margin-left 9px
          .status-box.doc-download
            padding-top 10px
    .plan-upgrade-status
      margin-top 52px
      .text-font-12
        margin-bottom 44px
      .text-font-main
        margin-top: 132px
        margin-bottom: 39px

.plan-upgrade-detail
  .q-btn, .upgrade-info
    text-transform uppercase
  .upgrade-info
    color $white
    font-size 16px
    font-weight: $font-weight-regular
    text-align: center
    overflow-wrap: break-word
    width 100%
@media screen and (max-width: 992px)
  .optional-extra-box
    .plan-upgrade-box
      .plan-upgrade-detail
        *
          font-size: 12px
</style>
