<template>
  <div class="additional-driver-box">
    <p class="text-font-title">
      Additional driver details: <slot></slot> driver
    </p>
    <div class="driving-license-number-box">
      <p class="text-font-main">What is this additional driver's <b>driving licence number</b></p>
      <div class="card-box">
        <div class="row items-center">
          <img src="~assets/img/icon-driving-licence-flag.png">
          <p class="text-font-1 margin-left-34">DRIVING LICENCE</p>
        </div>
        <img src="~assets/img/icon-driving-licence-user.png" class="margin-top-24">
        <div class="input-wrapper-box row items-center justify-between">
          <q-input
            type="text"
            v-model="extraDrivingLicence"
            hide-underline placeholder="XXXXX000000X00 XX" />
          <help-icon :tooltip="tooltips.LicenceNumber"></help-icon>
        </div>
      </div>
    </div>
    <div class="preferred-title-box">
      <p class="text-font-main margin-bottom-main">What is this additional driver's <b>title</b>?</p>
      <div class="row items-center">
        <q-btn-toggle
          class="btn-toggle-standard"
          v-model="extraPreferredTitle"
          :options="[
            {label: 'Mr', value: 'Title.Mr'},
            {label: 'Mrs', value: 'Title.Mrs'},
            {label: 'Miss', value: 'Title.Miss'},
            {label: 'Other', value: 'Title.Other'}
          ]"
        />
         <q-select v-show="extraPreferredTitle != '' && extraPreferredTitle != 'Title.Mr' && extraPreferredTitle != 'Title.Mrs' && extraPreferredTitle != 'Title.Miss'"
                  class="select-common col-9 col-md-10 data-hj-whitelist" inverted separator
                  v-model="overnightPlace"
                  :options="titleList"
                />
      </div>
    </div>
    <div class="full-name-box">
      <p class="text-font-main">What is this additional driver's <b>full name.</b></p>
      <div class="margin-top-main row items-center justify-between">
        <div class="row justify-between">
          <div class="input-wrapper-box col-12 col-md-5">
            <q-input
              type="text"
              class="data-hj-whitelist"
              v-model="extraFirstName"
              hide-underline placeholder="First name(s)"
            />
          </div>
          <div class="input-wrapper-box col-12 col-md-5 row justify-between">
            <q-input
              type="text"
              v-model="extraSurname"
              class="col-10 col-md-10 data-hj-whitelist"
              hide-underline placeholder="Surname"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="employment-status-box">
      <p class="text-font-main margin-bottom-main">What is this additional driver's <b>relationship to policyholder</b>?</p>
      <div class="row items-center">
        <q-select
          inverted
          separator
          class="select-common col-9 col-md-10 data-hj-whitelist"
          v-model="relationshipToPolicyHolder"
          :options="relationshipToPolicyHolderList"
        />
      </div>
    </div>
    <div class="birth-box">
      <p class="text-font-main">What is this additional driver's <b>date of birth</b>?</p>
      <div class="input-wrapper-box margin-top-main relative-position row items-center justify-between">
        <q-datetime
          :disable="disableDateOfBirth"
          v-model="extraBirthday"
          format="DD/MM/YYYY"
          placeholder="DD/MM/YYYY"
          class="col-11 col-md-11 data-hj-whitelist"
          hide-icon
        />
        <div class="row items-center icon-box">
          <img src="~assets/img/icon-calendar.png"  />
        </div>
      </div>
    </div>
    <div class="employment-status-box">
      <p class="text-font-main margin-bottom-main">What is this additional driver's <b>employment status</b>?</p>
      <div class="row items-center">
        <q-select
          inverted
          separator
          class="select-common col-9 col-md-10 data-hj-whitelist"
          v-model="extraEmploymentStatus"
          :options="employmentStatusList"
        />
      </div>
    </div>
    <div class="occupation-box">
      <p class="text-font-main margin-bottom-main">What is this additional driver's <b>occupation</b>?</p>
      <div class="input-wrapper-box row items-center justify-between">
        <q-input
          v-model="extraOccupation"
          placeholder="Type to search..."
          class="col-10 col-md-11 data-hj-whitelist"
          hide-underline
          :after="[{icon: 'keyboard_arrow_down', handler () {}}]"
        >
          <q-autocomplete
            separator
            :static-data="{field: 'label', list: occupationList}"
            :min-characters="0"
          />
        </q-input>
      </div>
    </div>
    <div class="business-category-box">
      <p class="text-font-main margin-bottom-main">What is this additional driver's <b>business category?</b></p>
      <div class="input-wrapper-box row items-center justify-between">
        <q-input
          v-model="extraBusinessCategory"
          placeholder="Type to search..."
          class="col-10 col-md-11 data-hj-whitelist"
          hide-underline
          :after="[{icon: 'keyboard_arrow_down', handler () {}}]"
        >
          <q-autocomplete
            separator
            :static-data="{field: 'label', list: businessCategoryList}"
            :min-characters="0"
          />
        </q-input>
      </div>
    </div>
    <div class="confirm-box">
    </div>
    <div v-if="getDriverNumber!='fourth'" class="add-driver-box">
      <p class="text-font-main margin-bottom-main">Do you want to add <b>another driver</b>?</p>
      <div class="row items-center">
        <q-btn-toggle
          class="btn-toggle-standard data-hj-whitelist"
          v-model="extraAddDriver"
          :options="[
            {label: 'Yes', value: 'yes'},
            {label: 'No', value: 'no'},
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import '../css/app.styl'
import '../css/question-set.styl'
import HelpIcon from '../components/HelpIcon'
import ConstantData from 'src/assets/data/constant-data'

export default {
  name: 'DriverDetails',
  components: {
    HelpIcon
  },
  props: {
    driverNumber: {
      type: String
    },
    questionSet: {
      type: String,
      default: 'questionSet'
    }
  },
  computed: {
    disableDateOfBirth () {
      return !this.isQuoteJourney && this.extraExistingDriver
    },
    journey () {
      return this.isQuoteJourney ? this.$store.state.quoteJourney : this.$store.state.policyChange
    },
    journeyString () {
      return this.isQuoteJourney ? 'quoteJourney' : 'policyChange'
    },
    employmentStatusList: {
      get () {
        let personalDetail = this.journey.questionSet[ConstantData.Question_Set_ID.Personal_Detail]
        return personalDetail[ConstantData.Personal_Detail_List.Employment_Status]
      }
    },
    relationshipToPolicyHolderList: {
      get () {
        let personalDetail = this.journey.questionSet[ConstantData.Question_Set_ID.Additional_Driver]
        let dataa = personalDetail[ConstantData.Personal_Detail_List.RelationshipToPolicyHolder]
        return dataa
      }
    },
    occupationList: {
      get () {
        let personalDetail = this.journey.questionSet[ConstantData.Question_Set_ID.Personal_Detail]
        return personalDetail[ConstantData.Personal_Detail_List.Occupation]
      }
    },
    businessCategoryList: {
      get () {
        let personalDetail = this.journey.questionSet[ConstantData.Question_Set_ID.Personal_Detail]
        return personalDetail[ConstantData.Personal_Detail_List.Business_Category]
      }
    },
    titleList: {
      get () {
        let personalDetail = this.journey.questionSet[ConstantData.Question_Set_ID.Personal_Detail]
        return personalDetail[ConstantData.Personal_Detail_List.Title]
      }
    },
    getDriverNumber () {
      return this.driverNumber
    },
    isQuoteJourney () {
      return this.questionSet === 'questionSet'
    },
    extraExistingDriver: {
      get () {
        let currentDriverNumber = this.getDriverNumber
        let result = this.journey.extraExistingDriver[currentDriverNumber]
        return result
      }
    },
    extraAddDriver: {
      get () {
        let currentDriverNumber = this.getDriverNumber
        let result = this.journey.extraAddDriver[currentDriverNumber]
        return result
      },
      set (val) {
        let currentDriverNumber = this.getDriverNumber
        this.$store.commit(`${this.journeyString}/setExtraAddDriver`, {value: val, order: currentDriverNumber})
      }
    },
    extraDrivingLicence: {
      get () {
        let currentDriverNumber = this.getDriverNumber
        let result = this.journey.extraDrivingLicence[currentDriverNumber]
        return result
      },
      set (val) {
        let currentDriverNumber = this.getDriverNumber
        this.$store.commit(`${this.journeyString}/setExtraDrivingLicence`, {value: val, order: currentDriverNumber})
      }
    },
    extraPreferredTitle: {
      get () {
        let currentDriverNumber = this.getDriverNumber
        let result = this.journey.extraPreferredTitle[currentDriverNumber]
        return result
      },
      set (val) {
        let currentDriverNumber = this.getDriverNumber
        this.$store.commit(`${this.journeyString}/setExtraPreferredTitle`, {value: val, order: currentDriverNumber})
      }
    },
    extraFirstName: {
      get () {
        let currentDriverNumber = this.getDriverNumber
        let result = this.journey.extraFirstName[currentDriverNumber]
        return result
      },
      set (val) {
        let currentDriverNumber = this.getDriverNumber
        this.$store.commit(`${this.journeyString}/setExtraFirstName`, {value: val, order: currentDriverNumber})
      }
    },
    extraSurname: {
      get () {
        let currentDriverNumber = this.getDriverNumber
        let result = this.journey.extraSurname[currentDriverNumber]
        return result
      },
      set (val) {
        let currentDriverNumber = this.getDriverNumber
        this.$store.commit(`${this.journeyString}/setExtraSurname`, {value: val, order: currentDriverNumber})
      }
    },
    extraEmail: {
      get () {
        let currentDriverNumber = this.getDriverNumber
        let result = this.journey.extraEmail[currentDriverNumber]
        return result
      },
      set (val) {
        let currentDriverNumber = this.getDriverNumber
        this.$store.commit(`${this.journeyString}/setExtraEmail`, {value: val, order: currentDriverNumber})
      }
    },
    extraBirthday: {
      get () {
        let currentDriverNumber = this.getDriverNumber
        let result = this.journey.extraBirthday[currentDriverNumber]
        return result
      },
      set (val) {
        let currentDriverNumber = this.getDriverNumber
        this.$store.commit(`${this.journeyString}/setExtraBirthday`, {value: val, order: currentDriverNumber})
      }
    },
    extraEmploymentStatus: {
      get () {
        let currentDriverNumber = this.getDriverNumber
        let result = this.journey.extraEmploymentStatus[currentDriverNumber]
        return result
      },
      set (val) {
        let currentDriverNumber = this.getDriverNumber
        this.$store.commit(`${this.journeyString}/setExtraEmploymentStatus`, {value: val, order: currentDriverNumber})
      }
    },
    relationshipToPolicyHolder: {
      get () {
        let currentDriverNumber = this.getDriverNumber
        let result = this.journey.relationshipToPolicyHolder[currentDriverNumber]
        return result
      },
      set (val) {
        let currentDriverNumber = this.getDriverNumber
        this.$store.commit(`${this.journeyString}/setRelationshipToPolicyHolder`, {value: val, order: currentDriverNumber})
      }
    },
    extraOccupation: {
      get () {
        let currentDriverNumber = this.getDriverNumber
        let result = this.journey.extraOccupation[currentDriverNumber]
        return result
      },
      set (val) {
        let currentDriverNumber = this.getDriverNumber
        this.$store.commit(`${this.journeyString}/setExtraOccupation`, {value: val, order: currentDriverNumber})
      }
    },
    extraBusinessCategory: {
      get () {
        let currentDriverNumber = this.getDriverNumber
        let result = this.journey.extraBusinessCategory[currentDriverNumber]
        return result
      },
      set (val) {
        let currentDriverNumber = this.getDriverNumber
        this.$store.commit(`${this.journeyString}/setExtraBusinessCategory`, {value: val, order: currentDriverNumber})
      }
    },
    extraResident: {
      get () {
        let currentDriverNumber = this.getDriverNumber
        let result = this.journey.extraResident[currentDriverNumber]
        return result
      },
      set (val) {
        let currentDriverNumber = this.getDriverNumber
        this.$store.commit(`${this.journeyString}/setExtraResident`, {value: val, order: currentDriverNumber})
      }
    },
    extraMedicalCondition: {
      get () {
        let currentDriverNumber = this.getDriverNumber
        let result = this.journey.extraMedicalCondition[currentDriverNumber]
        return result
      },
      set (val) {
        let currentDriverNumber = this.getDriverNumber
        this.$store.commit(`${this.journeyString}/setExtraMedicalCondition`, {value: val, order: currentDriverNumber})
      }
    },
    extraCriminalConviction: {
      get () {
        let currentDriverNumber = this.getDriverNumber
        let result = this.journey.extraCriminalConviction[currentDriverNumber]
        return result
      },
      set (val) {
        let currentDriverNumber = this.getDriverNumber
        this.$store.commit(`${this.journeyString}/setExtraCriminalConviction`, {value: val, order: currentDriverNumber})
      }
    },
    extraVehicleWrittenOff: {
      get () {
        let currentDriverNumber = this.getDriverNumber
        let result = this.journey.extraVehicleWrittenOff[currentDriverNumber]
        return result
      },
      set (val) {
        let currentDriverNumber = this.getDriverNumber
        this.$store.commit(`${this.journeyString}/setExtraVehicleWrittenOff`, {value: val, order: currentDriverNumber})
      }
    },
    extraNoRisk: {
      get () {
        let currentDriverNumber = this.getDriverNumber
        let result = this.journey.extraNoRisk[currentDriverNumber]
        return result
      },
      set (val) {
        let currentDriverNumber = this.getDriverNumber
        this.$store.commit(`${this.journeyString}/setExtraNoRisk`, {value: val, order: currentDriverNumber})
      }
    },
    extraImpounded: {
      get () {
        let currentDriverNumber = this.getDriverNumber
        let result = this.journey.extraImpounded[currentDriverNumber]
        return result
      },
      set (val) {
        let currentDriverNumber = this.getDriverNumber
        this.$store.commit(`${this.journeyString}/setExtraImpounded`, {value: val, order: currentDriverNumber})
      }
    },
    extraLeftHandDrive: {
      get () {
        let currentDriverNumber = this.getDriverNumber
        let result = this.journey.extraLeftHandDrive[currentDriverNumber]
        return result
      },
      set (val) {
        let currentDriverNumber = this.getDriverNumber
        this.$store.commit(`${this.journeyString}/setExtraLeftHandDrive`, {value: val, order: currentDriverNumber})
      }
    }
  },
  data () {
    return {
      tooltips: {}
    }
  },
  created () {
    this.setTooltips()
  },
  methods: {
    setTooltips () {
      this.tooltips = this.$store.state.quoteJourney.tooltips
    }
  }
}
</script>

<style>
</style>
