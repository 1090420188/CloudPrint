// app.js
App({
  onLaunch() {
    var that=this;
    wx.login({
      success: res => {
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
            that.globalData.user_info=res.data.data;
          },
          fail:res=>{
            console.log(res);
          }
        })

      }
    })
  },
  getAvailScreenSize(){
    wx.getSystemInfo({
      success: function(res) {
        const screenWidth = res.screenWidth;
        const screenHeight = res.screenHeight;
        const statusBarHeight = res.statusBarHeight;
        const availableWidth = screenWidth;
        const availableHeight = screenHeight - statusBarHeight;
        that.globalData.screen.width=availableWidth
        that.globalData.screen.height=availableHeight
      }
    })
  },
  globalData: {
    userInfo: null,
    screen:{width:0,height:0},
    marchant:'',
    showmerchant:'',
    user_info:''
  }
})
