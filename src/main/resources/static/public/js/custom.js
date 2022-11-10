$(document).ready(function(){
    
    $("#menuBtn").click(function(){
        $(".sideGnb").fadeIn(500);
    });
    $(".sideGnb .close").click(function(){
        $(".sideGnb").fadeOut(500);
    });
    
    
    $(".safeOff").on("click",function(){
        $(this).toggleClass("safeOn");
    });
    
    $(".safeOn").on("click",function(){
        $(this).toggleClass("safeOff");
    });
    
    $(".warningOff").click(function(){
        $(this).toggleClass("warningOn");
    });
    
    $(".warningOn").click(function(){
        $(this).toggleClass("warningOff");
    });
    
    $(".dangerOff").click(function(){
        $(this).toggleClass("dangerOn");
    });
    
    $(".dangerOn").click(function(){
        $(this).toggleClass("dangerOff");
    });
    
    $("#con101 button").click(function(){
        $(this).children('.sirensOff').toggleClass("sirensOn");
    });
    
    $("#con101 button").click(function(){
        $(this).children('.sirensOn').toggleClass("sirensOff");
    });
    
    
    $("#con201 button").click(function(){
        $(this).children('.bubble').fadeToggle(10);
    });
        
    $("#con102 ul li > div button").click(function(){
        $(this).toggleClass("on");
    });
    
    $("#con301 li > div button").click(function(){
        $(this).toggleClass("on");
    });
    
    
});