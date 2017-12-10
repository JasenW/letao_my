$(function () {


    // 定义变量
    var mypage = 1;
    var mypageSize = 5;

    function getData() {
        $.ajax({
            url: '/product/queryProductDetailList',
            data: {
                page: mypage,
                pageSize: mypageSize
            },
            success: function (backData) {
                console.log(backData);
                var result = template('productTmp', backData);
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
    // 默认调用一次
    getData();


    // 上传图片预览
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            console.log(data);

            $('<img style="width:100px" src="' + data.result.picAddr + '" >').appendTo($('form .form-group:last'))

            if ($('form .form-group:last img').length == 3) {
                // 当图片上传三张后人为更新file字段
                // $("form").data('bootstrapValidator').updateStatus('pic1','VALID');
            }
        }
    });

    // 当上传三张图片后就不不能使用上传了
    $('#fileupload').click(function(event){

        if ($('form .form-group:last img').length == 3) {
            event.preventDefault();
        }
    })


    // 当双击上传的图片删除
    $('form .form-group:last').on('dblclick', 'img', function () {

        // alert('111');
        $(this).remove();
    })


    // 表单验证
    $('form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            proName: {
                validators: {
                    notEmpty: {
                        message: '商品名称不能为空'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();

        $.ajax({
            url:'/product/addProduct',
            type:'post',
            data:$('form').serialize(),
            success: function(backData){
                console.log(backData);

                $('form input').val("");
                $('.modal-add').modal('hide');

                getData();
            }
        })

    });


})