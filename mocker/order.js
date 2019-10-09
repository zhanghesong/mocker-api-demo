const faker = require('faker')

function createOrder({
  orderStatus,
  orderType,
  preOrderStatus,
  type = 'order',
} = {}) {
  return {
    uuid: faker.random.uuid(),
    bizType: 'LIVE',
    bizKey: faker.random.uuid(),
    bizKeyAlias: '2019030201',
    orderNo: `P${faker.random.number({
      min: 100000000000,
      max: 999999999999,
    })}`,
    shopBase: {
      uuid: faker.random.uuid(),
      name: faker.name.findName(),
      avatar:
        'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJS8AiaqOQqE1j3qHCbiaNKF9D9BgtQuE6gFXoXPKUibRMeWvTO55TSeblaMIzFfp3lGdJt3qUPCibBTQ/132',
    },
    orderStatus:
      orderStatus ||
      faker.random.arrayElement([
        'WAIT_PAY',
        'PAID',
        'CONFIRMED',
        'OUT_OF_STOCK',
        'CLOSED',
      ]),
    totalItemAmount: `${faker.commerce.price(1, 100)}`,
    totalPayAmount: `${faker.commerce.price(1, 100)}`,
    totalDiscountAmount: `${faker.commerce.price(1, 100)}`,
    freightFee: `${faker.commerce.price(1, 100)}`,
    payType: '微信',
    toatalItemQuantity: faker.random.number({ min: 1, max: 3 }),
    shipping: {
      shippingContact: faker.name.findName(),
      shippingPhone: '13400000000',
      shippingProvinceId: faker.random.uuid(),
      shippingProvinceTitle: '四川',
      shippingCityId: faker.random.uuid(),
      shippingCityTitle: '成都',
      shippingRegionId: faker.random.uuid(),
      shippingRegionTitle: '天府新区',
      shippingAddress: '华府大道',
    },
    remarks: faker.random.words(2),
    closeReasonType: '',
    closeReasonRemarks: '',
    buyerBase: {
      uuid: faker.random.uuid(),
      name: faker.name.findName(),
      avatar:
        'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJS8AiaqOQqE1j3qHCbiaNKF9D9BgtQuE6gFXoXPKUibRMeWvTO55TSeblaMIzFfp3lGdJt3qUPCibBTQ/132',
    },
    payTime: '2019-04-02 08:23:50',
    refundTime: '2019-03-19 08:23:50',
    createTime: '2019-03-19 08:23:50',
    orderItemList: Array.from({ length: 55 }).map(() => ({
      uuid: faker.random.uuid(),
      orderNo: faker.random.uuid(),
      spuUuid: faker.random.uuid(),
      spuSerialNo: `0${faker.random.number({ min: 1, max: 9 })}`,
      spuName: faker.random.words(5),
      spuDesc: '',
      spuImg:
        'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/4d9875fba8b6d6c88aaaf0d8faea0958',
      skuUuid: faker.random.uuid(),
      skuSpec: '白色/S',
      skuQuantity: faker.random.number({ min: 1, max: 5 }),
      skuSalePrice: `${faker.commerce.price(1, 100)}`,
      skuSaleAmount: `${faker.commerce.price(1, 100)}`,
      remarks: faker.random.words(10),
    })),
    orderType: faker.random.arrayElement(
      orderType || ['LINK_TOP', 'LINK_MIDDLE', 'NORMAL', 'LINK_LEAF'],
    ),
    orderOperateFlow: {
      id: faker.random.uuid(),
      orderNo: faker.random.uuid(),
      nextOrderNo: faker.random.uuid(),
      preOrderNo: faker.random.uuid(),
      preOrderStatus: faker.random.arrayElement(
        preOrderStatus || ['PAID', 'CONFIRMED', 'OUT_OF_STOCK'],
      ),
      preOrderAmount: `${faker.commerce.price(1, 100)}`,
      preOrderOwnerName: faker.name.findName(),
      externalOrderNo: faker.random.uuid(),
    },
    profitAmount: `${faker.commerce.price(1, 100)}`,
  }
}

function createOrders(num, params) {
  const orders = []

  for (let i = 0; i < num; i++) {
    orders.push(createOrder(params))
  }

  return orders
}

function createSpu() {
  return {
    uuid: faker.random.uuid(),
    name: faker.name.findName(),
    serialNo: `${faker.random.number({ min: 10, max: 100 })}`,
    spuImg:
      'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/4d9875fba8b6d6c88aaaf0d8faea0958',
  }
}

function createSpuOrder(params) {
  return {
    spuBase: createSpu(),
    orderList: createOrders(faker.random.number({ min: 1, max: 10 }), params),
  }
}

function createSpuOrders(num, params) {
  const spuOrders = []

  for (let i = 0; i < num; i++) {
    spuOrders.push(createSpuOrder(params))
  }

  return spuOrders
}

const soldOrders = createOrders(55)
function getSoldOrders(req, res) {
  const {
    activityUuid,
    skuUuid,
    pagination: { current, pageSize } = {},
  } = req.body

  const count = parseInt(pageSize)
  const pos = parseInt(current)
  const data = soldOrders.slice(count * (pos - 1), count * (pos - 1) + count)

  res.status(200).json({
    code: 'success',
    message: '',
    orderList: data,
  })
}

function getOrderDetail(req, res) {
  const { orderNo } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
    order: createOrder(),
  })
}

const orders = createOrders(55)
function getOrders(req, res) {
  const {
    activityUuid,
    userType,
    orderStatusList = [],
    pagination: { current, pageSize } = {},
  } = req.body

  const count = parseInt(pageSize)
  const pos = parseInt(current)
  const data = orders
    .filter(
      order =>
        orderStatusList.length === 0 ||
        orderStatusList.indexOf(order.orderStatus) !== -1,
    )
    .slice(count * (pos - 1), count * (pos - 1) + count)

  res.status(200).json({
    code: 'success',
    message: '',
    orderList: data,
  })
}

const dealOrders = createOrders(21, { orderStatus: 'PAID' })
function getLastActivityDealOrders(req, res) {
  const { pagination: { current, pageSize } = {} } = req.body

  const count = parseInt(pageSize)
  const pos = parseInt(current)
  const data = dealOrders.slice(count * (pos - 1), count * (pos - 1) + count)

  res.status(200).json({
    code: 'success',
    message: '',
    orderList: data,
  })
}

const getHistoryActivityDealOrders = getLastActivityDealOrders

function refundOrder(req, res) {
  const { orderNo, refundType, refundReason } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
  })
}

function confirmOrder(req, res) {
  const { orderNo } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
  })
}

function searchOrders(req, res) {
  const { searchText, pagination: { current, pageSize } = {} } = req.body

  const count = parseInt(pageSize)
  const pos = parseInt(current)
  const data = orders.slice(count * (pos - 1), count * (pos - 1) + count)

  res.status(200).json({
    code: 'success',
    message: '',
    orderList: data,
  })
}

function countOrders(req, res) {
  const { activityUuid } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
    orderStatusCountList: [
      {
        status: 'PAID',
        count: 100,
      },
      {
        status: 'CONFIRMED',
        count: 100,
      },
      {
        status: 'OUT_OF_STOCK',
        count: 100,
      },
    ],
  })
}

function countOrdersByStatus(req, res) {
  const { orderStatus } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
    orderTypeCountList: [
      {
        orderType: 'LINK_TOP',
        count: faker.random.number({ min: 1, max: 10 }),
      },
      {
        orderType: 'LINK_MIDDLE',
        count: faker.random.number({ min: 1, max: 10 }),
      },
      {
        orderType: 'LINK_LEAF',
        count: faker.random.number({ min: 1, max: 10 }),
      },
      {
        orderType: 'NORMAL',
        count: faker.random.number({ min: 1, max: 10 }),
      },
    ],
  })
}

const spuPaidOrders = createSpuOrders(35, {
  orderStatus: 'PAID',
  orderType: ['NORMAL', 'LINK_TOP'],
})
const spuPaidOrders2 = createSpuOrders(32, {
  orderStatus: 'PAID',
  orderType: ['LINK_MIDDLE', 'LINK_LEAF'],
  preOrderStatus: ['PAID', 'OUT_OF_STOCK'],
})
function getOrdersGroupBySpu(req, res) {
  const {
    orderTypeList,
    status,
    pagination: { current, pageSize } = {},
  } = req.body

  const count = parseInt(pageSize)
  const pos = parseInt(current)
  const orders =
    orderTypeList.indexOf('NORMAL') !== -1 ? spuPaidOrders : spuPaidOrders2
  const data = orders.slice(count * (pos - 1), count * (pos - 1) + count)

  res.status(200).json({
    code: 'success',
    message: '',
    spuOrderList: data,
  })
}

function confirmOrders(req, res) {
  const { orderNoList } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
    successOrderNoList: orderNoList,
    failedOrderNoList: [],
  })
}

function refundOrders(req, res) {
  const { orderNoList, refundType = 'REFUND_PAY', refundReason } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
    successOrderNoList: orderNoList,
    failedOrderNoList: [],
  })
}

const settles = createOrders(55, { type: 'settle' })
function getSettles(req, res) {
  const { pagination: { current, pageSize } = {}, orderStatusList } = req.body

  const count = parseInt(pageSize)
  const pos = parseInt(current)
  const data = settles.slice(count * (pos - 1), count * (pos - 1) + count)

  res.status(200).json({
    code: 'success',
    message: '',
    orderList: data,
  })
}

module.exports = {
  'POST /v2/plb/order/listByActivityUuidAndSpuUuidInCurShop': getSoldOrders,
  'POST /v2/plb/order/queryByOrderNo': getOrderDetail,
  'POST /v2/plb/order/filterByActivityUuid': getOrders,
  'POST /v2/plb/order/listLastOneActivityPaidOrder': getLastActivityDealOrders,
  'POST /v2/plb/order/listHistoryPaidOrderExceptLastOneActivity': getHistoryActivityDealOrders,
  'POST /v2/plb/order/refundByOrder': refundOrder,
  'POST /v2/plb/order/confirmOrder': confirmOrder,
  'POST /v2/plb/order/searchByOrderNoOrPhone': searchOrders,
  'POST /v2/plb/order/countOrderStatusInActivity': countOrders,
  'POST /v2/plb/order/countOrderByCurUserGroupByOrderType': countOrdersByStatus,
  'POST /v2/plb/order/listOrderByCurUserGroupBySpu': getOrdersGroupBySpu,
  'POST /v2/plb/order/listConfirmedOrderInShopWithTimeFilter': searchOrders,
  'POST /v2/plb/order/confirmBatchByOrder': confirmOrders,
  'POST /v2/plb/order/refundBatchByOrder': refundOrders,
  'POST /v2/plb/order/listOnSiteOrder': getSettles,
  'POST /v2/plb/order/submitOrderFromCart': getOrderDetail,
}
