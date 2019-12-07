//当添加分类表单发生提交行为的时候
$('#addCategory').on('submit', function () {
    //获取用户在表单中的输入的内容
    let formData = $(this).serialize();
    //向服务器端发送请求 添加分类
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function () {
            location.reload();
        }
    })
    //阻止表单默认提交行为
    return false;

})

//发送ajax请求 向服务器端所有分类列表数据
$.ajax({
    type:'get',
    url:'/categories',
    success: function(response) {
        let html = template('categoryListTpl', {data: response});
        //将拼接好的内容放到页面中
        $("#categoryBox").html(html);
    }
})

// 为编辑按钮添加点击事件
$('#categoryBox').on('click', '.edit', function() {
    //获取要修改的分类数据的id
    let id = $(this).attr('data-id');
    //根据id获取分类数据的详细信息
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(response) {
            console.log(response)
            let html = template('modifyCategoryTpl', response);
            $('#formBox').html(html)
        }
    })
});

//当修改分类数据表单发生提交行为的似乎
$('#formBox').on('submit', '#modifyCategory', function() {
    //获取管理员在表单中输入的内容
    let formData = $(this).serialize();
    //获取要修改的分类id
    let id = $(this).attr('data-id');
    // 发送请求 修改分类数据
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function() {
            location.reload();
        }
    })
    //阻止表单的默认提交行为
    return false;
});

// 当删除按钮被点击的时候
$('#categoryBox').on('click', '.delete', function() {
    if (confirm('您真的要执行删除操作吗')) {
        // 获取要删除的分类数据id
        let id = $(this).attr('data-id');
        //向服务器端发送请求 删除分类数据
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function() {
                location.reload();
            }
        })
    }
})




// //获取全选按钮
// let selectAll = $('#selectAll');

// //获取批量删除按钮
// let deleteMany = $('#deleteMany');
// //当全选按钮的状态发生改变是
// selectAll.on('change', function() {
// 	//获取到全选按钮当前的状态
// 	let status = $(this).prop('checked')

// 	if(status) {
// 		//显示批量删除按钮
// 		deleteMany.show();
// 	}else {
// 		//隐藏批量删除按钮
// 		deleteMany.hide();
// 	}
// 	// 获取到所有的用户
// 	$('#userBox').find('input').prop('checked', status);
// });

// //当用户前面的复选框状态发生改变是 
// $('#userBox').on('change', '.userStatus', function() {
// 	let inputs = $('#userBox').find('input');

// 	if(inputs.length == inputs.filter(':checked').length){
// 		selectAll.prop('checked', true)
// 	} else {
// 		selectAll.prop('checked', false)
// 	}
// 	//如果选中的复选框的数量大于0 就说明有选中的复选框
// 	if(inputs.filter(':checked').length > 0) {
// 		//显示批量删除按钮
// 		deleteMany.show();
// 	}else {
// 		//隐藏批量删除按钮
// 		deleteMany.hide();
// 	}
// })

// //为批量删除按钮添加点击事件
// deleteMany.on('click', function() {
// 	let ids = [];
// 	let checkedUser = $('#userBox').find('input').filter(':checked')
	
// 	checkedUser.each(function(index, element) {
// 		ids.push($(element).attr('data-id'));
// 	});

// 	if(confirm('您真要确定要进行批量删除操作吗')) {
// 		$.ajax({
// 			type: 'delete',
// 			url: '/users/' + ids.join('-'),
// 			success: function() {
// 				location.reload();
// 			}

			
// 		})
// 	}
	
// })