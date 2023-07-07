// pages/my/my.js

const app = getApp()

const req=require("../../utils/request.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUseGetUserProfile: false,
    hasuserInfo:false,
    userInfo:{},
    showmerchant:false,
    merchanant_disabled:true,
    is_merchant:false,
    user_info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var res=req.getinfo('s')
    console.log(res);
    if(app.globalData.showmerchant)
    {
      this.setData({
        showmerchant:true      
      })
    }
    if(app.globalData.user_info!=null)
    {
      console.log(app.globalData.user_info)
      this.setData({
        user_info:app.globalData.user_info,
        is_merchant:app.globalData.user_info.is_merchant
      }) 
    }
    if(this.data.is_merchant)
    {
      this.setData({
        merchanant_disabled:true
      })
    }

  },
  getUserProfile(e) {
    var that=this;

    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        that.setData({
          userInfo: res.userInfo,
          hasuserInfo: true
        })
        app.globalData.userInfo=res.userInfo;
      },
      fail: res => {
        wx.showToast({
          title: '您拒绝了请求,不能正常使用小程序',
          icon: 'error',
          duration: 2000
        });
        return;
      }
    })

  },
  setmerchant(){

  },

  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})