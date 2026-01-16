let searchIndex = [];
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

// carica index.json
fetch("/index.json")
  .then(response => response.json())
  .then(data => {
    searchIndex = data;
  });

// ascolta quello che scrivi
searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  searchResults.innerHTML = "";

  if (query.length < 2) return;

  const results = searchIndex.filter(item =>
    item.title?.toLowerCase().includes(query) ||
    item.content?.toLowerCase().includes(query)
  );

  results.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${item.permalink}">${item.title}</a>`;
    searchResults.appendChild(li);
  });
});

