const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    let tl = gsap.timeline();  // tl IS THE TIMELINE

    tl.from("#nav", {
        y: "-10",
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay:-1,
        stagger: .2 // AGAR ELEMENTS KE BEECH BHI DELAY CHAHIYE TOH stagger USE KARTE HAI (READ MORE ABOUT IT)
    })
    .from("#herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}

firstPageAnim()

// JAB MOUSE MOVE HO TOH HUM LOG SKEW KAR PAAYE AUR MAXIMUM SKEW AND MINIMUM SKEW DEFINE KAR PAAYE YA SET KAR PAAYE
// JAB MOUSE MOVE HO TOH CHAPTA KI VALUE BADHE, AUR JAB MOUSE CHALNA BANDD HO JAATE TOH CHAPTA HATA LO

var timeout; // AB MOUSE JAB RUKK RAHA HAI TAB WOH SKEWED HI REH JAA RAHA HAI BAHOT BAAR, TOH ISS PROBLEM KO SOLVE KARNE KE LIYE HAMNE YEH VARIABLE USE KIYA HAI

function circleSkew(){
    // DEFINE DEFAULT SCALE VALUES
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(details){
        clearTimeout(timeout); // YEH HAMNE LIKHA KYOKI AGAR HAM MOUSE STOP KARTE HAI AUR USI TIME INTERVAL MEIN PHIRSE MOUSE CHALA DE, TOH PICHLE WAALE KA IMPACT NEXT PE NA PADE 
        var xdiff = (details.clientX - xprev) / window.innerWidth;
        var ydiff = (details.clientY - yprev) / window.innerHeight;

        xscale = gsap.utils.clamp(0.8, 1.2, 1 + xdiff);
        yscale = gsap.utils.clamp(0.8, 1.2, 1 + ydiff);


        xprev = details.clientX;
        yprev = details.clientY;

        circleMouseFollower(xscale, yscale);
        timeout = setTimeout(function(){
            const minicircle = document.querySelector("#minicircle");
            minicircle.style.transform = `translate(${details.clientX - 5}px, ${details.clientY - 5}px) scale(1, 1)`
        },100)
    });
}

circleSkew()

function circleMouseFollower(xscale,yscale){
    const minicircle = document.querySelector("#minicircle");
    window.addEventListener("mousemove", function(details){
        minicircle.style.transform = `translate(${details.clientX - 5}px, ${details.clientY - 5}px) scale(${xscale}, ${yscale})`
    });
}

circleMouseFollower()

/* TEENO ELEMENT KO SELECT KARO, USKE BAAD TEENO PAR EK MOUSEMOVE LAGAO, 
   JAB MOUSEMOVE HO TOH YEH PATA KARO KI MOUSE KAHA HAI, 
   JISKA MATLAB HAI MOUSE KI x AND y POSITION PATA KARO, 
   AB MOUSE KI x y POSITION KE BADLE USS IMAGE KO SHOW KARO AND USS IMAGE KO MOVE KARO,
   MOVE KARTE WAQT ROTATE KARO, AND JAISE JAISE MOUSE TEZZ CHALE WAISE WAISE ROTATION BHI TEZZ HO JAAYE
*/

// NOTE:- querySelectorAll RETURNS A NODELIST

document.querySelectorAll(".elem").forEach(function(e) {
    var rotate = 0;
    var diffrot = 0;
    var prevX = 0; 

    e.addEventListener("mousemove", function(details) {
        var diff = details.clientY - e.getBoundingClientRect().top;
        diffrot = details.clientX - prevX;
        prevX = details.clientX; 

        gsap.to(e.querySelector("img"), {
            opacity: 1,
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5) // HERE MULTIPLICATION (i.e., 0.5) DECIDES THE AMPLITUDE OF THE ROTATION 
        });
    });

    e.addEventListener("mouseleave", function() {
        gsap.to(e.querySelector("img"), {
            opacity: 0,
            ease: Power3.easeInOut,
            duration: 0.5,
        });
    });
});
