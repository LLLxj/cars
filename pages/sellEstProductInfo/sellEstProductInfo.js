// pages/sellEstProductInfo/sellEstProductInfo.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    id: '',
    form: {},
    dealSellTitle: '',
    assessWaresTitle: '',
    sellPrice: '',
    cityList: [],
    sexLabel: '',
    contactName: '',
    contactPhone: '',
    areaName: '',
    areaId: '',
    proAreaId: 19,
    cityAreaId: '',
    cityAreaName: '',
    countyAreaId: '',
    countyAreaName: '',
    countyList: [],
    sex: '',
    sexArray: [
      { label: '先生', val: 0 },
      { label: '女士', val: 1 }
    ],
    addr: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      id: options.id
    })
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
    var token = wx.getStorageSync('token')
    this.setData({
      token: token
    })
    this.getInfo()
    this.getCityList()
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
  getInfo() {
    const mythis = this
    const id = mythis.data.id
    wx.showLoading({
      title: '提交中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/deal/assess/sell/info/' + id,
      header: {
        'token': mythis.data.token
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
      },
      success: function (res) {
        if (res.data && res.data.code == 0) {
          wx.hideLoading()
          console.log(res.data.data)
          mythis.setData({
            form: res.data.data
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
  getTitle(e) {
    this.setData({
      dealSellTitle: e.detail.value
    })
  },
  getName(e) {
    this.setData({
      assessWaresTitle: e.detail.value
    })
  },
  getPrice(e) {
    this.setData({
      sellPrice: e.detail.value
    })
  },
  sexChange(e) {
    const id = e.detail.value
    const sex = this.data.sexArray[id].val
    const sexLabel = this.data.sexArray[id].label
    this.setData({
      sex: sex,
      sexLabel: sexLabel
    })
  },
  getAddress(e) {
    this.setData({
      addr: e.detail.value
    })
  },
  getContact(e) {
    this.setData({
      contactName: e.detail.value
    })
  },
  getPhone(e) {
    this.setData({
      contactPhone: e.detail.value
    })
  },
  getCityList() {
    const mythis = this
    wx.showLoading({
      title: '提交中。。。',
    })
    wx.request({
      url: app.globalData.apiUrl + '/cust/area/city/19',
      header: {
        'token': mythis.data.token
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
      },
      success: function (res) {
        if (res.data && res.data.code == 0) {
          wx.hideLoading()
          mythis.setData({
            cityList: res.data.data
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
  cityChange(e) {
    const id = e.detail.value
    const areaName = this.data.cityList[id].areaName
    const areaId = this.data.cityList[id].areaId
    this.setData({
      cityAreaId: areaId,
      cityAreaName: areaName
    })
    this.getCountryList(areaId)
  },
  getCountryList(id) {
    const mythis = this
    wx.showLoading({
      title: '加载中。。。',
    })
    wx.request({
      url: app.globalData.apiUrl + '/cust/area/county/' + id,
      header: {
        'token': mythis.data.token
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
      },
      success: function (res) {
        if (res.data && res.data.code == 0) {
          wx.hideLoading()
          mythis.setData({
            countyList: res.data.data
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
  countyChange(e) {
    const id = e.detail.value
    const countyAreaName = this.data.countyList[id].areaName
    const countyAreaId = this.data.countyList[id].areaId
    this.setData({
      countyAreaId: countyAreaId,
      countyAreaName: countyAreaName
    })
  },
  updateInfo() {
    const mythis = this
    wx.showLoading({
      title: '提交中。。。',
    })
    wx.request({
      url: app.globalData.apiUrl + '/deal/assess/sell/update',
      header: {
        'token': mythis.data.token
      },
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
        dealSellId: mythis.data.form.dealSellId,
        dealSellTitle: mythis.data.form.dealSellTitle,
        contactName: mythis.data.contactName,
        contactPhone: mythis.data.contactPhone,
        sex: mythis.data.sex,
        proAreaId: mythis.data.proAreaId,
        cityAreaId: mythis.data.cityAreaId,
        countyAreaId: mythis.data.countyAreaId,
        addr: mythis.data.addr
      },
      success: function (res) {
        if (res.data && res.data.code == 0) {
          wx.hideLoading()
          wx.navigateBack({})
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
  }
})