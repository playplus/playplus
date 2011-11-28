    page = null;
    $(document).ready(function(){
      CenterBody();
      StartLoading();
    });
    function StartLoading() {
       if(navigator.appName != "Microsoft Internet Explorer")
           $("#loading").fadeToggle("slow",function() {
               StartLoading(); //IE seems to have trouble to stop this nasty recursion
           })
    }
    function StopLoading() {
         $("#loading").stop().fadeOut("fast",function(){
            InitLayout();
            $(window).resize(function() {
                InitLayout();
            });
            InitMenu();
        });
    }
    function InitLayout() {
            CenterBody();
            $("#coverart").height(Math.max(400,$(window).height()-250));
            //center image
            $("#coverart").css("margin-left",eval(($("#container").width()-$("#coverart").width())/2)+"px");
            $("#coverart").fadeIn("slow");
    }
    function CenterBody() {
        if($(window).width()<$("#container").width()) {
            $("#centralizer").css("left",eval($("#container").width()/2)+"px");
        }
        else {
            $("#centralizer").css("left","50%");
        }
    }
    function InitMenu() {
        $("#content").show();
        $("#text div").hide();
        $.each($(".button"),function(i,o) {
            $(o).mouseenter(function(){
                $(".underline",this).css("background","#555");
                $("img",this).css("background","#F9F9F9");
            }).mouseleave(function() {
                $(".underline",this).css("background","transparent");
                $("img",this).css("background","transparent");
            }).click(function() {
                 goToPage(i);
            });
        });
        if(document.location.hash) {
            goToPage(document.location.hash.charAt(1));
        }
    }
    function goToPage(index) {
        //this has effect only for the "first click"
        $("#coverart").animate({ opacity: '0' },100, function() {
            $("#coverdiv").slideUp("slow", function() {
                $("#text").fadeIn();
            });
        });
        $("#b"+eval(page)).toggleClass("clicked");
        $("#t"+eval(page)).hide();
        $("#b"+eval(index)).toggleClass("clicked");
        $("#t"+eval(index)).show();
        page = index;
    }