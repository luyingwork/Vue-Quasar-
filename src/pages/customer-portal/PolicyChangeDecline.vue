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
        <div class="car-details col-12 col-lg-9">
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
      <div :class="payMonthlyClass" style="margin-top: 10%">
        <div >
          <div class="row flex-center btn-box">
            <div>
              <q-btn
                class="btn-round-first bg-color-customer-primary"
                label="Try again"
                to="first"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import 'src/css/app.styl'
import 'src/css/customer-portal.styl'
import SideBar from 'src/components/SideBar'
import HelpIcon from 'src/components/HelpIcon'
// import Services from 'src/services/'

export default {
  name: 'PolicyChangeDecline',
  components: {
    HelpIcon,
    SideBar
  },
  data () {
    return {
      policyChangeStep: 'second',
      SideBar: {
        status: 'second'
      }
    }
  },
  conputed: {
    payMonthlyClass () {
      return ['content-box', 'monthly']
    }
  }
}
</script>
