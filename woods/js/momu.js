/**
 * Created by ThinkPad User on 2017/3/12.
 */
+function($){
    var i=0;
    var len=$(".banner-left li").length;
    var lt=$(".banner-left li");
    var rt=$(".banner-right li");
    var timer=setInterval(LeftAnimation,3000);
    function LeftAnimation(){
        lt.siblings(".hide").removeClass("hide cur");
        rt.siblings(".hide2").removeClass("hide2 cur");
        if(i==3){
            lt.eq(3).removeClass("show cur").addClass("hide cur");
            lt.eq(0).addClass("show cur");
            rt.eq(3).removeClass("show2 cur").addClass("hide2 cur");
            rt.eq(0).addClass("show2 cur");
        }else{
            lt.eq(i).removeClass("show cur").addClass("hide cur").next().addClass("show cur");
            rt.eq(i).removeClass("show2 cur").addClass("hide2 cur").next().addClass("show2 cur");
        }
        i++;
        if(i>=len){i=0}
    }
}($)


$("#menu-box").click(function(){
    if($(this).hasClass("cur")){
        $(this).removeClass("cur");
        $(".momu-menu").removeClass("fadeIn").next().removeClass("fadeOut");
    }else{
        $(this).addClass("cur");
        $(".momu-menu").addClass("fadeIn").next().addClass("fadeOut");
    }
})


$(".momu-page").scroll(function(){
    if(parseFloat($(this).scrollTop())>parseFloat(window.outerHeight)){
        $(".toTop").css("display","block");
    }else{
        $(".toTop").css("display","none");
    }

    $(".momu-page>[class^='module']").each(function(i){
        if(!$(this).hasClass("sliderIn")){
            var result=parseFloat($(".momu-page").scrollTop())+parseFloat(window.outerHeight)/2> parseFloat(this.offsetTop);
            if(result){
                $(this).addClass("sliderIn");
            }
        }
    })
});
$(".toTop").click(function(){
    $(this).parent().scrollTop(0);
});
+function($){
    var x1=0,y1=0,x2=0,y2=0;
    $(".hand-bg-wrap").mousemove(function(e) {
        x1 = parseFloat(e.offsetX);
        y1 = parseFloat(e.offsetY);
    })
    var timer2 = setInterval(task, 500);
    function task(){
        if(x1==0&&y1==0){
            return;
        }else{
            if(x2==0&&y2==0){
                x2=x1;
                y2=y1;
            }else if(x2==x1&&y2==y1){
                return;
            }else{
                var xOff=(x1-x2)/10;
                var yOff=(y1-y2)/10;
                $(".hand-box img").css({marginTop:yOff+"px",marginLeft:xOff+"px"});
            }
        }
    }

}($)





