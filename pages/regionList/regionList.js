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
    areaId: 19,
    cityId: '',
    areaName: '广东省',
    toView: '',
    width: '',
    height: ''
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
          console.log(res.data.data)
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
  selectBrand(e) {
    const brandParam = e.currentTarget.dataset.id
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    
    //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      couBrandName: brandParam.couBrandName,
      couBrandId: brandParam.couBrandId,
    })
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 1000)
  },
  clickScroll(e) {
    let value = e.target.dataset.id.firstLetter
    if (value === '全部') {
      value = 'qb'
    } 
    this.setData({
      toView: value
    })
  },
  changeRegion (e) {
    console.log(e)
    const areaId = e.currentTarget.dataset.id.areaId
    this.setData({
      areaId: areaId,
    })
    this.getDataList()
  },
  selectCity (e) {
    console.log(e)
    const areaName = e.currentTarget.dataset.id.areaName
    const cityId = e.currentTarget.dataset.id.areaId
    console.log(areaName)
    this.setData({
      areaName: areaName,
      cityId: cityId
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
          console.log(res.data.data)
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
    const areaName = e.currentTarget.dataset.id.areaName
    const cityId = e.currentTarget.dataset.id.areaId
    console.log(areaName)
    console.log(cityId)
    var pages = getCurrentPages();
    console.log(pages)
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    
    //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      areaName: areaName,
      cityId: cityId,
    })
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 1000)
  }
})