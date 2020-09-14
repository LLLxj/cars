// pages/comManage/comManage.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList: [
      { 'id': 1, 'name': '第一章' },
      { 'id': 2, 'name': '第二章' },
      { 'id': 3, 'name': '第三章' },
      { 'id': 4, 'name': '第四章' },
      { 'id': 5, 'name': '第五章' },
      { 'id': 6, 'name': '第一章' },
      { 'id': 7, 'name': '第二章' },
      { 'id': 8, 'name': '第三章' },
      { 'id': 9, 'name': '第四章' },
      { 'id': 10, 'name': '第五章' },
      { 'id': 11, 'name': '第一章' },
      { 'id': 12, 'name': '第二章' },
      { 'id': 13, 'name': '第三章' },
      { 'id': 14, 'name': '第四章' },
      { 'id': 15, 'name': '第五章' },
    ],
    cId: '',
    width: '',
    height: '',
    list: [],
    token: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      width: wx.getSystemInfoSync().windowWidth,
      height: wx.getSystemInfoSync().windowHeight - 70
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
    this.getRecordList()
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
  getRecordList() {
    var mythis = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/deal/user/store/recordList',
      header: {
        'token': mythis.data.token
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
      },
      success: function (res) {
        if (res.data && res.data.code === 0) {
          wx.hideLoading()
          console.log(res.data.data.list)
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
  applyCompany() {
    wx.navigateTo({
      url: '/pages/applyCompany/applyCompany',
    })
  }
})