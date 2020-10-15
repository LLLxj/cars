// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: '广州',
    date: '2020',
    price: '价格',
    infolist: [],
    bannerList: [],
    token: '',
    param: '',
    page: 1,
    canChangePage: false,
    couBrandName: '品牌',
    couBrandId: '',
    couModelId: '',
    couModelName: '型号'
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
    if (this.data.couModelName !== '型号') {
      this.setData({
        page: 1
      })
    } 
    if (this.data.couModelName === '不限') {
      this.setData({
        couModelName: '型号',
        couModelId: ''
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
  getDataList(param) {
    var mythis = this
    const page = mythis.data.page
    const couBrandId = mythis.data.couBrandId || ''
    const dealWaresTitle = mythis.data.dealWaresTitle || ''
    const couModelId = mythis.data.couModelId || ''
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
        couModelId: couModelId
      },
      success: function (res) {
        wx.hideLoading()
        if (mythis.data.page === 1) {
          mythis.setData({
            infolist: []
          })
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
    this.setData({
      region: e.detail.value[0]
    })
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
      param: e.detail.value
    })
    // const param = e.detail.value
    // this.getDataList(param)
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
  }
})