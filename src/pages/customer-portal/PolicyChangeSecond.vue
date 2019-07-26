<template>
  <q-page class="row relative-position">
    <div class="side-bar col-lg-3">
      <side-bar
        sideBarType="policyChange"
        :status="SideBar.status"
      />
    </div>
        <div class="policy-change col-12 col-lg-9">
      <div class="container">
        <div class="font-family-lato">
          <p class="page-title-main">Policy Change: {{policyNumber}}</p>
        </div>
        <div class="page-content">
          <div class="row">
            <div class="policy-change-grid col-12 col-xl-7">
              <div>
                <p class="text-font-4"> {{user.firstname}}, your new annual premium is</p>
                <p class="text-font-5">£{{newAnnualPremium}}</p>
              </div>
              <div class="payment-info margin-top-60">
                <div class="row justify-between">
                  <div class="col-12 col-sm-8 page-title-sub">Return / Additional Premium</div>
                  <div class="col-12 col-sm-4 page-title-sub font-weight-regular">£{{additionalPremium}}</div>
                </div>
                <div class="row">
                  <div class="col-12 col-sm-8 page-title-sub">Fees</div>
                  <div class="col-12 col-sm-4 page-title-sub font-weight-regular">£{{fees}}</div>
                </div>
                <div class="row">
                  <div class="col-12 col-sm-8 page-title-sub">Add Ons</div>
                  <div class="col-12 col-sm-4 page-title-sub font-weight-regular">£{{addOns}}</div>
                </div>
                <div class="row">
                  <div class="col-12 col-sm-8 page-title-sub">Total Refund / Total Payable</div>
                  <div class="col-12 col-sm-4 page-title-sub font-weight-regular">£{{totalPayable}}</div>
                </div>
                <div class="row">
                  <div class="col-12 col-sm-8 page-title-sub">Initial Payment Method</div>
                  <div class="col-12 col-sm-4 page-title-sub font-weight-regular">{{initialPaymentMethod}}</div>
                </div>
              </div>
            </div>
            <div class="policy-change-grid col-12 col-xl-5" v-if="paymentOptionIsDD">
              <ul class="payment-summary">
                  <li class="first">
                    <span class="text-font-8">Payment Summary</span>
                  </li>
                  <li class="row justify-between">
                    <span class="info-label col-10">Adjustment amount:</span>
                    <span class="info-value col-2">£{{paymentSummary.adjustmentAmount}}</span>
                  </li>
                  <li class="row justify-between">
                    <span class="info-label col-10">Charge for credit</span>
                    <span class="info-value col-2">£{{paymentSummary.chargeForCredit}}</span>
                  </li>
                  <li class="row justify-between">
                    <span class="info-label col-10">Total cost for credit</span>
                    <span class="info-value col-2">£{{paymentSummary.totalCostOfCredit}}</span>
                  </li>
                  <li class="row justify-between">
                    <span class="info-label col-10">Payable by a first instalment</span>
                    <span class="info-value col-2">£{{paymentSummary.firstInstalment}}</span>
                  </li>
                  <li class="row justify-between">
                    <span class="info-label col-10">Subsequent instalments</span>
                    <span class="info-value col-2">£{{paymentSummary.subsequentInstalments}}</span>
                  </li>
                  <li class="row justify-between">
                    <span class="info-label col-10">Followed by {{paymentSummary.numberOfInstalments}} instalments of</span>
                    <span class="info-value col-2">£{{paymentSummary.subsequentInstalments}}</span>
                  </li>
                </ul>
            </div>
          </div>
          <div class="payment-option-box" v-if="lastTakeUpMethodWasDD && !noPaymentRequired">
            <p class="page-title-sub">Please select payment option</p>
            <div class="action-btn-box row items-center">
              <q-btn-toggle
                class="btn-toggle-standard data-hj-whitelist"
                v-model="paymentOption"
                :options="[
                  {label: 'Add to existing direct debit', value: 'directDebit'},
                  {label: 'Card', value: 'card'},
                ]"
              />
              <help-icon />
            </div>
            <p class="page-title-sub" v-if="!paymentOptionIsDD && !noPaymentRequired">If you are choosing to pay your additional premium in full, the existing monthly payments will continue.</p>
          </div>
          <div class="payment-option-box col-12 col-sm-4 page-title-sub font-weight-regular" v-if="noPaymentRequired">
            <p>No payment required</p>
          </div>
          <div class="other-info-list">
            <div class="excess">
              <div @click="showExcess = !showExcess" class="collapsible-title row justify-between items-center">
                <p class="item-box-text-fifth white">Excesses</p>
                <div>
                  <q-icon v-if="showExcess" name="keyboard_arrow_up" color="white"/>
                  <q-icon v-else name="keyboard_arrow_down" color="white"/>
                </div>
              </div>
              <div v-if="showExcess" class="collapsible-content">
                <div class="policy-excess" v-if="policyExcesses.length > 0">
                  <div class="collapsible-sub-title row items-center">
                    <p class="item-box-text-fifth white">Policy Excesses</p>
                  </div>
                  <ul>
                    <li class="row justify-between items-center" v-for="policyExcess in policyExcesses" :key="policyExcess.index">
                      <div>
                        <p class="item-box-text-first">Excess</p>
                        <p class="item-box-text-third">{{policyExcess.description}}</p>
                      </div>
                      <div>
                        <p class="item-box-text-first">Cost</p>
                        <p class="item-box-text-third">£{{policyExcess.cost}}</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="driver-excess" v-if="driverExcesses.length > 0">
                  <div class="collapsible-sub-title row items-center">
                    <p class="item-box-text-fifth white">Driver Excesses</p>
                  </div>
                  <ul>
                    <li v-for="n in 2" :key="`${n}`" class="row">
                      <div class="col-12 col-sm-6 col-md-4 col-xl-2">
                        <p class="item-box-text-first">Excess</p>
                        <p class="item-box-text-third">Test A</p>
                      </div>
                      <div class="col-12 col-sm-6 col-md-4 col-xl-2">
                        <p class="item-box-text-first">Accidental Damage</p>
                        <p class="item-box-text-third">£100</p>
                      </div>
                      <div class="col-12 col-sm-6 col-md-4 col-xl-2">
                        <p class="item-box-text-first">Fire and Theft</p>
                        <p class="item-box-text-third">-</p>
                      </div>
                      <div class="col-12 col-sm-6 col-md-4 col-xl-2">
                        <p class="item-box-text-first">Malicious Damage</p>
                        <p class="item-box-text-third">£400</p>
                      </div>
                      <div class="col-12 col-sm-6 col-md-4 col-xl-2">
                        <p class="item-box-text-first">Windscreen Repair</p>
                        <p class="item-box-text-third">£50</p>
                      </div>
                      <div class="col-12 col-sm-6 col-md-4 col-xl-2">
                        <p class="item-box-text-first">Windscreen</p>
                        <p class="item-box-text-third">£50</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="endorsement" v-if="endorsements.length > 0">
              <div @click="showEndorsement = !showEndorsement" class="collapsible-title margin-top-30 row justify-between items-center">
                <p class="item-box-text-fifth white">Endorsements</p>
                <div>
                  <q-icon v-if="showEndorsement" name="keyboard_arrow_up" color="white"/>
                  <q-icon v-else name="keyboard_arrow_down" color="white"/>
                </div>
              </div>
              <div v-if="showEndorsement" class="collapsible-content">
                <ul>
                  <li v-for="endorsement in endorsements" :key="endorsement.endorsementID">
                    <p class="page-title-sub font-weight-regular">{{endorsement.endorsementReferenceCode}}</p>
                    <p class="page-title-sub">{{endorsement.text}}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="action-btn-box row justify-between">
          <div class="col-12 col-xl-5">
            <q-btn
              class="btn-round-first bg-color-customer-primary"
              label="ABANDON CHANGE"
              to="/policies"
            />
          </div>
          <div class="col-12 col-xl-7 row justify-between">
            <div class="btn-change-group">
              <q-btn
                class="btn-round-first bg-color-customer-primary margin-right-20"
                label="EDIT CHANGE"
                to="/policies/change/first"
              />
            </div>
            <div class="btn-change-group">
              <q-btn
                class="btn-round-first"
                label="CONFIRM CHANGE"
                @click="goNextStep"
              />
            </div>
          </div>
        </div>
          <div v-if="policyChangeStep==='third'" class="policy-optional-extra">
            <p class="text-font-title" id="policy-optional-extra">Now select your optional extras</p>
            <optional-extra
              :kind=optionalExtraCarInfo.kind
              usedPage="PolicyChange"
              :title=optionalExtraCarInfo.title
              :description=optionalExtraCarInfo.description
              :initPrice=optionalExtraCarInfo.initPrice
              :upgradeItemList=optionalExtraCarInfo.upgradeItemList
            />
            <optional-extra
              :kind=optionalExtraCoverInfo.kind
              usedPage="PolicyChange"
              :title=optionalExtraCoverInfo.title
              :description=optionalExtraCoverInfo.description
              :initPrice=optionalExtraCoverInfo.initPrice
              :upgradeItemList=optionalExtraCoverInfo.upgradeItemList
            />
          </div>
          <div v-if="policyChangeStep==='third'" class="enhance-excess-cover">
            <p class="page-title-sub">Would you like to enhance your excess cover?</p>
            <p class="item-box-text-fourth color-standard margin-bottom-main">Currently you have £500 excess cover on your policy.</p>
            <div class="row items-center justify-between-prometheus">
              <q-select
                class="select-common col-9 col-md-10"
                inverted
                prefix="£"
                v-model="enhancedExcess"
                :options="enhancedExcessList" />
              <help-icon />
            </div>
          </div>
          <div v-if="policyChangeStep==='third'" class="action-btn-box row justify-end">
            <q-btn
              class="btn-round-second"
              label="CONFIRM CHANGE"
              @click="confirmChange"
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
import {
  scroll
} from 'quasar'
const {
  getScrollTarget,
  // getScrollHeight,
  setScrollPosition
} = scroll
import 'src/css/app.styl'
import 'src/css/customer-portal.styl'
import SideBar from 'src/components/SideBar'
import HelpIcon from 'src/components/HelpIcon'
import OptionalExtra from 'src/components/OptionalExtra'
import optionalExtraData from 'src/assets/data/optional-extras'
import Services from 'src/services/'

export default {
  name: 'PolicyChangeFirst',
  components: {
    HelpIcon,
    SideBar,
    OptionalExtra
  },
  data () {
    return {
      policyChangeStep: 'second',
      SideBar: {
        status: 'second'
      },
      optionalExtraData,
      paymentOption: '',
      showExcess: false,
      showEndorsement: false,
      enhancedExcess: '500',
      enhancedExcessList: [
        {
          label: '500',
          value: '500'
        },
        {
          label: '1000',
          value: '1000'
        },
        {
          label: '1500',
          value: '1500'
        }
      ]
    }
  },
  computed: {
    user () {
      return this.$store.state.customerPortal.user
    },
    optionalExtraCarInfo () {
      return this.optionalExtraData.car
    },
    optionalExtraCoverInfo () {
      return this.optionalExtraData.cover
    },
    newAnnualPremium () {
      return this.$store.state.policyChange.mtaQuoteResultSummary.quoteDetails.newInsurerAnnual
    },
    additionalPremium () {
      return this.$store.state.policyChange.mtaQuoteResultSummary.quoteDetails.annualAdditionalPremium
    },
    policyExcesses () {
      return this.$store.state.policyChange.mtaQuoteResultSummary.quoteDetails.policyExcesses
    },
    driverExcesses () {
      return this.$store.state.policyChange.mtaQuoteResultSummary.quoteDetails.itemSpecificExcesses
    },
    endorsements () {
      return this.$store.state.policyChange.mtaQuoteResultSummary.quoteDetails.endorsements
    },
    fees () {
      return this.$store.state.policyChange.mtaQuoteResultSummary.quoteDetails.feesTotal
    },
    addOns () {
      return this.$store.state.policyChange.mtaQuoteResultSummary.quoteDetails.vapTotal
    },
    totalPayable () {
      return this.$store.state.policyChange.mtaQuoteResultSummary.quoteDetails.calculatedTotalPayable
    },
    initialPaymentMethod () {
      return this.$store.state.policyChange.mtaQuoteResultSummary.quoteDetails.initialPaymentMethod
    },
    policyNumber () {
      return this.$store.state.policyChange.mtaQuoteResultSummary.policyNumber
    },
    paymentSummary () {
      return this.$store.state.policyChange.mtaQuoteResultSummary.quoteDetails.directDebitBreakdown
    },
    paymentOptionIsDD () {
      return this.paymentOption === 'directDebit'
    },
    customerToPay () {
      return this.totalPayable > 0
    },
    noPaymentRequired () {
      return this.totalPayable === 0
    },
    lastTakeUpMethodWasDD () {
      return this.initialPaymentMethod === 'Direct Debit'
    },
    customerHasPendingOrFaultClaim () {
      return false
    },
    paymentType () {
      return this.paymentOptionIsDD ? 'DirectDebit' : 'CardPayment'
    }
  },
  created () {
    console.info(this.optionalExtraData)
    if (this.initialPaymentMethod === 'Credit Card') {
      this.paymentOption = 'card'
    }
  },
  methods: {
    doScrollDown () {
      let domElement = document.querySelector('.q-layout')
      let scrollTargetDomElement = getScrollTarget(domElement)
      // let scrollElement = document.querySelector('.policy-optional-extra')
      // let scrollHeight = getScrollHeight(scrollElement)
      // setScrollPosition(scrollTargetDomElement, scrollHeight, 200)
      setScrollPosition(scrollTargetDomElement, 1680, 200)
    },
    goNextStep () {
      this.policyChangeStep = 'third'
      this.SideBar.status = 'third'
      this.doScrollDown()
    },
    confirmChange () {
      if (this.paymentOption === 'card' && this.customerToPay) {
        this.$router.push({name: 'ChangeStepPayment'})
      } else {
        var paymfull = {
          'quoteNumber': this.$store.state.policyChange.mtaQuoteResultSummary.quoteDetails.mtaQuoteID,
          'singlePaymentTypeMethod': this.paymentType,
          'singlePaymentAmount': this.$store.state.policyChange.mtaQuoteResultSummary.quoteDetails.calculatedTotalPayable,
          'paymentType': this.paymentType,
          'reasonForChange': this.$store.state.policyChange.reasonForChange
        }
        this.$q.loading.show()

        Services.makePolicyChangePayment(paymfull).then(success => {
          this.$q.loading.hide()
          if (success.result) {
            this.$store.commit('policyChange/setCompletedPolicyChange', success.data.policyNumber)
            this.$router.push({name: 'ConfirmChange'})
          } else {
            this.$q.notify('We could not process your amendment. Please check the details and try again.')
          }
        }, error => {
          console.debug.log(error)
          this.$q.loading.hide()
          this.$q.notify('We could not process your amendment. Please check the details and try again.')
        })
      }
    }
  }
}
</script>
