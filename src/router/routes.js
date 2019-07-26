
const routes = [
  // QuoteJourney
  {
    path: '/QuoteJourney',
    component: () => import('layouts/QuoteJourney'),
    children: [
      { path: 'question-set', name: 'QuestionSet', component: () => import('pages/QuestionSet') },
      { path: 'car-details', name: 'CarDetails', component: () => import('pages/CarDetails') },
      { path: 'payment', component: () => import('pages/Payment') },
      { path: 'payment-confirm', name: 'PaymentConfirm', component: () => import('pages/PaymentConfirm') }
    ]
  },
  // customer-portal
  {
    path: '/',
    name: 'Index',
    component: () => import('layouts/CustomerPortal'),
    children: [
      { path: 'index', name: 'Home', component: () => import('pages/Home'), meta: { anonymous: true } },
      { path: 'recover', name: 'Recover', component: () => import('pages/customer-portal/Recover') },
      { path: 'dashboard', name: 'Dashboard', component: () => import('pages/customer-portal/Dashboard') },
      { path: 'quotes', name: 'Quotes', component: () => import('pages/customer-portal/Quotes') },
      { path: 'policies', name: 'Policies', component: () => import('pages/customer-portal/Policies') },
      { path: 'policies/policy', name: 'Policy', component: () => import('pages/customer-portal/Policy') },
      { path: 'policies/cancel', name: 'Cancel', component: () => import('pages/customer-portal/Cancel') },
      { path: 'policies/change/first', name: 'ChangeStepFirst', component: () => import('pages/customer-portal/PolicyChangeFirst') },
      { path: 'policies/change/second', name: 'ChangeStepSecond', component: () => import('pages/customer-portal/PolicyChangeSecond') },
      { path: 'policies/change/payment', name: 'ChangeStepPayment', component: () => import('pages/PolicyChangePayment') },
      { path: 'policies/change/decline', name: 'ChangeStepDecline', component: () => import('pages/customer-portal/PolicyChangeDecline') },
      { path: 'documents', name: 'Documents', component: () => import('pages/customer-portal/Documents') },
      { path: 'claims', name: 'Claims', component: () => import('pages/customer-portal/Claims') },
      { path: 'account', name: 'Account', component: () => import('pages/customer-portal/Account') },
      { path: 'account/password', name: 'PasswordReset', component: () => import('pages/customer-portal/PasswordReset') },
      { path: 'confirm', name: 'Confirm', component: () => import('pages/customer-portal/Confirm') },
      { path: 'confirmChange', name: 'ConfirmChange', component: () => import('pages/customer-portal/Confirm') },
      { path: 'confirmCancelChange', name: 'ConfirmCancelChange', component: () => import('pages/customer-portal/Confirm') },
      { path: 'abandon', name: 'Abandon', component: () => import('pages/customer-portal/Abandon') },
      { path: 'email', name: 'Email', component: () => import('pages/customer-portal/Email') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    name: 'NotFound',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
