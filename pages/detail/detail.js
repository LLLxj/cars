// pages/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    picList: [],
    imageWidth: '',
    current: 1,
    postTime: '今日更新',
    carInfo1: {
      "10589": "26000000",
      "rundistance": "6.02万公里",
      "paifangbiaozhun": "",
      "contactperson": "优信二手车",
      "cjshijian": "2020年7月",
      "ywdy": "",
      "dealPrice": "20.22万元-21.31万元",
      "type": "出售",
      "userid": "61167139357956",
      "licheng": "",
      "lego_tid": "",
      "caraddress": "",
      "price": "23.32万元",
      "shangpainianyue": "201707",
      "logo": "https://img.58cdn.com.cn/escstatic/zhuzhan-active/brand/410767.png",
      "isrundistance": "0",
      "displacement": "2.0L",
      "priceqj": "18_24",
      "pics": ["https://pic1.58cdn.com.cn/p1/big/n_v24765c7e170c041cd88564f1ac1b5d899_480_360.jpg","https://pic1.58cdn.com.cn/p1/big/n_v2115e11c723ba463e9db527804e2aad50_480_360.jpg","https://pic1.58cdn.com.cn/p1/big/n_v25b8c1b7b28a14a82a66c5c2becf1c641.png","https://pic1.58cdn.com.cn/p1/big/n_v2de265772a2314737a630d4b7a3b98460_480_360.jpg","https://pic1.58cdn.com.cn/p1/big/n_v2b98ed4e67b1440dbac2ad9c2bc42b509_480_360.jpg","https://pic1.58cdn.com.cn/p1/big/n_v238120af9f9d846a29bc2e210c9695743_480_360.jpg","https://pic1.58cdn.com.cn/p1/big/n_v2979f6d5b5e1a44a88b9d5ea9acc68455_480_360.jpg","https://pic1.58cdn.com.cn/p1/big/n_v2deced590a4874cd49cd758939d9e25c3_480_360.jpg","https://pic1.58cdn.com.cn/p1/big/n_v20ad0fc3e3d0049c1a975dc4e3a6c8f65_480_360.jpg","https://pic1.58cdn.com.cn/p1/big/n_v2b6fc921affe64bb6904ffd0bc9fc3d5c_480_360.jpg","https://pic1.58cdn.com.cn/p1/big/n_v2330f9a5e425c4259bbe86d64a98bae38_480_360.jpg","https://pic1.58cdn.com.cn/p1/big/n_v25666c79da35d4931af80dfa0c58988fc_480_360.jpg","https://pic1.58cdn.com.cn/p1/big/n_v2d5ef171643324f82bdb4f0df8a7c24f2_480_360.jpg","https://pic1.58cdn.com.cn/p1/big/n_v26f2beaf13e83425187f5d196f434a875_480_360.jpg","https://pic1.58cdn.com.cn/p1/big/n_v2aa63e59db62f48209b40374eb9fe02c8_480_360.jpg","https://pic1.58cdn.com.cn/p1/big/n_v264d8167ff1ea48a88a7089555525e4e1_480_360.jpg","https://pic1.58cdn.com.cn/p1/big/n_v217515387233a458684bf8eba4b10e155_480_360.jpg","https://pic1.58cdn.com.cn/p1/big/n_v21441e916d7c44b8b830d946c7993945b_480_360.jpg","https://pic1.58cdn.com.cn/p1/big/n_v26276feeed1ee4983a71acb75aba6bfeb_480_360.jpg","https://pic1.58cdn.com.cn/p1/big/n_v21b935e87a190461a8deb0b7c5e314667_480_360.jpg","https://pic1.58cdn.com.cn/p1/big/n_v2226313c94e0d41dc85f6cf139a6995d3_480_360.jpg","https://pic1.58cdn.com.cn/p1/big/n_v2d3fbe05ad95b48cc87c3d329fd745db4_480_360.jpg","https://pic1.58cdn.com.cn/p1/big/n_v229402aeb325248e5bd01f4e818186dd6_480_360.jpg","https://pic1.58cdn.com.cn/p1/big/n_v2b0f48064cd2446c58c4353b1377533fc_480_360.jpg","https://pic1.58cdn.com.cn/p1/big/n_v271c6dc3f0cdb40ae8a4f1a6ed05af408_480_360.jpg"],
      "brand": "别克",
      "cspailiang": "2.0L",
      "ghcs": "",
      "deopt": "华东仓",
      "guohufeiyong": "",
      "usertype": "1",
      "chexilist": "//luna.58.com/list.shtml?ext=1dw1HgwaXZvtzGqmuZPUJZeKYj_tDjenYZ6R4okr7aPQJaOb7K6Up3AKzjA10dqRtaOr4aO84K_nunw1mgVUtaPgeE72HfU283Oa9aOU7akr4arQAaPamaVKNaO-NakB6E7bv&cate=biekegl&productid=10038&extParam={&quot;adxcid&quot;:&quot;ded45eff-b4cc-43ca-b533-33cb1409356f&quot;}&city=gz&entityType=0&cityId=3&slot=lm_detail_1&pageid=2&tid=09990521-c346-430f-adb3-869b1f3fe0fbo3o1560000&-15=20&pos=9&slot_id=1001905&cid=ded45eff-b4cc-43ca-b533-33cb1409356f",
      "baoyang": "",
      "zhibao": "",
      "visitnum": "2383",
      "ldpz": "胎压监测,无钥匙启动,车身稳定控制,陡坡缓降,定速巡航,后倒车雷达,蓝牙/电话,外接音源,后排出风口,自动空调",
      "dispcatepath": "车辆买卖与服务,二手车",
      "chexi": "别克GL8",
      "gujiaurl": "https://carprice.m.58.com/m916071/d201707m6_02c8728.html?gcjid=0&clientsrc=307&from=guchejia_lianmengdetail",
      "cheshenyanse": "红色",
      "oldlevel": "",
      "shangyebaoxian": "",
      "phone": "4008585725",
      "pailiang": "",
      "gujia": "",
      "yingzhuanfei": "",
      "chexing": "2017款 28T 2.0 手自一体 舒适型",
      "biansuqi": "自动",
      "chengshipz": "",
      "phonearea": "",
      "xttags": "",
      "newPrice": "31.47万元",
      "content": "车辆编号:37387573<br/>此车没出现过重大事故和水淹火烧的情况，车辆没有进行改装，车架件未见修复痕迹，车体外观瑕疵较少，部分漆面有过喷漆，内饰无磨损和污渍，发动机变速箱工况良好，车辆灯光功能配置无故障无损坏，发动机舱内油液状况良好。",
      "newcar": "1",
      "sid": "165025532207608612633624047",
      "isbaoyang": "0",
      "pos": "1",
      "objecttypelist": "//luna.58.com/list.shtml?ext=1dw1HgwaXZvtzGqmuZPUJZeKYj_tDjenYZ6R4okr7aPQJaOb7K6Up3AKzjA10dqRtaOr4aO84K_nunw1mgVUtaPgeE72HfU283Oa9aOU7akr4arQAaPamaVKNaO-NakB6E7bv&cate=mpv&productid=10038&extParam={&quot;adxcid&quot;:&quot;ded45eff-b4cc-43ca-b533-33cb1409356f&quot;}&city=gz&entityType=0&cityId=3&slot=lm_detail_1&pageid=2&tid=09990521-c346-430f-adb3-869b1f3fe0fbo3o1560000&-15=20&u_5864=18_24&pos=9&slot_id=1001905&cid=ded45eff-b4cc-43ca-b533-33cb1409356f",
      "gearbox": "自动",
      "objecttype": "MPV",
      "gonglishu": "",
      "shiguqk": "",
      "infotitle": "别克 GL8 2017款 28T 舒适型",
      "erchouchePrice": "23.32",
      "jzpz": "",
      "postdate": "2020-03-05 03:49:28",
      "zcbqstate": "否",
      "yanse": "红",
      "firstcity": "全国",
      "headPicture": "//pic1.58cdn.com.cn/m1/bigimage/n_v208c47a98e49a48aea65de819db3ffe5e.png",
      "quyu": "全国",
      "qxshijian": "2020年7月",
      "buytime": "2017年",
      "pinpaicode": "410767",
      "chexicode": "410975"
    },
    carInfo: {},
    userInfo: {
      "infoid": 40722461930527,
      "sid": "152840468207665477437191466",
      "phone": "13822******",
      "userid": 29699440365834,
      "sessionid": null,
      "catentry": {
        "dispid": "29",
        "name": "二手车",
        "listname": "ershouche"
      },
      "isbiz": true,
      "locallist": [
        {
          "dispid": "3",
          "name": "广州",
          "listname": "gz"
        }
      ],
      "page": "1",
      "start": 1584361857889,
      "rootcatentry": {
        "dispid": "4",
        "name": "车辆买卖与服务",
        "listname": "car"
      },
      "linkman": "黄生",
      "modules": "finalpage",
      "is_huzhuan": false
    },
    token: '',
    type: '' // 0 个人 1 企业
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token')
    this.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth,
      id: options.id,
      token: token,
      type: options.type
    })
    if (options && options.type == 0) {
      this.getPersonInfo()
    } else if (options && options.type == 1) {
      this.getComInfo()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getPersonInfo() {
    var mythis = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/deal/wares/retail/' + mythis.data.id,
      header: {
        token: mythis.data.token
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
      },
      success: function (res) {
        if (res.data && res.data.code == 0) {
          wx.hideLoading()
          console.log(res.data.data)
          mythis.setData({
            carInfo: res.data.data
          })
        } else {
          wx.hideLoading()
          app.showErrorMsg(res.data.msg);
        }
      },
      fail: function (err) {
        wx.hideLoading()
        console.log(err);
        app.showNetworkError()
      }
    })
  },

  getComInfo() {
    var mythis = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/deal/wares/store/' + mythis.data.id,
      header: {
        token: mythis.data.token
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
      },
      success: function (res) {
        if (res.data && res.data.code == 0) {
          wx.hideLoading()
          console.log(res.data.data)
          mythis.setData({
            carInfo: res.data.data
          })
        } else {
          wx.hideLoading()
          app.showErrorMsg(res.data.msg);
        }
      },
      fail: function (err) {
        wx.hideLoading()
        console.log(err);
        app.showNetworkError()
      }
    })
  },

  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value[0]
    })
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  changeCurrent: function (e) {
    var current = e.detail.current
    this.setData({
      current: current + 1
    })
  },

  phoneCall: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.carInfo.contactPhone
    })
  }
})