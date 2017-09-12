var args = urlArgs();
var args_tree1 = args.tree1 || "";
var args_tree2 = args.tree2 || "";
// console.log([args_tree1, args_tree2]);

axios.get('./contents-data.json')
  .then(function(response) {
    var tree_data = response.data;
    //注册组件
    //目录
    Vue.component('tree-folder', {
      props: ['folder'],
      template: '<div>' +
                  '<div :data=folder.key>{{ folder.name }}</div>' +
                  '<tree-folder-contents :children="folder.children"/>' +
                '</div>'
    });
    //目录内容
    Vue.component('tree-folder-contents', {
      props: ['children'],
      template: '<ul>' +
                  '<li v-for="child in children">' +
                    '<tree-folder v-if="child.children" :folder="child"/>' +
                    '<div v-else v-on:click="loadPage(child)" :data=child.key :class="{ active: child.isActive }">{{ child.name }}</div>' +
                  '</li>' +
                '</ul>',
      methods: {
        //点击导航 加载页面
        loadPage: function(child) {
          var tree1=event.path[3].firstChild.attributes.data.value,
              tree2=child.key;
          if(tree1==="management"){
            location.href="admin/index.php";
            return "";
          }
          child.isActive=true;
          document.getElementById('article').innerHTML=tree1+'--'+tree2;
          window.history.pushState({},0,"?tree1="+tree1+"&tree2="+tree2);
        }
      }
    });
    // 创建根实例
    new Vue({
      el: '#nav',
      data: {
        children: tree_data
      }
    });
  })
  .catch(function(error) {
    console.log('error');
  });
