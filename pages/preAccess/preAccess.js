// pages/preAccess/preAccess.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    list: [],
    width: '',
    height: '',
    dealAssessId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      width: wx.getSystemInfoSync().windowWidth,
      height: wx.getSystemInfoSync().windowHeight
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
    this.getDataList()
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
  getDataList() {
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
          app.showErrorMsg(res.data.message);
        }
      },
      fail: function (err) {
        wx.hideLoading()
        console.log(err);
        app.showNetworkError()
      }
    })
  },
  getDetail(e) {
    const dealAssessId = e.currentTarget.dataset.id.dealAssessId
    wx.navigateTo({
      url: '/pages/preAccessInfo/preAccessInfo?dealAssessId=' + dealAssessId,
    })
  },
  getItem(item) {
    const dealAssessId = item.currentTarget.dataset.id.dealAssessId
    item.status === 1 && item.sellStatus === 0
    const status = item.currentTarget.dataset.id.status
    const sellStatus = item.currentTarget.dataset.id.sellStatus
    if (status === 2 && item.sellStatus === 0) {
      wx.navigateTo({
        url: '/pages/addSell/addSell?dealAssessId=' + dealAssessId,
      })
    } else {
      app.showErrorMsg('不可出售')
    }
  }
})