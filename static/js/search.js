document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".nav-search-toggle");
  const panel = document.getElementById("nav-search-panel");
  const input = document.getElementById("nav-search-input");
  const resultsBox = document.getElementById("nav-search-results");

  if (!toggle || !panel || !input || !resultsBox) return;

  let searchIndex = [];
  let indexRequest;

  function loadIndex() {
    if (!indexRequest) {
      indexRequest = fetch("/index.json")
        .then(response => response.json())
        .then(data => {
          searchIndex = data;
        })
        .catch(() => {
          searchIndex = [];
        });
    }
    return indexRequest;
  }

  function closeSearch() {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }

  function openSearch() {
    panel.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    loadIndex();
    window.setTimeout(() => input.focus(), 0);
  }

  function renderResults(query) {
    resultsBox.replaceChildren();
    if (query.length < 2) return;

    const language = input.dataset.lang;
    const matches = searchIndex
      .filter(item => !language || item.lang === language)
      .filter(item => {
        const title = (item.title || "").toLowerCase();
        const content = (item.content || "").toLowerCase();
        return title.includes(query) || content.includes(query);
      })
      .slice(0, 8);

    if (!matches.length) {
      const empty = document.createElement("p");
      empty.className = "nav-search-empty";
      empty.textContent = resultsBox.dataset.empty;
      resultsBox.appendChild(empty);
      return;
    }

    matches.forEach(item => {
      const link = document.createElement("a");
      link.href = item.relpermalink || item.url || item.permalink;
      link.textContent = item.title;
      resultsBox.appendChild(link);
    });
  }

  toggle.addEventListener("click", function (event) {
    event.stopPropagation();
    if (panel.hidden) openSearch();
    else closeSearch();
  });

  input.addEventListener("input", function () {
    loadIndex().then(() => renderResults(input.value.trim().toLowerCase()));
  });

  panel.addEventListener("click", event => event.stopPropagation());
  document.addEventListener("click", closeSearch);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeSearch();
      toggle.focus();
    }
  });
});

