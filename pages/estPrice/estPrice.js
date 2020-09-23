// pages/estPrice/estPrice.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    sexArray: ['男', '女'],
    bandArray: [], // 品牌列表
    seriesList: [], // 系列列表
    couBrandId: '',
    couBrandName: '',
    couSeriesId: '',
    couSeriesName: '',
    cityList: [],
    areaName: '',
    proAreaId: 19,
    cityAreaId: '',
    countyAreaId: '',
    areaId: '',
    countyList: [],
    distance: '',
    driveImage: 'https://pic1.58cdn.com.cn/p1/small/n_v2ada48ee087d94068954564042814126d.jpg',
    waresImages: [],
    couWaresId: '',
    registerTime: '',
    license: 'https://pic1.58cdn.com.cn/p1/small/n_v2ada48ee087d94068954564042814126d.jpg',
    assessImgList: [
      { image: 'https://pic1.58cdn.com.cn/p1/small/n_v2ada48ee087d94068954564042814126d.jpg', index: 1 }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      couWaresId: options.couWaresId
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
    this.getBrandList()
    this.getCityList()
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
  getBrandList() {
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
      data: {},
      success: function (res) {
        if (res.data && res.data.code === 0) {
          wx.hideLoading()
          mythis.setData({
            bandArray: res.data.data
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
  getDataList() { // 获取品牌列表
    var mythis = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/deal/assess/list',
      header: {
        'token': mythis.data.token
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
        page: 1,
        limit: 10
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
  getSeries(id) {
    var mythis = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/cou/wares/getCouWaresList/' + id,
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
            seriesList: res.data.data
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
  brandChange(e) {
    const id = e.detail.value
    const couBrandId = this.data.bandArray[id].couBrandId
    const couBrandName = this.data.bandArray[id].couBrandName
    this.setData({
      couBrandId: couBrandId,
      couBrandName: couBrandName
    })
    this.getSeries(couBrandId)
  },
  seriesChange(e) {
    const id = e.detail.value
    const couSeriesId = this.data.seriesList[id].couWaresId
    const couSeriesName = this.data.seriesList[id].couWaresName
    this.setData({
      couSeriesId: couSeriesId,
      couSeriesName: couSeriesName
    })
  },
  getSeriesVal(e) {
    if (!this.data.couBrandId) {
      app.showErrorMsg('请选择品牌');
      return
    }
  },
  getCityList(id) {
    var mythis = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/cust/area/city/19',
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
            cityList: res.data.data
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
  cityChange(e) {
    const id = e.detail.value
    const areaId = this.data.cityList[id].areaId
    const areaName = this.data.cityList[id].areaName
    this.setData({
      cityAreaId: areaId,
      areaName: areaName
    })
    this.getCounty(areaId)
  },
  getCounty(id) {
    var mythis = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/cust/area/county/' + id,
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
            countyList: res.data.data
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
  getCountyVal(e) {
    if (!this.data.areaId) {
      app.showErrorMsg('请选择市');
      return
    }
  },
  countyChange(e) {
    const id = e.detail.value
    const countyId = this.data.countyList[id].areaId
    const countyName = this.data.countyList[id].areaName
    this.setData({
      countyAreaId: countyId,
      countyName: countyName
    })
  },
  distanceChange(e) {
    const distance = e.detail.value
    this.setData({
      distance: distance
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
        // mythis.setData({
        //   logo: tempFiles[0].path
        // })
        // // 上传图片
        wx.showLoading({
          title: '上传中...',
        })
        const uploadTask = wx.uploadFile({
          url: app.globalData.apiUrl + '/deal/assess/upload/drivingImage', //仅为示例，非真实的接口地址
          filePath: tempFiles[0].path,
          name: 'file',
          header: {
            'token': mythis.data.token
          },
          formData: {
          },
          success: function (res) {
            var data = JSON.parse(res.data)
            if (data.code == 0) {
              console.log(data)
              mythis.setData({
                license: data.data.url
              })
              wx.hideLoading()
              app.showsuccessMsg('上传成功');
            } else {
              wx.showToast({
                title: data.msg,
                icon: 'none',
                duration: 3000
              })
            }
          }
        })
      }
    })
  },
  uploadAccessImg() {
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
        console.log(mythis.data.picList)
        // // 上传图片
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
  bindDateChange(e) {
    console.log(e)
    this.setData({
      registerTime: e.detail.value
    })
  },
  submit() {
    const mythis = this
    const couBrandId = mythis.data.couBrandId
    const couSeriesId = mythis.data.couSeriesId
    const couWaresId = mythis.data.couWaresId
    const distance = mythis.data.distance
    const proAreaId = mythis.data.proAreaId
    const cityAreaId = mythis.data.cityAreaId
    const countyAreaId = mythis.data.countyAreaId
    const driveImage = mythis.data.driveImage
    const registerTime = mythis.data.registerTime
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/deal/assess/save',
      header: {
        'token': mythis.data.token
      },
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
        couBrandId: couBrandId,
        couSeriesId: couSeriesId,
        couWaresId: couWaresId,
        registerTime: registerTime,
        proAreaId: proAreaId,
        cityAreaId: cityAreaId,
        countyAreaId: countyAreaId,
        distance: distance,
        driveImage: {
          image: driveImage
        },
        waresImages: mythis.data.assessImgList
      },
      success: function (res) {
        if (res.data && res.data.code === 0) {
          wx.hideLoading()
          console.log(res)
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
  deleteAssessImg(e) {
    console.log(e)
    const index = e.currentTarget.dataset.id.index
    var assessImgList = this.data.assessImgList.filter(item => item.index !== index)
    console.log(assessImgList)
  },
  deleteLicense() {
    this.setData({
      license: ''
    })
  }
})