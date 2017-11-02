var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
// 引入配置
var config = require('../../config');

// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
});

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
});

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  });
};
Page({
  data: {
    tabs: ["100条吐槽", "我要吐槽"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    userinput:'',
    itemList:[
      {
        brief:'小程序碰到了个问题，view并不能让文本自动换行。 官方定义的view组件，display为block。 scroll-view中定义display:flex是无效的。 view中要让中文片段自动换',
        creatTime:'*****',
        nickname:'********************'
      }, {
        brief: '********************************************************************',
        creatTime: '*****',
        nickname: '********************'
      }, {
        brief: '********************************************************************',
        creatTime: '*****',
        nickname: '********************'
      }, {
        brief: '********************************************************************',
        creatTime: '*****',
        nickname: '********************'
      }, {
        brief: '********************************************************************',
        creatTime: '*****',
        nickname: '********************'
      }, {
        brief: '********************************************************************',
        creatTime: '*****',
        nickname: '********************'
      }, {
        brief: '********************************************************************',
        creatTime: '*****',
        nickname: '********************'
      }, {
        brief: '********************************************************************',
        creatTime: '*****',
        nickname: '********************'
      }, {
        brief: '********************************************************************',
        creatTime: '*****',
        nickname: '********************'
      },
    ]
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  submitdata:function(e){
    console.log(this.data)
    console.log(this.data.userinput)
    //
    showBusy('正在请求');

    // qcloud.request() 方法和 wx.request() 方法使用是一致的，不过如果用户已经登录的情况下，会把用户的会话信息带给服务器，服务器可以跟踪用户
    qcloud.request({
      // 要请求的地址
      url: config.service.creatinfoUrl,
      data: this.data.userinput,
      method:'POST',

      // 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
      login: true,

      success(result) {
        showSuccess('请求成功完成');
        console.log('request success', result);
      },

      fail(error) {
        showModel('请求失败', error);
        console.log('request fail', error);
      },

      complete() {
        console.log('request complete');
      }
    });
    //
  }
});