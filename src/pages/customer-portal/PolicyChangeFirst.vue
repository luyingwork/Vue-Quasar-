<template>
  <q-page class="row">
    <div class="side-bar col-md-4 col-lg-3">
      <side-bar
        sideBarType="policyChange"
        :status="SideBar.status"
      />
    </div>
    <div class="question-set col-12 col-md-8 col-lg-9">
      <div class="policy-change">
        <div class="font-family-lato">
          <p class="page-title-main fs25 mt20">Policy Change: {{policyNumber}}</p>
        </div>
        <div class="page-content">
          <div class="vehicle-details">
            <p class="text-font-title fs25 mt40">Your vehicle details</p>
            <p class="text-font-main margin-top-90">
              <span>Let’s get started with your car's <b>registration number</b></span>
              <validation-tooltip :tooltip=this.validationTooltips.car v-show="this.showTooltips.car"></validation-tooltip>
            </p>
            <div class="car-reg-number-box row">
              <div class="img-box">
                <img src="~assets/img/icon-number-plate.png">
              </div>
              <div>
                <q-input
                  required="true"
                  class="input-box data-hj-whitelist fs25"
                  placeholder="XXXX XXX" hide-underline
                  autofocus
                  v-model="registrationNumber"
                  @blur="vehicleCheck"
                  :error="$v.registrationNumber.$error"
                />
              </div>
            </div>
            <div class="car-reg-number-text-only">
              <div class="input-wrapper-box margin-top-main row justify-between items-center">
                <q-input ref="regBox"
                  required="true"
                  class="input-box data-hj-whitelist"
                  placeholder="XXXX XXX" hide-underline
                  autofocus
                  v-model="registrationNumber"
                  @blur="vehicleCheck"
                  :error="$v.registrationNumber.$error"
                />
              </div>
            </div>
            <div class="notify-tab-enter-box row">
              <div class="mileage-box" v-show="car.make">
                <p class="text-font-main">What is the <b>make of the car?</b></p>
                <div class="input-wrapper-box margin-top-main row justify-between items-center">
                  <q-input
                    type="text"
                    hide-underline
                    v-model="car.make"
                    class="data-hj-whitelist"
                  />
                  <help-icon />
                </div>
              </div>
            </div>
            <div class="notify-tab-enter-box row">
              <div class="mileage-box" v-show="car.model">
                <p class="text-font-main">What is the <b>model of the car?</b></p>
                <div class="input-wrapper-box margin-top-main row justify-between items-center">
                  <q-input
                    type="text"
                    hide-underline
                    v-model="car.model"
                    class="data-hj-whitelist"
                  />
                  <help-icon />
                </div>
              </div>
            </div>
            <div class="row items-center check-box-item d-flex" v-show="car.model">
              <div style="flex: 1">
                <q-checkbox
                  class="custom-check text-font-main top-check-box-align data-hj-whitelist"
                  v-model="imported"
                  label="Has the car been imported?"   />
              </div>
            </div>
              <div class="row items-center check-box-item d-flex" v-show="car.model">
              <div style="flex: 1">
                <q-checkbox
                  class="custom-check text-font-main top-check-box-align data-hj-whitelist"
                  v-model="modified"
                  label="Has the car been modified?"   />
              </div>
            </div>
              <div class="row items-center check-box-item d-flex" v-show="car.model">
              <div style="flex: 1">
                <q-checkbox
                  class="custom-check text-font-main top-check-box-align data-hj-whitelist"
                  v-model="tracker"
                  label="Does the car have a tracker fitted?"   />
              </div>
            </div>
            <div class="mileage-box">
                <p class="text-font-main">When did you <b>purchase </b> the vehicle?</p>
                <div class="input-wrapper-box margin-top-main relative-position row items-center justify-between">
                  <q-datetime
                    hide-underline
                    modal
                    format="DD/MM/YYYY"
                    class="col-10 col-md-11"
                    placeholder="DD/MM/YYYY"
                    v-model="purchaseDate"
                  />
                  <div class="row items-center icon-box">
                    <img src="~assets/img/icon-calendar.png"  />
                  </div>
                </div>
              </div>
             <div class="mileage-box"  v-show="car">
              <p class="text-font-main">What is the <b>value of the car?</b></p>
              <div class="input-wrapper-box margin-top-main row justify-between items-center">
                <q-input
                  type="number"
                  hide-underline placeholder="E.g. 2000"
                  v-model="value"
                  class="data-hj-whitelist"
                />
              </div>
            </div>

            <div class="mileage-box">
              <p class="text-font-main">What is your <b>estimated annual mileage?</b></p>
              <div class="input-wrapper-box margin-top-main row justify-between items-center">
                <q-input
                  type="number"
                  hide-underline placeholder="Eg. 10,000"
                  v-model="mileage"
                  class="data-hj-whitelist"
                />
                <help-icon />
              </div>
            </div>
            <div class="owner-box">
              <p class="text-font-main margin-bottom-main">Who is the <b>owner</b> of the car?</p>
              <div class="row items-center">
                <q-btn-toggle
                  class="btn-toggle-standard data-hj-whitelist"
                  v-model="carOwner"
                  :options="[
                      {label: 'Proposer/Policyholder', value: 'RegisteredKeeper.ProposerPolicyholder'},
                    {label: 'Other', value: 'RegisteredKeeper.Other'},
                  ]"
                />
                <q-select v-show="carOwner != 'RegisteredKeeper.ProposerPolicyholder' && carOwner !=''"
                  class="select-common col-9 col-md-10 data-hj-whitelist" inverted separator
                  v-model="carOwner"
                  :options="ownerList"
                />
                <help-icon />
              </div>
            </div>
            <div class="keeper-box">
              <p class="text-font-main margin-bottom-main">Who is the <b>keeper</b> of the car?</p>
              <div class="row items-center">
                <q-btn-toggle
                  class="btn-toggle-standard data-hj-whitelist"
                  v-model="carKeeper"
                  :options="[
                    {label: 'Proposer/Policyholder', value: 'RegisteredKeeper.ProposerPolicyholder'},
                    {label: 'Other', value: 'RegisteredKeeper.Other'},
                  ]"
                />
                <q-select v-show="carKeeper != 'RegisteredKeeper.ProposerPolicyholder' && carKeeper != ''"
                  class="select-common col-9 col-md-10 data-hj-whitelist" inverted separator
                  v-model="carKeeper"
                  :options="keeperList"
                />
                <help-icon />
              </div>
            </div>
            <div class="park-box">
              <p class="text-font-main margin-bottom-main">Where will the car be <b>kept overnight?</b></p>
              <div class="row items-center justify-between-prometheus">
                <q-select
                  class="select-common col-9 col-md-10 data-hj-whitelist" inverted separator
                  v-model="overnightPlace"
                  :options="overnightPlaceList"
                />
                <help-icon />
              </div>
            </div>
          </div>
          <div class="personal-details">
            <div class="main-personal-details">
              <p class="text-font-title fs25">Your personal details</p>
              <div class="driving-license-number-box">
                <p class="text-font-main">
                  <span class="question-title">
                    The first thing we need is your <b>driving licence number</b>
                  </span>
                  <validation-tooltip :tooltip=this.validationTooltips.licence v-show="this.showTooltips.licence"></validation-tooltip>
                </p>
                <div class="clear-fix"></div>
                <div class="card-box">
                  <div class="row items-center">
                    <img src="~assets/img/icon-driving-licence-flag.png">
                    <p class="text-font-1 margin-left-34">DRIVING LICENCE</p>
                  </div>
                  <img src="~assets/img/icon-driving-licence-user.png" class="margin-top-24">
                  <div class="input-wrapper-box row items-center justify-between">
                    <q-input
                      type="text"
                      class="data-hj-whitelist"
                      v-model="drivingLicence"
                      hide-underline placeholder="XXXXX000000X00 XX"
                    />
                    <help-icon />
                  </div>
                </div>
                <div class="driving-license-text-only">
                  <div class="input-wrapper-box margin-top-main row justify-between items-center">
                    <q-input
                      type="text"
                      v-model="drivingLicence"
                      hide-underline placeholder="XXXXX000000X00 XX"
                      class="data-hj-whitelist" />
                    <help-icon />
                  </div>
                </div>
              </div>
              <div class="preferred-title-box">
                <p class="text-font-main margin-bottom-main">What is your preferred <b>title</b>?</p>
                <div class="row items-center">
                  <q-btn-toggle
                    class="btn-toggle-standard data-hj-whitelist"
                    v-model="preferredTitle"
                    :options="[
                      {label: 'Mr', value: 'Title.Mr'},
                      {label: 'Mrs', value: 'Title.Mrs'},
                      {label: 'Miss', value: 'Title.Miss'},
                      {label: 'Other', value: 'Title.Other'}
                    ]"
                  />
                  <q-select v-show="preferredTitle != '' && preferredTitle != 'Title.Mr' && preferredTitle != 'Title.Mrs' && preferredTitle != 'Title.Miss'"
                  class="select-common col-9 col-md-10 data-hj-whitelist" inverted separator
                  v-model="preferredTitle"
                  :options="titleList"
                />
                  <validation-tooltip :tooltip=this.validationTooltips.title v-show="this.showTooltips.title"></validation-tooltip>
                </div>
              </div>
              <div class="full-name-box">
                <p class="text-font-main">Now we need your <b>full name.</b></p>
                <div class="margin-top-main row items-center justify-between">
                  <div class="row justify-between">
                    <div class="input-wrapper-box col-12 col-md-5">
                      <q-input
                        type="text"
                        v-model="firstName"
                        hide-underline placeholder="First name(s)"
                        class="data-hj-whitelist"
                      />
                    </div>
                    <validation-tooltip :tooltip=this.validationTooltips.firstName v-show="this.showTooltips.firstName"></validation-tooltip>
                    <div class="input-wrapper-box col-12 col-md-5 row justify-between">
                      <q-input
                        type="text"
                        v-model="surname"
                        class="col-10 col-md-10 data-hj-whitelist"
                        hide-underline placeholder="Surname"
                      />
                    </div>
                    <validation-tooltip :tooltip=this.validationTooltips.lastName v-show="this.showTooltips.lastName"></validation-tooltip>
                  </div>
                </div>
              </div>
              <div class="email-box">
                <p class="text-font-main">
                  <span class="question-title">
                    What is your <b>email address</b>?
                  </span>
                  <validation-tooltip :tooltip=this.validationTooltips.email v-show="this.showTooltips.email"></validation-tooltip>
                </p>
                <div class="clear-fix"></div>
                <div class="input-wrapper-box margin-top-main row justify-between items-center">
                  <q-input
                    type="email"
                    v-model="emailAddress"
                    hide-underline
                  />
                  <help-icon />
                </div>
              </div>
              <div class="mobile-number-box">
                <p class="text-font-main">
                  <span class="question-title">
                    What is your <b>mobile phone number</b>?
                  </span>
                  <validation-tooltip :tooltip=this.validationTooltips.mobileNumber v-show="this.showTooltips.mobileNumber"></validation-tooltip>
                </p>
                <div class="clear-fix"></div>
                <div class="input-wrapper-box margin-top-main row items-center justify-between">
                  <q-input
                    type="tel"
                    maxlength="14"
                    hide-underline placeholder="00000 000000"
                    v-model="mobileNumber"
                  />
                </div>
              </div>
              <div class="birth-box">
                <p class="text-font-main">What is your <b>date of birth</b>?</p>
                <div class="input-wrapper-box margin-top-main relative-position row items-center justify-between">
                  <q-datetime
                    disable
                    hide-underline
                    modal
                    class="col-md-11 col-10 data-hj-whitelist"
                    placeholder="DD/MM/YYYY"
                    v-model="birthday"
                  />
                  <div class="row items-center icon-box">
                    <img src="~assets/img/icon-calendar.png"  />
                  </div>
                  <validation-tooltip :tooltip=this.validationTooltips.birth v-show="this.showTooltips.birth"></validation-tooltip>
                </div>
              </div>
              <div class="post-code-box">
                <p class="text-font-main">Please enter your <b>house number</b> or <b>building name</b>.</p>
                <p class="text-font-2 margin-top-13">We’ll use this to look up your address.</p>
                <div class="input-wrapper-box margin-top-main row items-center justify-between">
                  <q-input
                    ref="houseNumber"
                    type="text"
                    hide-underline placeholder="1"
                    v-model="houseNumber"
                    class="data-hj-whitelist"
                  />
                  <help-icon />
                </div>
              </div>
              <div class="post-code-box">
                <p class="text-font-main">
                  <span class="question-title">
                    Please enter your <b>postcode</b>.
                  </span>
                  <validation-tooltip :tooltip=this.validationTooltips.postCode v-show="this.showTooltips.postCode"></validation-tooltip>
                </p>
                <div class="clear-fix"></div>
                <p class="text-font-2 margin-top-13">We’ll use this to look up your address.</p>
                <div class="input-wrapper-box margin-top-main row items-center justify-between">
                  <q-input
                    maxlength="10"
                    type="text"
                    hide-underline
                    placeholder="M1 2AQ"
                    v-model="postCode"
                    @blur="postCodeCheck"
                    class="data-hj-whitelist"
                  />
                  <help-icon />
                </div>
              </div>
              <div class="post-code-box" v-show="address.line1">
                <p class="text-font-main">First line of your <b>address</b>.</p>
                <div class="input-wrapper-box margin-top-main row items-center justify-between">
                  <q-input
                    type="text"
                    hide-underline
                    v-model="address.line1"
                    class="data-hj-whitelist"
                  />
                  <help-icon />
                </div>
              </div>
               <div class="post-code-box" v-show="address.postTown">
                <p class="text-font-main"><b>Town</b>.</p>
                <div class="input-wrapper-box margin-top-main row items-center justify-between">
                  <q-input
                    type="text"
                    hide-underline
                    v-model="address.postTown"
                    class="data-hj-whitelist"
                  />
                  <help-icon />
                </div>
              </div>
              <!-- <div class="claims-protect-box" >
                <p class="text-font-main margin-bottom-main">Do you want <b>no claims protection</b>?</p>
                <div class="row items-center">
                  <q-btn-toggle
                    disable
                    class="btn-toggle-standard data-hj-whitelist"
                    v-model="claimProtection"
                    :options="[
                      {label: 'Yes', value: 'yes'},
                      {label: 'No', value: 'no'},
                    ]"
                  />
                  <help-icon />
                </div>
              </div> -->
              <div class="employment-status-box">
                <p class="text-font-main margin-bottom-main">What is your <b>employment status</b>?</p>
                <div class="row items-center">
                  <q-select
                    inverted
                    separator
                    class="select-common col-9 col-md-10 data-hj-whitelist"
                    v-model="employmentStatus"
                    :options="employmentStatusList"
                  />
                  <help-icon />
                </div>
              </div>
              <div class="occupation-box">
                <p class="text-font-main margin-bottom-main">
                  <span class="question-title">
                    What is your <b>occupation</b>?
                  </span>
                  <validation-tooltip :tooltip=this.validationTooltips.occupation v-show="this.showTooltips.occupation"></validation-tooltip>
                </p>
                <div class="clear-fix"></div>
                <div class="input-wrapper-box row items-center justify-between">
                  <q-input
                    placeholder="Type to search..."
                    class="col-10 col-md-11 data-hj-whitelist"
                    hide-underline
                    :after="[{icon: 'keyboard_arrow_down', handler () {}}]"
                    v-model="occupation">
                    <q-autocomplete
                      inverted separator
                      :static-data="{field: 'label', list: occupationList}"
                      :min-characters="0"
                    />
                  </q-input>
                  <help-icon />
                </div>
              </div>
              <div class="business-category-box">
                <p class="text-font-main margin-bottom-main">
                  <span class="question-title">
                    What is your <b>business category?</b>
                  </span>
                  <validation-tooltip :tooltip=this.validationTooltips.category v-show="this.showTooltips.category"></validation-tooltip>
                </p>
                <div class="clear-fix"></div>
                <div class="input-wrapper-box row items-center justify-between">
                  <q-input
                    v-model="businessCategory"
                    placeholder="Type to search..."
                    class="col-10 col-md-11 data-hj-whitelist"
                    hide-underline
                    :after="[{icon: 'keyboard_arrow_down', handler () {}}]"
                  >
                    <q-autocomplete
                      inverted separator
                      :static-data="{field: 'label', list: businessCategoryList}"
                      :min-characters="0"
                    />
                  </q-input>
                  <help-icon />
                </div>
              </div>
              <div class="confirm-box">
                <div class="row items-center justify-between-prometheus">
                  <p class="text-font-main col-9 col-md-10"><b>Please confirm</b> the following: </p>
                  <help-icon />
                </div>
                <div class="checkbox-wrapper">
                  <div class="row items-center check-box-item">
          <q-checkbox
            class="custom-check text-font-main top-check-box-align"
            v-model="resident"
            label="They are a UK Resident since birth"
          />
          <span style="margin-left: 10px">
            <validation-tooltip :tooltip=this.validationTooltips.residency v-show="this.showTooltips.residency"></validation-tooltip>
          </span>
        </div>
        <div class="row items-center check-box-item">
          <q-checkbox
            class="custom-check text-font-main top-check-box-align data-hj-whitelist"
            v-model="medicalCondition"
            label="They have no Medical Conditions"
          />
          <span style="margin-left: 10px">
            <validation-tooltip :tooltip=this.validationTooltips.medical v-show="this.showTooltips.medical"></validation-tooltip>
          </span>
        </div>
        <div class="row items-center check-box-item">
          <q-checkbox
            class="custom-check text-font-main top-check-box-align data-hj-whitelist"
            v-model="criminalConviction"
            label="They have had no unspent non-motoring criminal convictions"
          />
          <span style="margin-left: 10px">
            <validation-tooltip :tooltip=this.validationTooltips.motoring v-show="this.showTooltips.motoring"></validation-tooltip>
          </span>
        </div>
        <div class="row items-center check-box-item">
          <q-checkbox
            class="custom-check text-font-main top-check-box-align data-hj-whitelist"
            v-model="vehicleWrittenOff"
            label="You have never had a vehicle written off"
          />
          <span style="margin-left: 10px">
            <validation-tooltip :tooltip=this.validationTooltips.written v-show="this.showTooltips.written"></validation-tooltip>
          </span>
        </div>
        <div class="row items-center check-box-item">
          <q-checkbox
            class="custom-check text-font-main top-check-box-align data-hj-whitelist"
            v-model="noRisk"
            label="There have been no risks where previous policy has been cancelled or void, or where any driver has been refused insurance"
          />
          <span style="margin-left: 10px">
             <validation-tooltip :tooltip=this.validationTooltips.policy v-show="this.showTooltips.policy"></validation-tooltip>
          </span>
        </div>
        <div class="row items-center check-box-item">
          <q-checkbox
            class="custom-check text-font-main top-check-box-align data-hj-whitelist"
            v-model="impounded"
            label="The vehicle has not been impounded"
          />
          <span style="margin-left: 10px">
            <validation-tooltip :tooltip=this.validationTooltips.impounded v-show="this.showTooltips.impounded"></validation-tooltip>
          </span>
        </div>
        <div class="row items-center check-box-item">
          <q-checkbox
            class="custom-check text-font-main top-check-box-align data-hj-whitelist"
            v-model="leftHandDrive"
            label="Vehicle is not left hand drive"
          />
          <span style="margin-left: 10px">
            <validation-tooltip :tooltip=this.validationTooltips.leftHand v-show="this.showTooltips.leftHand"></validation-tooltip>
          </span>
        </div>
            </div>
              </div>
              <div class="add-driver-box">
                <p class="text-font-main margin-bottom-main">Do you want to add <b>another driver</b>?</p>
                <div class="row items-center">
                  <q-btn-toggle
                    class="btn-toggle-standard data-hj-whitelist"
                    v-model="addDriver"
                    :options="[
                    {label: 'Yes', value: 'yes'},
                    {label: 'No', value: 'no'},
                  ]"
                  />
                  <help-icon />
                </div>
              </div>
            </div>
            <div class="additional-personal-details">
              <driver-details
                v-if="addDriver=='yes'" driverNumber = 'first' questionSet='policyChange'>
                1st
              </driver-details>
              <driver-details
                v-if="extraAddDriver.first=='yes'" driverNumber = 'second' questionSet='policyChange'>
                2nd
              </driver-details>
              <driver-details
                v-if="extraAddDriver.second=='yes'" driverNumber = 'third' questionSet='policyChange'>
                3rd
              </driver-details>
              <driver-details
                v-if="extraAddDriver.third=='yes'" driverNumber = 'fourth' questionSet='policyChange'>
                4th
              </driver-details>
            </div>
          </div>
          <div class="cover-details">
            <p class="text-font-title fs25">Your cover details</p>
            <!-- <div class="cover-kind-box">
              <p class="text-font-main margin-bottom-main"><b>What kind of cover</b> would you like to arrange? </p>
              <div class="row items-center justify-between-prometheus">
                <q-select
                  inverted separator
                  class="select-common col-9 col-md-10 data-hj-whitelist"
                  v-model="coverType"
                  :options="coverKindList"
                />
                <help-icon />
              </div>
            </div> -->
            <div class="arrange-class-box">
              <p class="text-font-main margin-bottom-main"><b>What class of use</b> would you like to arrange? </p>
              <div class="row items-center justify-between-prometheus">
                <q-select
                  inverted separator
                  class="select-common col-9 col-md-10 data-hj-whitelist"
                  v-model="classOfUse"
                  :options="classOfUseList"
                  placeholder="Please select class of use"
                />
                <help-icon />
              </div>
            </div>
            <div style="height:30px"></div>
            <div class="mileage-box" v-show="classOfUse == 'CarClassOfUse.ProposersBusiness' || classOfUse == 'CarClassOfUse.UseOnAnothersBusiness' || classOfUse == 'CarClassOfUse.NamedDriversBusiness'">
              <p class="text-font-main">What is your <b>estimated annual business mileage?</b></p>
              <div class="input-wrapper-box margin-top-main row justify-between items-center">
                <q-input
                  type="number"
                  hide-underline placeholder="Eg. 10,000"
                  v-model="mileageBusiness"
                  class="data-hj-whitelist"
                />
                <help-icon />
              </div>
            </div>
            <div class="cover-start-date-box">
              <p class="text-font-main margin-bottom-main">
                <span class="question-title">
                  When would you like the <b>change to take effect</b>?
                </span>
                <validation-tooltip :tooltip=this.validationTooltips.startDay v-show="this.showTooltips.startDay"></validation-tooltip>
              </p>
              <div class="clear-fix"></div>
              <div class="row items-center">
                <q-btn-toggle
                  class="btn-toggle-standard col-9 col-md-11"
                  v-model="coverStartDay"
                  :options="[
                    {label: 'Today', value: 'today'},
                    {label: 'Tomorrow', value: 'tomorrow'},
                    {label: 'Day after tomorrow', value: 'after'},
                    {label: 'Other', value: 'other'}
                  ]"
                />
                <help-icon />
              </div>
            </div>
            <div v-show="coverStartDay != 'today' && coverStartDay != 'tomorrow' && coverStartDay != 'after'" style="margin-top: 5%">
                <q-datetime style="width:100%"
                  modal
                  class="col-10 col-md-11 data-hj-whitelist"
                  type="datetime"
                  format="DD/MM/YYYY HH:mm"
                  placeholder="DD/MM/YYYY HH:mm"
                  :min="new Date()"
                  v-model="coverStartDay"
                />
            </div>
            <div class="voluntary-excess-box">
              <p class="text-font-main margin-bottom-main">How much would you like to have for <b>voluntary excess</b>?</p>
              <div class="row items-center justify-between-prometheus">
                <q-select disable
                  inverted separator
                  prefix = "£"
                  class="select-common col-9 col-md-10 data-hj-whitelist"
                  v-model="voluntaryExcess"
                  :options="voluntaryExcessList"
                />
                <help-icon />
              </div>
            </div>
            <div class="change-reason">
            <p class="text-font-title fs25">Reason for change</p>
            <div class="reason-kind-box">
              <p class="text-font-main margin-bottom-main"><b>For What reason</b> are you wanting to make a change? </p>
              <div class="row items-center justify-between-prometheus">
                <q-select
                  inverted separator
                  class="select-common col-9 col-md-10 data-hj-whitelist"
                  v-model="reasonForChange"
                  :options="reasonKindList"
                />
                <help-icon />
              </div>
            </div>
          </div>
          </div>
          <div>
            <p class="text-box-2">
              That’s all we need to know! If you’re happy that everything’s correct, please click the button below to get your quote.
            </p>
          <q-btn class="btn-nav"
            @click="getQuote"
            label="Continue" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'

import { QSpinnerIos, Loading } from 'quasar'
import 'src/css/app.styl'
import 'src/css/customer-portal.styl'
import 'src/css/question-set.styl'
import SideBar from 'src/components/SideBar'
import HelpIcon from 'src/components/HelpIcon'
import DriverDetails from 'src/components/DriverDetails'
import StaticList from 'src/assets/data/static-list'
import ConstantData from 'src/assets/data/constant-data'
import Services from 'src/services/'
import ValidationTooltip from 'src/components/ValidationTooltip'

export default {
  name: 'PolicyChangeFirst',
  components: {
    ValidationTooltip,
    HelpIcon,
    SideBar,
    DriverDetails
  },
  data () {
    return {
      SideBar: {
        status: 'first'
      },
      overnightPlaceList: [],
      employmentStatusList: [],
      occupationList: [],
      businessCategoryList: [],
      coverKindList: [],
      classOfUseList: [],
      voluntaryExcessList: [],
      titleList: [],
      ownerList: [],
      keeperList: [],
      validationTooltips: {
        email: 'Your email address is incorrect.',
        birth: 'Your date of birth is wrong.',
        class: 'Please select the usage class from the list.',
        car: 'You need to enter a valid car registration.',
        title: 'You need to enter your Title.',
        firstName: 'You need to enter your first name.',
        lastName: 'You need to enter your last name.',
        licence: 'You need to enter a driving licence number.',
        mobileNumber: 'You need to enter a valid mobile number.',
        postCode: 'You need to enter a valid postcode.',
        occupation: 'You need to enter a valid occupation.',
        category: 'You need to enter a valid business category.',
        residency: 'You need to confirm your residency status.',
        medical: 'You need to confirm you have no Medical conditions.',
        motoring: 'You need to confirm you have no unspent motoring convictions.',
        policy: 'You need to confirm that there have been no risks where previous policy has been cancelled or void, or where any driver has been refused insurance.',
        leftHand: 'You need to confirm the vehicle is not left hand drive.',
        written: 'You need to confirm the vehicle is not written off.',
        impounded: 'You need to confirm the vehicle has not been impounded.',
        startDay: 'You need to confirm the cover start day.'
      },
      showTooltips: {
        email: false,
        birth: false,
        class: false,
        car: false,
        title: false,
        firstName: false,
        lastName: false,
        licence: false,
        mobileNumber: false,
        postCode: false,
        occupation: false,
        category: false,
        residency: false,
        medical: false,
        motoring: false,
        policy: false,
        leftHand: false,
        written: false,
        impounded: false,
        startDay: false
      }
    }
  },
  created () {
    this.loadDataFromApi()
  },
  validations: {
    registrationNumber: { required },
    mileage: { required, maxLength: maxLength(255) },
    postCode: { required }
  },
  computed: {
    searchEngineList () { return StaticList.searchEngineList },
    reasonKindList () { return StaticList.reasonKindList },
    hourList () { return StaticList.hourList },
    minuteList () { return StaticList.minuteList },
    policyNumber: {
      get () { return this.$store.state.customerPortal.policyNumber }
    },
    car: {
      get () { return this.$store.state.policyChange.car },
      set (val) { this.$store.commit('policyChange/setCar', val) }
    },
    registrationNumber: {
      get () { return this.$store.state.policyChange.registrationNumber },
      set (val) { this.$store.commit('policyChange/setRegistrationNumber', val.toUpperCase()) }
    },
    mileage: {
      get () { return this.$store.state.policyChange.mileage },
      set (val) { this.$store.commit('policyChange/setMileage', val) }
    },
    mileageBusiness: {
      get () { return this.$store.state.policyChange.mileageBusiness },
      set (val) { this.$store.commit('policyChange/setMileageBusiness', val) }
    },
    carOwner: {
      get () { return this.$store.state.policyChange.carOwner },
      set (val) { this.$store.commit('policyChange/setCarOwner', val) }
    },
    carKeeper: {
      get () { return this.$store.state.policyChange.carKeeper },
      set (val) { this.$store.commit('policyChange/setCarKeeper', val) }
    },
    value: {
      get () { return this.$store.state.policyChange.value },
      set (val) { this.$store.commit('policyChange/setValue', val) }
    },
    overnightPlace: {
      get () { return this.$store.state.policyChange.overnightPlace },
      set (val) { this.$store.commit('policyChange/setOvernightPlace', val) }
    },
    drivingLicence: {
      get () { return this.$store.state.policyChange.drivingLicence },
      set (val) { this.$store.commit('policyChange/setDrivingLicence', val.toUpperCase()) }
    },
    preferredTitle: {
      get () { return this.$store.state.policyChange.preferredTitle },
      set (val) { this.$store.commit('policyChange/setPreferredTitle', val) }
    },
    purchaseDate: {
      get () { return this.$store.state.policyChange.purchaseDate },
      set (val) { this.$store.commit('policyChange/setPurchaseDate', val) }
    },
    firstName: {
      get () { return this.$store.state.policyChange.firstName },
      set (val) { this.$store.commit('policyChange/setFirstName', val) }
    },
    surname: {
      get () { return this.$store.state.policyChange.surname },
      set (val) { this.$store.commit('policyChange/setSurname', val) }
    },
    emailAddress: {
      get () { return this.$store.state.policyChange.emailAddress },
      set (val) { this.$store.commit('policyChange/setEmailAddress', val) }
    },
    mobileNumber: {
      get () { return this.$store.state.policyChange.mobileNumber },
      set (val) { this.$store.commit('policyChange/setMobileNumber', val) }
    },
    birthday: {
      get () { return this.$store.state.policyChange.birthday },
      set (val) { this.$store.commit('policyChange/setBirthday', val) }
    },
    postCode: {
      get () { return this.$store.state.policyChange.postCode },
      set (val) { this.$store.commit('policyChange/setPostCode', val.toUpperCase()) }
    },
    claimProtection: {
      get () { return this.$store.state.policyChange.claimProtection },
      set (val) { this.$store.commit('policyChange/setClaimProtection', val) }
    },
    employmentStatus: {
      get () { return this.$store.state.policyChange.employmentStatus },
      set (val) { this.$store.commit('policyChange/setEmploymentStatus', val) }
    },
    occupation: {
      get () { return this.$store.state.policyChange.occupation },
      set (val) { this.$store.commit('policyChange/setOccupation', val) }
    },
    businessCategory: {
      get () { return this.$store.state.policyChange.businessCategory },
      set (val) { this.$store.commit('policyChange/setBusinessCategory', val) }
    },
    resident: {
      get () { return this.$store.state.policyChange.resident },
      set (val) { this.$store.commit('policyChange/setResident', val) }
    },
    medicalCondition: {
      get () { return this.$store.state.policyChange.medicalCondition },
      set (val) { this.$store.commit('policyChange/setMedicalCondition', val) }
    },
    criminalConviction: {
      get () { return this.$store.state.policyChange.criminalConviction },
      set (val) { this.$store.commit('policyChange/setCriminalConviction', val) }
    },
    searchEngine: {
      get () { return this.$store.state.policyChange.searchEngine },
      set (val) { this.$store.commit('policyChange/setSearchEngine', val) }
    },
    otherSearchEngine: {
      get () { return this.$store.state.policyChange.otherSearchEngine },
      set (val) { this.$store.commit('policyChange/setOtherSearchEngine', val) }
    },
    contactByEmail: {
      get () { return this.$store.state.policyChange.contactByEmail },
      set (val) { this.$store.commit('policyChange/setContactByEmail', val) }
    },
    contactBySMS: {
      get () { return this.$store.state.policyChange.contactBySMS },
      set (val) { this.$store.commit('policyChange/setContactBySMS', val) }
    },
    addDriver: {
      get () { return this.$store.state.policyChange.addDriver },
      set (val) { this.$store.commit('policyChange/setAddDriver', val) }
    },
    extraAddDriver: {
      get () { return this.$store.state.policyChange.extraAddDriver },
      set (val) { this.$store.commit('policyChange/setExtraAddDriver', val) }
    },
    coverType: {
      get () { return this.$store.state.policyChange.coverType },
      set (val) { this.$store.commit('policyChange/setCoverKind', val) }
    },
    classOfUse: {
      get () { return this.$store.state.policyChange.classOfUse },
      set (val) { this.$store.commit('policyChange/setUseClass', val) }
    },
    coverStartDay: {
      get () { return this.$store.state.policyChange.coverStartDay },
      set (val) { this.$store.commit('policyChange/setCoverStartDay', val) }
    },
    coverStartHour: {
      get () { return this.$store.state.policyChange.coverStartHour },
      set (val) { this.$store.commit('policyChange/setCoverStartHour', val) }
    },
    coverStartMinute: {
      get () { return this.$store.state.policyChange.coverStartMinute },
      set (val) { this.$store.commit('policyChange/setCoverStartMinute', val) }
    },
    voluntaryExcess: {
      get () { return this.$store.state.policyChange.voluntaryExcess },
      set (val) { this.$store.commit('policyChange/setVoluntaryExcess', val) }
    },
    reasonForChange: {
      get () { return this.$store.state.policyChange.reasonForChange },
      set (val) { this.$store.commit('policyChange/setReasonForChange', val) }
    },
    vehicleWrittenOff: {
      get () { return this.$store.state.policyChange.vehicleWrittenOff },
      set (val) { this.$store.commit('policyChange/setVehicleWrittenOff', val) }
    },
    noRisk: {
      get () { return this.$store.state.policyChange.noRisk },
      set (val) { this.$store.commit('policyChange/setNoRisk', val) }
    },
    impounded: {
      get () { return this.$store.state.policyChange.impounded },
      set (val) { this.$store.commit('policyChange/setImpounded', val) }
    },
    leftHandDrive: {
      get () { return this.$store.state.policyChange.leftHandDrive },
      set (val) { this.$store.commit('policyChange/setLeftHandDrive', val) }
    },
    address: {
      get () { return this.$store.state.policyChange.address },
      set (val) { this.$store.commit('policyChange/setAddress', val) }
    },
    houseNumber: {
      get () { return this.$store.state.policyChange.houseNumber },
      set (val) { this.$store.commit('policyChange/setHouseNumber', val) }
    },
    modified: {
      get () { return this.$store.state.policyChange.modified },
      set (val) { this.$store.commit('policyChange/setModified', val) }
    },
    tracker: {
      get () { return this.$store.state.policyChange.tracker },
      set (val) { this.$store.commit('policyChange/setTracker', val) }
    },
    imported: {
      get () { return this.$store.state.policyChange.imported },
      set (val) { this.$store.commit('policyChange/setImported', val) }
    }
  },
  methods: {
    async loadDataFromApi () {
      Loading.show({
        spinner: QSpinnerIos,
        message: 'Loading Data. Please wait...'
      })
      const allProducts = await this.$store.dispatch('quoteJourney/getAllProducts')
      allProducts.map(async product => {
        if (product.uniqueId === 'ModernCar') {
          const productPages = await this.$store.dispatch('quoteJourney/getProductPages', product.uniqueId)
          let questionSetList = []
          for (let i = 0; i < productPages.length; i++) {
            const questionSet = await this.$store.dispatch('quoteJourney/getQuestionSet', productPages[i])
            questionSetList.push(questionSet)
          }
          console.log('!!!!!--DONE Load API--!!!!')
          this.saveQuestionSetToStore(questionSetList)
          this.setDefaultQuestionSet()
        }
      })
      if (this.registrationNumber !== '') {
        Loading.hide()
        return
      }
      Services.getMtaRiskInfo(this.policyNumber)
        .then(result => {
          this.$store.dispatch('policyChange/setMtaRiskData', result)
            .then(() => { Loading.hide() })
        }, error => {
          console.error(error)
        })
    },
    saveQuestionSetToStore (questionSetList) {
      let i, j, k
      let questionSetId, questionList, questionDetailList
      let customQuestionSet = {}
      for (i = 0; i < questionSetList.length; i++) {
        questionSetId = questionSetList[i].questionSetId
        questionList = questionSetList[i].questions
        let customQuestionSetSub = {}
        for (j = 0; j < questionList.length; j++) {
          let customQuestionDetailList = []
          if (questionList[j].definedList !== null) {
            questionDetailList = questionList[j].definedList.definedListDetailDefinedList
            for (k = 0; k < questionDetailList.length; k++) {
              let obj = {}
              obj.label = questionDetailList[k].name
              obj.value = questionDetailList[k].uniqueId
              customQuestionDetailList.push(obj)
            }
          }
          customQuestionSetSub[questionList[j].name] = customQuestionDetailList
        }
        customQuestionSet[questionSetId] = customQuestionSetSub
      }
      this.$store.commit('policyChange/initQuestionSet', customQuestionSet)
      console.log('!!!!!--DONE SAVE TO STORE--!!!!')
    },
    setDefaultQuestionSet () {
      console.log('!!!--- SET DEFAULT QUESTION SET --- !!!')
      let questionSet = this.$store.state.policyChange.questionSet
      console.info(questionSet)
      let vehicleDetail = questionSet[ConstantData.Question_Set_ID.Vehicle_Detail]
      if (vehicleDetail[ConstantData.Vehicle_Detail_List.Overnight_place] !== undefined) {
        this.overnightPlaceList = vehicleDetail[ConstantData.Vehicle_Detail_List.Overnight_place]
        this.ownerList = vehicleDetail[ConstantData.Vehicle_Detail_List.VehicleOwner]
        this.keeperList = vehicleDetail[ConstantData.Vehicle_Detail_List.VehicleKeeper]
      }
      //
      if (questionSet[ConstantData.Question_Set_ID.Cover_Detail] !== undefined) {
        let coverDetail = questionSet[ConstantData.Question_Set_ID.Cover_Detail]
        if (coverDetail[ConstantData.Cover_Detail_List.Cover_Type] !== undefined) {
          this.coverKindList = coverDetail[ConstantData.Cover_Detail_List.Cover_Type]
        }
        if (coverDetail[ConstantData.Cover_Detail_List.Class_Of_Use] !== undefined) {
          this.classOfUseList = coverDetail[ConstantData.Cover_Detail_List.Class_Of_Use]
        }
        if (coverDetail[ConstantData.Cover_Detail_List.Voluntary_Excess] !== undefined) {
          this.voluntaryExcessList = coverDetail[ConstantData.Cover_Detail_List.Voluntary_Excess]
        }
      }
      if (questionSet[ConstantData.Question_Set_ID.Personal_Detail] !== undefined) {
        let personalDetail = questionSet[ConstantData.Question_Set_ID.Personal_Detail]
        if (personalDetail[ConstantData.Personal_Detail_List.Employment_Status] !== undefined) {
          this.employmentStatusList = personalDetail[ConstantData.Personal_Detail_List.Employment_Status]
        }
        if (personalDetail[ConstantData.Personal_Detail_List.Occupation] !== undefined) {
          this.occupationList = personalDetail[ConstantData.Personal_Detail_List.Occupation]
        }
        if (personalDetail[ConstantData.Personal_Detail_List.Business_Category] !== undefined) {
          this.businessCategoryList = personalDetail[ConstantData.Personal_Detail_List.Business_Category]
        }
        this.titleList = personalDetail[ConstantData.Personal_Detail_List.Title]
      }
    },
    postCodeCheck () {
      if (this.$store.state.policyChange.houseNumber !== '' && this.$store.state.policyChange.postCode !== '') {
        Services.getAddress(this.$store.state.policyChange.postCode, this.$store.state.policyChange.houseNumber).then(data => {
          if (data.line1 === undefined) {
            this.$q.notify('Incorrect address entered. Please check.')
            this.$store.commit('policyChange/setHouseNumber', '')
            this.$store.commit('policyChange/setPostCode', '')
            this.$refs.houseNumber.focus()
            return
          }
          this.$store.state.policyChange.address = data
          this.$store.commit('policyChange/setAddress', data)
        })
      } else {
        this.$refs.houseNumber.focus()
        this.$q.notify('You need to enter a house number or name as well as a valid postcode for us to look up your address')
      }
    },
    vehicleCheck () {
      if (this.$store.state.policyChange.registrationNumber !== '') {
        Services.getVehicle(this.$store.state.policyChange.registrationNumber).then(data => {
          if (data.make === undefined) {
            this.$q.notify('Incorrect registration details enter. Please try again')
            this.$refs.regBox.focus()
          }
          this.$store.commit('policyChange/setCar', data)
        })
      }
    },
    getQuote () {
      Loading.show()
      const changeInfo = {
        policyNumber: this.$store.state.customerPortal.policyNumber,
        policyChange: this.$store.state.policyChange
      }
      Services.getPolicyChangeQuote(changeInfo)
        .then((quoteResult) => {
          this.$q.loading.hide()
          if (quoteResult.validations != null && quoteResult.validations.length > 0) {
            Object.keys(quoteResult.validations).map(key => {
              this.showTooltips[key] = true
              this.$q.notify(quoteResult.validations[key])
            })
            return
          }

          if (quoteResult.status === 'Quoted') {
            this.$store.commit('policyChange/setMtaQuoteResultSummary', quoteResult)
            this.$router.push({ name: 'ChangeStepSecond' })
          } else {
            this.$router.push({ name: 'ChangeStepDecline' })
          }
          Loading.hide()
        },
        error => {
          Loading.hide()
          this.$router.push({ name: 'ChangeStepDecline' })
          console.warn(error)
        })
    }
  }
}
</script>
