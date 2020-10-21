// pages/mobileLogin/mobileLogin.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    smsCode: '',
    time: 60,
    getCode: '获取验证码',
    showTime: true
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
  getMobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  getSmsCode: function (e) {
    this.setData({
      smsCode: e.detail.value
    })
  },
  getTime: function () {
    var that = this
    that.setData({
      timer: setInterval(function () {
        var time = that.data.time;
        --time;
        that.setData({
          time: time
        })
        if (time == 0) {
          that.setData({
            getCode: '请获取验证码',
            showTime: true,
            time: 60
          })
          clearInterval(that.data.timer);
        }
      }, 1000)
    })
  },

  // // 验证手机号
  // isMobile: function (s) {
  //   return .test(s)
  // },

  // 验证码获取
  getSms: function () {
    var mobile = this.data.mobile
    var re = /^1[3456789]\d{9}$/
    if (!re.test(mobile)) {
      app.showErrorMsg('手机号格式错误')
      return;
    }
    this.getTime()
    this.setData({
      showTime: false
    })
    // wx.request({
    //   url: app.globalData.apiUrl + '/api/home/test/login',
    //   method: 'post',
    //   dataType: 'json',
    //   header: {
    //     'content-type': 'application/json',
    //   },
    //   data: this.data.smsCode,
    //   success: function (res) {
    //     if (res.data && res.data.code === 0) {
    //       // console.log(res)
    //       app.showsuccessMsg('验证码已发送')
    //     }
    //   },
    //   fail: function (err) {
    //     console.log(err);
    //   }
    // })
  },

  // 登录
  login: function () {
    var mobile = this.data.mobile
    var smsCode = this.data.smsCode
    var re = /^1[3456789]\d{9}$/
    if (!re.test(mobile)) {
      app.showErrorMsg('手机号格式错误')
      return;
    }
    if (!smsCode) {
      app.showErrorMsg('验证码错误')
      return;
    }
    wx.request({
      url: app.globalData.apiUrl + '/smsLogin',
      method: 'post',
      dataType: 'json',
      data: {
        phone: mobile,//验证
        smsCode: smsCode,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res)
        //请求成功
        if (res.data && res.data.code === 0) {
          console.log(res.data.data)
          // //存入缓存即可
          wx.setStorage({
            key: "token",
            data: res.data.data,
            success(res) {
              console.log(res)
            },
            fail(err) {
              console.log(err)
            }
          })
          // wx.setStorage({
          //   key: "mobile",
          //   data: res.data.data.mobile,
          //   success(res) {
          //     console.log(res)
          //   },
          //   fail(err) {
          //     console.log(err)
          //   }
          // })
          app.showsuccessMsg('登录成功')
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/perCenter/perCenter'
            })
          }, 1000)
        } else {
          app.showErrorMsg(res.data.msg)
        }
      }
    })
  },
})