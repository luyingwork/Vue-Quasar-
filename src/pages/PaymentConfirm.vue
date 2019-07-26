<template>
  <q-page class="row">
    <div class="side-bar col-md-4 col-lg-3 side-bar-container">
        <div>
      <side-bar
        :status="SideBar.status"
      />
       </div>
    </div>
    <div class="payment-confirm col-12 col-md-8 col-lg-9">
      <div class="container row items-center">
        <div class="content-main col-10">
          <div>
            <p class="text-font-8">Your payment has been accepted.</p>
            <p class="description text-font-9">Your policy number is: {{completedPolicy.policyNumber}}
              <br/>
              You will receive an account activation email shortly.
               Once you have activated your account, you will be able to log in to our portal to maintain your account and view your policy documentation.</p>
          </div>
          <q-btn v-show="!completedPolicy.requiresPasswordChange"
          class="btn-round-first bg-color-customer-primary" style="width:50%"
          label="GO TO DASHBOARD"
          to="/dashboard"
        />
          <div class="email-box" v-show="completedPolicy.requiresPasswordChange">
              <p class="text-font-main">Username: {{completedPolicy.username}} </p>
                <p class="text-font-main">Please set your <b>password</b> below:</p>
                <div class="input-wrapper-box margin-top-main row justify-between items-center">
                  <q-input
                    type="password"
                    v-model="password"
                    hide-underline
                    placeholder='Password'
                  />
                </div>
        </div>
        <br/>
        <q-btn v-show="completedPolicy.requiresPasswordChange"
                 style="width: 50%"
                    class="btn-round-first"
                    label="Update Password"
                    @click="updatePassword"
                  />
        <br/>
          </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import '../css/app.styl'
import '../css/payment.styl'
import Services from 'src/services/'
import SideBar from '../components/SideBar'
export default {
  components: {
    SideBar
  },
  computed: {
    loggedIn: {
      get () { return this.$store.state.customerPortal.user },
      set (val) { this.$store.commit('customerPortal/setUser', val) }
    },
    completedPolicy: {
      get () { return this.$store.state.quoteJourney.completedPolicy },
      set (val) { this.$store.commit('quoteJourney/setCompletedPolicy', val) }
    }
  },
  methods: {
    updatePassword () {
      if (this.password === '') {
        this.$q.notify({message: 'Please provide a password before continuing', color: 'red', type: 'positive'})
        return
      }
      Services.passwordChange('TkVXUEFTU1dPUkRORUVERUQ=', this.password).then(a => {
        if (!a.result) {
          this.$q.notify({message: 'Your password did not meet the minimum complexity requirements. Please check your password and try again.'})
          return
        }
        this.$q.notify({message: 'Your account has been updated', color: 'positive', type: 'positive'})
        Services.logout().then(fnc => {
          try {
            this.$store.commit('customerPortal/setUser', null)
            this.$store.commit('customerPortal/setAuthentication', false)
          } catch (ex) {
          }
          this.$router.push('/index')
        }, error => {
          console.log(error)
          try {
            this.$store.commit('customerPortal/setUser', null)
            this.$store.commit('customerPortal/setAuthentication', false)
          } catch (ex) {
          }
          this.$router.push('/index')
        })
      }, error => {
        console.log(error)
        this.$q.notify({message: 'Your account has been updated', color: 'positive', type: 'positive'})
        Services.logout().then(fnc => {
          try {
            this.$store.commit('customerPortal/setUser', null)
            this.$store.commit('customerPortal/setAuthentication', false)
          } catch (ex) {
          }
          this.$router.push('/index')
        }, error => {
          console.log(error)
          try {
            this.$store.commit('customerPortal/setUser', null)
            this.$store.commit('customerPortal/setAuthentication', false)
          } catch (ex) {
          }
          this.$router.push('/index')
        })
      })
    }
  },
  created () {
  },
  data () {
    return {
      SideBar: {
        status: 'last'
      }
    }
  }
}
</script>
