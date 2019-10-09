const faker = require('faker')

function createAgent() {
  return {
    activityUuid: faker.random.uuid(),
    liveAgentUuid: faker.random.uuid(),
    liveAgentCode: `0${faker.random.number({ min: 1, max: 9 })}`,
    liveAgentStatus: faker.random.arrayElement(['LIVEING', 'WAIT_PAY', 'SETTLED']),
    memberNo: faker.random.uuid(),
    memberName: faker.name.findName(),
    entranceTime: `${Date.now()}`,
  }
}

function createAgents(num) {
  const agents = []

  for (let i = 0; i < num; i++) {
    agents.push(createAgent())
  }

  return agents
}

function getAgents(req, res) {
  const { activityUuid } = req.body

  res.status(200).json({
    code: 'success',
    list: createAgents(55),
  })
}

function getAgentOrderAmount(req, res) {
  const { bizType, bizKey, memberOnSiteId } = req.body

  res.status(200).json({
    code: 'success',
    amount: `${faker.commerce.price(1, 10000)}`,
  })
}

function getAgentPrinteProcess(req, res) {
  const { bizType, bizKey, memberOnSiteId, isQuerySkuCount } = req.body

  res.status(200).json({
    code: 'success',
    printedCount: faker.random.number({ min: 1, max: 10000 }),
    unPrintedCount: faker.random.number({ min: 1, max: 10000 }),
  })
}

module.exports = {
  'POST /v2/ecommerce/plb/live/agent/listLiveAgent': getAgents,
  'POST /v2/plb/order/queryOrderAmount': getAgentOrderAmount,
  'POST /v2/plb/cart/queryPrintProcessByOnSiteId': getAgentPrinteProcess,
}
