// pages/estPrice/estPrice.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    sexArray: ['男', '女'],
    bandArray: [], // 品牌列表
    seriesList: [], // 系列列表
    couBrandId: '',
    couBrandName: '',
    couWaresId: '',
    couWaresName: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getBrandList()
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
  getBrandList() {
    var mythis = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/cou/wares/brand/getCouBrandList',
      header: {
        'token': mythis.data.token
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {},
      success: function (res) {
        if (res.data && res.data.code === 0) {
          wx.hideLoading()
          mythis.setData({
            bandArray: res.data.data
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
  getDataList() { // 获取品牌列表
    var mythis = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/deal/assess/list',
      header: {
        'token': mythis.data.token
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
        page: 1,
        limit: 10
      },
      success: function (res) {
        if (res.data && res.data.code === 0) {
          wx.hideLoading()
          mythis.setData({
            list: res.data.data.list
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
  getSeries(id) {
    var mythis = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/cou/wares/getCouWaresList/' + id,
      header: {
        'token': mythis.data.token
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
      },
      success: function (res) {
        if (res.data && res.data.code === 0) {
          wx.hideLoading()
          console.log(res.data.data)
          mythis.setData({
            seriesList: res.data.data
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
  brandChange(e) {
    const id = e.detail.value
    const couBrandId = this.data.bandArray[id].couBrandId
    const couBrandName = this.data.bandArray[id].couBrandName
    this.setData({
      couBrandId: couBrandId,
      couBrandName: couBrandName
    })
    this.getSeries(couBrandId)
  },
  seriesChange(e) {
    console.log(e)
    const id = e.detail.value
    const couWaresId = this.data.seriesList[id].couWaresId
    const couWaresName = this.data.seriesList[id].couWaresName
    this.setData({
      couWaresId: couWaresId,
      couWaresName: couWaresName
    })
  },
  getSeriesVal(e) {
    if (!this.data.couBrandId) {
      app.showErrorMsg('请选择品牌');
      return
    }
  }
})