// pages/personInfo/personInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    token: '',
    dealStoreName: '',
    image: '',
    name: '',
    dealUserJob: '',
    logo: ''
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
      dealStoreName: e.detail.value
    })
  },
  getStaff(e) {
    this.setData({
      dealUserJob: e.detail.value
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
  },
  uploadLogo() {
    var mythis = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFiles = res.tempFiles;
        console.log(tempFiles)
        mythis.setData({
          logo: tempFiles[0].path
        })
        // console.log(mythis.data.picList)
        // 上传图片
        // wx.showLoading({
        //   title: '上传中...',
        // })
        // const uploadTask = wx.uploadFile({
        //   url: app.globalData.apiurl + '/deal/user/store/uploadStore', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'coverurl',
        //   formData: {
        //     validation: app.globalData.validation,//验证
        //     user_id: userInfo.user_id,
        //   },
        //   success: function (res) {
        //     var data = JSON.parse(res.data)
        //     if (data.code == 200) {
        //       mythis.setData({
        //         license: data.data.filePath
        //       })
        //       wx.hideLoading()
        //       app.showsuccessMsg(data.msg);
        //     } else {
        //       wx.showToast({
        //         title: data.msg,
        //         icon: 'none',
        //         duration: 3000
        //       })
        //     }
        //   }
        // })
      }
    })
  },
  applyCompany() {
    const mythis = this
    wx.showLoading({
      title: '提交中...',
    })
    wx.request({
      url: app.globalData.apiUrl + '/deal/user/store/save',
      header: {
        'token': mythis.data.token
      },
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
        dealUserId: mythis.data.userInfo.dealUserId,
        // sysUserId: mythis.data.userInfo.sysUserId,
        sysUserId: 100002,
        dealStoreName: mythis.data.dealStoreName,
        image: mythis.data.image,
        dealUserJob: mythis.data.dealUserJob
      },
      success: function (res) {
        if (res.data && res.data.code === 0) {
          wx.hideLoading()
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