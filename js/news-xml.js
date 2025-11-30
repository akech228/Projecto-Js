// js/news-xml.js

document.addEventListener("DOMContentLoaded", function () {
  loadNewsFromXml();
});

function loadNewsFromXml() {
  // Загружаем файл news.xml
  fetch("data/news.xml")
    .then(function (response) {
      return response.text();          // получаем текст XML
    })
    .then(function (xmlText) {
      // Парсим текст в XML-документ
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(xmlText, "application/xml");

      // Находим все <item>
      var items = xmlDoc.getElementsByTagName("item");

      // Передаём их в функцию, которая построит HTML
      renderNews(items);
    })
    .catch(function (error) {
      console.log("Ошибка загрузки XML:", error);
    });
}

function renderNews(items) {
  var container = document.getElementById("news-list");
  if (!container) return;

  var html = "";

  // items — это коллекция, перебираем по индексу
  for (var i = 0; i < items.length; i++) {
    var item = items[i];

    var title = item.getElementsByTagName("title")[0].textContent;
    var date = item.getElementsByTagName("date")[0].textContent;
    var text = item.getElementsByTagName("text")[0].textContent;

    html +=
      '<article class="news-card">' +
        "<h3>" + title + "</h3>" +
        '<p class="news-date">' + date + "</p>" +
        "<p>" + text + "</p>" +
      "</article>";
  }

  container.innerHTML = html;
}