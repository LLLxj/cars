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
  toWidthDraw() {
    const token = this.data.token
    if (!token) {
      app.showErrorMsg('请登录')
    } else {
      wx.navigateTo({
        url: '/pages/widthDraw/widthDraw',
      }) 
    }
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