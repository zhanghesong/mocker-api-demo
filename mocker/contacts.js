const faker = require('faker/locale/zh_CN')
// 朋友
const Friend = () => ({
  // 昵称
  nick: faker.name.firstName(),
  // 备注
  memo: faker.name.jobArea(),
  // 头像
  avatar: faker.image.avatar(),
  // 昵称拼音
  nickPy: faker.name.lastName(),
  // 备注拼音
  memoPy: faker.name.lastName(),
  // 朋友会员号
  friendMemberNo: faker.random.number(),
})
// 朋友关系
const FriendMessage = () => ({
  // 来源会员号
  fromMemberNo: faker.random.number(),
  // 目的会员号
  toMemberNo: faker.random.number(),
})
// 朋友请求消息
const FriendMsg = () => ({
  // 对方会员号
  fromMemberNo: faker.random.number(),
  // 对方会员昵称
  fromMemberNick: faker.name.firstName(),
  // 对方会员头像
  fromMemberAvarta: faker.image.avatar(),
  // 请求备注消息
  memo: faker.name.firstName(),
  // 请求状态
  status: faker.random.arrayElement(['WAIT_PASS', 'PASSED']),
})
// 请求返回
const NoContentResponse = () => ({
  // 返回码
  code: 'success',
  // 返回信息
  message: '',
})

// 朋友请求
const SendFriendMsgRequest = () => ({
  // 目的对方会员号
  toMemberNo: faker.random.number(),
  // 请求备注消息
  memo: faker.random.words(),
})

// 未读消息数量请求返回
const NotReadMsgCountResponse = () => ({
  // 返回码
  code: 'success',
  // 返回信息
  message: '',
  // 消息数量
  msgCount: faker.random.number(40),
})

// 朋友请求消息列表
const FriendMsgListResponse = () => ({
  // 返回码
  code: 'success',
  // 返回信息
  message: '',
  // 消息列表
  list: Array.from({ length: faker.random.number(10) }).map(FriendMsg),
})
// 朋友列表请求
const FriendListResponse = () => ({
  // 返回码
  code: 'success',
  // 返回信息
  message: 'hhhh',
  // 朋友列表
  list: Array.from({ length: faker.random.number({ min: 0, max: 0 }) }).map(Friend),
})

function searchMember(req, res) {
  const { memberNo } = req.query

  res.status(200).json({
    code: 'success',
    message: '',
    member: {
      memberNo: '1234567',
      nick: faker.name.findName(),
      avatar: 'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/4d9875fba8b6d6c88aaaf0d8faea0958',
      gender: '',
    },
  })
}

function deleteMember(req, res) {
  const { toMemberNo } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
  })
}

function isFriend(req, res) {
  const { memberNo } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
    flag: faker.random.arrayElement([true, false]),
  })
}

module.exports = {
  'POST /v2/ecommerce/plb/contactbook/app/sendFriendMsg': NoContentResponse,
  'POST /v2/ecommerce/plb/contactbook/app/notReadMsgCount': NotReadMsgCountResponse,
  'POST /v2/ecommerce/plb/contactbook/app/friendMsgList': FriendMsgListResponse,
  'POST /v2/ecommerce/plb/contactbook/app/friendList': FriendListResponse,
  'POST /v2/ecommerce/plb/contactbook/app/deleteFriend': NoContentResponse,
  'POST /v2/ecommerce/plb/contactbook/app/msgProcess': NoContentResponse,
  'GET /v2/ecommerce/plb/member/app/searchMemberInfo': searchMember,
  'POST /v2/ecommerce/plb/contactbook/app/isFriend': isFriend,
}
