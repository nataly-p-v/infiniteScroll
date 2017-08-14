var page = 2;
itemsCount = 8;
hasMoreItems = true;
var inProgress = false;



function request() {
  if (inProgress) {
    return;
  }

  inProgress = true;
  $('.spinner').show();
  if (hasMoreItems) {
    $.ajax({
      url: 'list.php?page=' + page + '&per_page=8',
      success: function (data) {
        inProgress = false;
        page++;
        var parsedData = JSON.parse(data);
        // console.log(parsedData);
        displayData(parsedData);
        checkIfOffsetIsLessThen300();
        $('.spinner').hide();
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
    console.log(data.entities[i]);
    buildDom(data.entities[i]).appendTo('.products-list');
  }
  itemsCount = itemsCount + data.entities.length;
  console.log(itemsCount)
  if(data.total == itemsCount){
    hasMoreItems = false;
  }
}

function checkIfOffsetIsLessThen300(){
  var containerOffset = $('.products-list').offset().top;

  var containerHeight = $('.products-list').height();

  var windowHeight = $(window).height();

  var scrollPos = $(window).scrollTop();

  var offset = containerOffset + containerHeight - windowHeight - scrollPos;
  console.log(offset+'offset');
  if (offset < 400) {
    request();
  }
}

$(window).on('scroll', function() {
  checkIfOffsetIsLessThen300();
});

checkIfOffsetIsLessThen300();
