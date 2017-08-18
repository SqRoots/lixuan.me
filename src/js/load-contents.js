
axios.get('./contents-data.json')
  .then(function (response) {
    document.getElementById('a').innerHTML=response.data[0].name;

    var header_data=[{'name': '李宣', "isActive": true}];
    header_data=header_data.concat(response.data);

    var header = new Vue({
      el: '#header',
      data: {
        tree1: header_data
      },
      methods: {
        //点击一级目录
        active_tree1: function (doc) {
          //删除所有项目的 active 类
          header_data.forEach(function(item){
            item.isActive=false;
          });
          //为当前项目添加 active 类
          doc.isActive=true;
          nav.data.tree2=doc.data;
          console.log(nav.data.tree2);
        }
      }
    });

    var nav = new Vue({
      el: '#nav',
      data: {
        tree2: [{"name": "aa", "key": "bb"}]
      }
    });

  })
  .catch(function (error) {
    console.log('error');
  });
