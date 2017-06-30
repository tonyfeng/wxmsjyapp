// story.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalists: []
  },

  storyBindViewTap: function (e) {
    var id = e.currentTarget.dataset.id
    getApp().objid = id
    wx.navigateTo({
      url: '../show/story/story'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStoryList()
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

  getStoryList: function () {
    var chat = this
    wx.request({
      url: getApp().globalData.api + '?m=weimagetext&a=storylist&pagesize=20', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        chat.setData({
          datalists: res.data
        })
      }
    })
  }

})