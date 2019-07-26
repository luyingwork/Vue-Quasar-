import services from 'src/services'
import { Loading, Notify } from 'quasar'

export const getAllProducts = async (context) => {
  try {
    let response = await services.getAllProducts()
    return Promise.resolve(response.data.data.products)
  } catch (e) {
    Notify.create(`Error loading AllProducts. ${e}`, 5000)
    Loading.hide()
    return Promise.reject(e)
  }
}

export const getProductPages = async (context, productId) => {
  try {
    let response = await services.getProduct(productId)
    return Promise.resolve(response.data.data.productPages)
  } catch (e) {
    Notify.create(`Error loading ProductPages. ${e}`, 5000)
    Loading.hide()
    return Promise.reject(e)
  }
}

export const getQuestionSet = async (context, questionSetId) => {
  try {
    let response = await services.getQuestionSet(questionSetId)
    return Promise.resolve(response.data.data)
  } catch (e) {
    Notify.create(`Error loading QuestionSet. ${e}`, 5000)
    Loading.hide()
    return Promise.reject(e)
  }
}

export const setMtaRiskData = async (context, questionSetData) => {
  console.log('Setting MTA Data.....')
  console.log(questionSetData)
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
//         for (i = 0; i < questionList.length; i++) {
//           questionSet[questionList[i].name] = []
//           if (questionList[i].definedList !== null) {
//             let detailList = questionList[i].definedList.definedListDetailDefinedList
//             let j
//             for (j = 0; j < detailList.length; j++) {
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
