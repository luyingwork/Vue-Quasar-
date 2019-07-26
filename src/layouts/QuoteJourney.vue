<template>
  <q-layout view="lHh Lpr lFf" class="quote-journey">
    <!--<div class="fixed-top page-header-box row justify-between">-->
        <!--<div class="logo-box row flex-center">-->
          <!--<p class="img-icon-logo-main"></p>-->
        <!--</div>-->
      <!--<div class="navigation-box row items-center justify-end">-->
        <!--<div class="nav-page-name">-->
          <!--<span>DASHBOARD</span>-->
          <!--<span>QUOTES / RENEWALS</span>-->
          <!--<span>POLICIES</span>-->
          <!--<span>DOCUMENTS & CORRESPONDENCE</span>-->
          <!--<span>CLAIMS</span>-->
        <!--</div>-->
        <!--<div class="account-box row">-->
          <!--<p class="account-text">ACCOUNT</p>-->
          <!--<p class="drop-down">-->
          <!--<q-icon name="keyboard_arrow_down" color="standard"/>-->
        <!--</p>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<q-layout-header>-->
      <!--<q-toolbar-->
        <!--color="primary"-->
        <!--:glossy="$q.theme === 'mat'"-->
        <!--:inverted="$q.theme === 'ios'"-->
      <!--&gt;-->
        <!--<q-btn-->
          <!--flat-->
          <!--dense-->
          <!--round-->
          <!--@click="leftDrawerOpen = !leftDrawerOpen"-->
          <!--aria-label="Menu"-->
        <!--&gt;-->
          <!--<q-icon name="menu" />-->
        <!--</q-btn>-->
        <!--<div class="row flex-center">-->
          <!--<q-toolbar-title>DASHBOARD</q-toolbar-title>-->
          <!--<q-toolbar-title>QUOTES / RENEWALS</q-toolbar-title>-->
          <!--<q-toolbar-title>POLICIES</q-toolbar-title>-->
          <!--<q-toolbar-title>DOCUMENTS & CORRESPONDENCE</q-toolbar-title>-->
          <!--<q-toolbar-title>CLAIMS</q-toolbar-title>-->
        <!--</div>-->
      <!--</q-toolbar>-->
    <!--</q-layout-header>-->

    <!--<q-layout-drawer-->
      <!--side="left"-->
      <!--v-model="leftDrawerOpen"-->
      <!--:content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"-->
    <!--&gt;-->
      <!--<side-bar-->
        <!--:status="quoteJourneyStep"-->
      <!--/>-->
    <!--</q-layout-drawer>-->
    <q-page-container>
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
        :duration="300"
        @leave="resetScroll"
      >
        <div>
            <router-view />
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
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                    Nullam quis risus eget urna mollis ornare vel eu leo.
                    Aenean lacinia bibendum nulla sed consectetur.
                  </p>
                  <p class="help-caption">Vivamus sagittis lacus vel augue</p>
                  <p class="help-content">
                    Aenean lacinia bibendum nulla sed consectetur.
                    Curabitur blandit tempus porttitor. Duis mollis, est non commodo
                    luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                    Sed posuere consectetur est at lobortis.
                    Curabitur blandit tempus porttitor. Donec sed odio dui. Duis mollis,
                    est non commodo luctus, nisi erat porttitor ligula,
                    eget lacinia odio sem nec elit.
                  </p>
                  <q-btn
                    class="btn-link"
                    label="LINK TEXT"
                    />
                </div>
              </div>
            </div>
          </div>
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import {
  scroll
  // QSpinnerIos, Loading, Notify
} from 'quasar'
import SideBar from '../components/SideBar'
import '../css/app.styl'
const { getScrollTarget, getScrollHeight, setScrollPosition } = scroll

export default {
  name: 'QuoteJourney',
  components: {
    SideBar
  },
  beforeRouteEnter (to, from, next) {
    if (to.path === '/QuoteJourney' || to.path === '/QuoteJourney/') {
      next({name: 'QuestionSet'})
    } else {
      next()
    }
  },
  created () {
    // this.$router.push({name: 'QuestionSet'})
    // this.loadDataFromApi()
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      show_general_help: false,
      hideGoDownButton: false,
      quoteJourneyStep: ''
    }
  },
  computed: {
    btnGoDownClass () {
      let className = this.hideGoDownButton ? ['hidden'] : ''
      return className
    }
  },
  methods: {
    // async loadDataFromApi () {
    //   Loading.show({
    //     spinner: QSpinnerIos,
    //     message: 'Loading Data. Please wait...'
    //   })
    //   const allProducts = await this.$store.dispatch('quoteJourney/getAllProducts')
    //   allProducts.map(async product => {
    //     if (product.uniqueId === 'ModernCar') {
    //       const productPages = await this.$store.dispatch('quoteJourney/getProductPages', product.uniqueId)
    //       let questionSetList = []
    //       for (let i = 0; i < productPages.length; i++) {
    //         const questionSet = await this.$store.dispatch('quoteJourney/getQuestionSet', productPages[i])
    //         questionSetList.push(questionSet)
    //       }
    //       Loading.hide()
    //       console.log('!!!!!--DONE Load API--!!!!')
    //       this.saveQuestionSetToStore(questionSetList)
    //       console.log('!!!!!--Navigate QuestionSetVue--!!!!')
    //       this.$router.push({name: 'QuestionSet'})
    //     }
    //   })
    // },
    // saveQuestionSetToStore (questionSetList) {
    //   let i, j, k
    //   let questionSetId, questionList, questionDetailList
    //   let customQuestionSet = {}
    //   for (i = 0; i < questionSetList.length; i++) {
    //     questionSetId = questionSetList[i].questionSetId
    //     questionList = questionSetList[i].questions
    //     let customQuestionSetSub = {}
    //     for (j = 0; j < questionList.length; j++) {
    //       let customQuestionDetailList = []
    //       if (questionList[j].definedList !== null) {
    //         questionDetailList = questionList[j].definedList.definedListDetailDefinedList
    //         for (k = 0; k < questionDetailList.length; k++) {
    //           let obj = {}
    //           obj.label = questionDetailList[k].name
    //           obj.value = questionDetailList[k].uniqueId
    //           customQuestionDetailList.push(obj)
    //         }
    //       }
    //       customQuestionSetSub[questionList[j].name] = customQuestionDetailList
    //     }
    //     customQuestionSet[questionSetId] = customQuestionSetSub
    //   }
    //   this.$store.commit('quoteJourney/initQuestionSet', customQuestionSet)
    //   console.log('!!!!!--DONE SAVE TO STORE--!!!!')
    // },
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
</style>
