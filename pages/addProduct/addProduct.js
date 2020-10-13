// pages/estPrice/estPrice.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    token: '',
    userInfo: {},
    releaseAreaId: '',
    id: '',
    sexArray: [
      { label: '先生', val: 0 },
      { label: '女士', val: 1 }
    ],
    transferArray: [
      { label: '无', val: 0 },
      { label: '是', val: 1 }
    ],
    mortgageArray: [
      { label: '无', val: 0 },
      { label: '是', val: 1 }
    ],
    maintainArray: [
      { label: '无', val: 0 },
      { label: '是', val: 1 }
    ],
    bandArray: [], // 品牌列表
    seriesList: [], // 系列列表
    couBrandId: '',
    couBrandName: '',
    contactName: '',
    contactPhone: '',
    sex: '',
    sexLabel: '',
    couSeriesId: '',
    couSeriesName: '',
    couModelId: '',
    couModelName: '',
    cityList: [],
    areaName: '',
    proAreaId: 19,
    cityAreaId: '',
    countyAreaId: '',
    areaId: '',
    countyList: [],
    distance: '',
    driveImage: '',
    coverImage: '',
    waresImages: [],
    couWaresId: '',
    registerTime: '',
    license: '',
    assessImgList: [
      // { image: '', index: 1 }
    ],
    moduleList: [],
    dealWaresTitle: '',
    waresFrameCode: '',
    tradePrice: '', // 批发价
    retailPrice: '',  // 零售价
    licenseId: '',
    addr: '',
    waresRemark: '',
    isTransfer: '',
    isMortgage: '',
    isMaintain: '',
    isTransferLabel: '',
    isMortgageLabel: '',
    isMaintainLabel: '',
    marketYear: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token')
    this.setData({
      token: token
    })
    if (options.dealWaresId) {
      wx.setNavigationBarTitle({
        title: '编辑'
      })
      this.setData({
        id: options.dealWaresId
      })
      this.getInfo(options.dealWaresId)
    }
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
    this.setData({
      token: token,
      userInfo: userInfo
    })
    this.getBrandList()
    this.getCityList()
    this.getModuleList()
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
  getInfo(id) {
    var mythis = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/deal/wares/personal/' + id,
      header: {
        'token': mythis.data.token
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {},
      success: function (res) {
        if (res.data && res.data.code === 0) {
          wx.hideLoading()
          const result = res.data.data
          mythis.setData({
            detail: result,
            couBrandId: result.couBrandId,
            couBrandName: result.couBrandName,
            couSeriesId: result.couSeriesId,
            couSeriesName: result.couSeriesName,
            couWaresId: result.couWaresId,
            registerTime: result.registerTime,
            proAreaId: result.proAreaId,
            areaName: result.cityAreaName,
            countyName: result.countyAreaName,
            cityAreaId: result.cityAreaId,
            countyAreaId: result.countyAreaId,
            distance: result.distance,
            dealWaresTitle: result.dealWaresTitle,
            releaseAreaId: result.releaseAreaId,
            contactPhone: result.contactPhone,
            contactName: result.contactName,
            sex: result.sex,
            sexLabel: result.sexLable,
            waresFrameCode: result.waresFrameCode,
            tradePrice: result.tradePrice,
            retailPrice: result.retailPrice,
            licenseId: result.licenseCode,
            addr: result.addr,
            waresRemark: result.waresRemark,
            transferNum: result.transferNum,
            isTransfer: result.isTransfer,
            isTransferLabel: result.isTransferLable,
            isMortgage: result.isMortgage,
            isMortgageLabel: result.isMortgageLable,
            isMaintain: result.isMaintain,
            isMaintainLabel: result.isMaintainLable,
            marketYear: result.marketYear,
            couModelId: result.couModelId,
            couModelName: result.couModelName,
            coverImage: result.coverImage.image,
            driveImage: result.driveImage.image,
            assessImgList: result.waresImages,
            dealStoreId: result.dealStoreId
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
  getModuleList() { // 获取所有型号
    var mythis = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/cou/wares/model/getCouModelList',
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
            moduleList: res.data.data
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
  modelChange(e) {
    const id = e.detail.value
    const couModelId = this.data.moduleList[id].couModelId
    const couModelName = this.data.moduleList[id].couModelName
    this.setData({
      couModelId: couModelId,
      couModelName: couModelName
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
  titleChange(e) {
    const dealWaresTitle = e.detail.value
    this.setData({
      dealWaresTitle: dealWaresTitle
    })
  },
  frameChange(e) {
    const waresFrameCode = e.detail.value
    this.setData({
      waresFrameCode: waresFrameCode
    })
  },
  uploadLogo() {
    var mythis = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFiles = res.tempFiles;
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
              mythis.setData({
                driveImage: data.data.url
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
  uploadCover() {
    var mythis = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFiles = res.tempFiles;
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
              mythis.setData({
                coverImage: data.data.url
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
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFiles = res.tempFiles;
        // 上传图片
        wx.showLoading({
          title: '上传中...',
        })
        const uploadTask = wx.uploadFile({
          url: app.globalData.apiUrl + '/deal/wares/upload/waresImage', //仅为示例，非真实的接口地址
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
              var tempList = mythis.data.assessImgList
              var index = tempList.length
              var obj = {
                image: data.data.url,
                index: index + 1
              }
              tempList.push(obj)
              mythis.setData({
                assessImgList: tempList
              })
              wx.hideLoading()
              app.showsuccessMsg(data.msg);
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
  bindDateChange(e) {
    this.setData({
      registerTime: e.detail.value
    })
  },
  getAddr(e) {
    this.setData({
      addr: e.detail.value
    })
  },
  submit() {
    const mythis = this
    const dealStoreId = mythis.data.userInfo.dealStoreId
    const couBrandId = mythis.data.couBrandId
    const couSeriesId = mythis.data.couSeriesId
    const couWaresId = mythis.data.couWaresId
    const couModelId = mythis.data.couModelId
    const distance = mythis.data.distance
    const proAreaId = mythis.data.proAreaId
    const cityAreaId = mythis.data.cityAreaId
    const countyAreaId = mythis.data.countyAreaId
    const driveImage = mythis.data.driveImage
    const registerTime = mythis.data.registerTime
    const dealWaresTitle = mythis.data.dealWaresTitle
    const releaseAreaId = mythis.data.cityAreaId
    const waresFrameCode = mythis.data.waresFrameCode
    const contactPhone = mythis.data.contactPhone
    const contactName = mythis.data.contactName
    const sex = mythis.data.sex
    const tradePrice = mythis.data.tradePrice
    const retailPrice = mythis.data.retailPrice
    const licenseId = mythis.data.licenseId
    const addr = mythis.data.addr
    const waresRemark = mythis.data.waresRemark
    const transferNum = mythis.data.transferNum
    const isTransfer = mythis.data.isTransfer
    const isMortgage = mythis.data.isMortgage
    const isMaintain = mythis.data.isMaintain
    const coverImage = mythis.data.coverImage
    const marketYear = mythis.data.marketYear
    wx.showLoading({
      title: '加载中',
    })
    if (mythis.data.id) {
      wx.request({
        url: app.globalData.apiUrl + '/deal/wares/update',
        header: {
          'token': mythis.data.token
        },
        method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        data: {
          dealWaresId: mythis.data.id,
          couBrandId: couBrandId,
          couSeriesId: couSeriesId,
          couWaresId: couWaresId,
          registerTime: registerTime,
          proAreaId: proAreaId,
          cityAreaId: cityAreaId,
          countyAreaId: countyAreaId,
          distance: distance,
          dealWaresTitle: dealWaresTitle,
          releaseAreaId: releaseAreaId,
          contactPhone: contactPhone,
          contactName: contactName,
          sex: sex,
          waresFrameCode: waresFrameCode,
          tradePrice: tradePrice,
          retailPrice: retailPrice,
          licenseCode: licenseId,
          addr: addr,
          waresRemark: waresRemark,
          transferNum: transferNum,
          isTransfer: isTransfer,
          isMortgage: isMortgage,
          isMaintain: isMaintain,
          marketYear: marketYear,
          couModelId: couModelId,
          coverImage: {
            image: coverImage
          },
          driveImage: {
            image: driveImage
          },
          waresImages: mythis.data.assessImgList,
          dealStoreId: dealStoreId
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
    } else {
      wx.request({
        url: app.globalData.apiUrl + '/deal/wares/save',
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
          dealWaresTitle: dealWaresTitle,
          releaseAreaId: releaseAreaId,
          contactPhone: contactPhone,
          contactName: contactName,
          sex: sex,
          waresFrameCode: waresFrameCode,
          tradePrice: tradePrice,
          retailPrice: retailPrice,
          licenseCode: licenseId,
          addr: addr,
          waresRemark: waresRemark,
          transferNum: transferNum,
          isTransfer: isTransfer,
          isMortgage: isMortgage,
          isMaintain: isMaintain,
          marketYear: marketYear,
          couModelId: couModelId,
          coverImage: {
            image: coverImage
          },
          driveImage: {
            image: driveImage
          },
          waresImages: mythis.data.assessImgList,
          dealStoreId: dealStoreId
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
  },
  deleteAssessImg(e) {
    const index = e.currentTarget.dataset.id.index
    var assessImgList = this.data.assessImgList.filter(item => item.index !== index)
  },
  deleteLicense() {
    this.setData({
      license: ''
    })
  },
  deleteCover() {
    this.setData({
      coverImage: ''
    })
  },
  getName(e) {
    this.setData({
      contactName: e.detail.value
    })
  },
  tradePriceChange(e) {
    this.setData({
      tradePrice: e.detail.value
    })
  },
  licenseIdChange(e) {
    this.setData({
      licenseId: e.detail.value
    })
  },
  getMobile(e) {
    this.setData({
      contactPhone: e.detail.value
    })
  },
  retailPriceChange(e) {
    this.setData({
      retailPrice: e.detail.value
    })
  },
  getDesc(e) {
    this.setData({
      waresRemark: e.detail.value
    })
  },
  getTransNum(e) {
    this.setData({
      transferNum: e.detail.value
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
  transferChange(e) {
    const id = e.detail.value
    const isTransfer = this.data.transferArray[id].val
    const isTransferLabel = this.data.transferArray[id].label
    this.setData({
      isTransfer: isTransfer,
      isTransferLabel: isTransferLabel
    })
  },
  mortgageChange(e) {
    const id = e.detail.value
    const isMortgage = this.data.mortgageArray[id].val
    const isMortgageLabel = this.data.mortgageArray[id].label
    this.setData({
      isMortgage: isMortgage,
      isMortgageLabel: isMortgageLabel
    })
  },
  maintainChange(e) {
    const id = e.detail.value
    const isMaintain = this.data.maintainArray[id].val
    const isMaintainLabel = this.data.maintainArray[id].label
    this.setData({
      isMaintain: isMaintain,
      isMaintainLabel: isMaintainLabel
    })
  },
  marketYearChange(e) {
    this.setData({
      marketYear: e.detail.value
    })
  },
  sellhanlde() {
    var mythis = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/deal/wares/sale/' + mythis.data.id,
      header: {
        'token': mythis.data.token
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {},
      success: function (res) {
        if (res.data && res.data.code === 0) {
          wx.hideLoading()
          wx.navigateBack()
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
  toModelList() {
    wx.navigateTo({
      url: '/pages/modelList/modelList',
    })
  },
  toBrandList() {
    wx.navigateTo({
      url: '/pages/brandList/brandList',
    })
  },
  toSeriesList() {
    if (!this.data.couBrandId) {
      app.showErrorMsg('请选择品牌');
      return
    }
    const couBrandId = this.data.couBrandId
    wx.navigateTo({
      url: '/pages/seriesList/seriesList?couBrandId=' + couBrandId,
    })
  },
  onLineHandle () {
    var mythis = this
    wx.showLoading({
      title: '提交中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/deal/wares/onLine/' + mythis.data.id,
      header: {
        'token': mythis.data.token
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {},
      success: function (res) {
        if (res.data && res.data.code === 0) {
          wx.hideLoading()
          app.showsuccessMsg('操作成功')
          setTimeout(function () {
            wx.navigateBack()
          }, 1000)
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
  unLineHandle () {
    var mythis = this
    wx.showLoading({
      title: '提交中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/deal/wares/unLine/' + mythis.data.id,
      header: {
        'token': mythis.data.token
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {},
      success: function (res) {
        if (res.data && res.data.code === 0) {
          wx.hideLoading()
          app.showsuccessMsg('操作成功')
          setTimeout(function () {
            wx.navigateBack()
          }, 1000)
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
  saleHandle () {
    var mythis = this
    wx.showLoading({
      title: '提交中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/deal/wares/sale/' + mythis.data.id,
      header: {
        'token': mythis.data.token
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {},
      success: function (res) {
        if (res.data && res.data.code === 0) {
          wx.hideLoading()
          app.showsuccessMsg('操作成功')
          setTimeout(function () {
            wx.navigateBack()
          }, 1000)
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