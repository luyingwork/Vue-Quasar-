<template>
  <q-page class="home row flex-center">
    <div class="sign-in bg-color-customer-main col-10 col-md-8">
      <div class="title-box-main row items-center">
        <p class="title-text-main">Sign in</p>
      </div>
      <div class="sign-in-content">
        <div class="sign-in-field">
          <p class="text-font-9">Username</p>
          <div class="input-wrapper-box row justify-between items-center">
            <q-input
              type="text"
              class="col-8 col-md-10"
              hide-underline placeholder="Enter your username"
              v-model="username"
            />
          </div>
        </div>
        <div class="sign-in-field">
          <p class="text-font-9">Password</p>
          <div class="input-wrapper-box row justify-between items-center">
            <q-input
              type="password"
              class="col-8 col-md-10"
              hide-underline placeholder="Enter your password"
              v-model="password"
              v-on:keyup.enter="doSignIn"
              v-on:keyup.tab="doSignIn"
            />
          </div>
        </div>
        <div>
          <q-btn :disable="!hasPassword"
          style="margin-bottom: 10px"
            class="btn-main btn-sign-in bg-color-primary white"
            label="Sign in"
            @click="doSignIn"
          />
          <div style="margin-top: 10px" >
             <q-btn class="text-font-9"
              label="Forgotten login details?"
              to="/recover"
            /></div>
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
  name: 'Land',
  data () {
    return {
      invalid: false,
      pageState: '',
      username: '',
      password: ''
    }
  },
  created () {
    if (localStorage != null) {
      if (localStorage.getItem('username') !== null) {
        this.$data.username = localStorage.getItem('username')
      }
      if (localStorage.getItem('password') !== null) {
        this.$data.password = localStorage.getItem('password')
      }
      if (this.$data.username !== '' && this.$data.password !== '') {
        this.$q.loading.show({
          delay: 400 // ms
        })
        this.doSignIn()
      }
    }
  },
  computed: {
    hasPassword () {
      return this.password !== ''
    }
  },
  methods: {
    checkAuthentication () {
      return this.$store.state.customerPortal.authenticated
    },
    doSignIn () {
      if (this.$data.password === '') {
        return
      }
      if (this.$data.username === '' || this.$data.password === '') {
        this.$q.notify('You need to enter a username and password')
        return
      }
      this.$q.loading.show({
        delay: 400 // ms
      })
      Services.login(this.$data.username, this.$data.password).then(response => {
        if (response.success) {
          if (response.authenticated.result) {
            this.$q.loading.hide()
            localStorage.setItem('username', this.$data.username)
            localStorage.setItem('password', this.$data.password)
            this.$store.commit('customerPortal/setUser', response.authenticated.user)
            this.$store.commit('customerPortal/setAuthentication', true)
            this.$router.push('/dashboard')
          } else {
            setTimeout(fnc => {
              Services.authenticated().then(response => {
                if (response.result) {
                  this.$q.loading.hide()
                  localStorage.setItem('username', this.$data.username)
                  localStorage.setItem('password', this.$data.password)
                  this.$store.commit('customerPortal/setUser', response.user)
                  this.$store.commit('customerPortal/setAuthentication', true)
                  this.$router.push('/dashboard')
                } else {
                  this.$data.password = ''
                  this.$q.loading.hide()
                  if (response.error) {
                    this.$q.notify(response.error)
                  } else {
                    this.$q.notify('Failed authentication. Please close your browser and try again.')
                  }
                }
                this.$q.loading.hide()
              }, error => {
                this.$q.notify('Failed authentication. Please close your browser and try again.')
                console.log(error)
                this.$q.loading.hide()
              })
            }, 5000)
          }
        } else {
          this.$data.password = ''
          this.$q.loading.hide()
          this.$q.notify('The username and password you have provided is not valid, please try again or click the forgotten username or password buttons below')
        }
      }, error => {
        console.log(error)
      })
    }
  }
}
</script>
