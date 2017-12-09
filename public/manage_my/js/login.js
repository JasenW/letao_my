$(function () {

    // $('button[type=submit]').on('click',function(event){
    //     event.preventDefault();
    //     console.log($('form').serialize());
    //     $.ajax({
    //         url:'/employee/employeeLogin',
    //         type:'post',
    //         data: $('form').serialize(),
    //         success:function(backData){
    //             console.log(backData);
    //         }
    //     })
    // })

    $('form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 4,
                        max: 30,
                        message: '用户名长度必须在4到30之间'
                    }, //正则校验
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名由数字字母下划线和.组成'
                    },
                    callback: {
                        message: '用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 16,
                        message: '密码长度必须在6到16之间'
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();

        // 开启进度条
        NProgress.start();

        //使用ajax提交逻辑
        $.ajax({
            url: '/employee/employeeLogin',
            type: 'post',
            data: $('form').serialize(),
            success: function (backData) {

                // 数据回来后关闭进度条 用个倒计时让进度条多滚一会
                setTimeout(function () {
                    NProgress.done();
                }, 1000)

                console.log(backData);
                if (backData.success) {
                    window.location.href = './index.html';
                } else {
                    var validator = $("form").data('bootstrapValidator'); //获取表单校验实例的对象

                    if (backData.error == 1000) {
                        // 用户名不存在 更新字段
                        validator.updateStatus('username', 'INVALID', 'callback')
                    } else if (backData.error == 1001) {
                        // 密码错误 更新字段
                        validator.updateStatus('password', 'INVALID', 'callback')
                    }
                }
            }
        })
    });

    // 重置表单
    $('button[type=reset]').on('click', function () {

        var validator = $("form").data('bootstrapValidator'); //获取表单校验实例的对象
        validator.resetForm();
    })


})