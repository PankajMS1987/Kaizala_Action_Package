
    // Type aliases (short names)
    var printf = KASClient.App.printf;

    // Globals
    var _form; // type: KASForm
    var _strings = null;
    var TOTAL_PAGE = 1;
    var _currentPage = 1;
    var textAreaDiv;
    var _text = "";

    function onPageLoad() {

        // Register for Android h/w back press event
        KASClient.App.registerHardwareBackPressCallback(function () {
            KASClient.App.dismissCurrentScreen();
        });
        // Get the default form
        KASClient.App.getLocalizedStringsAsync(function (strings, error) {
            if (error != null) {
                showAlert("Error:GetFormAsync:" + error);
                return;
            }
            _strings = strings;

            KASClient.Form.getFormAsync(function (form, error) {
                if (error != null) {
                    showAlert("Error:GetFormAsync:" + error);
                    return;
                }
                _form = form;
                inflateHTML();
                inflateQuestions();        

            });
        });
    }

    
    // handling UI
    function inflateHTML() {
        // header
        inflateHeader();
        updatePage();
    }

    function updatePage() {
        for (var i = 1; i <= TOTAL_PAGE; i++) {
            document.getElementById("page" + i).style.display = _currentPage == i ? "block" : "none";
            // document.body.style.backgroundColor = _currentPage == TOTAL_PAGE ? "#f2f2f2" : "white";
        }
        // footer
        inflateFooterView();
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

    function addFocusUnfocusEventForDiv(div, sectionId) {
        div.onfocus = function () {
            KASClient.UI.addCSS(document.getElementById(sectionId), { "border-bottom": "solid 1.5px #00a1ff" });
        };
        div.onblur = function () {
            KASClient.UI.addCSS(document.getElementById(sectionId), { "border-bottom": "solid .5px #d4d8db" });
        };
    }

    function inflateQuestions() {
        textAreaDiv = inflateTextAreaBox(document.getElementById("speechDiv"), _form.questions[0].title, 'Tap to enter', function(event) {
            _text = event.target.value;
            invalidateFooter();
         });
    }

    function initiateSpeechToText() {
        KASClient.App.performSpeechToTextAsync(function(text, error) {
            if(error != null) {
                //Log error 
                console.log(error);
                return;
            }
            _text = text;
            textAreaDiv.value = text;
        });
    }

    function inflateTextAreaBox(element, title, addText, row, callback) {
        KASClient.UI.clearElement(element);
    
        var elementTitle = KASClient.UI.getElement("div");
        elementTitle.className = "question-title";
        elementTitle.innerText = title;
        KASClient.UI.addElement(elementTitle, element);
    
        var ElementInput = KASClient.UI.getElement("textarea", {
                "font-size": "12pt",
                'border-bottom': '1px solid rgb(224, 227, 231)'
            });
        ElementInput.rows = row;
        ElementInput.className = "comment-input";
        if (KASClient.getPlatform() == KASClient.Platform.iOS) {
            KASClient.UI.addCSS(ElementInput, { "padding-left": "10pt" });
        }
        ElementInput.placeholder = addText;
        ElementInput.addEventListener("input", callback);
    
        KASClient.UI.addElement(ElementInput, element);
        return ElementInput;
    }
    
    function invalidateFooter() {
        inflateFooterView();
    }

    function inflateFooterView() {
        var footer = document.getElementById("footer");
        KASClient.UI.clearElement(footer);

        // setting footer view background
        KASClient.UI.addCSS(footer, { "background-image": "url('footer_bg.png')" });

        // Previous button
        var prevButton = KASClient.UI.getElement("input");
        prevButton.type = "submit";
        prevButton.className = "footer-action-previous";
        prevButton.value = "";
        prevButton.disabled = (_currentPage == 1);
        if (KASClient.getPlatform() == KASClient.Platform.Android && prevButton.disabled) {
            KASClient.UI.addCSS(prevButton, { "border": "1px solid rgba(227, 230, 233, 0.5)" });
        }
        prevButton.addEventListener("click", function () {
            _currentPage -= 1;
            updatePage();
            document.body.scrollTop = 0;
        });

        // Progress view
        var progressDiv = KASClient.UI.getElement("div", {
            "display": "flex",
            "align-items": "center"
        });

        progressDiv.className = "footer-action";

        var progressInnerDiv = KASClient.UI.getElement("div", { "width": "100%" });

        var progressText = KASClient.UI.getElement("div", {
            "width": "100%",
            "text-align": "center",
            "padding-bottom": "3pt",
            "font-size": "11pt",
            "color": "black",
            "font-weight": "500"
        });

        progressText.innerText = printf(_strings["strProgressTextLabel"], _currentPage, TOTAL_PAGE);

        var progressBarOuterDiv = KASClient.UI.getElement("div", {
            "width": "80%",
            "height": "2pt",
            "background-color": "rgba(152, 163, 175, .25)",
            "margin-left": "10%"
        });

        var progressBarInnerDiv = KASClient.UI.getElement("div", {
            "width": "" + (_currentPage * 100 / TOTAL_PAGE) + "%",
            "height": "100%",
            "background-color": "rgb(253, 158, 40)"
        });

        KASClient.UI.addElement(progressBarInnerDiv, progressBarOuterDiv);

        KASClient.UI.addElement(progressText, progressInnerDiv);
        KASClient.UI.addElement(progressBarOuterDiv, progressInnerDiv);

        KASClient.UI.addElement(progressInnerDiv, progressDiv);

        // Next button
        var nextBgColor = (_currentPage == TOTAL_PAGE ? "#5ad7a4" : "#00a1ff");
        var nextButton = KASClient.UI.getElement("input", { "background-color": nextBgColor });
        nextButton.type = "submit";
        nextButton.className = (_currentPage == TOTAL_PAGE ? "footer-action-send" : "footer-action-next");
        nextButton.value = (_currentPage == TOTAL_PAGE ? _strings["strMiniAppSendLabel"] : "");
        var nextButtonIsDisabled = false;
        
        nextButton.disabled = nextButtonIsDisabled;
        if (KASClient.getPlatform() == KASClient.Platform.Android && nextButton.disabled) {
            KASClient.UI.addCSS(nextButton, { "background-color": "rgb(155, 218, 253)" });
        }
        nextButton.addEventListener("click", function () {
            if (_currentPage != TOTAL_PAGE) {
                _currentPage += 1;
                updatePage();
                document.body.scrollTop = 0;
            } else {
                submitFeedback();
            }
        });

        KASClient.UI.addElement(prevButton, footer);
        KASClient.UI.addElement(progressDiv, footer);
        KASClient.UI.addElement(nextButton, footer);
    }

    function submitFeedback() {
        var questionToAnswerMap = JSON.parse("{}");
        questionToAnswerMap[0] = _text;
            // Finally submit the response
        KASClient.Form.sumbitFormResponse(questionToAnswerMap, null, false, true, false);

    }
    function showError(errorMsg) {
        KASClient.App.showNativeErrorMessage(errorMsg);
    }

    // For debug
    function dismissCurrentScreen() {
        KASClient.App.dismissCurrentScreen();
    };