<template>
  <q-page class="quotes" style="margin-top:5%">
    <div class="font-family-lato" style="margin-top:-67px">
      <div class="margin-top-30 row justify-between items-end">
        <p class="page-title-main fs25">Your quotes</p>
        <p class="page-title-sub col-12 col-md-7">
        </p>
        <div v-if="quotes.length < 1" class="page-title-sub col-12 col-md-10 col-lg-8">
            You currently have no quotes.
        </div>
          <q-btn
            class="btn-round-first btn-new-quote mobile-res-btn-height35"
            label="NEW QUOTE"
            @click="newQuote"
          />
      </div>
    </div>
    <div class="page-content">
      <ul v-if="quotes.length > 0">
        <li class="item-box-first" v-for="(quote, idx) in quotes" :key="`${idx}`">
          <div class="row justify-between">
            <div class="item col-12 col-md-6 col-xl-2 ibfpd0">
              <p class="item-box-text-first">Quote Number</p>
              <p class="item-box-text-third fs20">{{ quote.quoteReference }}</p>
            </div>
            <div class="item col-12 col-md-6 col-xl-2 ibfpd0">
              <p class="item-box-text-first">Quote Date</p>
              <p class="item-box-text-third fs20">{{ moment(quote.quoteCreationDate) }}</p>
            </div>
            <div class="item col-12 col-md-6 col-xl-2 ibfpd0">
              <p class="item-box-text-first">Status</p>
              <p class="item-box-text-third fs20">{{ quote.status }}</p>
            </div>
            <div class="item col-12 col-md-6 col-xl-2 ibfpd0">
              <p class="item-box-text-first">Driver</p>
              <p class="item-box-text-third fs20">{{ quote.mainDriver.title + '. ' + quote.mainDriver.firstname + ' ' + quote.mainDriver.lastname }}</p>
            </div>
            <div class="item-btn row justify-end items-center col-12 col-xl-4">
              <q-btn
                v-if="quote.status === 'Quoted'"
                class="btn-round-second mobile-res-btn-height35"
                @click="selectQuote(quote.quoteId)">
                REVIEW & BUY
              </q-btn>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <q-pagination v-if="pages > 1" v-model="currentPage" @change="val => { currentPage = val}" color="primary" :min="1" :max="pages" :max-pages="6" />
    <br />
    <div>
      <q-btn
        v-if="quotes.length > 0"
        class="btn-round-first btn-new-quote mobile-res-btn-height35"
        label="NEW QUOTE"
        @click="newQuote"
      />
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { QPagination } from 'quasar'
import moment from 'moment'
import Services from 'src/services/'
import 'src/css/app.styl'
import 'src/css/customer-portal.styl'
export default {
  name: 'Quotes',
  data () {
    return {
      quotes: [],
      pages: 0,
      size: 5,
      currentPage: 1
    }
  },
  watch: {
    currentPage: function (val) {
      this.getAllCustomerQuotesFromApi()
    }
  },
  components: { QPagination },
  created () {
    this.getAllCustomerQuotesFromApi()
  },
  methods: {
    newQuote () {
      this.$store.commit('quoteJourney/clear', null)
      this.$router.push('QuoteJourney/question-set')
    },
    selectQuote (id) {
      this.$store.commit('quoteJourney/setQuoteId', id)
      this.$router.push({name: 'CarDetails'})
    },
    moment (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    async getAllCustomerQuotesFromApi () {
      this.$q.loading.show({
        delay: 400 // ms
      })
      Services.getAllCustomerQuotes(this.currentPage, this.size).then(result => {
        this.quotes = result.data.quotes
        this.pages = result.data.totalPages
        this.$q.loading.hide()
      }, error => {
        console.debug(error)
        this.$q.loading.hide()
      })
    }
  }
}
</script>
