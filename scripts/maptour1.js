 var maptourlg = {
      id: "maptour-lg",
     steps: [
        {
          title: "Start Your Search",
          content: "Enter a school name, or a zip code or your address to find a school you can attend. You can also click and hold on the map for 2 seconds to drop a pin and search for schools.",
          target: "autocomplete",
          placement: "bottom",
          xOffset: 60,
          yOffset: -5,
          onNext: ["trackStartDesktop"]
        },
        {
          title: "Show All Schools",
          content: "Click the magnifying glass to show all schools. Only works when the search field is empty.",
          target:  "btnSearch",
          placement: "bottom",
          xOffset: -20,
          yOffset: 0
        },
        {
          title: "Reset Map",
          content: "This button resets the map.",
          target:  "btnResetMap",
          placement: "left",
          xOffset: 3,
          yOffset: -3
        },
        {
          title: "Find Me",
          content: "This button attempts to locate you and searches for schools around you.",
          target: "btnFindMe",
          placement: "left",
          xOffset: 3,
          yOffset: -3
        },
        {
          title: "Overlays",
          content: "Use this button to display overlays.",
          target: "btnAdvancedSearch",
          placement: "left",
          xOffset: 3,
          yOffset: -3,
          onNext: ["triggeroverlayClickOpen"]
        },
         {
          title: "Overlays",
          content: "Overlays appear on top of the existing map to help denote specific boundaries or regions.",
          target: "headingFive",
          placement: "left",
          delay: 600,
          onNext: ["triggeroverlayClickClose"],
          onPrev: ["triggeroverlayClickClose"]
        },
         {
          title: "Information",
          content: "This button will display the map legend, important phone numbers, Frequently Asked Questions, and a downloadable PDF of the map, and the ability to send feedback.",
          target: "btnHelp",
          placement: "left",
          xOffset: 3,
          yOffset: -3,
          onPrev: ["triggeroverlayClickOpen"],
          onNext: ["triggerLegendClickOpen"]
        },
        {
          title: "Map Legend",
          content: "The legend describes the items on the map.",
          target: "collapseLegend",
          placement: "top",
          yOffset: 0,
          delay: 600,
          onPrev: ["triggerLegendClickClose"],
          onNext: ["triggerLegendClickClose"]
        },

         {
          title: "Zoom In",
          content: "Use this button to zoom in on the map. Alternatively, double-clicking the left mouse button or pinching in will zoom in.",
          target: "btnZoomIn",
          placement: "right",
          yOffset: -100,
		      arrowOffset: 100,
          onPrev: ["triggerLegendClickOpen"]
        },
         {
          title: "Zoom Out",
          content: "Use this button to zoom out on the map. Alternatively, double-clicking the right mouse button or pinching out will zoom out.",
          target: "btnZoomOut",
          placement: "right",
		      arrowOffset: 130,
          yOffset: -130,
          onNext: ["triggerCompareButtonShow"]
        }
        ,
         {
          title: "Compare Schools",
          content: "Use this button to show/hide the Compare Schools List",
          target: "btnCompareBig2",
          placement: "right",
          arrowOffset: 50,
          yOffset: -50,
          onPrev: ["triggerCompareButtonHide"]
        }
      ],
      //onStart: function() {
                  //$("button.dropdown-toggle").dropdown("toggle");
                  //},
      onEnd: function() {
        $('#btnCompareBig2').addClass("hidden");
        // var step=hopscotch.getCurrStepNum();
        // var tstep=hopscotch.getCurrTour().steps.length;
        // if( step==tstep) {//at the end
        //   _trackClickEventWithGA("Tour", "Desktop", "End Tour" );
        // }else{
        //   _trackClickEventWithGA("Tour", "Desktop", "Close Tour at Step "+step.toString() );
        // }
                  },
      onClose: function() {//close button clicked
                  _trackClickEventWithGA("Tour", "Desktop", "Close Tour at Step "+hopscotch.getCurrStepNum().toString() );
                },
      onError: function() {
                  _trackClickEventWithGA("Tour", "Desktop", "Error at Step "+hopscotch.getCurrStepNum().toString() );
                },

      showPrevButton: true,
      bubbleWidth: 180,
      skipIfNoElement :true
    }

var maptourxs = {
      id: "maptour-xs",
     steps: [
        {
          title: "Start Your Search",
          content: "Enter a school name, or a zip code or your address to find a school you can attend. You can also click and hold on the map for 2 seconds to drop a pin and search for schools.",
          target: "autocomplete",
          placement: "bottom",
          xOffset: 60,
          yOffset: -5

        },
        {
          title: "Show All Schools",
          content: "Click the magnifying glass to show all schools. Only works when the search field is empty.",
          target:  "btnSearch",
          placement: "left",
          xOffset: 0,
          yOffset: -15,
          onNext: ["triggerButtonsOpen"]
        },
        {
          title: "Information",
          content: "This button will display important phone numbers, Frequently Asked Questions, a downloadable PDF of the map, and the ability to send feedback.",
          target: "btnHelp",
          placement: "left",
          yOffset: 0,
          delay: 600,
          onNext: ["triggerLegendClickOpen"],
          onPrev: ["triggerButtonsClose"]
        },
        {
          title: "Map Legend",
          content: "The legend describes the items on the map.",
          target: "collapseLegend",
          placement: "top",
          yOffset: 0,
          delay: 600,
          onPrev: ["triggerLegendClickClose"],
          onNext: ["triggerLegendClickClose"]
        },
        {
          title: "Overlays",
          content: "Use this button to display overlays.",
          target: "btnAdvancedSearch",
          placement: "left",
          yOffset: 0,
          onPrev: ["triggerLegendClickOpen"],
          onNext: ["triggeroverlayClickOpen"]
        },
         {
          title: "Overlays",
          content: "Overlays appear on top of the existing map to help denote specific boundaries or regions.",
          target: "headingFive",
          placement: "top",
          delay: 600,
          yOffset: 100,
          onNext: ["triggeroverlayClickClose"],
          onPrev: ["triggeroverlayClickClose"]
        },
        {
          title: "Find Me",
          content: "This button attempts to locate you and searches for schools around you.",
          target: "btnFindMe",
          placement: "left",
          yOffset: 0,
          onPrev: ["triggeroverlayClickOpen"]
        },
        {
          title: "Reset Map",
          content: "This button resets the map.",
          target:  "btnResetMap",
          placement: "left",
          yOffset: 0
        },
         {
          title: "Zoom In",
          content: "Use this button to zoom in on the map. Alternatively, double-clicking the left mouse button or pinching in will zoom in.",
          target: "btnZoomIn",
          placement: "right",
          yOffset: -100,
		      arrowOffset: 100,
        },
         {
          title: "Zoom Out",
          content: "Use this button to zoom out on the map. Alternatively, double-clicking the right mouse button or pinching out will zoom out.",
          target: "btnZoomOut",
          placement: "right",
		      arrowOffset: 130,
          yOffset: -130,
          onNext: ["triggerCompareButtonShow"]
        },
         {
          title: "Compare Schools",
          content: "Use this button to show/hide the Compare Schools List",
          target: "btnCompareBig2",
          placement: "right",
          arrowOffset: 50,
          yOffset: -50,
          onPrev: ["triggerCompareButtonHide"]
        }
      ],
      // onStart: function() {
      //             $("#collapseButtons").collapse('show');
      //           },

      onEnd: function() {
        // var step=hopscotch.getCurrStepNum();
        // var tstep=hopscotch.getCurrTour().steps.length;
        // if( step==tstep) {//at the end
        //   _trackClickEventWithGA("Tour", "Mobile", "End Tour" );
        // }else{
        //   _trackClickEventWithGA("Tour", "Mobile", "Close Tour at Step "+step.toString() );
        // }
                  },
      onClose: function() {
         _trackClickEventWithGA("Tour", "Mobile", "Close Tour at Step "+hopscotch.getCurrStepNum().toString() );
                },
      onError: function() {
                  _trackClickEventWithGA("Tour", "Mobile", "Error at Step "+hopscotch.getCurrStepNum().toString() );
                },
      showPrevButton: true,
      bubbleWidth: 180,
      skipIfNoElement :true
    }

     //hopscotch.startTour(tour);
