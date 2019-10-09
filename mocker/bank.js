const faker = require('faker')

function createBankCard(isDefault) {
  return {
    uuid: faker.random.uuid(),
    bankName: faker.name.findName(),
    accountName: faker.name.findName(),
    cardNo: `${faker.random.number({ min: 1000, max: 9999 })}`,
    default: isDefault ? 'Y' : faker.random.arrayElement(['Y', 'N']),
    icon: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJS8AiaqOQqE1j3qHCbiaNKF9D9BgtQuE6gFXoXPKUibRMeWvTO55TSeblaMIzFfp3lGdJt3qUPCibBTQ/132',
  }
}

function createBankCards(num) {
  const bankCards = []

  for (let i = 0; i < num; i++) {
    bankCards.push(createBankCard())
  }

  return bankCards
}

function createBank() {
  return {
    bankName: faker.name.findName(),
    icon: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJS8AiaqOQqE1j3qHCbiaNKF9D9BgtQuE6gFXoXPKUibRMeWvTO55TSeblaMIzFfp3lGdJt3qUPCibBTQ/132',
  }
}

function addBankCard(req, res) {
  const { bankName, accountName, cardNo, icon } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
    uuid: faker.random.uuid(),
  })
}

function getBankCards(req, res) {
  res.status(200).json({
    code: 'success',
    message: '',
    list: createBankCards(4),
  })
}

function getDefaultBankCard(req, res) {
  res.status(200).json({
    code: 'success',
    message: '',
    bankCard: createBankCard(true),
  })
}

function setDefaultBankCard(req, res) {
  const { uuid } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
  })
}

function identifyBankCard(req, res) {
  const { cardNo } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
    bank: createBank(),
  })
}

module.exports = {
  'POST /v2/ecommerce/plb/member/bank/addBankCard': addBankCard,
  'POST /v2/ecommerce/plb/member/bank/bankCardList': getBankCards,
  'POST /v2/ecommerce/plb/member/bank/getDefaultBankCard': getDefaultBankCard,
  'POST /v2/ecommerce/plb/member/bank/setDefaultBankCard': setDefaultBankCard,
  'POST /v2/ecommerce/plb/member/bank/bankIdentify': identifyBankCard,
}
