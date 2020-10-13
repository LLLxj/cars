// pages/product/product.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: '',
    height: '',
    list: []
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
    this.getList()
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
  getList() {
    var mythis = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/deal/wares/personalList',
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
  addProduct() {
    wx.navigateTo({
      url: '/pages/addProduct/addProduct',
    })
  },
  getDetail(e) {
    const dealWaresId = e.currentTarget.dataset.id.dealWaresId
    const token = this.data.token
    if (!token) {
      app.showErrorMsg('请登录')
    } else {
      wx.navigateTo({
        url: '/pages/addProduct/addProduct?dealWaresId=' + dealWaresId,
      })
    }
  }
})