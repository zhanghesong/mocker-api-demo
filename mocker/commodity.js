const faker = require('faker')

function createShareTeams(num) {
  const teams = []

  for (let i = 0; i < num; i++) {
    teams.push({
      teamNo: faker.random.uuid(),
      teamName: faker.name.findName(),
    })
  }

  return teams
}

function createCommodity() {
  return {
    activityUuid: faker.random.uuid(),
    itemUuid: faker.random.uuid(),
    itemName: faker.name.findName(),
    itemDesc: faker.random.words(6),
    itemNo: `0${faker.random.number({ min: 1, max: 9 })}`,
    itemSalePrice: `${faker.commerce.price(1, 100)}`,
    itemMainImage:
      'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/4d9875fba8b6d6c88aaaf0d8faea0958',
    isReceiveOrder: faker.random.arrayElement(['N', 'Y']),
    itemImages: [
      'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/4d9875fba8b6d6c88aaaf0d8faea0958',
      'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/69f197dbdad844f310bdd7fc5733bdf9',
      'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/9854846d1af5b155c4344814eb5266f5',
      'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/41b2221fd2929f53a4c848efa160dd6f',
      'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/117b853b1ec1953de865615c00db4942',
    ].slice(0, faker.random.number({ min: 0, max: 9 })),
    spec: [
      {
        k: '颜色',
        v: ['白色', '黑色', '红色'],
      },
      {
        k: '尺码',
        v: ['X', 'XXXL'],
      },
    ],
    skus: [],
    createTime: `${Date.now()}`,
    isCopy: faker.random.arrayElement(['Y', 'N']),
    isDelete: faker.random.arrayElement(['N', 'Y']),
    sourceType: faker.random.arrayElement(['OWN', 'COPY', 'RESELL']),
    shareType: faker.random.arrayElement(['PRIVATE', 'SHARE']),
    sourceMember: {
      memberNo: faker.random.uuid(),
      memberName: faker.name.findName(),
      memberAvatar:
        'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/4d9875fba8b6d6c88aaaf0d8faea0958',
    },
    shareTeam: createShareTeams(faker.random.number({ min: 1, max: 5 })),
    isShareFriend: faker.random.arrayElement(['N', 'Y']),
    isShareTeam: faker.random.arrayElement(['N', 'Y']),
    itemCostPrice: `${faker.commerce.price(1, 100)}`,
    itemServiceFee: `${faker.commerce.price(1, 100)}`,
    brandName: faker.name.findName(),
    isAuto: faker.random.arrayElement(['N', 'Y']),
    isStock: faker.random.arrayElement(['N', 'Y']),
  }
}

function createCommodityStore() {
  return {
    itemUuid: faker.random.uuid(),
    skuUuid: faker.random.uuid(),
    quantityUuid: faker.random.uuid(),
    spec: faker.name.findName(),
    initialQuantity: faker.random.number({ min: 1, max: 5 }),
    quantity: faker.random.number({ min: 1, max: 5 }),
    salesQuantity: faker.random.number({ min: 1, max: 5 }),
    lockQuantity: faker.random.number({ min: 1, max: 5 }),
    soldQuantity: faker.random.number({ min: 1, max: 5 }),
    isStock: faker.random.arrayElement(['N', 'Y']),
    isAuto: faker.random.arrayElement(['N', 'Y']),
  }
}

function createCommodityStores(num) {
  const commodityStores = []

  for (let i = 0; i < num; i++) {
    commodityStores.push(createCommodityStore())
  }

  return commodityStores
}

function createCommodities(num) {
  const commodities = []

  for (let i = 0; i < num; i++) {
    commodities.push(createCommodity())
  }

  return commodities
}

function closeLive(req, res) {
  const { itemUuid } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
  })
}

function openLive(req, res) {
  const { itemUuid } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
  })
}

function removeCommodity(req, res) {
  const { itemUuid } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
  })
}

function getCommodityDetail(req, res) {
  const { itemUuid } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
    item: createCommodity(),
  })
}

function getSoldSpuCount(req, res) {
  const { activityUuid, spuUuid } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
    count: 120,
  })
}

const shareCommodities = createCommodities(55)
function getShareCommodities(req, res) {
  const { current, pageSize, teamNo, memberNo } = req.body

  const count = parseInt(pageSize)
  const pos = parseInt(current)
  const data = shareCommodities.slice(
    count * (pos - 1),
    count * (pos - 1) + count,
  )

  res.status(200).json({
    code: 'success',
    message: '',
    list: data,
  })
}

function copyCommodity(req, res) {
  const { itemUuid, serviceFee } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
    itemUuid: faker.random.uuid(),
    activityUuid: faker.random.uuid(),
  })
}

function getUnCopyCommodities(req, res) {
  const { memberNo } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
    list: createCommodities(55),
  })
}

function copyCommodities(req, res) {
  const { itemUuid, addPrice, sourceMemberNo } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
    taskId: faker.random.uuid(),
  })
}

function getCopyTaskStatus(req, res) {
  const { taskId } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
    taskStatus: faker.random.arrayElement(['WAIT', 'SUCCESS', 'FAILED']),
    successCount: faker.random.number({ min: 1, max: 10 }),
    totalCount: 10,
  })
}

function getFriendCommodities(req, res) {
  const { current, pageSize, memberNo } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
    list: createCommodities(parseInt(pageSize)),
  })
}

function getCommodityStore(req, res) {
  const { itemUuid } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
    itemSkuQuantity: {
      itemUuid,
      quantity: faker.random.number({ min: 1, max: 10 }),
      skuQuantities: createCommodityStores(faker.random.number({ min: 1, max: 5 })),
    },
  })
}

function updateCommoditySkuStore(req, res) {
  const { skuUuid, addQuantity, quantityUuid } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
  })
}

module.exports = {
  'POST /v2/ecommerce/plb/live/item/close': closeLive,
  'POST /v2/ecommerce/plb/live/item/open': openLive,
  'POST /v2/ecommerce/plb/live/item/remove': removeCommodity,
  'POST /v2/ecommerce/plb/live/item/detail': getCommodityDetail,
  'POST /v2/plb/order/countSoldSpuInActivity': getSoldSpuCount,
  'POST /v2/ecommerce/plb/live/team/item/page': getShareCommodities,
  'POST /v2/ecommerce/plb/live/item/copy': copyCommodity,
  'POST /v2/ecommerce/plb/live/team/item/query': getUnCopyCommodities,
  'POST /v2/ecommerce/plb/live/item/batchCopy': copyCommodities,
  'POST /v2/ecommerce/plb/live/item/task/query': getCopyTaskStatus,
  'POST /v2/ecommerce/plb/live/friend/item/page': getFriendCommodities,
  'POST /v2/ecommerce/plb/live/quantity/queryQuantityItemUuid': getCommodityStore,
  'POST /v2/ecommerce/plb/live/quantity/updateSkuQuantity': updateCommoditySkuStore,
}
