// pages/printer/printer.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
      if(options.showmerchant!=undefined)
      {
        if(options.showmerchant=='true')
        {
          app.globalData.showmerchant=true;
        }else{
          app.globalData.showmerchant=false
        }
      }
  },
  navtoaddfile(){
    wx.getStorage({
      key:'Token',
      success:res=>{
        wx.navigateTo({
          url: '/pages/fileupload/fileupload',
        })
        console.log(res.data);
      },
      fail:res=>{
        wx.login({
          success: (res) => {
            wx.request({
              url: 'https://www.zyxgz.xyz/cgi-bin/a.cgi',
              data:{
                code:res.code
              },
              success(res){
                console.log(res);
                var token=res.header.Token;
                wx.setStorage({
                  key:'Token',
                  data:token
                })
                wx.navigateTo({
                  url: '/pages/fileupload/fileupload',
                })
              }
            })
          },
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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