const faker = require('faker/locale/zh_CN')

const MonthBenefitResponse = () => ({
  code: 'success',
  benefit: {
    monthPayCount: faker.random.number(),
    monthBenefitAmount: faker.commerce.price(),
  },
})
const TodayBenefitResponse = () => ({
  code: 'success',
  benefit: {
    todayPayCount: faker.random.number(),
    todayBenefitAmount: faker.commerce.price(),
  },
})

module.exports = {
  'POST /v2/ecommerce/plb/statis/app/todayBenefit': TodayBenefitResponse,
  'POST /v2/ecommerce/plb/statis/app/monthBenefit': MonthBenefitResponse,
}
