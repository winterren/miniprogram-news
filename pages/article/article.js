Page({
  data:{
    articleId: "",
    articleTitle:"",
    articleDate:"",
    articleReadCount:"",
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
        // 将源数据中Date转换为字符串，当年新闻不显示年份
        let timeDate = new Date(result.date);
        let timeStamp = new Date();//当前时间戳
        let timeString = (timeStamp.getFullYear()===timeDate.getFullYear()?'':(timeDate.getFullYear() + '年'))
          + (timeDate.getMonth()+1)+ '月' 
          + timeDate.getDate()+'日 ' 
          + timeDate.getHours()+ '时' 
          + timeDate.getMinutes()+'分';
        this.setData({
          articleTitle: result.title,
          articleDate: timeString,
          articleContent: result.content,
          articleReadCount: result.readCount,
        })
      },
    })
  }
})