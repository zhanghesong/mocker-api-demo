const faker = require('faker/locale/zh_CN')

const { random } = faker

const PaginationResponse = req => {
  const { current = 1, pageSize = 10 } = req.body || {}
  return {
    // 当前页码
    current,
    // 每页数量
    pageSize,
    // 符合条件的总数量
    total: random.number({ min: 50, max: 100 }),
  }
}

const MemberAddress = () => ({
  // 会员编号
  memberNo: random.number(5),
  // 收货人名称
  receiver: faker.name.findName(),
  // 收货人手机
  contactPhone: faker.phone.phoneNumber(),
  // 省ID
  provinceId: faker.address.country(),
  // 省名
  province: faker.address.country(),
  // 市ID
  cityId: random.uuid(),
  // 市名
  city: faker.address.city(),
  // 区ID
  regionId: random.uuid(),
  // 区名
  region: faker.address.county(),
  // 详细地址
  detailAddress: faker.address.streetAddress(),
  // 邮编
  zipCode: faker.address.zipCode(),
  // UUID
  uuid: random.uuid(),
  // 默认地址
  defaultAddress: random.arrayElement(['YES', 'NO']),
})

// 会员收货地址简要信息
const SimpleMemberAddress = () => ({
  // 收货人名称
  receiver: random.uuid(),
  // 收货人手机
  contactPhone: random.uuid(),
  // 省名
  province: random.uuid(),
  // 市名
  city: random.uuid(),
  // 区名
  region: random.uuid(),
  // 详细地址
  detailAddress: random.uuid(),
  // UUID
  uuid: random.uuid(),
})

// 查询会员收货地址简要信息的请求
const GetSimpleMemberAddressRequest = () => ({
  // UUID
  uuid: random.uuid(),
})

// 查询会员收货地址简要信息的响应
const GetSimpleMemberAddressResponse = () => ({
  // 响应状态码，成功则为SUCCESS
  code: 'success',
  // 异常消息，可读的消息
  message: random.uuid(),
  // 会员（会员）收货地址简要信息
  address: SimpleMemberAddress,
})

// 查询会员收货地址信息的请求
const GetMemberAddressRequest = () => ({})

// 查询会员收货地址信息的响应
const GetMemberAddressResponse = () => ({
  // 响应状态码，成功则为SUCCESS
  code: 'success',
  // 异常消息，可读的消息
  message: random.uuid(),
  // 会员（会员）收货地址信息对象
  address: MemberAddress(),
})

// 查询会员所有收货地址请求
const QueryFullMemberAddressRequest = () => ({})

// 查询会员所有收货地址响应
const QueryFullMemberAddressResponse = () => ({
  // 响应状态码，成功则为SUCCESS
  code: 'success',
  // 异常消息，可读的消息
  message: random.uuid(),
  // 会员（会员）收货地址信息对象
  list: Array.from({ length: 10 }).map(MemberAddress),
})

// 分页查询会员收货地址信息的响应
const QueryMemberAddressResponse = () => ({
  // 响应状态码，成功则为SUCCESS
  code: 'success',
  // 异常消息，可读的消息
  message: random.uuid(),
  // 分页
  pagination: PaginationResponse,
  // 会员（会员）收货地址信息对象
  list: Array.from({ length: 10 }).map(MemberAddress),
})

// 保存会员收货地址信息请求
const SaveMemberAddressRequest = () => ({
  // UUID
  uuid: random.uuid(),
  // 会员编号
  memberNo: random.uuid(),
  // 修改人
  modifierMemberNo: random.uuid(),
  // 收货人名称
  receiver: random.uuid(),
  // 收货人手机
  contactPhone: random.uuid(),
  // 省ID
  provinceId: random.uuid(),
  // 省名
  province: random.uuid(),
  // 市ID
  cityId: random.uuid(),
  // 市名
  city: random.uuid(),
  // 区ID
  regionId: random.uuid(),
  // 区名
  region: random.uuid(),
  // 详细地址
  detailAddress: random.uuid(),
  // 邮编
  zipcode: 'success',
  // 默认地址
  defaultAddress: random.arrayElement(['Y', 'N']),
})

// 保存会员收货地址信息的响应
const SaveMemberAddressResponse = () => ({
  // 响应状态码，成功则为SUCCESS
  code: 'success',
  // 异常消息，可读的消息
  message: random.uuid(),
})

// 变更（删除/设置默认）会员收货地址信息请求
const ModifyMemberAddressRequest = () => ({
  // UUID
  uuid: random.uuid(),
})

// 变更（删除/设置默认）会员收货地址信息响应
const ModifyMemberAddressResponse = () => ({
  // 响应状态码，成功则为SUCCESS
  code: 'success',
  // 异常消息，可读的消息
  message: random.uuid(),
})

module.exports = {
  'GET /v2/ecommerce/plb/member/getSimpleMemberAddress': GetSimpleMemberAddressResponse(),
  'GET /v2/ecommerce/plb/member/queryMemberAddressByPage': QueryMemberAddressResponse(),
  'GET /v2/ecommerce/plb/member/queryFullAddressByMemberNo': QueryFullMemberAddressResponse(),
  'GET /v2/ecommerce/plb/member/getMemberAddress': GetMemberAddressResponse(),
  'POST /v2/ecommerce/plb/member/saveMemberAddress': SaveMemberAddressResponse(),
  'POST /v2/ecommerce/plb/member/deleteMemberAddress': ModifyMemberAddressResponse(),
  'POST /v2/ecommerce/plb/member/updateDefaultMemberAddress': ModifyMemberAddressResponse(),
}
