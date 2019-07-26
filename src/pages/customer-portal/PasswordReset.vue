<template>
  <q-page class="account">
    <div class="font-family-lato">
      <p class="page-title-main">Change Your Password</p>
      <div class="margin-top-30 row">
        <p class="page-title-sub col-12 col-md-7">
          Please ensure your password is at least 8 characyers,
          including at least 1 uppercase letter, 1 lowercase letter and 1 number.
          The password cannot contain part of your username.
        </p>
      </div>
    </div>
    <br/>
    <div class="page-content row">
      <div class="main-info col-12 col-md-7">
        <div class="item-field">
          <p class="text-font-main">Current Password</p>
          <div class="input-wrapper-box margin-top-22">
            <q-input
              type="password"
              hide-underline
              class="full-width data-hj-whitelist"
              v-model="currentPassword"
            />
          </div>
        </div>
        <div class="item-field margin-top-60">
          <p class="text-font-main">New Password</p>
          <div class="input-wrapper-box margin-top-22">
            <q-input
              type="password"
              hide-underline
              class="full-width data-hj-whitelist"
              v-model="newPassword" />
          </div>
        </div>
        <div class="item-field margin-top-60">
          <p class="text-font-main">Confirm New Password</p>
          <div class="input-wrapper-box margin-top-22">
            <q-input
              type="password"
              hide-underline
              class="full-width data-hj-whitelist"
              v-model="confirmPassword" />
          </div>
        </div>
      </div>
    </div>
    <div class="action-btn-box row justify-between">
      <q-btn
        class="btn-round-first bg-color-customer-primary"
        label="BACK"
        to="/account"
      />
      <q-btn
        class="btn-round-first"
        label="CONFIRM"
        @click="changePassword"
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
  name: 'Quotes',
  data () {
    return {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  methods: {
    changePassword () {
      if (this.$data.newPassword !== this.$data.confirmPassword) {
        this.$q.notify('The passwords need to match. PLease check and try again')
        return
      }
      Services.passwordChange(this.$data.currentPassword, this.$data.newPassword).then(a => {
        if (!a.result) {
          this.$q.notify('Your current password was entered incorrectly or the new password fails to meet password complexity requirements')
          return
        }
        this.$q.notify({message: 'Your account has been updated', color: 'positive', type: 'positive'})
        setTimeout(sender => {
          this.$store.commit('customerPortal/setUser', null)
          this.$store.commit('customerPortal/setAuthentication', false)
          this.$router.push('/index')
        }, 3000)
      }, error => {
        console.log(error)
        this.$store.commit('customerPortal/setUser', null)
        this.$store.commit('customerPortal/setAuthentication', false)
        this.$q.notify({message: 'Your account has been updated', color: 'positive', type: 'positive'})
        setTimeout(sender => {
          this.$router.push('/index')
        }, 3000)
      })
    }
  }
}
</script>
