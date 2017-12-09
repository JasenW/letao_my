$(function(){

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





})