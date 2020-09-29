// pages/financeFunction/financeFunction.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token')
    this.setData({
      token: token
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
  toFinance() {
    const token = this.data.token
    if (!token) {
      app.showErrorMsg('请登录')
    } else {
      wx.navigateTo({
        url: '/pages/financeAdd/financeAdd',
      }) 
    }
  },
  toWidthDraw() { // 提现操作
    var mythis = this
    const token = this.data.token
    if (!token) {
      app.showErrorMsg('请登录')
    } else {
      // wx.navigateTo({
      //   url: '/pages/widthDraw/widthDraw',
      // }) 
      wx.showModal({
        title: '提示',
        content: '确定提现',
        success (res) {
          if (res.confirm) {
            mythis.handleWidthDraw()
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
           
    }
  },
  handleWidthDraw() {
    var mythis = this
    wx.showLoading({
      title: '提交中。。。',
    })
    wx.request({
      url: app.globalData.apiUrl + '/deal/user/store/refund/cashOut',
      header: {
        'token': mythis.data.token
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
      },
      success: function (res) {
        if (res.data && res.data.code == 0) {
          wx.hideLoading()
          app.showsuccessMsg('提现成功')
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
  },
  toRecordList() {
    const token = this.data.token
    if (!token) {
      app.showErrorMsg('请登录')
    } else {
      wx.navigateTo({
        url: '/pages/recordList/recordList',
      }) 
    }
  }
})