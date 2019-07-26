import axios from 'axios'
let isSecure = window.location.href.indexOf('https') !== -1
const baseUrl = (isSecure ? 'https://' : 'http://') + 'yoga-api.ignite.systems/api'

let url = ''
axios.defaults.withCredentials = true
export default {
  getAllProducts () {
    url = `${baseUrl}/product/all`
    return axios.get(url)
  },
  getProduct (uniqueId) {
    url = `${baseUrl}/product/${uniqueId}/questionset`
    return axios.get(url)
  },
  getQuestionSet (questionSetId) {
    url = `${baseUrl}/questionset/${questionSetId}`
    return axios.get(url)
  },
  getAddress (postCode, houseNumber) {
    url = `${baseUrl}/ratingengine/address/` + postCode + '/' + houseNumber
    return new Promise(function (resolve, reject) {
      axios.get(url)
        .then(res => {
          resolve(res.data)
        })
    })
  },
  getVehicle (registration) {
    url = `${baseUrl}/ratingengine/vehicle/` + registration
    return new Promise(function (resolve, reject) {
      axios.get(url)
        .then(res => {
          resolve(res.data)
        })
    })
  },
  getQuote (quoteData) {
    url = `${baseUrl}/ratingengine/ModernCar/rate`
    return new Promise(function (resolve, reject) {
      axios.post(url, quoteData)
        .then(res => {
          if (res.data.result === 'Decline') {
            reject(res.data)
          } else {
            resolve(res.data)
          }
        }, error => {
          reject(error)
        })
    })
  },
  makePayment (payment) {
    url = `${baseUrl}/payment/process`
    return new Promise(function (resolve, reject) {
      axios.post(url, payment)
        .then(res => {
          resolve(res.data)
        }, error => {
          reject(error)
        })
    })
  },
  getQuoteFromID (quoteID, vaps) {
    url = `${baseUrl}/customer/${quoteID}/quoteFromID`
    return new Promise(function (resolve, reject) {
      axios.post(url, vaps)
        .then(res => {
          resolve(res.data)
        }, error => {
          reject(error)
        })
    })
  },
  logout () {
    url = `${baseUrl}/auth/logout`
    return new Promise(function (resolve, reject) {
      axios.get(url)
        .then(res => {
          resolve(res.data)
        })
    })
  },
  login (username, password) {
    url = `${baseUrl}/auth/login`
    setTimeout(ping => {
      axios.post(url, { 'username': username, 'password': password })
        .then(res => {
        })
    }, 30000)
    return new Promise(function (resolve, reject) {
      axios.post(url, { 'username': username, 'password': password })
        .then(res => {
          resolve(res.data)
        })
    })
  },
  passwordReset (email, firstName, lastName) {
    url = `${baseUrl}/account/password/forgot`
    return new Promise(function (resolve, reject) {
      axios.post(url, { 'EmailAddress': email, 'Firstname': firstName, 'Surname': lastName })
        .then(res => {
          resolve(res.data)
        })
    })
  },
  passwordChange (OldPassword, NewPassword) {
    url = `${baseUrl}/account/password`
    return new Promise(function (resolve, reject) {
      axios.put(url, { 'NewPassword': NewPassword, 'OldPassword': OldPassword })
        .then(res => {
          resolve(res.data)
        }, error => {
          resolve(error)
        })
    })
  },
  authenticated (username, password) {
    url = `${baseUrl}/auth/authenticated`
    return new Promise(function (resolve, reject) {
      axios.get(url)
        .then(res => {
          resolve(res.data)
        })
    })
  },
  changeDetails (data) {
    url = `${baseUrl}/auth/change`
    return new Promise(function (resolve, reject) {
      axios.post(url, data)
        .then(res => {
          resolve(res.data)
        })
    })
  },
  getAllCustomerActivePolicies (count) {
    url = `${baseUrl}/customer/policy/active?orderBy=DESC&count=` + count
    return new Promise(function (resolve, reject) {
      axios.get(url)
        .then(res => {
          if (res.result === 'false') {
            reject(res.data)
          } else {
            resolve(res.data)
          }
        })
    })
  },
  getAllCustomerPolicies (page, size) {
    url = `${baseUrl}/customer/policy/all?page=` + page + `&size=` + size + `&orderBy=DESC`
    return new Promise(function (resolve, reject) {
      axios.get(url)
        .then(res => {
          if (res.result === 'false') {
            reject(res.data)
          } else {
            resolve(res.data)
          }
        })
    })
  },
  getCustomerCompletedQuotes (count) {
    url = `${baseUrl}/customer/quote/completed?orderBy=DESC&count=` + count
    return new Promise(function (resolve, reject) {
      axios.get(url)
        .then(res => {
          if (res.result === 'false') {
            reject(res.data)
          } else {
            resolve(res.data)
          }
        })
    })
  },
  getAllCustomerQuotes (page, size) {
    url = `${baseUrl}/customer/quote/all?page=` + page + `&size=` + size + `&orderBy=DESC`
    return new Promise(function (resolve, reject) {
      axios.get(url)
        .then(res => {
          if (res.result === 'false') {
            reject(res.data)
          } else {
            resolve(res.data)
          }
        })
    })
  },
  getRecentCustomerDocuments (count) {
    url = `${baseUrl}/customer/document/` + count
    return new Promise(function (resolve, reject) {
      axios.get(url)
        .then(res => {
          if (res.result === 'false') {
            reject(res.data)
          } else {
            resolve(res.data)
          }
        })
    })
  },
  downloadDocument (path) {
    url = `${baseUrl}/document/` + path
    return url
  },
  getCustomerUpcomingRenewals (count) {
    url = `${baseUrl}/customer/renewals/ASC/` + count
    return new Promise(function (resolve, reject) {
      axios.get(url)
        .then(res => {
          if (res.result === 'false') {
            reject(res.data)
          } else {
            resolve(res.data)
          }
        })
    })
  },
  getAllCustomerClaims () {
    url = `${baseUrl}/customer/claim/all`
    return new Promise(function (resolve, reject) {
      axios.get(url)
        .then(res => {
          if (res.result === 'false') {
            reject(res.data)
          } else {
            resolve(res.data)
          }
        })
    })
  },
  getAllCustomerDocuments (page, size) {
    url = `${baseUrl}/customer/document/all?page=` + page + `&size=` + size
    return new Promise(function (resolve, reject) {
      axios.get(url)
        .then(res => {
          if (res.result === 'false') {
            reject(res.data)
          } else {
            resolve(res.data)
          }
        })
    })
  },
  getAllCustomerPolicyDocuments (policyNumber, page, size) {
    url = `${baseUrl}/policy/` + policyNumber + `/document?page=` + page + `&size=` + size + `&orderBy=DESC`
    return new Promise(function (resolve, reject) {
      axios.get(url)
        .then(res => {
          if (res.result === 'false') {
            reject(res.data)
          } else {
            resolve(res.data)
          }
        })
    })
  },
  putPolicyCancellationRequest (cancellation) {
    url = `${baseUrl}/policy/cancellation/request`
    return new Promise(function (resolve, reject) {
      axios.put(url, cancellation)
        .then(res => {
          resolve(res.data)
        })
    })
  },
  getAllProductCancellationReasons (productUniqueId) {
    url = `${baseUrl}/product/` + productUniqueId + `/cancellationreasons`
    return new Promise(function (resolve, reject) {
      axios.get(url)
        .then(res => {
          if (res.result === 'false') {
            reject(res.data)
          } else {
            resolve(res.data)
          }
        })
    })
  },
  putPolicyCancellationConfirm (cancellation) {
    url = `${baseUrl}/policy/cancellation/confirmation`
    return new Promise(function (resolve, reject) {
      axios.put(url, cancellation)
        .then(res => {
          resolve(res.data.data)
        })
    })
  },
  getPolicyHistoryInformation (policyNumber, page, size) {
    url = `${baseUrl}/policy/` + policyNumber + `/history/desc?page=` + page + `&size=` + size
    return new Promise(function (resolve, reject) {
      axios.get(url)
        .then(res => {
          if (res.result === 'false') {
            reject(res.data)
          } else {
            resolve(res.data)
          }
        })
    })
  },
  getMtaRiskInfo (policyNumber) {
    url = `${baseUrl}/policy/${policyNumber}/risk`
    return new Promise(function (resolve, reject) {
      axios.get(url, policyNumber)
        .then(res => {
          resolve(res.data.data)
        })
    })
  },
  getPolicyChangeQuote (changeInfo) {
    url = `${baseUrl}/ratingengine/policychange/${changeInfo.policyNumber}/rate`
    return new Promise(function (resolve, reject) {
      axios.post(url, changeInfo.policyChange)
        .then(res => {
          resolve(res.data)
        }, error => {
          reject(error)
        })
    })
  },
  makePolicyChangePayment (payment) {
    url = `${baseUrl}/payment/processPolicyChange`
    return new Promise(function (resolve, reject) {
      axios.post(url, payment)
        .then(res => {
          resolve(res.data)
        }, error => {
          reject(error)
        })
    })
  },
  getPreviousCards (policyNumber) {
    url = `${baseUrl}/payment/cardsusedonpolicy/${policyNumber}`
    return new Promise(function (resolve, reject) {
      axios.get(url, policyNumber)
        .then(res => {
          resolve(res.data.data.cards)
        })
    })
  }
}
