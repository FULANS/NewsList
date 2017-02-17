Page({
  data:{
    
    newsurl:null

  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    console.log(options)
          var url = options.url
          var that = this
          url=url+'.html'
          wx.showToast({ 
          title: '加载中', 
          icon: 'loading', 
          duration: 1000 
          }) 
          wx.request({ 
          url: url, //服务器参数接收地址， 
          data: {

          }, 
          success: function(res){ 
          console.log(res.data) //打印获取数据 
          that.setData({ 
          newsDetail:res.data 
          }) 
        } 
      }) 
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    
  },

})
