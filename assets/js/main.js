(function () {
  "use strict";

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  function goToHero() { window.scrollTo(0, 0); }
  window.addEventListener("load", goToHero);
  window.addEventListener("pageshow", goToHero);

  var WHATSAPP_NUMBER = "5568992455223";

  function buildWhatsAppHref(message) {
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message || "Olá! Gostaria de agendar uma avaliação para lentes de contato dental.");
  }

  function wireWhatsAppLinks() {
    var links = document.querySelectorAll("[data-wa]");
    links.forEach(function (link) {
      link.setAttribute("href", buildWhatsAppHref(link.getAttribute("data-wa-msg")));
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener");
    });
  }

  function wireRevealAnimations() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window) || items.length === 0) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach(function (el) { observer.observe(el); });
  }

  function wireBeforeAfterSliders() {
    var sliders = document.querySelectorAll("[data-ba-slider]");
    sliders.forEach(function (slider) {
      var beforeWrap = slider.querySelector(".ba-slider__before-wrap");
      var handle = slider.querySelector(".ba-slider__handle");
      var range = slider.querySelector(".ba-slider__range");

      function setPosition(pct) {
        pct = Math.max(0, Math.min(100, pct));
        beforeWrap.style.clipPath = "inset(0 " + (100 - pct) + "% 0 0)";
        handle.style.left = pct + "%";
        range.value = pct;
      }

      range.addEventListener("input", function () {
        setPosition(parseFloat(range.value));
      });

      var dragging = false;

      function pctFromClientX(clientX) {
        var rect = slider.getBoundingClientRect();
        return ((clientX - rect.left) / rect.width) * 100;
      }

      slider.addEventListener("pointerdown", function (e) {
        dragging = true;
        slider.setPointerCapture(e.pointerId);
        setPosition(pctFromClientX(e.clientX));
      });
      slider.addEventListener("pointermove", function (e) {
        if (!dragging) return;
        setPosition(pctFromClientX(e.clientX));
      });
      ["pointerup", "pointercancel", "pointerleave"].forEach(function (evt) {
        slider.addEventListener(evt, function () { dragging = false; });
      });

      setPosition(parseFloat(range.value));
    });
  }

  function wireVideoAutoplay() {
    var videos = document.querySelectorAll("[data-autoplay-inview]");
    if (videos.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      videos.forEach(function (v) { v.setAttribute("preload", "metadata"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var video = entry.target;
          if (entry.isIntersecting) {
            if (video.preload === "none") video.preload = "auto";
            var playPromise = video.play();
            if (playPromise && playPromise.catch) playPromise.catch(function () {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.55 }
    );
    videos.forEach(function (v) { observer.observe(v); });
  }

  function wireSoundToggles() {
    var buttons = document.querySelectorAll("[data-sound-toggle]");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var card = btn.closest(".reveal-card");
        var video = card.querySelector("video");
        video.muted = !video.muted;
        card.classList.toggle("is-unmuted", !video.muted);
        btn.setAttribute("aria-label", video.muted ? "Ativar som" : "Silenciar");
      });
    });
  }

  function wireFooterYear() {
    var el = document.querySelector("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", function () {
    wireWhatsAppLinks();
    wireRevealAnimations();
    wireBeforeAfterSliders();
    wireVideoAutoplay();
    wireSoundToggles();
    wireFooterYear();
  });
})();
