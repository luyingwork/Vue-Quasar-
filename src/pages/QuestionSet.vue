<template>
  <q-page class="row justify-center">
    <div class="side-bar col-md-4 col-lg-3 side-bar-container">
           <div>
      <side-bar
        :status="SideBar.status"
      />
       </div>
    </div>
    <div class="question-set col-12 col-md-8 col-lg-9">
      <div class="container row">
        <div class="col-12">  <q-btn style="float:right" class="btn-nav btn-color-primary"
               label="Back Home"
               to="/index"/>
          <div class="vehicle-details">
            <p class="text-font-title fs25">Your vehicle details</p>
            <p class="text-font-main margin-top-90">
              <span class="question-title fs20">
                Let’s get started with your car's <b>registration number</b>
              </span>
              <validation-tooltip :tooltip=this.validationTooltips.car v-show="this.showTooltips.car"></validation-tooltip>
            </p>
            <div class="clear-fix"></div>
            <div class="car-reg-number-box row">
              <div class="img-box">
                <img src="~assets/img/icon-number-plate.png">
              </div>
              <div>
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
            <div v-if="car" class="notify-tab-enter-box row">
                  <div class="mileage-box" v-show="car">
                    <p class="text-font-main">What is the <b>make of the car?</b></p>
                    <div class="input-wrapper-box margin-top-main row justify-between items-center">
                      <q-input
                        type="text"
                        hide-underline
                        v-model="car.make"
                        class="data-hj-whitelist"
                      />
                    </div>
                  </div>
            </div>
            <div v-if="car" class="notify-tab-enter-box row">
              <div class="mileage-box" v-show="car">
                <p class="text-font-main">What is the <b>model of the car?</b></p>
                  <div class="input-wrapper-box margin-top-main row justify-between items-center">
                    <q-input
                      type="text"
                      hide-underline
                      v-model="car.model"
                      class="data-hj-whitelist"
                      placeholder="Please input model of the car"
                    />
                  </div>
              </div>
            </div>
            <div class="owner-box" v-show="car.model">
                <p class="text-font-main margin-bottom-main">What is the <b>body type of the car?</b></p>
                <div class="row items-center">
                  <q-select
                    separator
                    class="select-common col-9 col-md-10 data-hj-whitelist"
                    hide-underline
                    v-model="bodyType"
                    placeholder="Please select the body type"
                    radio
                    :options="bodyTypeList"
                  />
                  <!-- <q-select
                    inverted separator
                    class="select-common col-9 col-md-10 data-hj-whitelist"
                    v-model="bodyType"
                    :options="bodyTypeList"
                    placeholder="Please select the body type"
                    float-label="Is Quasar Awesome?"
                  /> -->
                </div>
              </div>
          <div v-show="car">
             <div class="row items-center check-box-item d-flex" v-show="car">
          <div class="mileage-box" style="flex: 1">
              <div class="input-wrapper-box margin-top-main relative-position row items-center justify-between">
            <q-checkbox
                  class="custom-check text-font-main top-check-box-align data-hj-whitelist margin-right-20"
              v-model="imported"
                  label="Has the car been imported?"/>
                <help-icon :tooltip="`Imports are vehicles made to be sold outside of the UK then imported into the UK Check the log book if you are unsure.`"></help-icon>
                <!-- tooltips.CarImported = value from server api -->
          </div>
        </div>
          </div>
          <div class="row items-center check-box-item d-flex">
          <div style="flex: 1">
            <q-checkbox
              class="custom-check text-font-main top-check-box-align data-hj-whitelist"
              v-model="modified"
                label="Has the car been modified?"/>
          </div>
        </div>
           <div class="row items-center check-box-item d-flex">
          <div style="flex: 1">
            <q-checkbox
              class="custom-check text-font-main top-check-box-align data-hj-whitelist"
              v-model="tracker"
              label="Does the car have a tracker fitted?"   />
          </div>
        </div>
        </div>
           <div class="owner-box" v-show="tracker">
                <p class="text-font-main margin-bottom-main">What is the <b>fitted tracker on the car?</b></p>
                <div class="row items-center">
                  <q-select
                    inverted separator
                    class="select-common col-9 col-md-10 data-hj-whitelist"
                    v-model="fittedTracker"
                    :options="fittedTrackerList"
                    placeholder="Please select the tracker type"
                  />
                </div>
              </div>
            <div class="mileage-box">
                <p class="text-font-main fs20">When did you <b>purchase </b> the vehicle?</p>
                <div class="input-wrapper-box margin-top-main relative-position row items-center justify-between">
                  <q-datetime
                    hide-underline
                    modal
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    v-model="purchaseDate"
                  />
                  <div class="row items-center icon-box">
                    <img src="~assets/img/icon-calendar.png"  />
                  </div>
                  <help-icon :tooltip="tooltips.VehiclePurchaseDate"></help-icon>
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
              <p class="text-font-main fs20">What is your <b>mileage?</b></p>
              <div class="input-wrapper-box margin-top-main row justify-between items-center">
                <q-input
                  type="number"
                  hide-underline placeholder="E.g. 10,000"
                  v-model="mileage"
                  class="data-hj-whitelist"
                />
              </div>
            </div>
            <div class="owner-box">
              <p class="text-font-main margin-bottom-main fs20">Who is the <b>owner</b> of the car?</p>
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
              </div>
            </div>
            <div class="keeper-box">
              <p class="text-font-main margin-bottom-main fs20">Who is the <b>keeper</b> of the car?</p>
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
                <help-icon :tooltip="tooltips.VehicleKeeper"></help-icon>
              </div>
            </div>
            <div class="park-box">
              <p class="text-font-main margin-bottom-main fs20">Where will the car be <b>kept overnight?</b></p>
              <div class="row items-center justify-betwee">
                <q-select
                  class="select-common col-9 col-md-10 data-hj-whitelist" inverted separator
                  v-model="overnightPlace"
                  :options="overnightPlaceList"
                />
              <help-icon :tooltip="tooltips.VehicleOvernightParkLocation"></help-icon>
              </div>
            </div>
          </div>
          <div class="personal-details">
            <div class="main-personal-details">
              <p class="text-font-title fs25">Your personal details</p>
              <div class="driving-license-number-box">
                <p class="text-font-main">
                  <span class="question-title fs20">
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
                      v-model="drivingLicence" class="data-hj-whitelist"
                     hide-underline placeholder="XXXXX000000X00 XX" />
                    <help-icon :tooltip="tooltips.LicenceNumber"></help-icon>
                  </div>
                </div>
                <div class="driving-license-text-only">
                  <div class="input-wrapper-box margin-top-main row justify-between items-center">
                    <q-input
                      type="text"
                      v-model="drivingLicence" class="data-hj-whitelist"
                      hide-underline placeholder="XXXXX000000X00 XX" />
                      <help-icon :tooltip="tooltips.LicenceNumber"></help-icon>
                  </div>
                </div>
              </div>
              <div class="preferred-title-box">
                <p class="text-font-main margin-bottom-main fs20">What is your preferred <b>title</b>?</p>
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
                <p class="text-font-main fs20">Now we need your <b>full name.</b></p>
                <div class="margin-top-main row items-center justify-between">
                  <div class="row justify-between">
                    <div class="input-wrapper-box col-12 col-md-5">
                      <q-input
                        type="text"
                        v-model="firstName"
                        class="data-hj-whitelist"
                        hide-underline placeholder="First name(s)"
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
                  <span class="question-title fs20">
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
                </div>
              </div>
              <div class="mobile-number-box">
                <p class="text-font-main">
                  <span class="question-title fs20">
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
                <p class="text-font-main fs20">What is your <b>date of birth</b>?</p>
                <div class="input-wrapper-box margin-top-main relative-position row items-center justify-between">
                  <q-datetime
                    hide-underline
                    modal
                    format="DD/MM/YYYY"
                    class="col-10 col-md-11 data-hj-whitelist"
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
                <p class="text-font-main fs20">Please enter your <b>house number</b> or <b>building name</b>.</p>
                <p class="text-font-2 margin-top-13">We’ll use this to look up your address.</p>
                <div class="input-wrapper-box margin-top-main row items-center justify-between">
                  <q-input
                    ref="houseNumber"
                    type="text"
                    class="data-hj-whitelist"
                    hide-underline placeholder="1"
                    v-model="houseNumber"
                  />
                </div>
              </div>
              <div class="post-code-box">
                <p class="text-font-main">
                  <span class="question-title fs20">
                    Please enter your <b>postcode</b>.
                  </span>
                  <validation-tooltip :tooltip=this.validationTooltips.postCode v-show="this.showTooltips.postCode"></validation-tooltip>
                </p>
                <div class="clear-fix"></div>
                <div class="input-wrapper-box margin-top-main row items-center justify-between">
                  <q-input
                    v-on:keyup.enter="postcodeUpper"
                    v-on:keyup.tab="postcodeUpper"
                    style="text-transform: uppercase"
                    maxlength="10"
                    type="text"
                    class="data-hj-whitelist"
                    hide-underline placeholder="M1 2AQ"
                    v-model="postCode"
                    @blur="postCodeCheck"
                  />
                </div>
              </div>
               <div class="post-code-box" v-show="address.line1">
                <p class="text-font-main">First line of your <b>address</b>.</p>
                <div class="input-wrapper-box margin-top-main row items-center justify-between">
                  <q-input
                    type="text"
                    class="data-hj-whitelist"
                    hide-underline
                    v-model="address.line1"
                  />
                </div>
              </div>
                        <div class="post-code-box" v-show="address.line2">
                <p class="text-font-main">Second line of your <b>address</b>.</p>
                <div class="input-wrapper-box margin-top-main row items-center justify-between">
                  <q-input
                    type="text"
                    class="data-hj-whitelist"
                    hide-underline
                    v-model="address.line2"
                  />
                </div>
              </div>
               <div class="post-code-box" v-show="address.postTown">
                <p class="text-font-main"><b>Town</b>.</p>
                <div class="input-wrapper-box margin-top-main row items-center justify-between">
                  <q-input
                    type="text"
                    class="data-hj-whitelist"
                    hide-underline
                    v-model="address.postTown"
                  />
                </div>
              </div>
              <div class="claims-protect-box">
                <p class="text-font-main margin-bottom-main fs20">Do you want <b>no claims protection</b>?</p>
                <div class="row items-center">
                  <q-btn-toggle
                    class="btn-toggle-standard data-hj-whitelist"
                    v-model="claimProtection"
                    :options="[
                      {label: 'Yes', value: 'yes'},
                      {label: 'No', value: 'no'},
                    ]"
                  />
                </div>
              </div>
              <div class="employment-status-box">
                <p class="text-font-main margin-bottom-main fs20">What is your <b>employment status</b>?</p>
                <div class="row items-center">
                  <q-select
                    inverted
                    separator
                    class="select-common col-9 col-md-10 data-hj-whitelist"
                    v-model="employmentStatus"
                    :options="employmentStatusList"
                  />
                </div>
              </div>
              <div class="occupation-box">
                <p class="text-font-main margin-bottom-main">
                  <span class="question-title fs20">
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
                    v-model="occupation" >
                    <q-autocomplete
                      inverted separator
                      :static-data="{field: 'label', list: occupationList}"
                      :min-characters="0"
                    />
                  </q-input>
                </div>
              </div>
              <div class="business-category-box">
                <p class="text-font-main margin-bottom-main">
                  <span class="question-title fs20">
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
                </div>
              </div>
              <div class="search-engine-box">
                <div class="main-search-engine">
                  <p class="text-font-main margin-bottom-main fs20">
                    Where did you <b>hear about us</b>?
                  </p>
                  <div class="row items-center justify-between-prometheus">
                    <q-select
                      inverted separator
                      class="select-common col-9 col-md-10 data-hj-whitelist"
                      v-model="searchEngine"
                      :options="searchEngineList"
                    />
                  </div>
                </div>
                <div v-if = "searchEngine == 'other'" class="additional-search-engine">
                  <p class="text-font-main margin-bottom-main">
                    Please enter where you <b>heard about us</b>.
                  </p>
                  <div class="input-wrapper-box margin-top-main row justify-between items-center">
                    <q-input
                      hide-underline
                      placeholder="Word of mouth"
                      class="data-hj-whitelist"
                      v-model="otherSearchEngine"
                    />
                  </div>
                </div>
              </div>
              <p class="text-font-main fs20">
                Yoga would also like to keep you informed about products, services,
                offers and promotions Yoga make available.
              </p>
              <div class="contact-method-box row justify-between">
                <div class="col-12 col-md-6 margin-top-main">
                  <p class="text-font-main margin-bottom-main fs20">Can we contact you by <b>email</b>?</p>
                  <div class="row items-center">
                    <q-btn-toggle
                      class="btn-toggle-standard data-hj-whitelist"
                      v-model="contactByEmail"
                      :options="[
                      {label: 'Yes', value: 'yes'},
                      {label: 'No', value: 'no'},
                    ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-md-6 margin-top-main">
                  <p class="text-font-main margin-bottom-main fs20">Can we contact you by <b>SMS</b>?</p>
                  <div class="row items-center">
                    <q-btn-toggle
                      class="btn-toggle-standard data-hj-whitelist"
                      v-model="contactBySMS"
                      :options="[
                      {label: 'Yes', value: 'yes'},
                      {label: 'No', value: 'no'},
                    ]"
                    />
                  </div>
                </div>
              </div>
              <div class="add-driver-box">
                <p class="text-font-main margin-bottom-main fs20">Do you want to add <b>another driver</b>?</p>
                <div class="row items-center">
                  <q-btn-toggle
                    class="btn-toggle-standard data-hj-whitelist"
                    v-model="addDriver"
                    :options="[
                    {label: 'Yes', value: 'yes'},
                    {label: 'No', value: 'no'},
                  ]"
                  />
                </div>
              </div>
            </div>
            <div class="additional-personal-details">
              <driver-details
                v-if="addDriver=='yes'" driverNumber = 'first'>
                1st
              </driver-details>
              <driver-details
                v-if="extraAddDriver.first=='yes'" driverNumber = 'second'>
                2nd
              </driver-details>
              <driver-details
                v-if="extraAddDriver.second=='yes'" driverNumber = 'third'>
                3rd
              </driver-details>
              <driver-details
                v-if="extraAddDriver.third=='yes'" driverNumber = 'fourth'>
                4th
              </driver-details>
            </div>
          </div>
          <div class="cover-details">
            <p class="text-font-title fs25">Your cover details</p>
            <div class="cover-kind-box">
              <p class="text-font-main margin-bottom-main fs20"><b>What kind of cover</b> would you like to arrange? </p>
              <div class="row items-center justify-between-prometheus">
                <q-select
                  inverted separator
                  class="select-common col-9 col-md-10 data-hj-whitelist"
                  v-model="coverType"
                  :options="coverKindList"
                />
                <help-icon :tooltip="tooltips.CoverType"></help-icon>
              </div>
            </div>
            <div class="arrange-class-box">
              <p class="text-font-main margin-bottom-main fs20"><b>What class of use</b> would you like to arrange? </p>
              <div class="row items-center justify-between-prometheus">
                <!-- <q-select
                  v-model="classOfUse"
                  inverted separator
                  class="select-common col-9 col-md-10 data-hj-whitelist"
                  float-label="Please select class of use"
                  :options="classOfUseList"
                /> -->
                <q-select
                    class="select-common col-9 col-md-10 data-hj-whitelist"
                    v-model="classOfUse"
                    placeholder="Please select class of use"
                    radio
                    :options="classOfUseList"
                  />
                <!-- <q-select
                  inverted separator
                  class="select-common col-9 col-md-10 data-hj-whitelist"
                  v-model="classOfUse"
                  :options="classOfUseList"
                  placeholder=""
                /> -->
                <help-icon :tooltip="tooltips.ClassOfUse"></help-icon>
              </div>
            </div>
            <div style="height:30px"></div>
            <div class="mileage-box" v-show="classOfUse == 'CarClassOfUse.ProposersBusiness' || classOfUse == 'CarClassOfUse.UseOnAnothersBusiness' || classOfUse == 'CarClassOfUse.NamedDriversBusiness'">
              <p class="text-font-main">What is your <b>estimated annual business mileage?</b></p>
              <div class="input-wrapper-box margin-top-main row justify-between items-center">
                <q-input
                  type="number"
                  class="data-hj-whitelist"
                  hide-underline placeholder="E.g. 10,000"
                  v-model="mileageBusiness"
                />
              </div>
            </div>
            <div class="cover-start-date-box">
              <p class="text-font-main margin-bottom-main">
                <span class="question-title fs20">
                  When would you like your <b>cover to start</b>?
                </span>
                <validation-tooltip :tooltip=this.validationTooltips.startDay v-show="this.showTooltips.startDay"></validation-tooltip>
              </p>
              <div class="clear-fix"></div>
              <div class="row items-center justify-between-prometheus">
                <q-btn-toggle
                  class="btn-toggle-standard col-9 col-md-11 data-hj-whitelist"
                  v-model="coverStartDay"
                  :options="[
                    {label: 'Today', value: 'today'},
                    {label: 'Tomorrow', value: 'tomorrow'},
                    {label: 'Day after tomorrow', value: 'after'},
                    {label: 'Other', value: 'other'}
                  ]"
                />
                <!-- <q-btn-toggle
                  v-model="model"
                  class="btn-toggle-standard"
                  toggle-color="primary"
                  :options="[
                    {label: 'One', value: 'one'},
                    {label: 'Two', value: 'two'},
                    {label: 'Three', value: 'three'},
                    {label: 'Other', value: 'other'}
                  ]"
                /> -->
              <help-icon :tooltip="tooltips.CoverEffectiveDate"></help-icon>
              </div>
            </div>
              <div v-show="coverStartDay != 'today' && coverStartDay != 'tomorrow' && coverStartDay != 'after'" style="margin-top: 5%">
                 <q-datetime style="width:100%"
                    modal
                    format="DD/MM/YYYY"
                    class="col-10 col-md-11 data-hj-whitelist"
                    placeholder="DD/MM/YYYY"
                    v-model="coverStartDay"
                  />
              </div>
            <div class="voluntary-excess-box">
              <p class="text-font-main margin-bottom-main fs20">How much would you like to have for <b>voluntary excess</b>?</p>
              <div class="row items-center justify-between-prometheus">
                <q-select
                  inverted separator
                  prefix = "£"
                  class="select-common col-9 col-md-10 data-hj-whitelist"
                  v-model="voluntaryExcess"
                  :options="voluntaryExcessList"
                />
                <help-icon :tooltip="tooltips.VoluntaryExcess"></help-icon>
              </div>
            </div>

      <div class="confirm-box" style="margin-top: 10%">
                 <div class="row items-center justify-between-prometheus">
        <p class="text-font-main col-9 col-md-10 fs20"><b>Confirm</b> the following assumptions are correct for all drivers and vehicle: </p>
      </div>
      <div class="checkbox-wrapper">
        <div class="row items-center check-box-item d-flex">
          <q-checkbox
            class="custom-check text-font-main top-check-box-align data-hj-whitelist"
            v-model="resident"
            label="They are a UK Resident since birth"
          />
          <span style="margin-left: 10px">
            <validation-tooltip :tooltip=this.validationTooltips.residency v-show="!resident && this.showTooltips.residency"></validation-tooltip>
          </span>
        </div>
        <div class="row items-center check-box-item">
          <q-checkbox
            class="custom-check text-font-main top-check-box-align data-hj-whitelist"
            v-model="medicalCondition"
            label="They have no Medical Conditions"
          />
          <span style="margin-left: 10px">
            <validation-tooltip :tooltip=this.validationTooltips.medical v-show="!medicalCondition && this.showTooltips.medical"></validation-tooltip>
          </span>
        </div>
        <div class="row items-center check-box-item">
          <q-checkbox
            class="custom-check text-font-main top-check-box-align data-hj-whitelist"
            v-model="criminalConviction"
            label="They have had no unspent non-motoring criminal convictions"
          />
          <span style="margin-left: 10px">
            <validation-tooltip :tooltip=this.validationTooltips.motoring v-show="!criminalConviction && this.showTooltips.motoring"></validation-tooltip>
          </span>
        </div>
        <div class="row items-center check-box-item">
          <q-checkbox
            class="custom-check text-font-main top-check-box-align data-hj-whitelist"
            v-model="vehicleWrittenOff" label="You have never had a vehicle written off"    />
          <span style="margin-left: 10px">
            <validation-tooltip :tooltip=this.validationTooltips.written v-show="!vehicleWrittenOff && this.showTooltips.written"></validation-tooltip>
          </span>
        </div>
        <div class="row items-center check-box-item d-flex">
          <div style="flex: 1">
            <q-checkbox
              class="custom-check text-font-main top-check-box-align data-hj-whitelist"
              v-model="noRisk"
              label="There have been no risks where previous policy has been cancelled or void, or where any driver has been refused insurance"   />
          </div>
          <span style="margin-left: 10px">
             <validation-tooltip :tooltip=this.validationTooltips.policy v-show="!noRisk && this.showTooltips.policy"></validation-tooltip>
          </span>
        </div>
        <div class="row items-center check-box-item d-flex">
          <q-checkbox
            class="custom-check text-font-main top-check-box-align data-hj-whitelist"
            v-model="impounded"
            label="The vehicle has not been impounded"
          />
          <span style="margin-left: 10px">
            <validation-tooltip :tooltip=this.validationTooltips.impounded v-show="!impounded && this.showTooltips.impounded"></validation-tooltip>
          </span>
        </div>
        <div class="row items-center check-box-item d-flex">
          <q-checkbox
            class="custom-check text-font-main top-check-box-align data-hj-whitelist"
            v-model="leftHandDrive"
            label="Vehicle is not left hand drive"
          />
          <span style="margin-left: 10px">
            <validation-tooltip :tooltip=this.validationTooltips.leftHand v-show="!leftHandDrive && this.showTooltips.leftHand"></validation-tooltip>
          </span>
        </div>
      </div>
      <div class="row">
        <p class="text-box-2">
          That’s all we need to know! If you’re happy that everything’s correct, please click the button below to get your quote.
        </p><q-btn class="btn-nav btn-color-primary"
            v-on:click="submit"
          label="Continue" />
        <br />
      </div>
    </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import {
  scroll
} from 'quasar'
const { getScrollTarget, getScrollHeight, setScrollPosition } = scroll
import { required, maxLength } from 'vuelidate/lib/validators'

import 'src/css/app.styl'
import 'src/css/question-set.styl'
import HelpIcon from 'src/components/HelpIcon'
import SideBar from 'src/components/SideBar'
import DriverDetails from 'src/components/DriverDetails'
import ConstantData from 'src/assets/data/constant-data'
import StaticList from 'src/assets/data/static-list'
import Services from 'src/services/'
import ValidationTooltip from '../components/ValidationTooltip'
export default {
  components: {
    ValidationTooltip,
    DriverDetails,
    SideBar,
    HelpIcon
  },
  data () {
    return {
      SideBar: {
        status: 'first'
      },
      tooltips: {},
      overnightPlaceList: [],
      employmentStatusList: [],
      bodyTypeList: [],
      fittedTrackerList: [],
      occupationList: [],
      businessCategoryList: [],
      coverKindList: [],
      classOfUseList: [],
      titleList: [],
      ownerList: [],
      keeperList: [],
      voluntaryExcessList: [],
      validations: [],
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
  computed: {
    searchEngineList () { return StaticList.searchEngineList },
    hourList () { return StaticList.hourList },
    minuteList () { return StaticList.minuteList },
    address: {
      get () { return this.$store.state.quoteJourney.address },
      set (val) { this.$store.commit('quoteJourney/setAddress', val) }
    },
    houseNumber: {
      get () { return this.$store.state.quoteJourney.houseNumber },
      set (val) { this.$store.commit('quoteJourney/setHouseNumber', val) }
    },
    car: {
      get () { return this.$store.state.quoteJourney.car },
      set (val) { this.$store.commit('quoteJourney/setCar', val) }
    },
    registrationNumber: {
      get () { return this.$store.state.quoteJourney.registrationNumber },
      set (val) { this.$store.commit('quoteJourney/setRegistrationNumber', val.toUpperCase()) }
    },
    value: {
      get () { return this.$store.state.quoteJourney.value },
      set (val) { this.$store.commit('quoteJourney/setValue', val) }
    },
    mileageBusiness: {
      get () { return this.$store.state.quoteJourney.mileageBusiness },
      set (val) { this.$store.commit('quoteJourney/setMileageBusiness', val) }
    },
    mileage: {
      get () { return this.$store.state.quoteJourney.mileage },
      set (val) { this.$store.commit('quoteJourney/setMileage', val) }
    },
    carOwner: {
      get () { return this.$store.state.quoteJourney.carOwner },
      set (val) { this.$store.commit('quoteJourney/setCarOwner', val) }
    },
    carKeeper: {
      get () { return this.$store.state.quoteJourney.carKeeper },
      set (val) { this.$store.commit('quoteJourney/setCarKeeper', val) }
    },
    overnightPlace: {
      get () { return this.$store.state.quoteJourney.overnightPlace },
      set (val) { this.$store.commit('quoteJourney/setOvernightPlace', val) }
    },
    drivingLicence: {
      get () { return this.$store.state.quoteJourney.drivingLicence },
      set (val) { this.$store.commit('quoteJourney/setDrivingLicence', val.toUpperCase()) }
    },
    preferredTitle: {
      get () { return this.$store.state.quoteJourney.preferredTitle },
      set (val) { this.$store.commit('quoteJourney/setPreferredTitle', val) }
    },
    purchaseDate: {
      get () { return this.$store.state.quoteJourney.purchaseDate },
      set (val) { this.$store.commit('quoteJourney/setPurchaseDate', val) }
    },
    firstName: {
      get () { return this.$store.state.quoteJourney.firstName },
      set (val) { this.$store.commit('quoteJourney/setFirstName', val) }
    },
    surname: {
      get () { return this.$store.state.quoteJourney.surname },
      set (val) { this.$store.commit('quoteJourney/setSurname', val) }
    },
    emailAddress: {
      get () { return this.$store.state.quoteJourney.emailAddress },
      set (val) { this.$store.commit('quoteJourney/setEmailAddress', val) }
    },
    mobileNumber: {
      get () { return this.$store.state.quoteJourney.mobileNumber },
      set (val) { this.$store.commit('quoteJourney/setMobileNumber', val) }
    },
    birthday: {
      get () { return this.$store.state.quoteJourney.birthday },
      set (val) { this.$store.commit('quoteJourney/setBirthday', val) }
    },
    postCode: {
      get () { return this.$store.state.quoteJourney.postCode },
      set (val) { this.$store.commit('quoteJourney/setPostCode', val.toUpperCase()) }
    },
    claimProtection: {
      get () { return this.$store.state.quoteJourney.claimProtection },
      set (val) { this.$store.commit('quoteJourney/setClaimProtection', val) }
    },
    employmentStatus: {
      get () { return this.$store.state.quoteJourney.employmentStatus },
      set (val) { this.$store.commit('quoteJourney/setEmploymentStatus', val) }
    },
    bodyType: {
      get () { return this.$store.state.quoteJourney.bodyType },
      set (val) { this.$store.commit('quoteJourney/setBodyType', val) }
    },
    fittedTracker: {
      get () { return this.$store.state.quoteJourney.fittedTracker },
      set (val) { this.$store.commit('quoteJourney/setFittedTracker', val) }
    },
    occupation: {
      get () { return this.$store.state.quoteJourney.occupation },
      set (val) { this.$store.commit('quoteJourney/setOccupation', val) }
    },
    businessCategory: {
      get () { return this.$store.state.quoteJourney.businessCategory },
      set (val) { this.$store.commit('quoteJourney/setBusinessCategory', val) }
    },
    modified: {
      get () { return this.$store.state.quoteJourney.modified },
      set (val) { this.$store.commit('quoteJourney/setModified', val) }
    },
    tracker: {
      get () { return this.$store.state.quoteJourney.tracker },
      set (val) { this.$store.commit('quoteJourney/setTracker', val) }
    },
    imported: {
      get () { return this.$store.state.quoteJourney.imported },
      set (val) { this.$store.commit('quoteJourney/setImported', val) }
    },
    resident: {
      get () { return this.$store.state.quoteJourney.resident },
      set (val) { this.$store.commit('quoteJourney/setResident', val) }
    },
    medicalCondition: {
      get () { return this.$store.state.quoteJourney.medicalCondition },
      set (val) { this.$store.commit('quoteJourney/setMedicalCondition', val) }
    },
    criminalConviction: {
      get () { return this.$store.state.quoteJourney.criminalConviction },
      set (val) { this.$store.commit('quoteJourney/setCriminalConviction', val) }
    },
    vehicleWrittenOff: {
      get () { return this.$store.state.quoteJourney.vehicleWrittenOff },
      set (val) { this.$store.state.quoteJourney.vehicleWrittenOff = val }
    },
    noRisk: {
      get () { return this.$store.state.quoteJourney.noRisk },
      set (val) { this.$store.state.quoteJourney.noRisk = val }
    },
    impounded: {
      get () { return this.$store.state.quoteJourney.impounded },
      set (val) { this.$store.state.quoteJourney.impounded = val }
    },
    leftHandDrive: {
      get () { return this.$store.state.quoteJourney.leftHandDrive },
      set (val) { this.$store.state.quoteJourney.leftHandDrive = val }
    },
    searchEngine: {
      get () { return this.$store.state.quoteJourney.searchEngine },
      set (val) { this.$store.commit('quoteJourney/setSearchEngine', val) }
    },
    otherSearchEngine: {
      get () { return this.$store.state.quoteJourney.otherSearchEngine },
      set (val) { this.$store.commit('quoteJourney/setOtherSearchEngine', val) }
    },
    contactByEmail: {
      get () { return this.$store.state.quoteJourney.contactByEmail },
      set (val) { this.$store.commit('quoteJourney/setContactByEmail', val) }
    },
    contactBySMS: {
      get () { return this.$store.state.quoteJourney.contactBySMS },
      set (val) { this.$store.commit('quoteJourney/setContactBySMS', val) }
    },
    addDriver: {
      get () { return this.$store.state.quoteJourney.addDriver },
      set (val) { this.$store.commit('quoteJourney/setAddDriver', val) }
    },
    extraAddDriver: {
      get () { return this.$store.state.quoteJourney.extraAddDriver },
      set (val) { this.$store.commit('quoteJourney/setExtraAddDriver', val) }
    },
    coverType: {
      get () { return this.$store.state.quoteJourney.coverType },
      set (val) { this.$store.commit('quoteJourney/setCoverKind', val) }
    },
    classOfUse: {
      get () {
        return this.$store.state.quoteJourney.classOfUse
      },
      set (val) {
        this.$store.commit('quoteJourney/setUseClass', val)
      }
    },
    coverStartDay: {
      get () { return this.$store.state.quoteJourney.coverStartDay },
      set (val) { this.$store.commit('quoteJourney/setCoverStartDay', val) }
    },
    coverStartHour: {
      get () { return this.$store.state.quoteJourney.coverStartHour },
      set (val) { this.$store.commit('quoteJourney/setCoverStartHour', val) }
    },
    coverStartMinute: {
      get () { return this.$store.state.quoteJourney.coverStartMinute },
      set (val) { this.$store.commit('quoteJourney/setCoverStartMinute', val) }
    },
    voluntaryExcess: {
      get () { return this.$store.state.quoteJourney.voluntaryExcess },
      set (val) { this.$store.commit('quoteJourney/setVoluntaryExcess', val) }
    }
  },
  created () {
    this.loadDataFromApi()
    // this.setDefaultQuestionSet()
  },
  validations: {
    registrationNumber: { required },
    mileage: { required, maxLength: maxLength(255) },
    postCode: { required }
  },
  methods: {
    async loadDataFromApi () {
      this.$q.loading.show({
        delay: 400 // ms
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
          this.$q.loading.hide()
          console.log('!!!!!--DONE Load API--!!!!')
          this.saveQuestionSetToStore(questionSetList)
          this.setDefaultQuestionSet()
          this.setTooltips(questionSetList)
        }
      })
    },
    goToPageTop () {
      let domElement = document.querySelector('.validation-error-label')
      let scrollTargetDomElement = getScrollTarget(domElement)
      let scrollHeight = getScrollHeight(domElement)
      setScrollPosition(scrollTargetDomElement, scrollHeight, 600)
    },
    setTooltips (questionSetList) {
      for (var questionSet = 0; questionSet < questionSetList.length; questionSet++) {
        var fullQuestionSet = questionSetList[questionSet]
        for (var question = 0; question < fullQuestionSet.questions.length; question++) {
          let fullQuestion = fullQuestionSet.questions[question]
          Object.assign(this.tooltips, { [fullQuestion.name]: fullQuestion.customerHelpText })
        }
      }
      console.log(this.tooltips)
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
              if (questionDetailList[k].uniqueId !== undefined && questionDetailList[k].uniqueId != null && questionDetailList[k].uniqueId.length > 0) {
                obj.value = questionDetailList[k].uniqueId
              } else {
                obj.value = questionDetailList[k].name
              }
              customQuestionDetailList.push(obj)
            }
          }
          customQuestionSetSub[questionList[j].name] = customQuestionDetailList
        }
        customQuestionSet[questionSetId] = customQuestionSetSub
      }
      this.$store.commit('quoteJourney/initQuestionSet', customQuestionSet)
      console.log(questionSetList)
      console.log('!!!!!--DONE SAVE TO STORE--!!!!')
    },
    setDefaultQuestionSet () {
      console.log('!!!--- SET DEFAULT QUESTION SET --- !!!')
      let questionSet = this.$store.state.quoteJourney.questionSet
      console.info(questionSet)
      let vehicleDetail = questionSet[ConstantData.Question_Set_ID.Vehicle_Detail]
      if (vehicleDetail[ConstantData.Vehicle_Detail_List.Overnight_place] !== undefined) {
        this.overnightPlaceList = vehicleDetail[ConstantData.Vehicle_Detail_List.Overnight_place]
        this.ownerList = vehicleDetail[ConstantData.Vehicle_Detail_List.VehicleOwner]
        this.keeperList = vehicleDetail[ConstantData.Vehicle_Detail_List.VehicleKeeper]
        this.bodyTypeList = vehicleDetail[ConstantData.Vehicle_Detail_List.BodyType]
        this.fittedTrackerList = vehicleDetail[ConstantData.Vehicle_Detail_List.CarTrackerType]
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
    licenceUpper () {
      this.$data.drivingLicence = this.$data.drivingLicence.toUpperCase()
    },
    postCodeUpper () {
      this.$data.postCode = this.$data.postCode.toUpperCase()
    },
    postCodeCheck () {
      if (this.$store.state.quoteJourney.houseNumber !== '' && this.$store.state.quoteJourney.postCode !== '') {
        Services.getAddress(this.$store.state.quoteJourney.postCode, this.$store.state.quoteJourney.houseNumber).then(data => {
          if (data.line1 === undefined) {
            this.$q.notify('Incorrect address entered. Please check.')
            this.$store.commit('quoteJourney/setHouseNumber', '')
            this.$store.commit('quoteJourney/setPostCode', '')
            this.$refs.houseNumber.focus()
            return
          }
          this.$store.state.quoteJourney.address = data
          this.$store.commit('quoteJourney/setAddress', data)
        })
      } else {
        this.$refs.houseNumber.focus()
        this.$q.notify('You need to enter a house number or name as well as a valid postcode for us to look up your address')
      }
    },
    vehicleCheck () {
      if (this.$store.state.quoteJourney.registrationNumber !== '') {
        Services.getVehicle(this.$store.state.quoteJourney.registrationNumber).then(data => {
          if (data.make === undefined) {
            this.$q.notify('Incorrect registration details enter. Please try again')
            this.$refs.regBox.focus()
          }
          this.$store.commit('quoteJourney/setCar', data)
        })
      }
    },
    checkValidation () {
      this.$v.$touch()
      this.$q.notify('Please review fields again.')
    },
    selected (item) {
      // alert(this.form.occupation)
      this.$q.notify(`Selected suggestion "${item.label}`)
    },
    submit () {
      this.$v.$touch()
      this.$q.loading.show({
        delay: 400 // ms
      })
      Services.getQuote(this.$store.state.quoteJourney).then(data => {
        this.$q.loading.hide()
        if (data.validations != null) {
          var val = null
          Object.keys(data.validations).map(key => {
            val = data.validations[key]
            this.showTooltips[key] = true
            this.$q.notify(val)
          })
          if (val) {
            this.goToPageTop()
          }
          return
        }
        if (data.status !== 'Quoted') {
          this.$store.commit('quoteJourney/setQuoteId', '')
          this.$router.push({name: 'CarDetails'})
        }
        this.$store.commit('quoteJourney/setQuoteId', data.id)
        this.$router.push({name: 'CarDetails'})
      }, error => {
        this.$q.loading.hide()
        this.$store.commit('quoteJourney/setQuoteId', '')
        this.$router.push({name: 'CarDetails'})
        console.debug(error)
      })
    }
  }
}
</script>
