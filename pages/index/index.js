//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    newslistArr:[],
    columnIndex:0,
    newsColumnArr:['top','guonei','junshi','shishang','yule','shehui','guoji','tiyu','caijing'],
  },

  //事件处理函数
enternewsInfo:function(event){
   console.log(event)
   var url = event.currentTarget.id, list = this.data.newslistArr;
   console.log('进入详情页:'+url);

url = url.substr(0,url.length-5)

   // 进入详情页
    wx.navigateTo({
             
   url: "../logs/logs?url=" +url,
   success: function(res){
     // success
   },
   fail: function() {
     // fail
   },
   complete: function() {
     // complete
   }   
    })

},

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
          }),

    this.refresh()

  },

upper: function () {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function(){wx.hideNavigationBarLoading();wx.stopPullDownRefresh();}, 2000);
  },

lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function(){wx.hideNavigationBarLoading();that.nextLoad();}, 1000);
    console.log("lower")
  },

  refresh: function(){
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 1000
    });

var thispage = this;

var colunmIdx = thispage.data.columnIndex;
var columnArr = thispage.data.newsColumnArr;
colunmIdx = 0;
thispage.setData({columnIndex:colunmIdx});



  app.getNewsList(columnArr[colunmIdx],function(data){
    
    console.log("我已经进来了,成功请求,:",+data),
    thispage.setData({newslistArr:data})

   });
  },

  nextLoad:function(){

  var thispage = this;
  var colunmIdx = thispage.data.columnIndex;
  var columnArr = thispage.data.newsColumnArr;
  if(colunmIdx + 1 < columnArr.length){

   
     colunmIdx = colunmIdx + 1;

 wx.showToast({
      title: '加载更多...'+columnArr[colunmIdx],
      icon: 'loading',
      duration: 1000
    });

     thispage.setData({columnIndex:colunmIdx});  
   var oldDataListArr = thispage.data.newslistArr;
   app.getNewsList(columnArr[colunmIdx],function(data){
    
    console.log("我已经进来了,加载更多,:",+data);
    // for(var i=0;i<data.length;i++){

    //   // 通过push方法添加
    //   oldDataListArr.push(data[i])

    // }

     // 或者直接通过contact来整个加入:  
      oldDataListArr = oldDataListArr.concat(data)

      // 两者区别:push 直接改变当前数组；concat 不改变当前数组。 所以使用concat要用数组来接受

       thispage.setData({newslistArr:oldDataListArr})
   });
    
  } else{

    console.log('没有咯');
    wx.showToast({
      title: '没有栏目啦',
      icon: 'loading',
      duration: 1000
    });

  }
    
 },

})
