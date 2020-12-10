// pages/brandList/brandList.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotList: [],
    list: [
      { firstLetter: '全部', brandVoList: [{ couBrandName: '不限' }] }
    ],
    proAreaName: '广东省',
    cityAreaName: '',
    countyAreaName: '',
    areaId: 19,
    cityId: '',
    areaName: '广东省',
    toView: '',
    width: '',
    height: '',
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      width: wx.getSystemInfoSync().windowWidth,
      height: wx.getSystemInfoSync().windowHeight,
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
    this.getHotDataList()
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
  getHotDataList() {
    var mythis = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/cust/area/province',
      header: {
        'token': mythis.data.token
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
      },
      success: function (res) {
        wx.hideLoading()
        if (res.data.code === 0) {
          mythis.getDataList()
          mythis.setData({
            hotList: res.data.data
          })
        } else {
          app.showErrorMsg(res.data.msg)
        }
      },
      fail: function (err) {
        wx.hideLoading()
        console.log(err);
        app.showNetworkError()
      }
    })
  },
  getDataList() {
    var mythis = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/cust/area/city/' + this.data.areaId,
      header: {
        'token': mythis.data.token
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
      },
      success: function (res) {
        wx.hideLoading()
        if (res.data.code === 0) {
          mythis.setData({
            list: res.data.data
          })
        } else {
          app.showErrorMsg(res.data.msg)
        }
      },
      fail: function (err) {
        wx.hideLoading()
        console.log(err);
        app.showNetworkError()
      }
    })
  },
  changeRegion (e) {
    const proAreaName = e.currentTarget.dataset.id.areaName
    this.setData({
      proAreaName: proAreaName,
    })
    this.getDataList()
  },
  selectCity (e) {
    const cityAreaName = e.currentTarget.dataset.id.areaName
    const cityId = e.currentTarget.dataset.id.areaId
    this.setData({
      cityAreaName: cityAreaName,
      cityId: cityId,
      show: true
    })
    this.getCountry()
  },
  getCountry() {
    var mythis = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/cust/area/county/' + this.data.cityId,
      header: {
        'token': mythis.data.token
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
      },
      success: function (res) {
        wx.hideLoading()
        if (res.data.code === 0) {
          mythis.setData({
            cityList: res.data.data
          })
        } else {
          app.showErrorMsg(res.data.msg)
        }
      },
      fail: function (err) {
        wx.hideLoading()
        console.log(err);
        app.showNetworkError()
      }
    })
  },
  selectArea (e) {
    const countyAreaName = e.currentTarget.dataset.id.areaName
    const cityId = e.currentTarget.dataset.id.areaId
    const proAreaName = this.data.proAreaName
    const cityAreaName = this.data.cityAreaName
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    
    //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      proAreaName: proAreaName,
      cityAreaName: cityAreaName,
      countyAreaName: countyAreaName,
    })
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 1000)
  },
  noCityHandle () {
    const proAreaName = this.data.proAreaName
    const cityAreaName = null
    const countyAreaName = null
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    
    //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      proAreaName: proAreaName,
      cityAreaName: cityAreaName,
      countyAreaName: countyAreaName,
    })
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 1000)
  },
  noAreaHandle () {
    const proAreaName = this.data.proAreaName
    const cityAreaName = this.data.cityAreaName
    const countyAreaName = null
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    
    //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      proAreaName: proAreaName,
      cityAreaName: cityAreaName,
      countyAreaName: countyAreaName,
    })
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 1000)
  },
  cancle () {
    this.setData({
      show: false
    })
  }
})