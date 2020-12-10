// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: '地区',
    date: '2020',
    price: '价格',
    infolist: [],
    bannerList: [],
    proAreaName: '',
    cityAreaName: '',
    countyAreaName: '',
    token: '',
    param: '',
    page: 1,
    canChangePage: false,
    couBrandName: '品牌',
    couBrandId: '',
    couModelId: '',
    couModelName: '车辆类型',
    countyAreaId: ''
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
      token: token,
      infolist: [],
      page: 1
    })
    if (this.data.couBrandName !== '品牌') {
      this.setData({
        page: 1
      })
    } 
    if (this.data.couBrandName === '不限') {
      this.setData({
        couBrandName: '品牌',
        couBrandId: ''
      })
    }
    if (this.data.couModelName !== '车辆类型') {
      this.setData({
        page: 1
      })
    } 
    if (this.data.couModelName === '不限') {
      this.setData({
        couModelName: '车辆类型',
        couModelId: ''
      })
    }
    if (this.data.countyAreaName !== '' && this.data.cityAreaName !== '' && this.data.proAreaName !== '') {
      this.setData({
        region: this.data.countyAreaName || this.data.cityAreaName || this.data.proAreaName
      })
    }
    this.getDataList()
    this.getBannerList()
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
      this.getDataList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getBannerList() {
    var mythis = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/conf/banner/storeList',
      header: {
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
      },
      success: function (res) {
        if (res.data && res.data.code == 0) {
          wx.hideLoading()
          mythis.setData({
            bannerList: res.data.data.bannerWaresList
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
  toDetail: function (item) {
    const id = item.currentTarget.dataset.id.dealWaresId
    var token = this.data.token
    if (token) {
      wx.navigateTo({
        url: '../detail/detail?id=' + id + '&type=' + 1
      })
    } else {
      app.showErrorMsg('请登录')
    }
  },
  getDataList1() {
    this.setData({
      page: 1,
      infolist: []
    })
    this.getDataList()
  },
  getDataList() {
    var mythis = this
    const page = mythis.data.page
    const couBrandId = mythis.data.couBrandId || ''
    const dealWaresTitle = mythis.data.dealWaresTitle || ''
    const couModelId = mythis.data.couModelId || ''
    const proAreaName = mythis.data.proAreaName || ''
    const cityAreaName = mythis.data.cityAreaName || ''
    const countyAreaName = mythis.data.countyAreaName || ''
    const countyAreaId = mythis.data.countyAreaId || ''
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/deal/wares/storeList',
      header: {
        'token': mythis.data.token
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
        page: page,
        limit: 10,
        dealWaresTitle: dealWaresTitle,
        couBrandId: couBrandId,
        couModelId: couModelId,
        proAreaName: proAreaName,
        cityAreaName: cityAreaName,
        countyAreaName: countyAreaName,
        countyAreaId: countyAreaId
      },
      success: function (res) {
        wx.hideLoading()
        const result = res.data.data.list
        if (result && result.length) {
          if (res.data.data.currPage < res.data.data.totalPage) {
            const tempList = mythis.data.infolist.concat(res.data.data.list)
            const page = mythis.data.page
            mythis.setData({
              infolist: tempList,
              canChangePage: true,
              page: page + 1
            })
          } else {
            const tempList = mythis.data.infolist.concat(res.data.data.list)
            mythis.setData({
              infolist: tempList,
              canChangePage: false
            })
          }
          if (mythis.data.page === 1 && !res.data.data.list.length) {
            mythis.setData({
              infolist: result,
            })
          }
        }
      },
      fail: function (err) {
        wx.hideLoading()
        console.log(err);
        app.showNetworkError()
      }
    })
  },
  bindRegionChange: function (e) {
    const regions = e.detail.value
    const length = e.detail.value.length
    const region = e.detail.value[length - 1]
    this.setData({
      region: region,
      proAreaName: regions[0],
      cityAreaName: regions[1],
      countyAreaName: regions[2],
    })
    this.getDataList()
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
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
        if (res.data && res.data.code == 0) {
          wx.hideLoading()
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
  getSearch(e) {
    this.setData({
      dealWaresTitle: e.detail.value
    })
  },
  toPersonList() {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  toBrand() {
    wx.navigateTo({
      url: '/pages/brandList/brandList',
    })
  },
  toModel() {
    wx.navigateTo({
      url: '/pages/modelList/modelList',
    })
  },
  bindRegionChange: function (e) {
    const regions = e.detail.value
    const length = e.detail.value.length
    const region = e.detail.value[length - 1]
    this.setData({
      region: region,
      proAreaName: regions[0],
      cityAreaName: regions[1],
      countyAreaName: regions[2],
    })
    this.getDataList()
  },
  toSearchRegion () {
    wx.navigateTo({
      url: '/pages/regionList/regionList',
    })
  }
})