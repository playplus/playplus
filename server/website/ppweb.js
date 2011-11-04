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
            $("#coverart").css("margin-left",eval((900-$("#coverart").width())/2)+"px");
            $("#coverart").fadeIn("slow");
    }
    function CenterBody() {
        if($(window).width()<900) {
            $("#centralizer").css("left","450px");
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
                $(this).css("background","#CCC");
            }).mouseleave(function() {
                 $(this).css("background","red");
            }).click(function() {
                 goToPage(i);
            });
        });
        if(document.location.hash) {
            goToPage(document.location.hash.charAt(1));
        }
    }
    function goToPage(index) {
        $("#coverdiv").slideUp("Slow");
        $("#b"+eval(page)).toggleClass("clicked");
        $("#t"+eval(page)).hide();
        $("#b"+eval(index)).toggleClass("clicked");
        $("#t"+eval(index)).show();
        page = index;
    }