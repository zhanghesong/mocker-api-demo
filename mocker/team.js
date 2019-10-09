const faker = require('faker')

// 分页信息
const Pagination = () => ({
  // undefined: //每页数目
  pageSize: 20,
  // undefined: //当前页
  current: 1,
  // undefined: //总条数
  total: faker.random.number(),
})

const Team = () => ({
  teamBase: TeamBase(),
  teamMember: Array.from({
    length: faker.random.number({ min: 1, max: 100 }),
  }).map(TeamMember),
})

const TeamBase = () => ({
  uuid: faker.random.uuid(),
  // undefined: //队伍名称
  name: faker.name.findName(),
  // undefined: //队伍头像
  avatar: faker.image.avatar(),
  // undefined: //当前用户是否是这个队伍的owner
  isOwner: faker.random.arrayElement([true, false]),
  // undefined: //允许的最大的成员个数
  maxNoOfMember: faker.random.number(15),
  // undefined: //当前成员个数
  curNoOfMember: faker.random.number(15),
  // 08:23:50: //如2019-03-19
  createTime: faker.date.past(),
  memberAvatarList: Array.from({ length: faker.random.number({ min: 1, max: 4 }) }).map(() => faker.image.avatar()),
})

const TeamMember = () => ({
  uuid: faker.random.uuid(),
  teamUuid: faker.random.uuid(),
  memberNo: faker.random.uuid(),
  memberName: faker.name.findName(),
  memberAvatar: faker.image.avatar(),
  isOwner: faker.random.arrayElement([true, false]),
})

const ListTeamBaseResponse = (req, res) => {
  res.status(200).json({
    code: 'success',
    message: '',
    teamBase: Array.from({ length: faker.random.number(10) }).map(TeamBase),
  })
}

const CreateTeamResponse = (req, res) => {
  res.status(200).json({
    code: 'success',
    message: '',
    teamUuid: faker.random.uuid(),
  })
}

const SuccessResponse = (req, res) => {
  res.status(200).json({
    code: 'success',
    message: '33',
  })
}

const QueryByIdResponse = (req, res) => {
  res.status(200).json({
    // 队伍成员已经达到最大: //MAX_MEMBER_ERROR
    // 加入的队伍个数达到最大: //MAX_TEAM_ERROR
    // 队伍不存在或者已经解散: //NOT_EXIST
    code: 'success',
    message: '1111',
    team: Team(),
  })
}

function queryTeamsByIds(req, res) {
  const { teamUuidList } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
    teamBase: Array.from({ length: faker.random.number(10) }).map(TeamBase),
  })
}

module.exports = {
  'POST /v2/plb/team/listTeamBaseByCurUser': ListTeamBaseResponse,
  'POST /v2/plb/team/createTeam': CreateTeamResponse,
  'POST /v2/plb/team/updateTeamName': SuccessResponse,
  'POST /v2/plb/team/dismissTeam': SuccessResponse,
  'POST /v2/plb/team/joinTeam': SuccessResponse,
  'POST /v2/plb/team/queryById': QueryByIdResponse,
  'POST /v2/plb/team/removeMember': SuccessResponse,
  'POST /v2/plb/team/quitTeam': SuccessResponse,
  'POST /v2/plb/team/getConfigOfMaxMemberCountInTeam': {
    code: 'success',
    configJson: '{"3":"3人团","5":"5人团","10":"10人团"}',
  },
  'POST /v2/plb/team/getConfigOfMaxJoinTeamCount': {
    count: faker.random.number(6),
    code: 'success',
    message: '1111',
  },
  'POST /v2/plb/team/listTeamBaseByCurUser': queryTeamsByIds,
}
