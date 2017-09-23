var args = urlArgs();
var args_tree1 = args.tree1 || "";
var args_tree2 = args.tree2 || "";
// console.log([args_tree1, args_tree2]);

axios.get('./contents-data.json')
  .then(function(response) {
    var tree_data = response.data;
    for(i=0;i<tree_data.length;i++){
      tree_data[i].isActive=false;
    }
    console.log(tree_data);
    // 创建根实例
    var nav=new Vue({
      el: '#nav',
      data: {
        contents_data: tree_data
      },
      methods: {
        //加载页面
        loadPage: function(item){
          for(i=0;i<nav.contents_data.length;i++){
            nav.contents_data[i].isActive=false;
          }
          item.isActive=true;
          console.log(item);
        }
      }
    });
  })
  .catch(function(error) {
    console.log('error');
  });
