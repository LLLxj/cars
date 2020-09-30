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
    token: '',
    bannerList: [],
    userInfo: {},
    couBrandName: '品牌',
    couBrandId: '',
    series: '车系',
    page: 1,
    canChangePage: false,
    brandParam: {},
    model: '型号',
    modelParam: {},
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
    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      token: token,
      userInfo: userInfo,
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
  toDetail: function (item) {
    const id = item.currentTarget.dataset.id.dealWaresId
    var token = this.data.token
    if (token) {
      wx.navigateTo({
        url: '../detail/detail?id=' + id + '&type=' + 0
      })
    } else {
      app.showErrorMsg('请登录')
    }
  },
  getDataList() {
    console.log('请求接口')
    var mythis = this
    const couBrandId = mythis.data.couBrandId || ''
    const dealWaresTitle = mythis.data.dealWaresTitle || ''
    const couModelId = mythis.data.couModelId || ''
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/deal/wares/retailList',
      header: {
        // 'token': mythis.data.token
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
        page: mythis.data.page,
        limit: 10,
        dealWaresTitle: dealWaresTitle,
        couBrandId: couBrandId,
        couModelId: couModelId
      },
      success: function (res) {
        if (res.data && res.data.code === 0) {
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
              const page = mythis.data.page
              mythis.setData({
                infolist: tempList,
                canChangePage: false
              })
            }
          }
          
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
  getBannerList() {
    var mythis = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.apiUrl + '/conf/banner/list',
      header: {
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
      },
      success: function (res) {
        if (res.data && res.data.code == 0) {
          wx.hideLoading()
          mythis.setData({
            bannerList: res.data.data[1].bannerWaresList
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
  toCompanyList() {
    const userInfo = this.data.userInfo
    const token = this.data.token
    if (!token) {
      app.showErrorMsg('请登录')
      return
    }
    if (userInfo.type === 0) {
      app.showErrorMsg('请验证身份')
      return
    }
    wx.navigateTo({
      url: '/pages/companyList/companyList',
    })
  },
  getFocus() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  getSearch(e) {
    this.setData({
      dealWaresTitle: e.detail.value
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