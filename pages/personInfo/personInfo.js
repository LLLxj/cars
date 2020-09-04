// pages/personInfo/personInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    token: '',
    name: ''
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
    var userInfo = wx.getStorageSync('userInfo')
    var token = wx.getStorageSync('token')
    this.setData({
      userInfo: userInfo,
      token: token
    })
    console.log(this.data.userInfo)
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
  getName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  updateInfo() {
    var mythis = this
    var name = mythis.data.name
    wx.showLoading({
      title: '提交中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/deal/user/update',
      header: {
        'token': mythis.data.token
      },
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
        dealUserName: name
      },
      success: function (res) {
        if (res.data && res.data.code == 0) {
          wx.hideLoading()
          wx.setStorage({
            key: "isFresh",
            data: true,
            success(res) {
              // console.log(res)
            },
            fail(err) {
              console.log(err)
            }
          })
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