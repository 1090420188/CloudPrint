// pages/fileupload/fileupload.js
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    screen_width:0,
    screen_height:0,
    file_list:[],
    file_limit:{MaxSizeAll:104857600,
                MaxCount:100,
                FilePrintSuffix:[],
                PrintWay:['单面','双面'],
                PrintPageColor:[{pagecolor:'黑色',pagesize:['A4','A3']},
                {pagecolor:'彩色',pagesize:['A4','A3']}]},
    select_file:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that=this;
    if(app.globalData.screen.width==0 ||app.globalData.screen.height==0)
    {
      wx.getSystemInfo({
        success: function(res) {
          const screenWidth = res.screenWidth;
          const screenHeight = res.screenHeight;
          const statusBarHeight = res.statusBarHeight;
          const availableWidth = screenWidth;
          const availableHeight = screenHeight - statusBarHeight;
          app.globalData.screen.width=availableWidth
          app.globalData.screen.height=availableHeight
          that.setData({
            screen_width:availableWidth,
            screen_height:availableHeight
          })
        }
      })
    }
    else{
      that.setData({
        screen_width:app.globalData.screen.width,
        screen_height:app.globalData.screen.height
      })
    }
  },
  getmerchantinfo(){
    wx.request({
      url: 'https://www.zyxgz.xyz.com/printer/marchantinfo',
    })
  },
  setprintcolor(e){
    var file=this.data.select_file;
    var idx=this.data.select_file.id;
    var arr=this.data.file_list;
    file.pagecolor= e.currentTarget.dataset.item;
    arr[idx]=file;
    this.setData({
      select_file:file,
      file_list:arr
    })
  },
  setprintsize(e){
    var file=this.data.select_file;
    var idx=this.data.select_file.id;
    var arr=this.data.file_list;
    file.pagesize= e.currentTarget.dataset.item;
    arr[idx]=file;
    this.setData({
      select_file:file,
      file_list:arr
    })
  },
  setprintway(e){
    var file=this.data.select_file;
    var idx=this.data.select_file.id;
    var arr=this.data.file_list;
    
    file.printway= e.currentTarget.dataset.item;
    arr[idx]=file;
    this.setData({
      select_file:file,
      file_list:arr
    })
  },
  setprintcount(e){
    console.log(e);
    var file=this.data.select_file;
    var idx=this.data.select_file.id;
    var arr=this.data.file_list;
  
    if(e.currentTarget.dataset.item=='1')
    {
      file.pagecount-=1
      if(file.pagecount==0) 
        return
    }
    else if(e.currentTarget.dataset.item=='2'){
      if(e.detail.value=='')
      {
        file.pagecount=1
      }
      else{
        file.pagecount= parseInt(e.detail.value);
      }
    }
    else if(e.currentTarget.dataset.item=='3'){
      file.pagecount+=1
    }
    arr[idx]=file;
    this.setData({
      select_file:file,
      file_list:arr
    })
  },
  printsetover(){
    this.setData({
      select_file:''
    })
  },
  getWxFile(){
    var arr=this.data.file_list;
    var that=this;
    wx.chooseMessageFile({
      count: 10,
      type: 'all',
      success: (res) => {
        for(var i=0;i<res.tempFiles.length;i++)
        {
          var obj=new Object();
          var file=res.tempFiles[i];
          console.log(file);
          var idx=file.name.indexOf('.');
          var pathlen=file.name.length;
          obj.suffix=file.name.substring(idx,pathlen);
          obj.pagesize='A4';
          obj.pagecolor='黑色';
          obj.printway='单面';
          obj.pagecount=1;
          obj.name=file.name;
          obj.size=file.size;
          obj.path=file.path;
          obj.id=arr.length;
          arr.push(obj);
        }
        console.log(arr);
        that.setData({
          file_list:arr
        })
      },
      fail: (err) => {
      }
    });
  },
  printok(){
    console.log(this.data.file_list);
  },
  deleteFile(e)
  {
    console.log(e); 
    var id=e.currentTarget.dataset.id;
    var arr=this.data.file_list;
    arr.splice(id,1);
    this.setData({
      file_list:arr
    })
  },
  setFIle(e){
    var file= e.currentTarget.dataset.item;
    this.setData({
      select_file:file
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