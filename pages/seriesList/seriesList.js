// pages/brandList/brandList.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotList: [],
    list: [
      { couBrandId: 0, couBrandName: '不限' }
    ]
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
      url: app.globalData.apiUrl + '/cou/wares/brand/getHotCouBrandList',
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
      url: app.globalData.apiUrl + '/cou/wares/brand/getCouBrandList',
      header: {
        'token': mythis.data.token
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
      },
      success: function (res) {
        wx.hideLoading()
        if (res.data.code === 0) {
          const tempList = mythis.data.list.concat(res.data.data)
          mythis.setData({
            list: tempList
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
  selectBrand(e) {
    const seriesParam = e.currentTarget.dataset.id
    wx.setStorage({
      key: "seriesParam",
      data: seriesParam,
      success(res) {
        // console.log(res)
      },
      fail(err) {
        console.log(err)
      }
    })
    setTimeout(function () {
      wx.navigateBack()
    }, 1000)
  }
})