// import services from 'src/services'
// import { Loading, Notify } from 'quasar'

export const setMtaRiskData = async ({commit}, questionSetData) => {
  console.log('Setting MTA Data.....')
  commit('setAddress', questionSetData.address)
  commit('setRegistrationNumber', questionSetData.registrationNumber)
  commit('setBirthday', questionSetData.birthday)
  commit('setBusinessCategory', questionSetData.businessCategory)
  commit('setCar', questionSetData.car)
  commit('setCarKeeper', questionSetData.carKeeper)
  commit('setCarOwner', questionSetData.carOwner)
  commit('setClaimProtection', questionSetData.claimProtection)
  commit('setUseClass', questionSetData.classOfUse)
  commit('setContactByEmail', questionSetData.contactByEmail)
  commit('setContactBySMS', questionSetData.contactBySms)
  commit('setCoverKind', questionSetData.coverType)
  commit('setCriminalConviction', questionSetData.criminalConviction)
  commit('setDrivingLicence', questionSetData.drivingLicence)
  commit('setEmailAddress', questionSetData.emailAddress)
  commit('setEmploymentStatus', questionSetData.employmentStatus)
  commit('setFirstName', questionSetData.firstName)
  commit('setHouseNumber', questionSetData.houseNumber)
  commit('setMedicalCondition', questionSetData.medicalCondition)
  commit('setMileage', questionSetData.mileage)
  commit('setMileageBusiness', questionSetData.mileageBusiness)
  commit('setMobileNumber', questionSetData.mobileNumber)
  commit('setOccupation', questionSetData.occupation)
  commit('setOtherSearchEngine', questionSetData.otherSearchEngine)
  commit('setOvernightPlace', questionSetData.overnightPlace)
  commit('setPostCode', questionSetData.postCode)
  commit('setPreferredTitle', questionSetData.preferredTitle)
  commit('setResident', questionSetData.resident)
  commit('setSearchEngine', questionSetData.searchEngine)
  commit('setSurname', questionSetData.surname)
  commit('setValue', questionSetData.value)
  commit('setPurchaseDate', questionSetData.purchaseDate)
  commit('setVoluntaryExcess', questionSetData.voluntaryExcess)
  commit('setAddDriver', questionSetData.addDriver)
  commit('setManufactureYear', questionSetData.manufactureYear)
  commit('setImported', questionSetData.imported)
  commit('setModified', questionSetData.modified)
  commit('setTracker', questionSetData.tracker)
  const indexes = ['first', 'second', 'third', 'fourth']
  for (let i = 0; i < questionSetData.additionalDrivers.length; i++) {
    const driver = questionSetData.additionalDrivers[i]
    const index = indexes[i]
    commit('setExtraExistingDriver', {order: index, value: true})
    commit('setExtraDrivingLicence', {order: index, value: driver.drivingLicence})
    commit('setExtraPreferredTitle', {order: index, value: driver.title})
    commit('setExtraFirstName', {order: index, value: driver.firstName})
    commit('setExtraSurname', {order: index, value: driver.surname})
    commit('setExtraEmail', {order: index, value: driver.email})
    commit('setExtraBirthday', {order: index, value: driver.birthday})
    commit('setExtraEmploymentStatus', {order: index, value: driver.employmentStatus})
    commit('setExtraOccupation', {order: index, value: driver.occupation})
    commit('setExtraBusinessCategory', {order: index, value: driver.businessCategory})
    if (index > 0) commit('setExtraAddDriver', {order: index - 1, value: 'yes'})
  }
  console.log(questionSetData)
}

export const cancelPendingChange = async ({commit}, policy) => {
  commit('customerPortal/setPolicyNumber', policy.policyNumber, {root: true})
  commit('setMtaQuoteResultSummary', {quoteDetails: {isCancelPending: true, calculatedTotalPremiumInclIPTAndFees: policy.pendingRefundAmount, calculatedTotalPayable: policy.pendingRefundAmount}})
  return Promise.resolve()
}

export const setCompletedPolicyChangeCancelled = async ({commit}, policyNumber) => {
  commit('customerPortal/setConfirmation', {policyNumber: policyNumber, type: 'PolicyChangeCancelled'}, {root: true})
  commit('policyChange/setCompletedPolicyChangeCancelled', policyNumber)
}

export const makePolicyChange = async ({commit}, policyNumber) => {
  commit('customerPortal/setPolicyNumber', policyNumber, {root: true})
  commit('clear')
  return Promise.resolve()
}

// export async function getQuestionSet (context, questionSetId) {
//   try {
//     let response = await services.getQuestionSet(questionSetId)
//     let error = response.data.error
//     let data = response.data.data
//     let questionSet = {}
//     let result = {}
//     if (Object.entries(error).length === 0 && error.constructor === Object) {
//       if (data.questions && data.questions.length > 0) {
//         let questionList = data.questions
//         let i
//         for (i = 0 i < questionList.length i++) {
//           questionSet[questionList[i].name] = []
//           if (questionList[i].definedList !== null) {
//             let detailList = questionList[i].definedList.definedListDetailDefinedList
//             let j
//             for (j = 0 j < detailList.length j++) {
//               let obj = {}
//               obj.label = detailList[j].name
//               obj.value = detailList[j].uniqueId
//               questionSet[questionList[i].name].push(obj)
//             }
//           }
//         }
//       }
//       // context.commit('setQuestionVehicleDetail', questionSet)
//       // console.info(questionSet)
//       result = {
//         questionSetId: questionSetId,
//         questionSet: questionSet
//       }
//       context.commit('setQuestion', result)
//       return Promise.resolve(questionSet)
//     } else {
//       return Promise.reject(error)
//     }
//   } catch (err) {
//     return Promise.reject(err)
//   }
// }
