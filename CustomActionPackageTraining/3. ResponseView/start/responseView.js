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
    mainText.innerText = _strings['strMiniAppTitle'];

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

function inflateDropDown(element, title, selectText, values, callback, dafaultValue) {
    KASClient.UI.clearElement(element);

    var topicTitle = KASClient.UI.getElement("div");
    topicTitle.className = "question-title";
    topicTitle.innerText = title;
    KASClient.UI.addElement(topicTitle, element);

    var optionDiv = KASClient.UI.getElement("div");
    optionDiv.className = "option-div";
    optionDiv.id = "optionDiv"
    KASClient.UI.addElement(dropdownOption(selectText, values, callback, dafaultValue), optionDiv);
    KASClient.UI.addElement(optionDiv, element);

}

function dropdownOption(selectText, values, callback, dafaultValue) {
    var selectDiv = document.createElement("div", {'color' : '#006ff1'});
    selectDiv.className = "select";
    var optionListDiv = document.createElement("select", {'background': 'none'});
    if(!!selectText && dafaultValue == undefined) {
        var opt = document.createElement('option');
        opt.style.color = '#98a3af';
        opt.value = selectText;
        opt.innerHTML = selectText;
        opt.disabled = true;
        opt.selected = true;
        optionListDiv.appendChild(opt);
    }

    for (var i = 0; i < values.length; i++) {
        opt = document.createElement('option');
        opt.style.color = '#32485f';
        opt.value = values[i];
        if(!!_strings[values[i]]) {
            opt.innerHTML = _strings[values[i]];
        } else {
            opt.innerHTML = values[i];
        }
        if(!!dafaultValue && dafaultValue == values[i]) {
            opt.selected = true;
        }
        if(selectText == undefined && dafaultValue == undefined && i==0) {
            opt.selected=true;
        }
        optionListDiv.appendChild(opt);
    }

    optionListDiv.addEventListener("change", callback);

    KASClient.UI.addElement(optionListDiv, selectDiv);

    return selectDiv;

}

function inflateAttachmentDiv(imagesDiv, title, attachmentList, id) {
    //  var imagesDiv = document.getElementById("imagesDiv");
    //   KASClient.UI.clearElement(imagesDiv);

    var imagesDetailsTitle = KASClient.UI.getElement("div");
    imagesDetailsTitle.className = "question-title";
    imagesDetailsTitle.innerText = title;
    KASClient.UI.addElement(imagesDetailsTitle, imagesDiv);

    var descriptionImage = KASClient.UI.getElement("img");
    descriptionImage.className = "section-img";
    descriptionImage.id = id; //"AttachmentImage";
    descriptionImage.src = "AttachmentIcon.png";

    var imageDiv = KASClient.UI.getElement("div", {
        "position": "relative"
    });

    KASClient.UI.addElement(descriptionImage, imageDiv);

    var imagesContainerDiv = KASClient.UI.getElement("div", {
        "overflow-x": "auto",
        "-webkit-overflow-scrolling": "touch",
        "margin-left": "15pt",
        "margin-right": "15pt",
        "margin-bottom": "15pt"
    });
    imagesContainerDiv.id = "scroll-div";

    var horizontalImageDiv = KASClient.UI.getHorizontalDiv([imageDiv], { "justify-content": "flex-start" });

    KASClient.UI.addElement(horizontalImageDiv, imagesContainerDiv);
    KASClient.UI.addElement(imagesContainerDiv, imagesDiv);
    descriptionImage.onclick = function() { selectImage(attachmentList, horizontalImageDiv, id) };

}

function selectImage(attachmentList, horizontalImageDiv, id) {
    KASClient.App.showAttachmentPickerAsync([KASClient.KASAttachmentType.Image], { "is": 1 }, function(selectedAttachments, error) {
        if (error != null) {
            return;
        }

        for (var i = 0; i < selectedAttachments.length; i++) {
            if (attachmentList.length < 5) {
                showSelectedImage(selectedAttachments[i], attachmentList, horizontalImageDiv, id);
                //   attachmentPaths.push(selectedAttachments[i].localPath);
                attachmentList.push(selectedAttachments[i]);
                var attachmentIcon = document.getElementById(id);
                if (attachmentList.length >= 5) {

                    attachmentIcon.parentElement.style.display = "none";
                }
                if (attachmentList.length != 0) {
                    attachmentIcon.src = "AddIcon.png";
                } else {
                    attachmentIcon.src = "AttachmentIcon.png";
                }
            }
        }
    });
}

function showSelectedImage(attachment, attachmentList, horizontalImageDiv, id) {
    var descriptionImage;

    if (attachment.type == KASClient.KASAttachmentType.Image) {
        descriptionImage = KASClient.UI.getElement("img");
        descriptionImage.className = "section-selected-img";
        descriptionImage.id = attachment.localPath + "image";
        descriptionImage.src = attachment.localPath;
    } else {
        descriptionImage = getDocumentThumbnail(attachment);
    }

    var cancelImage = KASClient.UI.getElement("img");
    cancelImage.className = "cancel-img";
    cancelImage.id = attachment.localPath;
    cancelImage.src = "cancelIcon.png";
    cancelImage.onclick = function() { cancelImageClick(attachmentList, horizontalImageDiv, id) };

    var imageDiv = KASClient.UI.getElement("div", {
        "position": "relative",
        "margin-right": "8pt",
        "margin-top": "5pt",
        "margin-bottom": "5pt",
        "margin-left": "1pt"
    });

    imageDiv.id = attachment.localPath + "div";

    KASClient.UI.addElement(descriptionImage, imageDiv);
    KASClient.UI.addElement(cancelImage, imageDiv);

    horizontalImageDiv.insertBefore(imageDiv, horizontalImageDiv.lastElementChild);
}

function cancelImageClick(attachmentList, horizontalImageDiv, id) {
    var value = event.target.id;

    var imgDiv = document.getElementById(value + "div");
    horizontalImageDiv.removeChild(imgDiv);

    var index = attachmentList.indexOf(value);
    //  attachmentPaths.splice(index, 1);
    attachmentList.splice(index, 1);

    var attachmentIcon = document.getElementById(id);
    if (attachmentList.length < 5) {
        attachmentIcon.parentElement.style.display = "block";
    }
    if (attachmentList.length != 0) {
        attachmentIcon.src = "AddIcon.png";
    } else {
        attachmentIcon.src = "AttachmentIcon.png";
    }
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