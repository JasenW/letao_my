// 定义变量
var mypage = 1;
var mypageSize = 5;

function getData() {
    $.ajax({
        url: '/category/queryTopCategoryPaging',
        data: {
            page: mypage,
            pageSize: mypageSize
        },
        success: function (backData) {
            console.log(backData);
            var result = template('categoryTmp', backData);
            // console.log(result);
            $('tbody').html(result);

            //分页插件
            $("#pagintor").bootstrapPaginator({
                bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                currentPage: mypage, //当前页
                totalPages: Math.ceil(backData.total / backData.size), //总页数
                size: "small", //设置控件的大小，mini, small, normal,large
                onPageClicked: function (event, originalEvent, type, page) {
                    //为按钮绑定点击事件 page:当前点击的按钮值
                    mypage = page;
                    getData();
                }
            });
        }
    })
}

getData();

$('form').bootstrapValidator({
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        categoryName: {
            validators: {
                notEmpty: {
                    message: '用户名不能为空'
                }
            }
        }
    }
}).on('success.form.bv', function (e) {
    e.preventDefault();

    $('#myModal').modal('hide')
    // 开启进度条
    NProgress.start();

    //使用ajax提交逻辑
    $.ajax({
        url: '/category/addTopCategory',
        type: 'post',
        data: $('form').serialize(),
        success: function (backData) {

            // 数据回来后关闭进度条 
            NProgress.done();
            console.log(backData);
            getData();

            //// 重置表单
            var validator = $("form").data('bootstrapValidator'); //获取表单校验实例的对象
            validator.resetForm();
            $('input[type=text]').val("");
        }
    })

});
