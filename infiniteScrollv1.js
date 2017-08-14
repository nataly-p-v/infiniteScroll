var page = 2;
var isPageScrolls = false;
var isScrollDown = true;
var itemsCount = 4;
var hasMoreItems = true;

checkIfPageHasScroll();


function request() {
  if (hasMoreItems) {
    $.ajax({
      url: 'list.php?page=' + page,
      success: function (data) {
        page++;
        var parsedData = JSON.parse(data);
        console.log(parsedData);
        displayData(parsedData);
        $('.spinner').hide();
        checkIfPageHasScroll();
      }
    });
  }
}

function buildDom(object) {
  var cost = object.discountCost ? object.discountCost : object.cost;
  var text = object.description + cost;
  if (object.new) {
    text += ' New';
  }
  if (object.discountCost) {
    text += ' Sale';
  }
  return $("<li><img src=" + object.img + ">" + text + "</li>");

}
function displayData(data) {
  for (var i = 0; i < data.entities.length; i++) {
    buildDom(data.entities[i]).appendTo('.products-list');
  }
  itemsCount = itemsCount + data.entities.length;
  console.log(data.total == itemsCount + 'false, то есть данные еще не закончились')
  if (data.total == itemsCount) {
    hasMoreItems = false;
  }
}


function checkIfPageHasScroll() {
  if ($("body").height() > $(window).height()) {
    isPageScrolls = true;
    console.log('у этой страницы есть скролл');
    checkifScrollToporDown();
  } else {
    console.log('у этой страницы нет скролла');
    $('.spinner').show();
    request();
  }


}

function checkifScrollToporDown() {
  var tempScrollTop, currentScrollTop = 0;
  $(window).scroll(function () {
    currentScrollTop = $(this).scrollTop();
    if (tempScrollTop < currentScrollTop && currentScrollTop > 50) {
      console.log('вниз')
      isScrollDown = true;
      $('.spinner').show();
      request();
    }

    else if (tempScrollTop > currentScrollTop) {
      isScrollDown = false;
      $('.spinner').hide();
      console.log('вверх')
    }
    tempScrollTop = currentScrollTop;
  });

};
