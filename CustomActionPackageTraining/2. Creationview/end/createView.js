var _question="";
var TOTAL_PAGE = 1;
var _currentPage = 1;
var _strings;
var _form;
function onPageLoad() {
    KASClient.App.registerHardwareBackPressCallback(function() {
        KASClient.App.dismissCurrentScreen();
    });
    KASClient.App.getLocalizedStringsAsync(function(string, error) {
        if(error != null) {
            KASClient.showAlert("Error in fetching localized string : "+error);
        }
        _strings = string;
        KASClient.Form.initFormAsync(function(form, error) {
            if(error!= null) {
                KASClient.showAlert("Error in fetching form : "+error);
            }
            _form = form;
            inflateHtml();
        });
    });
}

function inflateHtml() {
    inflateHeader();
    inflateQuestions();
    inflateFooterView();
}


function inflateQuestions() {
    inflateInputBox(document.getElementById("questionDiv"), 'Enter Your Question', 'Tap to enter', function(event) {
        _question = event.target.value;
    });
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
    mainText.innerText = "Card Development";

    navigationBar.title = mainText.outerHTML;

    KASClient.UI.addElement(navigationBar.getView(), header);
}

function inflateInputBox(element, title, addText, callback) {
    KASClient.UI.clearElement(element);

    var elementTitle = KASClient.UI.getElement("div");
    elementTitle.className = "question-title";
    elementTitle.innerText = title;
    KASClient.UI.addElement(elementTitle, element);
    var ElementInput = KASClient.UI.getElement("input", {
            "font-size": "16px",
            'border-bottom': '1px solid #e0e3e7',
            'height': '30px'
        });
    ElementInput.className = "comment-input";
    if (KASClient.getPlatform() == KASClient.Platform.iOS) {
        KASClient.UI.addCSS(ElementInput, { "padding-left": "10pt" });
    }
    ElementInput.placeholder = addText;
    ElementInput.addEventListener("input", callback);

    KASClient.UI.addElement(ElementInput, element);
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
    prevButton.addEventListener("click", function() {
        _currentPage -= 1;
       // updatePage();
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

    progressText.innerText = KASClient.App.printf("{0} of {1}", _currentPage, TOTAL_PAGE);

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
    nextButton.value = (_currentPage == TOTAL_PAGE ? "Send" : "");
    var nextButtonIsDisabled = false;

    nextButton.disabled = nextButtonIsDisabled;
    if (KASClient.getPlatform() == KASClient.Platform.Android && nextButton.disabled) {
        KASClient.UI.addCSS(nextButton, { "background-color": "rgb(155, 218, 253)" });
    }
    nextButton.addEventListener("click", function() {
        if (_currentPage != TOTAL_PAGE) {
            _currentPage += 1;
           // updatePage();
            document.body.scrollTop = 0;
        } else {
           submitFeedback();
        }
    });

    KASClient.UI.addElement(prevButton, footer);
    KASClient.UI.addElement(progressDiv, footer);
    KASClient.UI.addElement(nextButton, footer);
    //  KASClient.UI.addElement(prevButton, footer);
}

function submitFeedback() {

    _form.questions.push(getTextQuestion(_question));
    KASClient.Form.submitFormRequest(_form);

}

function getTextQuestion(title) {
    var q = new KASClient.KASQuestion();
    q.id=3;
    q.type = KASClient.KASQuestionType.Text;
    q.title = title;
    q.config = new KASClient.KASQuestionConfig();
    return q;
}