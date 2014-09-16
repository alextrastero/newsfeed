var feedreader = {

  filename: null,
  structure: null,
  xmlDoc: null,

  init: function(url, id) {
    this.filename = url;
    this.xmlDoc = this.loadXMLDoc();
    this.structure = this.parseData();
    this.writeHTML(id);
    this.startFeedCarousel();
    this.handleEvents();
  },
  handleEvents: function(){
    var that = this;
    $('.article').hover(function() {
      that.showPopup(this);
    }, function() {
      that.showPopup();
    });
  },

  showPopup: function(elem) {
    if(elem){
      var title = $(elem).find('.article__title').clone();
      var content = $(elem).find('.article__content').clone();
      $('.popup').append(title).append(content);
      $('.popup .article__content').show();
    }else{
      $('.popup').html('');
    }
  },

  parseData: function() {
    var articles = this.xmlDoc.getElementsByTagName("article");
    var html = '<div class="feedreader">';
    for (var i = 0; i < articles.length; i++) {
      html += '<div class="article">';
      var title = articles[i].getElementsByTagName("title")[0].childNodes[0];
      if(title){
        html += '<p class="article__title">' + title.nodeValue + '</p>';
      }
      html += this.imgTag(articles[i].getElementsByTagName("picture")[0].childNodes[0]);
      var content = articles[i].getElementsByTagName("content")[0].childNodes[0];
      if(content){
        html += '<p class="article__content">' + content.nodeValue + '</p>';
        html += '<p class="article__content--short">' + this.truncateText(content.nodeValue) + '</p>';
      }
      html += '</div>';
    };
    html += '</div>';
    return html;
  },

  truncateText: function(text){
    return text.substring(0, 300) + '...';
  },

  writeHTML: function(id){
    document.getElementById(id).innerHTML = this.structure;
  },

  loadXMLDoc: function(){
    if (window.XMLHttpRequest)
      var xhttp = new XMLHttpRequest();
    xhttp.open("GET", this.filename ,false);
    xhttp.send();
    return xhttp.responseXML;
  },

  imgTag: function(img){
    var ret = '';
    if(img){
      ret = '<img class="article__picture" src="' + img.nodeValue + '"/>'
    }
    return ret;
  },
  startFeedCarousel: function(){
    var feedreader = $('.feedreader');
    if(feedreader.length>0){
      var nextHeight = feedreader.children().first().outerHeight(true);
      console.log(nextHeight);
      // var parentHeight = feedreader.parent().outerHeight(true);
      // var finalPosition = height - parentHeight;
      // feedreader.animate({'top': -nextHeight}, 3000, 'linear')
    }
  }
}