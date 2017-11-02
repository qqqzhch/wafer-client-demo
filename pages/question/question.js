Page({
  changeName2:function(e){
    wx.stopRecord()
  },
  changeName: function (e) {
    console.log(e);
    wx.startRecord({
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        wx.playVoice({
          filePath: tempFilePath,
          complete: function () {
          }
        })
        wx.showModal({
          content: tempFilePath,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        });
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