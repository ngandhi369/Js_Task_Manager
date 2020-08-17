$(window).ready(function() {

    $('#a2').addClass('animate__animated animate__slideInDown');
    document.getElementById("a2").style.setProperty('--animate-duration', '1.5s');

    $('#f1').addClass('animate__animated animate__slideInUp');
    document.getElementById("f1").style.setProperty('--animate-duration', '1.5s');

    $('#b1').addClass('animate__animated animate__bounceIn');
    document.getElementById("b1").style.setProperty('--animate-duration', '1.5s');


    setTimeout(() => {
        $('#a1').fadeToggle(1500, function() {
            $('#a1').text("Welcome to To-Do Project");
            $('#a1').fadeToggle(700);
        });
    }, 1300);

    $('#button-info').click(function() {
        mt1.style.display = "block";
        $('#button-info').hide(800, function() {
            $('#c1').hide(700);
        });

    });

    $(window).scroll(function() {

        var p = $(document).scrollTop();
        console.log("s:" + p);
        if (p >= 136 && p <= 240) {
            $('#button-info').addClass('animate__animated animate__swing animate__infinite');
        }
    })
    
})
