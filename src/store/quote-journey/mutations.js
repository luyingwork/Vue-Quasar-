export const setCompletedPolicy = (state, policy) => {
  state.completedPolicy = policy
}
export const setCar = (state, car) => {
  state.car = car
}
export const setAddress = (state, address) => {
  state.address = address
}
export const setHouseNumber = (state, houseNumber) => {
  state.houseNumber = houseNumber
}
export const setPurchaseDate = (state, purchaseDate) => {
  state.purchaseDate = purchaseDate
}
export const initQuestionSet = (state, questionSetList) => {
  state.questionSet = questionSetList
}
export const initTooltips = (state, tooltips) => {
  state.tooltips = tooltips
}
export const setQuoteId = (state, val) => {
  state.quoteId = val
}
export const setModified = (state, val) => {
  state.modified = val
}
export const setTracker = (state, val) => {
  state.tracker = val
}
export const setImported = (state, val) => {
  state.imported = val
}
export const updateQuoteJourneyStep = (state, val) => {
  state.quoteJourneyStep = val
}
export const setRegistrationNumber = (state, val) => {
  state.registrationNumber = val
}
export const setSummary = (state, val) => {
  state.summary = val
}
export const setValue = (state, val) => {
  state.value = val
}
export const setMileageBusiness = (state, val) => {
  state.mileageBusiness = val
}
export const setMileage = (state, val) => {
  state.mileage = val
}
export const setCarOwner = (state, val) => {
  state.carOwner = val
}
export const setCarKeeper = (state, val) => {
  state.carKeeper = val
}
export const setOvernightPlace = (state, val) => {
  state.overnightPlace = val
}
export const setDrivingLicence = (state, val) => {
  state.drivingLicence = val
}
export const setPreferredTitle = (state, val) => {
  state.preferredTitle = val
}
export const setFirstName = (state, val) => {
  state.firstName = val
}
export const setSurname = (state, val) => {
  state.surname = val
}
export const setEmailAddress = (state, val) => {
  state.emailAddress = val
}
export const setMobileNumber = (state, val) => {
  state.mobileNumber = val
}
export const setBirthday = (state, val) => {
  state.birthday = val
}
export const setPostCode = (state, val) => {
  state.postCode = val
}
export const setClaimProtection = (state, val) => {
  state.claimProtection = val
}
export const setEmploymentStatus = (state, val) => {
  state.employmentStatus = val
}
export const setBodyType = (state, val) => {
  state.bodyType = val
}
export const setFittedTracker = (state, val) => {
  state.fittedTracker = val
}
export const setOccupation = (state, val) => {
  state.occupation = val
}
export const setBusinessCategory = (state, val) => {
  state.businessCategory = val
}
export const setResident = (state, val) => {
  state.resident = val
}
export const setMedicalCondition = (state, val) => {
  state.medicalCondition = val
}
export const setCriminalConviction = (state, val) => {
  state.criminalConviction = val
}
export const setSearchEngine = (state, val) => {
  state.searchEngine = val
}
export const setOtherSearchEngine = (state, val) => {
  state.otherSearchEngine = val
}
export const setContactByEmail = (state, val) => {
  state.contactByEmail = val
}
export const setContactBySMS = (state, val) => {
  state.contactBySMS = val
}
export const setAddDriver = (state, val) => {
  state.addDriver = val
}
export const setExtraAddDriver = (state, obj) => {
  state.extraAddDriver[obj.order] = obj.value
}
export const setExtraDrivingLicence = (state, obj) => {
  state.extraDrivingLicence[obj.order] = obj.value
}
export const setExtraPreferredTitle = (state, obj) => {
  state.extraPreferredTitle[obj.order] = obj.value
}
export const setExtraFirstName = (state, obj) => {
  state.extraFirstName[obj.order] = obj.value
}
export const setExtraSurname = (state, obj) => {
  state.extraSurname[obj.order] = obj.value
}
export const setExtraEmail = (state, obj) => {
  state.extraEmail[obj.order] = obj.value
}
export const setExtraBirthday = (state, obj) => {
  state.extraBirthday[obj.order] = obj.value
}
export const setExtraEmploymentStatus = (state, obj) => {
  state.extraEmploymentStatus[obj.order] = obj.value
}
export const setRelationshipToPolicyHolder = (state, obj) => {
  state.relationshipToPolicyHolder[obj.order] = obj.value
}
export const setExtraOccupation = (state, obj) => {
  state.extraOccupation[obj.order] = obj.value
}
export const setExtraBusinessCategory = (state, obj) => {
  state.extraBusinessCategory[obj.order] = obj.value
}
export const setExtraResident = (state, obj) => {
  state.extraResident[obj.order] = obj.value
}
export const setExtraMedicalCondition = (state, obj) => {
  state.extraMedicalCondition[obj.order] = obj.value
}
export const setExtraCriminalConviction = (state, obj) => {
  state.extraCriminalConviction[obj.order] = obj.value
}
export const setExtraVehicleWrittenOff = (state, obj) => {
  state.extraVehicleWrittenOff[obj.order] = obj.value
}
export const setExtraNoRisk = (state, obj) => {
  state.extraNoRisk[obj.order] = obj.value
}
export const setExtraImpounded = (state, obj) => {
  state.extraImpounded[obj.order] = obj.value
}
export const setExtraLeftHandDrive = (state, obj) => {
  state.extraLeftHandDrive[obj.order] = obj.value
}
export const setCoverKind = (state, val) => {
  state.coverType = val
}
export const setUseClass = (state, val) => {
  state.classOfUse = val
}
export const setCoverStartDay = (state, val) => {
  state.coverStartDay = val
}
export const setCoverStartHour = (state, val) => {
  state.coverStartHour = val
}
export const setCoverStartMinute = (state, val) => {
  state.coverStartMinute = val
}
export const setVoluntaryExcess = (state, val) => {
  state.voluntaryExcess = val
}

export const setReasonForChange = (state, val) => {
  state.reasonForChange = val
}

export const setPaymentOption = (state, val) => {
  state.paymentOption = val
}

export const setAddBillingAddress = (state, val) => {
  state.addBillingAddress = val
}
export const setNameOnCard = (state, val) => {
  state.nameOnCard = val
}
export const setCardNumber = (state, val) => {
  state.cardNumber = val
}
export const setExpiryYear = (state, val) => {
  state.expiryYear = val
}
export const setExpiryMonth = (state, val) => {
  state.expiryMonth = val
}
export const setCvv = (state, val) => {
  state.cvv = val
}
export const setBillingAddressFirst = (state, val) => {
  state.billingAddress.firstLine = val
}
export const setBillingAddressSecond = (state, val) => {
  state.billingAddress.secondLine = val
}
export const setBillingAddressThird = (state, val) => {
  state.billingAddress.thirdLine = val
}
export const setBillingAddressCity = (state, val) => {
  state.billingAddress.city = val
}
export const setBillingAddressPostCode = (state, val) => {
  state.billingAddress.postCode = val
}
export const setFreeEmail = (state, val) => {
  state.freeEmail = val
}
export const setFreePost = (state, val) => {
  state.freePost = val
}
export const setAccountName = (state, val) => {
  state.bank.accountName = val
}
export const setBankName = (state, val) => {
  state.bank.bankName = val
}
export const setAccountNumber = (state, val) => {
  state.bank.accountNumber = val
}
export const setSortCode = (state, val) => {
  state.bank.sortCode = val
}
export const clear = (state, val) => {
  state.completedPolicy = ''
  state.car = ''
  state.address = ''
  state.houseNumber = ''
  state.questionSet = ''
  state.quoteId = ''
  state.quoteJourneyStep = ''
  state.registrationNumber = ''
  state.summary = ''
  state.mileageBusiness = ''
  state.mileage = ''
  state.carOwner = ''
  state.carKeeper = ''
  state.overnightPlace = ''
  state.drivingLicence = ''
  state.preferredTitle = ''
  state.firstName = ''
  state.surname = ''
  state.emailAddress = ''
  state.mobileNumber = ''
  state.birthday = ''
  state.postCode = ''
  state.claimProtection = ''
  state.employmentStatus = ''
  state.occupation = ''
  state.businessCategory = ''
  state.resident = false
  state.medicalCondition = false
  state.criminalConviction = false
  state.searchEngine = ''
  state.otherSearchEngine = ''
  state.contactByEmail = ''
  state.contactBySMS = ''
  state.addDriver = ''
  state.coverType = ''
  state.classOfUse = ''
  state.coverStartDay = ''
  state.coverStartHour = ''
  state.coverStartMinute = ''
  state.voluntaryExcess = ''
  state.reasonForChange = ''
  state.paymentOption = ''
  state.addBillingAddress = ''
  state.nameOnCard = ''
  state.cardNumber = ''
  state.expiryYear = ''
  state.expiryMonth = ''
  state.cvv = ''
  state.billingAddress.firstLine = ''
  state.billingAddress.secondLine = ''
  state.billingAddress.thirdLine = ''
  state.billingAddress.city = ''
  state.billingAddress.postCode = ''
  state.freeEmail = ''
  state.freePost = ''
  state.bank.accountName = ''
  state.bank.bankName = ''
  state.bank.accountNumber = ''
  state.bank.sortCode = ''
  state.value = ''
}
export const setCarPlan = (state, val) => {
  state.carPlan = val
}
export const setCoverPlan = (state, val) => {
  state.coverPlan = val
}
