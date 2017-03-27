//  cps school locator
//  web services

//  Thanks to Derek Eder (derekeder.com) for his fusion table template and coding examples.

//FT searches
  var searchPolyAttendance  = null;
  var searchSafePassage     = null;
  var searchLSCBoundary     = null;
  var searchZip             = null;

  // 2016-17 School Data and Ratings merged with 2016 Comparison Data

  var fusionTableId         = "1vLkJOXC4YSlzRyNCoEzJMZJkvykTYd1ohPz2rf8f" ;  //SchoolDataMerged_March2017 // new owner
  var LSCdistrictsTableId   = "12DTXu4VYBd7mW-2rBPlClAwXNMMuwnHSvSKRbsZe" ;  // LSC boundaries 2016
  var NetworksTableId       = "1pPqntpZutIHOGjrmgtQBmewcRPS9ylKB2UE6CsE" ;
  var CommunityTableId      = "1uhe1AW1OkXnOUeG8GJHjv4HjlSQD860pRHI-iws" ;
  var ZipcodeTableId        = "1uv4fLfrGKW52CJfOSFCiS8-H9ESqlRM1WB-XGgM" ;
  var SafePassageTableID    = "1rMgHR1PraC3BUDoYgxlmukEUuFqTZVoRsoHnzOgG" ;  //  2016 // new owner
  var CHattendanceTableId   = "1VjPpibBwSQofLDVc9bJglve1shJnJ4aedwtJKNbZ" ;  //  2016
  var ESattendanceTableId   = "1nk2zVa4Nff9MlV5txIkjHbB_XXF0uaXXaVem6bf-" ;  //  2016
  var MSattendanceTableId   = "1zv2fI3v0CxkRIrn-AYujwXq1ljcq6uGOtyGYlN8F" ;  //  2016
  var HSattendanceTableId   = "1NXIcj0Eo65MNv-wczBoEMcovlsIJ1p66CfeP8JFV" ;  //  2016
  var ILhouseTableId        = "1lvfheusomCd7Sh72GvFn23JVDQFhoNYQuUGI_JOQ" ;  //  2016
  var ILsenateTableId       = "1H7my_qI1_hNeMuqUJcYhBUWzCjvdaJeBaiV6CkCk" ;  //  2016
  var UScongTableId         = "1xaQnriJ9YuF9wqj_lnk_OPVeOnYb4NEYMt-b71WO" ;  //  2016
  var WardsTableId          = "1vKuFogOwwJ2YdXOVHLxbqy6Uc7ILpIbRePGK2GoD" ;  //  2016
  var TiersTableId          = "15h06grWef2iXU8i-2PtXoy_-DnSb5EglVA7ImMNt" ;  //  2016 // new owner



  var SafePassage ;
  var CHattendance ;
  var ESattendance ;
  var MSattendance ;
  var HSattendance ;
  var Networks ;
  var Community ;
  var Wards ;
  var Zipcode ;
  var Tiers ;
  var ILhouse ;
  var ILsenate ;
  var UScong ;
  var transitLayer ;
  var bikeLayer ;

  var map;
  var geocoder;
  var addrMarker;
  var addrMarkerImage       = 'images/yellow-pin-lg.png';
  var markersArray          = [];   // advancedsearch marker array
  var compareArray          = [];   // radius marker array
  var markersArrayNetwork   = [];   // the numbered markers in the network overlay
  var searchRadius          = 1609; // in meters,2414=1.5miles 1609=1 mile, 804=1/2 mile
  var recordName            = "school";
  var recordNamePlural      = "schools";
  var searchRadiusCircle    = null;
  var searchtype            = null; // url, ecp, address, radius, school, zip, advancedsearch
  var icontype              = null; // Performance Rating marker switch
  var infowindow            = null; // new google.maps.InfoWindow();
  var infoWindowsas         = null; // search all schools infowindow
  var zipcodeboundary       = null; // for passing the zip
  var geoaddress            = null; // geocoded pin placement address
  var radiusLoc             = null;
  var googleAPIkey          = getGoogleAPIkey();
  var googleAPIurl          = "https://www.googleapis.com/fusiontables/v1/query";
  var APIurl                = "http://localhost/SchoolProfile/dataservice.asmx";
  var arrayforautocomplete =[];
  var allschoolsdataHome = null;
  var allschoolsdata  = null;
  var homeD = null;
  var allD = null;
  var StreetViewLoc = null;
  var panorama = null;
  var chicago;
  var multiBoundaryArray = [];
  var addressQtype = "";
  var currentTier = "";
  //schools with mulitple boundaries
  //var multiBoundaryArray = ["609694","609716","609727","609741","609756","609772","609779","609812",
  //                          "609833","609883","609887","609928","609935","610002","610142","610218","610345","610543"];


  var filtersForDisplay  = [];

function initializeMap() {
   SafePassage           = new google.maps.FusionTablesLayer(SafePassageTableID);
   CHattendance          = new google.maps.FusionTablesLayer(CHattendanceTableId);
   ESattendance          = new google.maps.FusionTablesLayer(ESattendanceTableId);
   MSattendance          = new google.maps.FusionTablesLayer(MSattendanceTableId);
   HSattendance          = new google.maps.FusionTablesLayer(HSattendanceTableId);
   Networks              = new google.maps.FusionTablesLayer(NetworksTableId);
   Community             = new google.maps.FusionTablesLayer(CommunityTableId);
   Wards                 = new google.maps.FusionTablesLayer(WardsTableId);
   Zipcode               = new google.maps.FusionTablesLayer(ZipcodeTableId);
   Tiers                 = new google.maps.FusionTablesLayer(TiersTableId);
   ILhouse               = new google.maps.FusionTablesLayer(ILhouseTableId);
   ILsenate              = new google.maps.FusionTablesLayer(ILsenateTableId);
   UScong                = new google.maps.FusionTablesLayer(UScongTableId);
   transitLayer          = new google.maps.TransitLayer();
   bikeLayer             = new google.maps.BicyclingLayer();
  //$.getJSON('http://jsonip.com/?callback=?', function(r){ console.log(r.ip); });

  // has to happen after google maps api
  // $.getScript( "scripts/fusiontips.js" ).done(function( script, textStatus ) {
  //       initTiers();
  //     })
  //     .fail(function( jqxhr, settings, exception ) {
  //       console.log("Tier Overlay hover disabled");
  //   });

  clearMapElements(); // clears all the elements on the map
  clearMapFilters();  // set up the filters - radio buttons and checkboxes
  icontype = "gradecategory"; // resets the icons


  $("#autocomplete").val("");
  if(!isMobile()) {$('#collapseButtons').collapse('show');}
  $("#divDetailContainer").collapse('hide');
  $('#tblCompare tbody tr').remove();
  $("#divCompareContainer").collapse('hide');

  adjustResultsHeight();

  //$("#lnkRating").html('<span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span> School Ratings');

  // style the map
  var mapStyle = [
    {
    "stylers": [
      //{ "visibility": "simplified" }
      ]
    },{
      "featureType": "road",
      "stylers": [
      { "saturation": -100 },
      { "visibility": "simplified" }
      ]
    },{
    "featureType": "road.highway",
    "stylers": [
      { "lightness": 10 }
    ]
    },{
    "featureType": "poi",
    "stylers": [
      { "saturation": -50 }
      ]
    },{
      "featureType": "water",
      "stylers": [
      //{ "saturation": -10 }
      ]
    },{ "featureType": "landscape",
      "stylers": [
      { "saturation": -100 }
      ]
    }
  ];


    geocoder                      = new google.maps.Geocoder();
    chicago                       = new google.maps.LatLng(41.88, -87.68);
      var myOptions = {
        styles:                   mapStyle,
        zoom:                     11,
        center:                   chicago,
        disableDefaultUI:         true,
        scrollwheel:              true,
        navigationControl:        true,
        panControl:               false,
        scaleControl:             true,
        zoomControl:              false,
        mapTypeControl:           true,
        zoomControlOptions: {
              style: google.maps.ZoomControlStyle.SMALL,
              position: google.maps.ControlPosition.RIGHT_BOTTOM//LEFT_CENTER
              },
        mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              position: google.maps.ControlPosition.RIGHT_BOTTOM
              },
        //HORIZONTAL_BAR
        //DROPDOWN_MENU
        //navigationControlOptions: {style: google.maps.NavigationControlStyle.LARGE },
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      map = new google.maps.Map($("#map_canvas")[0], myOptions);


      //hold mouse down for 1.5 seconds to trigger radius search
      new LongPress(map, 1500);
      google.maps.event.addListener(map, 'longpress', function(event) {
        //console.log(event.latLng);
        addrFromLatLng(event.latLng, "longpress");
      });



      // adusts results height if the map is resized
      // google.maps.event.addListener(map, 'bounds_changed', function() {
      //     adjustResultsHeight();
      //     console.log("bounds changed")
      // });

      queryForAutocomplete();  //populate the Autocomplete list
      //encodeQueryPhil("GetDistinctSchoolNames", createAutocompleteArrayPhil);
}

// LongPress on the map calls the
// thanks to stackoverflow - Leiko
// http://stackoverflow.com/questions/6264853/using-longclick-taphold-with-google-maps-in-jquery-mobile
function LongPress(map, length) {
  this.length_ = length;
  var me = this;
  me.map_ = map;
  me.timeoutId_ = null;
  google.maps.event.addListener(map, 'mousedown', function(e) {
    me.onMouseDown_(e);
  });
  google.maps.event.addListener(map, 'mouseup', function(e) {
    me.onMouseUp_(e);
  });
  google.maps.event.addListener(map, 'drag', function(e) {
    me.onMapDrag_(e);
  });
}

LongPress.prototype.onMouseUp_ = function(e) {
  clearTimeout(this.timeoutId_);
};

LongPress.prototype.onMouseDown_ = function(e) {
  clearTimeout(this.timeoutId_);
  var map = this.map_;
  var event = e;
  this.timeoutId_ = setTimeout(function() {
    google.maps.event.trigger(map, 'longpress', event);
  }, this.length_);
};

LongPress.prototype.onMapDrag_ = function(e) {
  clearTimeout(this.timeoutId_);
};


function getGoogleAPIkey() {
  var pageurl = top.location.href;
  if(pageurl.indexOf("file:///") >=0) {
    return ("AIzaSyDBgH1Z_xKIjf1FVwvexUWfW-2FEhUjvF8"); //Local
  }else{
    return ("AIzaSyDPyV9JDVE0rLOHBiN4npwdhsm53GBiMuk"); //Production
  }
}


// set up the boxes and radio buttons for filtering
function clearMapFilters() {
  // close the open accordians
  $('#filteraccordion .panel-collapse.in').collapse('hide');

  $("#st1").prop("checked", false);   //elem
  $("#st2").prop("checked", false);   //middle
  $("#st3").prop("checked", false);   //high
  $("#st4").prop("checked",  false);      //neighborhood
  $("#st5").prop("checked",  false);      //charter
  $("#st6").prop("checked",  false);      //citywide
  $("#st7").prop("checked",  false);      //magnet
  $("#st8").prop("checked",  false);      //regional gifted
  $("#st9").prop("checked",  false);      //selective enrollment
  $("#st10").prop("checked", false);      //classical
  $("#st11").prop("checked", false);      //contract
  $("#st12").prop("checked", false);      //special ed
  $("#st13").prop("checked", false);  //Rating Level 1+
  $("#st14").prop("checked", false);  //Rating Level 1
  $("#st15").prop("checked", false);  //Rating Level 2+
  $("#st16").prop("checked", false);  //Rating Level 2
  $("#st17").prop("checked", false);  //Rating Level 3
  $("#st18").prop("checked", false);  //Rating No Data

  $("#pt00").prop("checked", true);   //Programs Offered OFF
  $("#pt01").prop("checked", false);
  $("#pt02").prop("checked", false);
  $("#pt03").prop("checked", false);
  $("#pt04").prop("checked", false);
  $("#pt05").prop("checked", false);
  $("#pt06").prop("checked", false);
  $("#pt07").prop("checked", false);
  $("#pt08").prop("checked", false);
  $("#pt09").prop("checked", false);
  $("#pt10").prop("checked", false);
  $("#pt11").prop("checked", false);
  $("#pt12").prop("checked", false);
  $("#pt13").prop("checked", false);
  $("#pt14").prop("checked", false);
  $("#pt15").prop("checked", false);
  $("#pt16").prop("checked", false);
  $("#pt17").prop("checked", false);
  $("#pt18").prop("checked", false);
  $("#pt19").prop("checked", false);
  $("#pt20").prop("checked", false);
  $("#pt21").prop("checked", false);
  $("#pt22").prop("checked", false);
  $("#pt23").prop("checked", false);
  $("#pt24").prop("checked", false);
  $("#pt25").prop("checked", false);
  $("#pt26").prop("checked", false);
  $("#pt27").prop("checked", false);
  $("#pt28").prop("checked", false);
  $("#pt29").prop("checked", false);
  $("#pt30").prop("checked", false);
  $("#pt31").prop("checked", false);
  $("#pt32").prop("checked", false);
  $("#pt33").prop("checked", false);
  $("#pt34").prop("checked", false);
  $("#pt35").prop("checked", false);
  $("#pt36").prop("checked", false);
  $("#pt37").prop("checked", false);
  $("#pt38").prop("checked", false);
  $("#pt39").prop("checked", false);
  $("#pt40").prop("checked", false);
  $("#pt41").prop("checked", false);
  $("#pt42").prop("checked", false);

  $("#abType1").prop("checked", false);     //elem
  $("#abType2").prop("checked", false);     //mid
  $("#abType3").prop("checked", false);     //high
  $('#abType4').prop('checked', true);      //off
  $("#abType5").prop("checked", false);     //elem network
  $("#abType6").prop("checked", false);     //high network
  $("#abType7").prop("checked", false);     //community
  $("#abType8").prop("checked", false);     //wards
  $("#abType9").prop("checked", false);     //zipcode
  $("#abType10").prop("checked", false);    //cps tiers
  $("#abType11").prop("checked", false);    //il house
  $("#abType12").prop("checked", false);    //il senate
  $("#abType13").prop("checked", false);    //us cong
  $("#abType15").prop("checked", false);    //charters
  $("#abType16").prop("checked", false);    //safe passage
  $("#abType17").prop("checked", false);    //transit
  $("#abType18").prop("checked", false);    //bike

}


// ID  Uniqueid  Location  Lat Long  School  Address City  Zip Phone Grades  BoundaryGrades  GradesLong
// Type  Typenum Classification  Boundary  Marker  Polygon ProgramType Rating
// Count Growth Attainment Culture SpecialEdCount Mobility Dress PSAE ISAT ACT ADA College

// Runs after the map is initialized
// Populate the autocomplete array and the multiBoundaryArray
function queryForAutocomplete(){
 var query = "SELECT School, Zip, Classification, ProgramType, ID FROM " + fusionTableId ;
 encodeQuery(query, createAutocompleteArray);
}


// not used
// uses web service to encode
function encodeQueryPhil(q,sf) {
  var encodedQuery = encodeURIComponent(q);
  var url = [APIurl];
  url.push('/' + encodedQuery);
  url.push('?callback=?');
  //console.log(url.join(''));
  $.ajax({
    url: url.join(''),
    dataType: "jsonp",
    success: sf,
    error: function () {alert("AJAX ERROR for " + q ); }
  });
}

// not used
function createAutocompleteArrayPhil(d) {

  if( d != null ) {

  // console.log(d[1].SchoolName);
  // console.log(d[1].Zip);
  // console.log(d.length);

    var ulist     = d;
    var ulistlength = d.length;

    for (var i = 0; i< ulistlength; i++) {

      var sname   = (d[i].SchoolName);
      var szipp   = (d[i].Zip);
      //var sname   = (ulist[i][0]);
      //var szipp   = (ulist[i][1]);
      //var sclas   = (ulist[i][2]);
      //var sprog   = replacePipes(ulist[i][3]);

      arrayforautocomplete.push(sname);
      arrayforautocomplete.push(szipp);
      //arrayforautocomplete.push(sclas);
      //arrayforautocomplete.push(sprog);
    }


  }else{//nothing returned
    alert("The list of schools for autocomplete could not be loaded.");
  }

  //sort_and_unique(arrayforautocomplete);
  initAutocomplete();
  searchfromurl();
}


// create array for autocomplete
function createAutocompleteArray(d) {
  if( d.rows != null ) {
    var multiBoundaryArrayHolder = [];
    var arrayforautocompleteHolder = [];
    var ulist     = d.rows;
    var ulistlength = d.rows.length;

    for (var i = 0; i < ulistlength; i++) {

      var sname   = (ulist[i][0]);
      var szipp   = (ulist[i][1]);
      var ssid    = (ulist[i][4]);
      //var sclas   = (ulist[i][2]);
      //var sprog   = replacePipes(ulist[i][3]);

      arrayforautocompleteHolder.push(sname);
      arrayforautocompleteHolder.push(szipp);
      //arrayforautocomplete.push(sclas);
      //arrayforautocomplete.push(sprog);
      multiBoundaryArrayHolder.push(ssid);
    }


  }else{//nothing returned
    alert("The list of schools for autocomplete could not be loaded.");
  }
  multiBoundaryArray = return_duplicates(multiBoundaryArrayHolder);
  //console.log(multiBoundaryArray);

  arrayforautocomplete = sort_and_unique(arrayforautocompleteHolder);

  initAutocomplete();
  searchfromurl();
}


// initialize Autocomplete
function initAutocomplete() {
  $( "#autocomplete" ).autocomplete({
    appendTo: "#form-group",
    source: arrayforautocomplete,

      focus: function( event, ui ) { // autocomplete result is focused on
                $("#autocomplete").val( ui.item.value );
                return false;
          },
      select: function ( event, ui ) { // autocomplete result is selected
              //event.preventDefault();
              $("#autocomplete").val( ui.item.value );
              searchInputField();
          },
      close: function ( event, ui ) {
         //$("#autocomplete").val("" );
          //console.log("close");
          },
      search: function ( event, ui ) {
         //console.log($("#autocomplete").val());
         //console.log("search");
          },
      open: function() {
        //$('.ui-autocomplete').css('width','300px');
        //$('.ui-autocomplete').css('margin-left','70px');
        //$('.ui-autocomplete').css('height','300px');
          },
      change: function() {
        //$('.ui-autocomplete').css('width','300px');
        //$('.ui-autocomplete').css('margin-left','70px');
        //$('.ui-autocomplete').css('height','300px');
          }

    });
}


// Runs after the autocompleteArray is created
// Looks at URL for ? and determines what to display
// From Profile pages, URL search:  ?Schools=610212;609848;609774;609695
// From Early Childhood:            ?ECP // ECP is deprecated
// From external sites (HS Bound)   ?Address=1234+N+Western+Chicago+IL+60622&Type=HS/ES
// To show all schools in district  ?Address=
function searchfromurl() {

  var pageurl = top.location.href
  var x = pageurl.split('?')[1];
  if(x === "ECP"){ // Early Childhood Program
    $('#ECPmodal').modal('show');
    return;
  }
//debugger;
  if(x != undefined){
    var addressLable = x.split('=')[0];   // Address or Schools
    var b = x.split('=')[1];              // 1234+N+Western&Type or 610212;609848;609774;609695

    if(addressLable === "Address") {
      var addressContent = b.split('&')[0]; // 1234+N+Western
      var c = x.split('&')[1];              // Look for &Type=HS/ES

      if( c != undefined){
        var typeContent = c.split('=')[1];  // HS/ES
        if(typeContent === "HS"){
          addressQtype="HS";
          _trackClickEventWithGA("Search", "URL", "Address-HS");
        }
        if(typeContent === "ES"){
          addressQtype="ES";
          _trackClickEventWithGA("Search", "URL", "Address-ES");
        }
        // otherwise Type="" and all neihborhood schools will be displayed.
        var addressContent = addressContent.replace(/\+/g, " ");
        $("#autocomplete").val(addressContent);
        searchInputField();
        return;

      }else{ //Address=
        _trackClickEventWithGA("Search", "URL", "Address-All");
        var addressContent = addressContent.replace(/\+/g, " ");
        $("#autocomplete").val(addressContent);
        searchInputField();
        return;
      }
    }

    if(addressLable === "Schools") {
      if(b != undefined){
        var schoollist = [];
        b = b.split(';');
        for(var i = 0; i < b.length; i++){
          schoollist.push(b[i]);
        }

        if(schoollist.length ===1) {
          // url search with one result - change to school search
          _trackClickEventWithGA("Search", "URL", "Profile Page: "+schoollist);
          searchtype = "school";
        }else{
          _trackClickEventWithGA("Search", "URL", "Profile Comparison: "+schoollist);
          // url search with more than one result
          searchtype = "url";
        }
        // whereClause = filterSchools();
        var query = "SELECT ID, School, Address, City, Phone, Type, Classification, BoundaryGrades, Grades, Boundary, Uniqueid,"+
        " Zip, Marker, Typenum, ProgramType, Lat, Long, Rating, "+
        " Count, Growth, Attainment, Culture, Graduation, Mobility, Dress, Reading, Math, ACT, ADA, College "+
        " FROM " + fusionTableId + "   WHERE ID IN (" + schoollist + ")"; // + whereClause;
        encodeQuery(query, resultListBuilder);
      }
    }
  }else{
    // not a url search
    startTour();
  }
}

// determines what type of search based on input
function searchInputField() {

  clearMapElements();
  clearMapFilters();

  //school names are uppercase
  var theInput = $.trim( $("#autocomplete").val().toUpperCase() );

  if(theInput != "") {
    // check if the value is found in the autocomplete array
    // autocompleteArray has school names and zipcodes
    if ($.inArray(theInput, arrayforautocomplete) !== -1) {

      if(theInput.lastIndexOf("60", 0) === 0) {
        _trackClickEventWithGA("Search", "Zipcode", theInput);
        zipcodeSearch(theInput);
        return;
      } else {
        _trackClickEventWithGA("Search", "School Name", theInput);
        schoolSearch(theInput)
        return;
      }


    } else { //  value is not in the array

      // console.log("input is not in the autocomplete: " + theInput)
      // starts with a number?  // address search?
      if(/^\d.*/.test(theInput)) {
        // check if value is a zip without any schools in the zipcode's boundary
        // if so treat it like a radius search
        // zipcodes without schools are not in the autocompleteArray
        if(theInput.lastIndexOf("606", 0) === 0 && theInput.length == 5 ){
          _trackClickEventWithGA("Search", "Zipcode w/o schools", theInput);
          searchtype = "radius";
          addrFromInputField(theInput);
          return;
        } // it's not a zip w/o a school, it's an address
        _trackClickEventWithGA("Search", "Address", theInput);
        searchtype = "address";
        addressSearch(theInput);
        return;

      } else {
        // doesn't start with a number
        // treat it like a radius search
        searchtype = "radius";
        addrFromInputField(theInput);
        return;
      }

    }

  } else { // input empty
    // click on the Magnifying Glass with nothing in the input
    // triggers a "show all schools"
    searchtype = "advancedsearch";
    advancedsearch();
    return;

    // alert("Please enter a school name, zipcode, or an address.");
    // clearMapElements();
    // return;
  }

  // encodeQuery(query, resultListBuilder);


  //  RegExp.escape = function (text) {
  //  return text.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&amp;");
  //  }
}



// called when user selects a filter and clicks the Update button
function filteredSearch() {
  if (searchtype == "zip") {
    var theInput = $.trim( $("#autocomplete").val().toUpperCase() );
    zipcodeSearch(theInput);
  } else if (searchtype == "radius") {
      $("#filterresults").collapse("hide");
    radiusSearch();
  } else if (searchtype == "advancedsearch") {
      $("#filterresults").collapse("hide");
    advancedsearch();
  } else if (searchtype == "url") {
    advancedsearch();
  } else if (searchtype == "ecp") {
    advancedsearch();
  }
}


// single school search
function schoolSearch(theInput) {
  searchtype = "school";
  var query = "SELECT ID, School, Address, City, Phone, Type, Classification, BoundaryGrades, Grades, Boundary, Uniqueid,"+
                    " Zip, Marker, Typenum, ProgramType, Lat, Long, Rating, "+
                    " Count, Growth, Attainment, Culture, Graduation, Mobility, Dress, Reading, Math, ACT, ADA, College "+
                    " FROM " + fusionTableId + " WHERE School = '" + theInput + "'";
  encodeQuery(query, resultListBuilder);
}


// zip code search
function zipcodeSearch(theInput) {
  deleteOverlays();
  if (searchZip != null){
    searchZip.setMap(null);
  }
    searchzip = null;
  //clearMapElements();
  searchtype = "zip";
  zipcodeboundary = theInput;
  var whereClause = filterSchools();
  var query = "SELECT ID, School, Address, City, Phone, Type, Classification, BoundaryGrades, Grades, Boundary, Uniqueid,"+
                    " Zip, Marker, Typenum, ProgramType, Lat, Long, Rating, "+
                    " Count, Growth, Attainment, Culture, Graduation, Mobility, Dress, Reading, Math, ACT, ADA, College "+
                    " FROM " + fusionTableId + " WHERE Zip = '" + theInput + "'" + whereClause;

  encodeQuery(query, resultListBuilder);
}


// an address search displays the neighborhood elementary, middle, and high school
// that person living at the address can attend
// filtering is not enabled for an address search
function addressSearch(theAddress) {
  var address = theAddress;
  if (address != "" ) {
    if (address.toLowerCase().indexOf("chicago, illinois") == -1) {
      address = address + " chicago, illinois";
    }
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        geoaddress = (results[0].formatted_address);
        map.setCenter(results[0].geometry.location);
        radiusLoc = results[0].geometry.location;
        map.setZoom(14);
        if (addrMarker) { addrMarker.setMap(null); }
        addrMarker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: map,
          icon: addrMarkerImage,
          animation: google.maps.Animation.DROP,
          title: geoaddress
        });
        //_trackClickEventWithGA("Search", "Address", geoaddress);
        //_trackClickEventWithGA("Search", "Address", theAddress);
        map.panTo(addrMarker.position);
        positionMarkersOnMap();
        whereClause = " WHERE "
        whereClause += "Boundary = 'Attendance Area School' ";
        if (addressQtype==="HS") {
          whereClause += " AND Typenum = 3 "; //HS
        }
        if (addressQtype==="ES") {
          whereClause += " AND Typenum IN (1,2) "; //ES and MS
        }
        whereClause += " AND ST_INTERSECTS('Polygon', CIRCLE(LATLNG"+results[0].geometry.location.toString() + "," + .00001 + "))";
        whereClause += " ORDER BY 'School'";
        var query = "SELECT ID, School, Address, City, Phone, Type, Classification, BoundaryGrades, Grades, Boundary, Uniqueid,"+
                          " Zip, Marker, Typenum, ProgramType, Lat, Long, Rating, "+
                          " Count, Growth, Attainment, Culture, Graduation, Mobility, Dress, Reading, Math, ACT, ADA, College "+
                          " FROM " + fusionTableId + whereClause;
        //console.log(query);
        //encodeQuery(query, resultListHomeSchool);
        encodeQuery(query, resultListBuilder);


      } else {//geocoder status not ok
        alert("We could not find your address: " + status);
      }
    });
  } else {//didn't enter an address
    alert("Please enter an address.");
  }
  //  if( $( window ).width() > 480 ) {
  //   map.panTo(addrMarker.position);
  //   map.panBy(-calcPinLocation(), 0);
  // }
}


// radius search displays schools within a radius
// filtering takes place
function radiusSearch() {

  deleteOverlays();

  searchtype = "radius";
  var address = geoaddress;

  if (address != "") {

    //console.log(addrMarker.position)
    //console.log(radiusLoc);
    $("#btnSearchRadius").hide();
    $("#btnShowFilters").show();
    // remove the address search results in order to not have
    // 2 of the same compare button ids
    $("#resultListPoly").html("");

    getSearchRadius();
    drawSearchRadiusCircle(radiusLoc);
    map.panTo(radiusLoc);
    positionMarkersOnMap();
    var whereClause = filterSchools();
    //whereClause += " AND ST_INTERSECTS('Lat', CIRCLE(LATLNG" +  addrMarker.position.toString() + "," + searchRadius + "))";
    whereClause += " AND ST_INTERSECTS('Lat', CIRCLE(LATLNG" +  radiusLoc.toString() + "," + searchRadius + "))";
    whereClause += " ORDER BY 'School'";
    var query = "SELECT ID, School, Address, City, Phone, Type, Classification, BoundaryGrades, Grades, Boundary, Uniqueid,"+
                          " Zip, Marker, Typenum, ProgramType, Lat, Long, Rating, "+
                          " Count, Growth, Attainment, Culture, Graduation, Mobility, Dress, Reading, Math, ACT, ADA, College "+
                          " FROM " + fusionTableId + " WHERE Lat not equal to '' " + whereClause ;
    encodeQuery(query, resultListBuilder);

  } else {//fail
    alert("Search failed. Please reset the map and try again.");
  }
}



// query to get the tier of the current address and display it in the results panel
function getTiers(a) {
  if (!a) {return}
  var tw = " WHERE ST_INTERSECTS('geometry', CIRCLE(LATLNG"+a.toString() + "," + .00001 + "))";
  var qw = "SELECT 'Tier 2016' FROM " + TiersTableId + tw;
  encodeQuery(qw, sendTier);

}

function sendTier(d) {
  if( d.rows != null ) {
   currentTier = d.rows[0];
   var currentTierText = '<br /><span style="color: #EBED72; font-size:12px;">Tier '+currentTier+'</span>';
   $("#txtTierLoc").html( currentTierText );
  }

}

function advancedsearch() {
  //searchtype = "advancedsearch";
  if (markersArray.length > 0) {
    var schoollist = [];
    for (i in markersArray) {
      theVal = markersArray[i].schoolid;
      if($.inArray(theVal, schoollist) == -1) {
        schoollist.push(markersArray[i].schoolid);
      }

    }
  }

  whereClause = filterSchools();
  if (markersArray.length > 0) {
    // ECP and URL searches - filter through list of schools
    var query = "SELECT ID, School, Address, City, Phone, Type, Classification, BoundaryGrades, Grades, Boundary, Uniqueid,"+
                            " Zip, Marker, Typenum, ProgramType, Lat, Long, Rating, "+
                            " Count, Growth, Attainment, Culture, Graduation, Mobility, Dress, Reading, Math, ACT, ADA, College "+
                            " FROM " + fusionTableId + " WHERE ID IN (" + schoollist + ")" + whereClause;
  } else {
    // All other searches - filter all schools
    var query = "SELECT ID, School, Address, City, Phone, Type, Classification, BoundaryGrades, Grades, Boundary, Uniqueid,"+
                            " Zip, Marker, Typenum, ProgramType, Lat, Long, Rating, "+
                            " Count, Growth, Attainment, Culture, Graduation, Mobility, Dress, Reading, Math, ACT, ADA, College "+
                            " FROM " + fusionTableId + " WHERE ID NOT EQUAL TO '' " + whereClause;
  }
    // clear previous markers from the screen but keep them in the arroy
    clearOverlays();
    _trackClickEventWithGA("Search", "Advanced Search", filtersForDisplay.toString() );
    encodeQuery(query, resultListBuilder);
}



// not used
function setadvancedsearch() {

  clearMapElements();
  searchtype = "advancedsearch";
  //clear out the autocomplete
  $("#autocomplete").val("");
  advancedsearch();
}




// marker on map is clicked
// pass row, whether it's a dupe, and value of true to indicate a markerclick
function markerClick(map, m, ifw) {
  return function() {
    _trackClickEventWithGA("Click", "Marker on Map", m.name);
    autoopeninfoAllSchools(m.rowid, m.dupe, true);
    $("#divDetailContainer").collapse('show');
    $("#divResultsContainer").collapse('hide');
    //toggledetail( m.uid );
  };
}



////////////////////////////////////////////////////////////////////////////////////
function resultListBuilder(d) {

  // close the tour if it is open
  // needs to happen before the resultslist is built
  if(hopscotch.getCurrTour() ){
    hopscotch.endTour();
  }


  if( d.rows != null ) {
    getTiers(radiusLoc);
    allD = d;
    allschoolsdata = allD.rows;
    var rows = allD.rows;
    var numRows = allD.rows.length;
    var row_countarray = [];  //
    var row_uidarray = [];    // for address search polygon display

    var latlngbounds = new google.maps.LatLngBounds(); // check
    if (searchPolyAttendance != null) {  // clear for display of home polygons
      searchPolyAttendance.setMap(null);
      }
      if (searchLSCBoundary != null) {
        searchLSCBoundary.setMap(null);
      }
    var results = "";

    for (var i = 0; i < numRows; i++) { //start loop to build marker
      infoWindowsas = new google.maps.InfoWindow();
      var pt = replacePipes(rows[i][14]);
      var lat = (rows[i][15]);
      var lng = (rows[i][16]);
      var position = new google.maps.LatLng(lat, lng);
      var ratinglevel = (rows[i][17]);
          if (ratinglevel == "Level 1+")        { var perfimage2 = 'images/Level_1a'; }
            else if (ratinglevel == "Level 1")  { var perfimage2 = 'images/Level_1'; }
            else if (ratinglevel == "Level 2+") { var perfimage2 = 'images/Level_2a';}
            else if (ratinglevel == "Level 2")  { var perfimage2 = 'images/Level_2';}
            else if (ratinglevel == "Level 3")  { var perfimage2 = 'images/Level_3';}
            else if (ratinglevel == "Inability to Rate" ) {var perfimage2 = 'images/Level_NA';
            } else {
              var perfimage2 = 'images/Level_NA';
          }
      var perfimage = perfimage2 + '.png'
      var perfimagelg = perfimage2 + '_lg.png';
      var imagesm = 'images/' + rows[i][12] + '.png';
      var imagelg = 'images/' + rows[i][12] + '_lg.png';

      if(icontype == "gradecategory") {
        var image = imagesm;
      }else{
        var image = perfimage;
      }


      var marker = new google.maps.Marker({
        position: position,
        rowid: i,
        schoolid : rows[i][0],
        name : rows[i][1],
        address : rows[i][2] + ", " + rows[i][3] + ", " + rows[i][11],
        phone : rows[i][4],
        type : rows[i][5],
        classif : rows[i][6],
        gradesb : rows[i][7],
        grades : rows[i][8],
        boundary : rows[i][9],
        uid : rows[i][10],
        typenum: rows[i][13],
        rating: rows[i][17],

        stcount: rows[i][18],
        growth: rows[i][19],
        attainment: rows[i][20],
        culture: rows[i][21],
        graduation: rows[i][22],
        mobility: rows[i][23],
        dress: rows[i][24],
        reading: rows[i][25],
        math: rows[i][26],
        ACT: rows[i][27],
        ADA: rows[i][28],
        college: rows[i][29],

        pt : pt,
        icon: image,
        map: map,

        imagesm: imagesm,
        imagelg: imagelg,
        perfimage: perfimage,
        perfimagelg: perfimagelg,
        addresssmall: rows[i][2],
        dupe: isDupe(rows[i][0]) // true = multiple boundaries
      });

      latlngbounds.extend(position);
      var fn = markerClick(map, marker, infoWindowsas);
      google.maps.event.addListener(marker, 'click', fn);

      //if( searchtype == "radius" ){
      	//markersArrayRadius.push(marker);
      //}else{
      	markersArray.push(marker);
      //}

      //var sname = rows[i][2];
      //var sadd = rows[i][3];
      var stype = rows[i][5];
      //var suid = rows[i][13];
      var sgrad = rows[i][7] + "*";
      if (sgrad == "*") {
        sgrad = rows[i][8];
      }
      //console.log(sgrad.indexOf("_"));
      if (sgrad.indexOf("_") != -1 ) {
        sgrad = sgrad.substring(1);
      }


      var linkcolor = getLinkColor(stype);


      // build the results div row by row
      // containing div has function autoopeninfoAllSchools passing the rowid and
      // if the school contains multiple boundaries (dupe=true)
      // containing div also toggles between results view and detail view and
      // tracks the school name of the row that is clicked with google analytics
      results += "" +
      //"<div id='resultList"+marker.uid+"' class='container-fluid resultsrow' style='cursor:pointer;'  onclick='"+detailLink+"(" +i+ "); toggledetail(" +marker.uid+ "); '>" +
      "<div id='resultList"+marker.uid+"' class='container-fluid resultsrow' style='cursor:pointer;'  onclick='autoopeninfoAllSchools(" +i+ ","+marker.dupe+", false); toggledetail(" +marker.uid+ "); _trackClickEventWithGA(&quot;Click&quot;, &quot;Result List&quot;,&quot;" +marker.name+"&quot;);  '>" +
       "<div class='row' onmouseenter='animatemarker(" +i+ ");' onmouseleave='stopanimatemarker(" +i+ ");'>" +
            "<div class='col-xs-1 ' style='padding-left:7px; padding-right:0px; margin-top:-3px;'><img src='" +marker.imagesm+ "' style='width:14px; height:20px;' /></div>" +
            "<div class='col-xs-1 ' style='padding-left:0px; padding-right:5px; margin-top:-3px;'><button style='color:"+linkcolor+ ";' type='button' class='btn btn-default btn-xs compareHeart' id='btnCompare"+marker.uid+"' onClick='buildCompareRow(" +i+ ")'>";
                //"<i id='btnCompareIcon"+marker.uid+"' class='fa fa-heart-o fa-lg'></i></button></div>" +
          if ($("#closeTR"+marker.uid).length){
            results+=  "<i id='btnCompareIcon"+marker.uid+"' class='fa fa-check-square-o fa-lg'></i></button></div>" ;
          }else{
            results+=  "<i id='btnCompareIcon"+marker.uid+"' class='fa fa-square-o fa-lg'></i></button></div>" ;
          }


      results+= "<div class='col-xs-7 ' style='padding-right:5px; padding-left:0px;' >" +
                "<div style='color:"+linkcolor+ "; ' >"+marker.name+
                "</div>"+
              "</div>" +
            "<div class='col-xs-2 ' style='padding:0; color:"+linkcolor+";'>" +sgrad+"</div>" +
            "<div class='col-xs-1 ' style='padding-left:0px; margin-top:-3px;'><img src='" +marker.perfimage+ "' style='height:20px;' /></div>" +
        "</div>" +
      "</div>" ;

      // "<div class='container-fluid'>" +
      //   "<div class='row' >" +
      //     "<div id='resultListTR"+marker.uid+"' class='collapse resultsrowdetail' >" +
      //       "<div class='resultdetaildiv' id='resultListDetail"+marker.uid+"'>"+

      //       "</div>" +
      //     "</div>" +
      //   "</div>" +
      // "</div>"

      var schoolid = rows[i][0];
      row_countarray.push(schoolid);
      row_uidarray.push(marker.uid);

    }  // end of building results and marker loop



    if (searchtype == "address")  {
      $("#resultListPoly").html(results);
     }else {
      $("#resultList").html(results);
    }

    $("#boundaryAsterisk").html("<span style='font-size:14px; font-weight:bold;'>*</span> Attendance grades within boundary.");


    // build the text for the result count div
    // ex: 20 schools, 1 school with 2 boundaries, 31 schools within 60625
    var newlist = sort_and_unique( row_countarray );
    var nlength = newlist.length;

    var name = recordNamePlural;
    var w = "";
    var r = "" ;

    if (nlength == 1) {
      name = recordName;
    }
    if (searchtype == "address" ) {
       name = "neighborhood schools"
       if(addressQtype !== "" ){
         name = "neighborhood school"
       }
    }



    if (searchtype == "radius" ) {
       r = $("#ddlRadius option:selected").text();
       w = " within ";
    }
    if (searchtype == "zip") {
       r = $.trim( $("#autocomplete").val() );
       w = " within ";
    }
    if (searchtype == "school"){
      if (numRows >1) {
         r = numRows + " boundaries";
         w = " with ";
      }
    }


      // might not be used -check
        // if (searchtype == "advancedsearch" ) {
        //   if(filtersForDisplay.length == 0) {
        //     r="";
        //   }else{
        //    r = "<span style='font-size:.8em;'> ["+filtersForDisplay.toString()+" ] </span>";
        //   }
        //    w = "";
       // }

    // add the filters to the results display
    if(filtersForDisplay.length > 0 && filtersForDisplay != "undefined") {
       var ffd =  "<div style='font-size:.8em; padding-bottom:5px;'> ["+filtersForDisplay.toString()+" ] </div>";
     }else{
      var ffd = "";
     }

    // build the radius selector
    var inputrad = buildRadiusDropDown();

    //build the count row

    if (searchtype !== "address"){
      //var dt = "resultListContainer";
      var dt = "divResultsCollapse";
      var btnid = "btnresultListContainer";
      var resultsbtnid = "btnResults";
      var resultsbtnidchevron = "btnResultsChevron";
    }


    resultcounthtml =  ''+
    '<div class="clearfix">';

    if (searchtype === "radius") {
      resultcounthtml += ""+
      '<div class="col-xs-10" style="padding-right:3px; padding-left:10px;"><h4>' + addCommas(nlength) + ' '  + name + w + inputrad +'</h4>'+ffd+'</div>';
    } else if (searchtype === "school") {
       if (numRows>1) {
        resultcounthtml += '<div class="col-xs-10" style="padding-right:3px; padding-left:10px;"><h4>1 ' + name + w + r +'</h4></div>';
       }else{
        resultcounthtml += '';
      }
    } else {
      resultcounthtml += ""+
      '<div class="col-xs-10" style="padding-right:3px; padding-left:10px;"><h4>' + addCommas(nlength) + ' '  + name + w + r +'</h4>'+ffd+'</div>';
    }

    resultcounthtml += '' +
      '<div class="col-xs-2" style="padding-left:0px;padding-right:5px; text-align:center;" ><button type="button" id="'+resultsbtnid+'" class=""  '+
        'style="margin-top:3px;" data-toggle="collapse" data-target="#'+dt+'" '+
        'onclick="javascript:chevronClick(&quot;'+resultsbtnidchevron+'&quot;);"  ' +
        'aria-expanded="false" aria-controls="'+dt+'">' +
        // '<span class="fa-stack fa-2x">' +
        //   '<i class="fa fa-circle fa-stack-2x"></i>'+
        //   '<i id="'+resultsbtnid+'Chevron" class="fa fa-angle-double-up fa-stack-1x fa-inverse"></i>'+
        // '</span>'+
        // '</button></div>'+
        '<i id="'+resultsbtnid+'Chevron" class="fa fa-chevron-circle-up fa-2x"></i></button></div>'+
      '</div>'

    if (searchtype === "address"){
      // Pin Location Text
      var pinloctext = ""+
        'Based on this location, <span style="font-weight:bold; color: #EBED72;">'+
        geoaddress+'</span>,  you can attend the ' +
        numRows+ ' '  +name+ ' below.'+
        '<span class="text-muted"> Wrong location? Add zip code and search again.</span>'
    }


    // start the display of results and markers


    if (searchtype === "address"){
        // display the list of neihborhood schools you can attend
        // schools with boundaries that contain the address loc are listed
        // display the polygons of all the neighborhood schools
      $("#txtGeoLoc").html( pinloctext );
      $("#pinLocAlert").show();
      $("#resultListPoly").show();
      $("#boundaryAsterisk").show();
      $("#extraswrapper").show();
      $("#btnShowFilters").hide();
      $("#btnSearchRadius").show();
      $("#moreSchoolsRow").show();
      $("#filterresults").collapse("hide");

      displaySchoolPolygon( row_uidarray );

      //clearURL in case it's an addressURL search
      cleanURL();


    } else if((searchtype !== "school") || (searchtype === "school" && numRows >1) ){
      // display the list of all schools in the query
      // searchtypes will be radius, url, zip, ecp, and advancedsearch
      $("#pinLocAlert").hide();
      $("#resultListPoly").hide();
      $("#resultCount").html( resultcounthtml );
      $("#resultCount").show();
      $("#resultList").show();
      $("#boundaryAsterisk").show();
      $("#extraswrapper").show();
      $("#btnSearchRadius").hide();
      $("#btnShowFilters").show();
      $("#moreSchoolsRow").show();
      //$("#filterresults").collapse("hide");


    }

    if (searchtype === "school"){
      if(numRows >1) {
        // populate and display results view of multiboundary school
        // display the markers of multiboundary school
        // there will be at least 2 listings of one school
        // the school will have more than one boundary
        // $("#resultCount").html( resultcounthtml );
        // $("#resultCount").show();
        // $("#resultList").show();
        // $("#boundaryAsterisk").show();
        // $("#extraswrapper").show();
        // $("#btnSearchRadius").hide();
        // $("#moreSchoolsRow").show();
        // $("#pinLocAlert").hide();
        // $("#resultListPoly").hide();
        displaySchoolPolygon( row_countarray );
        map.fitBounds(latlngbounds);
        map.setZoom(13);
        positionMarkersOnMap();
      }else{
      // opens the detail view of one school
      // numRows is passed as 1, markerclick is false
      autoopeninfoAllSchools(0 , false, false);
      }
      // fix the url if url search with one result
      // ie. profile page link
      cleanURL();
    }

    // update the radius dropdown to the current radius
    // required
    if (searchtype === "radius"){
      $("#ddlRadius").val(searchRadius);
      //$('#input-radius').show();
    }


    // zip search hides the radius drop down
    // fits all the markers on screen and zooms out one level
    // calls the function to display the zipcode boundary
    if (searchtype === "zip") {
      $('#input-radius').hide();
      map.fitBounds(latlngbounds);
      map.setZoom(map.getZoom() - 1);
      displayZipcodeBoundary();
    }
    // the school id is passed in the url from the profile page
    // if one school is passed, open that school in detail view
    // if more than one school is passed open results view
    if (searchtype === "url")  {
      map.fitBounds(latlngbounds);
      if (nlength == 1){
        autoopeninfoAllSchools(0, false, false);
        map.setZoom(13);
      }
      cleanURL();

    }
    if (searchtype === "ecp")  {
      // map.fitBounds(latlngbounds);
      // if (nlength == 1){
      //   autoopeninfoAllSchools(0, 1, false);
      //   map.setZoom(13);
      // }
      cleanURL();

    }

    if (searchtype === "advancedsearch") {
      map.fitBounds(latlngbounds);
      positionMarkersOnMap();

    }


  } else { // No Results Returned



   // add the filters to the results display
    if ( searchtype === "radius") {
      var inputrad = buildRadiusDropDown();
      $("#ddlRadius").val(searchRadius);

      if(filtersForDisplay.length == 0 || filtersForDisplay == "undefined") {
        // radius without filters
        var buildresultcounthtml = '<h4>0 schools within '  + inputrad + '</h4>';
        $("#resultCount > div").html(buildresultcounthtml);
        $("#resultCount > div").css("padding-left", "10px");
      }else{// radius with filters
        var ffd = "<div style='font-size:.8em; padding-bottom:5px;'> ["+filtersForDisplay.toString()+" ] </div>";
        var buildresultcounthtml = '<div class="clearfix"><div class="col-xs-10" style="padding-right:3px; padding-left:10px;"><h4>0 schools found</h4>'+ffd+'</div></div>';
        $("#resultCount").html(buildresultcounthtml);
      }

    }else if (searchtype === "advancedsearch" ) {
      if(filtersForDisplay.length == 0) {
        // advancedsearch without filters
        $("#resultCount").html('<div class="clearfix"><div class="col-xs-10" style="padding-right:3px; padding-left:10px;"><h4>0 schools found</h4></div></div>');
      }else{
         // advancedsearch with filters
        var ffd = "<div style='font-size:.8em; padding-bottom:5px;'> ["+filtersForDisplay.toString()+" ] </div>";
        var buildresultcounthtml = '<div class="clearfix"><div class="col-xs-10" style="padding-right:3px; padding-left:10px;"><h4>0 schools found</h4>'+ffd+'</div></div>';
        $("#resultCount").html(buildresultcounthtml);
      }

    }else{
      // not radius, not advanced
      $("#resultCount").html('<div class="clearfix"><div class="col-xs-10" style="padding-right:3px; padding-left:10px;"><h4>0 schools found</h4></div></div>');
      //$("#resultCount > div").css("padding-left", "10px");
    }


    $("#resultCount").show();
    $("#resultList").hide();
    $("#moreSchoolsRow").hide();
    $("#extraswrapper").hide();
    $("#pinLocAlert").hide();
    $("#resultListPoly").hide();

    // FIX THIS show filters for radius no results but don't show school ratings
    $("#moreSchoolsRow").show();
    $("#btnShowFilters").show();

  }




  // adds the function to the newly created rows
  // allows the ability to click on the compare box
  // without triggering the row click
  $('.compareHeart').click(function (e) {
        e.stopPropagation();
    });


  if ( searchtype === "school" && numRows === 1 ) {
    // one school with one boundary is found
    // this is the only time that detail view is displayed
    // however, url with one school id should do this too.
    // hides the results view
    // shows the detail view
    $("#divResultsContainer").collapse('hide');
    $('#divResultsCollapse ').collapse("hide");
    $("#divDetailContainer").collapse('show');
  }else{
    // all other search results
    // shows the results view
    // hides the detail view
    $('#divResultsContainer').collapse("show");
    $('#divResultsCollapse ').collapse("show");
    $('#divDetailContainer').collapse("hide");
  }

  // collapse the side buttons on mobile
  if ($( window ).width() < 768 ) {
    $('#collapseButtons').collapse("hide");
  }


  // adjust the height of the results to about 40% of the screen
  adjustResultsHeight();
}



// ID, School, Address, City, Phone, Type, Classification, BoundaryGrades, Grades, Boundary, Uniqueid, Zip, Marker, Typenum, ProgramType, Lat, Long, Rating
// Count Growth Attainment Culture SpecialEdCount Mobility Dress PSAE ISAT ACT ADA, College
// mk = from a markerclick, used to show multi boundary msg in detail when marker is clicked.
function autoopeninfoAllSchools(row, dupe, mk, uidcompare) {


  var id = allschoolsdata[row][0];
  var name = allschoolsdata[row][1];
  var address = allschoolsdata[row][2] + ", " + allschoolsdata[row][3] + ", " + allschoolsdata[row][11];
  var phone = allschoolsdata[row][4];
  var type = allschoolsdata[row][5];
  var classif = allschoolsdata[row][6];
  var gradesb = allschoolsdata[row][7];
  var grades = allschoolsdata[row][8];
  var boundary = allschoolsdata[row][9];
  var uid = allschoolsdata[row][10];
  var pt = replacePipes(allschoolsdata[row][14]);
  var lat = allschoolsdata[row][15];
  var lng = allschoolsdata[row][16];
  var rating = allschoolsdata[row][17];

  var stcount= allschoolsdata[row][18];
  var growth= allschoolsdata[row][19];
  var attainment= allschoolsdata[row][20];
  var culture= allschoolsdata[row][21];
  var graduation= allschoolsdata[row][22];
  var mobility= allschoolsdata[row][23];
  var dress= allschoolsdata[row][24];
  var reading= allschoolsdata[row][25];
  var math= allschoolsdata[row][26];
  var ACT= allschoolsdata[row][27];
  var ADA= allschoolsdata[row][28];
  var college= allschoolsdata[row][29];
  var addresssmall=allschoolsdata[row][2];
  var position = new google.maps.LatLng(lat,lng);
  StreetViewLoc = new google.maps.LatLng(lat,lng);

  // console.log(uid+' '+uidcompare)
  // if (uidcompare){
  //   if (uid != uidcompare) {
  //     alert("This school's detail panel cannot be displayed at this time. The panel can only be displayed for schools that were on the initial search. ")
  //     return;
  //   }
  // }
  populateDetailDiv(id, name, address, phone, type, classif, gradesb, grades, position, uid, pt, rating, boundary, addresssmall, stcount, growth, attainment, culture, graduation, mobility, dress, reading, math, ACT, ADA, college, dupe, mk, row );
}



// style and populate the detaildiv with data
// if same marker clicked, toggle infowindow, polygon, safepassage and detaildiv off
// open the info window with just the name and short address
function populateDetailDiv(id, name, address, phone, type, classif, gradesb, grades, position, uid, pt, rating, boundary, addresssmall, stcount, growth, attainment, culture, graduation, mobility, dress, reading, math, ACT, ADA, college, dupe, mk, row ) {

  if (infowindow != null) {
    if (infowindow.iname == uid) {
      // clicked on the same marker
      // toggle infowindow, polygon, safepassage, lscboundary, and detaildiv off
      if (searchPolyAttendance != null) {
        searchPolyAttendance.setMap(null);
      }
      if (searchSafePassage != null) {
        searchSafePassage.setMap(null);
      }
      if (searchLSCBoundary != null) {
        searchLSCBoundary.setMap(null);
      }
      infowindow.close();
      infowindow = null;
      // don't close the detail view on a marker click if
      // the searchtype is school
      // and a school search or address search with multiple boundaries
      if((mk===true &&  searchtype !== "school"  )  ||
        ((searchtype==="school" || searchtype==="address") && dupe===true && mk===true ))
      {
        $("#divDetailContainer").collapse('hide');
        $("#divResultsContainer").collapse('show');
      }
      return;
    } else  {
      infowindow.close();
    }
  }

  // set up variables for future coloring of text and backgrounds
  var c = getColors(type);
  var headcolor = c[0];
  var bkgcolor = c[1];

  // start building the detail div
  var contents = "<div style='background-color:" + bkgcolor + "; padding:10px 15px 5px 15px;'>" ;

  // if this is a school search with one boundary display the ^ chevron to
  // roll up the detail div to display only the name, address, and phone of the school
  // check on url with one id

  if ( searchtype === "school" && dupe === false ) {
    contents += "" +
    '<button type="button" class="close"  '+
    'style="color:'+headcolor+'; opacity:1;" data-toggle="collapse" data-target="#divInfo" '+
    'onclick="javascript:chevronClick(&quot;divInfoChevron&quot;);"  ' +
    'aria-expanded="false" aria-controls="divInfo">' +
    '<i id="divInfoChevron" class="fa fa-chevron-circle-down fa-2x"></i></button>';
  }else{

    // all other results use the x to close detail div
    contents += "" +
    "<button type='button' class='close close-lg' style='opacity:1; right:0; margin-top:-10px; color:" + headcolor + "' onclick='toggledetail(" +uid+ "); closeinfowindow();' aria-label='Close'>"+
    "<span aria-hidden='true'>×</span></button>";
  }

  // displays school name, address, and phone
  contents += "<h4 style='color:" + headcolor + "; margin:0; padding-top:0;'>" + name + "</h4>" +
  "<p style='font-size:12px; margin-bottom:0px'>" + address + "<br />" + phone + "</p>" ;

  // add the class "in" to show the detail view
  contents +="<div id='divInfo' class='collapse in'>" ;

  // start the div that lists the school info
  contents += "<div style='border-top:1px solid " + headcolor + "; border-bottom:1px solid " + headcolor + "; padding:4px 0px; font-size:12px;'>"
  if(type !== "") {
    contents += " <b>Type: </b>" + type + "<br>" ;
  }
  if(classif !== "") {
    contents += "<b>Classification: </b>" + classif ;
    // if(name === "HANCOCK HS" || name === "SOLORIO HS" || name === "HUBBARD HS" || name === "CURIE HS" ) {
    //   contents += ". <span style='color:red'> The boundary for Curie, Hubbard, and Solorio high schools will change in the 2015-16 school year. Please call 773-553-3270 for details regarding this change.</span> <a style='color:red; text-decoration:underline;' href='javascript:toggle3NewHSBoundaries()'>See New 9th Grade Boundaries</a> "
    //  }
    contents +=  "<br> "
  }
  // if(pt !== "NA" && pt !== "" ) {
  //   contents += "<b>Programs Offered: </b>" + pt + "<br>" ;
  // }
  if(rating !== "" && rating !== "NULL" ) {
      var myrating = rating.toLowerCase();
      contents += " <b>Performance Rating: </b><span style='text-transform: capitalize;'>" + myrating + "</span><br> "
  }

  // boundary grades that show if a school has an attendance area
  // "" if no boundary
  //
  if(gradesb !== "") {
    contents += " <b>Boundary Grades Served: </b>";
    if((mk===true && dupe===true) && (searchtype!=="address")) {// from marker click - show multiple boundaries message
      contents += "Mulitple boundaries found. Click on boundaries to view grades served.<br>";
    }else{
      //contents += gradesb + "<br>";
      if (gradesb.indexOf("_") != -1) {
        contents += gradesb.substring(1) + "<br>"; //if the ft has _ before the number
      } else {
        contents += gradesb + "<br>";
      }

    }

  }else{
    contents += " <b>Boundary Grades Served: </b>No Boundary<br>"
  }
  if(grades !== "") {
    if (grades.indexOf("_") != -1) {
      contents += " <b>Grades Served: </b>" + grades.substring(1) + "<br>"
    } else {
      contents += " <b>Grades Served: </b>" + grades + "<br>"
    }

  }

  contents += "</div><div style='padding-bottom: 5px;'>"

  contents += "<a class='btnDetailPanel btn btn-xs'  style='background-color:" + headcolor +
    "' href='/Schools/Pages/school.aspx?SchoolID=" + id +
    "' target='_blank' onclick='_trackClickEventWithGA(&quot;Click&quot;,&quot;School Profile&quot; ,&quot;"+ name +"&quot;);' >More Info</a>"

  contents +="<a class='btnDetailPanel btn btn-xs'  style='background-color:" + headcolor +
  "' href='/Schools/Pages/school.aspx?SchoolID=" + id +
  "#admissions' target='_blank' onclick='_trackClickEventWithGA(&quot;Click&quot;,&quot;Enroll&quot; ,&quot;"+ name+"&quot;);' >Enroll</a>";

  contents +="<a class='btnDetailPanel btn btn-xs'  style='background-color:" + headcolor +
  "' onclick='startStreetView(); _trackClickEventWithGA(&quot;Click&quot;,&quot;Steet View&quot; ,&quot;"+ name+"&quot;);'>Street View</a>";

  // var dirAddress = address.replace(" ", "+");
  //
  // contents += "<a class='btnDetailPanel btn btn-xs' style='background-color:" + headcolor +
  //   "' href='http://maps.google.com/maps?daddr=" + dirAddress +
  //   "' target='_blank' onclick='_trackClickEventWithGA(&quot;Click&quot;,&quot;Directions&quot; ,&quot;"+ name +"&quot;);'>Directions</a>";

    var startaddr = "";
    if (addrMarker !== null) {
      startaddr = "saddr="+ geoaddress + "&";
    }
    var destaddr = "daddr="+address;
    contents +=	"<a class='btnDetailPanel btn btn-xs' style='background-color:" + headcolor +
    "' href='http://maps.google.com/maps?" + startaddr + destaddr +
    "' target='_blank' onclick='_trackClickEventWithGA(&quot;Click&quot;,&quot;Directions&quot; ,&quot;"+ name +"&quot;);'>Directions</a>";



  contents +="<a class='btnDetailPanel btn btn-xs'  style='background-color:" + headcolor +
  "' onclick='buildCompareRow(" +row+ "); _trackClickEventWithGA(&quot;Click&quot;,&quot;Compare-Detail&quot; ,&quot;"+ name+"&quot;);'>Compare</a>";

  contents +="<a class='btnDetailPanel btnLSCboundary btn btn-xs'  style='background-color:" + headcolor +
  "' onclick='queryLSCBoundary(" +id+ "); _trackClickEventWithGA(&quot;Click&quot;,&quot;LSCBoundary-Detail&quot; ,&quot;"+ name+"&quot;);'>LSC</a>";


  contents +="<a class='btnDetailPanel btn btn-xs'  style='background-color:" + headcolor +
  "' onclick='addrFromInputField(&quot;" +address+ "&quot;); _trackClickEventWithGA(&quot;Click&quot;,&quot;MoreSchools-Detail&quot; ,&quot;"+ name+"&quot;);'>More Schools</a>";


  contents +="</div></div></div>"


  if (searchtype==="school" || searchtype==="radius" || searchtype==="advancedsearch") {
    map.panTo(position);
    positionMarkersOnMap();
  }

  //show the attendance boundaries of the schools
  if (searchPolyAttendance != null) {
    searchPolyAttendance.setMap(null);
  }

  if (searchLSCBoundary != null) {
    searchLSCBoundary.setMap(null);
  }
  // school search marker click will show all the boundaries
  // address search marker click will show only the top markers boundary
  // clicking on the result list row will show only that rows boundary
  if (boundary.indexOf("Attendance Area School") != -1) {
    if( (dupe===true && mk===false) || (searchtype==="address" && dupe===true && mk===true)  ){
      var wh="'Uniqueid' = '" + uid + "'"; // show one polygon out of many
    }else{
      var wh="'ID' = '" + id + "'" ;       //show all polygons matching an id
    }

      searchPolyAttendance = new google.maps.FusionTablesLayer({
        query: {
          from:   fusionTableId,
          select: "Polygon",
          where:  wh
        },
        styles: [
          { where: "Typenum = '1'", polygonOptions: { fillColor: "#0b5394", fillOpacity: .10, strokeColor: "#0149da", strokeWeight: 3 } },
          { where: "Typenum = '2'", polygonOptions: { fillColor: "#ff9900", fillOpacity: .10, strokeColor: "#ff9900", strokeWeight: 3 } },
          { where: "Typenum = '3'", polygonOptions: { fillColor: "#ff0000", fillOpacity: .10, strokeColor: "#fc0000", strokeWeight: 3 } }
        ]
        , suppressInfoWindows: false
      });

    searchPolyAttendance.setMap(map);
  }
  var query = "SELECT ID, SafePassage FROM " + SafePassageTableID + " WHERE ID = '" + id + "'";
  encodeQuery(query, displaySafePassageRoute);

  // create small infowindow to display name and short address
  infowindow = new google.maps.InfoWindow({
    iname: uid
   });
  infowindow.setOptions({ pixelOffset: new google.maps.Size(-1, -36)});
  infowindow.setOptions({ maxWidth: 400});
  infowindow.setContent(name+"<br />"+addresssmall );
  infowindow.setPosition(position);
  infowindow.open(map);


  $("#divDetailContainer").html( contents );

  // fixes the direction of the arrow on desktop for school searches
  if ($("#divInfo").hasClass("in")){
    $("#divInfoChevron").toggleClass("fa-chevron-circle-up fa-chevron-circle-down ");
  }

 //$("#resultListDetail"+uid).html( contents );
}



function setPerformanceRatingData() {

  $("#lnkRating").toggleClass("ratings");

  if( $("#lnkRating").hasClass("ratings") ) {
    _trackClickEventWithGA("Click", "Result List", "Show Grade Category");
    $("#lnkRating").html('<span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span> School Ratings');

    icontype = "gradecategory";
    if (markersArray) {
      for (i in markersArray) {
        var newimage = markersArray[i].imagesm;
        markersArray[i].setIcon(newimage);}
    }

    // if (markersArrayRadius) {
    //   for (i in markersArrayRadius) {
    //     var newimage = markersArrayRadius[i].imagesm;
    //     markersArrayRadius[i].setIcon(newimage);}
    // }

  }else{
    _trackClickEventWithGA("Click", "Result List", "Show School Ratings");
    $("#lnkRating").html('<span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>  Grade Category');
    icontype = "performance";
    if (markersArray) {
      for (i in markersArray) {
        var newimage = markersArray[i].perfimage;
        markersArray[i].setIcon(newimage);}
    }
    // if (markersArrayRadius) {
    //   for (i in markersArrayRadius) {
    //     var newimage = markersArrayRadius[i].perfimage;
    //     markersArrayRadius[i].setIcon(newimage);}
    // }



  }
}


//not used?
function toggleCompareIcon(uid) {

  $( "#btnCompareIcon"+uid ).toggleClass( "fa-square-o fa-check-square-o" );
  if($("#btnCompareIcon"+uid).hasClass("fa-check-square-o")) {
      compareArray.push(uid);
	  $('#btnCompareContainer').collapse("show");
    }else{
      compareArray.splice(compareArray.indexOf(uid ), 1);
    }
    //console.log(compareArray);

}




function buildCompareRow(row) {
  // called from the results when heart is clicked
  var uid = allschoolsdata[row][10];
  var name = allschoolsdata[row][1];
  var phone = allschoolsdata[row][4];
  var type = allschoolsdata[row][5];
  var classification = allschoolsdata[row][6];
  var rating = allschoolsdata[row][17];
  var programs = replacePipes(allschoolsdata[row][14]);
  var typenum = allschoolsdata[row][13];
  var stcount= allschoolsdata[row][18];
    // if(typeof stcount !== "number") {
    //   stcount="";
    // }
  var growth= allschoolsdata[row][19];
  var attainment= allschoolsdata[row][20];
  var culture= allschoolsdata[row][21];
  var graduation= allschoolsdata[row][22];
  if(graduation) {graduation+="%";}
    // if(typeof graduation !== "number") {
    //   graduation="";
    // }else{
    //   graduation+="%";
    // }
  var mobility= allschoolsdata[row][23];
  if(mobility) {mobility+="%";}
    // if(typeof mobility !== "number") {
    //   mobility="";
    // }else{
    //   mobility+="%";
    // }
  var dress= allschoolsdata[row][24];
  var reading= allschoolsdata[row][25];
  //if(reading) {reading+="th";}
  var math= allschoolsdata[row][26];
  //if(math) {math+="th";}
  var ACT= allschoolsdata[row][27];
    //if(typeof ACT !== "number") {ACT="";}
  var ADA= allschoolsdata[row][28];
  var college= allschoolsdata[row][29];
  if(college) {college+="%";}
  // if(typeof college !== "number") {
  //   college="";
  // }else{
  //   college+="%";
  // }
  var dupe = isDupe(row[0])

	$( "#btnCompareIcon"+uid ).toggleClass( "fa-square-o fa-check-square-o" );

	 if($("#btnCompareIcon"+uid).hasClass("fa-check-square-o")) {
     // heart is clicked on
    // add the row to the table
    _trackClickEventWithGA("Click", "Compare-List", name);
    var linkcolor = getLinkColor(typenum);
		$("<tr id='closeTR"+uid+"' style='color:"+linkcolor+ "; cursor:pointer;'  " +
      //"onclick='autoopeninfoAllSchools(" +row+ ","+dupe+", false); opendetail(" +uid+ ");  ' "+
      //"onmouseenter='animatemarker(" +row+ ");' onmouseleave='stopanimatemarker(" +row+ ");' "+
      //"onclick='autoopeninfoAllSchools(" +row+ ","+dupe+", false,"+uid+"); opendetail(" +uid+ ");  ' "+
      ">"+
      "<td style='text-align:center;'><button id='close"+uid+"' class='closeCompare' onclick='$(this).closest(&quot;tr&quot;).remove(); toggleCompareIconClosed("+uid+"); event.stopPropagation(); '><i class='fa fa-times'></i></button></td>"+
      "<td>"+name+"</td><td>"+stcount+"</td><td>"+rating+"</td><td>"+reading+"</td><td>"+math+"</td><td>"+ACT+"</td><td>"+graduation+"</td><td>"+college+"</td>"+
      "<td>"+growth+"</td><td>"+attainment+"</td><td>"+culture+"</td><td>"+mobility+"</td><td>"+dress+"</td><td>"+ADA+"</td>"+
      "<td>"+classification+"</td><td>"+phone+"</td><td>&nbsp;</td></tr>").prependTo("#tblCompare > tbody");
		$('#divCompareContainer').collapse("show");

		}else{
      // heart is clicked off
			// remove the row from the table
      $("#closeTR"+uid).remove();
      if ($('#tblCompare tbody tr').length <1) {
        $('#divCompareContainer').collapse("hide");
        $('#btnCompareBig2').addClass("hidden");
      }
		}
}



function toggleCompareIconClosed(uid) {
  $( "#btnCompareIcon"+uid ).toggleClass( "fa-square-o fa-check-square-o" );
  // collapse the div if there are no comparables
  if ($('#tblCompare tbody tr').length <1) {
    $('#divCompareContainer').collapse("hide");
    $('#btnCompareBig2').addClass("hidden");
  }
}



function getLinkColor(stype) {

  var linkcolor = "#369";

  if (stype == 1) {
    var linkcolor = "#36C";
  }
  if (stype == 3) {
    var linkcolor = "#d73e3e";
  }
  if (stype == 2) {
    var linkcolor = "#F90";
  }
  return linkcolor;
}



function chevronClick(btn) {
 $("#"+btn).toggleClass("fa-chevron-circle-up fa-chevron-circle-down ");
 //$("#"+btn).toggleClass("fa-angle-double-up fa-angle-double-down ");

  //$('#btnResultsHomeCheveron').addClass('glyphicon-chevron-down').removeClass('glyphicon-chevron-up');
}


// casuses the marker to switch to the larger image and
// bounce for one animation cycle
function animatemarker(markernum){
  //if( markersArray.length === 0){return;}
  if(!markersArray[markernum]){return;}
  if(icontype === "gradecategory") {
    var newimage = markersArray[markernum].imagelg;
  }else{
    var newimage = markersArray[markernum].perfimagelg;
  }
  markersArray[markernum].setIcon(newimage);
  markersArray[markernum].setAnimation(google.maps.Animation.BOUNCE);

  setTimeout(function(){
    if(!markersArray[markernum]){return;}
    markersArray[markernum].setAnimation(null);
   }, 750);

}


//switches to the smaller image
function stopanimatemarker(markernum){
  //if( searchtype != "radius" ){
  if(!markersArray[markernum]){return;}
    if(icontype == "gradecategory") {
      var newimage = markersArray[markernum].imagesm;
    }else{
      var newimage = markersArray[markernum].perfimage;
    }
    markersArray[markernum].setIcon(newimage);
  // }else{
  //   if(icontype == "gradecategory") {
  //     var newimage = markersArrayRadius[markernum].imagesm;
  //   }else{
  //     var newimage = markersArrayRadius[markernum].perfimage;
  //   }
  //   markersArrayRadius[markernum].setIcon(newimage);
  // }
  //markersArray[markernum].setAnimation(null);
}



// called from the close x button on the detaildiv
function closeinfowindow() {
  if (infowindow != null) {
    infowindow.close();
    infowindow = null;
  }
  if (searchPolyAttendance != null) {
    searchPolyAttendance.setMap(null);
  }
  if (searchSafePassage != null) {
    searchSafePassage.setMap(null);
  }
  if (searchLSCBoundary != null) {
    searchLSCBoundary.setMap(null);
  }

}



function toggledetail(suid) {
   $("#divDetailContainer").collapse('toggle');
   $("#divResultsContainer").collapse('toggle');
  // adjustResultsHeight();
}

function opendetail(suid) {
   $("#divDetailContainer").collapse('show');
   $("#divResultsContainer").collapse('hide');
}

function adjustResultsHeight() {
  var mapheight = $('#map_canvas').position().top+$('#map_canvas').outerHeight(true);
  //if( $( window ).width() < 768 ) {
  var newheight = ( (mapheight * .4 ) - 50 ) ;
  //}else{
   // var newheight = ( mapheight - $('#resultListContainer').position().top) - 50 ;
  //}
  $('#resultListContainer').css('max-height', newheight );

  //if ($(window).width() > 767) { $('#collapseButtons').collapse('show'); }

  //var resultsheight = $('#resultListContainer').position().top+$('#resultListContainer').outerHeight(true);
  //var newheight = ( mapheight - $('#resultListContainer').position().top) - 50 ;
  //console.log("adjustingResultsHeight: "+ newheight);

  // if (resultsheight == mapheight) {
  //   $('#collapseResults').css('bottom', '' );
  //   $('#collapseResults').css('height', 'auto' );
  //   var resultsheight = $('#collapseResults').position().top+$('#collapseResults').outerHeight(true);
  // }

  //if (resultsheight >= mapheight) {
    //$('#resultListContainer').css('height', newheight -11 );
    //$('#collapseResults').css('height', 'auto' );
    //$('#collapseResults').animate({scrollTop: $("div.resultsrowdetail.collapse.in").offset().top}, "fast");
    //} else {
    //$('#resultListContainer').css('height', 'auto' );

    // var resultsheight = $('#collapseResults').position().top+$('#collapseResults').outerHeight(true);
    // var newbottom = mapheight - resultsheight;
    // $('#collapseResults').css('bottom', newbottom );


    //$('#collapseResults').animate({scrollTop: $("div.resultsrowdetail.collapse.in").offset().top}, "fast");

    //$('#collapseResults').css('height', resultsheight );
  //}

  //console.log("mapheight END: " + mapheight);
  //console.log("resultsheight END: " + resultsheight);

  // var resultsheight2 = $('#collapseResults').position().top+$('#collapseResults').outerHeight(true);
  // console.log("resultsheight RECALC: " + resultsheight2);
  // if (resultsheight2 > mapheight) {
  //   $('#collapseResults').css('bottom', 0 );
  //   $('#collapseResults').animate({scrollTop: $("div.resultsrowdetail.collapse.in").offset().top}, "fast");
  // }
}



//not used?
function adjustMapCanvas() {
  var bottom = $('#collapseResults').position().top+$('#collapseResults').outerHeight(true);
  //if( bottom == 0 ) {bottom=60}
  $('#map_canvas').css('height', bottom);
  //console.log("bottom: " + bottom);

}



// address search displays polygons of multiple schools.
// school search displays multiple polygons of one school
// called from the resultlistbuilder, not the marker click
// uses an array of school ids and displays their polygons
function displaySchoolPolygon(listofschools){

  if(searchtype==="address")  {
    var wh="'Uniqueid' IN (" + listofschools + ")" ;
  }else{
    var wh="'ID' IN (" + listofschools + ")" ;
  }

  searchPolyAttendance = new google.maps.FusionTablesLayer({
    query: {
      from:   fusionTableId,
      select: "Polygon",// "Typenum" ,
      //where:  "'Uniqueid' = '" + uid + "'"
      where:  wh
    },
    styles: [
      { where: "Typenum = '1'", polygonOptions: { fillColor: "#0b5394", fillOpacity: .10, strokeColor: "#0049da", strokeWeight: 3 } },
      { where: "Typenum = '2'", polygonOptions: { fillColor: "#ff9900", fillOpacity: .10, strokeColor: "#ff9900", strokeWeight: 3 } },
      { where: "Typenum = '3'", polygonOptions: { fillColor: "#ff0000", fillOpacity: .10, strokeColor: "#fc0000", strokeWeight: 3 } }
    ]
    , suppressInfoWindows: false
    });

  //fit the map to the markers
  //map.fitBounds(bounds);
  //map.setZoom(map.getZoom() - 1);
  //map.panTo(addrMarker.position);
  //positionMarkersOnMap();
  searchPolyAttendance.setMap(map);
  // for displaying entire polygon(s) points on the map
    /*    if (!google.maps.Polygon.prototype.getBounds) {

          google.maps.Polygon.prototype.getBounds = function() {
            var bounds = new google.maps.LatLngBounds();
            var paths = this.getPaths();
            var path;
            for (var i = 0; i < paths.getLength(); i++) {
                path = paths.getAt(i);
                for (var ii = 0; ii < path.getLength(); ii++) {
                    bounds.extend(path.getAt(ii));
                }
            }
            return bounds;
          }

        }

     // for displaying entire polygon(s) points on the map
      // simplified
        if (!google.maps.Polygon.prototype.getBounds) {
          google.maps.Polygon.prototype.getBounds=function(){
            var bounds = new google.maps.LatLngBounds()
            this.getPath().forEach(function(element,index){bounds.extend(element)})
            return bounds
          }
        }


      // called like so
       map.fitBounds(myPolygon.getBounds());
    */
}


// small x in the input field removes value of input field
function clearSearchInputField(){
  $("#autocomplete").val('');
  $("#btnClearSearch").css("display","none");
  $("#autocomplete").focus();
}


//centers the markers on the right side of the viewport on larger displays
//centers the markers on the middle bottom of the screen on mobile displays
function positionMarkersOnMap() {
  if( $( window ).width() > 767 ) {
    map.panBy(-calcPinLocation(), 0);
  } else {
    map.panBy(0 , -($( window ).height() / 3 )) ;
  }
}



//not used
function scrollfromMarkerClick(id) {
	//if(searchtype == "address") {
		////$('#resultListPoly').animate({scrollTop: $(".resultsrowdetail.collapse.in").offset().top}, "fast");
	//}else{
	//console.log(placetoscrollto);
	////$("#resultListContainer").animate({scrollTop:placetoscrollto }, "slow");
	//$("#resultListContainer").scrollTo("#"+id, 200 ) ;
	////$("#resultListContainer").scrollTo("#resultList"+id, 10) ;

	//}

}



function networkMarkerClick(map, m, ifw) {

  return function() {
    var ht = m.network;
    _trackClickEventWithGA("Click", "Network Marker On Map", ht );
    ifw.close(map)    // In case there's already an infoWindow open
    var headcolor = "#36C";
    var contents ="<div class='googft-info-window'> " +
    "<h2 style='font-family:arial, san-serif; font-size:16px; line-height:18px; color:" + headcolor + "; margin:0;'>" + m.network + "</h2>" + "<p style='font-family:arial, san-serif; font-size:12px; color:#777777; margin:0;'>" + m.address + "<br /></p>" +
    "<div style='color:#55555; background-color: #FFF; border-top:1px solid " + headcolor + "; border-bottom:1px solid " + headcolor + "; padding:4px 0px; margin:0; line-height:18px; font-size:13px;'>" +
    "<b>Chief of Schools: </b>"+m.admin+"<br>"+
    "<b>Phone: </b>"+m.phone+"<br>"+
    "</div>" +
    "</div>";

    infoWindowsas.setOptions({ pixelOffset: new google.maps.Size(-1, -14) });
    //infowindowsas.setOptions({ maxWidth: 400});
    infoWindowsas.setContent(contents);
    infoWindowsas.setPosition(m.position);
    infoWindowsas.open(map);
    if (infowindow) infowindow.close();
  };
}



function displayZipcodeBoundary() {
  searchZip = new google.maps.FusionTablesLayer({
    query: {
      from:   ZipcodeTableId,
      select: "'geometry' , 'Zip'",
      where:  "'Zip' = '" + zipcodeboundary + "'"
    }
    , suppressInfoWindows: false
  });
  if (searchZip != null) {
    searchZip.setMap(map);
    positionMarkersOnMap();
  }
}



function queryLSCBoundary(id) {
  var query = "SELECT ID, geometry FROM " + LSCdistrictsTableId + " WHERE ID = '" + id + "'";
  encodeQuery(query, displayLSCBoundary);
}

//not happening
function xqueryLSCBoundary(id) {
  var query = "SELECT ID, geometry FROM " + LSCdistrictsTableId + " WHERE ID = '" + id + "'";
  var queryText = encodeURIComponent(query);
  var gvizQuery = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq='  + queryText);

  gvizQuery.send(function(response) {
      var numRows = response.getDataTable().getNumberOfRows();
      var numCols = response.getDataTable().getNumberOfColumns();
      if( numRows > 0 ) {
        var wh="'ID' = '" + id + "'" ;
        searchLSCBoundary = new google.maps.FusionTablesLayer({
          query: {
            from:   LSCdistrictsTableId,
            select: "geometry",
            where:  wh
          },
          styles: [
            { polygonOptions: { fillColor: "#00DDFF", fillOpacity: .10, strokeColor: "#00DDFF", strokeWeight: 3 } },
          ],
          suppressInfoWindows: true
        });
        searchLSCBoundary.setMap(map);
      } else {
        alert ("This school does not have a Local School Council.")
      }
    });

}



// show the LSC boundaries of the school
function displayLSCBoundary(d) {
  // toggle LSC boundary display off
  // turn on school attendance boundary
    if($(".btnLSCboundary" ).hasClass( "highlight-blue" ) && searchLSCBoundary != null ) {
      $(".btnLSCboundary" ).removeClass( "highlight-blue" );
      searchLSCBoundary.setMap(null);
      if (searchPolyAttendance != null) {
        searchPolyAttendance.setMap(map);
      }
      return;
    }
    if( d.rows != null ) {
    var id = d.rows[0][0];
  	var wh="'ID' = '" + id + "'" ;
  	 searchLSCBoundary = new google.maps.FusionTablesLayer({
  		query: {
  			from:   LSCdistrictsTableId,
  			select: "geometry",
  			where:  wh
  		},
  		styles: [
  			{ polygonOptions: { fillColor: "#00DDFF", fillOpacity: .10, strokeColor: "#00DDFF", strokeWeight: 3 } },
  		],
  		suppressInfoWindows: true
  	});

    $(".btnLSCboundary" ).removeClass( "highlight-blue" ).addClass( "highlight-blue" );
    // $(".btnLSCboundary").css("background-color", "#00DDFF");//rgb(0,221,255)
    // $(".btnLSCboundary").css("color", "#01596C");//rgb(1,89,108)

    if (searchPolyAttendance != null) {
      searchPolyAttendance.setMap(null);
    }
    searchLSCBoundary.setMap(map);
  } else {
    alert ("This school does not have a Local School Council.")
  }
}


// thanks to http://www.dreamdealer.nl/tutorials/point_the_streetview_camera_to_a_marker.html
// and https://developers.google.com/maps/documentation/javascript/examples/streetview-controls
function startStreetView() {
  //console.log(StreetViewLoc);
  var panoOptions = {
        panControl: false,
        addressControl: true,
        linksControl: true,
        zoomControl: false,
        enableCloseButton: false,
        imageDateControl: true
      };
  panorama = map.getStreetView();
  panorama.setPosition(StreetViewLoc);
  panorama.setOptions(panoOptions)

  var service = new google.maps.StreetViewService;

  // call the "getPanoramaByLocation" function of the Streetview Services to return the closest streetview position for the entered coordinates
  service.getPanoramaByLocation(panorama.getPosition(), 50, function(panoData) {
    //console.log("panoData:" +panoData);
    // if the function returned a result
    if (panoData != null) {
      // the GPS coordinates of the streetview camera position
      var panoCenter = panoData.location.latLng;
      // this is where the magic happens!
      // the "computeHeading" function calculates the heading with the two GPS coordinates entered as parameters
      var heading = google.maps.geometry.spherical.computeHeading(panoCenter, StreetViewLoc);
      // now we know the heading (camera direction, elevation, zoom, etc) set this as parameters to the panorama object
      var pov = panorama.getPov();
      pov.heading = heading;
      pov.pitch   = 5;
      panorama.setPov(pov);

    } else {

      alert('Sorry, Google Street View could not be found.');
      panorama.setVisible(false);
      panorama = null;
      $("#map_canvas").css({"z-index": "0"});
      $('#streetview').hide();
      return;
    }
  });

  toggleStreetView();
}



function toggleStreetView() {

  var toggle = panorama.getVisible();
  if (toggle == false) {
    panorama.setVisible(true);
    $("#map_canvas").css({"z-index": "100"});
    $('#streetview').show();
  } else {
    panorama.setVisible(false);
    panorama = null;
    $("#map_canvas").css({"z-index": "0"});
    $('#streetview').hide();
    //console.log(panorama);
  }

}



function calcPinLocation() {
  var w=$( window ).width() / 4;
  return(w);
}




function getSearchRadius() {
  searchRadius = $("#ddlRadius").val();

  if (typeof searchRadius === "undefined") {
    searchRadius = "1609";
  }

  switch (searchRadius) {
    case "402":
        map.setZoom(15);
        break;
    case "804":
    case "1609":
        map.setZoom(14);
        break;
    case "2414":
    case "3218":
        map.setZoom(13);
        break;
    case "4023":
    case "4828":
    case "6437":
        map.setZoom(12);
        break;
    case "8046":
    case "9656":
        map.setZoom(11);
        break;
    case "16090":
        map.setZoom(10);
        break;
    default:
        map.setZoom(11);
    }

}



function displaySafePassageRoute(d) {
  if (searchSafePassage != null) {
    searchSafePassage.setMap(null);
  }
  if( d.rows != null ) {
    var id = d.rows[0][0];
    searchSafePassage = new google.maps.FusionTablesLayer({
      query: {
        from:   SafePassageTableID,
        select: "ID, SafePassage",
        where:  "ID IN '" + id + "'"
      },
      suppressInfoWindows: false
    });
    searchSafePassage.setMap(map);
    $("#safepassdiv").html("<span style='width:15px; height:5px; background-color:#ff00ff; margin:3px 5px 0 0; display:block; float:left;'>&nbsp;</span>Safe Passage Route");
    $("#safepassdiv").fadeIn();
  }else{
    $("#safepassdiv").hide();
  }
}



// query to get the centerpoint loc of each network and the marker
function queryForNetworkCenters() {
  var query = "SELECT Lat, Long, MarkerName, Network, Admin, Address, Phone FROM " + NetworksTableId;
  encodeQuery(query, displayNetworkCenters);
}



// creates the markers to display inside of each networks polygon
function displayNetworkCenters(d) {
  if( d.rows != null ) {
    var rows = d.rows;
    var numRows = d.rows.length;
    infoWindowsas = new google.maps.InfoWindow();
    for (var i = 0; i < numRows; i++) {
      var lat       = (rows[i][0]);
      var lng       = (rows[i][1]);
      var position  = new google.maps.LatLng(lat, lng);
     // var img       = 'images/' + rows[i][2];
      var net       = (rows[i][3]);
      var adm       = (rows[i][4]);
      var add       = (rows[i][5]);
      var pho       = (rows[i][6]);
      var img       = {url: 'images/' + rows[i][2],
                       size: new google.maps.Size(32, 32),
                       origin: new google.maps.Point(0,0),
                       anchor: new google.maps.Point(16, 16)
                      };
      //add properties to be used for displaying network information in the infowindow popup
      var marker    = new google.maps.Marker({
          position: position,
          network:  net,
          admin:    adm,
          address:  add,
          phone:    pho,
          icon:     img,
          map:      map
      });
      var fn = networkMarkerClick(map, marker, infoWindowsas);
      google.maps.event.addListener(marker, 'click', fn);
      markersArrayNetwork.push(marker);
    }
  }
}



// clears out elements displayed on the map
function clearMapElements() {

  if (infowindow) {
    infowindow.close();
    infoWindows = null;}
  if (infoWindowsas) {
    infoWindowsas.close(map);}
  if (addrMarker != null){
    addrMarker.setMap(null);}
  if (searchRadiusCircle != null){
    searchRadiusCircle.setMap(null);}
  if (searchPolyAttendance != null){
    searchPolyAttendance.setMap(null);}
  if (searchSafePassage != null){
    searchSafePassage.setMap(null);}
  if (searchLSCBoundary != null){
      searchLSCBoundary.setMap(null);}
  if (searchZip != null){
    searchZip.setMap(null);}


  deleteOverlays(); //removes any home, school, zip markers
  deleteNetworkOverlays(); // removes network markers

  //remove the overlays
  SafePassage.setMap(null);
  CHattendance.setMap(null);
  ESattendance.setMap(null);
  MSattendance.setMap(null);
  HSattendance.setMap(null);
  Networks.setMap(null);
  Community.setMap(null);
  Wards.setMap(null);
  Zipcode.setMap(null);
  Tiers.setMap(null);
  ILhouse.setMap(null);
  ILsenate.setMap(null);
  UScong.setMap(null);
  transitLayer.setMap(null);
  bikeLayer.setMap(null);
 // $('#abType4').attr('checked', 'checked'); //off


  searchPolyAttendance = null;
  searchSafePassage = null;
  searchLSCBoundary = null;
  searchZip = null;
  allschoolsdataHome = null;
  allschoolsdata  = null;
  homeD = null;
  allD = null;
  searchtype = null;
  addrMarker = null;


  $("#pinLocAlert").hide();

  $("#resultListPoly").hide();
  $("#resultListPoly").html('');

  $("#moreSchoolsRow").hide();

  $("#resultCount").hide();
  $("#resultList").hide();
  $("#resultCount").html('');
  $("#resultList").html('');

  $("#extraswrapper").hide();

  $("#collapseSettings").collapse('hide');
  $("#collapseHelp").collapse('hide');

  $('#streetview').hide();
  $(".btnLSCboundary" ).removeClass( "highlight-blue" );
}



function refreshBuildings() {
  if (searchZip != null) {
    searchZip.setMap(map);}
  if (searchPolyAttendance != null) {
      searchPolyAttendance.setMap(map);}
  if (searchLSCBoundary != null){
      searchLSCBoundary.setMap(null);}
  if (searchSafePassage != null) {
    searchSafePassage.setMap(map);}
  // if (searchSchools != null) {
  //   searchSchools.setMap(map);}
  // if (searchHomeSchools != null) {
  //   searchHomeSchools.setMap(map);}
}



function togglePT(ptclick) {
  _trackClickEventWithGA("Click", "Program Type", ptclick);
  //checkboxSearch();
}



// overlay click
function toggleBoundary(closeslideout) {
  SafePassage.setMap(null);
  CHattendance.setMap(null);
  ESattendance.setMap(null);
  MSattendance.setMap(null);
  HSattendance.setMap(null);
  Networks.setMap(null);
  Community.setMap(null);
  Wards.setMap(null);
  Zipcode.setMap(null);
  Tiers.setMap(null);
  ILhouse.setMap(null);
  ILsenate.setMap(null);
  UScong.setMap(null);
  transitLayer.setMap(null);
  bikeLayer.setMap(null);
  deleteNetworkOverlays(); //remove numbered network markers

  // close any open infowindows
  if (infowindow) {
    infowindow.close();}
  if (infoWindowsas) {
    infoWindowsas.close(map);}

  var tclick = null;
  if ($("#abType16").is(':checked')) {
    SafePassage.setMap(map);
    tclick = "SafePassage";
  }
  if ($("#abType15").is(':checked')) {
    CHattendance.setMap(map);
    tclick = "Charter School Attendance";
  }
  if ($("#abType1").is(':checked')) {
    ESattendance.setMap(map);
    tclick = "Elementary School Attendance";
  }
  if ($("#abType2").is(':checked')) {
    MSattendance.setMap(map);
    tclick = "Middle School Attendance";
  }
  if ($("#abType3").is(':checked')) {
    HSattendance.setMap(map);
    tclick = "High School Attendance";
  }
  if ($("#abType5").is(':checked')) {
    queryForNetworkCenters(); // this queries and displays the numbered network markers on the map
    Networks.setOptions({     // suppress infowindow on polygon clicks
      suppressInfoWindows: true
    });
    Networks.setMap(map);     // this displays the network polygons on their own fusion table layer
    tclick = "School Networks";
  }
  if ($("#abType7").is(':checked')) {
    Community.setMap(map);
    tclick = "Community";
  }
  if ($("#abType8").is(':checked')) {
    Wards.setMap(map);
    tclick = "Wards";
  }
  if ($("#abType9").is(':checked')) {
    Zipcode.setMap(map);
    tclick = "Zipcode";
  }
  if ($("#abType10").is(':checked')) {
    //$.getScript("scripts/fusiontips.js");
    //$.getScript( "scripts/fusiontips.js" ).done(function( script, textStatus ) {
    //        initTiers();
    //      })
    //      .fail(function( jqxhr, settings, exception ) {
    //        console.log("Tier Overlay hover disabled");
    //    });

    initTiers();
    tclick = "Tiers";
  }
  if ($("#abType11").is(':checked')) {
    ILhouse.setMap(map);
    tclick = "IL House";
  }
  if ($("#abType12").is(':checked')) {
    ILsenate.setMap(map);
    tclick = "IL Senate";
  }
  if ($("#abType13").is(':checked')) {
    UScong.setMap(map);
    tclick = "US Congressional";
  }
  if ($("#abType17").is(':checked')) {
    transitLayer.setMap(map);
    tclick = "Transit";
  }
  if ($("#abType18").is(':checked')) {
    bikeLayer.setMap(map);
    tclick = "Bike";
  }



  _trackClickEventWithGA("Click", "Overlays", tclick);

  if(closeslideout=="close"){
    $('#btnAdvancedSearch2').trigger('click');
  }

  refreshBuildings();
}



function initTiers() {

  Tiers.setMap(map);
  Tiers.enableMapTips({
    select: "'Tier 2016'", // list of columns to query, typially need only one column.
    from: TiersTableId, // fusion table name
    geometryColumn: 'geometry', // geometry column name
    suppressMapTips: false, // optional, whether to show map tips. default false
    delay: 20, // milliseconds mouse pause before send a server query. default 300.
    tolerance: 2 // tolerance in pixel around mouse. default is 6.
    });

}



function drawSearchRadiusCircle(point) {
  if (searchRadiusCircle != null) {
    searchRadiusCircle.setMap(null);
  }
  var circleOptions = {
    strokeColor: "#4b58a6",
    strokeOpacity: 0.3,
    strokeWeight: 1,
    fillColor: "#4b58a6",
    fillOpacity: 0.05,
    map: map,
    center: point,
    clickable: false,
    zIndex: -1,
    radius: parseInt(searchRadius)
  };
  searchRadiusCircle = new google.maps.Circle(circleOptions);
}



// filtering for filtered searches
function filterSchools() {

  var st1 = $("#st1").is(":checked"); // es
  var st2 = $("#st2").is(":checked"); // ms
  var st3 = $("#st3").is(":checked"); // hs
  var st4 = $("#st4").is(':checked');
  var st5 = $("#st5").is(':checked');
  var st6 = $("#st6").is(':checked');
  var st7 = $("#st7").is(':checked');
  var st8 = $("#st8").is(':checked');
  var st9 = $("#st9").is(':checked');
  var st10 = $("#st10").is(':checked');
  var st11 = $("#st11").is(':checked');
  var st12 = $("#st12").is(':checked');
  var st13 = $("#st13").is(':checked'); //Rating 1+
  var st14 = $("#st14").is(':checked'); //Rating 1
  var st15 = $("#st15").is(':checked'); //Rating 2+
  var st16 = $("#st16").is(':checked'); //Rating 2
  var st17 = $("#st17").is(':checked'); //Rating 3
  var st18 = $("#st18").is(':checked'); //Rating No Data

  filtersForDisplay = [];
  var filters = [];
  var filters2 = [];
  var filters4 = [];
  var classifClause = "";
  var typenumClause = "";
  var ratingClause = "";

  if (st1){filters.push( 1); }
  if (st2){filters.push( 2 );}
  if (st3){filters.push( 3 );}
  if(filters.length > 0) {
    typenumClause += " Typenum IN (-1,";
    typenumClause += filters.join(",");
    typenumClause += " )" ;
  } else {
      typenumClause += " Typenum IN (-1,1,2,3)";
  }

  // if all filters checked do not add to the filtersForDisplay array
  if (filters.length !== 3) {
    if (st1) { filtersForDisplay.push( " Elementary School" ); }
    if (st2) { filtersForDisplay.push( " Middle School" ); }
    if (st3) { filtersForDisplay.push( " High School" ); }

  }



   //Query building for Performance Rating

  if (st13) { filters4.push( " 'Level 1+'" ); }
  if (st14) { filters4.push( " 'Level 1'" ); }
  if (st15) { filters4.push( " 'Level 2+'" ); }
  if (st16) { filters4.push( " 'Level 2'" ); }
  if (st17) { filters4.push( " 'Level 3'" ); }
  if (st18) { filters4.push( " 'Inability to Rate' "); }

  if (filters4.length > 0) {
    ratingClause += " Rating IN (";
    ratingClause += filters4.join(","); ratingClause += " )";
  } else {
    ratingClause += " Rating IN ('Level 1+', 'Level 1', 'Level 2+', 'Level 2', 'Level 3', 'Inability to Rate')";
  }
  // if all filters checked do not add to the filtersForDisplay array
  if (filters4.length !== 6) {
    if (st13) { filtersForDisplay.push( " Level 1+" ); }
    if (st14) { filtersForDisplay.push( " Level 1" ); }
    if (st15) { filtersForDisplay.push( " Level 2+" ); }
    if (st16) { filtersForDisplay.push( " Level 2 " ); }
    if (st17) { filtersForDisplay.push( " Level 3 " ); }
    if (st18) { filtersForDisplay.push( " Inability to Rate"); }
  }


  if (st4){
    filters2.push(" 'Attendance Area School' , 'Attendance Area School/Classical' , 'Attendance Area School/Selective Enrollment High School' , 'Attendance Area School/Regional Gifted Center' , 'Attendance Area School/Elementary Magnet' , 'Attendance Area School/Academic Center' , 'Attendance Area School/High School Magnet' , 'Attendance Area School/HS Magnet/Academic Center' ");
    filtersForDisplay.push(" Neighborhood");
  }

  if (st5){
    filters2.push(" 'Charter' , 'Charter-Option' " );
    filtersForDisplay.push(" Charter");
  }

  if (st6){
    filters2.push(" 'Citywide' , 'Citywide-Option' " );
    filtersForDisplay.push(" Citywide");
  }

  if (st7){
    filters2.push("'Attendance Area School/Elementary Magnet','Attendance Area School/High School Magnet','Elementary Magnet/Regional Gifted Center','High School Magnet','Elementary Magnet' , 'Attendance Area School/HS Magnet/Academic Center' " );
    filtersForDisplay.push(" Magnet");
  }

  if (st8){
    filters2.push( "'Regional Gifted Center','Attendance Area School/Regional Gifted Center','Elementary Magnet/Regional Gifted Center'" );
    filtersForDisplay.push(" Regional Gifted Center");
  }

  if (st9){
    filters2.push( "'Selective Enrollment High School'  , 'Attendance Area School/Selective Enrollment High School'" );
    filtersForDisplay.push(" Selective Enrollment HS");
  }

  if (st10){
    filters2.push( "'Classical'" );
    filtersForDisplay.push(" Classical");
  }

  if (st11){
    filters2.push("'Contract', 'Contract-Option' " );
    filtersForDisplay.push(" Contract");
  }

  if (st12){
    filters2.push( "'Special Education'" );
    filtersForDisplay.push(" Special Education");
  }

  if (filters2.length > 0) {    classifClause  = " Classification IN (";
      classifClause += filters2.join(",");    classifClause += " )" ; }

  var progtype = "";
  var filters3 = [];
  var pt01  = $("#pt01").is(':checked');      //Agricultural_Sciences
  var pt02  = $("#pt02").is(':checked');      //Agriculture_and_Horticulture
  var pt03  = $("#pt03").is(':checked');      //Business_and_Finance
  var pt04  = $("#pt04").is(':checked');      //Career_and_Technical_Education_College_and_Career_Academy
  var pt05  = $("#pt05").is(':checked');      //Childrens_Engineering
  var pt06  = $("#pt06").is(':checked');      //Comprehensive_Gifted
  var pt07  = $("#pt07").is(':checked');      //Construction_and_Architecture
  var pt08  = $("#pt08").is(':checked');      //Culinary_and_Hospitality
  var pt09  = $("#pt09").is(':checked');      //Dual_Immersion
  var pt10  = $("#pt10").is(':checked');      //Early_Childhood_Program
  var pt11  = $("#pt11").is(':checked');      //Education_and_Training
  var pt12  = $("#pt12").is(':checked');      //Engineering
  var pt13  = $("#pt13").is(':checked');      //Fine_Performing_Arts
  var pt14  = $("#pt14").is(':checked');      //Health_Science
  var pt15  = $("#pt15").is(':checked');      //Humanities
  var pt16  = $("#pt16").is(':checked');      //Information_Technology
  var pt17  = $("#pt17").is(':checked');      //International_Baccalaureate
  var pt18  = $("#pt18").is(':checked');      //JROTC
  var pt19  = $("#pt19").is(':checked');      //Law_Public_Safety_and_Security
  var pt20  = $("#pt20").is(':checked');      //Literature_Writing
  var pt21  = $("#pt21").is(':checked');      //Magnet_Cluster
  var pt22  = $("#pt22").is(':checked');      //Magnet_Elementary
  var pt23  = $("#pt23").is(':checked');      //Magnet_High_School
  var pt24  = $("#pt24").is(':checked');      //Manufacturing
  var pt25  = $("#pt25").is(':checked');      //Math_Science
  var pt26  = $("#pt26").is(':checked');      //Media_and_Communication_Arts
  var pt27  = $("#pt27").is(':checked');      //Military_Academy
  var pt28  = $("#pt28").is(':checked');      //Montessori
  var pt29  = $("#pt29").is(':checked');      //Personal_Care_Services
  var pt30  = $("#pt30").is(':checked');      //Scholastic_Academy
  var pt31  = $("#pt31").is(':checked');      //Selective_Enrollment_Academic_Center
  var pt32  = $("#pt32").is(':checked');      //Selective_Enrollment_Classical
  var pt33  = $("#pt33").is(':checked');      //Selective_Enrollment_English_Language_Learners
  var pt34  = $("#pt34").is(':checked');      //Selective_Enrollment_High_School
  var pt35  = $("#pt35").is(':checked');      //Selective_Enrollment_International_Gifted
  var pt36  = $("#pt36").is(':checked');      //Selective_Enrollment_Regional_Gifted_Center
  var pt37  = $("#pt37").is(':checked');      //Selective_Enrollment
  var pt38  = $("#pt38").is(':checked');      //Specific_Aptitude
  var pt39  = $("#pt39").is(':checked');      //STEM
  var pt40  = $("#pt40").is(':checked');      //Technology
  var pt41  = $("#pt41").is(':checked');      //Transportation
  var pt42  = $("#pt42").is(':checked');      //World_Language


  if(pt01){filters3.push("Agricultural_Sciences||");}
  if(pt02){filters3.push("Agriculture_and_Horticulture||");}
  if(pt03){filters3.push("Business_and_Finance||");}
  if(pt04){filters3.push("CTE_CCA||");}
  if(pt05){filters3.push("Childrens_Engineering");}
  if(pt06){filters3.push("Comprehensive_Gifted||");}
  if(pt07){filters3.push("Construction_and_Architecture||");}
  if(pt08){filters3.push("Culinary_and_Hospitality||");}
  if(pt09){filters3.push("Dual_Immersion||");}
  if(pt10){filters3.push("Early_Childhood_Program||"); filtersForDisplay.push(" Early Childhood Program");}
  if(pt11){filters3.push("Education_and_Training||");}
  if(pt12){filters3.push("Engineering||");}
  if(pt13){filters3.push("Fine_Performing_Arts||");}
  if(pt14){filters3.push("Health_Science||");}
  if(pt15){filters3.push("Humanities||");}
  if(pt16){filters3.push("Information_Technology||");}
  if(pt17){filters3.push("IB||");}
  if(pt18){filters3.push("JROTC||");}
  if(pt19){filters3.push("Law_Public_Safety_and_Security||");}
  if(pt20){filters3.push("Literature_Writing||");}
  //if(pt21){filters3.push("Magnet_Cluster||");}
  //if(pt22){filters3.push("Magnet_Elementary||");}
  //if(pt23){filters3.push("Magnet_High_School||");}
  if(pt24){filters3.push("Manufacturing||");}
  if(pt25){filters3.push("Math_Science||");}
  if(pt26){filters3.push("Media_and_Communication_Arts||");}
  if(pt27){filters3.push("Military_Academy||");}
  if(pt28){filters3.push("Montessori||");}
  if(pt29){filters3.push("Personal_Care_Services||");}
  if(pt30){filters3.push("Scholastic_Academy||");}
  if(pt31){filters3.push("Selective_Enrollment_AC");}
  if(pt32){filters3.push("Classical||");}
  if(pt33){filters3.push("English_Language_Learners||");}
  if(pt34){filters3.push("Selective_Enrollment_High_School||");}
  if(pt35){filters3.push("International_Gifted||");}
  //if(pt36){filters3.push("Selective_Enrollment_Regional_Gifted_Center||");}
  //if(pt37){filters3.push("Selective_Enrollment||");}
  //if(pt38){filters3.push("Specific_Aptitude||");}
  if(pt39){filters3.push("STEM||");}
  if(pt40){filters3.push("Technology||");}
  if(pt41){filters3.push("Transportation||");}
  if(pt42){filters3.push("World_Language||");}


  if(filters3.length > 0) {
    progtype  = " ProgramType CONTAINS '";
    progtype += filters3.join("");
    progtype += "'" ;
  }

  var whereClause = "";
  whereClause = " AND " + typenumClause;
  whereClause += " AND " + ratingClause;
  if(filters2.length > 0) {
    whereClause += " AND " + classifClause;
    }
  if(filters3.length > 0) {
    whereClause += " AND " + progtype;
    }

  if (searchtype != "address" && searchtype != "radius" ) {

    whereClause += " ORDER BY School ";
    }
  //console.log(whereClause);
  return(whereClause);
}



// encodes the query, returns json, and calls sf if success
function encodeQuery(q,sf) {
  var encodedQuery = encodeURIComponent(q);
  var url = [googleAPIurl];
  url.push('?sql=' + encodedQuery);
  url.push('&key='+ googleAPIkey);
  url.push('&callback=?');
  $.ajax({
    url: url.join(''),
    dataType: "jsonp",
    success: sf,
    error: function () {alert("AJAX ERROR for " + q ); }
  });
}




 // function encodeQueryPhil(q,sf) {


  // var encodedQuery = encodeURIComponent(q);
  // var url = [APIurl];
  // url.push('/' + encodedQuery);

  // url.push('?callback=?');

  // console.log(url.join(''));
  // $.ajax({
  //   url: url.join(''),
  //   dataType: "jsonp",
  //   success: sf,
  //   error: function () {alert("AJAX ERROR for " + q ); }
  // });
  //}

  // Data Service

  // http://localhost/SchoolProfile/dataservice.asmx/GetAllSchools?callback=ted

  // http://localhost/SchoolProfile/dataservice.asmx/GetSchoolsForSchoolIds?callback=ted&schoolIds=609832;609893

  // http://localhost/SchoolProfile/dataservice.asmx/GetDistinctSchoolNames?callback=ted

  // schoolinfo.cps.edu/schoolprofile/

  // $(document).ready(function(){
  //  jQuery.getJSON("http://ical.cps.edu/KeyEvents?callback=?",
  //  function(data))
  // });




function findMe() {
  clearMapElements();
  searchtype = "radius";
  // Try W3C Geolocation (Preferred)
  var foundLocation;

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      foundLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      addrFromLatLng(foundLocation);
    }, null);
  } else {
    alert("Sorry, we could not find your location.");
  }
}




// called from the findMe button to geocode the address
// and from a longpress on the map
// produces a pindrop and address search
function addrFromLatLng(latLngPoint, longpress) {
  clearMapElements();
  clearMapFilters();
  searchtype = "address";

  geocoder.geocode({'latLng': latLngPoint}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[0]) {

        geoaddress = (results[0].formatted_address);
        radiusLoc = results[0].geometry.location;
        map.setZoom(12);
        if (addrMarker) { addrMarker.setMap(null); }
        addrMarker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: map,
          icon: addrMarkerImage,
          animation: google.maps.Animation.DROP,
          title: geoaddress
        });

       $('#autocomplete').val(results[0].formatted_address);
        //radiusSearch("nozoom");

        if(longpress) {
          _trackClickEventWithGA("Search", "LongPress", geoaddress);
          //map.setZoom(12);
           map.setCenter(results[0].geometry.location);
           positionMarkersOnMap();
        }else{
          _trackClickEventWithGA("Search", "FindMe", geoaddress);
          // map.setCenter(results[0].geometry.location);
         // map.setZoom(13);
          map.panTo(addrMarker.position);
          positionMarkersOnMap();

        }
        whereClause = " WHERE "
        whereClause += "Boundary = 'Attendance Area School' ";
        //whereClause += " AND Boundary not equal to 'Citywide' ";
        whereClause += " AND ST_INTERSECTS('Polygon', CIRCLE(LATLNG"+results[0].geometry.location.toString() + "," + .00001 + "))";
        whereClause += " ORDER BY 'School'";
        var query = "SELECT ID, School, Address, City, Phone, Type, Classification, BoundaryGrades, Grades, Boundary, Uniqueid,"+
                          " Zip, Marker, Typenum, ProgramType, Lat, Long, Rating, "+
                          " Count, Growth, Attainment, Culture, Graduation, Mobility, Dress, Reading, Math, ACT, ADA, College "+
                          " FROM " + fusionTableId + whereClause;
        //console.log(query);
        encodeQuery(query, resultListBuilder);

      }

    } else {
      alert("Geocoder failed due to: " + status);
    }
  });

}



// search for zip not in the autocomplete
// also called from More Schools btn on the detail panel of a school
function addrFromInputField(theInput) {
  clearMapElements();
  //clearMapFilters();
 var address = theInput;
  if (address != "") {
    if (address.toLowerCase().indexOf("chicago") == -1) {
      address = address + " chicago, illinois";
      }
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        geoaddress = (results[0].formatted_address);
        map.setCenter(results[0].geometry.location);
        radiusLoc = results[0].geometry.location;
        if (addrMarker) { addrMarker.setMap(null); }
        addrMarker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: map,
          icon: addrMarkerImage,
          animation: google.maps.Animation.DROP,
          title: geoaddress
        });
        $('#autocomplete').val(results[0].formatted_address);

        radiusSearch();

        map.panTo(addrMarker.position);
        positionMarkersOnMap();

      } else {//geocoder status not ok
        alert("We could not find your address: " + status);
      }
    });

  } else {//didn't enter an address
    alert("Please enter an address.");
  }

}



// not used
// geocode address to get streetview
function getStreetViewOfAddress(locAddress) {
  $('#streetview').show();
  $('#divButtonContainer3').hide();
  // initialize the geocoder API functions. We need this to convert the address to a geolocation (GPS coordinates)
  var geocoder =  new google.maps.Geocoder();
  // then we call the geocode function with the address we want to use as parameter
  geocoder.geocode( { 'address': locAddress }, function(results, status) {
    // set the lookTo var to contain the coordinates of the address entered above
    var lookTo = results[0].geometry.location;
    // if the address is found and the geocoder function returned valid coordinates
    if (status == google.maps.GeocoderStatus.OK) {
      // set the options for the panorama view
      var panoOptions = {
        position: lookTo,
        panControl: true,
        addressControl: true,
        linksControl: true,
        zoomControlOptions: true
      };

      // initialize a new panorama API object and point to the element with ID streetview as container
      var pano = new google.maps.StreetViewPanorama(document.getElementById('streetview'),panoOptions);

      // initialize a new streetviewService object
      var service = new google.maps.StreetViewService;
      // call the "getPanoramaByLocation" function of the Streetview Services to return the closest streetview position for the entered coordinates
      service.getPanoramaByLocation(pano.getPosition(), 50, function(panoData) {
        // if the function returned a result
        if (panoData != null) {
          // the GPS coordinates of the streetview camera position
          var panoCenter = panoData.location.latLng;
          // this is where the magic happens!
          // the "computeHeading" function calculates the heading with the two GPS coordinates entered as parameters
          var heading = google.maps.geometry.spherical.computeHeading(panoCenter, lookTo);
          // now we know the heading (camera direction, elevation, zoom, etc) set this as parameters to the panorama object
          var pov = pano.getPov();
          pov.heading = heading;
          pano.setPov(pov);
          //set a marker on the location we are looking at, to verify the calculations were correct
           var marker = new google.maps.Marker({
             map: pano,
             position: lookTo
           });

        } else {
          alert('Sorry, Google Street View could not be found.');
          $('#streetview').hide();
          $('#divButtonContainer3').show();

        }
      });
    } else {
      // there were no coordinates found for the address entered (or the address was not found)
      alert('Could not find your address :(');
      $('#streetview').hide();
      $('#divButtonContainer3').show();

    }
  });
}



// Removes the markers from the map, but keeps them in the array
function clearOverlays() {
  if (markersArray) {
    for (i in markersArray) {
      markersArray[i].setMap(null);
    }
  }
}



// Shows any markers currently in the array
function showOverlays() {
  if (markersArray) {
    for (i in markersArray) {
      markersArray[i].setMap(map);
    }
  }
}



// Deletes all markers in the array by removing references to them
function deleteOverlays() {
  if (markersArray) {
    for (i in markersArray) {
      markersArray[i].setMap(null);
    }
    markersArray.length = 0;
  }
}


// NOT USED
// Deletes all markers in the radius search array by removing references to them
function deleteRadiusMarkers() {
  if (markersArrayRadius) {
    for (i in markersArrayRadius) {
      markersArrayRadius[i].setMap(null);
    }
    markersArrayRadius.length = 0;
  }
}



// Deletes all markers in the network array by removing references to them
function deleteNetworkOverlays() {
  if (markersArrayNetwork) {
    for (i in markersArrayNetwork) {
      markersArrayNetwork[i].setMap(null);
    }
    markersArrayNetwork.length = 0;
  }
}



// Chrome bug
function reloadStylesheets() {
  //alert("Chrome is experiencing a refresh bug. Please use CTRL+F5 to reload the page.");
   var queryString = '?reload=' + new Date().getTime();
    $('link[rel="stylesheet"]').each(function () {
        this.href = this.href.replace(/\?.*|$/, queryString);
    });
}



// removes duplicates
function sort_and_unique( my_array ) {
  my_array.sort();
  //console.log("my_array.length: "+my_array.length);
  for ( var i = 1; i < my_array.length; i++ ) {
    if ( my_array[i] === my_array[ i - 1 ] ) {
      my_array.splice( i--, 1 );
    }
    //console.log(i);
  }
  //console.log("Length= "+my_array.length);
  return my_array;
}



// returns duplicates
// thanks to: http://stackoverflow.com/questions/840781/easiest-way-to-find-duplicate-values-in-a-javascript-array
function return_duplicates( arr ) {
  var len=arr.length,
      out=[],
      counts={};

  for (var i=0;i<len;i++) {
    var item = arr[i];
    counts[item] = counts[item] >= 1 ? counts[item] + 1 : 1;
    if (counts[item] === 2) {
      out.push(item);
    }
  }
  //console.log(out);
  return out;
}



function addCommas(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}


//replaces pipes and underscores from ProgramType column
function replacePipes(ptval) {
  var npt = ptval.replace(/\|\|/g, ", ");
  var npt = npt.replace(/\_/g, " ");
  return npt.slice(0,-2);
}


function ajaxerror() {
  alert("Your school(s) cannot be found. Please click Reset Map and try again.");
  //$('#waiting').hide();
}


// returns true if school id is in the array of schools with multiple boundaries
function isDupe(id){
  return ($.inArray(id, multiBoundaryArray) > -1);
  //
}


// after the url and ECP search, remove the ?xxxx part, only works with html5
// need to clean the url so that subsequent searches don't use URL
// console.log('url done')
function cleanURL() {
  var pageurl = top.location.href;
  if(pageurl.indexOf("?") >=0) {
    var x = pageurl.split('?')[0];
    var stateObject = {};
    var title = "CPS School Locator";
    var newUrl = x;
    history.pushState(stateObject,title,newUrl);
  }

   addressQtype="" ;

}



// reset the URL
function resetmap() {
  var pageurl = top.location.href;
  if(pageurl.indexOf("?") >=0) {
    var x = pageurl.split('?')[0];
    top.location.href = x;

  }else{

   //initialize();
   location.reload(true);

  }
}


// called when user clicks the Reset filter button
function resetFilters() {
  if (searchtype == "url" || searchtype == "ecp" ) {
    // reset the search so filtering doesn't take place on URL or ECP results
    searchInputField();
  } else {
    clearMapFilters();
    filteredSearch();
  }

}



// blocks the background from clicks
function coverFadeIn() {
  $('#cover').fadeIn(200);
  //
}



function coverFadeOut() {
  $('#cover').fadeOut(200);
        //$('#divHelpContainer').show();
        // /$('#divHelpContainer').css()
}



function buildRadiusDropDown() {

    var binputrad = "" +
      "<div id='input-radius'>"+
        "<select id='ddlRadius' class='form-control input-xs' onchange='radiusSearch();' >"+
        "<option value='402'>1/4 mile</option>"+
        "<option value='804'>1/2 mile</option>"+
        "<option value='1609'>1 mile</option>"+
        "<option value='2414'>1.5 miles</option>"+
        "<option value='3218'>2 miles</option>"+
        "<option value='4023'>2.5 miles</option>"+
        "<option value='4828'>3 miles</option>"+
        "<option value='6437'>4 miles</option>"+
        "<option value='8046'>5 miles</option>"+
        "<option value='9656'>6 miles</option>"+
        "<option value='16090'>10 miles</option>"+
        "</select>"+
      "</div>";
      return(binputrad);
    }


// closes popovers on x click
function hideAllPopovers() {
  $('.popover').each(function() {
    $(this).popover('hide');
  });
}



function startTour() {

  hopscotch.registerHelper('triggerButtonsOpen', function() {
    _trackClickEventWithGA("Tour", "Mobile", "Start Tour");
    $("#collapseButtons").collapse('show');
  });
  hopscotch.registerHelper('triggerButtonsClose', function() {
    $("#collapseButtons").collapse('hide');
  });

  hopscotch.registerHelper('triggerLegendClickOpen', function() {
    $("#btnHelp").trigger("click");
    $("#collapseLegend").collapse('show');
  });

  hopscotch.registerHelper('triggerLegendClickClose', function() {
    $("#collapseLegend").collapse('hide');
    $("#btnHelp2").trigger("click");
  });
  hopscotch.registerHelper('triggerAdvancedSearchClickOpen', function() {
    $("#btnAdvancedSearch").trigger("click");
  });

  hopscotch.registerHelper('triggerAdvancedSearchClickClose', function() {
    $("#btnAdvancedSearch2").trigger("click");

  });
  hopscotch.registerHelper('triggeroverlayClickOpen', function() {
     $("#btnAdvancedSearch").trigger("click");
     $("#collapseFive").collapse('show');
  });
  hopscotch.registerHelper('triggeroverlayClickClose', function() {
    $("#collapseFive").collapse('hide');
    $("#btnAdvancedSearch2").trigger("click");
  });
  hopscotch.registerHelper('triggerCompareButtonShow', function() {
    $('#btnCompareBig2').removeClass("hidden");
    if(hopscotch.getCurrTour().id=="maptour-xs") {// add this to the second to last step
      t="Mobile";
    }else{
      t="Desktop";
    }
     _trackClickEventWithGA("Tour", t, "Tour Completed" );
  });
    hopscotch.registerHelper('triggerCompareButtonHide', function() {
    $('#btnCompareBig2').addClass("hidden");
  });
  hopscotch.registerHelper('trackStartDesktop', function() {
    _trackClickEventWithGA("Tour", "Desktop", "Start Tour");
  });
  // hopscotch.registerHelper('trackStartMobile', function() {
  //   _trackClickEventWithGA("Tour", "Next", "Start Mobile Tour");
  // });



   if ($( window ).width() < 768 ) {
      hopscotch.startTour(maptourxs, 0);
    }else{
       hopscotch.startTour(maptourlg, 0);
    }
}



function trackTour() {
  if ($( window ).width() < 768 ) {
    _trackClickEventWithGA("Click", "Info", "Start Tour Button - Mobile");
  }else{
    _trackClickEventWithGA("Click", "Info", "Start Tour Button - Desktop");
  }
}


function isMobile() {
	if( $( window ).width() > 767 ) {
		return false;
	}else{
		return true;
	}
}


function getColors(type){
  // set up variables for future coloring of text and backgrounds
  var headcolor = "#333";
  var bkgcolor = "#eee";

  if (type == "Elementary School" || type == "Elementary Charter") {
    var headcolor = "#36C";
    var bkgcolor = "#EAF2FD";
  }
  if (type == "High School" || type == "High School Charter") {
    var headcolor = "#d73e3e";
    var bkgcolor = "#FCECEC";
  }
  if (type == "Middle School" || type == "Middle School Charter") {
    var headcolor = "#F90";
    var bkgcolor = "#FFF6E8";
  }
  return [headcolor, bkgcolor]
}



function exportCompareTable(){
  alert("Export using Chrome or Firefox broswers.")
	  $("#tblCompare").table2excel({
	    // exclude CSS class
	    exclude: ".noExl",
	    name: "CompareSchools",
	    filename: "CPS-CompareSchools" //do not include extension
	  });
	}


//
function emailCompareTable(){
  //alert("Email using Chrome or Firefox broswers.")
  var email = '';
  var subject = 'CPS-CompareSchools';
  var emailBody = $("#tblCompare").text();
  //var attach = 'path';
  window.location.href = "mailto:"+email+"?subject="+subject+"&body="+emailBody ;
  //+"?attach="+attach;

	}
