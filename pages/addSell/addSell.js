// pages/addSell/addSell.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dealAssessId: '',
    dealSellTitle: '',
    contactName: '',
    contactPhone: '',
    cityAreaId: '',
    countyAreaId: '',
    addr: '',
    countyName: '',
    areaName: '',
    sexArray: [
      { label: '先生', val: 0 },
      { label: '女士', val: 1 }
    ],
    countyList: [],
    cityList: [],
    sexLabel: '',
    token: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      dealAssessId: options.dealAssessId
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
  getCityList(id) {
    var mythis = this
    wx.showLoading({
      title: '加载中',
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
        if (res.data && res.data.code === 0) {
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
  getCounty(id) {
    var mythis = this
    wx.showLoading({
      title: '加载中',
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
        if (res.data && res.data.code === 0) {
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
  getTitle(e) {
    this.setData({
      dealSellTitle: e.detail.value
    })
  },
  getName(e) {
    this.setData({
      contactName: e.detail.value
    })
  },
  getMobile(e) {
    this.setData({
      contactPhone: e.detail.value
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
  cityChange(e) {
    const id = e.detail.value
    const areaId = this.data.cityList[id].areaId
    const areaName = this.data.cityList[id].areaName
    this.setData({
      cityAreaId: areaId,
      areaName: areaName
    })
    this.getCounty(areaId)
  },
  countyChange(e) {
    const id = e.detail.value
    const countyId = this.data.countyList[id].areaId
    const countyName = this.data.countyList[id].areaName
    this.setData({
      countyAreaId: countyId,
      countyName: countyName
    })
  },
  getAddr(e) {
    this.setData({
      addr: e.detail.value
    })
  },
  submit () {
    var mythis = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/deal/assess/sell/save',
      header: {
        'token': mythis.data.token
      },
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
        dealSellTitle: mythis.data.dealSellTitle,
        dealAssessId: mythis.data.dealAssessId,
        contactName: mythis.data.contactName,
        contactPhone: mythis.data.contactPhone,
        sex: mythis.data.sex,
        proAreaId: 19,
        cityAreaId: mythis.data.cityAreaId,
        countyAreaId: mythis.data.countyAreaId,
        addr: mythis.data.addr
      },
      success: function (res) {
        if (res.data && res.data.code === 0) {
          wx.hideLoading()
          wx.navigateBack()
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