const faker = require('faker')

function getShopDetail(req, res) {
  const { shopUuid } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
    shop: {
      shopUuid: faker.random.uuid(),
      shopName: faker.name.findName(),
      shopAvatar: 'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/4d9875fba8b6d6c88aaaf0d8faea0958',
      memberNo: faker.random.uuid(),
    },
  })
}

module.exports = {
  'POST /v2/ecommerce/plb/live/shop/detail': getShopDetail,
}
