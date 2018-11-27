Page({
  data: {
    articlesResultFormat: [], //ajax返回文章列表
    articlesResultFormatFrom1: [], //ajax返回文章列表（首图文章）
    articlesResultFormatFrom2: [], //ajax返回文章列表（除了首图的文章）
    catagory:['gn', 'gj', 'cj', 'yl', 'js', 'ty', 'other'], //新闻分类
    catagoryZh:{ //新闻分类（对应中文）
      'gn': '国内',
      'gj': '国际',
      'cj': '财经',
      'yl': '娱乐',
      'js': '军事',
      'ty': '体育',
      'other': '其他'
    },
    catagoryActive:'gn', //默认分类
    // swiper
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },
  onLoad () {
    this.getNews();
  },
  onPullDownRefresh () {
    this.getNews();
  },
  // 获取文章列表函数：请求ajax
  getNews () {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.catagoryActive,
      },
      success: res => {
        let result = res.data.result;
        this.setData({
          articlesResult: result,
        });
        this.convertFormat(result);
      },
    })
  },
  // 转换格式函数：将ajax的文章列表重新整理格式后存储到articlesResultFormat等中
  convertFormat(res){
    let tempArticle=[];//生成新文章数组
    let stringSource;//生成数据来源字符串
    let resDate;//源数据时间
    let stringDate;//生成时间字符串
    let timeStamp = new Date();//当前时间戳
    for (let i = 0; i < res.length; i++){
      resDate = new Date(res[i].date);
      stringDate = (timeStamp.getFullYear() === resDate.getFullYear() ? '' : (resDate.getFullYear() + '年'))
        + (resDate.getMonth() + 1) + '月' + resDate.getDate() + '日 '
        + this.fillZero(resDate.getHours()) + ':'
        + this.fillZero(resDate.getMinutes());
      stringSource = res[i].source ? res[i].source : '未知来源';
      tempArticle.push({
        'id': res[i].id,
        'title': res[i].title,
        'firstImage': res[i].firstImage,
        'date': stringDate,
        'source': stringSource,
      });
    };
    this.setData({
      articlesResultFormat: tempArticle,
      articlesResultFormatFrom1: tempArticle.slice(0, 2),
      articlesResultFormatFrom2: tempArticle.slice(2), 
    });
  },
  // 时间字符串补零函数
  fillZero(num){
    if (num<10) {
      return '0'+num;
    }
    else {
      return num;
    }
  },
  // 点击切换分类函数
  onTapCatagory(res){
    let index = res.currentTarget.dataset.index;
    this.setData({
      catagoryActive: this.data.catagory[index],
    });
    this.getNews();
  },
  // 点击跳转文章函数
  onTapArticle(res){
    let id = res.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../article/article?id='+id,
    })
  },
  // swiper
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  }
})