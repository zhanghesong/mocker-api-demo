const faker = require('faker')

function getUnreadMessageCount(req, res) {
  res.status(200).json({
    code: 'success',
    message: '',
    systemNum: faker.random.number({ min: 0, max: 10 }),
    logisticsNum: faker.random.number({ min: 0, max: 10 }),
  })
}

module.exports = {
  'GET /v2/plb/app/message/unreadMsgCount': getUnreadMessageCount,
}
