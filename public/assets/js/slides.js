//当管理员选中文件的时候
$('#file').on('change', function() {
    //用户选择到的文件
    let file = this.files[0];
    //创建formData对象 实现二进制文件上传
    let formData = new FormData();
    formData.append('image', file);
    //向服务器端发送请求  实现图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response[0].image)
            $('#image').val(response[0].image)
        }
    })
})

$('#slidesForm').on('submit', function() {
    //获取管理员在表单中输入的内容
    let formData = $(this).serialize();
    //向服务器端发送请求 添加轮播图数据
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function() {
            location.reload();
        }
    })
    //阻止表单默认提交行为
    return false;
})

//向服务器端发送请求 索要图片轮播列表数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function  (response){
        console.log(response)
        let html = template('slidesTpl', {data: response})
        $('#slidesBox').html(html);
    }
})

// 当删除按钮被点击时
$('#slidesBox').on('click', '.delete', function () {
	if (confirm('您真的要进行删除操作吗')) {
		// 获取管理员要删除的轮播图数据id
		var id = $(this).attr('data-id');
		// 向服务器发送请求 实现轮播数据删除功能
		$.ajax({
			type: 'delete',
			url: '/slides/' + id,
			success: function () {
				location.reload();
			}
		})
	}
});

