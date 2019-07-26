<template>
  <q-page class="row">
    <div class="side-bar col-lg-3 side-bar-container">
  <div>
      <side-bar
        :status="SideBar.status"
      />
       </div>
    </div>
      <div class="car-details col-12 col-lg-9" v-show="quoteId == ''">

    <div class="side-bar col-md-4 col-lg-3">
    </div>
    <div class="payment-confirm col-12 col-md-8 col-lg-9">
      <div class="container row items-center">
        <div class="content-main col-10">
          <div>
            <p class="text-font-8">We are sorry but you have been declined for a quote.</p>
            <p class="description text-font-9">
              <br/>
              If you have any queries about this then please contact us using livehelp</p>
          </div>
        </div>
      </div>
    </div>
         <div :class="paymentMonthlyClass" style="margin-top: 10%">
                <div >
                 <div class="row flex-center btn-box">
                  <div>
                    <q-btn
                      class="btn-custom"
                      label="Try again"
                      to="question-set"
                    />
                  </div>
                </div>
                  </div>
         </div>
        </div>
    <div class="car-details col-12 col-lg-9" v-show="quoteId !== ''">
      <div class="container">
        <div class="top-info-box row">
          <div class="icon-box row col-12">
            <div class="icon-item col-4 flex justify-center">
              <div class="img-icon-feature-wrapper feature-one row flex-center">
                <img src="~assets/img/icon-feature-1.png" />
              </div>
            </div>
            <div class="col-4 flex justify-center">
              <div class="img-icon-feature-wrapper feature-two row flex-center">
                <img src="~assets/img/icon-feature-2.png" />
              </div>
            </div>
            <div class="col-4 flex justify-center">
              <div class="img-icon-feature-wrapper feature-three row flex-center">
                <img src="~assets/img/icon-feature-3.png" />
              </div>
            </div>
            <div class="col-12 col-md-4">
              <p class="text-font-3">Low deposit available</p>
            </div>
            <div class="col-12 col-md-4">
              <p class="text-font-3">Fully self service</p>
            </div>
            <div class="col-12 col-md-4">
              <p class="text-font-3">Fantastic Features & Benefits</p>
            </div>
          </div>
          <div v-show="summary.showNCPErrorMessage == true"  class="content-box row col-12">
            <div class="annual-premium">
              <p class="text-font-4" style="text-align:center">Attention: We are unable to offer you No Claims Protection on this policy due to insufficient no claims years.</p>
              <p class="text-font-4" style="text-align:center">We have updated your premium to this affect</p>
            </div>
          </div>
          <div v-if="summary.proposer" class="content-box row col-12">
            <div class="col-12 col-md-6 annual-premium">
              <p v-if="summary.proposer" class="text-font-4">{{summary.proposer.split(' ')[0]}}, your annual premium is</p>
              <p class="text-font-5">£{{parseFloat(summary.premium).toFixed(2)}}</p>
            </div>
            <div class="col-12 col-md-6 quote-reference">
              <p class="text-font-4">Your Quote Reference is</p>
              <p class="text-font-5">{{summary.quoteReference}}</p>
            </div>
          </div>
        </div>
        <div class="payment-option-box">
          <p class="text-font-main">These are your options for payment:</p>
          <div class="payment-choice row gutter-x-lg gutter-y-sm">
            <div class="col-12 col-md-6">
              <div :class="paymentMonthlyClass">
                <div v-show="summary.payMonthly == 0" style="pointer-events: none; opacity: 0.7;">
                <p class="text-font-6 caption">Pay monthly</p>
                <p class="text-font-4">This option is not</p>
                <p class="text-font-4">available at the moment</p>
                <p class="text-font-4">for premium <b>£{{parseFloat(summary.premium).toFixed(2)}}</b></p>
                <p class="text-font-15 total-amount">Total amount payable £{{parseFloat(summary.premium).toFixed(2)}}</p>
                 <div class="row flex-center btn-box">
                  <div>
                    <div v-if="paymentOption == 'monthly'"
                         class="img-icon-check-medium-wrapper row flex-center" >
                      <img src="~assets/img/icon-tick-medium.png" />
                    </div>
                    <q-btn
                      v-else
                      class="btn-custom"
                      label="SELECT"
                      @click="setPaymentStateOption('monthly')"
                    />
                  </div>
                </div>
                  </div>
                <div v-show="summary.payMonthly != 0">
                <p class="text-font-6 caption">Pay monthly</p>
                <p class="text-font-4">{{summary.installments}} monthly payments of</p>
                <p class="text-font-6">£{{parseFloat(summary.payMonthly).toFixed(2)}}</p>
                <p class="text-font-4">+ deposit of <b>£{{summary.deposit}}</b></p>
                <p class="text-font-15 total-amount">Total amount payable £{{parseFloat(summary.payMonthlyTotal).toFixed(2)}} Representative {{summary.apr}}% APR (Variable)</p>
                <div class="row flex-center btn-box">
                  <div>
                    <div v-if="paymentOption == 'monthly'"
                         class="img-icon-check-medium-wrapper row flex-center" >
                      <img src="~assets/img/icon-tick-medium.png" />
                    </div>
                    <q-btn
                      v-else
                      class="btn-custom"
                      label="SELECT"
                      @click="setPaymentStateOption('monthly')"
                    />
                  </div>
                </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div :class="paymentFullClass">
                <p class="text-font-6 caption">Pay in full</p>
                <p class="text-font-4">One off payment of</p>
                <p class="text-font-6">£{{summary.premium}}</p>
                <p class="card-box flex justify-center">
                  <span class="img-icon-card-visa first"></span>
                  <span class="img-icon-card-master"></span>
                  <span class="img-icon-card-maestro"></span>
                  <span class="img-icon-card-amex"></span>
                </p>
                <div class="row flex-center btn-box">
                  <div>
                    <div v-if="paymentOption == 'full'"
                         class="img-icon-check-medium-wrapper row flex-center">
                      <img src="~assets/img/icon-tick-medium.png" />
                    </div>
                    <q-btn
                      v-else
                      class="btn-custom"
                      label="SELECT"
                      @click="setPaymentStateOption('full')"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <q-btn
            to="payment"
            class="btn-nav bg-color-secondary"
            label="Continue to payment"
          />
        </div>
        <div class="included-quote-box">
          <p class="text-font-4">What’s included in your quote?</p>
          <div class="included-option row gutter-x-lg gutter-y-sm">
            <div v-for="n in 2" :key="`quote-item-${n}`" class="option-item col-md-6 col-12 row justify-start items-center" >
              <div class="col-1">
                <div class="img-icon-check-wrapper row flex-center">
                  <img src="~assets/img/icon-tick-medium.png" />
                </div>
              </div>
              <div class="col-11"><p class="text-box">FREE breakdown membership</p></div>
            </div>
          </div>
        </div>
        <p class="text-font-title">Now select your optional extras</p>
        <optional-extra
          :selected="selectHire"
          :kind=optionalExtraCarInfo.kind
          usedPage="QuoteJourney"
          :title=optionalExtraCarInfo.title
          :description=optionalExtraCarInfo.description
          :initPrice=optionalExtraCarInfo.initPrice
          :upgradeItemList=optionalExtraCarInfo.upgradeItemList
        />
        <optional-extra
          :selected="selectBreakdown"
          :kind=optionalExtraCoverInfo.kind
          usedPage="QuoteJourney"
          :title=optionalExtraCoverInfo.title
          :description=optionalExtraCoverInfo.description
          :initPrice=optionalExtraCoverInfo.initPrice
          :upgradeItemList=optionalExtraCoverInfo.upgradeItemList
        />
        <div class="info-confirm-box">
          <p class="text-font-main">You have provided the following information:</p>
          <div class="clear-fix">
            <div class="info-box col-12">
              <p class="info-title text-font-8">Driver(s) Details</p>
              <ul class="info-content">
                <li class="row content-row">
                  <p class="row justify-between col-11">
                    <span class="text-font-9">Proposer:</span>
                    <span class="text-font-9">{{summary.proposer}}</span>
                  </p>
                  <p class="action-box col-1 row justify-end">
                    <q-btn icon="edit" to="/QuoteJourney/question-set"/>
                  </p>
                </li>
              </ul>
            </div>
            <div class="info-box">
              <p class="info-title text-font-8">Policy Info</p>
              <ul class="info-content">
                <li class="row content-row">
                  <p class="row justify-between col-11">
                    <span class="text-font-9">Policy start date:</span>
                    <span class="text-font-9">{{summary.startDate}}</span>
                  </p>
                  <p class="action-box col-1 row justify-end">
                    <q-btn icon="edit" to="/QuoteJourney/question-set"/>
                  </p>
                </li>
                <li class="row content-row">
                  <p class="row justify-between col-11">
                    <span class="text-font-9">Registration number:</span>
                    <span class="text-font-9">{{summary.registrationNumber}}</span>
                  </p>
                  <p class="action-box col-1 row justify-end">
                    <q-btn icon="edit" to="/QuoteJourney/question-set"/>
                  </p>
                </li>
              </ul>
            </div>
            <div class="info-box">
              <p class="info-title text-font-8">Policy Holder's Contact Details</p>
              <ul class="info-content">
                <li class="row content-row">
                  <p class="row justify-between col-11">
                    <span class="text-font-9 col-4">Address:</span>
                    <span class="text-font-9 col-8 align-right">{{summary.address}}</span>
                  </p>
                  <p class="action-box col-1 row justify-end">
                    <q-btn icon="edit" to="/QuoteJourney/question-set"/>
                  </p>
                </li>
                <li class="row content-row">
                  <p class="row justify-between col-11">
                    <span class="text-font-9">Email:</span>
                    <span class="text-font-9">{{summary.email}}</span>
                  </p>
                  <p class="action-box col-1 row justify-end">
                    <q-btn icon="edit" to="/QuoteJourney/question-set"/>
                  </p>
                </li>
                <li class="row content-row">
                  <p class="row justify-between col-11">
                    <span class="text-font-9">Phone:</span>
                    <span class="text-font-9">{{summary.tel}}</span>
                  </p>
                  <p class="action-box col-1 row justify-end">
                    <q-btn icon="edit" to="/QuoteJourney/question-set"/>
                  </p>
                </li>
              </ul>
            </div>
            <div class="info-box">
              <p class="info-title text-font-8">Excesses</p>
              <ul class="info-content">
                <li class="row content-row">
                  <p class="row justify-between col-11">
                    <span class="text-font-9">Voluntary:</span>
                    <span class="text-font-9">£{{summary.excessVoluntary}}</span>
                  </p>
                  <p class="action-box col-1 row justify-end">
                    <q-btn class="img-icon-edit" to="/QuoteJourney/question-set"/>
                  </p>
                </li>
                <li class="row content-row">
                  <p class="row justify-between col-11">
                    <span class="text-font-9">Compulsory:</span>
                    <span class="text-font-9">£{{summary.compulsary}}</span>
                  </p>
                  <p class="action-box col-1 row justify-end">
                    <q-btn icon="edit" to="/QuoteJourney/question-set"/>
                  </p>
                </li>
                <li class="row content-row">
                  <p class="row justify-between col-11">
                    <span class="text-font-9">Total:</span>
                    <span class="text-font-9">£{{summary.total}}</span>
                  </p>
                  <p class="action-box col-1 row justify-end">
                    <q-btn icon="edit" to="/QuoteJourney/question-set" />
                  </p>
                </li>
              </ul>
            </div>
            <div class="info-box">
              <div class="info-title text-font-8 row items-center">
                <p class="col-8"><span>Insurer Policy Documents</span></p>
                <p class="col-4 row justify-end"></p>
              </div>
              <ul class="info-content">
                <li class="row content-row" v-for="doc in summary.policyDocs" :key="doc">
                  <p class="row justify-between items-center col-11">
                    <span class="text-font-9">{{doc.name}}</span>
                  </p>
                  <p class="action-box col-1 row justify-end">
                    <q-btn class="img-icon-download" @click="download(doc.url)"/>
                  </p>
                </li>
              </ul>
            </div>
            <div class="info-box">
              <div class="info-title text-font-8 row items-center">
                <p class="col-8"><span>Policy Broker Documents</span></p>
                <p class="col-4 row justify-end"><span class="img-icon-logo-yoga"></span></p>
              </div>
              <ul class="info-content">
                <li class="row content-row" v-for="doc in summary.brokerDocs" :key="doc">
                  <p class="row justify-between items-center col-11">
                    <span class="text-font-9">{{doc.name}}</span>
                  </p>
                  <p class="action-box col-1 row justify-end">
                    <q-btn class="img-icon-download" @click="download(doc.url)"/>
                  </p>
                </li>
              </ul>
            </div>
            <div class="info-box full-width">
              <div class="info-title text-font-8 row items-center">
                <p class="col-8"><span>Endorsements</span></p>
                <p class="col-4 row justify-end"></p>
              </div>
              <ul class="info-content">
                <li class="row content-row" v-for="endorsement in summary.endorsements" :key="endorsement.endorsementReferenceCode">
                  <p class="row justify-between items-center col-12">
                    <span class="text-font-8">{{endorsement.endorsementReferenceCode}}</span>
                  </p>
                  <p class="action-box col-12 row justify-end">
                    <span class="text-font-9">{{endorsement.text}}</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div class="btn-box-wrapper">
            <q-btn
              to="payment"
              class="btn-nav"
              label="Continue to payment"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import '../css/app.styl'
import '../css/car-details.styl'
import ImageBox from '../components/ImageBox'
import SideBar from '../components/SideBar'
import Services from '../services/'
import OptionalExtra from 'src/components/OptionalExtra'
import optionalExtraData from 'src/assets/data/optional-extras'

export default {
  components: {
    SideBar,
    ImageBox,
    OptionalExtra
  },
  data () {
    return {
      hire: '55',
      breakdown: '54',
      SideBar: {
        status: 'second'
      },
      optionalExtraData
      // paymentOption: ''
    }
  },
  computed: {
    quoteId: {
      get () { return this.$store.state.quoteJourney.quoteId },
      set (val) { this.$store.commit('quoteJourney/setQuoteId', val) }
    },
    summary: {
      get () { return this.$store.state.quoteJourney.summary },
      set (val) { this.$store.commit('quoteJourney/setSummary', val) }
    },
    optionalExtraCarInfo () {
      return this.optionalExtraData.car
    },
    optionalExtraCoverInfo () {
      return this.optionalExtraData.cover
    },
    paymentOption: {
      get () { return this.$store.state.quoteJourney.paymentOption },
      set (val) { this.$store.commit('quoteJourney/setPaymentOption', val) }
    },
    paymentMonthlyClass () {
      let defaultClass = ['content-box', 'monthly']
      if (this.paymentOption === 'monthly') {
        defaultClass.push('selected')
      }
      return defaultClass
    },
    paymentFullClass () {
      let defaultClass = ['content-box', 'full']
      if (this.paymentOption === 'full') {
        defaultClass.push('selected')
      }
      return defaultClass
    }
  },
  created () {
    this.loadDataFromApi()
    // this.setDefaultQuestionSet()
  },
  methods: {
    download (url) {
      window.location = url
    },
    selectBreakdown (id) {
      if (id === 'first') {
        this.$data.breakdown = '54'
      }
      if (id === 'second') {
        this.$data.breakdown = '53'
      }
      this.$q.loading.show()
      Services.getQuoteFromID(this.$store.state.quoteJourney.quoteId, [this.$data.hire, this.$data.breakdown]).then(result => {
        this.$store.commit('quoteJourney/setSummary', result)
        this.$q.loading.hide()
      }, error => {
        console.debug(error)
        this.$q.loading.hide()
      })
    },
    selectHire (id) {
      if (id === 'first') {
        this.$data.hire = '55'
      }
      if (id === 'second') {
        this.$data.hire = '56'
      }
      if (id === 'third') {
        this.$data.hire = '57'
      }
      this.$q.loading.show()
      Services.getQuoteFromID(this.$store.state.quoteJourney.quoteId, [this.$data.hire, this.$data.breakdown]).then(result => {
        this.$store.commit('quoteJourney/setSummary', result)
        this.$q.loading.hide()
      }, error => {
        console.debug(error)
        this.$q.loading.hide()
      })
    },
    makePayment () {
      var mpaymonthly = {
        'quoteNumber': '9546673',
        'depositPaymentTypeMethod': 'CardPayment',
        'depositAmount': '165.61',
        'creditCard': {
          'name': 'Testy McTester',
          'cardType': '2',
          'cardNumber': '5555555555554444',
          'cardExpiryMonth': '01',
          'cardExpiryYear': '20',
          'cvv': '123'
        },
        'directDebit': {
          'bankName': 'ExampleName',
          'sortCode': '200000',
          'accNo': '44111144',
          'accountHolderName': 'Example Name'
        },
        'billingAddress': {
          'addressLine1': '123 Test St',
          'addressLine2': 'Test Town',
          'addressLine3': 'Testshire',
          'addressPostcode': 'TE5 7ER'
        },
        'paymentType': 'DirectDebit'
      }
      var paymfull = {
        'quoteNumber': '9546679',
        'singlePaymentTypeMethod': 'CardPayment',
        'singlePaymentAmount': '828.05',
        'creditCard': {
          'name': 'Testy McTester',
          'cardType': '2',
          'cardNumber': '5555555555554444',
          'cardExpiryMonth': '01',
          'cardExpiryYear': '20',
          'cvv': '123'
        },
        'billingAddress': {
          'addressLine1': '123 Test St',
          'addressLine2': 'Test Town',
          'addressLine3': 'Testshire',
          'addressPostcode': 'TE5 7ER'
        },
        'paymentType': 'CardPayment'
      }
      Services.makePayment(this.$store.state.quoteJourney.paymentOption === 'full' ? paymfull : mpaymonthly).then(success => {
        alert(success)
      })
    },
    setPaymentStateOption (val) {
      this.$store.commit('quoteJourney/setPaymentOption', val)
    },
    async loadDataFromApi () {
      if (window.location.href.indexOf('?id=') !== -1) {
        this.$store.state.quoteJourney.quoteId = window.location.href.substr(window.location.href.indexOf('?id=')).replace('?id=', '')
      }
      if (this.$store.state.quoteJourney.quoteId === '') {
        return
      }
      this.$q.loading.show()
      Services.getQuoteFromID(this.$store.state.quoteJourney.quoteId, [this.$data.hire, this.$data.breakdown]).then(result => {
        this.$store.commit('quoteJourney/setSummary', result)
        this.$q.loading.hide()
        this.$data.policyDocs = result.policyDocs
        this.$data.brokerDocs = result.brokerDocs
      }, error => {
        console.debug(error)
        this.$q.loading.hide()
        this.$q.notify('Invalid quoteId provided. Please check and try again')
        this.$store.state.quoteJourney.quoteId = null
      })
    }
  }
}
</script>
