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
    var _messageProperties;
    var _isOutGoing = false;
    var _isAutoDownloadEnabled = false;

    var imageAttachmentsHaveAllLocalPaths = true;
    var imageAttachmentsHaveAllServerPaths = true;
    var _isImageDownloading = false;

    // Question index

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
      // Remove any existing pages, if any
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
              KASClient.Internal.getMessagePropertiesAsync(function (properties, error) {
                if (error != null) {
                  handleError(error);
                  return;
                }
                _messageProperties = properties;
                processMessageProperties();
  
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

    function processMessageProperties() {
      if (_messageProperties) {
        if (_messageProperties.hasOwnProperty("isAutoDownloadEnabled")) {
          _isAutoDownloadEnabled = _messageProperties["isAutoDownloadEnabled"];
        }

        if (_messageProperties.hasOwnProperty("isOutGoing")) {
          _isOutGoing = _messageProperties["isOutGoing"];
        }

        if (_messageProperties.hasOwnProperty("isDocumentDownloading")) {
          _isDocumentDownloading = _messageProperties["isDocumentDownloading"];
        }
        if (_messageProperties.hasOwnProperty("isAudioDownloading")) {
          _isAudioDownloading = _messageProperties["isAudioDownloading"];
        }
        if (_messageProperties.hasOwnProperty("isImageDownloading")) {
          _isImageDownloading = _messageProperties["isImageDownloading"];
        }

      }
    }

    function inflateResponses() {
      document.body.style.backgroundColor = "#ffffff";

      var summaryView = document.getElementById("details");
      KASClient.UI.clearElement(summaryView);
      KASClient.UI.addElement(getHeaderDiv('Question Section'), summaryView);
      inflateResponseValues(0, summaryView);
      inflateResponseValues(1, summaryView);
      if(JSON.parse(_myFormResponses.questionToAnswerMap[2]).length >0) {
        KASClient.UI.addElement(getTitleElement(_form.questions[2].title), summaryView);
        inflateAlbum(2, summaryView);  
      }
      inflateResponseValues(3, summaryView);
    }

    function inflateResponseValues(index, summaryView) {
        if(_form.questions[index].type == 0) {
          KASClient.UI.addElement(inflateValues(_form.questions[index].options[_myFormResponses.questionToAnswerMap[index]].text, _form.questions[index].title), summaryView);
        }else {
          if(!!_myFormResponses.questionToAnswerMap[index]){
            KASClient.UI.addElement(inflateValues(_myFormResponses.questionToAnswerMap[index], _form.questions[index].title), summaryView);
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
    function inflateAlbum(index, summaryView) {
      if(_myFormResponses.questionToAnswerMap[index] !== undefined)
      var imageAttacments=[];
      var attachments = JSON.parse(_myFormResponses.questionToAnswerMap[index]);
      for(var i=0; i<attachments.length; i++) {
        imageAttacments.push(KASClient.KASAttachmentFactory.fromJSON(attachments[i]));
      }
        KASClient.UI.addElement(getAlbumView(imageAttacments), summaryView);
    }

    function getAlbumView(imageAttachments) {
      var model = new KASClient.UI.KASAlbumViewModel();
      model.hasStaticImages = false;
      model.enableOnTap = true;
      model.imageObjects = imageAttachments;
      model.isAutoDownloadEnabled = _isAutoDownloadEnabled;
      model.isDownloading = _isImageDownloading;
      model.allLocalPathsAvailable = imageAttachmentsHaveAllLocalPaths;
      model.allServerPathsAvailable = imageAttachmentsHaveAllServerPaths;
    //  model.thumbnailBase64 = _imageAttachments[0].thumbnail;
      var albumViewHandler = new KASClient.UI.KASAlbumViewHandler(model);

      var albumDiv = KASClient.UI.getElement('div', {  "height": "210px", "margin-left": "16px","margin-right": "16px" });
      KASClient.UI.addElement(albumViewHandler.getAlbumView(), albumDiv);
      return albumDiv;
    }

    function inflateValues(addText, title) {
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
        ElementInput.innerHTML = addText;
      } else {
        ElementInput.innerHTML = 'NA';
      }
      KASClient.UI.addElement(ElementInput, element);
      return element;
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