<template>
  <q-page class="email">
    <div>
      <div class="email-header">
        <p class="text-font-1">Hi George Owens</p>
        <div class="">
          <p class="text-font-18 margin-top-30">
            We're happy to offer you one of the most competitive quotes for your car insurance.
          </p>
          <p class="text-font-18 margin-top-30">
            If you have already contacted us about this quote or to confirm that you like to buy, thanks!
          </p>
          <p class="text-font-18 margin-top-30">
            If you haven't bought yet you can do so online here.
          </p>
        </div>
      </div>
      <div class="email-content">
        <div class="price-box">
          <div class="item-title-box">
            <p class="text-font-1">Your Price</p>
          </div>
          <p class="text-font-19 margin-top-22">£136.60</p>
        </div>
        <div class="detail-box">
          <div class="item-title-box">
            <p class="text-font-1">Your Details</p>
          </div>
          <ul class="margin-top-15">
            <li class="row">
              <p class="col-5 col-sm-4 text-font-20">Quote Ref:</p>
              <p class="col-7 col-sm-8 text-font-20 font-weight-light">TYU10000QW</p>
            </li>
            <li class="row">
              <p class="col-5 col-sm-4 text-font-20">Driver:</p>
              <p class="col-7 col-sm-8 text-font-20 font-weight-light">Mr George Owens</p>
            </li>
            <li class="row">
              <p class="col-5 col-sm-4 text-font-20">Registration:</p>
              <p class="col-7 col-sm-8 text-font-20 font-weight-light">YB61 7RU</p>
            </li>
            <li class="row">
              <p class="col-5 col-sm-4 text-font-20">Cover Type:</p>
              <p class="col-7 col-sm-8 text-font-20 font-weight-light">Comprehensive</p>
            </li>
            <li class="row">
              <p class="col-5 col-sm-4 text-font-20">Cover Start Date:</p>
              <p class="col-7 col-sm-8 text-font-20 font-weight-light">1 March 2019</p>
            </li>
          </ul>
        </div>
        <div class="benefit-box">
          <div class="item-title-box">
            <p class="text-font-1">Policy Benefits</p>
          </div>
          <div class="margin-top-15">
            <div v-for="n in 7" :key="`item-${n}`" class="option-item margin-top-15 row items-center" >
              <div class="col-1">
                <div class="img-icon-check-wrapper row flex-center">
                  <img src="~assets/img/icon-tick-medium.png" />
                </div>
              </div>
              <div class="col-11"><p class="text-font-20 font-weight-light">FREE breakdown membership</p></div>
            </div>
          </div>
        </div>
        <div class="action-btn-box margin-top-60">
          <p class="text-font-20 color-standard">You can retrieve this policy by clicking the button below:</p>
          <q-btn
            class="btn-round-first margin-top-22"
            label="RETRIEVE POLICY"
          />
        </div>
      </div>
      <div class="email-footer margin-top-30">
        <p class="text-font-21">
          Yoga - Registered First Point, Balby Carr Bank, Doncaster, South Yorkshire, DN4 5JQ
          Registered in England No. 04693136
        </p>
        <p class="margin-top-30 text-font-21">
          Authorised and regulated by the Financial Conduct Authority for general insurance business. Our Financial Conduct Authority firm reference number is 302961 for important information about the company please refer to yoga-insurance.co.uk
        </p>
        <p class="margin-top-30 text-font-21">
          Confidentiality Notice
          This electronic transmission (and/or documents accompanying it) may contain confidential information belonging to the sender. The information is intended only for the use of the individual or entity named as the recipient.
        </p>
        <p class="margin-top-30 text-font-21">
          If you are not the intended recipient you are hereby notified that disclosure, copying, distribution or the taking of any action in reliance of the contents of this information is unauthorised and strictly prohibited. In this instant, please therefore destroy the same and notify the sender immediately.
        </p>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import 'src/css/app.styl'
import 'src/css/customer-portal.styl'
export default {
  name: 'Quotes',
  data () {
    return {
      pageStatus: 'cancel'
    }
  },
  methods: {
  }
}
</script>
