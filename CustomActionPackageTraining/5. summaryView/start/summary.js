    // Type aliases (short names)
    var KASFormPageNavigator = KASClient.UI.KASFormPageNavigator;
    var KASFormPage = KASClient.UI.KASFormPage;
    var KASFormEmptyModule = KASClient.UI.KASFormEmptyModule;
    var KASFormDetailsModule = KASClient.UI.KASFormDetailsModule;
    var KASFormImageTitleSubtitleActionModule = KASClient.UI.KASFormImageTitleSubtitleActionModule;
    var printf = KASClient.App.printf;

    // Globals
    var _form = null; // type: KASForm
    var _myFormResponses; // type: Array<KASFormResponse>
    var _creatorInfo; // type: KASUser
    var _conversationName; // type: string
    var _currentUserId; // type: string
    var _pageNavigator = null; // type: KASFormPageNavigator
    var _strings = null;

    // Question index

    var slideIndex = 1;
    function plusSlides(n) {
      showSlides(slideIndex += n);
    }

    function currentSlide(n) {
      showSlides(slideIndex = n);
    }

    function showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("slides");
      if (n > slides.length) { slideIndex = 1 }
      if (n < 1) { slideIndex = slides.length }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slides[slideIndex - 1].style.display = "block";
    }
    function inflateHeader() {
      var header = document.getElementById("header");
      KASClient.UI.clearElement(header);

      var navigationBar = new KASClient.UI.KASFormPageNavigationBar();

      navigationBar.iconPath = "AppIcon.png";

      var mainText = KASClient.UI.getElement("div", {
        "font-size": "18px",
        "color": "#32495f",
        "max-width": "300pt"
      });
      mainText.innerText = _strings["strMainTitle"];

      navigationBar.title = mainText.outerHTML;

      navigationBar.backAction = function () {
        KASClient.App.dismissCurrentScreen();
      };

      KASClient.UI.addElement(navigationBar.getView(), header);
    }

    function showError(errorMsg) {
      KASClient.App.showNativeErrorMessage(errorMsg);
    }

    function onPageLoad() {
      // Uncomment to test with mock data
      // KASClient.enableMockData();

      // Global error handling

      // Remove any existing pages, if any
      if (_pageNavigator) {
        _pageNavigator.popAllPages();
        _pageNavigator = null;
      }
      KASClient.App.getLocalizedStringsAsync(function (strings, error) {
        if (error != null) {
          showAlert("Error:GetFormAsync:" + error);
          return;
        }
        _strings = strings;
        KASClient.Form.getFormAsync(function (form, error) {
          if (error != null) {
            handleError(error);
            return;
          }
          _form = form;
          KASClient.App.getCurrentUserIdAsync(function (userId, error) {
            if (error != null) {
              handleError(error);
              return;
            }
            _currentUserId = userId;
            KASClient.Form.getMyFormResponsesAsync(function (responses, error) {
              if (error != null) {
                handleError(error);
                return;
              }
              _myFormResponses = responses[0];
              KASClient.App.getUsersDetailsAsync([_currentUserId], function (users, error) {
                if (error != null) {
                  handleError(error);
                  return;
                }
                _creatorInfo = users[_currentUserId];
                KASClient.App.getConversationNameAsync(function (name, error) {
                  if (error != null) {
                    handleError(error);
                    return;
                  }
                  _conversationName = name;
                  showSummaryPage();
                });
              });
            });
          });
        });
      });
    }

    //////////////////////////////////////////
    ////////////// ERROR SCREEN //////////////
    //////////////////////////////////////////

    function handleError(errorMsg) {
      hideProgressBar();
      showErrorScreen();
    }

    function showErrorScreen() {
      if (_pageNavigator == null) {
        _pageNavigator = new KASFormPageNavigator();
        var container = document.getElementById("pageNavigator");
        KASClient.UI.addElement(_pageNavigator.getView(), container);
      }

      var errorPage = new KASFormPage();
      errorPage.navigationBar.iconPath = "AppIcon.png";
      errorPage.navigationBar.title = _strings["strMiniAppTitle"];
      errorPage.moduleContainer.backgroundColor = "white";

      var emptyModule = new KASFormEmptyModule();
      emptyModule.title = "Error";
      emptyModule.subtitle = "Error";
      if (!_pageNavigator.containsPages()) {
        emptyModule.actionTitle = "Error";
        emptyModule.action = onPageLoad;
      }

      errorPage.moduleContainer.addModule(emptyModule);

      _pageNavigator.pushPage(errorPage);
    }

    ////////////////////////////////////////////
    ////////////// SUMMARY SCREEN //////////////
    ////////////////////////////////////////////

    function inflateResponses() {

      document.body.style.backgroundColor = "#f2f2f2";

      var summaryView = document.getElementById("details");
      KASClient.UI.clearElement(summaryView);

      var divAttributes = {
        "background-color": "white",
        "color": "#32485f",
        "margin": "8px 12px",
        "box-shadow": "0px 0px 1px 0px rgba(0,0,0,0.12)",
      };

      // Topic details 

      var flightDetailsDiv = KASClient.UI.getElement("div", divAttributes);

      var flightDetailsHeader = KASClient.UI.getElement("div");
      flightDetailsHeader.className = "comment-header";
      flightDetailsHeader.innerText = _strings["strFlightNo"];
      KASClient.UI.addElement(flightDetailsHeader, flightDetailsDiv);
      var flightDetailsView = KASClient.UI.getElement("div", {
        "padding": "0px 12px",
        "padding-bottom": "12px"
      });

      var flight = KASClient.UI.getElement("div", {
        "color": "#32485f",
        "font-size": "16px",
        "overflow-wrap": "break-word",
        "word-wrap": "break-word",
        "word-break": "break-word"
      });

      flight.innerHTML = _myFormResponses.questionToAnswerMap[FLIGHTNO];

      KASClient.UI.addElement(flight, flightDetailsView);
      KASClient.UI.addElement(flightDetailsView, flightDetailsDiv);

      KASClient.UI.addElement(flightDetailsDiv, summaryView);


      if (_myFormResponses.questionToAnswerMap[FLIGHTDATE] != 0) {
        var dateDetailsDiv = KASClient.UI.getElement("div", divAttributes);

        var dateDetailsHeader = KASClient.UI.getElement("div");
        dateDetailsHeader.className = "comment-header";
        dateDetailsHeader.innerText = _strings["issueDateTitle"];
        KASClient.UI.addElement(dateDetailsHeader, dateDetailsDiv);
        var dateDetailsView = KASClient.UI.getElement("div", {
          "padding": "0px 12px",
          "padding-bottom": "12px"
        });

        var date = KASClient.UI.getElement("div", {
          "color": "#32485f",
          "font-size": "16px",
          "overflow-wrap": "break-word",
          "word-wrap": "break-word",
          "word-break": "break-word"
        });

        var _date = new Date(parseInt(_myFormResponses.questionToAnswerMap[FLIGHTDATE]));
        date.innerHTML = _dueDate = KASClient.getDateString(_date);

        KASClient.UI.addElement(date, dateDetailsView);
        KASClient.UI.addElement(dateDetailsView, dateDetailsDiv);

        KASClient.UI.addElement(dateDetailsDiv, summaryView);
      }
      var happinessDiv = KASClient.UI.getElement("div", divAttributes);

      var happinessHeader = KASClient.UI.getElement("div");
      happinessHeader.className = "comment-header";
      happinessHeader.innerText = _strings["Issue Type"];
      KASClient.UI.addElement(happinessHeader, happinessDiv);
      var happinessView = KASClient.UI.getElement("div", {
        "padding": "0px 12px",
        "padding-bottom": "12px"
      });

      var happiness = KASClient.UI.getElement("div", {
        "color": "#32485f",
        "font-size": "16px",
        "overflow-wrap": "break-word",
        "word-wrap": "break-word",
        "word-break": "break-word"
      });

	  var happinessIndex = _myFormResponses.questionToAnswerMap[HAPPINESS];
      happiness.innerHTML = [_strings[_form.questions[HAPPINESS].options[happinessIndex].text]];
      KASClient.UI.addElement(happiness, happinessView);
      KASClient.UI.addElement(happinessView, happinessDiv);

      KASClient.UI.addElement(happinessDiv, summaryView);
	  

      var messageDetailsDiv = KASClient.UI.getElement("div", divAttributes);

      var messageDetailsHeader = KASClient.UI.getElement("div");
      messageDetailsHeader.className = "comment-header";
      messageDetailsHeader.innerText = _strings["strIssueDetails"];
      KASClient.UI.addElement(messageDetailsHeader, messageDetailsDiv);
      var messageDetailsView = KASClient.UI.getElement("div", {
        "padding": "0px 12px",
        "padding-bottom": "12px"
      });

      var message = KASClient.UI.getElement("div", {
        "color": "#32485f",
        "font-size": "16px",
        "overflow-wrap": "break-word",
        "word-wrap": "break-word",
        "word-break": "break-word"
      });

      message.innerHTML = _myFormResponses.questionToAnswerMap[ISSUEDETAILS];

      KASClient.UI.addElement(message, messageDetailsView);
      KASClient.UI.addElement(messageDetailsView, messageDetailsDiv);

      KASClient.UI.addElement(messageDetailsDiv, summaryView);

      if (_myFormResponses.questionToAnswerMap[IMAGES[0]] != "") {
        var attachmentDetailsDiv = KASClient.UI.getElement("div", divAttributes);

        var attachmentDetailsHeader = KASClient.UI.getElement("div");
        attachmentDetailsHeader.className = "comment-header";
        attachmentDetailsHeader.innerText = _strings["strAttachedImages"];
        KASClient.UI.addElement(attachmentDetailsHeader, attachmentDetailsDiv);

        var model = KASClient.UI.getElement("div", { "padding-bottom": "16px" });

        var modelContent = KASClient.UI.getElement("div");
        modelContent.className = "modal-content";

        var length = 0;
        var images = [];
        for (i = 0; i < IMAGES.length && (_myFormResponses.questionToAnswerMap[IMAGES[i]] != ""); i++) {
          length++;
          images.push(_myFormResponses.questionToAnswerMap[IMAGES[i]]);

        }

        for (i = 0; i < IMAGES.length && (_myFormResponses.questionToAnswerMap[IMAGES[i]] != ""); i++) {

          var slide = KASClient.UI.getElement("div");
          slide.className = "slides";

          var numbertext = KASClient.UI.getElement("div");
          numbertext.className = "numbertext";
          numbertext.innerHTML = (i + 1) + " / " + length;

          var descriptionImage = KASClient.UI.getElement("img", { "width": "100%" });
          descriptionImage.src = _myFormResponses.questionToAnswerMap[IMAGES[i]];
          descriptionImage.id = i;

          descriptionImage.onclick = function () {
            KASClient.App.showImageImmersiveView(images, this.id);
          };

          KASClient.UI.addElement(numbertext, slide);
          KASClient.UI.addElement(descriptionImage, slide);

          KASClient.UI.addElement(slide, modelContent);

          if (length == 1)
            numbertext.style.display = "none";

        }
        if (length != 1) {
          var prev = KASClient.UI.getElement("a");
          prev.className = "prev";
          prev.onclick = function () { plusSlides(-1) };
          prev.innerHTML = "&#10094";

          var next = KASClient.UI.getElement("a");
          next.className = "next";
          next.onclick = function () { plusSlides(1) };
          next.innerHTML = "&#10095";

          KASClient.UI.addElement(prev, modelContent);
          KASClient.UI.addElement(next, modelContent);
        }

        KASClient.UI.addElement(modelContent, model);

        KASClient.UI.addElement(model, attachmentDetailsDiv);

        KASClient.UI.addElement(attachmentDetailsDiv, summaryView);

        showSlides(slideIndex);

      }

    }

    function showSummaryPage() {
      inflateHeader();
      inflateResponses();
    }

    function showError(errorMsg) {
      hideProgressBar();
      KASClient.App.showNativeErrorMessage(errorMsg);
    }

    function dismissCurrentScreen() {
      KASClient.App.dismissCurrentScreen();
    }