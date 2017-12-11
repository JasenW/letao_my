$(function () {

    // 定义变量
    var mypage = 1;
    var mypageSize = 5;

    function getData() {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
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


    //渲染一级分类下拉菜单
    $.ajax({
        url: '/category/queryTopCategoryPaging',
        data: {
            page: 1,
            pageSize: 998
        },
        success: function (backData) {
            console.log(backData);


            $('.dropdown-menu').html('');
            $.each(backData.rows, function (i, e) {
                var li = $('<li><a  data-id="' + e.id + '" href="#">' + e.categoryName + '</a></li>');

                $('.dropdown-menu').append(li);
            })

        }
    })

    // 点击一级分类的li,固定显示
    $('.dropdown-menu').on('click', 'a', function () {

        $('#dropdownMenu1 span:first').html($(this).html());
        $('form input[name=categoryId]').val($(this).attr('data-id'));

        //人为更新字段
           $("form").data('bootstrapValidator').updateStatus('categoryId', 'VALID');

    })


    // 图片上传预览
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            console.log(data);

            var src = data.result.picAddr;
            $('form img').attr('src', src);
            $('form input[name=brandLogo]').val(src);
            //人为更新字段
               $("form").data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
        }
    });


    // 表单验证
    //使用表单校验插件
    $('form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [':disabled'],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                }
            },
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                }
            },
            brandLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                }
            }
        }

    }).on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url:'/category/addSecondCategory',
            type:'post',
            data:$('form').serialize(),
            success:function(backData){
                console.log(backData);
                $('form input').val('');
                $('#dropdownMenu1 span:first').html('请选择');
                $('form img').attr('src', './images/none.png');
                $('.modal-add').modal('hide');
                $("form").data('bootstrapValidator').resetForm();

                getData();

            }
        })
    });


});