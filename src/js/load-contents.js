
axios.get('./contents-data.json')
  .then(function (response) {
    //
    response.data[0].isActive=true;
    response.data[0].data[0].isActive=true;
    //一级目录
    var header = new Vue({
      el: '#header',
      data: {
        tree1: response.data
      },
      methods: {
        //点击一级目录
        clicke_tree1: function (doc) {
          //删除所有项目的 active 类
          header.tree1.forEach(function(item){
            item.isActive=false;
          });
          //为当前项目添加 active 类
          doc.isActive=true;
          //加载二级目录
          nav.title=doc.name;
          nav.tree2=doc.data;
          //加载内容
          article.html='';
          nav.tree2.forEach(function(item){
            if(item.isActive){
              article.html=item.key;
            }
          });

        }
      }
    });

    //二级目录
    var nav = new Vue({
      el: '#nav',
      data: {
        title: response.data[0].name,
        tree2: response.data[0].data
      },
      methods:{
        clicke_tree2: function(doc) {
          //删除所有项目的 active 类
          nav.tree2.forEach(function(item){
            item.isActive=false;
          });
          //为当前项目添加 active 类
          doc.isActive=true;
          //加载内容
          article.html=doc.key;
          aside.assidShowQ=!aside.assidShowQ;
        }
      }
    });

    //内容
    var articleData = '李宣';
    var article = new Vue({
      el: '#article',
      data: {html: articleData}
    });

    //侧边
    var aside = new Vue({
      el: '#aside',
      data: {assidShowQ: false}
    });

  })
  .catch(function (error) {
    console.log('error');
  });
