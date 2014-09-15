var feedreader = {
  filename: "feed.xml",
  xmlDoc: this.loadXMLDoc,
  structure: this.parseData,

  parseData: function() {
    console.log('parseData');
    var articles = this.xmlDoc.getElementsByTagName("article");
    var html = '<div>';
    for (var i = 0; i < articles.length; i++) {
      var title = articles[i].getElementsByTagName("title")[0].childNodes[0];
      if(title){
        html += '<p class="title">' + title.nodeValue + '</p>';
      }
      html += imgTag(articles[i].getElementsByTagName("picture")[0].childNodes[0]);
      var content = articles[i].getElementsByTagName("content")[0].childNodes[0];
      if(content){
        html += '<p class="content">' + content.nodeValue + '</p>';
      }
    };
    html += '</div>';
    return html;
  },

  writeHTML: function(id){
    console.log('writeHTML');
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