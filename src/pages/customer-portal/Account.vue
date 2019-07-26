<template>
  <q-page class="account">
    <div class="font-family-lato">
      <p class="page-title-main fs25">Your Account</p>
      <div class="margin-top-30 row justify-between items-end">
        <p class="page-title-sub col-12 col-md-7">
          If you want to update any risk information, such as your name or date of birth, please go to the ‘Your Policies’ section and make a change to your policy.
        </p>
      </div>
    </div>
    <br/>
    <div class="page-content row">
      <div class="main-info col-12 col-lg-7">
        <div class="item-field">
          <p class="text-font-main">Username</p>
          <div class="input-wrapper-box margin-top-22">
            <q-input
              disabled="true"
              hide-underline
              class="full-width data-hj-whitelist"
              v-model="user.userName" />
          </div>
        </div>
        <div class="item-field margin-top-60">
          <p class="text-font-main">Email</p>
          <div class="input-wrapper-box margin-top-22">
            <q-input
              type="email"
              hide-underline
              class="full-width data-hj-whitelist"
              placeholder="example@mail.com"
              v-model="user.emailAddress" />
          </div>
        </div>
        <div class="item-field margin-top-60">
          <p class="text-font-main">Phone</p>
          <div class="input-wrapper-box margin-top-22">
            <q-input
              type="tel"
              hide-underline
              class="full-width data-hj-whitelist"
              placeholder="000000 000000"
              v-model="user.mobilePhone"  />

          </div>
        </div>
      </div>
      <div class="contact-info col-12 col-lg-5">
        <p class="text-font-main">
          Yoga would also like to keep you informed about products, services, offers and promotions Yoga make available. Can Yoga contact you by:
        </p>
        <div class="checkbox-wrapper">
          <div class="row items-center check-box-item">
            <q-checkbox
            v-model="checkEmail"  />
            <p class="text-font-main col-9 col-md-9">Email</p>
          </div>
          <div class="row items-center check-box-item margin-top-24">
            <q-checkbox
            v-model="checkSMS"/>

            <p label class="text-font-main col-9 col-md-9">SMS</p>
          </div>
        </div>
        <p class="text-font-main margin-top-44">Your policy documents are usually sent out via email.</p>
        <p class="margin-top-24">
          <a href="#" class="underline">Click here if you want to learn about alternative methods of sending your documents</a>
        </p>
      </div>
    </div>
    <div class="action-btn-box row justify-between">
      <q-btn
        class="btn-round-first"
        label="RESET PASSWORD"
        to="/account/password"
      />
      <q-btn
        class="btn-round-first"
        label="UPDATE DETAILS"
        @click="update"
      />
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import 'src/css/app.styl'
import 'src/css/customer-portal.styl'
import Services from 'src/services/'
export default {
  name: 'Account',
  data () {
    return {
      checkEmail: false,
      checkSMS: false
    }
  },
  computed: {
    user: {
      get () { return this.$store.state.customerPortal.user },
      set (val) { this.$store.commit('customerPortal/setUser', val) }
    }
  },
  created () {
    this.getAccountDetails()
  },
  methods: {
    getAccountDetails () {
      this.checkEmail = this.$store.state.customerPortal.user.emailContact !== undefined ? this.$store.state.customerPortal.user.emailContact : false
      this.checkSMS = this.$store.state.customerPortal.user.smscontact !== undefined ? this.$store.state.customerPortal.user.smscontact : false
    },
    update () {
      Services.changeDetails({ smscontact: this.checkSMS, emailContact: this.checkEmail, username: this.$store.state.customerPortal.user.userName, tel: this.$store.state.customerPortal.user.mobilePhone, emailAddress: this.$store.state.customerPortal.user.emailAddress }).then(success => {
        this.$q.notify({message: 'Your account has been updated', color: 'positive', type: 'positive'})
        setTimeout(sender => {
          this.$store.commit('customerPortal/setUser', null)
          this.$store.commit('customerPortal/setAuthentication', false)
          this.$router.push('/index')
        }, 3000)
      })
    }
  }
}
</script>
