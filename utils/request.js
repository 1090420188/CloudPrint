 function getinfo(code) {
    if(code=='')
      return ;
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
            return res.data.data
          },
          fail:res=>{
              console.log(res);
          }
        })
      }
    })

}

module.exports = {
  getinfo
}