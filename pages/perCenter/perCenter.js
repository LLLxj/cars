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
    this.getUserInfo()
    // if (isFresh) {
    //   this.getUserInfo()
    // }
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
    var mythis = this
    wx.showLoading({
      title: '登录中',
    })
    // console.log(scene)
    wx.login({
      success: res => {
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
              mythis.setData({
                token: res.data.data
              })
              mythis.getUserInfo()
              // //缓存分享参数
              // wx.setStorageSync('share', res.data.data.share);

              // //存入缓存即可
              wx.setStorage({
                key: "token",
                data: res.data.data,
                success(res) {
                  // console.log(res)
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
  getUserInfo() {
    var mythis = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/deal/user/info',
      header: {
        'token': mythis.data.token
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
      },
      success: function (res) {
        if (res.data && res.data.code === 0) {
          wx.hideLoading()
          console.log(res.data.data)
          mythis.setData({
            userInfo: res.data.data,
            userName: res.data.data.dealUserName
          })
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
          wx.hideLoading()
          wx.setStorage({
            key: "token",
            data: '',
            success(res) {
              // console.log(res)
            },
            fail(err) {
              console.log(err)
            }
          })
          wx.clearStorage({
            success: (res) => {
              console.log(res)
            },
          })
          app.showErrorMsg(res.data.message);
        }
      },
      fail: function (err) {
        wx.hideLoading()
        console.log(err);
        app.showNetworkError()
      }
    })
  },
  toComAuth() {
    const token = this.data.token
    if (!token) {
      app.showErrorMsg('请登录')
    } else {
      wx.navigateTo({
        url: '/pages/comAuth/comAuth',
      })
    }
  },
  toPersonInfo() {
    const token = this.data.token
    if (!token) {
      app.showErrorMsg('请登录')
    } else {
      wx.navigateTo({
        url: '/pages/personInfo/personInfo',
      })
    }
  },
  toComManage() { // 企业管理模块
    const token = this.data.token
    if (!token) {
      app.showErrorMsg('请登录')
    } else {
      wx.navigateTo({
        url: '/pages/companyFun/companyFun',
      })
    }
  },
  toEstPrice() {
    const token = this.data.token
    if (!token) {
      app.showErrorMsg('请登录')
    } else {
      wx.navigateTo({
        url: '/pages/estPrice/estPrice',
      })
    }
  },
  toPreAssess() {
    const token = this.data.token
    if (!token) {
      app.showErrorMsg('请登录')
    } else {
      wx.navigateTo({
        url: '/pages/preAccess/preAccess',
      })
    }
  },
  toSellProduct() { // 评估商品出售
    const token = this.data.token
    if (!token) {
      app.showErrorMsg('请登录')
    } else {
      wx.navigateTo({
        url: '/pages/sellEstProduct/sellEstProduct',
      })
    }
  },
  toInstalMent() { // 分期
    const token = this.data.token
    if (!token) {
      app.showErrorMsg('请登录')
    } else {
      wx.navigateTo({
        url: '/pages/installmentList/installmentList',
      }) 
    }
  },
  toProduct() {
    const token = this.data.token
    if (!token) {
      app.showErrorMsg('请登录')
    } else {
      wx.navigateTo({
        url: '/pages/productFun/productFun',
      })
    }
  },
  toPrePart() {
    const token = this.data.token
    if (!token) {
      app.showErrorMsg('请登录')
    } else {
      wx.navigateTo({
        url: '/pages/preFuntion/preFuntion',
      }) 
    }
  },
  toFinancePart() {
    const token = this.data.token
    if (!token) {
      app.showErrorMsg('请登录')
    } else {
      wx.navigateTo({
        url: '/pages/financeFunction/financeFunction',
      }) 
    }
  }
})