// pages/preAccessInfo/preAccessInfo.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dealAssessId: '',
    token: '',
    productInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.getDataInfo()
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
  getDataInfo() {
    var mythis = this
    var dealAssessId = mythis.data.dealAssessId
    wx.showLoading({
      title: '查询中。。。',
    })
    wx.request({
      url: app.globalData.apiUrl + '/deal/assess/info/' + dealAssessId,
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
            productInfo: res.data.data
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
  }
})