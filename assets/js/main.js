/**
 * Template Name: FlexStart
 * Updated: Sep 18 2023 with Bootstrap v5.3.2
 * Template URL: https://bootstrapmade.com/flexstart-bootstrap-startup-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  "use strict";
  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };
  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach((e) => e.addEventListener(type, listener));
    } else {
      select(el, all).addEventListener(type, listener);
    }
  };
  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };
  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);
  /**
   * Scrolls to an element with header offset
   */
  // const scrollto = (el) => {
  //   let header = select("#header");
  //   let offset = header.offsetHeight;
  //   if (!header.classList.contains("header-scrolled")) {
  //     offset -= 10;
  //   }
  //   let elementPos = select(el).offsetTop;
  //   window.scrollTo({
  //     top: elementPos - offset,
  //     behavior: "smooth",
  //   });
  // };
  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 200) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };
    // window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }
  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 200) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }
  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });
  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );
  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();
        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );
  /**
   * Scroll with ofset on page load with hash links in the url
   */
  // window.addEventListener("load", () => {
  //   if (window.location.hash) {
  //     if (select(window.location.hash)) {
  //       scrollto(window.location.hash);
  //     }
  //   }
  // });
  /**
   * Clients Slider
   */
  // new Swiper(".clients-slider", {
  //   speed: 400,
  //   loop: true,
  //   autoplay: {
  //     delay: 5000,
  //     disableOnInteraction: false,
  //   },
  //   slidesPerView: "auto",
  //   pagination: {
  //     el: ".swiper-pagination",
  //     type: "bullets",
  //     clickable: true,
  //   },
  //   breakpoints: {
  //     320: {
  //       slidesPerView: 2,
  //       spaceBetween: 40,
  //     },
  //     480: {
  //       slidesPerView: 3,
  //       spaceBetween: 60,
  //     },
  //     640: {
  //       slidesPerView: 4,
  //       spaceBetween: 80,
  //     },
  //     992: {
  //       slidesPerView: 6,
  //       spaceBetween: 120,
  //     },
  //   },
  // });
  /**
   * Porfolio isotope and filter
   */
  // window.addEventListener("load", () => {
  //   let portfolioContainer = select(".portfolio-container");
  //   if (portfolioContainer) {
  //     // let portfolioIsotope = new Isotope(portfolioContainer, {
  //     //   itemSelector: ".portfolio-item",
  //     //   layoutMode: "fitRows",
  //     // });
  //     // let portfolioFilters = select("#portfolio-flters li", true);
  //     // on(
  //     //   "click",
  //     //   "#portfolio-flters li",
  //     //   function (e) {
  //     //     e.preventDefault();
  //     //     portfolioFilters.forEach(function (el) {
  //     //       el.classList.remove("filter-active");
  //     //     });
  //     //     this.classList.add("filter-active");
  //     //     portfolioIsotope.arrange({
  //     //       filter: this.getAttribute("data-filter"),
  //     //     });
  //     //     aos_init();
  //     //   },
  //     //   true
  //     // );
  //   }
  // });
  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfokio-lightbox",
  });
  /**
   * Portfolio details slider
   */
  // new Swiper(".portfolio-details-slider", {
  //   speed: 400,
  //   autoplay: {
  //     delay: 5000,
  //     disableOnInteraction: false,
  //   },
  //   pagination: {
  //     el: ".swiper-pagination",
  //     type: "bullets",
  //     clickable: true,
  //   },
  // });
  /**
   * Testimonials slider
   */
  // new Swiper(".testimonials-slider", {
  //   speed: 600,
  //   loop: true,
  //   autoplay: {
  //     delay: 5000,
  //     disableOnInteraction: false,
  //   },
  //   slidesPerView: "auto",
  //   pagination: {
  //     el: ".swiper-pagination",
  //     type: "bullets",
  //     clickable: true,
  //   },
  //   breakpoints: {
  //     320: {
  //       slidesPerView: 1,
  //       spaceBetween: 40,
  //     },
  //     1200: {
  //       slidesPerView: 3,
  //     },
  //   },
  // });
  /**
   * Animation on scroll
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", () => {
    aos_init();
  });
  /**
   * Initiate Pure Counter
   */
  new PureCounter();
})();
var target_date = new Date("2024-02-15 09:00:00".replace(/-/g, "/")).getTime(); // set the countdown date
var days, hours, minutes, seconds; // variables for time units
getCountdown();
if (document.getElementById("calendar-days")) {
  console.log("setting calendar timer");
  setInterval(function () {
    getCountdown();
  }, 1000);
}
function getCountdown() {
  if (!document.getElementById("calendar-days")) {
    return;
  }
  // find the amount of "seconds" between now and target
  var current_date = new Date().getTime();
  var seconds_left = (target_date - current_date) / 1000;
  days = pad(parseInt(seconds_left / 86400));
  seconds_left = seconds_left % 86400;
  hours = pad(parseInt(seconds_left / 3600));
  seconds_left = seconds_left % 3600;
  minutes = pad(parseInt(seconds_left / 60));
  seconds = pad(parseInt(seconds_left % 60));
  var daysSection = document.getElementById("calendar-days");
  daysSection.innerHTML = "<span>" + days + "</span>";
  var hoursSection = document.getElementById("calendar-hours");
  hoursSection.innerHTML = "<span>" + hours + "</span>";
  var minSection = document.getElementById("calendar-mins");
  minSection.innerHTML = "<span>" + minutes + "</span>";
  var secSection = document.getElementById("calendar-secs");
  secSection.innerHTML = "<span>" + seconds + "</span>";
}
function pad(n) {
  return (n < 10 ? "0" : "") + n;
}
let contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let name = document.getElementById("contact-name");
    let mobile = document.getElementById("contact-mobile");
    let email = document.getElementById("contact-email");
    let subject = document.getElementById("contact-subject");
    let message = document.getElementById("contact-message");
    console.log(name, email, subject, message);
    if (name.value == "" || email.value == "") {
      alert("Please enter all required fields!");
    } else {
      // perform operation with form input
      console.log(
        `This form has a name of ${name.value} and email of ${email.value}`
      );
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("mobile", email.mobile);
      formData.append("email", email.value);
      formData.append("subject", subject?.value);
      formData.append("message", message.value);
      const response = await fetch("https://api.smileandhra.in/api/contact", {
        method: "POST",
        body: formData,
      });
      const res_obj = await response.json();
      const msgStatus = res_obj.success ? "sent-message" : "error-message";
      console.log(msgStatus);
      const responseElement = document.getElementsByClassName(msgStatus);
      responseElement[0].classList.add("d-block");
      const myTimeout = setTimeout(() => {
        responseElement[0].classList.remove("d-block");
      }, 5000);
      name.value = "";
      mobile.value = "";
      email.value = "";
      if (subject?.value) {
        subject.value = "";
      }
      message.value = "";
    }
  });
}
let registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let firstname = document.getElementById("register-firstname");
    let lastname = document.getElementById("register-lastname");
    let enterprise = document.getElementById("register-enterprise");
    let investor_name = document.getElementById("register-investor_name");
    let college_name = document.getElementById("register-college_name");
    let startup_name = document.getElementById("register-startup_name");
    let msme = document.getElementById("register-msme");
    let role = document.getElementById("register-role");
    let mobile = document.getElementById("register-mobile");
    let email = document.getElementById("register-email");
    let problem_statement = document.getElementById(
      "register-problem_statement"
    );
    let technology_stage = document.getElementById("register-technology_stage");
    let website_link = document.getElementById("register-website_link");
    console.log(firstname, email, lastname);
    let termsAccepted = false;
    if (
      !(
        document.getElementById("checkBox1")?.checked &&
        document.getElementById("checkBox2")?.checked &&
        document.getElementById("checkBox3")?.checked &&
        document.getElementById("checkBox4")?.checked
      )
    ) {
      alert("Please accept all terms and conditions.");
      return;
    } else if (
      firstname.value == "" ||
      mobile.value == "" ||
      (enterprise?.value == "" &&
        investor_name?.value == "" &&
        college_name?.value == "" &&
        startup_name?.value == "" &&
        msme?.value == "")
    ) {
      alert("Please enter all required fields!");
      return;
    } else {
      // perform operation with form input
      const formData = new FormData();
      formData.append("firstname", firstname.value);
      formData.append("lastname", lastname.value);
      formData.append("role", role?.value);
      formData.append("mobile", mobile?.value);
      formData.append("problem_statement", problem_statement?.value);
      formData.append("technology_stage", technology_stage?.value);
      formData.append("email", email.value);
      formData.append("enterprise", enterprise?.value);
      formData.append("investor_name", investor_name?.value);
      formData.append("college_name", college_name?.value);
      formData.append("startup_name", startup_name?.value);
      formData.append("msme", msme?.value);
      formData.append("website_link", website_link?.value);
      formData.append("gst", gst?.value);
      let application_type = "";
      if (enterprise?.value) {
        application_type = "ENTERPRISE";
      } else if (investor_name?.value) {
        application_type = "INVESTOR";
      } else if (college_name?.value) {
        application_type = "COLLEGE";
      } else if (startup_name?.value) {
        application_type = "STARTUP";
      } else if (msme?.value) {
        application_type = "MSME";
      }
      formData.append("application_type", application_type);
      localStorage.setItem("application_type", application_type);
      const response = await fetch("https://api.smileandhra.in/api/register", {
        method: "POST",
        body: formData,
      });
      // const res_obj = await response.json();
      await response.json().then((res_obj) => {
        firstname.value = "";
        lastname.value = "";
        role.value = "";
        mobile.value = "";
        if (problem_statement?.value) {
          problem_statement.value = "";
        }
        if (technology_stage?.value) {
          technology_stage.value = "";
        }
        website_link.value = "";
        gst.value = "";
        email.value = "";
        if (enterprise?.value) {
          enterprise.value = "";
        }
        if (investor_name?.value) {
          investor_name.value = "";
        }
        if (college_name?.value) {
          college_name.value = "";
        }
        if (startup_name?.value) {
          startup_name.value = "";
        }
        if (msme?.value) {
          msme.value = "";
        }
        localStorage.setItem("Registrationdetails", JSON.stringify(res_obj));
        if (res_obj.success) {
          const msgStatus = "sent-message";
          const responseElement = document.getElementsByClassName(msgStatus);
          responseElement[0].classList.add("d-block");
          window.location.href = "payment_redirect.html";
        } else {
          const msgStatus = "error-message";
          const responseElement = document.getElementsByClassName(msgStatus);
          responseElement[0].classList.add("d-block");
          const myTimeout = setTimeout(() => {
            responseElement[0].classList.remove("d-block");
          }, 5000);
        }
      });
    }
  });
}
