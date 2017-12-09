// 定义变量
var myPage = 1;
var myPageSize = 5;

// 封装函数获取用户数据
function getData() {
    $.ajax({
        url: '/user/queryUser',
        data: {
            page: myPage,
            pageSize: myPageSize
        },
        success: function (backData) {
            console.log(backData);
            $('tbody').html(template('userTmp', backData));

            // 分页插件
            $("#pagintor").bootstrapPaginator({
                bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                currentPage: myPage, //当前页
                totalPages: Math.ceil(backData.total / backData.size), //总页数
                size: "small", //设置控件的大小，mini, small, normal,large
                onPageClicked: function (event, originalEvent, type, page) {
                    //为按钮绑定点击事件 page:当前点击的按钮值
                    //   console.log(page);
                    myPage = page;

                    getData();
                }
            })
        }
    })
}

// 默认先调用一次
getData();