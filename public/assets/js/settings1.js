// 当管理员选择logo图片时
$('#logo').on('change', function() {
    //获取到管理员选择到的图片
    let file = this.files[0];
    //创建formData对象 实现二进制文件上传
    let formData = new FormData();
    //将管理员选择到的文件添加到formData对像中
    formData.append('logo', file);
    //向服务器端发送请求 实现文件上传
    $.ajax({
        type:'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log(response)
            $('#hiddenLogo').val(response[0].logo)
            //将logo图片显示到页面中
            $('#preview').attr('src', response[0].logo)
        }
    })
})

//当网站设置表单发生提交行为时
$('#settingsForm').on('submit', function() {
    //获取管理员在表单中输入的内容
    let formData = $(this).serialize();
    //向服务器端发送请求 实现网站设置数据添加功能
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function() {
            location.reload();
        }
    })

    //阻止表单默认提交行为
    return false;
})

//向服务器端发送 索要网站设置数据