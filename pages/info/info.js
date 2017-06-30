// info.js
const $vm = getApp()
const utils = $vm.utils

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cacheLists:[],  //缓存数据
    datalists: [],
    lastId:0,
  },

  infoBindViewTap: function (e) {
    var id = e.currentTarget.dataset.id
    getApp().objid = id
    wx.navigateTo({
      url: '../show/info/info'
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.cacheLists = []
    this.getDataLists(0,1)
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
  onPullDownRefresh: function (event) {
    var lastId = event.currentTarget.dataset.id
    this.getDataLists(lastId,0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getDataLists(0,1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  getDataLists: function (lastId,istop){

    var chat = this
    wx.request({
      url: getApp().globalData.api + '?m=weimagetext&a=textlist&pagesize=20&id=' + lastId, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.length == 0){
          return
        }
        var clists = chat.data.cacheLists
        var result = res.data;
        
        var tempLists = []
        var id = 0
        if(istop == 1){
          tempLists = utils.extend(result, clists)
        }else{
          tempLists = utils.extend(clists,result)
          var len = res.data.length - 1
          id = res.data[len]['id']
        }
        
        chat.setData({
          datalists: tempLists,
          lastId: id
        })
      }
    })
  }


})