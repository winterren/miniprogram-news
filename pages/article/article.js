Page({
  data:{
    articleId: 1523074607672,
    articleTitle:"",
    articleDate:"",
    tempContent:"<h1>hello</h1>",
    articleContent:[],
  },
  onLoad(option){
    // 读取navigateto传入的id
    let id = option.id;
    this.setData({
      articleId: option.id,
    });
    // 获得该id的文章内容
    this.getArticle();
  },
  getArticle(){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.articleId,
      },
      success: res => {
        let result = res.data.result;
        let timeDate = new Date(result.date);
        let timeString = timeDate.getFullYear() + '年' 
          + (timeDate.getMonth()+1)+ '月' 
          + (timeDate.getDay()+1)+'日' 
          + timeDate.getHours()+ '时' 
          + timeDate.getMinutes()+'分';
        this.setData({
          articleTitle: result.title,
          articleDate: timeString,
          articleContent: result.content,
        })
      },
    })
  }
})