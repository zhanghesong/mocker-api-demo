const faker = require('faker')

function getShopUrl(req, res) {
  res.status(200).json({
    code: 'success',
    message: '',
    linkUrl: 'http://www.baidu.com',
  })
}

function getShortShopUrl(req, res) {
  const { longUrl } = req.body

  res.status(200).json({
    code: 'success',
    message: '',
    shortUrl: 'http://www.baidu.com',
  })
}

function assembleUrl(req, res) {
  const { path, data } = req.body

  return res.status(200).json({
    code: 'success',
    message: '',
    shortUrl: 'http://www.baidu.com',
    longUrl: 'http://www.baidu.com',
  })
}

function shareInfo(req, res) {
  res.status(200).json({
    code: 'success',
    message: '',
    data: {
      image: 'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/4d9875fba8b6d6c88aaaf0d8faea0958',
      topDoc: '标题',
      imageDoc: '描述',
      video: 'https://www.pailibo.net/video/plbxc.mp4',
    },
  })
}

module.exports = {
  'POST /v2/ecommerce/plb/live/config/getLinkUrl': getShopUrl,
  'POST /v2/ecommerce/plb/live/config/convertShortUrl': getShortShopUrl,
  'POST /v2/ecommerce/plb/live/config/assembleUrl': assembleUrl,
  'POST /v2/ecommerce/plb/live/config/getNewCourse': shareInfo,
}
