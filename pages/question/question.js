// 引入配置
var config = require('../../config');
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');


Page({
  uploadfile: function (e) {
    console.log(this.data)
    var tempFilePaths = this.data.vfile;
    qcloud.uploadFile({
      url: config.service.uploadfileUrl, //仅为示例，非真实的接口地址
      filePath: tempFilePaths,
      name: 'file',
      formData: {
        'user': 'test'
      },
      success: function (res) {
        var data = res.data
        //do something
        console.log(res.data);
        console.log("上传成功");
      },
      fail: function (res) {
        console.log(res);
        console.log("上传失败");
      }
    })
  },
  endv: function (e) {
    wx.stopRecord()
  },
  startv: function (e) {
    console.log(e);
    var _this = this;
    wx.startRecord({
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        // console.log(tempFilePath);
        _this.setData({ vfile: tempFilePath });
        wx.playVoice({
          filePath: tempFilePath,
          complete: function () {
            wx.showModal({
              content: '播放结束',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            });
          }
        })

      },
      fail: function (res) {
        //录音失败
      }
    })

    // wx.startRecord({
    //   success: function (res) {
    //     var tempFilePath = res.tempFilePath
    //     alert(tempFilePath);
    //   },
    //   fail: function (res) {
    //     //录音失败
    //   }
    // })
  }
})