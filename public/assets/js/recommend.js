//向服务器端发送请求 索要热门推荐数据
$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function (response) {
        //为了将模板变成公共的 所以将模板卸载了js文件中
        let recommendTpl = `
        {{each data}}
         <li>
         <a href="detail.html?id={{$value._id}}">
           <img src="{{$value.thumbnail}}" alt="">
           <span>{{$value.title}}</span>
         </a>
       </li>
       {{/each}}
          `;
        let html = template.render(recommendTpl, {data: response})
        //将拼接好的热门推荐显示在了页面中
        $('#recommendBox').html(html)
    }
})