<template>
  <div class="side-bar-content">
    <div v-if="sideBarType==='quoteJourney'" class="side-quote">
      <div class="bg-img-box">
        <div class="logo-box row flex-center">
          <p class="img-icon-logo-main"></p>
        </div>
        <div class="status-box row justify-center">
          <div class="status-bar-box">
            <div :class="statusBarStartClass"></div>
            <div class="row items-center">
              <div :class="statusMarkFirstClass">
                <img v-if="this.getStatus !== 'first'" src="~assets/img/icon-tick-large.png"  />
                <span v-else class="mark-number">1</span>
              </div>
              <p :class="statusLabelFirstClass">Car details</p>
            </div>
            <div :class="statusBarIntervalFirstClass"></div>
            <div class="row items-center">
              <div :class="statusMarkSecondClass">
                <img v-if="this.getStatus === 'third' | this.getStatus === 'last'" src="~assets/img/icon-tick-large.png"  />
                <span v-else class="mark-number">2</span>
              </div>
              <p :class="statusLabelSecondClass">Your Quote</p>
            </div>
            <div :class="statusBarIntervalSecondClass"></div>
            <div class="row items-center">
              <div :class="statusMarkThirdClass">
                <img img v-if="this.getStatus === 'last'" src="~assets/img/icon-tick-large.png" />
                <span v-else class="mark-number">3</span>
              </div>
              <p :class="statusLabelThirdClass">Payment</p>
            </div>
            <div :class="statusBarEndClass"></div>
          </div>
        </div>
      </div>
      <div class="estimated-time-box row flex-center">
        <div class="row flex-center">
          <span class="img-icon-clock"></span>
          <span class="description">Estimated time to complete: 3 minutes</span>
        </div>
      </div>
    </div>
    <div v-if="sideBarType==='policyChange'" class="side-policy">
      <div class="bg-img-box justify-center row">
        <div class="status-box justify-center row col-12 col-xl-10">
          <div class="status-bar-box">
            <div :class="statusBarStartClass"></div>
            <div class="row items-center">
              <div :class="statusMarkFirstClass">
                <span class="mark-number">1</span>
              </div>
              <p :class="statusLabelFirstClass">Policy details</p>
            </div>
            <div :class="statusBarIntervalFirstClass"></div>
            <div class="row items-center">
              <div :class="statusMarkSecondClass">
                <span class="mark-number">2</span>
              </div>
              <p :class="statusLabelSecondClass">Excesses</p>
            </div>
            <div :class="statusBarIntervalSecondClass"></div>
            <div class="row items-center">
              <div :class="statusMarkThirdClass">
                <span class="mark-number">3</span>
              </div>
              <p :class="statusLabelThirdClass">Endorsements</p>
            </div>
            <div :class="statusBarEndClass"></div>
          </div>
        </div>
        <div class="estimated-time-box row items-center col-12 col-xl-10">
          <div class="row justify-center items-center">
            <span class="img-icon-clock"></span>
            <span class="description">Estimated time to complete: 3 minutes</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../css/app.styl'
import '../css/side-bar.styl'

export default {
  name: 'StatusLine',
  props: {
    sideBarType: {
      type: String,
      default: 'quoteJourney'
    },
    status: {
      type: String
    }
  },
  computed: {
    statusBar () {
      return 'status-bar'
    },
    getStatus () {
      return this.status
    },
    statusBarStartClass () {
      let className = [ this.statusBar, 'status-bar-start', 'completed' ]
      return className
    },
    statusBarIntervalFirstClass () {
      let className = [ this.statusBar, 'status-bar-interval' ]
      if (this.status !== 'first') {
        className.push('completed')
      }
      return className
    },
    statusBarIntervalSecondClass () {
      let className = [ this.statusBar, 'status-bar-interval' ]
      if (this.status === 'third' | this.status === 'last') {
        className.push('completed')
      }
      return className
    },
    statusBarEndClass () {
      let className = [ this.statusBar, 'status-bar-end' ]
      return className
    },
    statusMarkFirstClass () {
      let className = ['row', 'flex-center', 'status-mark-box']
      if (this.status === 'first') {
        className.push('selected')
      } else {
        className.push('completed')
      }
      return className
    },
    statusMarkSecondClass () {
      let className = ['row', 'flex-center', 'status-mark-box']
      if (this.status === 'second') {
        className.push('selected')
      }
      if (this.status === 'third' | this.status === 'last') {
        className.push('completed')
      }
      return className
    },
    statusMarkThirdClass () {
      let className = ['row', 'flex-center', 'status-mark-box']
      if (this.status === 'third') {
        className.push('selected')
      }
      if (this.status === 'last') {
        className.push('completed')
      }
      return className
    },
    statusLabelFirstClass () {
      let className = ['status-label', 'selected']
      return className
    },
    statusLabelSecondClass () {
      let className = ['status-label']
      if (this.status !== 'first') {
        className.push('selected')
      }
      return className
    },
    statusLabelThirdClass () {
      let className = ['status-label']
      if (this.status === 'third' | this.status === 'last') {
        className.push('selected')
      }
      return className
    }
  }
}
</script>

<style>
</style>
