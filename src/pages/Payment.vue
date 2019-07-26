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
          <p class="text-font-9">Please make sure this email address is correct as this will be used for policy documents and portal</p>
          <div class="row">
            <div class="row justify-between items-center">
              <!--<p class="text-font-13 ">email@email.com</p>-->
              <q-input
                type="email"
                v-model="emailAddress"
                hide-underline
                placeholder="email@address.com"
                class="col-11"
              />
            </div>
            <!-- <div class="row items-center">
              <q-btn
                icon="edit"
                @click="editEmail = !editEmail"
              />
            </div> -->
          </div>
        </div>
        <div class="row" >
          <div class="col-12 col-lg-7">
            <div class="total-amount-payable" v-show="paymentOption != 'full'">
              <p class="text-font-main">{{summary.installments}} monthly installments of </p>
              <p class="text-font-14 margin-top-main">£{{summary.payMonthly}}</p>
              <p class="text-font-8 margin-top-35">+ deposit of £{{summary.deposit}}</p>
              <p class="text-font-1 margin-top-27">Total amount payable: £{{summary.payMonthlyTotal}}</p>
            </div>
            <div class="total-amount-payable" v-show="paymentOption == 'full'">
              <p class="text-font-main">You have opted to pull the full amount now</p>
              <p class="text-font-14 margin-top-main">£{{summary.premium}}</p>
              <p class="text-font-8 margin-top-35">to pay now</p>
              <p class="text-font-1 margin-top-27">Total amount payable: £{{summary.premium}}</p>
            </div>
            <div class="car-holder-details">
              <p class="text-font-8">Card holder details</p>
              <p class="text-font-9 margin-top-main">Please enter the correct details registered to the payment card (if different from the policyholder's details).</p>
              <p class="text-font-8 margin-top-53">Pay by credit / debit card</p>
              <p class="text-font-9 margin-top-main">
                Please enter your credit / debit card account details for the one-off payment of £{{summary.premium}}.
              </p>
              <div class="card-box">
                <p class="text-font-9">Name on card</p>
                <div class="input-wrapper-box row items-center justify-between">
                  <q-input
                    hide-underline
                    placeholder="Mr A Smith"
                    v-model="nameOnCard"
                  />
                </div>
                <p class="text-font-9 margin-top-41">Card number</p>
                <div class="input-wrapper-box row items-center justify-between">
                  <q-input
                    type="text"
                    hide-underline
                    maxlength="16"
                    placeholder="0000 0000 0000 0000"
                    v-model="cardNumber"
                  />
                </div>
                <p class="text-font-9 margin-top-41">Expiry month</p>
                <div class="input-wrapper-box row items-center justify-between">
                  <q-input
                    maxlength="2"
                    hide-underline
                    placeholder="01"
                    v-model="expiryMonth"
                  />
                </div>
                   <p class="text-font-9 margin-top-41">Expiry year</p>
                <div class="input-wrapper-box row items-center justify-between">
                  <q-input
                    maxlength="2"
                    hide-underline
                    placeholder="01"
                    v-model="expiryYear"
                  />
                </div>
                <p class="text-font-9 margin-top-41">CVV</p>
                <div class="input-wrapper-box row items-center justify-between">
                  <q-input
                    type="text"
                    hide-underline
                    maxlength="3"
                    placeholder="123"
                    v-model="cvv"
                  />
                </div>
              </div>
            </div>
            <div class="billing-address">
              <p class="text-font-main">Is your <b>billing address different from your registered address</b>?</p>
              <div class="row items-center margin-top-35">
                <q-btn-toggle
                  class="btn-toggle-standard"
                  v-model="addBillingAddress"
                  :options="[
                      {label: 'Yes', value: true},
                      {label: 'No', value: false},
                    ]"
                />
              </div>
              <div v-show="addBillingAddress">
              <div class="address-box">
                <p class="text-font-9">Billing address line 1</p>
                <div class="input-wrapper-box row items-center justify-between">
                  <q-input
                    hide-underline
                    placeholder="Apartment 16"
                    v-model="firstLine"
                  />
                </div>
                <p class="text-font-9 margin-top-41">Billing address line 2</p>
                <div class="input-wrapper-box row items-center justify-between">
                  <q-input
                    hide-underline
                    placeholder="Park Lodge 7-9"
                    v-model="secondLine"
                  />
                </div>
                <p class="text-font-9 margin-top-41">Billing address line 3</p>
                <div class="input-wrapper-box row items-center justify-between">
                  <q-input
                    hide-underline
                    v-model="thirdLine"
                  />
                </div>
                <p class="text-font-9 margin-top-41">Billing address town / city</p>
                <div class="input-wrapper-box row items-center justify-between">
                  <q-input
                    hide-underline
                    placeholder="Manchester"
                    v-model="city"
                  />
                </div>
                <p class="text-font-9 margin-top-41">Billing address post code</p>
                <div class="input-wrapper-box row items-center justify-between">
                  <q-input
                    type="text"
                    hide-underline
                    placeholder="M16 8NZ"
                    v-model="postCode"
                  />
                </div>
              </div>
              </div>
              <div class="row items-center">
                <p class="text-font-8 col-10">Documents are usually sent via email</p>
                <p class="col-2 row justify-end"></p>
              </div>
              <div class="row items-center email-free">
                <q-checkbox
                  class="custom-check"
                  v-model="freeEmail"
                />
                <span class="text-font-9">Email - FREE - Please allow 24 to 48 hours</span>
              </div>
              <a @click="postDocumentsModalOpened = true" class="text-font-3">
                Click here if you want to learn about alternative methods of sending your documents
              </a>
            </div>
            <div class="bank-info" >
              <div v-show="paymentOption != 'full'">
              <div class="row items-center justify-between-prometheus" >
                <div class="col-2" >
                  <img src="~assets/img/icon-dd.png" class="full-width" />
                </div>
                <p class="direct-debit-title col-9">Direct Debit / Credit Agreement Setup</p>
              </div>
              <p class="text-font-9 direct-debit-description">
                Please enter your bank account details for the {{summary.installments}} monthly installments of £{{summary.payMonthly}} (total amount payable £2969.05).
              </p>
              <div class="bank-account-box">
                <p class="text-font-9">Account name</p>
                <div class="input-wrapper-box row items-center justify-between">
                  <q-input
                    hide-underline
                    placeholder=""
                    v-model="accountName"
                  />
                </div>
                <p class="text-font-9 margin-top-41">Bank name</p>
                <div class="input-wrapper-box row items-center justify-between">
                  <q-input
                    hide-underline
                    placeholder="Lloyds"
                    v-model="bankName"
                  />
                </div>
                <p class="text-font-9 margin-top-41">Account number</p>
                <div class="input-wrapper-box row items-center justify-between">
                  <q-input
                    type="number"
                    v-model="accountNumber"
                    hide-underline
                    placeholder="00000000"
                  />
                </div>
                <p class="text-font-9 margin-top-41">sort-code</p>
                <div class="input-wrapper-box row items-center justify-between">
                  <q-input
                    type="number"
                    v-model="sortCode"
                    hide-underline
                    placeholder="    -    -"
                  />
                </div>
              </div>
              <div class="direct-debit-note">
                <p class="text-font-9 margin-top-27">
                  <b>Please note, we can only set up a Direct Debit where the account holder
                    is aged 18 or over.</b>
                </p>
              </div>
              </div>
            </div>
          </div>
          <div class="payment-summary col-12 col-lg-5 row justify-end">
            <div class="col-12 col-lg-10">
                <ul class="payment-summary" v-show="paymentOption == 'full'">
              <li class="first">
                <span class="text-font-8">Payment Summary</span>
              </li>
              <li class="row justify-between">
                <span class="info-label col-8">Total premium:</span>
                <span class="info-value col-4">£{{summary.premium}}</span>
              </li>
              <li class="row justify-between">
                <span class="info-label col-8">Additional products:</span>
                <span class="info-value col-4">£{{summary.additional}}</span>
              </li>
              <li class="row justify-between">
                <span class="info-label col-7">Balance payable:</span>
                <span class="info-value col-5">£{{summary.premium + summary.additional}}</span>
              </li>
              <li class="total-payment">
                <p class="first">Total amount payable(Inc, deposit)</p>
                <p class="second">£{{summary.premium + summary.additional
                  }}</p>
                <p class="last">Including fees and discounts</p>
              </li>
            </ul>
              <ul class="payment-summary" v-show="paymentOption != 'full'">
              <li class="first">
                <span class="text-font-8">Payment Summary</span>
              </li>
              <li class="row justify-between">
                <span class="info-label col-8">Total premium:</span>
                <span class="info-value col-4">£{{summary.premium}}</span>
              </li>
              <li class="row justify-between">
                <span class="info-label col-8">Additional products:</span>
                <span class="info-value col-4">£{{summary.additional}}</span>
              </li>
              <li class="row justify-between">
                <span class="info-label col-7">Deposit to pay on card:</span>
                <span class="info-value col-5">£{{summary.deposit}}</span>
              </li>
              <li class="row justify-between">
                <span class="info-label col-7">Balance payable:</span>
                <span class="info-value col-5">£{{summary.payMonthlyTotal}}</span>
              </li>
              <li class="row justify-between">
                <span class="info-label col-7">Rate of interest:</span>
                <span class="info-value col-5">{{summary.apr}}%(variable)</span>
              </li>
              <li class="row justify-between">
                <span class="info-label col-7">Rate of interest value:</span>
                <span class="info-value col-5">£{{summary.interest}}</span>
              </li>
              <li class="total-payment">
                <p class="first">Total amount payable(Inc, deposit)</p>
                <p class="second">£{{summary.payMonthlyTotal}}</p>
                <p class="last">Including fees and discounts</p>
              </li>
              <li class="total-credit-amount">
                <p class="row flex-center info-label">Total amount of credit(exc. deposit)</p>
                <p class="info-value">£{{summary.loanAmount}}</p>
              </li>
              <li class="row justify-between">
                <span class="info-label col-7">{{summary.installments}} monthly insallments:</span>
                <span class="info-value col-5">£{{summary.payMonthly}}</span>
              </li>
              <li class="row justify-between">
                <p class="info-label col-7"><span>Representative:</span></p>
                <p class="info-value col-5"><span>{{summary.apr}}% APR(variable)</span></p>
              </li>
            </ul>

              <div class="img-secured-box">
                <img src="~assets/img/secured-by-ssl.png" class="full-width" />
              </div>
              <div class="fixed-button-box">
                <br><br>
                <q-btn style="width:100%" class="btn-standard margin-right-20" label="SWITCH TO PAY IN FULL" @click="payInFull" v-show="paymentOption != 'full'"/>
              </div>
            </div>
          </div>
        </div>
        <div class="action-btn-box">
          <q-btn
            to="question-set"
            class="btn-standard margin-right-20"
            label="Return to quote details"
          />
          <q-btn
            @click="makePayment"
            class="btn-nav" label="Buy Policy"
          />
        </div>
      </div>
    </div>

    <q-modal v-model="postDocumentsModalOpened" minimized ref="modalRef">
      <div style="padding: 50px">
        <p>Did you know? There are no legal requirements to print your insurance documents.</p>
        <p>
          <q-checkbox class="custom-check" v-model="freePost" />
          <span class="text-font-9">Post - FREE - Please allow 3-5 days</span>
        </p>
          <q-btn class="btn-round-second margin-top-10" v-close-overlay label="Close" @click="postDocumentsModalOpened = false" />
      </div>
    </q-modal>

  </q-page>
</template>

<script>
import '../css/app.styl'
import '../css/payment.styl'
import { QModal } from 'quasar'
import ImageBox from '../components/ImageBox'
import HelpIcon from '../components/HelpIcon'
import SideBar from '../components/SideBar'
import Services from '../services/'
export default {
  components: {
    ImageBox,
    HelpIcon,
    SideBar,
    QModal
  },
  computed: {
    paymentOption: {
      get () { return this.$store.state.quoteJourney.paymentOption },
      set (val) { this.$store.commit('quoteJourney/setPaymentOption', val) }
    },
    summary: {
      get () { return this.$store.state.quoteJourney.summary },
      set (val) { this.$store.commit('quoteJourney/setSummary', val) }
    },
    emailAddress: {
      get () { return this.$store.state.quoteJourney.emailAddress },
      set (val) { this.$store.commit('quoteJourney/setEmailAddress', val) }
    },
    nameOnCard: {
      get () { return this.$store.state.quoteJourney.nameOnCard },
      set (val) { this.$store.commit('quoteJourney/setNameOnCard', val) }
    },
    cardNumber: {
      get () { return this.$store.state.quoteJourney.cardNumber },
      set (val) { this.$store.commit('quoteJourney/setCardNumber', val) }
    },
    expiryYear: {
      get () { return this.$store.state.quoteJourney.expiryYear },
      set (val) { this.$store.commit('quoteJourney/setExpiryYear', val) }
    },
    expiryMonth: {
      get () { return this.$store.state.quoteJourney.expiryMonth },
      set (val) { this.$store.commit('quoteJourney/setExpiryMonth', val) }
    },
    cvv: {
      get () { return this.$store.state.quoteJourney.cvv },
      set (val) { this.$store.commit('quoteJourney/setCvv', val) }
    },
    firstLine: {
      get () { return this.$store.state.quoteJourney.billingAddress.firstLine },
      set (val) { this.$store.commit('quoteJourney/setBillingAddressFirst', val) }
    },
    secondLine: {
      get () { return this.$store.state.quoteJourney.billingAddress.secondLine },
      set (val) { this.$store.commit('quoteJourney/setBillingAddressSecond', val) }
    },
    thirdLine: {
      get () { return this.$store.state.quoteJourney.billingAddress.thirdLine },
      set (val) { this.$store.commit('quoteJourney/setBillingAddressThird', val) }
    },
    city: {
      get () { return this.$store.state.quoteJourney.billingAddress.city },
      set (val) { this.$store.commit('quoteJourney/setBillingAddressCity', val) }
    },
    postCode: {
      get () { return this.$store.state.quoteJourney.billingAddress.postCode },
      set (val) { this.$store.commit('quoteJourney/setBillingAddressPostCode', val) }
    },
    freeEmail: {
      get () { return this.$store.state.quoteJourney.freeEmail },
      set (val) { this.$store.commit('quoteJourney/setFreeEmail', val) }
    },
    freePost: {
      get () { return this.$store.state.quoteJourney.freePost },
      set (val) { this.$store.commit('quoteJourney/setFreePost', val) }
    },
    accountName: {
      get () { return this.$store.state.quoteJourney.bank.accountName },
      set (val) { this.$store.commit('quoteJourney/setAccountName', val) }
    },
    bankName: {
      get () { return this.$store.state.quoteJourney.bank.bankName },
      set (val) { this.$store.commit('quoteJourney/setBankName', val) }
    },
    accountNumber: {
      get () { return this.$store.state.quoteJourney.bank.accountNumber },
      set (val) { this.$store.commit('quoteJourney/setAccountNumber', val) }
    },
    sortCode: {
      get () { return this.$store.state.quoteJourney.bank.sortCode },
      set (val) { this.$store.commit('quoteJourney/setSortCode', val) }
    },
    quoteId: {
      get () { return this.$store.state.quoteJourney.quoteId },
      set (val) { this.$store.commit('quoteJourney/setQuoteId', val) }
    }
  },
  methods: {
    nonStandardAddress () {
      this.$data.nonStandard = !this.$data.nonStandard
    },
    makePayment () {
      if (this.emailAddress.indexOf('@') === -1 || this.emailAddress.indexOf('.') === -1) {
        this.$q.notify('You need to enter a valid email address.')
        return
      }
      if (this.nameOnCard === '' || this.cardNumber === '' || this.expiryMonth === '' || this.expiryYear === '' || this.cvv === '') {
        this.$q.notify('Your bank card details are not complete. Please check and try again.')
        return
      }
      if (!this.$data.nonStandard) {
        if (this.firstLine === '' || this.secondLine === '' || this.thirdLine === '' || this.postCode === '') {
          this.$q.notify('We could not process your payment. Please check the details and try again.')
          return
        }
      }
      if (this.$store.state.quoteJourney.paymentOption !== 'full') {
        if (this.bankName === '' || this.sortCode === '' || this.accountNumber === '' || this.accountName === '') {
          this.$q.notify('Your bank details are not correct. Please check and try again.')
          return
        }
      }
      var billingAddress = {
        'addressLine1': this.$store.state.quoteJourney.address.line1,
        'addressLine2': this.$store.state.quoteJourney.address.line1,
        'addressLine3': this.$store.state.quoteJourney.address.county,
        'addressPostcode': this.$store.state.quoteJourney.postCode
      }
      var mpaymonthly = {
        'printDocuments': this.freePost,
        'emailDocuments': this.freeEmail,
        'quoteNumber': this.$store.state.quoteJourney.quoteId,
        'depositPaymentTypeMethod': 'CardPayment',
        'depositAmount': this.$store.state.quoteJourney.summary.deposit,
        'creditCard': {
          'name': this.nameOnCard,
          'cardType': '2',
          'cardNumber': this.cardNumber,
          'cardExpiryMonth': this.expiryMonth,
          'cardExpiryYear': this.expiryYear,
          'cvv': this.cvv
        },
        'directDebit': {
          'bankName': this.bankName,
          'sortCode': this.sortCode,
          'accNo': this.accountNumber,
          'accountHolderName': this.accountName
        },
        'billingAddress': this.$data.addBillingAddress ? billingAddress : null,
        'paymentType': 'DirectDebit'
      }
      var paymfull = {
        'printDocuments': this.freePost,
        'emailDocuments': this.freeEmail,
        'quoteNumber': this.$store.state.quoteJourney.quoteId,
        'singlePaymentTypeMethod': 'CardPayment',
        'singlePaymentAmount': this.$store.state.quoteJourney.summary.premium,
        'creditCard': {
          'name': this.nameOnCard,
          'cardType': '2',
          'cardNumber': this.cardNumber,
          'cardExpiryMonth': this.expiryMonth,
          'cardExpiryYear': this.expiryYear,
          'cvv': this.cvv
        },
        'billingAddress': this.$data.addBillingAddress ? billingAddress : null,
        'paymentType': 'CardPayment',
        'differentAddress': this.$data.addBillingAddress
      }
      this.$q.loading.show()
      Services.makePayment(this.$store.state.quoteJourney.paymentOption === 'full' ? paymfull : mpaymonthly).then(success => {
        this.$q.loading.hide()
        this.$store.commit('quoteJourney/setCompletedPolicy', null)
        if (success.result) {
          if (!success.data.RequiresPasswordChange) {
            // this.$store.commit('customerPortal/setAuthentication', false)
            // this.$store.commit('customerPortal/setUser', null)
          }
          this.$store.commit('quoteJourney/setCompletedPolicy', success.data)
          this.$router.push({name: 'PaymentConfirm'})
        } else {
          this.$q.notify('We could not process your payment. Please check the details and try again.')
        }
      }, error => {
        console.log(error)
        this.$q.loading.hide()
        this.$q.notify('We could not process your payment. Please check the details and try again.')
      })
    },
    payInFull () {
      this.$q.loading.show()
      setTimeout(fnc => {
        this.paymentOption = 'full'
        this.$q.loading.hide()
        window.scrollTo(0, 0)
      }, 2000)
    }
  },

  data () {
    return {
      postDocumentsModalOpened: false,
      nonStandard: true,
      SideBar: {
        status: 'third'
      },
      editEmail: true,
      addBillingAddress: false
    }
  }
}
</script>
