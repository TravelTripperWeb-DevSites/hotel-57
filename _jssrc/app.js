//fallback ready document
function readyDoc(fn) {
  var d = document;
  (d.readyState == 'loading') ? d.addEventListener('DOMContentLoaded', fn): fn();
}

// Blog category filter

document.ready(() => {
  const optionFilter = document.getElementById('js-categoryfilter');
  if (optionFilter) {
    filterSetup(optionFilter);
  }


  function displayItems(filterValue, allItems) {
    const filteredItems = allItems.filter(image => image.getAttribute('data-filter') === filterValue);
    const hiddenItems = allItems.filter(image => image.classList.contains('hidden'));

    document.getElementById("catDes_"+filterValue).style.display= "block";

    if (filterValue === 'all') {
      hiddenItems.forEach((image) => {
        fade(image, 'in', 500);
      });
    } else {
      allItems.forEach((image) => {
        image.classList.add('hidden');
      });


      filteredItems.forEach((image) => {
        fade(image, 'in', 500);
      });
    }
  }

  function filterSetup(filter) {
    const allItems = [].slice.call(
      document.getElementsByClassName('filter-item'),
    );
    let filterValue;
    function getUrlVars() {
      let vars = {};
      let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
      });
      return vars;
    }

    if (getUrlVars()["c"]) {
      const cat = getUrlVars()["c"];
      const categoryOptions = [].slice.call(document.getElementById('js-categoryfilter').getElementsByTagName("option"));
      categoryOptions.forEach((option) => {
        option.removeAttribute("selected");
        if (option.value === cat) {
          option.setAttribute("selected", true);
        }
        displayItems(cat, allItems);
      });
    }

    filter.onchange = function(event) {
      displayItems(event.target.value, allItems);
    }
  }

});

// End of blog category filter

readyDoc(function() {

  //remove html tags from offers short description
  setTimeout(function() {
    var shortDesc = document.querySelectorAll(".c-offer__short-description");
    for(var i = 0; i < shortDesc.length; i++) {
      shortDesc[i].innerHTML = shortDesc[i].innerText;
    }
  }, 3000);

  // Prevent Double Click on ipad and iphone devices
  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    var elements = document.getElementsByClassName('btn--secondary');
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener('touchend', function() {});
    }
  }

  //Footer Accordion Menu
  function toggleDocs(event) {
    if (window.innerWidth <= 768 && event.target && event.target.className == 'accordion') {
      var next = event.target.nextElementSibling;
      if (next.style.display == "block") {
        next.style.display = "none";
      } else {
        next.style.display = "block";
      }
    }
  }
  document.addEventListener('click', toggleDocs, true);

  // Home page banner carousel
  if (document.getElementsByClassName("banner-carousel")[0]) {
    var bannerSlider = tns({
      container: '.banner-carousel',
      "items": 1,
      "mouseDrag": true,
      "swipeAngle": false,
      "speed": 400,
      navContainer: "#bannerSlider",
      prevButton: "#bannerSliderPrev",
      nextButton: "#bannerSliderNext",
    });
  }

  setTimeout(function() {
    // Rooms carousel
    if (document.getElementsByClassName("room-item")[0]) {
      var roomDetailsSlider = tns({
        container: '.room-item',
        "items": 1,
        "mouseDrag": true,
        "swipeAngle": false,
        "speed": 400,
        navContainer: "#roomSlider",
        prevButton: "#roomSliderPrev",
        nextButton: "#roomSliderNext"
      });
    }
  }, 4000);

  setTimeout(function() {

    if (document.getElementsByClassName("rooms-slider")[0]) {
      var roomSlider = tns({
        container: '.rooms-slider',
        "items": 1,
        "mouseDrag": true,
        "swipeAngle": false,
        "speed": 400,
        "loop": false,
        onInit: function(){
          let navSlides = document.querySelectorAll(".rooms-carousel .nav-slide span");
          for(let i=0; i<navSlides.length; i++) {
            navSlides[i].setAttribute("tabindex", -1);
          }
        },
        // "autoHeight": true,
        navContainer: "#roomSlider",
        prevButton: "#roomSliderPrev",
        nextButton: "#roomSliderNext"
      });
    }
    // Rooms carousel
    if (document.getElementsByClassName("content-slider")[0]) {
      var roomsContentSlider = tns({
        container: '.content-slider',
        "items": 1,
        "mouseDrag": true,
        "swipeAngle": false,
        "speed": 400,
        navContainer: "#roomsSlider",
        prevButton: "#roomsSliderPrev",
        nextButton: "#roomsSliderNext"
      });
    }
    // Rooms carousel
    if (document.getElementsByClassName("images-slider")[0]) {
      var roomsimagesSlider = tns({
        container: '.images-slider',
        "items": 1,
        "mouseDrag": false,
        "swipeAngle": false,
        "speed": 400,
        "controls": false,
        "nav": false,
      });

      roomsContentSlider.events.on("indexChanged", function() {
        var roomsContentSliderInfo = roomsContentSlider.getInfo();
        var currentSlide = roomsContentSliderInfo.index;
        var totalSlides = roomsContentSliderInfo.slideCount;
        var gotoSlide = currentSlide - 1;

        if (totalSlides == gotoSlide) {
          currentSlide = 0;
        }
        if (0 == gotoSlide) {
          currentSlide = 1;
        } //
        // console.log(gotoSlide);
        // console.log(totalSlides);
        roomsimagesSlider.goTo(gotoSlide);
      });
    }

  }, 2200)





  var allpopLink = document.querySelectorAll('.open-modalbox');
  for (var i = 0; i < allpopLink.length; i++) {
    allpopLink[i].addEventListener('click', function(e) {
      e.preventDefault();
      openModelbox(e);
    });
  }

  var allpopLinkClose = document.querySelectorAll('.modalbox__close-icon');
  for (var i = 0; i < allpopLinkClose.length; i++) {
    allpopLinkClose[i].addEventListener('click', function(e) {
      closeModelbox(e);
    });
  }


});

// modalbox open/close code
function openModelbox(e) {
  if (e.target.dataset.target) {
    var lighBoxEl = document.getElementById(e.target.dataset.target);
    if (lighBoxEl && lighBoxEl.classList.contains('modalbox')) {
      setTimeout(function() {
        lighBoxEl.style.display = "flex";
        lighBoxEl.style.opacity = 1;
        if(e.target.dataset.video) {
          lighBoxEl.querySelector("iframe").setAttribute("src", e.target.dataset.video);
          lighBoxEl.querySelector("iframe").setAttribute("allow", "autoplay");
        }
      }, 200);
    }
  }
}
var allpopLink = document.querySelectorAll('.open-modalbox');
for (var i = 0; i < allpopLink.length; i++) {
  allpopLink[i].addEventListener('click', function(e) {
    e.preventDefault();
    openPopup(e);
  });
}

function closeModelbox(e) {
  e.preventDefault();
  e.target.closest('.modalbox').style.opacity = 0;
  setTimeout(function() {
    e.target.closest('.modalbox').style.display = 'none';
    if (e.target.closest('.modalbox').querySelector('video')) {
      e.target.closest('.modalbox').querySelector('video').pause();
      e.target.closest('.modalbox').querySelector('video').currentTime = 0;
    }

    if (e.target.closest('.modalbox').querySelector('iframe')) {
      e.target.closest('.modalbox').querySelector('iframe').setAttribute("src", "");
    }

  }, 700);

}

//eof modalbox poup
