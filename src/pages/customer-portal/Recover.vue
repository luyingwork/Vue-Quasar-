<template>
  <q-page class="home row flex-center">
    <div class="sign-in bg-color-customer-main col-12 col-md-8">
      <div class="title-box-main row items-center">
        <p class="title-text-main">Forgotten password</p>
      </div>
      <div v-if="pageState==='beforeSending'" class="sign-in-content">
        <p class="text-font-9 description">
          Just fill in the fields below and we will send you an email with your new password.
          For security reasons, you will be required to change your password when you first log in.
        </p>
        <div class="sign-in-field">
          <p class="text-font-9">Email address</p>
          <div class="input-wrapper-box row justify-between items-center">
            <q-input
              type="email"
              hide-underline placeholder="Enter your email address"
              v-model="emailAddress" class="data-hj-whitelist" />
          </div>
        </div>
        <div class="sign-in-field">
          <p class="text-font-9">First name</p>
          <div class="input-wrapper-box row justify-between items-center">
            <q-input
              type="text"
              hide-underline placeholder="Enter your first name"
              v-model="firstName"
              class="data-hj-whitelist" />
          </div>
        </div>
        <div class="sign-in-field">
          <p class="text-font-9">Last name</p>
          <div class="input-wrapper-box row justify-between items-center">
            <q-input
              type="text"
              hide-underline placeholder="Enter your last name"
              v-model="lastName" class="data-hj-whitelist" />
          </div>
        </div>
        <div class="row justify-between">
          <q-btn
            class="btn-main btn-back bg-color-secondary white"
            label="Back"
            to="/index"
          />
          <q-btn
            class="btn-main btn-send bg-color-primary white"
            label="Send request"
            @click="send"
          />
        </div>
      </div>
      <div v-if="pageState==='afterSending'" class="sign-in-content">
        <p class="text-font-9 description">
          We have emailed you the relevant information.
        </p>
        <div>
          <q-btn
            class="btn-main btn-sign-in bg-color-primary white"
            label="Sign in"
            to="/index"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import 'src/css/app.styl'
import 'src/css/home.styl'
import Services from 'src/services/'
export default {
  methods: {
    send () {
      if (this.$data.emailAddress === '' || this.$data.firstName === '' || this.$data.lastName === '') {
        this.$q.notify('You need to provide all details to request a password reset')
        return
      }
      Services.passwordReset(this.$data.emailAddress, this.$data.firstName, this.$data.lastName).then(success => {
        this.$data.pageState = 'afterSending'
        this.$data.emailAddress = ''
        this.$data.firstName = ''
        this.$data.lastName = ''
      }, error => {
        console.debug.log(error)
        this.$q.notify('There was an issue. Sorry')
        this.$data.emailAddress = ''
        this.$data.firstName = ''
        this.$data.lastName = ''
      })
    }
  },
  name: 'Land',
  data () {
    return {
      pageState: 'beforeSending',
      emailAddress: '',
      firstName: '',
      lastName: ''
    }
  }
}
</script>
