//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    datainfo: {},
    datalists:[]
  },
  //事件处理函数
  infoBindViewTap: function(e) {
    var id = e.currentTarget.dataset.id
    getApp().objid = id
    wx.navigateTo({
      url: '../show/info/info'
    })
  },
  storyBindViewTap: function (e) {
    var id = e.currentTarget.dataset.id
    getApp().objid = id
    wx.navigateTo({
      url: '../show/story/story'
    })
  },
  onLoad: function () {
   
    //首页BANNEL
    this.getTopInfo()
  
    //故事
    this.getStoryList()
  },

  getTopInfo: function(){

    var chat = this
    wx.request({
      url: getApp().globalData.api + '?m=weimagetext&a=toptext', 
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        chat.setData({
          datainfo: res.data
        })
      }
    })
  },

  getStoryList:function(){
    var chat = this
    wx.request({
      url: getApp().globalData.api + '?m=weimagetext&a=storylist&pagesize=2', //仅为示例，并非真实的接口地址
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
