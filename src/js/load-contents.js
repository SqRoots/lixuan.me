axios.get('./contents-data.json')
  .then(function (response) {
    for(var i in response.data){
      console.log(response.data[i]);
    }

    document.getElementById('a').innerHTML=response.data.welfare.name;

    var temp=[];
    for(var k in response.data){
      temp.push(response.data[k]);
    }

    var app4 = new Vue({
      el: '#app-4',
      data: {
        contents: temp
      }
    });
  })
  .catch(function (error) {
    console.log('error');
  });
