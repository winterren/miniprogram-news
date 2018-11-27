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
  },
  onLoad () {
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
    let tempArticle=[];
    let stringDay;
    let stringTime;
    let stringSource;
    for (let i = 0; i < res.length; i++){
      stringDay = res[i].date.substr(5, 2).replace(/\b(0+)/gi, "") + "月" + res[i].date.substr(8, 2).replace(/\b(0+)/gi, "") + "日";
      stringTime = res[i].date.substr(11, 5);
      stringSource = res[i].source ? res[i].source : '未知来源';
      tempArticle.push({
        'id': res[i].id,
        'title': res[i].title,
        'firstImage': res[i].firstImage,
        'date':(stringDay+' '+stringTime),
        'source': stringSource,
      });
    };
    this.setData({
      articlesResultFormat: tempArticle,
      articlesResultFormatFrom1: tempArticle.slice(0, 1),
      articlesResultFormatFrom2: tempArticle.slice(1), 
    });
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
})