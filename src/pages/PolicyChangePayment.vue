<template>
  <q-page class="row">
    <div class="side-bar col-md-4 col-lg-3 side-bar-container">
          <div>
      <side-bar
        :status="SideBar.status"
      />
       </div>
    </div>
    <div class="payment col-12 col-md-8 col-lg-9">
      <div class="container">
        <div class="email-address">
          <p class="text-font-9">We will email your policy documentation to</p>
          <div class="row">
            <div class="row justify-between items-center">
              <!--<p class="text-font-13 ">email@email.com</p>-->
              <q-input
                type="email"
                v-model="emailAddress"
                hide-underline
                :disable="editEmail"
                placeholder="email@address.com"
                class="col-11"
              />
            </div>
            <div class="row items-center">
              <q-btn
                icon="edit"
                @click="editEmail = !editEmail"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-lg-7">
            <div class="previous-cards col-12 col-lg-5 row">
              <div class="col-12 col-lg-10">
                <p class="text-font-main">
                  Select your card
                </p>
                <ul class="previous-cards">
                  <li class="first row">
                    <span class="text-font-9 col-6">Your cards</span>
                    <span class="text-font-9 col-3">Name on card</span>
                    <span class="text-font-9 col-3">Expiry date</span>
                  </li>
                  <template v-for="card in cards">
                    <li class="row justify-between" :key="card.id">
                      <span class="info-label col-6"><q-radio v-model="selectedCard" :label="card.display" :val="card.id" /> </span>
                      <span class="info-value col-3">{{card.nameOnCard}}</span>
                      <span class="info-value col-3">{{card.expiry}}</span>
                    </li>
                  </template>
                  <li @click="addNewCard">
                    <q-btn round :loading='addingNewCard' icon="add">
                      <q-icon name="done" slot="loading"/>
                    </q-btn>
                    <a>Add new card</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="car-holder-details" v-if="addingNewCard">
              <p class="text-font-8 margin-top-53">Add new credit / debit card</p>
              <p class="text-font-9 margin-top-main">
                Please enter your credit / debit card account details for the one-off payment of £{{summary.calculatedTotalPremiumInclIPTAndFees}}.
              </p>
              <div class="card-box">
                <p class="text-font-9">Name on card</p>
                <div class="input-wrapper-box row items-center justify-between">
                  <q-input
                    hide-underline
                    placeholder="Mr George Owens"
                    v-model="nameOnCard"
                  />
                  <help-icon />
                </div>
                <p class="text-font-9 margin-top-41">Card number</p>
                <div class="input-wrapper-box row items-center justify-between">
                  <q-input
                    type="number"
                    hide-underline
                    placeholder="0000 0000 0000 0000"
                    v-model="cardNumber"
                  />
                  <help-icon />
                </div>
                <p class="text-font-9 margin-top-41">Expiry month</p>
                <div class="input-wrapper-box row items-center justify-between">
                  <q-input
                    hide-underline
                    placeholder="01"
                    v-model="expiryMonth"
                  />
                  <help-icon />
                </div>
                   <p class="text-font-9 margin-top-41">Expiry year</p>
                <div class="input-wrapper-box row items-center justify-between">
                  <q-input
                    hide-underline
                    placeholder="01"
                    v-model="expiryYear"
                  />
                  <help-icon />
                </div>
                <p class="text-font-9 margin-top-41">CVV</p>
                <div class="input-wrapper-box row items-center justify-between">
                  <q-input
                    type="number"
                    hide-underline
                    placeholder="123"
                    v-model="cvv"
                  />
                  <help-icon />
                </div>
              </div>
            </div>
            <div class="billing-address">
              <p class="text-font-main">Is your <b>billing address different from your registered address</b>?</p>
              <div class="row items-center margin-top-35">
                <q-btn-toggle
                  class="btn-toggle-standard"
                  @click="nonStandardAddress"
                  v-model="addBillingAddress"
                  :options="[
                      {label: 'Yes', value: 'yes'},
                      {label: 'No', value: 'no'},
                    ]"
                />
                <help-icon />
              </div>
              <div v-show="addBillingAddress === 'yes'">
              <div class="address-box">
                <p class="text-font-9">Billing address line 1</p>
                <div class="input-wrapper-box row items-center justify-between">
                  <q-input
                    hide-underline
                    placeholder="Apartment 16"
                    v-model="firstLine"
                  />
                  <help-icon />
                </div>
                <p class="text-font-9 margin-top-41">Billing address line 2</p>
                <div class="input-wrapper-box row items-center justify-between">
                  <q-input
                    hide-underline
                    placeholder="Park Lodge 7-9"
                    v-model="secondLine"
                  />
                  <help-icon />
                </div>
                <p class="text-font-9 margin-top-41">Billing address line 3</p>
                <div class="input-wrapper-box row items-center justify-between">
                  <q-input
                    hide-underline
                    v-model="thirdLine"
                  />
                  <help-icon />
                </div>
                <p class="text-font-9 margin-top-41">Billing address town / city</p>
                <div class="input-wrapper-box row items-center justify-between">
                  <q-input
                    hide-underline
                    placeholder="Manchester"
                    v-model="city"
                  />
                  <help-icon />
                </div>
                <p class="text-font-9 margin-top-41">Billing address post code</p>
                <div class="input-wrapper-box row items-center justify-between">
                  <q-input
                    type="text"
                    hide-underline
                    placeholder="M16 8NZ"
                    v-model="postCode"
                  />
                  <help-icon />
                </div>
              </div>
              </div>
              <div class="row items-center">
                <p class="text-font-8 col-10">Documents are usually sent via email</p>
                <p class="col-2 row justify-end"><span class="img-icon-help"></span></p>
              </div>
              <div class="row items-center email-free">
                <q-checkbox
                  class="custom-check"
                  v-model="freeEmail"
                />
                <span class="text-font-9">Email - FREE - Please allow 24 to 48 hours</span>
              </div>
              <a href="#" class="text-font-3">
                Click here if you want to learn about alternative methods of sending your documents
              </a>
            </div>
          </div>
          <div class="payment-summary col-12 col-lg-5 row justify-end">
            <div class="col-12 col-lg-10">
                <ul class="payment-summary">
                  <li class="first">
                    <span class="text-font-8">Payment Summary</span>
                  </li>
                  <li class="row justify-between" v-if="!summary.isCancelPending">
                    <span class="info-label col-8">Total premium:</span>
                    <span class="info-value col-4">£{{summary.newInsurerAnnual}}</span>
                  </li>
                  <li class="row justify-between" v-if="!summary.isCancelPending">
                    <span class="info-label col-8">Additional products:</span>
                    <span class="info-value col-4">£{{summary.vapTotal}}</span>
                  </li>
                  <li class="row justify-between" v-if="!summary.isCancelPending">
                    <span class="info-label col-8">MTA Fee:</span>
                    <span class="info-value col-4">£{{summary.feesTotal}}</span>
                  </li>
                  <li class="total-payment">
                    <p class="first">Total amount payable</p>
                    <p class="second">£{{summary.calculatedTotalPremiumInclIPTAndFees}}</p>
                    <p class="last" v-if="!summary.isCancelPending">Including fees and discounts</p>
                  </li>
                </ul>
              <div class="img-secured-box">
                <img src="~assets/img/secured-by-ssl.png" class="full-width" />
              </div>
            </div>
          </div>
        </div>
        <div class="action-btn-box">
          <q-btn
            to="policies/change/second"
            class="btn-standard margin-right-20"
            label="Return to quote details"
          />
          <q-btn
            @click="makePolicyChangePayment"
            class="btn-nav" label="Buy Policy"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import '../css/app.styl'
import '../css/payment.styl'
import ImageBox from '../components/ImageBox'
import HelpIcon from '../components/HelpIcon'
import SideBar from '../components/SideBar'
import Services from '../services/'
export default {
  components: {
    ImageBox,
    HelpIcon,
    SideBar
  },
  computed: {
    paymentOption: {
      get () { return this.$store.state.policyChange.paymentOption },
      set (val) { this.$store.commit('policyChange/setPaymentOption', val) }
    },
    summary: {
      get () { return this.$store.state.policyChange.mtaQuoteResultSummary.quoteDetails },
      set (val) { this.$store.commit('policyChange/setSummary', val) }
    },
    emailAddress: {
      get () { return this.$store.state.policyChange.emailAddress },
      set (val) { this.$store.commit('policyChange/setEmailAddress', val) }
    },
    addBillingAddress: {
      get () { return this.$store.state.policyChange.addBillingAddress },
      set (val) { this.$store.commit('policyChange/setAddBillingAddress', val) }
    },
    nameOnCard: {
      get () { return this.$store.state.policyChange.nameOnCard },
      set (val) { this.$store.commit('policyChange/setNameOnCard', val) }
    },
    cardNumber: {
      get () { return this.$store.state.policyChange.cardNumber },
      set (val) { this.$store.commit('policyChange/setCardNumber', val) }
    },
    expiryYear: {
      get () { return this.$store.state.policyChange.expiryYear },
      set (val) { this.$store.commit('policyChange/setExpiryYear', val) }
    },
    expiryMonth: {
      get () { return this.$store.state.policyChange.expiryMonth },
      set (val) { this.$store.commit('policyChange/setExpiryMonth', val) }
    },
    cvv: {
      get () { return this.$store.state.policyChange.cvv },
      set (val) { this.$store.commit('policyChange/setCvv', val) }
    },
    firstLine: {
      get () { return this.$store.state.policyChange.billingAddress.firstLine },
      set (val) { this.$store.commit('policyChange/setBillingAddressFirst', val) }
    },
    secondLine: {
      get () { return this.$store.state.policyChange.billingAddress.secondLine },
      set (val) { this.$store.commit('policyChange/setBillingAddressSecond', val) }
    },
    thirdLine: {
      get () { return this.$store.state.policyChange.billingAddress.thirdLine },
      set (val) { this.$store.commit('policyChange/setBillingAddressThird', val) }
    },
    city: {
      get () { return this.$store.state.policyChange.billingAddress.city },
      set (val) { this.$store.commit('policyChange/setBillingAddressCity', val) }
    },
    postCode: {
      get () { return this.$store.state.policyChange.billingAddress.postCode },
      set (val) { this.$store.commit('policyChange/setBillingAddressPostCode', val) }
    },
    freeEmail: {
      get () { return this.$store.state.policyChange.freeEmail },
      set (val) { this.$store.commit('policyChange/setFreeEmail', val) }
    },
    accountName: {
      get () { return this.$store.state.policyChange.bank.accountName },
      set (val) { this.$store.commit('policyChange/setAccountName', val) }
    },
    bankName: {
      get () { return this.$store.state.policyChange.bank.bankName },
      set (val) { this.$store.commit('policyChange/setBankName', val) }
    },
    accountNumber: {
      get () { return this.$store.state.policyChange.bank.accountNumber },
      set (val) { this.$store.commit('policyChange/setAccountNumber', val) }
    },
    sortCode: {
      get () { return this.$store.state.policyChange.bank.sortCode },
      set (val) { this.$store.commit('policyChange/setSortCode', val) }
    },
    quoteId: {
      get () { return this.$store.state.policyChange.quoteId },
      set (val) { this.$store.commit('policyChange/setQuoteId', val) }
    },
    selectedCard: {
      get () { return this.selectedCardValue },
      set (val) { this.selectedCardValue = val }
    },
    policyNumber () {
      return this.$store.state.customerPortal.policyNumber
    },
    addingNewCard () {
      return !this.selectedCard
    }
  },
  created () {
    Services.getPreviousCards(this.policyNumber)
      .then((cards) => {
        this.$data.cards = cards.map((card) => {
          return {
            id: card.cardId,
            display: card.customerDisplay,
            expiry: card.expiry,
            nameOnCard: card.name
          }
        })
      }, (err) => {
        console.warn(err)
      })
  },
  methods: {
    nonStandardAddress () {
      this.$data.nonStandard = !this.$data.nonStandard
    },
    makePolicyChangePayment () {
      let cardSelected = this.selectedCard ? { cardId: this.selectedCard } : null

      var paymfull = {
        'quoteNumber': this.$store.state.policyChange.mtaQuoteResultSummary.quoteDetails.mtaQuoteID,
        'singlePaymentTypeMethod': 'CardPayment',
        'singlePaymentAmount': this.$store.state.policyChange.mtaQuoteResultSummary.quoteDetails.calculatedTotalPayable,
        'creditCard': {
          'name': this.nameOnCard,
          'cardType': '2',
          'cardNumber': this.cardNumber,
          'cardExpiryMonth': this.expiryMonth,
          'cardExpiryYear': this.expiryYear,
          'cvv': this.cvv
        },
        'existingCard': cardSelected,
        'billingAddress': {
          'addressLine1': this.$data.nonStandard ? this.$store.state.policyChange.address.line1 : this.firstLine,
          'addressLine2': this.$data.nonStandard ? this.$store.state.policyChange.address.line1 : this.secondLine,
          'addressLine3': this.$data.nonStandard ? this.$store.state.policyChange.address.county : this.thirdLine,
          'addressPostcode': this.$data.nonStandard ? this.$store.state.policyChange.postCode : this.postCode
        },
        'paymentType': 'CardPayment',
        'reasonForChange': this.$store.state.policyChange.reasonForChange
      }
      this.$q.loading.show()
      if (this.summary.isCancelPending) {
        Services.cancelPendingChangePayment({policyNumber: this.policyNumber, payment: paymfull}).then(this.confirmCancelPayment, this.paymentError)
      } else {
        Services.makePolicyChangePayment(paymfull).then(this.confirmPayment, this.paymentError)
      }
    },
    confirmCancelPayment (success) {
      this.$q.loading.hide()
      if (success.result) {
        this.$store.commit('policyChange/setCompletedPolicyChangeCancelled', success.data.policyNumber)
        this.$router.push({name: 'ConfirmCancelChange'})
      } else {
        this.$q.notify('We could not process your payment. Please check the details and try again.')
      }
    },
    confirmPayment (success) {
      this.$q.loading.hide()
      if (success.result) {
        this.$store.commit('policyChange/setCompletedPolicyChange', success.data.policyNumber)
        this.$router.push({name: 'ConfirmChange'})
      } else {
        this.$q.notify('We could not process your payment. Please check the details and try again.')
      }
    },
    paymentError (error) {
      console.debug.log(error)
      this.$q.loading.hide()
      this.$q.notify('We could not process your payment. Please check the details and try again.')
    },
    addNewCard () {
      this.selectedCard = null
    }
  },

  data () {
    return {
      nonStandard: true,
      SideBar: {
        status: 'third'
      },
      editEmail: true,
      selectedCardValue: '',
      cards: [
      ]
    }
  }
}
</script>
