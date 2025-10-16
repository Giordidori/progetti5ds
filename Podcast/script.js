document.addEventListener("DOMContentLoaded", () => {
    const episodes = [
      "Episode 1: Ce lo racconta un'esperto",
    ];
  
    const translations = {
      it: {
        featured: "Episodio in Evidenza",
        allEpisodes: "Tutti gli Episodi",
        settings: "Impostazioni",
        nightMode: "🌙",
        about: "Chi Siamo",
        home: "Giochi storici: il podcast",
        welcome: "Benvenuti al nostro podcast!",
        fontLabel: "Tipo di font",
        languageLabel: "Lingua",
        saveBtn: "Salva"
      },
      en: {
        featured: "Featured Episode",
        allEpisodes: "All Episodes",
        settings: "Settings",
        nightMode: "🌙",
        about: "About Us",
        home: "Retro-games: the podcast",
        welcome: "Welcome to our podcast!",
        fontLabel: "Font type",
        languageLabel: "Language",
        saveBtn: "Save"
      }
    };
  
    const randomIndex = Math.floor(Math.random() * episodes.length);
    const randomEpisode = episodes[randomIndex];
    const randomDiv = document.createElement("div");
    randomDiv.textContent = randomEpisode;
    randomDiv.addEventListener("click", () => highlight(randomDiv));
    document.getElementById("randomEpisode").appendChild(randomDiv);
  
    const episodeList = document.getElementById("episodeList");
    episodes.forEach(ep => {
      const div = document.createElement("div");
      div.textContent = ep;
      div.addEventListener("click", () => highlight(div));
      episodeList.appendChild(div);
    });
  
    function highlight(element) {
      document.querySelectorAll("#episodeList div, #randomEpisode div").forEach(el => {
        el.classList.remove("selected");
      });
      element.classList.add("selected");
    }
  
    const nightBtn = document.getElementById("toggleNightMode");
    nightBtn.addEventListener("click", () => {
      document.body.classList.toggle("night-mode");
    });
  
    const settingsBtn = document.getElementById("settingsBtn");
    const settingsModal = document.getElementById("settingsModal");
    const settingsForm = document.getElementById("settingsForm");
  
    settingsBtn.addEventListener("click", () => {
      settingsModal.classList.toggle("hidden");
    });
  
    settingsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const language = document.getElementById("language").value;
      const font = document.getElementById("fontType").value;
      localStorage.setItem("language", language);
      localStorage.setItem("fontType", font);
      applyPreferences();
      settingsModal.classList.add("hidden");
    });
  
    function applyPreferences() {
      const font = localStorage.getItem("fontType");
      if (font) document.body.style.fontFamily = font;
      applyLanguage();
    }
  
    function applyLanguage() {
      const lang = localStorage.getItem("language") || "it";
      const t = translations[lang];
  
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (t[key]) el.textContent = t[key];
      });
  
      const fontLabel = document.querySelector("label[for='fontType']");
      const langLabel = document.querySelector("label[for='language']");
      if (fontLabel) fontLabel.textContent = t.fontLabel;
      if (langLabel) langLabel.textContent = t.languageLabel;
  
      const saveBtn = document.querySelector("#savePreferences");
      if (saveBtn) saveBtn.textContent = t.saveBtn;
    }
  
    applyPreferences();
  });
  