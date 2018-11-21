Page({
  data: {
    articlesResult:[],
    catagory:['gn', 'gj', 'cj', 'yl', 'js', 'ty', 'other'],
    catagoryZh:{
      'gn': '国内',
      'gj': '国际',
      'cj': '财经',
      'yl': '娱乐',
      'js': '军事',
      'ty': '体育',
      'other': '其他'
    },
    catagoryActive:'gn',
  },
  onLoad: function (options) {
    this.getNews();
  },
  getNews(){
  
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: 'gn'
      },
      success: res => {
        let result = res.data.result;
        this.setData({
          articlesResult: result,
        });
        console.log(result);
        for(let i=0;i<result.length;i++){
          console.log(this.convertDate(result[i].date));
        }
      },
    })
  },
  convertDate(dateString){
    let stringDay = dateString.substr(5, 2).replace(/\b(0+)/gi, "") +"月"+ dateString.substr(8, 2).replace(/\b(0+)/gi, "")+"日";
    let stringTime = dateString(11,5);
    return stringDay + stringTime;
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {
  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})