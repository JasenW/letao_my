 // 调用判断是否登录接口，如果没有登录返回到登录页
 $.ajax({
    url:'/employee/checkRootLogin',
    success:function(backData){
        console.log(backData);
        if(backData.error==400){
            window.location.href='login.html';
        }
    }
})


  // 显示影藏侧边栏 
$('.topbar a').first().click(function(){
    $('#aside').toggle();
    $('#section').toggleClass('hide_left');
})


// 点击显示模态框
$('.topbar a').last().click(function(){
    $('.modal').modal('toggle');
})


// 弹出模态框后点确定按钮退出登录并调用退出登录接口
$('.btn-sure').click(function(){
    $('.modal').modal('toggle');
    $.ajax({
        url:'/employee/employeeLogout',
        success:function(backData){
            console.log(backData);
            window.location.href='./login.html';
        }
    })
})

// 点击分类管理显示隐藏1,2级分类
// $('.content ul li:eq(1)>ol').hide();

$('.content ul li:eq(1)>a').click(function(){
    $(this).siblings('ol').slideToggle();
})