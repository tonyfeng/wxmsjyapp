// story.js
const WxParse = require('../../../utils/wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isplay:0,
    animation: '',
    settimeobj:'',
    title:'',
    pic:'',
    audiosrc:'',
    playico: "/images/play.png",
    stopico: "/images/stop.png",
    ctrimg: "/images/play.png"
  },

  storyBindViewTap: function () {
    var id = e.currentTarget.dataset.id
    getApp().objid = id
    wx.navigateTo({
      url: '../show/story/story'
    })
  },

  //旋转动画
  playfun: function () {
    var animationobj = wx.createAnimation({
      duration: 1400,
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: '50% 50% 0',
    })
    
    var i = 0
    this.settimeobj = setInterval(function () {
      animationobj.rotate(180 * (++i)).step()
      this.setData({
        animation: animationobj.export()
      })
    }.bind(this), 750)
  },

  //停止旋转
  stopfun:function(){
    var animationobj = wx.createAnimation({
      duration: 1000,
      timingFunction: 'step-start',
      delay: 0,
      transformOrigin: '50% 50% 0',
    })
    animationobj.rotate(0).step()
    this.setData({
      animation: animationobj.export()
    })
    clearInterval(this.settimeobj);
  },

  //控制制操作图标
  ctr_audio: function (event){
    if (this.data.isplay == 0){
      this.playfun()
      this.setData({ ctrimg: this.data.stopico,isplay:1})
      this.audioPlay()
    }else{
      this.stopfun()
      this.setData({ ctrimg: this.data.playico, isplay: 0 })
      this.audioPause()
    }
  },

  //播放
  audioPlay: function () {
    var that = this
    wx.playBackgroundAudio({
      dataUrl: that.data.audiosrc
    })

  },

  //暂停
  audioPause: function () {
    wx.stopBackgroundAudio()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.onBackgroundAudioStop(function(){
      this.playfun()
      this.setData({ ctrimg: this.data.stopico, isplay: 1 })
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    this.getStoryInfo()
    
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

  getPlayStatus:function(){
    var that = this
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        var status = res.status
        if (status == 1 && that.data.audiosrc == res.dataUrl) {
          that.playfun()
          that.setData({ ctrimg: that.data.stopico, isplay: 1 })
        } else if (status == 2) {
          that.stopfun()
          that.setData({ ctrimg: that.data.playico, isplay: 0 })
        }
      }
    })
  },

  getStoryInfo:function(){

    var chat = this
    
    wx.request({
      url: getApp().globalData.api + '?m=weimagetext&a=storyshow&id=' + getApp().objid, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        
        chat.setData({
          title: res.data.Title,
          pic: res.data.PicUrl,
          audiosrc: res.data.audiosrc
        })
        WxParse.wxParse('content', 'html', res.data.content, chat, 5)
        //界面状态
        chat.getPlayStatus()

      }
    })
  }

})