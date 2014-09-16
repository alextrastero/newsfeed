var feedreader = {

  filename: null,
  structure: null,
  xmlDoc: null,

  init: function(url, id) {
    this.filename = url;
    this.xmlDoc = this.loadXMLDoc();
    this.structure = this.parseData();
    this.writeHTML(id);
  },

  parseData: function() {
    var articles = this.xmlDoc.getElementsByTagName("article");
    var html = '';
    for (var i = 0; i < articles.length; i++) {
      html += '<div class="article">';
      var title = articles[i].getElementsByTagName("title")[0].childNodes[0];
      if(title){
        html += '<p class="title">' + title.nodeValue + '</p>';
      }
      html += this.imgTag(articles[i].getElementsByTagName("picture")[0].childNodes[0]);
      var content = articles[i].getElementsByTagName("content")[0].childNodes[0];
      if(content){
        html += '<p class="content">' + content.nodeValue + '</p>';
      }
      html += '</div>';
    };
    return html;
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
      ret = '<img class="picture" src="' + img.nodeValue + '"/>'
    }
    return ret;
  }
}