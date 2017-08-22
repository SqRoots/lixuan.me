var args=urlArgs();
var args_tree1=args.tree1||"";
var args_tree2=args.tree2||"";
console.log([args_tree1, args_tree2]);

axios.get('./contents-data.json')
  .then(function (response) {
    //一级目录
    var header = new Vue({
      el: '#header',
      data: {
        tree1: response.data
      },
      methods: {
        //点击一级目录
        clicke_tree1: function (doc) {
          //如果点击管理，跳转到管理页面
          if(doc.key==="management"){
            location.href="admin/index.php";
            return "";
          }
          //删除所有项目的 active 类
          header.tree1.forEach(function(item){
            item.isActive=false;
          });
          //为当前项目添加 active 类
          doc.isActive=true;
          //修改 url
          window.history.pushState({},0,"?tree1="+doc.key);
          //加载二级目录
          nav.title=doc.value;
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
        title: response.data[0].value,
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
          //修改 url
          var args=urlArgs();
          var temp_tree1=args.tree1||"about";
          window.history.pushState({},0,"?tree1="+temp_tree1+"&tree2="+doc.key);
          //加载内容
          article.html=doc.key;
          //显示右侧边
          // aside.assidShowQ=!aside.assidShowQ;
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
    //根据 URL 激活页面
    //一级目录长度
    var dataN1=response.data.length;
    //如果一级目录为空，则设置默认值
    if(args_tree1===""){
      response.data[0].isActive=true;
      response.data[0].data[0].isActive=true;
    }else{
      //如果 tree1==="management" ，则跳转到管理页面
      if(args_tree1==="management"){
        location.href="admin/index.php";
        return "";
      }
      //其它，激活指定一级目录
      for(var i=0; i<dataN1; i++){
        if(response.data[i].key===args_tree1){
          response.data[i].isActive=true;
          //如果 tree2!=="" ，激活指定二级目录
          if(args_tree2!==""){
            var dataN2=response.data[i].data.length;
            for(var ii=0; ii<dataN2; ii++){
              if(response.data[i].data[ii].key===args_tree2){
                //激活二级目录
                response.data[i].data[ii].isActive=true;
                //加载二级目录
                nav.title=response.data[i].value;
                nav.tree2=response.data[i].data;
                //加载内容
                article.html=response.data[i].data[ii].key;
                break;
              }
            }
          }
          break;
        }
      }
    }

  })
  .catch(function (error) {
    console.log('error');
  });
