// pages/installment/installment.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contactPhone: '',
    contactName: '',
    sex: '',
    sexLabel: '',
    dealWaresId: '',
    userInfo: {},
    token: '',
    sexArray: [
      { label: '先生', val: 0 },
      { label: '女士', val: 1 }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      dealWaresId: options.dealWaresId
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
    var userInfo = wx.getStorageSync('userInfo')
    var token = wx.getStorageSync('token')
    this.setData({
      userInfo: userInfo,
      token: token
    })
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
      contactName: e.detail.value
    })
  },
  getMobile(e) {
    this.setData({
      contactPhone: e.detail.value
    })
  },
  sexChange(e) {
    const id = e.detail.value
    const sex = this.data.sexArray[id].val
    const sexLabel = this.data.sexArray[id].label
    this.setData({
      sex: sex,
      sexLabel: sexLabel
    })
  },
  sumbit() {
    const mythis = this
    const contactName = mythis.data.contactName
    // const contactPhone = mythis.data.contactPhone
    // const sex = mythis.data.sex
    const dealUserId = mythis.data.userInfo.dealUserId
    const dealWaresId = mythis.data.dealWaresId
    if (!contactName) {
      wx.showToast({
        title: '请填写联系人',
        icon: 'none',
        duration: 2000
      })
      return 
    }
    // if (!contactPhone) {
    //   wx.showToast({
    //     title: '请填写联系人电话',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return 
    // }
    // if (!sex) {
    //   wx.showToast({
    //     title: '请选择性别',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return 
    // }
    wx.showLoading({
      title: '提交中。。。',
    })
    wx.request({
      url: app.globalData.apiUrl + '/deal/wares/installment/save',
      header: {
        'token': mythis.data.token
      },
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
        contactName: contactName,
        // contactPhone: contactPhone,
        // sex: sex,
        dealUserId: dealUserId,
        dealWaresId: dealWaresId,
      },
      success: function (res) {
        if (res.data && res.data.code == 0) {
          wx.hideLoading()
          app.showsuccessMsg('提交成功')
          wx.navigateBack({})
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