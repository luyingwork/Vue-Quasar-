<template>
  <offline @detected-condition="handleConnectivityChange">
    <!-- Only renders when the device is online -->
    <div slot="online">
  <div id="q-app">
    <router-view />
  </div>
  </div>
    <div slot="offline">
      <p>Your devide appears to be offline. Please try again once you are connected to Wifi or have reception</p>
      ...
    </div>
  </offline>
</template>

<script>
import offline from 'v-offline'
export default {
  name: 'App',
  components: {
    offline
  },
  methods: {
    handleConnectivityChange (status) {
      console.log(status)
    }
  }
}
</script>

<style>
</style>
