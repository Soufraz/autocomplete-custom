var exampleData = '[{"id":10,"img":"autocomplete-custom\/img\/gates.jpg","name":"Bill Gates","info":"Microsoft"},{"id":20,"img":"autocomplete-custom\/img\/jobs.jpg","name":"Steve Jobs","info":"Apple"},{"id":30,"img":"autocomplete-custom\/img\/larry.jpg","name":"Larry Page","info":"Google"},{"id":40,"img":"autocomplete-custom\/img\/mark.jpg","name":"Mark Zuckerberg","info":"Facebook"},{"id":50,"img":"autocomplete-custom\/img\/robert.jpg","name":"Robert Downey Jr","info":"Iron Man"},{"id":60,"img":"autocomplete-custom\/img\/eike.jpg","name":"Eike Batista","info":"Falling"}]';

$.fn.autocomplete = function(options) {

  var _debug    = false; //Dont close result
  var _this     = this; //This element
  var _god      = null //Main div
  var _term     = $(_this).find("input[name=term]"); //Field search
  var _limit    = (options.limit) ? options.limit : 10; //Limit list
  var _showImg  = (options.showImg == false) ? false : true; //Allow viewer of img
  var _showInfo = (options.showInfo == false) ? false : true; //Allow viewer of info

  $(_this).addClass("autocomplete-custom"); //Add style to this element

  //When something is typed
  $(_term).keyup(function(){

    if(options.urlToGetData){
      options.term = $(_term).val();
      _getDataRemote(options.urlToGetData, options);
    }else if(options.dataJson){
      var dataLocal = $.parseJSON(options.dataJson);
      _mountHtml(dataLocal);
    }else{
       var dataExample = $.parseJSON(exampleData);
      _mountHtml(dataExample);
    }

  });

  //Render html
  function _mountHtml(data){

    var god = $("<div>").appendTo(_this).addClass("box-result");
    _god = god;

    var limit = 0;
    $.each( data, function( i, item ) {

      if(limit >= _limit) return false;

      var daddy = $("<div>").prependTo(_god).addClass("box-line").attr("href", item.link);
      if(_showImg == true){
        var firstSon = $("<div>").prependTo(daddy).addClass("img");
        $("<img>").prependTo(firstSon).attr("src", item.img);
      }
      var secondSon = $("<div>").appendTo(daddy).addClass("info");
      if(_showInfo == true){
        $(secondSon).html(item.name + "<span>"+item.info+"</span>");
      }else{
        $(secondSon).html(item.name);
      }

      limit++;

    });
    
    _createClickItem();
    _createClickOut();

    $(_god).show();

  }

  //Create click of each result
  function _createClickItem(){

    $(".autocomplete-custom .box-line").click(function(){
      event.stopPropagation();
      var href = $(this).attr("href");
      window.location.href = href;
    });

  }

  //Create action to close the list result
  function _createClickOut(){

    $('html').click(function() {

      if($(_this).find("div.box-result").html()){
        setTimeout(function(){
          $(_this).find("div.box-result").fadeOut('slow', function() {
            if(_debug == false) $(_this).find("div.box-result").remove();
          });
        }, 1500);
      }

    });
    
  }

  function _getDataRemote(url, allOptions){

    $.ajax({
      url: url,
      type: 'post',
      data: allOptions
      ,success: function (data) {
        $("div.box-result").appendTo(_this).remove();
        _mountHtml(data);
      },error: function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
      }
    }, "json");

  }

};
