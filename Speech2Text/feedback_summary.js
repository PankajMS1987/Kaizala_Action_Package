    // Type aliases (short names)
    var KASFormPageNavigator = KASClient.UI.KASFormPageNavigator;
    var KASFormPage = KASClient.UI.KASFormPage;
    var KASFormEmptyModule = KASClient.UI.KASFormEmptyModule;
    var KASFormDetailsModule = KASClient.UI.KASFormDetailsModule;
    var KASFormImageTitleSubtitleActionModule = KASClient.UI.KASFormImageTitleSubtitleActionModule;
    var printf = KASClient.App.printf;

    // Globals
    var _form = null; // type: KASForm
    var _pageNavigator = null; // type: KASFormPageNavigator
    var _strings = null;
    var _myFormResponses;

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
      mainText.innerText = _strings["strMiniAppTitle"];

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

      window.onerror = function (msg, url, line, col, error) {
        // col & error are new to the HTML 5, so handling for them
        var extra = (!col && col !== undefined) ? "" : "#column:" + col;
        extra += (!error && error !== undefined) ? "" : "#error:" + error.stack;
        var error = "Error:" + msg + "#url:" + url + "#line:" + line + extra;
        KASClient.App.logError(error);
      };
        // Register for Android h/w back press event
        KASClient.App.registerHardwareBackPressCallback(function () {
            KASClient.App.dismissCurrentScreen();
        });

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
          KASClient.Form.getMyFormResponsesAsync(function (responses, error) {
            if (error != null) {
              handleError(error);
              return;
            }
            _myFormResponses = responses[0];
            showSummaryPage();
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
      document.body.style.backgroundColor = "#ffffff";

      var summaryView = document.getElementById("details");
      KASClient.UI.clearElement(summaryView);
      inflateResponseValues(0,0, summaryView);
    }

    function inflateResponseValues(startIndex, endIndex, summaryView, extraText) {
      for(var i=startIndex; i<= endIndex; i++) {
        if(_form.questions[i].type == 0) {
          KASClient.UI.addElement(inflateValues(_form.questions[i].options[_myFormResponses.questionToAnswerMap[i]].text, _form.questions[i].title, extraText), summaryView);
        }else {
          if(!!_myFormResponses.questionToAnswerMap[i]){
            KASClient.UI.addElement(inflateValues(_myFormResponses.questionToAnswerMap[i], _form.questions[i].title, extraText), summaryView);
          }
        }
      }
    }

    function getHeaderDiv(text) {
      var ele = KASClient.UI.getElement("div", { "background-color": "rgba(152, 163, 175, 0.08)",
        "font-size": "12px",
        "color": "#667787",
        "font-weight": "500",
        "letter-spacing": "2px",
        "margin-top": "15px",
        "padding-top": "9px",
        "padding-bottom": "9px",
        "padding-left": "16px",
      });
      ele.innerHTML = text;
      return ele;
    }

    function getTitleElement(title) {
      var elementTitle = KASClient.UI.getElement("div", { "margin-left": "16px","margin-right": "12px","margin-top": "15px"});
      elementTitle.className = "question-title";
      elementTitle.innerText = title;
      return elementTitle;
    }
    function inflateValues(addText, title, extraText) {
      var element = KASClient.UI.getElement("div");
      element.className = 'section';
      var elementTitle = KASClient.UI.getElement("div");
      elementTitle.className = "question-title";
      elementTitle.innerText = title;
      KASClient.UI.addElement(elementTitle, element);
      var ElementInput = KASClient.UI.getElement("span", {
              "font-size": "16px",
              'height': '30px'
          });
      if (KASClient.getPlatform() == KASClient.Platform.iOS) {
          KASClient.UI.addCSS(ElementInput, { "padding-left": "10pt" });
      }
      if(!!addText && !!addText.trim()) {
        if(!!extraText) {
          addText += extraText;
        }
        ElementInput.innerHTML = addText;
      } else {
        ElementInput.innerHTML = 'NA';
      }
      KASClient.UI.addElement(ElementInput, element);
      return element;
  }
  
      function getDivWithData(data, title, attrib) {
        var divData = KASClient.UI.getElement("div", {
            "color": "#32485f",
            "font-size": "16px",
            "overflow-wrap": "break-word",
            "word-wrap": "break-word",
            "word-break": "break-word"
        });
        divData.className = "comment-header";
        if(attrib != undefined) {
          KASClient.UI.addCSS(divData, attrib);
        }
        var para = KASClient.UI.getElement("p", {"font-weight":"900"});
        para.innerText=title;
        divData.appendChild(para);
        var s = KASClient.UI.getElement("span");
        s.innerText=data;
        divData.appendChild(s);
        return divData;
      }

      function showSummaryPage() {
      inflateHeader();
      inflateResponses();
      //inflateFooterView();
    }

    function showError(errorMsg) {
      hideProgressBar();
      KASClient.App.showNativeErrorMessage(errorMsg);
    }

    function dismissCurrentScreen() {
      KASClient.App.dismissCurrentScreen();
    }
	
	function showProgressBar(text) {
      KASClient.App.showProgressBar(text);
    }

    function hideProgressBar() {
      KASClient.App.hideProgressBar();
    }
	