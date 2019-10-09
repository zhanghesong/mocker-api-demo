const faker = require('faker')

function createAccount() {
  return {
    accountNo: faker.random.uuid(),
    accountType: '',
    platformCode: 'PLB',
    clientId: faker.random.uuid(),
    accountStatus: faker.random.arrayElement(['NORMAL', 'FROZEN', 'DISABLED']),
    totalBalance: `${faker.commerce.price(1, 100)}`,
    availableBalance: `${faker.commerce.price(1, 100)}`,
    dummyFlag: false,
    withdrawFlag: true,
    externAccountFlag: false,
    createTime: `${Date.now()}`,
  }
}

function createAccountBill() {
  return {
    platformCode: 'PLB',
    accountNo: faker.random.uuid(),
    otherAccountNo: faker.random.uuid(),
    transactionNo: faker.random.uuid(),
    outBizNo: faker.random.uuid(),
    timestamp: `${Date.now() + faker.random.number({ min: -1, max: 1 }) * 31536000000}`,
    amount: `${faker.commerce.price(1, 100)}`,
    bizType: '',
    memo: '提现到-工商银行(0805)',
    endingBalance: `${faker.commerce.price(1, 100)}`,
    fundDirection: faker.random.arrayElement(['IN', 'OUT']),
  }
}

function createCashDetail() {
  return {
    withdrawNo: faker.random.uuid(),
    amount: `${faker.commerce.price(1, 100)}`,
    payeeName: faker.name.findName(),
    bankcardNo: `${faker.random.number({ min: 1000, max: 9999 })}`,
    bankName: faker.name.findName(),
    memo: '提现到-工商银行(0805)',
    status: faker.random.arrayElement(['PROCESSING', 'COMPLETED', 'CLOSED']),
    createTime: `${Date.now() + faker.random.number({ min: -1, max: 1 }) * 31536000000 + faker.random.number({ min: 0, max: 3600000 })}`,
    finishTime: `${Date.now()}`,
    errorMsg: faker.random.word(),
  }
}

function createAccountBills(num) {
  const accountBills = []

  for (let i = 0; i < num; i++) {
    accountBills.push(createCashDetail())
  }

  return accountBills
}

function sendPhoneCode(req, res) {
  const { biztype } = req.body
  res.status(200).json({
    code: 'success',
    message: '',
  })
}

function doneCash(req, res) {
  const { accountType, amount, bankcardUuid, memo, verifyCode } = req.body
  res.status(200).json({
    code: 'success',
    message: '',
    withdrawNo: faker.random.uuid(),
  })
}

function getAccountInfo(req, res) {
  res.status(200).json({
    code: 'success',
    message: '',
    account: createAccount(),
  })
}

const accountBills = createAccountBills(35)
function getAccountBills(req, res) {
  const { current, pageSize } = req.body

  const count = parseInt(pageSize)
  const pos = parseInt(current)
  const data = accountBills.slice(count * (pos - 1), count * (pos - 1) + count)

  res.status(200).json({
    code: 'success',
    message: '',
    withdrawInfo: data,
  })
}

function getCashDetail(req, res) {
  const { withdrawNo } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
    withdrawInfo: createCashDetail(),
  })
}

module.exports = {
  'POST /v2/fund/account/app/sendPhoneVerifyCode': sendPhoneCode,
  'POST /v2/fund/account/app/withdraw': doneCash,
  'POST /v2/fund/account/app/queryAccountInfo': getAccountInfo,
  'POST /v2/fund/account/app/queryWithdrawList': getAccountBills,
  'POST /v2/fund/account/app/queryWithdrawInfo': getCashDetail,
}
