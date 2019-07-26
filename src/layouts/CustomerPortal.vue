<template>
  <q-layout view="lHh Lpr lFf" class="customer-portal">
    <q-layout-header>
      <div class="page-header-box row justify-between items-center">
        <div class="logo-box row flex-center">
          <p v-if="authenticated" class="img-icon-logo-main clickable" @click="navigateToDashboard()"></p>
          <p v-else class="img-icon-logo-main"></p>
        </div>
        <div class="toolbar-action-box">
          <div v-if="authenticated" class="navigation-box row items-center justify-end">
            <div class="nav-page-name">
              <q-tabs>
                <q-route-tab
                  default="default"
                  class="padding-horizontal-main"
                  slot="title" label="DASHBOARD"
                  to="/dashboard" />
                <q-route-tab
                  class="padding-horizontal-main"
                  slot="title" label="QUOTES"
                  to="/quotes"/>
                <q-route-tab
                  class="padding-horizontal-main"
                  slot="title" label="POLICIES"
                  to="/policies"/>
                <q-route-tab
                  class="padding-horizontal-main"
                  slot="title" label="DOCUMENTS"
                  to="/documents"/>
                <q-route-tab
                  class="padding-horizontal-main"
                  slot="title" label="CLAIMS"
                  to="/claims"/>
              </q-tabs>
            </div>
            <div class="header-action-btn-box row">
              <div class="account-box margin-right-20">
                <div class="title-box row justify-between items-center" @click="showMenu=!showMenu">
                  <p class="account-text">ACCOUNT</p>
                  <p class="drop-down row flex-center">
                    <q-icon v-if="showMenu" name="keyboard_arrow_up" color="standard"/>
                    <q-icon v-else name="keyboard_arrow_down" color="standard"/>
                  </p>
                </div>
                <div v-if="showMenu">
                  <p class="separator"></p>
                  <p @click="showMenu=false"><a href="#/account" class="account-text">EDIT</a></p>
                  <p class="log-out" @click="logout"><a class="account-text">LOG OUT</a></p>
                </div>
              </div>
              <div class="live-chat-box row flex-center">
                <p><a @click="liveChat" class="account-text">LIVE CHAT</a></p>
              </div>
            </div>
          </div>
          <div v-else class="row items-center">
            <p class="text-font-11 font-weight-none white">HELP</p>
          </div>
        </div>
        <div class="toolbar-menu-btn">
          <q-btn
            flat round dense
            icon="menu"
            class="white"
            @click="left=!left" />
        </div>
      </div>
    </q-layout-header>
    <q-page-container>
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
        :duration="300"
        @leave="resetScroll">
        <router-view />
      </transition>
    </q-page-container>
    <div class="page-footer-box">
      <div class="page-footer-separator"></div>
      <div class="page-footer-content row justify-between">
        <div class="useful-link col-12 col-md-6">
          <p><span class="text-font-16 font-weight-bold">Useful Links</span></p>
          <p class="margin-top-main"><span class="text-font-11 white font-weight-none">Home</span></p>
          <p class="margin-top-main"><span class="text-font-11 white font-weight-none">Policy Documents</span></p>
        </div>
        <div class="col-12 col-md-6">
          <div class="social-icon-box"></div>
          <div class="sign-up-box">
            <p class="description text-font-16 font-weight-bold white">Sign up for industry alerts, news and insights from Yoga Insurance</p>
            <p class="label white">EMAIL ADDRESS</p>
            <q-input
              type="email"
              autofocus
              hide-underline
              class="full-width"
              v-model="contactEmailAddress"
            />
            <div class="separator"></div>
            <q-btn
              class="btn-main btn-sign-up bg-color-main white"
              label="SIGN UP"
            />
          </div>
        </div>
      </div>
      <div class="page-footer-end row justify-between items-center">
        <p>
          <span class="item-box-text-first white">
            © 2018 Yoga Insurance. All rights reserved.
          </span>
        </p>
        <p>
          <span class="item-box-text-first white margin-right-20">Terms of use</span>
          <span class="item-box-text-first white margin-right-20">Privacy Policy</span>
          <span class="item-box-text-first white margin-right-20">Cookies Policy</span>
          <span class="item-box-text-first white">FAQs</span>
        </p>
      </div>
    </div>
    <div class="other-box">
      <q-scroll-observable @scroll="userHasScrolled" />
      <div class="fixed-button-box">
        <q-page-sticky position="bottom-right" :offset="[20, 130]">
          <q-btn
            v-back-to-top.animate="{offset: 600, duration: 600}"
            class="img-icon-prev btn-prev"
          />
        </q-page-sticky>
        <q-page-sticky position="bottom-right" :offset="[20, 80]">
          <q-btn
            :class="btnGoDownClass"
            @click="goToPageEnd"
            class="img-icon-next btn-next"
          />
        </q-page-sticky>
        <q-page-sticky position="bottom-right" :offset="[20, 30]">
          <q-btn
            @click="show_general_help = true"
            class="img-icon-general-help btn-general-help"
          />
        </q-page-sticky>
      </div>
      <div v-if="show_general_help" class="general-help-box fullscreen">
        <div class="row justify-end">
          <div class="btn-wrapper-box btn-close">
            <q-btn
              @click="show_general_help = false"
              class="img-icon-close"
            />
          </div>
        </div>
        <div class="row flex-center">
          <div class="col-10 help-content-box">
            <p class="help-caption">Need some help?</p>
            <p class="help-content">
            </p>
            <p class="help-caption"></p>
            <p class="help-content">
            </p>
            <q-btn
              class="btn-link"
              label="LINK TEXT"
            />
          </div>
        </div>
      </div>
    </div>
    <q-layout-drawer
      side="left"
      v-model="left"
      :overlay="leftOverlay"
      :behavior="leftBehavior"
      :breakpoint="leftBreakpoint"
    >
      <q-scroll-area class="fit bg-color-secondary">
        <q-list-header class="white row flex-center">MENU</q-list-header>
        <q-item to="/dashboard">
          <q-item-main label="DASHBOARD" class="white" />
        </q-item>
        <q-item to="/quotes">
          <q-item-main label="QUOTES" class="white" />
        </q-item>
        <q-item to="/policies">
          <q-item-main label="POLICIES" class="white" />
        </q-item>
        <q-item to="/documents">
          <q-item-main label="DOCUMENTS" class="white" />
        </q-item>
        <q-item to="/claims">
          <q-item-main label="CLAIMS" class="white" />
        </q-item>
        <q-item to="/account">
          <q-item-main label="ACCOUNT" class="white" />
        </q-item>
        <q-item @click.native="liveChat" class="row flex-center">
          <div class="live-chat-box">
            <p class="account-text">LIVE CHAT</p>
          </div>
        </q-item>
        <q-item @click.native="logout">
          <q-item-main label="LOG OUT" class="white"  />
        </q-item>
      </q-scroll-area>
    </q-layout-drawer>
  </q-layout>
</template>

<script>
import {
  scroll
} from 'quasar'
const { getScrollTarget, getScrollHeight, setScrollPosition } = scroll
import '../css/app.styl'
import '../css/customer-portal.styl'
import Services from 'src/services/'
export default {
  name: 'CustomerPortal',
  components: {
  },
  data () {
    return {
      showMenu: false,
      left: true,
      leftOverlay: false,
      leftBehavior: 'default',
      leftBreakpoint: 9999,
      authenticated: false,
      leftDrawerOpen: this.$q.platform.is.desktop,
      show_general_help: false,
      hideGoDownButton: false,
      quoteJourneyStep: '',
      contactEmailAddress: ''
    }
  },
  computed: {
    btnGoDownClass () {
      let className = this.hideGoDownButton ? ['hidden'] : ''
      return className
    }
  },
  created () {
    this.$router.push({name: 'Home'})
  },
  beforeUpdate () {
    this.authenticated = this.$store.state.customerPortal.authenticated
    // console.log('bbb')
  },
  methods: {
    liveChat () {
      window.open('https://v4in1-ti.click4assistance.co.uk/DefaultChat.aspx?AccGUID=41fbfa80-42d8-4cfa-a824-8dfd64274aff&ScriptID=12&ToolType=1&PushD={%22Email%22:%22jill.stephens@click4assistance.co.uk%22}', '_blank', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=450,height=550')
    },
    navigateToDashboard () {
      this.$router.push({name: 'Dashboard'})
    },
    logout () {
      debugger
      console.log('logout')
      debugger
      localStorage.setItem('username', '')
      localStorage.setItem('password', '')
      this.$store.commit('customerPortal/setUser', null)
      this.$store.commit('customerPortal/setAuthentication', false)
      this.$router.push('/index')
      Services.logout().then(fnc => {
        try {
          this.$store.commit('customerPortal/setUser', null)
          this.$store.commit('customerPortal/setAuthentication', false)
        } catch (ex) {
        }
        this.$router.push('/index')
      }, error => {
        console.log(error)
        try {
          localStorage.setItem('username', '')
          localStorage.setItem('password', '')
          this.$store.commit('customerPortal/setUser', null)
          this.$store.commit('customerPortal/setAuthentication', false)
        } catch (ex) {
        }
        this.$router.push('/index')
      })
    },
    goToPageEnd () {
      let domElement = document.querySelector('.q-layout')
      let scrollTargetDomElement = getScrollTarget(domElement)
      let scrollHeight = getScrollHeight(domElement)
      setScrollPosition(scrollTargetDomElement, scrollHeight, 600)
    },
    resetScroll (el, done) {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      done()
    },
    userHasScrolled (scroll) {
      let windowHeight = window.innerHeight
      let domElement = document.querySelector('.q-layout')
      let scrollHeight = getScrollHeight(domElement)
      let delta = windowHeight + 376
      if (scroll.position > scrollHeight - delta - 10) {
        this.hideGoDownButton = true
      } else {
        this.hideGoDownButton = false
      }
    }
  }
}
</script>

<style>
  .clickable { cursor: pointer; }
</style>
