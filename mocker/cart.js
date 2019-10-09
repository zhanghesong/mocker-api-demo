const faker = require('faker')

const randomUuid = Array.from({ length: faker.random.number(50) }).map(
  faker.random.uuid,
)

const CartItem = () => ({
  // LIVE(直播)、ON_SITE(现场捞单)
  bizType: faker.random.arrayElement(['LIVE', '、ON_SITE']),
  bizKey: faker.random.uuid(),
  // 会员现场编号,全局唯一
  memberOnSiteId: faker.random.uuid(),
  // 会员现场名称，即现场分配的可读的编号。可读编号可能会被重复使用，唯一性请使用<code>memberOnSiteNo</code>
  memberOnSiteTitle: faker.random.words(),
  // 会员编号，购物车所属的会员id
  memberNo: faker.random.uuid(),
  memberNickName: faker.random.words(),
  memberAvatar:
    'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/4d9875fba8b6d6c88aaaf0d8faea0958',
  shopUuid: faker.random.uuid(),
  shopName: faker.random.words(),
  shopAvatar:
    'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/4d9875fba8b6d6c88aaaf0d8faea0958',
  remarks: faker.random.words(),

  // ---------sku------
  skuUuid: faker.random.uuid(),
  // 规格
  skuSpec: faker.random.words(),
  // sku数量
  skuQuantity: faker.random.number(100),
  salePrice: faker.commerce.price(),
  // skuQuantity * salePrice = saleAmount
  saleAmount: faker.commerce.price(),
  barcode: 17,

  // ---------spu------
  spuUuid: faker.random.arrayElement(randomUuid),
  // 商品编号，与线下实物一致
  spuSerialNo: faker.random.uuid(),
  spuName: faker.name.firstName(),
  spuDesc: faker.random.words(),
  // spu主图
  spuImg:
    'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/4d9875fba8b6d6c88aaaf0d8faea0958',
})

module.exports = {
  'POST /v2/plb/cart/listByCurUser': (req, res) => {
    res.status(200).json({
      code: 200,
      message: '',
      cartItemList: Array.from({ length: faker.random.number(1000) }).map(
        CartItem,
      ),
    })
  },
  'POST /v2/plb/cart/listByCurUser': (req, res) => {
    res.status(200).json({
      cartItemList: Array.from({ length: faker.random.number(1000) }).map(
        CartItem,
      ),
      message: '',
      code: 200,
    })
  },
  'POST /v2/plb/cart/listByShopId': (req, res) => {
    res.status(200).json({
      cartItemList: Array.from({ length: faker.random.number(1000) }).map(
        CartItem,
      ),
      message: '',
      code: 200,
    })
  },
  'POST /v2/plb/cart/queryPrintListByBizKey': (req, res) => {
    res.status(200).json({
      cartItemList: Array.from({ length: faker.random.number(1000) }).map(
        CartItem,
      ),
      message: '',
      code: 200,
    })
  },
  'POST /v2/plb/cart/queryPrintListByMemberOnSiteId': (req, res) => {
    res.status(200).json({
      cartItemList: Array.from({ length: faker.random.number(1000) }).map(
        CartItem,
      ),
      message: '',
      code: 200,
    })
  },
  'POST /v2/plb/cart/queryPrinteProcessByOnSiteId': (req, res) => {
    res.status(200).json({
      code: '200',
      message: '',
      printedCount: faker.random.number(100),
      unPrintedCount: 0,
      skuCount: faker.random.number(),
      bizKeyAlias: faker.random.words(),
    })
  },
  'POST /v2/plb/cart/queryPrintProcessByBizKey': (req, res) => {
    res.status(200).json({
      code: '200',
      message: '',
      printedCount: faker.random.number(100),
      unPrintedCount: faker.commerce.price(),
      skuCount: faker.random.number(),
      bizKeyAlias: faker.random.words(),
    })
  },
  'POST /v2/plb/cart/queryPrintProcessByOnSiteId': (req, res) => {
    res.status(200).json({
      code: '200',
      message: '',
      printedCount: faker.random.number(100),
      unPrintedCount: faker.commerce.price(),
      skuCount: faker.random.number(),
      bizKeyAlias: faker.random.words(),
    })
  },
  'POST /v2/ecommerce/plb/live/agent/stop': (req, res) => {
    res.status(200).json({})
  },
}
