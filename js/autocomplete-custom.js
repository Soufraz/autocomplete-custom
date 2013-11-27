var exampleData = '[{"id":10,"img":"img\/gates.jpg","name":"Bill Gates","info":"Microsoft"},{"id":20,"img":"img\/jobs.jpg","name":"Steve Jobs","info":"Apple"},{"id":30,"img":"img\/larry.jpg","name":"Larry Page","info":"Google"},{"id":40,"img":"img\/mark.jpg","name":"Mark Zuckerberg","info":"Facebook"},{"id":50,"img":"img\/robert.jpg","name":"Robert Downey Jr","info":"Iron Man"},{"id":60,"img":"img\/eike.jpg","name":"Eike Batista","info":"Falling"}]';

$.fn.autocomplete = function(options) {

  var _this = this; //This element
  var _god  = null; //Main div
  var _term = $(_this).find("input[name=term]"); //Field search

  $(_this).addClass("autocomplete-custom"); //Add style to this element

  $(_term).keyup(function(){

    $(_god).remove();

    if(options.urlToGetData){
      _getDataRemote(options.urlToGetData);
    }else if(options.dataJson){
      var dataLocal = $.parseJSON(options.dataJson);
      _mountHtml(dataLocal);
    }else{
      var dataExample = $.parseJSON(exampleData);
      _mountHtml(dataExample);
    }

  });

  $(_term).focusout(function(){
    $(_god).remove();
  });

  function _mountHtml(data){

    var god = $("<div>").appendTo(_this).addClass("box-result");
    _god = god;

    $.each( data, function( i, item ) {
      var daddy = $("<div>").prependTo(_god).addClass("box-line");
      var firstSon = $("<div>").prependTo(daddy).addClass("img");
      $("<img>").prependTo(firstSon).attr("src", item.img);
      var secondSon = $("<div>").appendTo(daddy).addClass("info");
      $(secondSon).html(item.name + "<span>"+item.info+"</span>");
    });
    
    $(_god).fadeIn();

  }

  function _getDataRemote(url){

    $.getJSON( url )
    .done(function( data ) {
      _mountHtml(data);
    })
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
    });

  }

};