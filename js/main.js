var ulPattern = document.querySelectorAll('ul.pattern li a')
var optionColor = document.getElementById('option-color');
var particlesColor = document.getElementById('particles-color');
var dayNight = document.querySelector('.dark-light');
var imgColor = document.querySelectorAll('.imgColor');


var colorImg = localStorage.getItem("imgColor");
var colorItem = localStorage.getItem("cssColor");
var jsSrc = localStorage.getItem("jsColor");
var bgColor = localStorage.getItem("bgColor");

// Permet de récupérer les couleurs choisies lors de la visite précédente
window.addEventListener('load', function () {
    setTimeout(function () {
        $(".loader").fadeOut();
        new Typewriter('#typewriter', {
            strings: ['Un Développeur Web.', 'Front-End de préférence.'],
            autoStart: true,
            loop: true,
        });
    }, 200);

    // Charge le bon link stylesheet
    var optionColor = $("#option-color").attr("href");
    var it = 0;
    if (!colorItem) {
        $("#option-color").attr("href", "css/color5.css");
        imgColor.forEach((b) => {
            it = it + 1;
            b.setAttribute("src", "img/" + it + "-color5.svg");
        })
    } else {
        $("#option-color").attr("href", colorItem);
        imgColor.forEach((b) => {
            it = it + 1;
            b.setAttribute("src", "img/" + it + "-" + colorImg + ".svg");
        })
    }

    // Charge le bon script
    var newScript = document.createElement('script');
    $("#particles-color").remove();
    newScript.id = "particles-color";
    newScript.src = jsSrc;
    document.body.appendChild(newScript);

    // Charge le bon background-color            
    if (bgColor === "light") {
        document.body.classList.add(bgColor);
    }

    if (document.body.classList.contains('light')) {
        dayNight.querySelector('i').classList.add('fa-moon')
    } else {
        dayNight.querySelector('i').classList.add('fa-sun')
    }
})


// Permet de mettre les couleurs du menu et effets background de la couleur choisie
ulPattern.forEach((a) => {
    a.addEventListener('click', function () {
        var nameClass = a.getAttribute('class');
        optionColor.setAttribute('href', "css/" + nameClass + ".css");
        var it = 0;
        // Permet de changer la couleur des images
        imgColor.forEach((b) => {
            var i = a.getAttribute("src")
            it = it + 1;
            b.setAttribute("src", "img/" + it + "-" + nameClass + ".svg");
        })
        $('#particles-color').remove();
        var newScript = document.createElement('script');
        newScript.id = "particles-color";
        if (document.body.classList.contains("light")) {
            newScript.src = "js/appLight-" + nameClass + ".js";
        } else {
            newScript.src = "js/appDark-" + nameClass + ".js";
        }
        document.body.appendChild(newScript);

        localStorage.setItem("imgColor", nameClass);
        var srcScript = newScript.getAttribute('src');
        localStorage.setItem("jsColor", srcScript);
        var hrefLink = optionColor.getAttribute('href');
        localStorage.setItem("cssColor", hrefLink);
    })
})


// Permet de mettre en mode jour / nuit + localStorage
dayNight.addEventListener('click', function () {
    dayNight.querySelector('i').classList.toggle("fa-sun");
    dayNight.querySelector('i').classList.toggle("fa-moon");
    document.body.classList.toggle("light");
    $('#particles-color').remove();
    var newScript = document.createElement('script');
    newScript.id = "particles-color";
    if (document.body.classList.contains('light')) {
        ulPattern.forEach((a) => {
            const nameClass = a.getAttribute('class');
            if (optionColor.getAttribute('href') === "css/" + nameClass + ".css") {
                newScript.src = "js/appLight-" + nameClass + ".js"
            }
        })
        document.body.appendChild(newScript);
        localStorage.setItem("bgColor", "light");
    } else {
        ulPattern.forEach((a) => {
            const nameClass = a.getAttribute('class');
            if (optionColor.getAttribute('href') === "css/" + nameClass + ".css") {
                newScript.src = "js/appDark-" + nameClass + ".js"
            }
        })
        document.body.appendChild(newScript);
        localStorage.setItem("bgColor", "");
    }
    var srcScript = newScript.getAttribute('src');
    localStorage.setItem("jsColor", srcScript);
})


// Texte qui s'écrit à l'infini
new Typewriter('#typewriter', {
    strings: ['Développeur Web.', 'Chat.'],
    autoStart: true,
    loop: true,
});


// Permet de savoir sur quel menu la personne a cliqué
$('#menu li a').on('click', function () {
    $('#menu li a').removeClass('active')
    $(this).addClass('active');
    var id = $(this).attr('href');
    $('main').children().removeClass('active');
    $('main').children(id).addClass('active');
})


// Bouton ">" du carousel
$(".next-page").on('click', function () {
    if ($('#menu > li a.active').attr('href') !== "#skills") {
        $('#menu > li a.active').each(function () {
            $(this).parents('li').next('li').children('a').each(function () {
                $(this).addClass('active');
                var id = $(this).attr('href');
                $('main').children().removeClass('active');
                $('main').children(id).addClass('active');
            })
            $(this).removeClass('active');
        })
    } else {
        $('#menu li a').removeClass('active');
        $('main').children().removeClass('active');
        $('#menu > li:first-child a, main section:first-child').addClass('active');
    }
})

// Boutin "<" du carousel
$(".prev-page").on('click', function () {
    if ($('#menu > li a.active').attr('href') !== "#particles-js") {
        $('#menu > li a.active').each(function () {
            $(this).parents('li').prev('li').children('a').each(function () {
                $(this).addClass('active');
                var id = $(this).attr('href');
                $('main').children().removeClass('active');
                $('main').children(id).addClass('active');
            })
            $(this).removeClass('active');
        })
    } else {
        $('#menu li a').removeClass('active');
        $('main').children().removeClass('active');
        $('#menu > li:last-child a, main section:last-child').addClass('active');
    }
})

// Permet de bouger de menu avec le scroll
$(window).bind('mousewheel', function (event) {
    if (event.originalEvent.wheelDelta >= 0) {
        if ($('#menu > li a.active').attr('href') !== "#particles-js") {
            $('#menu > li a.active').each(function () {
                $(this).parents('li').prev('li').children('a').each(function () {
                    $(this).addClass('active');
                    var id = $(this).attr('href');
                    $('main').children().removeClass('active');
                    $('main').children(id).addClass('active');
                })
                $(this).removeClass('active');
            })
        } else {
            $('#menu li a').removeClass('active');
            $('main').children().removeClass('active');
            $('#menu > li:last-child a, main section:last-child').addClass('active');
        }
    }
    else {
        if ($('#menu > li a.active').attr('href') !== "#skills") {
            $('#menu > li a.active').each(function () {
                $(this).parents('li').next('li').children('a').each(function () {
                    $(this).addClass('active');
                    var id = $(this).attr('href');
                    $('main').children().removeClass('active');
                    $('main').children(id).addClass('active');
                })
                $(this).removeClass('active');
            })
        } else {
            $('#menu li a').removeClass('active');
            $('main').children().removeClass('active');
            $('#menu > li:first-child a, main section:first-child').addClass('active');
        }
    }
});

// Permet d'afficher la div pour les couleurs et de gérer le display / class
$("#spin-button").on('click', function () {
    $("#palette-color").toggleClass('visible');
    if (($("#palette-color").attr('class') === "visible") && ($("#palette-color").css('display') === "none")) {
        $("#palette-color").css('display', 'block');
    } else if (($("#palette-color").attr('class') === "") && ($("#palette-color").css('display') === "none")) {
        $("#palette-color").addClass('visible');
    }
})


// Permet de fermer la palette si on clique ailleurs sur la page
$(document).on('click', function (e) {
    if (e.target.id !== "spinner") {
        $("#palette-color").hide();
    } else {
        $("#palette-color").show();
    }
})


// Permet de réduire le menu de gauche
var hideButton = document.getElementById("hideMenu");
$("#hideMenu").on('click', function () {
    $("#header").toggleClass('active');
    $(".item").toggleClass('retract');
    hideButton.querySelector('i').classList.toggle("fa-angle-double-left");
    hideButton.querySelector('i').classList.toggle("fa-angle-double-right");
})

// Owl carousel formations
$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
})

// Owl carousel work
$('.owl-carousel-work').owlCarousel({
    loop: false,
    margin: 10,
    nav: false,
    dots: false,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
})


const ratio = 0.1;
const options = {
    root: null,
    rootMargin: '0px',
    threshold: ratio
}

// Animation Progress bar
var itération = 0;
const handleRatio = function (entries, observer) {
    entries.forEach(function (entry) {
        if (entry.intersectionRatio > ratio) {
            var progressBar = document.querySelectorAll('.progress-bar');
            progressBar.forEach((bar) => {
                itération = itération + 1;
                var text = bar.getAttribute("data-transitiongoal");
                $(".progress-bar" + itération).animate({
                    width: text + "%"
                }, 500);
                observer.unobserve(entry.target)
            })
        }
    })
}
const obs = new IntersectionObserver(handleRatio, options);
obs.observe(document.querySelector('.stop'));


// Animation images
const handleIntersect = function (entries, observer) {
    entries.forEach(function (entry) {
        if (entry.intersectionRatio > ratio) {
            entry.target.classList.add('reveal-visible');
            // observer.unobserve(entry.target)
        } else {
            entry.target.classList.remove('reveal-visible');
        }
    })
}
const observer = new IntersectionObserver(handleIntersect, options);

document.querySelectorAll('.reveal').forEach(function (r) {
    observer.observe(r);
})