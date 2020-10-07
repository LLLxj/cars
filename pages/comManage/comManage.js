// pages/comManage/comManage.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList: [],
    cId: '',
    width: '',
    height: '',
    list: [],
    token: '',
    page: 1,
    canChangePage: false
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
    const canChangePage = this.data.canChangePage
    if (canChangePage) {
      this.getRecordList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getRecordList() {
    var mythis = this
    const page = mythis.data.page
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
        page: page,
        limit: 10
      },
      success: function (res) {
        if (res.data && res.data.code === 0) {
          wx.hideLoading()
          if (res.data.data.currPage < res.data.data.totalPage) {
            const tempList = mythis.data.list.concat(res.data.data.list)
            const page = mythis.data.page
            mythis.setData({
              list: tempList,
              canChangePage: true,
              page: page + 1
            })
          } else {
            const tempList = mythis.data.list.concat(res.data.data.list)
            mythis.setData({
              list: tempList,
              canChangePage: false
            })
          }
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