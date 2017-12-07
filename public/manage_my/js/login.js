$(function(){

    $('button[type=submit]').on('click',function(event){
        event.preventDefault();
        console.log($('form').serialize());
        $.ajax({
            url:'/employee/employeeLogin',
            type:'post',
            data: $('form').serialize(),
            success:function(backData){
                console.log(backData);
            }
        })
    })


})