const faker = require('faker')

function createActivity() {
  return {
    shopUuid: faker.random.uuid(),
    activityUuid: faker.random.uuid(),
    activityDate: '20190302',
    activityScene: `0${faker.random.number({ min: 1, max: 9 })}111`,
    activityMainImage: '',
    activityLiveStatus: faker.random.arrayElement(['LIVING', 'OVER']),
  }
}

function createActivities(num) {
  const activities = []

  for (let i = 0; i < num; i++) {
    activities.push(createActivity())
  }

  return activities
}

function createActivityExportStatus() {
  return {
    activityUuid: faker.random.uuid(),
    status: faker.random.arrayElement(['INIT', 'GENERATING', 'GENERATE_SUCCESS', 'GENERATE_FAIL']),
    downloadUrl: 'http://www.baidu.com',
  }
}

function createActivitiesExportStatus(num) {
  const exportStatus = []

  for (let i = 0; i < num; i++) {
    exportStatus.push(createActivityExportStatus())
  }

  return exportStatus
}

function createActivityStatistic() {
  return {
    comfirmOrderAmount: `${faker.commerce.price(1, 100)}`,
    comfirmOrderCount: faker.random.number({ min: 1, max: 999 }),
    refundOrderAmount: `${faker.commerce.price(1, 100)}`,
    refundOrderCount: faker.random.number({ min: 1, max: 999 }),
    payedOrderAmount: `${faker.commerce.price(1, 100)}`,
    payedOrderCount: faker.random.number({ min: 1, max: 999 }),
  }
}

function createActivityStatisticNew() {
  return {
    totalOrderCount: faker.random.number({ min: 1, max: 999 }),
    comfirmOrderCount: faker.random.number({ min: 1, max: 999 }),
    refundOrderCount: faker.random.number({ min: 1, max: 999 }),
    totalItemCount: faker.random.number({ min: 1, max: 999 }),
    totalOrderAmount: `${faker.commerce.price(1, 100)}`,
    totalBenefitAmount: `${faker.commerce.price(1, 100)}`,
  }
}

function getActivityDetail(req, res) {
  const { activityUuid } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
    activity: createActivity(),
  })
}

const activities = createActivities(30)
function getActivities(req, res) {
  const { current, pageSize, status, activityType } = req.body

  const count = parseInt(pageSize)
  const pos = parseInt(current)
  const data = activities.slice(count * (pos - 1), count * (pos - 1) + count)

  res.status(200).json({
    code: 'success',
    message: '',
    list: data,
  })
}

function getActivityStatistic(req, res) {
  const { activityId } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
    statis: createActivityStatistic(),
  })
}

function getActivityStatisticNew(req, res) {
  const { activityId } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
    statis: createActivityStatisticNew(),
  })
}

function getActivitiesExportStatus(req, res) {
  const { activityUuidList } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
    exportResultList: createActivitiesExportStatus(activityUuidList.length),
  })
}

function requestExport(req, res) {
  const { activityUuid } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
    fileName: 'temp.excel',
  })
}

function getActivityCount(req, res) {
  res.status(200).json({
    code: 'success',
    message: '',
    activityCount: faker.random.number({ min: 1, max: 10 }),
  })
}

function getActivityAgentStatistic(req, res) {
  const { activityUuid } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
    data: {
      activityUuid: faker.random.uuid(),
      agentCount: faker.random.number({ min: 0, max: 10000 }),
      salvagedCount: faker.random.number({ min: 0, max: 10000 }),
      waitSalvagedCount: faker.random.number({ min: 0, max: 10000 }),
      settlementAmount: `${faker.commerce.price(1, 10000)}`,
    },
  })
}

module.exports = {
  'POST /v2/plb/order/queryBatchExportStatus': getActivitiesExportStatus,
  'POST /v2/plb/order/requestExport': requestExport,
  'POST /v2/ecommerce/plb/live/activity/detail': getActivityDetail,
  'POST /api/v2/ecommerce/plb/live/activity/page': getActivities,
  'POST /v2/ecommerce/plb/statis/h5/activityStatis': getActivityStatistic,
  'POST /v2/ecommerce/plb/statis/app/activityStatisNew': getActivityStatisticNew,
  'POST /v2/ecommerce/plb/live/activity/count': getActivityCount,
  'POST /v2/ecommerce/plb/live/agent/activityStatistics': getActivityAgentStatistic,
}
