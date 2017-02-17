//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
 
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },

getNewsList:function(newstype,cb){

  wx.request({
  url: 'http://v.juhe.cn/toutiao/index',
  data: {
     key:'a03d59439d199f5eaf5a769b8b10ebae',
     type:newstype,
  },
  header: {
      "content-type": "application/x-www-form-urlencoded"  
  },
   method:'POST',
  success: function(res) {

    console.log(res.data.result.data)

    // 通过cb方法把数据返回出去
    cb(res.data.result.data)

  },
  fail: function(res){
    console.log('请求失败')
  }
})

},



})
