// pages/perCenter/perCenter.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: '',
    userName: '马上登录',
    width: '',
    height: '',
    token: '',
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token')
    this.setData({
      width: wx.getSystemInfoSync().windowWidth,
      height: wx.getSystemInfoSync().windowHeight,
      token: token
    })
    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.record']) {
    //       wx.authorize({
    //         scope: 'scope.record',
    //         success() {
    //           // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //           wx.startRecord()
    //         }
    //       })
    //     }
    //   }
    // })

    // wx.getSetting({
    //   success(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console.log(res.userInfo)
    //         }
    //       })
    //     }
    //   }
    // })
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
    var userInfo = wx.getStorageSync('userInfo')
    var isFresh = wx.getStorageSync('isFresh')
    this.setData({
      token: token,
      userInfo: userInfo
    })
    if (isFresh) {
      this.getUserInfo()
    }
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

  // 获取用户手机号
  getPhoneNumber: function (e) {
    console.log(e)
    var mythis = this
    wx.showLoading({
      title: '登录中',
    })
    // console.log(scene)
    wx.login({
      success: res => {
        console.log(res)
        wx.request({
          url: app.globalData.apiUrl + '/wxLogin',
          header: {
          },
          method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            'encryptedData': e.detail.encryptedData,
            'iv': e.detail.iv,
            'code': res.code,
          },
          success: function (res) {
            if (res.data && res.data.code == 0) {
              wx.hideLoading()
              console.log(res.data)
              // mythis.setData({
              //   token: res.data.data.token
              // })
              // //缓存分享参数
              // wx.setStorageSync('share', res.data.data.share);

              // //存入缓存即可
              wx.setStorage({
                key: "token",
                data: res.data.data.token,
                success(res) {
                  console.log(res)
                },
                fail(err) {
                  console.log(err)
                }
              })

              // wx.navigateTo({
              //   url: '../bodyDate/bodyDate'
              // })

            } else {
              wx.hideLoading()
              app.showErrorMsg('登录失败')
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
  },
  toComAuth() {
    wx.navigateTo({
      url: '/pages/comAuth/comAuth',
    })
  },
  toPersonInfo() {
    wx.navigateTo({
      url: '/pages/personInfo/personInfo',
    })
  },
  toEstPrice() {
    wx.navigateTo({
      url: '/pages/estPrice/estPrice',
    })
  },
  getUserInfo() {
    var mythis = this
    wx.request({
      url: app.globalData.apiUrl + '/deal/user/info',
      header: {
        'token': mythis.data.token
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
      },
      success: function (res) {
        if (res.data && res.data.code == 0) {
          wx.setStorage({
            key: "userInfo",
            data: res.data.data,
            success(res) {
              // console.log(res)
            },
            fail(err) {
              console.log(err)
            }
          })
        } else {
          app.showErrorMsg(res.data.msg);
        }
      },
      fail: function (err) {
        console.log(err);
        app.showNetworkError()
      }
    })
  }
})