var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!function (r, t) { "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : r.jsonLogic = t(); }(this, function () {
    "use strict";
    Array.isArray || (Array.isArray = function (r) { return "[object Array]" === Object.prototype.toString.call(r); });
    var r = {}, t = { "==": function (r, t) { return r == t; }, "===": function (r, t) { return r === t; }, "!=": function (r, t) { return r != t; }, "!==": function (r, t) { return r !== t; }, ">": function (r, t) { return r > t; }, ">=": function (r, t) { return r >= t; }, "<": function (r, t, n) { return void 0 === n ? r < t : r < t && t < n; }, "<=": function (r, t, n) { return void 0 === n ? r <= t : r <= t && t <= n; }, "!!": function (t) { return r.truthy(t); }, "!": function (t) { return !r.truthy(t); }, "%": function (r, t) { return r % t; }, log: function (r) { return console.log(r), r; }, in: function (r, t) { return void 0 !== t.indexOf && -1 !== t.indexOf(r); }, cat: function () { return Array.prototype.join.call(arguments, ""); }, substr: function (r, t, n) { if (n < 0) {
            var e = String(r).substr(t);
            return e.substr(0, e.length + n);
        } return String(r).substr(t, n); }, "+": function () { return Array.prototype.reduce.call(arguments, function (r, t) { return parseFloat(r, 10) + parseFloat(t, 10); }, 0); }, "*": function () { return Array.prototype.reduce.call(arguments, function (r, t) { return parseFloat(r, 10) * parseFloat(t, 10); }); }, "-": function (r, t) { return void 0 === t ? -r : r - t; }, "/": function (r, t) { return r / t; }, min: function () { return Math.min.apply(this, arguments); }, max: function () { return Math.max.apply(this, arguments); }, merge: function () { return Array.prototype.reduce.call(arguments, function (r, t) { return r.concat(t); }, []); }, var: function (r, t) { var n = void 0 === t ? null : t, e = this; if (void 0 === r || "" === r || null === r)
            return e; for (var i = String(r).split("."), u = 0; u < i.length; u++) {
            if (null === e)
                return n;
            if (void 0 === (e = e[i[u]]))
                return n;
        } return e; }, missing: function () { for (var t = [], n = Array.isArray(arguments[0]) ? arguments[0] : arguments, e = 0; e < n.length; e++) {
            var i = n[e], u = r.apply({ var: i }, this);
            null !== u && "" !== u || t.push(i);
        } return t; }, missing_some: function (t, n) { var e = r.apply({ missing: n }, this); return n.length - e.length >= t ? [] : e; }, method: function (r, t, n) { return r[t].apply(r, n); } };
    return r.is_logic = function (r) { return "object" == typeof r && null !== r && !Array.isArray(r) && 1 === Object.keys(r).length; }, r.truthy = function (r) { return (!Array.isArray(r) || 0 !== r.length) && !!r; }, r.get_operator = function (r) { return Object.keys(r)[0]; }, r.get_values = function (t) { return t[r.get_operator(t)]; }, r.apply = function (n, e) { if (Array.isArray(n))
        return n.map(function (t) { return r.apply(t, e); }); if (!r.is_logic(n))
        return n; e = e || {}; var i, u, o, a, f, l = r.get_operator(n), p = n[l]; if (Array.isArray(p) || (p = [p]), "if" === l || "?:" == l) {
        for (i = 0; i < p.length - 1; i += 2)
            if (r.truthy(r.apply(p[i], e)))
                return r.apply(p[i + 1], e);
        return p.length === i + 1 ? r.apply(p[i], e) : null;
    } if ("and" === l) {
        for (i = 0; i < p.length; i += 1)
            if (u = r.apply(p[i], e), !r.truthy(u))
                return u;
        return u;
    } if ("or" === l) {
        for (i = 0; i < p.length; i += 1)
            if (u = r.apply(p[i], e), r.truthy(u))
                return u;
        return u;
    } if ("filter" === l)
        return a = r.apply(p[0], e), o = p[1], Array.isArray(a) ? a.filter(function (t) { return r.truthy(r.apply(o, t)); }) : []; if ("map" === l)
        return a = r.apply(p[0], e), o = p[1], Array.isArray(a) ? a.map(function (t) { return r.apply(o, t); }) : []; if ("reduce" === l)
        return a = r.apply(p[0], e), o = p[1], f = void 0 !== p[2] ? p[2] : null, Array.isArray(a) ? a.reduce(function (t, n) { return r.apply(o, { current: n, accumulator: t }); }, f) : f; if ("all" === l) {
        if (a = r.apply(p[0], e), o = p[1], !a.length)
            return !1;
        for (i = 0; i < a.length; i += 1)
            if (!r.truthy(r.apply(o, a[i])))
                return !1;
        return !0;
    } if ("none" === l)
        return 0 === r.apply({ filter: p }, e).length; if ("some" === l)
        return r.apply({ filter: p }, e).length > 0; if (p = p.map(function (t) { return r.apply(t, e); }), "function" == typeof t[l])
        return t[l].apply(e, p); if (l.indexOf(".") > 0) {
        var c = String(l).split("."), y = t;
        for (i = 0; i < c.length; i++)
            if (void 0 === (y = y[c[i]]))
                throw new Error("Unrecognized operation " + l + " (failed at " + c.slice(0, i + 1).join(".") + ")");
        return y.apply(e, p);
    } throw new Error("Unrecognized operation " + l); }, r.uses_data = function (t) { var n = []; if (r.is_logic(t)) {
        var e = r.get_operator(t), i = t[e];
        Array.isArray(i) || (i = [i]), "var" === e ? n.push(i[0]) : i.map(function (t) { n.push.apply(n, r.uses_data(t)); });
    } return function (r) { for (var t = [], n = 0, e = r.length; n < e; n++)
        -1 === t.indexOf(r[n]) && t.push(r[n]); return t; }(n); }, r.add_operation = function (r, n) { t[r] = n; }, r.rm_operation = function (r) { delete t[r]; }, r.rule_like = function (t, n) { if (n === t)
        return !0; if ("@" === n)
        return !0; if ("number" === n)
        return "number" == typeof t; if ("string" === n)
        return "string" == typeof t; if ("array" === n)
        return Array.isArray(t) && !r.is_logic(t); if (r.is_logic(n)) {
        if (r.is_logic(t)) {
            var e = r.get_operator(n), i = r.get_operator(t);
            if ("@" === e || e === i)
                return r.rule_like(r.get_values(t, !1), r.get_values(n, !1));
        }
        return !1;
    } if (Array.isArray(n)) {
        if (Array.isArray(t)) {
            if (n.length !== t.length)
                return !1;
            for (var u = 0; u < n.length; u += 1)
                if (!r.rule_like(t[u], n[u]))
                    return !1;
            return !0;
        }
        return !1;
    } return !1; }, r;
});
var KASClient;
(function (KASClient) {
    var App;
    (function (App) {
        /**
        * To simulate clients on older versions, versions starting from "0", "1", "2", ...
        * @param {string} version
        */
        function setCompatibilityMode(version) {
            KASClient.Version.setClientSupportedVersion(version);
        }
        App.setCompatibilityMode = setCompatibilityMode;
        /**
        * Gets users' details (name, pic, phone number, etc.) against their ids
        * @param {string[]} userIds array of user ids
        * @param {Callback} callback with below parameters:
        * * * * @param {Dictionary<UserId: string, UserInfo: KASUser>} userIdToInfoMap (users' details against their ids) can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getUsersDetailsAsync(userIds, callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                KASClient.getJsonFromFileAsync("mock/user.json", function (userJson, error) {
                    var userIdToInfoMap = {};
                    for (var i = 0; i < userIds.length; i++) {
                        var userId = userIds[i];
                        var userInfo = userJson;
                        userInfo["id"] = "USR_" + userId;
                        userInfo["uId"] = userId;
                        userIdToInfoMap[userId] = KASClient.KASUser.fromJSON(userInfo);
                    }
                    if (callback) {
                        callback(userIdToInfoMap, null);
                    }
                });
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getUserDetails(userIds, function (userIdToInfoJson, error) {
                var userIdToInfoMap = {};
                for (var userId in userIdToInfoJson) {
                    var userInfo = userIdToInfoJson[userId];
                    if (typeof userInfo === "string") {
                        userInfo = KASClient.parseJsonObject(userInfo);
                    }
                    userIdToInfoMap[userId] = KASClient.KASUser.fromJSON(userInfo);
                }
                if (callback) {
                    callback(userIdToInfoMap, error);
                }
            });
        }
        App.getUsersDetailsAsync = getUsersDetailsAsync;
        /**
        * Shows profile page/details of a user
        * @param {string} userId of the user whose profile is to be shown
        * @param {boolean} isMiniProfile whether to show mini-profile first
        */
        function showUserProfileAsync(userId, isMiniProfile, callback) {
            KASClient.showUserProfilePage(userId, isMiniProfile, function (success, error) {
                if (callback) {
                    callback(success, error);
                }
            });
        }
        App.showUserProfileAsync = showUserProfileAsync;
        /**
        * Starts chat with a user
        * @param {string} userId of the user
        */
        function startChatAsync(userId, callback) {
            KASClient.startChat(userId, function (success, error) {
                if (callback) {
                    callback(success, error);
                }
            });
        }
        App.startChatAsync = startChatAsync;
        /**
        * Gets users' details (name, pic, phone number, etc.) against their ids
        * @param {Callback} callback with below parameters:
        * * * * @param {string} token got from integeration service
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getIntegerationServiceTokenAsync(callback) {
            KASClient.getIntegerationServiceToken(function (token, error) {
                if (callback) {
                    callback(token, error);
                }
            });
        }
        App.getIntegerationServiceTokenAsync = getIntegerationServiceTokenAsync;
        /**
        * Sets a key-value pair in secured app storage, should be used to store sensitive data like tokens
        * @param {string} key got from integeration service
        * @param {string} value got from integeration service
        */
        function setSecuredData(key, value) {
            KASClient.setSecuredValue(key, value);
        }
        App.setSecuredData = setSecuredData;
        /**
        * Gets the data stored against a key from the secured app storage
        * @param {string} key key for the data
        * @param {Callback} callback with below parameters:
        * * * * @param {string} value got from secured storage against the key
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getSecuredData(key, callback) {
            KASClient.getSecuredValue(key, callback);
        }
        App.getSecuredData = getSecuredData;
        /**
        * Gets deviceId
        * @param {Callback} callback with below parameters:
        * * * * @param {string} deviceId got from integeration service
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getDeviceIdAsync(callback) {
            KASClient.getDeviceId(function (deviceId, error) {
                if (callback) {
                    callback(deviceId, error);
                }
            });
        }
        App.getDeviceIdAsync = getDeviceIdAsync;
        /**
        * Shows a native contact picker, and returns an array of all the selected users' details
        * @param {string} title of Contact Picker
        * @param {string[]} selectedMutableUser array of selected userIds
        * @param {string[]} selectedImmutableUser array of fixed selected userIds
        * @param {boolean} isSingleSelection single selection in Contact Picker
        * @param {Callback} callback with below parameters:
        * * * * @param {KASUser[]} selectedUsers (array of user details) can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function showContactPickerAsync(title, selectedMutableUser, selectedImmutableUser, isSingleSelection, callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                KASClient.getJsonFromFileAsync("mock/user.json", function (userJson, error) {
                    var userInfo = KASClient.KASUser.fromJSON(userJson);
                    if (callback) {
                        callback([userInfo, userInfo, userInfo], null);
                    }
                });
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getSelectedUsers([title, selectedMutableUser, selectedImmutableUser, isSingleSelection], function (usersJson, error) {
                var users = [];
                for (var i in usersJson) {
                    users.push(KASClient.KASUser.fromJSON(usersJson[i]));
                }
                if (callback) {
                    callback(users, error);
                }
            });
        }
        App.showContactPickerAsync = showContactPickerAsync;
        /**
        * Gets whether talkback is enabled or not
        * @param {Callback} callback with below parameters:
        * * * * @param {boolean} talkBackEnabled true if talkback is enabled
        */
        function isTalkBackEnabledAsync(callback) {
            KASClient.isTalkBackEnabled(function (talkBackEnabled, error) {
                if (callback && error == null) {
                    callback(talkBackEnabled);
                }
            });
        }
        App.isTalkBackEnabledAsync = isTalkBackEnabledAsync;
        /**
        * Reads the text if TalkBack/VoiceOver enabled
        * @param {talkBackText} string to read by talkback
        */
        function readTalkBackMessage(talkBackMessage) {
            KASClient.readTalkBackMessageNative(talkBackMessage);
        }
        App.readTalkBackMessage = readTalkBackMessage;
        /**
        * Shows a native image picker, and returns the selected image path
        * @param {Callback} callback with below parameters:
        * * * * @param {string} selectedImagePath can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function showImagePickerAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                if (callback) {
                    callback("file://DummyAttachmentPath", null);
                }
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getAttachmentPath(callback);
        }
        App.showImagePickerAsync = showImagePickerAsync;
        /**
         * Displays an attachment picker in the native layer
         * @param supportedTypes array of supported attachment types for the picker.
         * @param props additional props to configure the picker
         * @param callback callback with list of selected attachments
         */
        function showAttachmentPickerAsync(supportedTypes, props, callback) {
            KASClient.getAttachmentPaths([supportedTypes, JSON.stringify(props)], function (selectedAttachmentJson, error) {
                var selectedAttachments = [];
                for (var i in selectedAttachmentJson) {
                    selectedAttachments.push(KASClient.KASAttachmentFactory.fromJSON(JSON.parse(selectedAttachmentJson[i])));
                }
                if (callback) {
                    callback(selectedAttachments, error);
                }
            });
        }
        App.showAttachmentPickerAsync = showAttachmentPickerAsync;
        /**
         * Download the attachment specified
         * @param attachment attachment with a valid server path to download
         * @param callback callback on download completion
         */
        function downloadAttachmentAsync(attachment, callback) {
            KASClient.downloadAttachment(attachment.toJSON(), function (downloadedAttachmentJSON, error) {
                var downloadedAttachment = KASClient.KASAttachmentFactory.fromJSON(downloadedAttachmentJSON);
                if (callback) {
                    callback(downloadedAttachment, error);
                }
            });
        }
        App.downloadAttachmentAsync = downloadAttachmentAsync;
        /**
        * Download the attachment specified
        * @param attachment attachment with a valid server path to download
        * @param callback callback on download completion
        */
        function isAttachmentDownloadingAsync(attachment, callback) {
            KASClient.isAttachmentDownloading(attachment.toJSON(), function (isAttachmentDownloadingOrDownLoaded, error) {
                if (callback) {
                    callback(isAttachmentDownloadingOrDownLoaded, error);
                }
            });
        }
        App.isAttachmentDownloadingAsync = isAttachmentDownloadingAsync;
        /**
         * Cancel a download operation queued for an attachment
         * @param attachment
         */
        function cancelAttachmentDownloadAsync(attachment, callback) {
            KASClient.cancelAttachmentDownload(attachment.toJSON(), function (error) {
                if (callback) {
                    callback(error);
                }
            });
        }
        App.cancelAttachmentDownloadAsync = cancelAttachmentDownloadAsync;
        /**
        * Shows a native place picker, and returns the selected place (lt, lg, n)
        * @param {Callback} callback with below parameters:
        * * * * @param {KASLocation} selectedLocation can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function showPlacePickerAsync(callback) {
            KASClient.showPlacePicker(function (locationJson, error) {
                if (callback) {
                    callback(KASClient.KASLocation.fromJSON(locationJson), error);
                }
            });
        }
        App.showPlacePickerAsync = showPlacePickerAsync;
        /**
        * Shows a native duration picker with day/hour/minute
        * @param {number} defaultDurationInMinutes the default duration to be shown on picker
        * @param {Callback} callback with below parameters:
        * * * * @param {number} durationInMinutes selected duration in minutes
        * * * * @param {string} error message in case of error, null otherwise
        */
        function showDurationPickerAsync(defaultDurationInMinutes, callback) {
            KASClient.showDurationPicker(defaultDurationInMinutes, function (durationString, error) {
                if (callback) {
                    callback(parseInt(durationString), error);
                }
            });
        }
        App.showDurationPickerAsync = showDurationPickerAsync;
        /**
        * Gets the previously stored device location
        * @param {Callback} callback with below parameters:
        * * * * @param {string} location can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getDeviceLocationAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                KASClient.getJsonFromFileAsync("mock/location.json", function (locationJson, error) {
                    if (callback) {
                        callback(JSON.stringify(locationJson), null);
                    }
                });
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getLocation(callback);
        }
        App.getDeviceLocationAsync = getDeviceLocationAsync;
        /**
        * Gets the new UUID
        * @param {Callback} callback with below parameters:
        * * * * @param {string} uuid newly generated uuid
        * * * * @param {string} error message in case of error, null otherwise
        */
        function generateUUIDAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                callback(JSON.stringify(""), null);
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.generateUUID(callback);
        }
        App.generateUUIDAsync = generateUUIDAsync;
        /**
        * Gets the current device location
        * @param {Callback} callback with below parameters:
        * * * * @param {string} location can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getCurrentDeviceLocationAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                KASClient.getJsonFromFileAsync("mock/location.json", function (locationJson, error) {
                    if (callback) {
                        callback(JSON.stringify(locationJson), null);
                    }
                });
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getCurrentLocation(callback);
        }
        App.getCurrentDeviceLocationAsync = getCurrentDeviceLocationAsync;
        /**
        * Shows a native alert (for iOS) or a toast (for Android) with the message
        * @param {string} message
        */
        function showNativeErrorMessage(message) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert(message);
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.showAlert(message);
        }
        App.showNativeErrorMessage = showNativeErrorMessage;
        /**
        * Gets the current app locale, the language in which the app is rendered, useful for localizing MiniApp's strings
        * @param {Callback} callback with below parameters:
        * * * * @param {string} locale can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getAppLocaleAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                if (callback) {
                    callback("en", null);
                }
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getAppLocale(callback);
        }
        App.getAppLocaleAsync = getAppLocaleAsync;
        /**
        * Gets the current app time format is 24hours or not, the time format selected by user, useful for formatting date time strings properly
        * @param {Callback} callback with below parameters:
        * * * * @param {string} isAppTimeFormat24Hours can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getIsAppTimeFormat24HoursAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                if (callback) {
                    callback(false, null);
                }
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getIs24HourTimeFormat(callback);
        }
        App.getIsAppTimeFormat24HoursAsync = getIsAppTimeFormat24HoursAsync;
        /**
        * Gets all the participant-ids of the current conversation
        * @param {Callback} callback with below parameters:
        * * * * @param {string} name can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getConversationParticipantsCountAsync(callback) {
            KASClient.getConversationParticipantsCount(function (participantsCount, error) {
                if (callback) {
                    callback(parseInt(participantsCount), error);
                }
            });
        }
        App.getConversationParticipantsCountAsync = getConversationParticipantsCountAsync;
        /**
        * Gets the current conversation name
        * @param {Callback} callback with below parameters:
        * * * * @param {string} name can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getConversationNameAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                if (callback) {
                    callback("The Conversation", null);
                }
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getConversationName(callback);
        }
        App.getConversationNameAsync = getConversationNameAsync;
        /**
        * Gets the current conversation type
        * @param {Callback} callback with below parameters:
        * * * * @param {number} conversationType can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getConversationTypeAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                if (callback) {
                    callback(0, null);
                }
                return;
            }
            KASClient.getConversationType(function (conversationType, error) {
                if (callback) {
                    callback(parseInt(conversationType), error);
                }
            });
        }
        App.getConversationTypeAsync = getConversationTypeAsync;
        /**
        * Dismiss the current screen (Creation, Response, or Summary)
        */
        function dismissCurrentScreen() {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("dismissCurrentScreen");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.dismissScreen();
        }
        App.dismissCurrentScreen = dismissCurrentScreen;
        /**
        * Shows a native full sreen progress bar with the given text
        * @param {string} text
        */
        function showProgressBar(text) {
            KASClient.showProgress(text);
        }
        App.showProgressBar = showProgressBar;
        /**
        * Hides the current progress bar, if any
        */
        function hideProgressBar() {
            KASClient.hideProgress();
        }
        App.hideProgressBar = hideProgressBar;
        /**
        * Gets the current user id who has opened the MiniApp
        * @param {Callback} callback with below parameters:
        * * * * @param {string} userId can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getCurrentUserIdAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                if (callback) {
                    callback("7dc6f31a-28ec-4c9b-91bb-ecf3ef5f4a0c", null);
                }
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getCurrentUserId(callback);
        }
        App.getCurrentUserIdAsync = getCurrentUserIdAsync;
        /**
        * Sets few properties when using native toolbar
        * @param {KASNativeToolbarProperties} properties
        */
        function setNativeToolbarProperties(properties) {
            KASClient.customizeNativeToolbar(properties.toJSON());
        }
        App.setNativeToolbarProperties = setNativeToolbarProperties;
        /**
        * Gets the package properties (user given)
        * @param {Callback} callback with below parameters:
        * * * * @param {JSON} properties can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getPackagePropertiesAsync(callback) {
            KASClient.getPackageProperties(callback);
        }
        App.getPackagePropertiesAsync = getPackagePropertiesAsync;
        /**
        * Shows Image in Immersive view.
        * @param {string[]} urls Array of images url:
        */
        function showImageImmersiveView(urls, currentImageIndex) {
            if (urls === void 0) { urls = []; }
            if (currentImageIndex === void 0) { currentImageIndex = 0; }
            KASClient.showImageInFullScreen(urls, currentImageIndex);
        }
        App.showImageImmersiveView = showImageImmersiveView;
        /**
        * Open attachment in Immersive view.
        * @param {KASAttachment} attachmentObj
        */
        function openAttachmentImmersiveView(attachmentObj) {
            KASClient.openImmersiveViewForAttachment(attachmentObj.toJSON());
        }
        App.openAttachmentImmersiveView = openAttachmentImmersiveView;
        /**
       * checks whether app has read/write access to the storage
       * @param {KASAttachmentType} attachmentType
       */
        function hasStorageAccessForAttachmentType(type, callback) {
            KASClient.hasStorageAccessForType(type, callback);
        }
        App.hasStorageAccessForAttachmentType = hasStorageAccessForAttachmentType;
        /**
        * Generates Base64 thumbnail for an image whose localPath is given
        * @param {string} localPath localPath for the imageAttachment whose thumbnail needs to be generated:
        */
        function generateBase64ThumbnailAsync(localPath, callback) {
            KASClient.generateBase64ThumbnailForAttachment(localPath, callback);
        }
        App.generateBase64ThumbnailAsync = generateBase64ThumbnailAsync;
        /**
         * Gets the font size multiplier for large text.
         * Current only required by iOS.
         */
        function getFontSizeMultiplierAsync(callback) {
            KASClient.getFontSizeMultiplier(callback);
        }
        App.getFontSizeMultiplierAsync = getFontSizeMultiplierAsync;
        /**
        * Gets the localized strings' dictionary based on current app locale.
        * Strings must be provided inside the package with names like: strings_en.json, strings_hi.json, etc.
        * @param {Callback} callback with below parameters:
        * * * * @param {JSON} strings can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getLocalizedStringsAsync(callback) {
            KASClient.getLocalizedMiniAppStrings(callback);
        }
        App.getLocalizedStringsAsync = getLocalizedStringsAsync;
        /**
        * Gets all the customization settings for a package (Used in case of Type-4 packages and their base).
        * @param {Callback} callback with below parameters:
        * * * * @param {JSON} settings can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getPackageCustomSettingsAsync(callback) {
            KASClient.getPackageCustomSettings(callback);
        }
        App.getPackageCustomSettingsAsync = getPackageCustomSettingsAsync;
        /**
        * Logs an error for "Send report"
        * @param {string} error string
        */
        function logError(error) {
            KASClient.logErrorNative(error);
        }
        App.logError = logError;
        /**
        * Logs data for "Send report"
        * @param {string} data string
        */
        function logToReport(data) {
            KASClient.logToReportNative(data);
        }
        App.logToReport = logToReport;
        /**
        * Recording event for load and error telemetry
        * @param {string} eventName string
        * @param {string} eventType string
        * @param {string} props JSON
        */
        function recordEvent(eventName, eventType, props) {
            if (props === void 0) { props = JSON.parse("{}"); }
            KASClient.recordEventNative(eventName, eventType, props);
        }
        App.recordEvent = recordEvent;
        /**
        * Recording event for independent telemetry
        * @param {string} eventName string
        * @param {string} props JSON
        */
        function recordTelemetryEvent(eventName, props) {
            if (props === void 0) { props = JSON.parse("{}"); }
            KASClient.recordEventNative(eventName, "INDEPENDENT", props);
        }
        App.recordTelemetryEvent = recordTelemetryEvent;
        /**
        * Checks if the current user an O365 subscriber
        * @param {Callback} callback with below parameters:
        * * * * @param {boolean} subscribed true if subscribed, false otherwise
        */
        function isCurrentUserO365SubscribedAsync(callback) {
            KASClient.isCurrentUserO365Subscribed(function (subscribed, error) {
                if (callback) {
                    callback(subscribed && error == null);
                }
            });
        }
        App.isCurrentUserO365SubscribedAsync = isCurrentUserO365SubscribedAsync;
        /**
        * Gets details of current logged-in O365 user
        * @param {Callback} callback with below parameters:
        * * * * @param {Json} returns the UserDetails in Json structure
        */
        function getO365UserDetailsAsync(callback) {
            KASClient.getO365UserDetails(function (userDetails, error) {
                var userInfo = KASClient.KASO365User.fromJSON(userDetails);
                if (callback) {
                    callback(userInfo, error);
                }
            });
        }
        App.getO365UserDetailsAsync = getO365UserDetailsAsync;
        /**
        * Gets the client details
        * @param {Callback} callback with below parameters:
        * * * * @param {JSON} properties can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getClientDetailsAsync(callback) {
            KASClient.getClientDetails(callback);
        }
        App.getClientDetailsAsync = getClientDetailsAsync;
        /**
        * Registers a callback to be executed on hardware back button press (for Android)
        * @param {Callback} callback to be executed
        */
        App.hardwareBackPressCallback = null;
        function registerHardwareBackPressCallback(callback) {
            if (callback === void 0) { callback = null; }
            App.hardwareBackPressCallback = callback;
        }
        App.registerHardwareBackPressCallback = registerHardwareBackPressCallback;
        // Will be called from Android Activity's onBackPressed()
        function OnHardwareBackPress() {
            if (App.hardwareBackPressCallback) {
                App.hardwareBackPressCallback();
            }
        }
        App.OnHardwareBackPress = OnHardwareBackPress;
        /**
        * Initializes the localization strings' map
        * @param {Dictionary<StringId: Dictionary<Locale: StringValue>>} the strings' map
        * @param {Callback} callback with below parameters:
        * * * * @param {boolean} success denotes the success/failure of the initialization
        */
        var locInited = false;
        var locJson = null;
        var currentLocale = "en"; // Default
        function initLocalizationStringsAsync(strings, callback) {
            locJson = strings;
            getAppLocaleAsync(function (locale, error2) {
                if (!error2) {
                    currentLocale = locale;
                }
                locInited = (!error2);
                if (callback) {
                    callback(locInited);
                }
            });
        }
        App.initLocalizationStringsAsync = initLocalizationStringsAsync;
        var userStrings = null;
        function setUserStrings(strings) {
            if (strings === void 0) { strings = null; }
            userStrings = strings;
        }
        App.setUserStrings = setUserStrings;
        /**
        * Returns a string from the localized strings' file
        * @param {string} stringId
        */
        function getString(stringId) {
            if (!userStrings && (!locInited || !locJson)) {
                console.assert(false, "Valid localization file not initialized");
            }
            else {
                // First preference should always be to user provided strings
                if (userStrings && userStrings.hasOwnProperty(stringId) && userStrings[stringId]) {
                    return userStrings[stringId];
                }
                else if (locJson.hasOwnProperty(stringId)) {
                    if (locJson[stringId].hasOwnProperty(currentLocale)) {
                        return locJson[stringId][currentLocale];
                    }
                    else {
                        return locJson[stringId]["en"];
                    }
                }
                else {
                    return stringId;
                }
            }
        }
        App.getString = getString;
        /**
           * shows a particular location as mentioned in KASLocation
           * @param {KASLocation} location
         */
        function showLocationOnMap(location) {
            KASClient.showLocationMap(JSON.stringify(location.toJSON()));
        }
        App.showLocationOnMap = showLocationOnMap;
        /**
        * Returns a string.
        * @param {string} string denotes the formatted string. Specifier should be mentioned like {0},{1},{2}.....
        * @param {string[]} args array of arguments.
        */
        function printf(main) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var formatted = main;
            for (var i = 0; i < args.length; i++) {
                var regexp = new RegExp('\\{' + i + '\\}', 'gi');
                formatted = formatted.replace(regexp, args[i]);
            }
            return formatted;
        }
        App.printf = printf;
        // For internal use.
        function getCurrentLocale() {
            return currentLocale;
        }
        App.getCurrentLocale = getCurrentLocale;
        /**
          * If authentication type is allowed, this API performs the authentication and returns success/false status
          * else it returns an error string with reason why authentication is not possible.
          * @param {KASAuthenticationType} authenticationType type of authentication.
          * @param {Callback} callback with below parameters:
          * * * * @param {boolean} isSuccessful true if the form is not yet expired
          * * * * @param {string} reasonCode reason code in case of error, null otherwise
          */
        function performAuthenticationAsync(authenticationType, callback) {
            if (authenticationType === void 0) { authenticationType = KASClient.KASAuthenticationType.None; }
            KASClient.performAuthentication(authenticationType, function (isActive, reasonCode) {
                if (callback) {
                    callback(isActive, reasonCode);
                }
            });
        }
        App.performAuthenticationAsync = performAuthenticationAsync;
        /**
        * Checks if authentication of type is possible or not.
        * @param {KASAuthenticationType} authenticationType type of authentication.
        * @param {Callback} callback with below parameters:
        * * * * @param {boolean} isSuccessful true if finger printing is possible
        * * * * @param {string} reasonCode reason code why finger print is not possible
        */
        function isAuthenticationTyepSupportedAsync(authenticationType, callback) {
            if (authenticationType === void 0) { authenticationType = KASClient.KASAuthenticationType.None; }
            KASClient.isAuthenticationTypeSupported(authenticationType, function (isSuccessful, reasonCode) {
                if (callback) {
                    callback(isSuccessful, reasonCode);
                }
            });
        }
        App.isAuthenticationTyepSupportedAsync = isAuthenticationTyepSupportedAsync;
        /**
        * Opens native voice to text conversion UI and returns the text for the voice input given by user.
        * @param {Callback} callback with below parameters:
        * * * * @param {boolean} text converted text for the voice input given by user
        * * * * @param {string} error any error that happens in native during voice to speech conversion
        */
        function performSpeechToTextAsync(callback) {
            KASClient.performSpeechToText(function (text, error) {
                if (callback) {
                    callback(text, error);
                }
            });
        }
        App.performSpeechToTextAsync = performSpeechToTextAsync;
        /**
        * Opens given http url in browser. For strings not starting with http, it is a no-op
        * @param {string} httpUrlStr
        */
        function openLinkInBrowser(httpUrlStr) {
            KASClient.openHttpLinkInBrowser(httpUrlStr);
        }
        App.openLinkInBrowser = openLinkInBrowser;
        /**
        * performs an http request and returns the response as specified below:
        * @param {string} url base url to open
        * @param {string} parametersJSON jsonstring containing parameters can be given as null.
        *                                 If given as null a request to the url provided above will be made.
        *                                 Parameters include request header,query parameters(default blank), request method(default GET)
        *                                 and request body(The body to be posted if request method is POST. default blank.)
        *                                 The keys for parameters are:
        *                                 a.) "method" : request method. example: "POST". defaults to "GET".
        *                                 b.) "requestBody": body of request in case of "POST". defaults to blank.
        *                                 c.) "requestHeaders": headers to be sent with request. should be a json with
        *                                                         key as request header and value as the desired value. defaults to blank.
        *                                 d.) "queryParameters": query parameters. will be encoded in url. should be a json with
        *                                                         key as parameter name and value as its value. defaults to blank.
        *                                 e.) "requestResourcePath": will be appended to base url. default is blank.
        * @param {Callback} callback callback with below parameters:
        * * * * @param {string} response response body returned
        *                                This could have two possible config:
        *                               If request was a success it returns jsonstring with following keys:
        *                                a.) "HttpResponseCode" : The response code of request.
        *                               b.) "HttpResponseHeader": The response HTTP headers
        *                               c.) "HttpResponseBody": The response body returned for request.
        *                               If there was a Network error then it returns:
        *                               a.) "HttpErrorCode": The error code
        *                               b.) "HttpErrorMessage": The error message eg. Malformed URL, Cannot connect to host etc.
        * * * * @param {string} error error if any : This includes the standard error code defined in KASClient documentation.
        */
        function performHTTPRequest(url, parametersJSON, callback) {
            if (parametersJSON == null || parametersJSON == undefined) {
                parametersJSON = "";
            }
            KASClient.performHTTPRequestNative(url, parametersJSON, function (response, error) {
                if (callback) {
                    callback(response, error);
                }
            });
        }
        App.performHTTPRequest = performHTTPRequest;
    })(App = KASClient.App || (KASClient.App = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var Constants = /** @class */ (function () {
        function Constants() {
        }
        ////////////// Telemetry event names ////////////////////////
        // event name to track immersive page load time or error
        Constants.TELEMETRY_EVENT_IMMERSIVE_PAGE_LOAD = "ACTION_IMMERSIVE_PAGE_LOAD";
        // event name to track Insights page load time or error
        Constants.TELEMETRY_EVENT_INSIGHTS_LOAD = "ACTION_INSIGHTS_LOAD";
        // event name to track All Responses page load time or error
        Constants.TELEMETRY_EVENT_ALL_RESPONSES_LOAD = "ACTION_ALL_RESPONSES_LOAD";
        ////////////// Telemetry event types ////////////////////////
        // this type indicates start of the event, tracking for the event starts when this type is received
        Constants.TELEMETRY_EVENT_TYPE_START = "START";
        // this type indicates end of the event, tracking for the event stops when this type is received
        // and the event is logged in telemetry, if corresponding start was recorded earlier.
        // If no START was recorded earlier, this END type would be ignored
        Constants.TELEMETRY_EVENT_TYPE_END = "END";
        // this type indicates ERROR, tracking for the event stops if it was started earlier,
        // and error telemetry for the event is logged
        Constants.TELEMETRY_EVENT_TYPE_ERROR = "ERROR";
        // For this type, there is no other marker associated and telemetry is logged without waiting for 
        // associated END or ERROR Event_Type
        Constants.TELEMETRY_EVENT_TYPE_INDEPENDENT = "INDEPENDENT";
        ////////////// Telemetry properties keys ////////////////////////
        // key to report error payload for an error event
        Constants.TELEMETRY_PROPERTY_ERROR_KEY = "error";
        return Constants;
    }());
    KASClient.Constants = Constants;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var Form;
    (function (Form) {
        //////////////////////////////////
        /////// Creation flow APIs ///////
        //////////////////////////////////
        /**
        * Initializes and returns an empty form object based on the default form file present in the package
        * @param {Callback} callback with below parameters:
        * * * * @param {KASForm} form can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function initFormAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                KASClient.getJsonFromFileAsync("mock/form.json", function (formJson, error) {
                    if (callback) {
                        callback(KASClient.KASForm.fromJSON(formJson), null);
                    }
                });
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getSurveyJson(function (formJson, error) {
                if (callback) {
                    callback(KASClient.KASForm.fromJSON(formJson), error);
                }
            });
        }
        Form.initFormAsync = initFormAsync;
        /**
        * Submits the newly created form as a request. This results a new conversation card
        * @param {KASForm} form
        */
        function submitFormRequest(form, shouldInflate) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("SubmitFormRequest");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.createRequest(form.toJSON(), null, shouldInflate);
        }
        Form.submitFormRequest = submitFormRequest;
        /**
      * Submits the newly created form as a request. This results a new conversation card
      * @param {KASForm} form
      */
        function submitFormRequestV2(form, shouldDismiss, shouldSendToSubscribers) {
            if (shouldDismiss === void 0) { shouldDismiss = false; }
            if (shouldSendToSubscribers === void 0) { shouldSendToSubscribers = true; }
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("SubmitFormRequest");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.createRequestV2(form.toJSON(), shouldDismiss, shouldSendToSubscribers);
        }
        Form.submitFormRequestV2 = submitFormRequestV2;
        /**
        * Submits the newly created form as a request with responses
        * @param {KASForm} form
        */
        function submitFormRequestWithResponses(form, responses, shouldDismiss, isResponseAnonymous, shouldSendToSubscribers) {
            if (shouldSendToSubscribers === void 0) { shouldSendToSubscribers = true; }
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("submitFormRequestWithResponses");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.createRequestWithResponses(form.toJSON(), responses, shouldDismiss, isResponseAnonymous, shouldSendToSubscribers);
        }
        Form.submitFormRequestWithResponses = submitFormRequestWithResponses;
        /**
        * Submits the newly created form as a request. This results a new conversation card
        * @param {KASForm} form
        */
        function submitFormRequestWithoutDismiss(form, shouldInflate) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("submitFormRequestWithoutDismiss");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.createRequest(form.toJSON(), null, shouldInflate, false);
        }
        Form.submitFormRequestWithoutDismiss = submitFormRequestWithoutDismiss;
        /**
        * use for making changes in form fields like title, description and settings.
        */
        function updateForm(fields, shouldInflate, callback) {
            if (KASClient.shouldMockData()) {
                alert("updateForm");
                return;
            }
            KASClient.updateRequest(fields, null, shouldInflate, function (success, error) {
                if (callback) {
                    callback(success && error == null);
                }
            });
        }
        Form.updateForm = updateForm;
        //////////////////////////////////
        /////// Response flow APIs ///////
        //////////////////////////////////
        /**
        * Gets whether the current user can respond to the form
        * @param {Callback} callback with below parameters:
        * * * * @param {boolean} canRespond true if current user is allowed to respond
        */
        function canRespondToFormAsync(callback) {
            KASClient.canRespondToSurvey(function (canRespond, error) {
                if (callback) {
                    callback(canRespond && error == null);
                }
            });
        }
        Form.canRespondToFormAsync = canRespondToFormAsync;
        /**
        * Gets the form object associated with the conversation card
        * @param {Callback} callback with below parameters:
        * * * * @param {KASForm} form can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getFormAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                KASClient.getJsonFromFileAsync("mock/form.json", function (formJson, error) {
                    if (callback) {
                        callback(KASClient.KASForm.fromJSON(formJson), null);
                    }
                });
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getSurveyJson(function (formJson, error) {
                if (callback) {
                    callback(KASClient.KASForm.fromJSON(formJson), error);
                }
            });
        }
        Form.getFormAsync = getFormAsync;
        /**
        * Gets the status of the form associated with the conversation card
        * @param {Callback} callback with below parameters:
        * * * * @param {boolean} isActive true if the form is not yet expired
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getFormStatusAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                if (callback) {
                    callback(true, null);
                }
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getPollStatus(function (isActive, error) {
                if (callback) {
                    callback(isActive, error);
                }
            });
        }
        Form.getFormStatusAsync = getFormStatusAsync;
        /**
        * Gets all the responses of the current user against the form
        * @param {Callback} callback with below parameters:
        * * * * @param {KASFormResponse[]} responses can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getMyFormResponsesAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                KASClient.getJsonFromFileAsync("mock/form_response.json", function (responsesJson, error) {
                    var responses = [];
                    for (var i in responsesJson) {
                        responses.push(KASClient.KASFormResponse.fromJSON(responsesJson[i]));
                    }
                    if (callback) {
                        callback(responses, null);
                    }
                });
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getResponsesJson(function (responsesJson, error) {
                var responses = [];
                for (var i in responsesJson) {
                    responses.push(KASClient.KASFormResponse.fromJSON(responsesJson[i]));
                }
                if (callback) {
                    callback(responses, error);
                }
            });
        }
        Form.getMyFormResponsesAsync = getMyFormResponsesAsync;
        /**
        * Gets all the responses of the current user against the form
        * @param {Callback} callback with below parameters:
        * * * * @param {KASFormResponse[]} responses can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getBatchResponsesAsync(offset, batchSize, callback) {
            if (offset === void 0) { offset = 0; }
            if (batchSize === void 0) { batchSize = 100; }
            //////////// ACTUAL ////////////
            KASClient.getBatchResponsesJson(offset, batchSize, function (responsesJson, error) {
                var responses = [];
                for (var i in responsesJson) {
                    responses.push(KASClient.KASFormResponse.fromJSON(responsesJson[i]));
                }
                if (callback) {
                    callback(responses, error);
                }
            });
        }
        Form.getBatchResponsesAsync = getBatchResponsesAsync;
        /**
        * Submits a new response against the form associated with the conversation card
        * This will dismiss the current screen
        * @param {JSON} questionToAnswerMap question id to answer mapping
        * @param {string} responseId to be filled if the current response is an edit/update to a previous one
        * @param {boolean} isEdit denotes if the current response is an edit/update to a previous one
        * @param {boolean} showInChatCanvas denotes if a separate chat card needs to be created for this response or not
        * @param {boolean} isAnonymous denotes if the response should be registered as anonymous or not
        */
        function sumbitFormResponse(questionToAnswerMap, responseId, isEdit, showInChatCanvas, isAnonymous) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("SumbitFormResponse");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.sendResponse(questionToAnswerMap, responseId, isEdit, showInChatCanvas, isAnonymous);
        }
        Form.sumbitFormResponse = sumbitFormResponse;
        /**
        * Submits a new response against the form associated with the conversation card
        * This won't dismiss the current screen
        * @param {JSON} questionToAnswerMap question id to answer mapping
        * @param {string} responseId to be filled if the current response is an edit/update to a previous one
        * @param {boolean} isEdit denotes if the current response is an edit/update to a previous one
        * @param {boolean} showInChatCanvas denotes if a separate chat card needs to be created for this response or not
        * @param {boolean} isAnonymous denotes if the response should be registered as anonymous or not
        */
        function sumbitFormResponseWithoutDismiss(questionToAnswerMap, responseId, isEdit, showInChatCanvas, isAnonymous) {
            KASClient.sendResponse(questionToAnswerMap, responseId, isEdit, showInChatCanvas, isAnonymous, false);
        }
        Form.sumbitFormResponseWithoutDismiss = sumbitFormResponseWithoutDismiss;
        /**
        * Submits a new response against the form associated with the conversation card
        * This won't dismiss the current screen
        * @param {KASFormBatchResponseUnit[]} responses question id to answer mapping
        * @param {boolean} showInChatCanvas denotes if a separate chat card needs to be created for this response or not
        * @param {boolean} isAnonymous denotes if the response should be registered as anonymous or not
        * @param {boolean} shouldDismis denotes the current screen will dismiss or not
        */
        function sumbitBatchFormResponse(responses, showInChatCanvas, isAnonymous, shouldDismiss) {
            if (shouldDismiss === void 0) { shouldDismiss = true; }
            var responsesJson = [];
            for (var i = 0; i < responses.length; i++) {
                responsesJson.push(responses[i].toJSON());
            }
            KASClient.sendBatchResponse(responsesJson, showInChatCanvas, isAnonymous, shouldDismiss);
        }
        Form.sumbitBatchFormResponse = sumbitBatchFormResponse;
        /////////////////////////////////
        /////// Summary flow APIs ///////
        /////////////////////////////////
        /**
        * Gets whether the form summary is visible to the current user
        * @param {Callback} callback with below parameters:
        * * * * @param {boolean} shouldSeeSummary true if current user is allowed to see summary
        */
        function shouldSeeFormSummaryAsync(callback) {
            KASClient.shouldSeeSurveySummary(function (shouldSeeSummary, error) {
                if (callback) {
                    callback(shouldSeeSummary && error == null);
                }
            });
        }
        Form.shouldSeeFormSummaryAsync = shouldSeeFormSummaryAsync;
        /**
        * Gets form permissions
        * @param {Callback} callback with below parameters:
        * * * * @param {KASFormUserCapabilities} permissions
        */
        function getFormUserCapabilitiesAsync(callback) {
            KASClient.getFormUserCapabilities(function (formJson, error) {
                if (callback) {
                    callback(KASClient.KASFormUserCapabilities.fromJSON(formJson), error);
                }
            });
        }
        Form.getFormUserCapabilitiesAsync = getFormUserCapabilitiesAsync;
        /**
        * Gets whether the current user is subscriber or not
        * @param {Callback} callback with below parameters:
        * * * * @param {boolean} isSubscribed true if current user subscriber
        */
        function isSubscribed(callback) {
            KASClient.isSubscriber(function (isSubscribed, error) {
                if (callback) {
                    callback(isSubscribed && error == null);
                }
            });
        }
        Form.isSubscribed = isSubscribed;
        /**
        * Gets flat responses by all the users, and processed summary from all the responses associated
        * with the form. It requires two callbacks:
        * @param {Callback} mostUpdatedCallback to immediately get the most updated summary from local database. It has below parameters:
        * * * * @param {KASFormFlatSummary} flatSummary can be null in case of error
        * * * * @param {KASFormProcessedSummary} processedSummary can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        * @param {Callback} notifyCallback to get notified with the latest summary fetched from server. It has below parameters:
        * * * * @param {KASFormFlatSummary} flatSummary can be null in case of error
        * * * * @param {KASFormProcessedSummary} processedSummary can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        *
        * This is useful when the network is flaky/disconnected, so that summary can
        * immediately be shown with the present data we have, but with an option to refresh
        * it later on arrival of latest data from server! None of the callbacks are mandatory,
        * so if 1st is nil, this method can be used to always fetch summary from server, and
        * if 2nd is nil, this can be used to always fetch summary from local database!
        */
        function getFormSummaryAsync(mostUpdatedCallback, notifyCallback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                KASClient.getJsonFromFileAsync("mock/form_summary.json", function (summaryJson, error) {
                    KASClient.getJsonFromFileAsync("mock/form_result.json", function (summaryResultJson, error) {
                        if (mostUpdatedCallback) {
                            mostUpdatedCallback(KASClient.KASFormFlatSummary.fromJSON(summaryJson, true), KASClient.KASFormProcessedSummary.fromJSON(summaryResultJson), null);
                        }
                    });
                });
                return;
            }
            //////////// ACTUAL ////////////
            getFormAsync(function (form, error) {
                if (error == null) {
                    var callback1 = null;
                    if (mostUpdatedCallback) {
                        callback1 = function (summaryJson, summaryResultJson, error) {
                            mostUpdatedCallback(KASClient.KASFormFlatSummary.fromJSON(summaryJson, form.isResponseAppended), KASClient.KASFormProcessedSummary.fromJSON(summaryResultJson), error);
                        };
                    }
                    var callback2 = null;
                    if (notifyCallback) {
                        callback2 = function (summaryJson, summaryResultJson, error) {
                            notifyCallback(KASClient.KASFormFlatSummary.fromJSON(summaryJson, form.isResponseAppended), KASClient.KASFormProcessedSummary.fromJSON(summaryResultJson), error);
                        };
                    }
                    KASClient.getSurveySummary(callback1, callback2);
                }
                else {
                    if (mostUpdatedCallback) {
                        mostUpdatedCallback(null, null, error);
                    }
                }
            });
        }
        Form.getFormSummaryAsync = getFormSummaryAsync;
        /**
        * Gets flat responses by all the users associated with the form (It is advised to use getFormSummary() instead of this)
        * @param {Callback} callback with below parameters:
        * * * * @param {KASFormFlatSummary} flatSummary can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getFlatFormSummaryAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                KASClient.getJsonFromFileAsync("mock/form_summary.json", function (summaryJson, error) {
                    if (callback) {
                        callback(KASClient.KASFormFlatSummary.fromJSON(summaryJson, true), null);
                    }
                });
                return;
            }
            //////////// ACTUAL ////////////
            getFormAsync(function (form, error) {
                if (error == null) {
                    KASClient.getSurveySummaryJson(function (summaryJson, error) {
                        if (callback) {
                            callback(KASClient.KASFormFlatSummary.fromJSON(summaryJson, form.isResponseAppended), error);
                        }
                    });
                }
                else {
                    if (callback) {
                        callback(null, error);
                    }
                }
            });
        }
        Form.getFlatFormSummaryAsync = getFlatFormSummaryAsync;
        /**
        * Gets processed summary from all the responses associated with the form (It is advised to use getFormSummary() instead of this)
        * @param {Callback} callback with below parameters:
        * * * * @param {KASFormProcessedSummary} processedSummary can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getProcessedFormSummaryAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                KASClient.getJsonFromFileAsync("mock/form_result.json", function (summaryResultJson, error) {
                    if (callback) {
                        callback(KASClient.KASFormProcessedSummary.fromJSON(summaryResultJson), null);
                    }
                });
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getSurveyResultJson(function (summaryResultJson, error) {
                if (callback) {
                    callback(KASClient.KASFormProcessedSummary.fromJSON(summaryResultJson), error);
                }
            });
        }
        Form.getProcessedFormSummaryAsync = getProcessedFormSummaryAsync;
        /**
        * Gets aggregated summary from all the responses associated with the form
        * @param {Callback} callback with below parameters:
        * * * * @param {KASFormAggregatedSummary} aggregatedSummary can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getAggregatedFormSummaryAsync(callback) {
            getFormAsync(function (form, error) {
                KASClient.getSurveyAggregatedSummaryJson(function (summaryJson, error) {
                    if (callback) {
                        callback(KASClient.KASFormAggregatedSummary.fromJSON(summaryJson, form.questions), error);
                    }
                });
            });
        }
        Form.getAggregatedFormSummaryAsync = getAggregatedFormSummaryAsync;
        /**
        * Gets the file url from server containing flat responses associated with the form
        * @param {Callback} callback with below parameters:
        * * * * @param {string} url can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getFormURLAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                if (callback) {
                    callback("https://www.kaizala.dummyurl", null);
                }
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getSurveyURL(function (url, error) {
                if (callback) {
                    callback(url, error);
                }
            });
        }
        Form.getFormURLAsync = getFormURLAsync;
        /**
        * Launches native share screen for the form url
        * @param {string} url to be shared
        */
        function shareFormURL(url) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("ShareFormURL");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.shareSurveyURL(url);
        }
        Form.shareFormURL = shareFormURL;
        /**
        * Gets the consolidated reaction (likes and comments) of the conversation card associated with the form
        * @param {Callback} callback with below parameters:
        * * * * @param {KASFormReaction} reaction can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getFormReactionAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                KASClient.getJsonFromFileAsync("mock/form_reaction.json", function (reactionJson, error) {
                    if (callback) {
                        callback(KASClient.KASFormReaction.fromJSON(reactionJson), null);
                    }
                });
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getSurveyLikesAndComments(function (reactionJson, error) {
                if (callback) {
                    callback(KASClient.KASFormReaction.fromJSON(reactionJson), error);
                }
            });
        }
        Form.getFormReactionAsync = getFormReactionAsync;
        /**
        * Shows all the reaction screen (likes and comments) against the form
        */
        function showAllReactions(showComments) {
            if (showComments === void 0) { showComments = true; }
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("ShowAllReactions");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.showLikesAndCommentsPage(showComments);
        }
        Form.showAllReactions = showAllReactions;
        /**
        * Requests to add a like count to a form, the count may decrease if the current user has already liked the form
        */
        function likeForm() {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("LikeForm");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.likeSurvey();
        }
        Form.likeForm = likeForm;
        /**
        * Requests to add a comment to a form
        */
        function addCommentOnForm(comment) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("CommentForm: " + comment);
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.addCommentOnSurvey(comment);
        }
        Form.addCommentOnForm = addCommentOnForm;
        /**
        * Requests to add a response to a form, by launching response screen
        */
        function respondToForm() {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("RespondToForm");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.respondToSurvey();
        }
        Form.respondToForm = respondToForm;
        /**
        * Sends a reminder (a new conversation card) against the existing card
        */
        function sendRemindersToRespond() {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("SendRemindersToRespond");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.sendReminder();
        }
        Form.sendRemindersToRespond = sendRemindersToRespond;
        /**
        * Launches the conversation picker to forward a copy of the existing form as a new conversation card
        */
        function copyFormAndForward() {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("CopyFormAndForward");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.forwardSurvey();
        }
        Form.copyFormAndForward = copyFormAndForward;
        /**
        * Closes the form associated with the card, no responses will be allowed further
        */
        function closeForm() {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("CloseForm");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.closeCard();
        }
        Form.closeForm = closeForm;
        /**
        * Editing the form associated with the card.
        */
        function showEditFormPage() {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("EditForm");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.editCard();
        }
        Form.showEditFormPage = showEditFormPage;
        /**
        * Post a request to update the properties associated with the form
        * @param {KASFormPropertyUpdateInfo[]} propertyUpdates an array of all update infos that are needed to be performed, update infos can be created using KASFormPropertyUpdateFactory
        * @param {string[]} notifyUsers send push notifications to these user ids regarding this update
        * @param {string} notificationMessage push notification message
        * @param {Callback} callback with below parameters:
        * * * * @param {boolean} success indicates if the update is successful or not
        */
        function updateFormPropertiesAsync(propertyUpdates, notifyUsers, notificationMessage, callback) {
            var updates = [];
            for (var i = 0; i < propertyUpdates.length; i++) {
                var propertyUpdate = propertyUpdates[i];
                updates.push(propertyUpdate.toJSON());
            }
            KASClient.updateSurveyMetadata([JSON.stringify(updates), JSON.stringify(notifyUsers), notificationMessage], function (success, error) {
                if (callback) {
                    callback(success && error == null);
                }
            });
        }
        Form.updateFormPropertiesAsync = updateFormPropertiesAsync;
        /**
        * Requests to get local properties of an action, if it exists
        * @param {Callback} callback with below parameters:
        * * * * @param {KASActionProperties} actionProperties local properties
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getLocalActionPropertiesAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("getLocalProperties");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getLocalProperties(function (propertiesJson, error) {
                if (callback) {
                    callback(KASClient.KASActionProperties.fromJSON(propertiesJson), error);
                }
            });
        }
        Form.getLocalActionPropertiesAsync = getLocalActionPropertiesAsync;
        /**
        * Requests to update local properties of an action, if it exists
        * @param {KASActionProperties} actionProperties properties to update
        * @param {Callback} callback with below parameters:
        * * * * @param {boolean} success indicates if the update is successful or not
        * * * * @param {string} error message in case of error, null otherwise
        */
        function updateLocalActionPropertiesAsync(actionProperties, callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("updateLocalProperties");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.updateLocalProperties(actionProperties.properties, function (success, error) {
                if (callback) {
                    callback(success, error);
                }
            });
        }
        Form.updateLocalActionPropertiesAsync = updateLocalActionPropertiesAsync;
        /**
          * Requests to send push notification to a particular set of users with a custom message
          * @param {CustomNotificationMessage} customNotificationMessage list of userIds to whom the notification has to be sent
          * @param {Callback} callback with below parameters:
          * * * * @param {boolean} success indicates if the update is successful or not
          * * * * @param {string} error message in case of error, null otherwise
          */
        function sendNotificationToUsers(customNotificationMessage, callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("sendNotificationToUsers");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.sendNotification(JSON.stringify(customNotificationMessage.toJSON()), function (success, error) {
                if (callback) {
                    callback(success && error == null);
                }
            });
        }
        Form.sendNotificationToUsers = sendNotificationToUsers;
        /**
        * Requests to get custom storage properties of a package, if it exists
        * @param {Callback} callback with below parameters:
        * * * * @param {KASActionPackageProperties} packageProperties package custom properties
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getPackageCustomPropertiesAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("getPackageCustomProperties");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getPackageCustomProperties(function (propertiesJson, error) {
                if (callback) {
                    callback(KASClient.KASActionPackageProperties.fromJSON(propertiesJson), error);
                }
            });
        }
        Form.getPackageCustomPropertiesAsync = getPackageCustomPropertiesAsync;
        /**
        * Requests to update custom storage properties of a package, if it exists
        * @param {KASActionPackageProperties} packageProperties package custom properties to update
        * @param {Callback} callback with below parameters:
        * * * * @param {boolean} success indicates if the update is successful or not
        * * * * @param {string} error message in case of error, null otherwise
        */
        function updatePackageCustomPropertiesAsync(packageProperties, callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("updatePackageCustomProperties");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.updatePackageCustomProperties(packageProperties.properties, function (success, error) {
                if (callback) {
                    callback(success, error);
                }
            });
        }
        Form.updatePackageCustomPropertiesAsync = updatePackageCustomPropertiesAsync;
    })(Form = KASClient.Form || (KASClient.Form = {}));
})(KASClient || (KASClient = {}));
var iOSFontSizeScaleMultiplier = 1.0;
var Is24HourFormat = false;
var KASClient;
(function (KASClient) {
    var Internal;
    (function (Internal) {
        // Let's Meet + Job
        var kasClientStrings = null;
        function getMessagePropertiesAsync(callback) {
            KASClient.getMessageProperties(function (properties, error) {
                if (callback) {
                    callback(properties, error);
                }
            });
        }
        Internal.getMessagePropertiesAsync = getMessagePropertiesAsync;
        function createMeetingRequest(form, title, dueDate, duration, agenda, location) {
            if (location == null) {
                location = new KASClient.KASLocation();
            }
            KASClient.callNativeCommand(KASClient.CREATE_MEETING_REQUEST, [JSON.stringify(form.toJSON()), title, dueDate, duration, agenda, JSON.stringify(location.toJSON())]);
        }
        Internal.createMeetingRequest = createMeetingRequest;
        // Job
        function markJobComplete() {
            KASClient.Form.sumbitFormResponse(JSON.parse(JSON.stringify({ 0: 0 })), null, false, false, false);
        }
        Internal.markJobComplete = markJobComplete;
        function reassignJobAsync(callback) {
            KASClient.reassignJob(callback);
        }
        Internal.reassignJobAsync = reassignJobAsync;
        // Switching page in html internally
        function screenChanged(title) {
            if (title === void 0) { title = null; }
            KASClient.callNativeCommand(KASClient.SCREEN_CHANGED_COMMAND, [title]);
        }
        Internal.screenChanged = screenChanged;
        function getNativeIconsAsync(callback) {
            KASClient.getAssetPathsJson(callback);
        }
        Internal.getNativeIconsAsync = getNativeIconsAsync;
        function getNativeLocalizedStringsAsync(callback) {
            KASClient.getLocalizedStringsJson(callback);
        }
        Internal.getNativeLocalizedStringsAsync = getNativeLocalizedStringsAsync;
        function initialiseKASClientStrings() {
            KASClient.populateKASClientStrings(function (stringsJson) {
                kasClientStrings = stringsJson;
            });
        }
        Internal.initialiseKASClientStrings = initialiseKASClientStrings;
        function setTimeFormat() {
            KASClient.App.getIsAppTimeFormat24HoursAsync(function (is24HourFormat) {
                Is24HourFormat = is24HourFormat;
            });
        }
        Internal.setTimeFormat = setTimeFormat;
        function getKASClientString(stringId) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (kasClientStrings != null && kasClientStrings.hasOwnProperty(stringId)) {
                return KASClient.App.printf.apply(KASClient.App, [kasClientStrings[stringId]].concat(args));
            }
            return stringId;
        }
        Internal.getKASClientString = getKASClientString;
        function setFontSizeMultiplier() {
            if (KASClient.getPlatform() == KASClient.Platform.iOS) {
                KASClient.App.getFontSizeMultiplierAsync(function (multiplier, error) {
                    iOSFontSizeScaleMultiplier = parseFloat(multiplier);
                });
            }
        }
        Internal.setFontSizeMultiplier = setFontSizeMultiplier;
        // for iframe cross origin communication, document.domain has to be set to same super domain
        // this is used by webapp to render immersive views.
        // reference -> https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#Changing_origin
        function setDocumentDomain() {
            if (document.domain === 'cdn-alpha.kaiza.la'
                || document.domain === 'cdn.kaiza.la'
                || document.domain === 'webapp-alpha.kaiza.la'
                || document.domain === 'webapp.kaiza.la'
                || document.domain === 'webapp-local.kaiza.la') {
                document.domain = 'kaiza.la';
            }
        }
        Internal.setDocumentDomain = setDocumentDomain;
    })(Internal = KASClient.Internal || (KASClient.Internal = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var Assets = /** @class */ (function () {
        function Assets() {
        }
        Assets.emptyState = "iVBORw0KGgoAAAANSUhEUgAAAqAAAAH+CAYAAABDULzfAAAAAXNSR0IArs4c6QAAQABJREFUeAHt3Ql4XFXZwPH33JnJ3iRtutCWLrS0FAqVbiyiUARRNkXBIiCtgIDKUkTgE2WpCp+IArKIgii0LEIBgY9FBJGKAspS1paldKGlC23TNnuzzD3fOZPMZGnSTpKZyb13/vM8ce7cufec9/2dGN7e5VwRXggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIBAVgqorMyapBFAAAEEEEiDQNXPfzfDdd0ZtmnHcRb2u/x7C+0yLwQQaC8Qbv+RTwgggAACCCDQUwFbfGotV9r9zbJ9W2j/hxcCCLQXcNp/5BMCCCCAAAIIIIAAAukVoABNry+tI4AAAggggAACCHQQoADtAMJHBBBAAAEEEEAAgfQKUICm15fWEUAAAQQQQAABBDoIUIB2AOEjAggggAACCCCAQHoFKEDT60vrCCCAAAIIIIAAAh0EKEA7gPARAQQQQAABBBBAIL0CFKDp9aV1BBBAAAEEEEAAgQ4CFKAdQPiIAAIIIIAAAgggkF4BCtD0+tI6AggggAACCCCAQAcBCtAOIHxEAAEEEEAAAQQQSK8ABWh6fWkdAQQQQAABBBBAoIMABWgHED4igAACCCCAAAIIpFcgnN7maR0B/wls/OYlwyTaOE5cPUy0GhbLQOm14qi1EoosHXT/tWv9lxURI4AAAggg4B0BClDvjAWR9KHAxhMvHC9R90TR+qu6oX5qayi6edG+Rc3/ROtl4/FzXhelHpOQ88CgB67/sHVblhBAAAEEEEAgGQEK0GSU2CawAuWnXLJrtK7+Z9LkztZaJ3VJitYy1RSqU5V25274+px5ofzcK8ruvfaTwCKRGAIIIIAAAikWSOo/uCnuk+YQ8ITAxuMvuDC6rX6pCea0dsWnUuIU5otTWiyhQf1jP3bZrjNHPhOxt+xzWnRbw4e2rcQXLCCAAAIIIIDADgU4ArpDHr4MooA+76bcjWuW324KyFlt83OKC8XpXyJOUYGY0+ttv2pdjrriVteKu6VC3Mqa5vVa55uT89dt+PoFnxk0fMxZ6ubz61t3YAkBBBBAAAEEOgp08V/ZjpvxGYFgCNjic9Pa5c+ItBafKj9XImNHSHj0cHFKirouPi2BKUztNnZbu4/dt/WlZ9m2bR+t61hCAAEEEEAAgY4CFKAdRfgcaIGWI58Hx5N0ykoksvtIUfb0ejdfdh+7r20j/jJHVQ+2fcQ/844AAggggAAC2wtQgG5vwpqACjRfp9l65DM0dJCEhw9pd11nt1M314TaNmxbrS89i2tCWzVYQgABBBBAoKMABWhHET4HUsDe7W6u07wqnpw9amlvMErVy7bV7kio6cv2mar2aQcBBBBAAIEgCVCABmk0yaVLgdhUS+ZmIbuBKsiT8LDBXW7b0y9sm4lrQk1fsT572hj7IYAAAgggEGABCtAADy6pNQvYSeaVUrPjHmF7urzNdErx9b1+t6fj2xS2ts/YBPe9bpgGEEAAAQQQCJYABWiwxpNsOhMwTziKz/Npp1rqyQ1HnTXb2Trbtu3DvmJ92qcr8UIAAQQQQACBdgIUoO04+BBIAfN4zXhedp7PdL/a9dGm73T3S/sIIIAAAgj4RYAC1C8jRZw9Etj4zUuGxR6dafd2zBOO7CTzaX7F+mg5xW/7tjGkuUuaRwABBBBAwFcCFKC+Gi6C7bZAtHFcfB8nP2/Hk8zHN+ztu52s3tzolHi1iSGxjgUEEEAAAQSyWIACNIsHPytSd3Xr0cdIJHMpt+2rbQyZi4CeEEAAAQQQ8KwABahnh4bAUiKgVaIAVZFQSppMppF2fbWJIZl92QYBBBBAAIGgC1CABn2Eya/vBZS5EpQXAggggAACCCQEKEATFCwEUkDptfG8dGM0vpj29w59rUt7h3SAAAIIIICAjwQoQH00WITaAwFHJQpQaWzsQQM93KVtX21j6GFz7IYAAggggECQBMJBSoZcENhOIBRZKtH62Gq3dptI1E3/nfCmj1hf8WBsDLwQQCArBIoP3usqeWPjL2PJTh6UwX/1ZgUvSQZIQAUoF1JBoFOBjcfPeS0+F2h41DBxSoo63S5VK92Kamn6uPnAq5kO9PVBD984LVVt0w4CCCCAAAJBEOAUfBBGkRx2LKDUY/EN3C0V8cW0vbfro03faeuQhhFAAAEEEPCZAAWozwaMcHsgEHIeUEqZc+8ibmWN6Jq6HjSS3C62bduHfcX6NH0ntydbIYAAAgggkD0CFKDZM9ZZm+mgB67/UGs9Lw7QtHaDSDpmRjJtxtpu6cj2afuO98s7AggggAACCDQLUIDym5AVAqH83CvMIcnYoU9dV9+uUEwVgC0+bduxl+kr1meqGqcdBBBAAAEEAiRAARqgwSSVrgXK7r32E3PH3WXxLdzyColu3BL/2Ot325ZtM/6yfdk+4595RwABBBBAAIFWAe6Cb7VgKQsENnz9AnMqXs+Kp+qUlUh42GB7wWZ8VffeW067ty0+TWPzB//lN7O71xBbI4AAAgggkD0CHAHNnrEmUyMwaPiYs8zNQS/EMWzh2LhsdY9uTLI3HDV+tKr9kU/Ttu0j3j7vCCCAAAIIILC9QA8P+2zfEGsQ8IuAPu+m3I1rlt/e9kiojd0pLhSnf4k4RQVdT1ZvJ5mvrhU71VL8bvfWvNX8WIF78/ktF4K2fsMSAggggAACCLQKUIC2WrCUZQIbj7/gQi1ylbkjPr9d6uZ0vFOQJxKJiIqEYl/Fnu1uHq8Ze8JRxzvozQ1H5v9Ilw16+DfXt2uHDwgggAACCCDQqQAFaKcsrMwWgfJTLtk1Wlf/M3NafraZNqlbl6TYeT7tVEv2bnduOMqW3xjyRAABBBBIhQAFaCoUacP3AhtPvHC8eU78ieZo6FfNAc6pO0rIPl7T3LT0mJhJ5pnnc0dSfIcAAggggEDnAhSgnbuwNosFNn7zkmESbRwnrh4mWg2LUSi9Vhy1VkKRpYPuv7b5Qe9ZbETqCCCAgO8F7tbnijaXYWXuVSGz1KjMdeftnsLeDo/oEMi8QEuBSZGZeXp6RAABBDInoCXXFKAlGeuQQ37tqLt1zVu7PfmAAAIIIIAAAggggEAPBDgC2gM0dkEAAQQQQAABHwqccdt3ElEv/fd+Ujgw8TEtC6VDRfIzd5A1LTmkqVEK0DTB0iwCCCCAAAIIeE3A/UMiorXvJhbTtjBuBgVoF7icgu8ChtUIIIAAAggggAAC6RHgCGh6XGkVAQQQQAABBLwsULzLf6Ww//4pD3HrOpG6rSlvNmgNUoAGbUTJBwEEEEAAAQR2LjD5uAfNXfCpL0CX/pMCdOf6win4JJDYBAEEEEAAAQQQQCB1AhSgqbOkJQQQQAABBBBAAIEkBChAk0BiEwQQQAABBBBAAIHUCVCAps6SlhBAAAEEEEAAAQSSEKAATQKJTRBAAAEEEEAAAQRSJ0ABmjpLWkIAAQQQQAABBBBIQoACNAkkNkEAAQQQQAABBBBInQAFaOosaQkBBBBAAAEEEEAgCQEK0CSQ2AQBBBBAAAEEEEAgdQIUoKmzpCUEEEAAAQQQQACBJAQoQJNAYhMEEEAAAQQQQACB1AlQgKbOkpYQQAABBBBAAAEEkhCgAE0CiU0QQAABBBBAAAEEUidAAZo6S1pCAAEEEEAAAQQQSEKAAjQJJDZBAAEEEEAAAQQQSJ0ABWjqLGkJAQQQQAABBBBAIAkBCtAkkNgEAQQQQAABBBBAIHUCFKCps6QlBBBAAAEEEEAAgSQEKECTQGITBBBAAAEEEEAAgdQJUICmzpKWEEAAAQQQQAABBJIQCCexDZsggAACCCCAAALBEgjJQonKRSlPqmbLN0yb+8fardm0QJS8EltWUp/yvnzcoPJx7ISOAAIIIIAAAggkL3DG73TyG6diS+dM+ePZd6SipaC1wSn4oI0o+SCAAAIIIIAAAh4XoAD1+AARHgIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAII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";
        return Assets;
    }());
    KASClient.Assets = Assets;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASFormEmptyModule = /** @class */ (function () {
        function KASFormEmptyModule() {
            this.icon = KASClient.Assets.emptyState;
            this.title = null;
            this.subtitle = null;
            this.actionTitle = null;
            this.action = null;
            this.subActionTitle = null;
            this.subAction = null;
            this.view = null;
        }
        KASFormEmptyModule.prototype.getView = function () {
            if (!this.view) {
                var views = [];
                if (this.icon) {
                    views.push(this.getIconDiv());
                    views.push(KASClient.getSpace("30pt"));
                }
                views.push(this.getTitleDiv());
                views.push(this.getSubtitleDiv());
                if (this.actionTitle) {
                    views.push(KASClient.getSpace("50pt"));
                    views.push(this.getActionDiv());
                }
                if (this.subActionTitle) {
                    views.push(KASClient.getSpace("20pt"));
                    views.push(this.getSubActionDiv());
                }
                this.view = KASClient.getVerticalDiv(views, this.getEmptyModuleAttributes());
            }
            return this.view;
        };
        KASFormEmptyModule.prototype.recreateView = function () {
            this.view = null;
            return this.getView();
        };
        KASFormEmptyModule.prototype.getIconDiv = function () {
            if (this.icon) {
                return KASClient.getBase64Image(this.icon, this.getIconAttributes());
            }
            return null;
        };
        KASFormEmptyModule.prototype.getTitleDiv = function () {
            if (this.title) {
                return KASClient.getLabel(this.title, this.getTitleAttributes());
            }
            return null;
        };
        KASFormEmptyModule.prototype.getSubtitleDiv = function () {
            if (this.subtitle) {
                return KASClient.getLabel(this.subtitle, this.getSubtitleAttributes());
            }
            return null;
        };
        KASFormEmptyModule.prototype.getActionDiv = function () {
            if (this.actionTitle) {
                var actionDiv = KASClient.getLabel(this.actionTitle, this.getActionAttributes());
                KASClient.addClickEvent(actionDiv, this.action);
                return actionDiv;
            }
            return null;
        };
        KASFormEmptyModule.prototype.getSubActionDiv = function () {
            if (this.subActionTitle) {
                var subActionDiv = KASClient.getLabel(this.subActionTitle, this.getSubtitleAttributes());
                KASClient.addClickEvent(subActionDiv, this.subAction);
                return subActionDiv;
            }
            return null;
        };
        KASFormEmptyModule.prototype.getEmptyModuleAttributes = function () {
            var attributes = {};
            attributes["display"] = "flex";
            attributes["flex-direction"] = "column";
            attributes["justify-content"] = "center";
            attributes["align-items"] = "center";
            attributes["padding"] = "70pt 0 0 0";
            return attributes;
        };
        KASFormEmptyModule.prototype.getIconAttributes = function () {
            var attributes = {};
            attributes["width"] = "224pt";
            attributes["height"] = "170pt";
            return attributes;
        };
        KASFormEmptyModule.prototype.getTitleAttributes = function () {
            var attributes = {};
            attributes["text-align"] = "center";
            attributes["font-size"] = KASClient.getScaledFontSize("14pt");
            attributes["font-weight"] = SEMIBOLD_FONT_WEIGHT;
            attributes["color"] = "#6f7e8f";
            return attributes;
        };
        KASFormEmptyModule.prototype.getSubtitleAttributes = function () {
            var attributes = {};
            attributes["text-align"] = "center";
            attributes["font-size"] = KASClient.getScaledFontSize("10pt");
            attributes["font-weight"] = REGULAR_FONT_WEIGHT;
            attributes["color"] = "#5c6a7c";
            return attributes;
        };
        KASFormEmptyModule.prototype.getActionAttributes = function () {
            var attributes = {};
            attributes["text-align"] = "center";
            attributes["font-size"] = KASClient.getScaledFontSize("14pt");
            attributes["font-weight"] = SEMIBOLD_FONT_WEIGHT;
            attributes["color"] = BLUE_COLOR;
            return attributes;
        };
        return KASFormEmptyModule;
    }());
    KASClient.KASFormEmptyModule = KASFormEmptyModule;
})(KASClient || (KASClient = {}));
// Constants
var NAVIGATION_BAR_HEIGHT_IOS = "44pt";
var NAVIGATION_BAR_HEIGHT_ANDROID = "36pt";
var BOTTOM_BAR_HEIGHT = "44pt";
var MODULE_GAP = "4pt";
var DEFAULT_SPACE_LENGTH = "10pt";
var DEFAULT_IMAGE_DIMEN = "50pt";
var BLUE_COLOR = "rgb(0, 111, 241)";
var LIGHT_BLUE_COLOR = "rgb(0, 161, 255)";
var RED_COLOR = "rgb(208, 2, 27)";
var LIGHT_RED_COLOR = "rgb(222, 45, 79)";
var LINE_SEPARATOR_ATTRIBUTE = "0.5pt solid #d4d8db";
var PAGE_BG_COLOR = "#f1f2f4";
var SHADOW_COLOR = "rgba(0, 0, 0, 0.1)";
var CLEAR_COLOR = "rgba(0, 0, 0, 0)";
var TEXT_PRIMARY_COLOR = "rgb(50, 72, 95)";
var TEXT_SECONDARY_COLOR = "rgb(102, 119, 135)";
var GREY_BACKGROUND_COLOR = "rgba(212, 216, 219, 0.4)";
var REGULAR_FONT_WEIGHT = "normal";
var MEDIUM_FONT_WEIGHT = "500";
var SEMIBOLD_FONT_WEIGHT = "600";
var KASClient;
(function (KASClient) {
    /////////////////////////////////////////////////
    ////////////// INCOMPATIBLE SCREEN //////////////
    /////////////////////////////////////////////////
    function showIncompatibleScreen() {
        // If progress bar is shown, hide it first
        if (KASClient.Version.clientSupports(KASClient.Version.VERSION_1)) {
            KASClient.App.hideProgressBar();
        }
        var incompatibleModule = new KASClient.KASFormEmptyModule();
        incompatibleModule.title = KASClient.Internal.getKASClientString("KASFormErrorTitle");
        incompatibleModule.subtitle = KASClient.Internal.getKASClientString("KASFormErrorSubTitle");
        var dismissScreen = function () {
            if (KASClient.Version.clientSupports(KASClient.Version.VERSION_1)) {
                KASClient.App.dismissCurrentScreen();
            }
            else if (KASClient.getPlatform() == KASClient.Platform.iOS) {
                // Submit a dummy response against a dummy id which will dismiss the screen
                // without adding that response
                KASClient.Form.sumbitFormResponse(JSON.parse("{}"), "DUMMY_ID", true, false, false);
            }
        };
        if (KASClient.Version.clientSupports(KASClient.Version.VERSION_3)) {
            incompatibleModule.actionTitle = KASClient.Internal.getKASClientString("KASFormErrorUpgradeAction");
            incompatibleModule.action = function () {
                KASClient.openStoreLink();
            };
            incompatibleModule.subActionTitle = KASClient.Internal.getKASClientString("KASFormErrorNotNowAction");
            incompatibleModule.subAction = function () {
                dismissScreen();
            };
        }
        else {
            incompatibleModule.actionTitle = KASClient.Internal.getKASClientString("KASFormErrorOkAction");
            incompatibleModule.action = function () {
                dismissScreen();
            };
        }
        addCSS(document.body, { "background-color": "white" });
        clearElement(document.body);
        addElement(incompatibleModule.getView(), document.body);
    }
    KASClient.showIncompatibleScreen = showIncompatibleScreen;
    /////////////////// General Module Utility ///////////////////
    function getProfilePic(user, attributes) {
        if (attributes === void 0) { attributes = null; }
        var userProfilePicDiv = getLabel(user.pictureInitials, Object.assign(getDefaultProfilePicAttributes(user), attributes));
        if (user.pictureUrl && user.pictureUrl != "") {
            userProfilePicDiv = getCircularImage(user.pictureUrl, "30pt", attributes);
        }
        return userProfilePicDiv;
    }
    KASClient.getProfilePic = getProfilePic;
    function getDefaultProfilePicAttributes(user) {
        var attributes = {};
        attributes["border-radius"] = "50%";
        attributes["width"] = "30pt";
        attributes["height"] = "30pt";
        attributes["display"] = "flex";
        attributes["align-items"] = "center";
        attributes["justify-content"] = "center";
        attributes["background-color"] = BLUE_COLOR;
        if (user.pictureBGColor) {
            attributes["background-color"] = user.pictureBGColor;
        }
        attributes["font-size"] = getScaledFontSize("12pt");
        attributes["font-weight"] = REGULAR_FONT_WEIGHT;
        attributes["color"] = "white";
        return attributes;
    }
    KASClient.getDefaultProfilePicAttributes = getDefaultProfilePicAttributes;
    function getHorizontalDiv(childrenElements, attributes) {
        if (attributes === void 0) { attributes = null; }
        var div = getDiv(Object.assign(getHorizontalDivAttributes(), attributes));
        for (var i = 0; i < childrenElements.length; i++) {
            var childElement = childrenElements[i];
            if (childElement) {
                addElement(childElement, div);
            }
        }
        return div;
    }
    KASClient.getHorizontalDiv = getHorizontalDiv;
    function getVerticalDiv(childrenElements, attributes) {
        if (attributes === void 0) { attributes = null; }
        var div = getDiv(Object.assign(getVerticalDivAttributes(), attributes));
        for (var i = 0; i < childrenElements.length; i++) {
            var childElement = childrenElements[i];
            if (childElement) {
                addElement(childElement, div);
            }
        }
        return div;
    }
    KASClient.getVerticalDiv = getVerticalDiv;
    function getFlexibleSpace() {
        return getDiv(getCoverRestOfTheSpaceAttributes());
    }
    KASClient.getFlexibleSpace = getFlexibleSpace;
    function getSpace(length) {
        if (length === void 0) { length = DEFAULT_SPACE_LENGTH; }
        return getDiv(getSpaceAttributes(length));
    }
    KASClient.getSpace = getSpace;
    function getLabel(text, attributes, showLinks) {
        if (text === void 0) { text = null; }
        if (attributes === void 0) { attributes = null; }
        if (showLinks === void 0) { showLinks = true; }
        var labelDiv = getDiv(Object.assign(getLabelAttributes(), attributes));
        setText(labelDiv, text, true, showLinks);
        return labelDiv;
    }
    KASClient.getLabel = getLabel;
    function getButton(title, clickEvent, attributes) {
        if (title === void 0) { title = null; }
        if (clickEvent === void 0) { clickEvent = null; }
        if (attributes === void 0) { attributes = null; }
        var buttonDiv = getDiv(attributes);
        setText(buttonDiv, title, true, false);
        addClickEvent(buttonDiv, clickEvent);
        return buttonDiv;
    }
    KASClient.getButton = getButton;
    function setText(element, text, asHTML, showLinks) {
        if (text === void 0) { text = null; }
        if (asHTML === void 0) { asHTML = true; }
        if (showLinks === void 0) { showLinks = true; }
        if (asHTML) {
            element.innerHTML = text.trim();
        }
        else {
            element.innerText = text.trim();
        }
        if (showLinks) {
            highlightLinksInElement(element);
        }
    }
    KASClient.setText = setText;
    function getBase64CircularImage(data, dimen, attributes) {
        if (data === void 0) { data = null; }
        if (dimen === void 0) { dimen = DEFAULT_IMAGE_DIMEN; }
        if (attributes === void 0) { attributes = null; }
        return getBase64Image(data, Object.assign(getCircularImageAttributes(dimen), attributes));
    }
    KASClient.getBase64CircularImage = getBase64CircularImage;
    function getCircularImage(path, dimen, attributes) {
        if (path === void 0) { path = null; }
        if (dimen === void 0) { dimen = DEFAULT_IMAGE_DIMEN; }
        if (attributes === void 0) { attributes = null; }
        return getImage(path, Object.assign(getCircularImageAttributes(dimen), attributes));
    }
    KASClient.getCircularImage = getCircularImage;
    function getBase64Image(data, attributes) {
        if (data === void 0) { data = null; }
        if (attributes === void 0) { attributes = null; }
        var image = getElement("img", Object.assign(getImageAttributes(), attributes));
        image.src = getBase64Src(data);
        return image;
    }
    KASClient.getBase64Image = getBase64Image;
    function getBase64Src(data) {
        return "data:image/png;base64," + data;
    }
    KASClient.getBase64Src = getBase64Src;
    function getImage(path, attributes) {
        if (path === void 0) { path = null; }
        if (attributes === void 0) { attributes = null; }
        var image = getElement("img", Object.assign(getImageAttributes(), attributes));
        image.src = path;
        return image;
    }
    KASClient.getImage = getImage;
    function getDiv(attributes) {
        if (attributes === void 0) { attributes = null; }
        return getElement("div", attributes);
    }
    KASClient.getDiv = getDiv;
    function getPrettyPrintDiv(attributes) {
        if (attributes === void 0) { attributes = null; }
        return getElement("pre", attributes);
    }
    KASClient.getPrettyPrintDiv = getPrettyPrintDiv;
    function getCanvas(width, height, attributes) {
        if (attributes === void 0) { attributes = null; }
        var canvas = createHiDPICanvas(width, height);
        addCSS(canvas, attributes);
        return canvas;
    }
    KASClient.getCanvas = getCanvas;
    function getLoadingSpinner(attributes) {
        if (attributes === void 0) { attributes = null; }
        return getDiv(Object.assign(getLoadingSpinnerAttributes(), attributes));
    }
    KASClient.getLoadingSpinner = getLoadingSpinner;
    function getTable(attributes) {
        if (attributes === void 0) { attributes = null; }
        return getElement("table", attributes);
    }
    KASClient.getTable = getTable;
    function getTableRow(attributes) {
        if (attributes === void 0) { attributes = null; }
        return getElement("tr", attributes);
    }
    KASClient.getTableRow = getTableRow;
    function getTableDataCell(attributes) {
        if (attributes === void 0) { attributes = null; }
        return getElement("td", attributes);
    }
    KASClient.getTableDataCell = getTableDataCell;
    /////////////////// CSS Attributes ///////////////////
    function getHorizontalDivAttributes() {
        var attributes = {};
        attributes["display"] = "flex";
        attributes["flex-direction"] = "row";
        attributes["align-items"] = "center";
        attributes["justify-content"] = "space-between";
        return attributes;
    }
    KASClient.getHorizontalDivAttributes = getHorizontalDivAttributes;
    function getVerticalDivAttributes() {
        var attributes = {};
        attributes["display"] = "flex";
        attributes["flex-direction"] = "column";
        attributes["justify-content"] = "space-between";
        return attributes;
    }
    KASClient.getVerticalDivAttributes = getVerticalDivAttributes;
    function getCircularImageAttributes(dimen) {
        var attributes = getImageAttributes();
        attributes["border-radius"] = "50%";
        attributes["width"] = dimen;
        attributes["height"] = dimen;
        attributes["flex"] = "none";
        return attributes;
    }
    KASClient.getCircularImageAttributes = getCircularImageAttributes;
    function getImageAttributes() {
        var attributes = {};
        // Aspect fill
        attributes["overflow"] = "hidden";
        attributes["object-fit"] = "cover";
        return attributes;
    }
    KASClient.getImageAttributes = getImageAttributes;
    function getLabelAttributes() {
        var attributes = {};
        attributes["overflow-wrap"] = "break-word";
        attributes["word-wrap"] = "break-word";
        attributes["word-break"] = "break-word";
        // attributes["-ms-hyphens"] = "auto";
        // attributes["-moz-hyphens"] = "auto";
        // attributes["-webkit-hyphens"] = "auto";
        // attributes["hyphens"] = "auto";
        return attributes;
    }
    KASClient.getLabelAttributes = getLabelAttributes;
    function getSpaceAttributes(length) {
        var attributes = {};
        attributes["width"] = length;
        attributes["height"] = length;
        attributes["flex"] = "none";
        return attributes;
    }
    KASClient.getSpaceAttributes = getSpaceAttributes;
    function getCoverRestOfTheSpaceAttributes() {
        var attributes = {};
        attributes["flex"] = "1 1 auto";
        return attributes;
    }
    KASClient.getCoverRestOfTheSpaceAttributes = getCoverRestOfTheSpaceAttributes;
    function getLoadingSpinnerAttributes() {
        addLoadingSpinnerAnimation();
        var attributes = {};
        var borderWidth = "2pt solid ";
        attributes["border"] = borderWidth + PAGE_BG_COLOR;
        attributes["border-top"] = borderWidth + LIGHT_BLUE_COLOR;
        attributes["border-bottom"] = borderWidth + LIGHT_BLUE_COLOR;
        attributes["border-radius"] = "50%";
        attributes["width"] = "16pt";
        attributes["height"] = "16pt";
        attributes["animation"] = "spin 1.5s ease-in-out infinite";
        return attributes;
    }
    KASClient.getLoadingSpinnerAttributes = getLoadingSpinnerAttributes;
    var spinnerCSSAdded = false;
    function addLoadingSpinnerAnimation() {
        if (spinnerCSSAdded) {
            return;
        }
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = "@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }";
        document.getElementsByTagName('head')[0].appendChild(style);
        spinnerCSSAdded = true;
    }
    /////////////////// General Utility ///////////////////
    function addElement(element, parentElement) {
        if (element === void 0) { element = null; }
        if (parentElement === void 0) { parentElement = null; }
        if (element && parentElement) {
            parentElement.appendChild(element);
        }
    }
    KASClient.addElement = addElement;
    function removeElement(element, parentElement) {
        if (element === void 0) { element = null; }
        if (parentElement === void 0) { parentElement = null; }
        if (element == null)
            return;
        var parent;
        if (null == parentElement) {
            parent = element.parentElement;
        }
        else {
            parent = parentElement;
        }
        if (element && parent && parent.contains(element)) {
            parent.removeChild(element);
        }
    }
    KASClient.removeElement = removeElement;
    function replaceElement(newElement, oldElement, parentElement) {
        if (newElement === void 0) { newElement = null; }
        if (oldElement === void 0) { oldElement = null; }
        if (parentElement === void 0) { parentElement = null; }
        if (newElement && oldElement && parentElement) {
            parentElement.replaceChild(newElement, oldElement);
        }
    }
    KASClient.replaceElement = replaceElement;
    function clearElement(element) {
        if (element === void 0) { element = null; }
        while (element && element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
    KASClient.clearElement = clearElement;
    function getElement(elementTag, attributes) {
        if (attributes === void 0) { attributes = null; }
        var element = document.createElement(elementTag);
        addCSS(element, attributes);
        return element;
    }
    KASClient.getElement = getElement;
    function addClickEvent(element, clickEvent) {
        if (clickEvent != null) {
            element.onclick = clickEvent;
        }
    }
    KASClient.addClickEvent = addClickEvent;
    function setId(element, id) {
        if (id != null || id != "") {
            element.id = id;
        }
    }
    KASClient.setId = setId;
    function setClass(element, className) {
        if (className != null || className != "") {
            element.className = className;
        }
    }
    KASClient.setClass = setClass;
    function addCSS(element, attributes) {
        if (attributes != null) {
            var cssText = "";
            if (element.style.cssText && element.style.cssText != "") {
                cssText = element.style.cssText;
            }
            for (var key in attributes) {
                cssText += key + ":" + attributes[key] + ";";
            }
            element.style.cssText = cssText;
        }
    }
    KASClient.addCSS = addCSS;
    function getPixelRatio() {
        var ctx = document.createElement("canvas").getContext("2d"), dpr = window.devicePixelRatio || 1, bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;
        return dpr / bsr;
    }
    ;
    function createHiDPICanvas(w, h, ratio) {
        if (ratio === void 0) { ratio = 0; }
        if (!ratio) {
            ratio = getPixelRatio();
        }
        var can = document.createElement("canvas");
        can.width = w * ratio;
        can.height = h * ratio;
        can.style.width = w + "pt";
        can.style.height = h + "pt";
        can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
        return can;
    }
    // For placeholder text, use below CSS in html
    /*  [contenteditable = true]:empty:before {
          content: attr(placeholder);
          color: #98a3af;
      display: block;
    }*/
    function getContentEditableSpan(text, placeholder, attributes, onInputEvent) {
        if (text === void 0) { text = ""; }
        if (placeholder === void 0) { placeholder = ""; }
        if (attributes === void 0) { attributes = null; }
        var element = getElement("span", Object.assign(getContentEditableSpanAttributes(), attributes));
        element.setAttribute("placeholder", placeholder);
        element.setAttribute('contenteditable', "true");
        element.innerText = text;
        var maxLength = attributes["max-length"];
        if (maxLength) {
            element.innerText = text.length > maxLength ? text.substr(0, maxLength) : text;
        }
        var prevString = element.innerText;
        element.addEventListener('input', function () {
            if (this.innerText.trim() == "") {
                clearElement(this);
            }
            if (maxLength && this.innerText.length > maxLength) {
                this.innerText = prevString;
            }
            else if (maxLength) {
                prevString = this.innerText;
            }
            if (onInputEvent) {
                onInputEvent();
            }
        });
        // Fix for Bug 2127448 -Span with contenteditable=true is not editable in Oreo in talkbalk mode
        element.addEventListener('click', function () {
            element.focus();
        });
        return element;
    }
    KASClient.getContentEditableSpan = getContentEditableSpan;
    function getContentEditableSpanAttributes() {
        var attributes = {};
        attributes["word-break"] = "break-word";
        attributes["-webkit-user-select"] = "text";
        return attributes;
    }
    function highlightLinksInElement(element) {
        if (element == null)
            return;
        var allowedTypes = ["label", "div", "p"];
        if (allowedTypes.indexOf(element.nodeName.toLowerCase()) == -1)
            return;
        var text = element.innerHTML;
        // Regex for Http or ftp url.
        // (\b(https?|ftp):? : word start with http/https/ftp followed by .
        // \/\/ : //
        // [-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|] : any number of character from [-A-Z0-9+&@#\/%?=~_|!:,.;], 
        //      ends with any of these character [-A-Z0-9+&@#\/%=~_|]
        var urlRegexHttp = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig; // for http urls
        // Regex for www url 
        // (^|[^\/]) : start of line (^) or not start with /.
        // www\. : www.
        // [-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]) : any number of character from [-A-Z0-9+&@#\/%?=~_|!:,.;], 
        //      ends with any of these character [-A-Z0-9+&@#\/%=~_|]
        var urlRegexWww = /(^|[^\/])(www\.[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim; // for www urls
        // Regex for tel: and sms: detection
        // (tel|sms):) : word start with tel: or sms:
        // ([+]?\d{1,3}[.-\s]?)? : Optional : + is optional, 1-3 digit number, ./-/space is optional.
        // ([(]?\d{1,3}[)]?[.-\s]?){1,2} : 1-3 digit number with/without (), ./-/space is optional. And this can but repaet max 2 times.
        // \d{4} : 4 digit number.
        var telSmsRegex = /(\b(tel|sms):)([+]?\d{1,3}[.-\s]?)?([(]?\d{1,3}[)]?[.-\s]?){1,2}\d{4}/gim;
        text = text.replace(urlRegexHttp, function (url) {
            return "<a href=\"" + url + "\">" + url + "</a>";
        });
        text = text.replace(urlRegexWww, function (url) {
            var newUrl = url;
            if (url.toLowerCase().indexOf("www") == 0) {
                newUrl = "http://" + url;
                return "<a href=\"" + newUrl + "\">" + url + "</a>";
            }
            else if (url.toLowerCase().indexOf("www") == 1) {
                newUrl = "http://" + url.substring(1);
                return url.charAt(0) + "<a href=\"" + newUrl + "\">" + url.substring(1) + "</a>";
            }
            else {
                return url;
            }
        });
        text = text.replace(telSmsRegex, function (url) {
            return "<a href=\"" + url + "\">" + url + "</a>";
        });
        element.innerHTML = text;
    }
    KASClient.highlightLinksInElement = highlightLinksInElement;
    function getScaledFontSize(fontSize) {
        if (KASClient.getPlatform() == KASClient.Platform.Android)
            return fontSize;
        if (fontSize == null || fontSize == "" || fontSize == undefined)
            return fontSize;
        var size = parseFloat(fontSize);
        if (isNaN(size))
            return fontSize;
        var unit = fontSize.substr(size.toString().length, fontSize.length - size.toString().length);
        size = size * iOSFontSizeScaleMultiplier;
        return size.toString() + unit;
    }
    KASClient.getScaledFontSize = getScaledFontSize;
    /**
     * Offset position of element
     */
    function findPosition(element) {
        var curleft = 0;
        var curtop = 0;
        var curright = 0;
        var curbottom = 0;
        if (element.offsetParent) {
            do {
                curleft += element.offsetLeft;
                curtop += element.offsetTop;
            } while (element = element.offsetParent);
        }
        return [curtop, curleft];
    }
    KASClient.findPosition = findPosition;
    /**
     * Style value of element
     */
    function getStyle(element, styleName) {
        // J/S Pro Techniques p136
        if (element.style[styleName]) {
            return element.style[styleName];
        }
        else if (element.currentStyle) {
            return element.currentStyle[styleName];
        }
        else if (document.defaultView && document.defaultView.getComputedStyle) {
            styleName = styleName.replace(/([A-Z])/g, "-$1");
            styleName = styleName.toLowerCase();
            var s = document.defaultView.getComputedStyle(element, "");
            return s && s.getPropertyValue(styleName);
        }
        else {
            return null;
        }
    }
    KASClient.getStyle = getStyle;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var ActionDesigner;
    (function (ActionDesigner) {
        function callNativeCommand(command, args, successCallback, errorCallback) {
            if (args === void 0) { args = null; }
            if (successCallback === void 0) { successCallback = null; }
            if (errorCallback === void 0) { errorCallback = null; }
            var result = null;
            switch (command) {
                case KASClient.GET_CLIENT_SUPPORTED_SDK_VERSION_COMMAND:
                    result = ["9999"]; // All supported
                    break;
                case KASClient.OPEN_STORE_LINK_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.GET_SURVEY_JSON_COMMAND:
                    getMockData(["survey"], successCallback);
                    return;
                case KASClient.GET_SURVEY_SUMMARY_JSON_COMMAND:
                    getMockData(["surveyFlatSummary"], successCallback);
                    return;
                case KASClient.GET_SURVEY_AGGREGATED_SUMMARY_JSON_COMMAND:
                    getMockData(["surveyAggregatedSummary"], successCallback);
                    return;
                case KASClient.GET_SURVEY_RESULT_JSON_COMMAND:
                    getMockData(["surveyProcessedSummary"], successCallback);
                    return;
                case KASClient.GET_SURVEY_SUMMARY_WITH_NOTIFY_COMMAND:
                    getMockData(["surveyFlatSummary", "surveyProcessedSummary"], successCallback);
                    return;
                case KASClient.GET_SURVEY_URL_COMMAND:
                    getMockData(["surveyURL"], successCallback);
                    return;
                case KASClient.GET_RESPONSES_COMMAND:
                    getMockData(["myResponses"], successCallback);
                    return;
                case KASClient.GET_LIKES_AND_COMMENTS_DATA_COMMAND:
                    getMockData(["likesAndComments"], successCallback);
                    return;
                case KASClient.GET_ASSET_PATHS_COMMAND:
                    getMockData(["assetPaths"], successCallback);
                    return;
                case KASClient.GET_LOCALIZED_STRINGS_COMMAND:
                case KASClient.GET_LOCALIZED_MINIAPP_STRINGS:
                    getStrings(successCallback);
                    return;
                case KASClient.POPULATE_KASCLIENT_STRINGS:
                    var sdkStrings = window.parent["getKASClientSDKStrings"]();
                    result = [JSON.stringify(sdkStrings)];
                    break;
                case KASClient.GET_POLL_STATUS_COMMAND:
                    getMockData(["isSurveyActive"], successCallback);
                    return;
                case KASClient.GET_LOCATION_COMMAND:
                case KASClient.GET_CURRENT_LOCATION_COMMAND:
                case KASClient.SHOW_PLACE_PICKER:
                    getMockData(["currentLocation"], successCallback);
                    return;
                case KASClient.SHOW_ALERT_COMMAND:
                    alert(args[0]);
                    return;
                case KASClient.UPDATE_RESPONSE_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.GET_USER_DETAILS_COMMAND:
                    getMockData(["userDetails"], successCallback);
                    break;
                case KASClient.GET_INTEGERATION_SERVICE_TOKEN_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.GET_ATTACHMENT_PATH_COMMAND:
                    getMockData(["attachmentPath"], successCallback);
                    return;
                case KASClient.CREATE_REQUEST_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.CLOSE_CARD_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.SELECT_ASIGNEES_COMMAND:
                    getMockData(["assignees"], successCallback);
                    return;
                case KASClient.GET_APP_INFO_COMMAND:
                    getMockData(["appInfo"], successCallback);
                    return;
                case KASClient.GET_MESSAGE_PROPERTIES_COMMAND:
                    getMockData(["messageProperties"], successCallback);
                    return;
                case KASClient.SHOW_LIKES_AND_COMMENTS_PAGE_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.SHOW_IMAGE_FULL_SCREEN_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.RESPOND_TO_SURVEY_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.SEND_REMINDER_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.FORWARD_SURVEY_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.GET_CURRENT_USER_ID_COMMAND:
                    getMockData(["currentUserId"], successCallback);
                    return;
                case KASClient.ADD_LIKE_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.ADD_COMMENT_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.DISMISS_SCREEN_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.SHOW_PROGRESS_BAR_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.HIDE_PROGRESS_BAR_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.REASSIGN_JOB_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.SEND_SURVEY_URL_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.SCREEN_CHANGED_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.LOG_ERROR_COMMAND:
                    alert(args[0]);
                    break;
                case KASClient.GET_PACKAGE_PROPERTIES_COMMAND:
                    getMockData(["packageProperties"], successCallback);
                    return;
                case KASClient.SHOULD_SEE_SURVEY_SUMMARY:
                    getMockData(["shouldSeeSurveySummary"], successCallback);
                    return;
                case KASClient.CAN_RESPOND_TO_SURVEY:
                    getMockData(["canRespondToSurvey"], successCallback);
                    return;
                case KASClient.IS_TALKBACK_ENABLED:
                    getMockData(["isTalkBackEnabled"], successCallback);
                    return;
                case KASClient.READ_TALKBACK_MESSAGE:
                    alert(args[0]);
                    break;
                case KASClient.LOG_TO_REPORT_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.RECORD_EVENT_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.CREATE_MEETING_REQUEST:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.EDIT_CARD_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.UPDATE_REQUEST_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.IS_CURRENT_USER_O365_SUBSCRIBED:
                    getMockData(["isO365Subscribed"], successCallback);
                    return;
                case KASClient.GET_CONVERSATION_NAME_COMMAND:
                    getMockData(["groupName"], successCallback);
                    return;
                case KASClient.GET_CONVERSATION_PARTICIPANTS_COUNT:
                    getMockData(["groupParticipantsCount"], successCallback);
                    return;
                case KASClient.SHOW_DURATION_PICKER:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.SELECT_ATTACHMENTS_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.DOWNLOAD_ATTACHMENT_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.CANCEL_ATTACHMENT_DOWNLOAD_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.GET_PACKAGE_CUSTOM_SETTINGS:
                    getSettings(successCallback);
                    return;
                case KASClient.GET_UUID:
                    /* NOT SUPPORTED */
                    break;
                default:
            }
            callFunction(successCallback, result);
        }
        ActionDesigner.callNativeCommand = callNativeCommand;
        function getStrings(successCallback) {
            if (successCallback === void 0) { successCallback = null; }
            if (window.parent.hasOwnProperty("getPackageStrings")) {
                var strings = window.parent["getPackageStrings"]();
                callFunction(successCallback, [JSON.stringify(strings)]);
                return;
            }
            KASClient.getJsonFromFileAsync("strings_en.json", function (strings, error) {
                callFunction(successCallback, [JSON.stringify(strings)]);
            });
        }
        function getSettings(successCallback) {
            if (successCallback === void 0) { successCallback = null; }
            if (window.parent.hasOwnProperty("getPackageSettings")) {
                var settings = window.parent["getPackageSettings"]();
                callFunction(successCallback, [JSON.stringify(settings)]);
                return;
            }
            KASClient.getJsonFromFileAsync("settings.json", function (settings, error) {
                callFunction(successCallback, [JSON.stringify(settings)]);
            });
        }
        var mockData = null;
        function getMockData(dataKeys, successCallback) {
            if (successCallback === void 0) { successCallback = null; }
            if (mockData) {
                var result = [];
                for (var i = 0; i < dataKeys.length; i++) {
                    var key = dataKeys[i];
                    var value = mockData[key];
                    if (typeof value === "object") {
                        value = JSON.stringify(value);
                    }
                    else if (typeof value === "boolean" || typeof value === "number") {
                        value = "" + value;
                    }
                    result.push(value);
                }
                callFunction(successCallback, result);
            }
            else {
                KASClient.getJsonFromFileAsync("mockData.json", function (data, error) {
                    mockData = data;
                    getMockData(dataKeys, successCallback);
                });
            }
        }
        function callFunction(func, params) {
            if (params === void 0) { params = null; }
            if (func) {
                if (params) {
                    KASClient.executeFunction(func, params);
                }
                else {
                    KASClient.executeFunction(func);
                }
            }
        }
    })(ActionDesigner = KASClient.ActionDesigner || (KASClient.ActionDesigner = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var Android;
    (function (Android) {
        function callNativeCommand(command, args, successCallback, errorCallback) {
            if (args === void 0) { args = null; }
            if (successCallback === void 0) { successCallback = null; }
            if (errorCallback === void 0) { errorCallback = null; }
            if (KASClient.Version.clientSupports(KASClient.Version.VERSION_3_1, true /* considerMinorVersion */)) {
                callNativeCommandAsync(command, args, successCallback, errorCallback);
            }
            else {
                callNativeCommandSync(command, args, successCallback, errorCallback);
            }
        }
        Android.callNativeCommand = callNativeCommand;
        function callNativeCommandAsync(command, args, successCallback, errorCallback) {
            if (args === void 0) { args = null; }
            if (successCallback === void 0) { successCallback = null; }
            if (errorCallback === void 0) { errorCallback = null; }
            switch (command) {
                case KASClient.GET_CLIENT_SUPPORTED_SDK_VERSION_COMMAND:
                case KASClient.OPEN_STORE_LINK_COMMAND:
                case KASClient.SHOW_ALERT_COMMAND:
                case KASClient.UPDATE_RESPONSE_COMMAND:
                case KASClient.CREATE_REQUEST_COMMAND:
                case KASClient.CREATE_REQUEST_WITH_RESPONSES_COMMAND:
                case KASClient.CLOSE_CARD_COMMAND:
                case KASClient.SHOW_LIKES_AND_COMMENTS_PAGE_COMMAND:
                case KASClient.SHOW_IMAGE_FULL_SCREEN_COMMAND:
                case KASClient.RESPOND_TO_SURVEY_COMMAND:
                case KASClient.SEND_REMINDER_COMMAND:
                case KASClient.FORWARD_SURVEY_COMMAND:
                case KASClient.ADD_LIKE_COMMAND:
                case KASClient.DISMISS_SCREEN_COMMAND:
                case KASClient.SHOW_PROGRESS_BAR_COMMAND:
                case KASClient.HIDE_PROGRESS_BAR_COMMAND:
                case KASClient.SEND_SURVEY_URL_COMMAND:
                case KASClient.SCREEN_CHANGED_COMMAND:
                case KASClient.LOG_ERROR_COMMAND:
                case KASClient.ADD_COMMENT_COMMAND:
                case KASClient.SHOULD_SEE_SURVEY_SUMMARY:
                case KASClient.CAN_RESPOND_TO_SURVEY:
                case KASClient.IS_TALKBACK_ENABLED:
                case KASClient.READ_TALKBACK_MESSAGE:
                case KASClient.IS_SUBSCRIBER:
                case KASClient.LOG_TO_REPORT_COMMAND:
                case KASClient.RECORD_EVENT_COMMAND:
                case KASClient.CREATE_MEETING_REQUEST:
                case KASClient.EDIT_CARD_COMMAND:
                case KASClient.UPDATE_REQUEST_COMMAND:
                case KASClient.OPEN_IMMERSIVE_VIEW_FOR_ATTACHMENT:
                case KASClient.GET_UUID:
                case KASClient.CUSTOMIZE_NATIVE_TOOLBAR:
                case KASClient.GET_CLIENT_DETAILS:
                case KASClient.SHOW_LOCATION_MAP:
                case KASClient.OPEN_LINK_IN_BROWSER:
                    // For these commands, we don't need an Async API
                    callNativeCommandSync(command, args, successCallback, errorCallback);
                    break;
                case KASClient.GET_SURVEY_JSON_COMMAND:
                    KaizalaPlatform.getValueAsync(successCallback, errorCallback, "surveyJson");
                    return;
                case KASClient.GET_SURVEY_SUMMARY_JSON_COMMAND:
                    KaizalaPlatform.getValueAsync(successCallback, errorCallback, "surveySummaryJson");
                    return;
                case KASClient.GET_SURVEY_AGGREGATED_SUMMARY_JSON_COMMAND:
                    KaizalaPlatform.getSurveyAggregatedSummaryAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_SURVEY_RESULT_JSON_COMMAND:
                    KaizalaPlatform.getSurveySummaryResultAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_SURVEY_SUMMARY_WITH_NOTIFY_COMMAND:
                    KaizalaPlatform.getSurveySummaryAsync(args[0], args[1]);
                    return; // As the callbacks are already handled, lets return
                case KASClient.GET_SURVEY_URL_COMMAND:
                    KaizalaPlatform.getSurveyURLAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_RESPONSES_COMMAND:
                    KaizalaPlatform.getValueAsync(successCallback, errorCallback, "frsps");
                    return;
                case KASClient.GET_LIKES_AND_COMMENTS_DATA_COMMAND:
                    KaizalaPlatform.getLikesAndCommentsAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_ASSET_PATHS_COMMAND:
                    KaizalaPlatform.getAssetPathsAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_LOCALIZED_STRINGS_COMMAND:
                    KaizalaPlatform.getLocalizedStringsAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_POLL_STATUS_COMMAND:
                    KaizalaPlatform.getPollStatusAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_LOCATION_COMMAND:
                    KaizalaPlatform.getCurrentLocationAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_CURRENT_LOCATION_COMMAND:
                    KaizalaPlatform.getCurrentLocationAsyncV2(successCallback, errorCallback);
                    return;
                case KASClient.GET_USER_DETAILS_COMMAND:
                    KaizalaPlatform.getUserDetailsAsync(successCallback, errorCallback, JSON.stringify(args));
                    return;
                case KASClient.GET_INTEGERATION_SERVICE_TOKEN_COMMAND:
                    KaizalaPlatform.getIntegerationServiceToken(successCallback, errorCallback);
                    break;
                case KASClient.PERFORM_SPEECH_TO_TEXT:
                    KaizalaPlatform.performSpeechToText(successCallback, errorCallback);
                    break;
                case KASClient.SET_SECURED_VALUE:
                    KaizalaPlatform.setSecuredValue(args[0] /* Key */, args[1] /* Value */);
                    break;
                case KASClient.GET_SECURED_VALUE:
                    KaizalaPlatform.getSecuredValue(args[0] /* Key */, successCallback, errorCallback);
                    break;
                case KASClient.GET_DEVICE_ID_COMMAND:
                    KaizalaPlatform.getDeviceId(successCallback, errorCallback);
                    break;
                case KASClient.GET_CONVERSATION_NAME_COMMAND:
                    KaizalaPlatform.getConversationNameAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_CONVERSATION_TYPE_COMMAND:
                    KaizalaPlatform.getConversationTypeAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_ATTACHMENT_PATH_COMMAND:
                    KaizalaPlatform.getAttachmentPathAsync(successCallback, errorCallback);
                    return;
                case KASClient.SELECT_ASIGNEES_COMMAND:
                    KaizalaPlatform.selectAssigneeAsync(args[0], args[1], args[2], args[3], successCallback, errorCallback);
                    return;
                case KASClient.GET_APP_INFO_COMMAND:
                    KaizalaPlatform.getAppInfoAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_MESSAGE_PROPERTIES_COMMAND:
                    KaizalaPlatform.getMessagePropertiesAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_CURRENT_USER_ID_COMMAND:
                    KaizalaPlatform.getUserIdAsync(successCallback, errorCallback);
                    return;
                case KASClient.REASSIGN_JOB_COMMAND:
                    KaizalaPlatform.reassignJobAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_PACKAGE_PROPERTIES_COMMAND:
                    KaizalaPlatform.getPackagePropertiesAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_FORM_USER_CAPABILITIES:
                    KaizalaPlatform.getFormUserCapabilitiesAsync(successCallback, errorCallback);
                    return;
                case KASClient.UPDATE_SURVEY_METADATA:
                    KaizalaPlatform.updateSurveyMetadata(args, successCallback, errorCallback);
                    return;
                case KASClient.GET_LOCALIZED_MINIAPP_STRINGS:
                    KaizalaPlatform.getLocalizedMiniAppStrings(successCallback, errorCallback);
                    return;
                case KASClient.POPULATE_KASCLIENT_STRINGS:
                    KaizalaPlatform.populateKASClientStrings(successCallback, errorCallback);
                    return;
                case KASClient.IS_CURRENT_USER_O365_SUBSCRIBED:
                    KaizalaPlatform.isCurrentUserO365Subscribed(successCallback, errorCallback);
                    return;
                case KASClient.GET_O365_USER_DETAILS:
                    KaizalaPlatform.getO365UserDetails(successCallback, errorCallback);
                    return;
                case KASClient.GET_CONVERSATION_PARTICIPANTS_COUNT:
                    KaizalaPlatform.getConversationParticipantsCountAsync(successCallback, errorCallback);
                    return;
                case KASClient.SHOW_PLACE_PICKER:
                    KaizalaPlatform.showPlacePickerAsync(successCallback, errorCallback);
                    return;
                case KASClient.SHOW_DURATION_PICKER:
                    KaizalaPlatform.showDurationPickerAsync(args[0], successCallback, errorCallback);
                    return;
                case KASClient.SELECT_ATTACHMENTS_COMMAND:
                    KaizalaPlatform.selectAttachmentsAsync(JSON.stringify(args[0]), args[1], successCallback, errorCallback);
                    return;
                case KASClient.DOWNLOAD_ATTACHMENT_COMMAND:
                    KaizalaPlatform.downloadAttachmentAsync(JSON.stringify(args[0]), successCallback, errorCallback);
                    return;
                case KASClient.CANCEL_ATTACHMENT_DOWNLOAD_COMMAND:
                    KaizalaPlatform.cancelAttachmentDownloadAsync(JSON.stringify(args[0]), successCallback, errorCallback);
                    return;
                case KASClient.GENERATE_THUMBNAIL_FOR_IMAGE_ATTACHMENT:
                    KaizalaPlatform.generateBase64ThumbnailForAttachmentAsync(args[0], successCallback, errorCallback);
                    return;
                case KASClient.CHECK_STORAGE_ACCESS_FOR_ATTACHMENTS:
                    KaizalaPlatform.checkStoragePermissionAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_LOCAL_PROPERTIES:
                    KaizalaPlatform.getLocalActionPropertiesAsync(successCallback, errorCallback);
                    return;
                case KASClient.UPDATE_LOCAL_PROPERTIES:
                    KaizalaPlatform.updateLocalActionPropertiesAsync(args[0], successCallback, errorCallback);
                    return;
                case KASClient.GET_PACKAGE_CUSTOM_SETTINGS:
                    KaizalaPlatform.getPackageCustomSettings(successCallback, errorCallback);
                    return;
                case KASClient.GET_PACKAGE_CUSTOM_PROPERTIES:
                    KaizalaPlatform.getPackageCustomProperties(successCallback, errorCallback);
                    return;
                case KASClient.UPDATE_PACKAGE_CUSTOM_PROPERTIES:
                    KaizalaPlatform.updatePackageCustomProperties(args[0], successCallback, errorCallback);
                    return;
                case KASClient.IS_ATTACHMENT_DOWNLOADING:
                    KaizalaPlatform.isAttachmentDownloadingAsync(JSON.stringify(args[0]), successCallback, errorCallback);
                    return;
                case KASClient.SEND_NOTIFICATION:
                    KaizalaPlatform.sendNotification(args[0], successCallback, errorCallback);
                    return;
                case KASClient.PERFORM_AUTHENTICATION:
                    KaizalaPlatform.performAuthenticationForType(args[0], successCallback, errorCallback);
                    return;
                case KASClient.IS_AUTHENTICATION_TYPE_SUPPORTED:
                    KaizalaPlatform.checkAuthenticationSupportForType(args[0], successCallback, errorCallback);
                    return;
                case KASClient.GET_BATCH_RESPONSES_COMMAND:
                    KaizalaPlatform.getAllFormResponsesAsync(args[0], args[1], successCallback, errorCallback);
                    return;
                case KASClient.SHOW_USER_PROFILE:
                    KaizalaPlatform.showUserProfilePageAsync(args[0], args[1], successCallback, errorCallback);
                    return;
                case KASClient.START_CHAT_COMMAND:
                    KaizalaPlatform.startChatAsync(args[0], successCallback, errorCallback);
                    return;
                case KASClient.UPDATE_BATCH_RESPONSES_COMMAND:
                    KaizalaPlatform.updateBatchMyResponses(JSON.stringify(args[0]), args[1], args[2], args[3]);
                    return;
                case KASClient.CREATE_REQUEST_COMMAND_V2:
                    KaizalaPlatform.createRequestV2(args[0], args[1], args[2]);
                    break;
                case KASClient.PERFORM_HTTP_REQUEST:
                    KaizalaPlatform.performHTTPRequest(args[0], args[1], successCallback, errorCallback);
                    break;
                default:
            }
        }
        function callNativeCommandSync(command, args, successCallback, errorCallback) {
            if (args === void 0) { args = null; }
            if (successCallback === void 0) { successCallback = null; }
            if (errorCallback === void 0) { errorCallback = null; }
            var result = null;
            switch (command) {
                case KASClient.GET_UUID:
                    result = [KaizalaPlatform.generateUUID()];
                    break;
                case KASClient.GET_CLIENT_SUPPORTED_SDK_VERSION_COMMAND:
                    result = [KaizalaPlatform.getSupportedSDKVersion()];
                    break;
                case KASClient.OPEN_STORE_LINK_COMMAND:
                    KaizalaPlatform.openStoreLink();
                    break;
                case KASClient.GET_SURVEY_JSON_COMMAND:
                    result = [KaizalaPlatform.getValue("surveyJson")];
                    break;
                case KASClient.GET_SURVEY_SUMMARY_JSON_COMMAND:
                    result = [KaizalaPlatform.getValue("surveySummaryJson")];
                    break;
                case KASClient.GET_SURVEY_AGGREGATED_SUMMARY_JSON_COMMAND:
                    result = [KaizalaPlatform.getSurveyAggregatedSummary()];
                    break;
                case KASClient.GET_SURVEY_RESULT_JSON_COMMAND:
                    result = [KaizalaPlatform.getSurveySummaryResult()];
                    // Handling internet off scenario, so that HTML
                    // will load the error page
                    if (result == null || result[0] == null || result[0] == "") {
                        if (errorCallback) {
                            KASClient.executeFunction(errorCallback, ["Could not get required data"]);
                        }
                        return;
                    }
                    break;
                case KASClient.GET_SURVEY_SUMMARY_WITH_NOTIFY_COMMAND:
                    KaizalaPlatform.getSurveySummary(args[0], args[1]);
                    return; // As the callbacks are already handled, lets return
                case KASClient.GET_SURVEY_URL_COMMAND:
                    KaizalaPlatform.getSurveyURL(successCallback, errorCallback);
                    return; // As the callbacks are already handled, lets return
                case KASClient.GET_RESPONSES_COMMAND:
                    result = [KaizalaPlatform.getValue("frsps")];
                    break;
                case KASClient.GET_LIKES_AND_COMMENTS_DATA_COMMAND:
                    result = [KaizalaPlatform.getLikesAndCommentsDataWithError()];
                    break;
                case KASClient.GET_ASSET_PATHS_COMMAND:
                    result = [KaizalaPlatform.getAssetPaths()];
                    break;
                case KASClient.GET_LOCALIZED_STRINGS_COMMAND:
                    result = [KaizalaPlatform.getLocalizedStrings()];
                    break;
                case KASClient.GET_POLL_STATUS_COMMAND:
                    result = [KaizalaPlatform.getPollStatus()];
                    break;
                case KASClient.GET_CURRENT_LOCATION_COMMAND:
                    result = [KaizalaPlatform.getCurrentLocation()];
                    break;
                case KASClient.SHOW_ALERT_COMMAND:
                    KaizalaPlatform.showToast(args[0]);
                    break;
                case KASClient.UPDATE_RESPONSE_COMMAND:
                    KaizalaPlatform.updateMyResponse(JSON.stringify(args[0]), args[1], args[2], args[3], args[4], args[5]);
                    break;
                case KASClient.GET_USER_DETAILS_COMMAND:
                    result = [KaizalaPlatform.getUserDetails(JSON.stringify(args))];
                    break;
                case KASClient.GET_CONVERSATION_NAME_COMMAND:
                    result = [KaizalaPlatform.getConversationName()];
                    break;
                case KASClient.GET_ATTACHMENT_PATH_COMMAND:
                    result = [KaizalaPlatform.getAttachmentPath()];
                    break;
                case KASClient.CREATE_REQUEST_COMMAND:
                    KaizalaPlatform.createRequest(args[0], args[1], args[2], args[3]);
                    break;
                case KASClient.CREATE_REQUEST_WITH_RESPONSES_COMMAND:
                    KaizalaPlatform.createRequestWithResponses(args[0], JSON.stringify(args[1]), args[2], args[3], args[4]);
                    break;
                case KASClient.CLOSE_CARD_COMMAND:
                    KaizalaPlatform.closeCard();
                    break;
                case KASClient.SELECT_ASIGNEES_COMMAND:
                    result = [KaizalaPlatform.selectAssignee(args[0], args[1], args[2], args[3])];
                    break;
                case KASClient.GET_APP_INFO_COMMAND:
                    result = [KaizalaPlatform.getAppInfo()];
                    break;
                case KASClient.GET_MESSAGE_PROPERTIES_COMMAND:
                    result = [KaizalaPlatform.getMessageProperties()];
                    break;
                case KASClient.SHOW_LIKES_AND_COMMENTS_PAGE_COMMAND:
                    KaizalaPlatform.showLikesAndCommentsPage(args[0]);
                    break;
                case KASClient.SHOW_IMAGE_FULL_SCREEN_COMMAND:
                    KaizalaPlatform.showImageImmersiveView(args[0], args[1]);
                    break;
                case KASClient.RESPOND_TO_SURVEY_COMMAND:
                    KaizalaPlatform.respondToSurvey();
                    break;
                case KASClient.SEND_REMINDER_COMMAND:
                    KaizalaPlatform.sendReminder();
                    break;
                case KASClient.FORWARD_SURVEY_COMMAND:
                    KaizalaPlatform.forwardSurvey();
                    break;
                case KASClient.GET_CURRENT_USER_ID_COMMAND:
                    result = [KaizalaPlatform.getUserId()];
                    break;
                case KASClient.ADD_LIKE_COMMAND:
                    KaizalaPlatform.addLike();
                    break;
                case KASClient.ADD_COMMENT_COMMAND:
                    KaizalaPlatform.addComment(args[0]);
                    break;
                case KASClient.DISMISS_SCREEN_COMMAND:
                    KaizalaPlatform.dismissActivity();
                    break;
                case KASClient.SHOW_PROGRESS_BAR_COMMAND:
                    KaizalaPlatform.showProgressBar();
                    break;
                case KASClient.HIDE_PROGRESS_BAR_COMMAND:
                    KaizalaPlatform.hideProgressBar();
                    break;
                case KASClient.REASSIGN_JOB_COMMAND:
                    result = [KaizalaPlatform.reassignJob()];
                    break;
                case KASClient.SEND_SURVEY_URL_COMMAND:
                    KaizalaPlatform.sendUrl(args[0]);
                    break;
                case KASClient.SCREEN_CHANGED_COMMAND:
                    KaizalaPlatform.sendScreenChange();
                    break;
                case KASClient.LOG_ERROR_COMMAND:
                    KaizalaPlatform.logError(args[0]);
                    break;
                case KASClient.GET_PACKAGE_PROPERTIES_COMMAND:
                    result = [KaizalaPlatform.getPackageProperties()];
                    break;
                case KASClient.SHOULD_SEE_SURVEY_SUMMARY:
                    result = [KaizalaPlatform.shouldSeeSurveySummary()];
                    break;
                case KASClient.IS_SUBSCRIBER:
                    result = [KaizalaPlatform.isSubscriber()];
                    break;
                case KASClient.CAN_RESPOND_TO_SURVEY:
                    result = [KaizalaPlatform.canRespondToSurvey()];
                    break;
                case KASClient.IS_TALKBACK_ENABLED:
                    result = [KaizalaPlatform.isTalkBackEnabled()];
                    break;
                case KASClient.READ_TALKBACK_MESSAGE:
                    KaizalaPlatform.readTalkBackMessage(args[0]);
                    break;
                case KASClient.LOG_TO_REPORT_COMMAND:
                    KaizalaPlatform.logToReport(args[0]);
                    break;
                case KASClient.RECORD_EVENT_COMMAND:
                    KaizalaPlatform.recordEvent(args[0], args[1], args[2]);
                    break;
                case KASClient.CREATE_MEETING_REQUEST:
                    KaizalaPlatform.createMeetingRequest(args[0], args[1], args[2], args[3], args[4], args[5]);
                    break;
                case KASClient.EDIT_CARD_COMMAND:
                    KaizalaPlatform.editCard();
                    return;
                case KASClient.UPDATE_REQUEST_COMMAND:
                    result = [KaizalaPlatform.updateSurvey(args[0], successCallback, errorCallback)];
                    break;
                case KASClient.OPEN_IMMERSIVE_VIEW_FOR_ATTACHMENT:
                    KaizalaPlatform.openImmersiveViewForAttachment(JSON.stringify(args[0]));
                    return;
                case KASClient.CUSTOMIZE_NATIVE_TOOLBAR:
                    KaizalaPlatform.customizeNativeToolbar(JSON.stringify(args[0]));
                    return;
                case KASClient.GET_CLIENT_DETAILS:
                    result = [KaizalaPlatform.getClientDetails()];
                    break;
                case KASClient.SHOW_LOCATION_MAP:
                    KaizalaPlatform.showLocationMap(args[0]);
                    break;
                case KASClient.OPEN_LINK_IN_BROWSER:
                    KaizalaPlatform.openLinkInBrowser(args[0]);
                    break;
                default:
            }
            if (successCallback) {
                if (result) {
                    KASClient.executeFunction(successCallback, result);
                }
                else {
                    KASClient.executeFunction(successCallback);
                }
            }
        }
    })(Android = KASClient.Android || (KASClient.Android = {}));
})(KASClient || (KASClient = {}));
var __NO_HTML__ = false;
var KASClient;
(function (KASClient) {
    KASClient.GET_SURVEY_JSON_COMMAND = "getSurveyJson";
    KASClient.GET_SURVEY_SUMMARY_JSON_COMMAND = "getSurveySummaryJson";
    KASClient.GET_SURVEY_AGGREGATED_SUMMARY_JSON_COMMAND = "getSurveyAggregatedSummaryJson";
    KASClient.GET_SURVEY_RESULT_JSON_COMMAND = "getSurveyResultJson";
    KASClient.GET_SURVEY_SUMMARY_WITH_NOTIFY_COMMAND = "getSurveySummaryWithNotify";
    KASClient.GET_SURVEY_URL_COMMAND = "getSurveyURL";
    KASClient.GET_RESPONSES_COMMAND = "getResponses";
    KASClient.GET_BATCH_RESPONSES_COMMAND = "getBatchResponses";
    KASClient.GET_LIKES_AND_COMMENTS_DATA_COMMAND = "getLikesAndCommentsData";
    KASClient.GET_ASSET_PATHS_COMMAND = "getAssetPaths";
    KASClient.GET_LOCALIZED_STRINGS_COMMAND = "getLocalizedStrings";
    KASClient.POPULATE_KASCLIENT_STRINGS = "populateKASClientStrings";
    KASClient.GET_POLL_STATUS_COMMAND = "getPollStatus";
    KASClient.GET_LOCATION_COMMAND = "getCurrentLocation";
    KASClient.GET_CURRENT_LOCATION_COMMAND = "getCurrentLocationV2";
    KASClient.GET_USER_DETAILS_COMMAND = "getUserDetails";
    KASClient.SHOW_USER_PROFILE = "showUserProfile";
    KASClient.START_CHAT_COMMAND = "startChat";
    KASClient.GET_CONVERSATION_NAME_COMMAND = "getConversationName";
    KASClient.GET_APP_INFO_COMMAND = "getAppInfo";
    KASClient.GET_ATTACHMENT_PATH_COMMAND = "getAttachmentPath";
    KASClient.SELECT_ASIGNEES_COMMAND = "selectAssignees";
    KASClient.CLOSE_CARD_COMMAND = "closeCard";
    KASClient.SHOW_ALERT_COMMAND = "showAlert";
    KASClient.CREATE_REQUEST_COMMAND = "createRequest";
    KASClient.CREATE_REQUEST_WITH_RESPONSES_COMMAND = "createRequestWithResponses";
    KASClient.UPDATE_RESPONSE_COMMAND = "updateResponse";
    KASClient.UPDATE_BATCH_RESPONSES_COMMAND = "updateBatchResponses";
    KASClient.SHOW_LIKES_AND_COMMENTS_PAGE_COMMAND = "showLikesAndCommentsPage";
    KASClient.SHOW_IMAGE_FULL_SCREEN_COMMAND = "showImageInFullScreen";
    KASClient.RESPOND_TO_SURVEY_COMMAND = "respondToSurvey";
    KASClient.SEND_REMINDER_COMMAND = "sendReminder";
    KASClient.FORWARD_SURVEY_COMMAND = "forwardSurvey";
    KASClient.ADD_LIKE_COMMAND = "addLike";
    KASClient.ADD_COMMENT_COMMAND = "addComment";
    KASClient.DISMISS_SCREEN_COMMAND = "dismissScreen";
    KASClient.SHOW_PROGRESS_BAR_COMMAND = "showProgressBar";
    KASClient.HIDE_PROGRESS_BAR_COMMAND = "hideProgressBar";
    KASClient.SEND_SURVEY_URL_COMMAND = "sendSurveyURL";
    KASClient.GET_CURRENT_USER_ID_COMMAND = "getCurrentUserId";
    KASClient.GET_MESSAGE_PROPERTIES_COMMAND = "getMessageProperties";
    KASClient.REASSIGN_JOB_COMMAND = "reassignJob";
    KASClient.SCREEN_CHANGED_COMMAND = "screenChanged";
    KASClient.LOG_ERROR_COMMAND = "logError";
    KASClient.GET_PACKAGE_PROPERTIES_COMMAND = "getPackageProperties";
    KASClient.GET_FORM_USER_CAPABILITIES = "getFormUserCapabilities";
    KASClient.GET_CLIENT_SUPPORTED_SDK_VERSION_COMMAND = "getClientSupportedSDKVersion";
    KASClient.OPEN_STORE_LINK_COMMAND = "openStoreLink";
    KASClient.UPDATE_SURVEY_METADATA = "updateSurveyMetadata";
    KASClient.GET_LOCALIZED_MINIAPP_STRINGS = "getLocalizedMiniAppStrings";
    KASClient.SHOULD_SEE_SURVEY_SUMMARY = "shouldSeeSurveySummary";
    KASClient.IS_SUBSCRIBER = "isSubscriber";
    KASClient.CAN_RESPOND_TO_SURVEY = "canRespondToSurvey";
    KASClient.IS_TALKBACK_ENABLED = "isTalkBackEnabled";
    KASClient.READ_TALKBACK_MESSAGE = "readTalkBackMessage";
    KASClient.LOG_TO_REPORT_COMMAND = "logToReport";
    KASClient.RECORD_EVENT_COMMAND = "recordEvent";
    KASClient.IS_CURRENT_USER_O365_SUBSCRIBED = "isCurrentUserO365Subscribed";
    KASClient.GET_O365_USER_DETAILS = "getO365UserDetails";
    KASClient.CREATE_MEETING_REQUEST = "createMeetingRequest";
    KASClient.GET_CONVERSATION_PARTICIPANTS_COUNT = "getConversationParticipantsCount";
    KASClient.SHOW_PLACE_PICKER = "showPlacePicker";
    KASClient.SHOW_DURATION_PICKER = "showDurationPicker";
    KASClient.EDIT_CARD_COMMAND = "editCard";
    KASClient.UPDATE_REQUEST_COMMAND = "updateRequest";
    KASClient.GET_INTEGERATION_SERVICE_TOKEN_COMMAND = "getIntegerationServiceToken";
    KASClient.GET_FONT_SIZE_MULTIPIER = "getFontSizeMultiplier";
    KASClient.SELECT_ATTACHMENTS_COMMAND = "selectAttachments";
    KASClient.DOWNLOAD_ATTACHMENT_COMMAND = "downloadAttachment";
    KASClient.IS_ATTACHMENT_DOWNLOADING = "isAttachmentDownloading";
    KASClient.CANCEL_ATTACHMENT_DOWNLOAD_COMMAND = "cancelAttachmentDownload";
    KASClient.OPEN_IMMERSIVE_VIEW_FOR_ATTACHMENT = "openImmersiveViewForAttachment";
    KASClient.GENERATE_THUMBNAIL_FOR_IMAGE_ATTACHMENT = "generateBase64ThumbnailForAttachment";
    KASClient.CHECK_STORAGE_ACCESS_FOR_ATTACHMENTS = "checkStorageAccessForAttachmentType";
    KASClient.GET_LOCAL_PROPERTIES = "getLocalActionProperties";
    KASClient.UPDATE_LOCAL_PROPERTIES = "updateLocalActionProperties";
    KASClient.GET_PACKAGE_CUSTOM_SETTINGS = "getPackageCustomSettings";
    KASClient.GET_PACKAGE_CUSTOM_PROPERTIES = "getPackageCustomProperties";
    KASClient.UPDATE_PACKAGE_CUSTOM_PROPERTIES = "updatePackageCustomProperties";
    KASClient.GET_DEVICE_ID_COMMAND = "getDeviceId";
    KASClient.GET_UUID = "generateUUID";
    KASClient.SEND_NOTIFICATION = "sendNotification";
    KASClient.CUSTOMIZE_NATIVE_TOOLBAR = "customizeNativeToolbar";
    KASClient.GET_CONVERSATION_TYPE_COMMAND = "getConversationType";
    KASClient.GET_CLIENT_DETAILS = "getClientDetails";
    KASClient.SHOW_LOCATION_MAP = "showLocationMap";
    KASClient.PERFORM_AUTHENTICATION = "performAuthentication";
    KASClient.IS_AUTHENTICATION_TYPE_SUPPORTED = "isAuthenticationTypeSupported";
    KASClient.OPEN_LINK_IN_BROWSER = "openLinkInBrowser";
    KASClient.CREATE_REQUEST_COMMAND_V2 = "createRequestV2";
    KASClient.PERFORM_SPEECH_TO_TEXT = "performSpeechToText";
    KASClient.SET_SECURED_VALUE = "setSecuredValue";
    KASClient.GET_SECURED_VALUE = "getSecuredValue";
    KASClient.PERFORM_HTTP_REQUEST = "performHTTPRequest";
    // Note: If you are adding new commands here, please increment
    // the supported SDK version in clients as well as add details
    // of that version in VersionUtil.ts
    ///////////////////////////////////////////////////////
    // A correlationId is required to distinguish between
    // two consequtive calls for the same command, 
    // cause just saving the callback for each call (before
    // calling the corresponding native method) can
    // override the callback of the previous one!
    var callbackForCorrelationId = JSON.parse("{}");
    function getCorrelationId() {
        // Assume date-time in millieseconds as a guid
        var id = "" + (new Date()).getTime();
        // Don't just assume, detect and resolve collision:
        // Check if that correlation id is already taken or not
        while (callbackForCorrelationId.hasOwnProperty(id)) {
            var randomNumber = Math.floor(Math.random() * 10000);
            id += randomNumber;
        }
        // Now we can say, we have a unique correlation id
        return id;
    }
    function getCorrelationIdForCallback(callback, internalSuccessCallbackName, internalErrorCallbackName) {
        if (internalSuccessCallbackName === void 0) { internalSuccessCallbackName = null; }
        if (internalErrorCallbackName === void 0) { internalErrorCallbackName = "onError"; }
        // Get a unique correlation id for this callback
        var correlationId = getCorrelationId();
        // Save the callback against that correlation id
        callbackForCorrelationId[correlationId] = callback;
        if (internalSuccessCallbackName) {
            // Create a new internal success callback against this correlation id
            KASClient[internalSuccessCallbackName + correlationId] = KASClient[internalSuccessCallbackName].bind(this, correlationId);
            // Update the internal success callback with correlation id
            internalSuccessCallbackName = "KASClient." + internalSuccessCallbackName + correlationId;
        }
        if (internalErrorCallbackName) {
            // Create a new internal error callback against correlation id
            KASClient[internalErrorCallbackName + correlationId] = KASClient[internalErrorCallbackName].bind(this, correlationId);
            // Update the internal error callback with correlation id
            internalErrorCallbackName = "KASClient." + internalErrorCallbackName + correlationId;
        }
        // Return the new correlation id, success, and error callbacks
        return JSON.parse(JSON.stringify({
            "correlationId": correlationId,
            "successCallback": internalSuccessCallbackName,
            "errorCallback": internalErrorCallbackName
        }));
    }
    function executeCallback(correlationId, args) {
        if (callbackForCorrelationId.hasOwnProperty(correlationId)) {
            // Get the callback associated with that correlation id
            var callback = callbackForCorrelationId[correlationId];
            // Now free that correlation slot ASAP
            delete callbackForCorrelationId[correlationId];
            // Call the callback with arguments
            if (callback) {
                callback.apply(this, args);
            }
        }
    }
    // By default we cannot sanitize all the HTML tags in
    // the results of all JS callbacks. Otherwise unwanted
    // issues may arrive. Like while getting the localized
    // strings for a MiniApp, all the HTML tags that we
    // put ourselves (like <b> to make strings bold) would
    // also be sanitized. We should only sanitize those
    // data which involves user input, like Survey/Response.
    var callbacksToSanitize = [];
    function sanitizeCallback(callbackId) {
        callbacksToSanitize.push(callbackId);
    }
    function shouldSanitizeCallback(callbackId) {
        if (callbacksToSanitize.indexOf(callbackId) >= 0) {
            return true;
        }
        return false;
    }
    ///////////////////////////////////////////////////////
    // All error callbacks are like this
    function onError(correlationId, errorCode) {
        convertErrorCodeToStringAsync(errorCode, function (errorString) {
            executeCallback(correlationId, [null, errorString]);
        });
    }
    KASClient.onError = onError;
    ///////////////////////////////////////////////////////
    // Internal success callback for JsonCallback type
    function onGetJson(correlationId, jsonString) {
        if (jsonString === void 0) { jsonString = null; }
        var json = null;
        if (jsonString != null) {
            if (shouldSanitizeCallback(correlationId)) {
                jsonString = KASClient.sanitizeHtmlTags(jsonString);
            }
            json = KASClient.parseJsonObject(jsonString);
        }
        executeCallback(correlationId, [json, null]);
    }
    KASClient.onGetJson = onGetJson;
    // Internal success callback for DoubleJsonCallback type
    function onGetDoubleJson(correlationId, jsonString1, jsonString2, error) {
        if (jsonString1 === void 0) { jsonString1 = null; }
        if (jsonString2 === void 0) { jsonString2 = null; }
        if (error === void 0) { error = null; }
        var json1 = null;
        if (jsonString1 != null) {
            if (shouldSanitizeCallback(correlationId)) {
                jsonString1 = KASClient.sanitizeHtmlTags(jsonString1);
            }
            json1 = KASClient.parseJsonObject(jsonString1);
        }
        var json2 = null;
        if (jsonString2 != null) {
            if (shouldSanitizeCallback(correlationId)) {
                jsonString2 = KASClient.sanitizeHtmlTags(jsonString2);
            }
            json2 = KASClient.parseJsonObject(jsonString2);
        }
        executeCallback(correlationId, [json1, json2, error]);
    }
    KASClient.onGetDoubleJson = onGetDoubleJson;
    // Internal success callback for StringCallback type
    function onGetString(correlationId, str) {
        if (str === void 0) { str = null; }
        if (shouldSanitizeCallback(correlationId)) {
            str = KASClient.sanitizeHtmlTags(str);
        }
        executeCallback(correlationId, [str, null]);
    }
    KASClient.onGetString = onGetString;
    // Internal success callback for BoolCallback type
    function onGetBool(correlationId, bool) {
        if (bool === void 0) { bool = false; }
        bool = JSON.parse("" + bool); // So that a non-boolean type gets converted to boolean
        executeCallback(correlationId, [bool, null]);
    }
    KASClient.onGetBool = onGetBool;
    ///////////////////////////////////////////////////////
    function getSurveyJson(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        sanitizeCallback(value["correlationId"]);
        KASClient.callNativeCommand(KASClient.GET_SURVEY_JSON_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getSurveyJson = getSurveyJson;
    ///////////////////////////////////////////////////////
    function getSurveySummaryJson(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        sanitizeCallback(value["correlationId"]);
        KASClient.callNativeCommand(KASClient.GET_SURVEY_SUMMARY_JSON_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getSurveySummaryJson = getSurveySummaryJson;
    ///////////////////////////////////////////////////////
    function getSurveyAggregatedSummaryJson(callback) {
        if (callback === void 0) { callback = null; }
        var value = getCorrelationIdForCallback(callback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_SURVEY_AGGREGATED_SUMMARY_JSON_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getSurveyAggregatedSummaryJson = getSurveyAggregatedSummaryJson;
    ///////////////////////////////////////////////////////
    function getSurveyResultJson(callback) {
        if (callback === void 0) { callback = null; }
        var value = getCorrelationIdForCallback(callback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_SURVEY_RESULT_JSON_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getSurveyResultJson = getSurveyResultJson;
    ///////////////////////////////////////////////////////
    function getSurveySummary(callback1, callback2) {
        if (callback1 === void 0) { callback1 = null; }
        if (callback2 === void 0) { callback2 = null; }
        var callback1Success = null;
        if (callback1) {
            var value1 = getCorrelationIdForCallback(callback1, "onGetDoubleJson", null);
            sanitizeCallback(value1["correlationId"]);
            callback1Success = value1["successCallback"];
        }
        var callback2Success = null;
        if (callback2) {
            var value2 = getCorrelationIdForCallback(callback2, "onGetDoubleJson", null);
            sanitizeCallback(value2["correlationId"]);
            callback2Success = value2["successCallback"];
        }
        KASClient.callNativeCommand(KASClient.GET_SURVEY_SUMMARY_WITH_NOTIFY_COMMAND, [callback1Success, callback2Success]);
    }
    KASClient.getSurveySummary = getSurveySummary;
    ///////////////////////////////////////////////////////
    function getSurveyURL(stringCallback) {
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_SURVEY_URL_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getSurveyURL = getSurveyURL;
    ///////////////////////////////////////////////////////
    function getSurveyLikesAndComments(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_LIKES_AND_COMMENTS_DATA_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getSurveyLikesAndComments = getSurveyLikesAndComments;
    ///////////////////////////////////////////////////////
    function getResponsesJson(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        sanitizeCallback(value["correlationId"]);
        KASClient.callNativeCommand(KASClient.GET_RESPONSES_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getResponsesJson = getResponsesJson;
    ///////////////////////////////////////////////////////
    function getBatchResponsesJson(offset, batchSize, jsonCallback) {
        if (offset === void 0) { offset = 0; }
        if (batchSize === void 0) { batchSize = 100; }
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        sanitizeCallback(value["correlationId"]);
        KASClient.callNativeCommand(KASClient.GET_BATCH_RESPONSES_COMMAND, [offset, batchSize], value["successCallback"], value["errorCallback"]);
    }
    KASClient.getBatchResponsesJson = getBatchResponsesJson;
    ///////////////////////////////////////////////////////
    function getAssetPathsJson(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_ASSET_PATHS_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getAssetPathsJson = getAssetPathsJson;
    ///////////////////////////////////////////////////////
    function getLocalizedStringsJson(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_LOCALIZED_STRINGS_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getLocalizedStringsJson = getLocalizedStringsJson;
    ///////////////////////////////////////////////////////
    function populateKASClientStrings(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.POPULATE_KASCLIENT_STRINGS, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.populateKASClientStrings = populateKASClientStrings;
    ///////////////////////////////////////////////////////
    function getPollStatus(boolCallback) {
        if (boolCallback === void 0) { boolCallback = null; }
        var value = getCorrelationIdForCallback(boolCallback, "onGetPollStatus");
        KASClient.callNativeCommand(KASClient.GET_POLL_STATUS_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getPollStatus = getPollStatus;
    // Special handling, so not using onGetBool
    function onGetPollStatus(correlationId, pollStatus) {
        if (pollStatus === void 0) { pollStatus = 0; }
        var pollActive = true;
        if (pollStatus != 0) {
            pollActive = false;
        }
        executeCallback(correlationId, [pollActive, null]);
    }
    KASClient.onGetPollStatus = onGetPollStatus;
    ///////////////////////////////////////////////////////
    function getLocation(stringCallback) {
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_LOCATION_COMMAND, [], value["successCallback"], value["errorCallback"]);
    }
    KASClient.getLocation = getLocation;
    ///////////////////////////////////////////////////////
    function getCurrentLocation(stringCallback) {
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_CURRENT_LOCATION_COMMAND, [], value["successCallback"], value["errorCallback"]);
    }
    KASClient.getCurrentLocation = getCurrentLocation;
    ///////////////////////////////////////////////////////
    function getAppInfo(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_APP_INFO_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getAppInfo = getAppInfo;
    ///////////////////////////////////////////////////////
    function getAppLocale(localeCallback) {
        if (localeCallback === void 0) { localeCallback = null; }
        getAppInfo(function (appInfo, error) {
            var locale = null;
            if (appInfo) {
                locale = appInfo["locale"];
            }
            if (localeCallback) {
                localeCallback(locale, error);
            }
        });
    }
    KASClient.getAppLocale = getAppLocale;
    ///////////////////////////////////////////////////////
    function getIs24HourTimeFormat(timeFormatCallback) {
        if (timeFormatCallback === void 0) { timeFormatCallback = null; }
        getAppInfo(function (appInfo, error) {
            var is24HourFormat = false;
            if (appInfo && appInfo.hasOwnProperty("is24HourFormat")) {
                is24HourFormat = appInfo["is24HourFormat"];
            }
            if (timeFormatCallback) {
                timeFormatCallback(is24HourFormat, error);
            }
        });
    }
    KASClient.getIs24HourTimeFormat = getIs24HourTimeFormat;
    ///////////////////////////////////////////////////////
    function getUserDetails(userIds, jsonCallback) {
        if (userIds === void 0) { userIds = []; }
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_USER_DETAILS_COMMAND, userIds, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getUserDetails = getUserDetails;
    ///////////////////////////////////////////////////////
    function showUserProfilePage(userId, isMiniProfile, boolCallback) {
        if (userId === void 0) { userId = ""; }
        if (isMiniProfile === void 0) { isMiniProfile = true; }
        if (boolCallback === void 0) { boolCallback = null; }
        var value = getCorrelationIdForCallback(boolCallback, "onGetBool");
        KASClient.callNativeCommand(KASClient.SHOW_USER_PROFILE, [userId, isMiniProfile], value["successCallback"], value["errorCallback"]);
    }
    KASClient.showUserProfilePage = showUserProfilePage;
    ///////////////////////////////////////////////////////
    function startChat(userId, boolCallback) {
        if (userId === void 0) { userId = ""; }
        if (boolCallback === void 0) { boolCallback = null; }
        var value = getCorrelationIdForCallback(boolCallback, "onGetBool");
        KASClient.callNativeCommand(KASClient.START_CHAT_COMMAND, [userId], value["successCallback"], value["errorCallback"]);
    }
    KASClient.startChat = startChat;
    ///////////////////////////////////////////////////////
    function getIntegerationServiceToken(stringCallback) {
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_INTEGERATION_SERVICE_TOKEN_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getIntegerationServiceToken = getIntegerationServiceToken;
    ///////////////////////////////////////////////////////
    function performSpeechToText(stringCallback) {
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.PERFORM_SPEECH_TO_TEXT, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.performSpeechToText = performSpeechToText;
    ///////////////////////////////////////////////////////
    function setSecuredValue(key, value) {
        if (key === void 0) { key = ""; }
        if (value === void 0) { value = ""; }
        KASClient.callNativeCommand(KASClient.SET_SECURED_VALUE, [key, value]);
    }
    KASClient.setSecuredValue = setSecuredValue;
    ///////////////////////////////////////////////////////
    function getSecuredValue(key, stringCallback) {
        if (key === void 0) { key = ""; }
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_SECURED_VALUE, [key], value["successCallback"], value["errorCallback"]);
    }
    KASClient.getSecuredValue = getSecuredValue;
    ///////////////////////////////////////////////////////
    function getDeviceId(stringCallback) {
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_DEVICE_ID_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getDeviceId = getDeviceId;
    ///////////////////////////////////////////////////////
    function getConversationName(stringCallback) {
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_CONVERSATION_NAME_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getConversationName = getConversationName;
    ///////////////////////////////////////////////////////
    function getConversationType(stringCallback) {
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_CONVERSATION_TYPE_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getConversationType = getConversationType;
    ///////////////////////////////////////////////////////
    function getSelectedUsers(args, jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.SELECT_ASIGNEES_COMMAND, args, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getSelectedUsers = getSelectedUsers;
    ///////////////////////////////////////////////////////
    function getAttachmentPath(stringCallback) {
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_ATTACHMENT_PATH_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getAttachmentPath = getAttachmentPath;
    ///////////////////////////////////////////////////////
    function getAttachmentPaths(args, jsonCallback) {
        if (args === void 0) { args = []; }
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.SELECT_ATTACHMENTS_COMMAND, args, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getAttachmentPaths = getAttachmentPaths;
    ///////////////////////////////////////////////////////
    function downloadAttachment(attachment, jsonCallback) {
        if (attachment === void 0) { attachment = null; }
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.DOWNLOAD_ATTACHMENT_COMMAND, [attachment], value["successCallback"], value["errorCallback"]);
    }
    KASClient.downloadAttachment = downloadAttachment;
    ///////////////////////////////////////////////////////
    function isAttachmentDownloading(attachment, boolCallback) {
        if (attachment === void 0) { attachment = null; }
        if (boolCallback === void 0) { boolCallback = null; }
        var value = getCorrelationIdForCallback(boolCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.IS_ATTACHMENT_DOWNLOADING, [attachment], value["successCallback"], value["errorCallback"]);
    }
    KASClient.isAttachmentDownloading = isAttachmentDownloading;
    ///////////////////////////////////////////////////////
    function cancelAttachmentDownload(attachment, stringCallback) {
        if (attachment === void 0) { attachment = null; }
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.CANCEL_ATTACHMENT_DOWNLOAD_COMMAND, [attachment], value["successCallback"], value["errorCallback"]);
    }
    KASClient.cancelAttachmentDownload = cancelAttachmentDownload;
    ///////////////////////////////////////////////////////
    function showPlacePicker(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.SHOW_PLACE_PICKER, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.showPlacePicker = showPlacePicker;
    ///////////////////////////////////////////////////////
    function showDurationPicker(defaultDurationInMinutes, stringCallback) {
        if (defaultDurationInMinutes === void 0) { defaultDurationInMinutes = 0; }
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.SHOW_DURATION_PICKER, [defaultDurationInMinutes], value["successCallback"], value["errorCallback"]);
    }
    KASClient.showDurationPicker = showDurationPicker;
    ///////////////////////////////////////////////////////
    function getCurrentUserId(stringCallback, bypassVersionChecking) {
        if (stringCallback === void 0) { stringCallback = null; }
        if (bypassVersionChecking === void 0) { bypassVersionChecking = false; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_CURRENT_USER_ID_COMMAND, null, value["successCallback"], value["errorCallback"], bypassVersionChecking);
    }
    KASClient.getCurrentUserId = getCurrentUserId;
    ///////////////////////////////////////////////////////
    function getMessageProperties(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_MESSAGE_PROPERTIES_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getMessageProperties = getMessageProperties;
    ///////////////////////////////////////////////////////
    function reassignJob(callback) {
        if (callback === void 0) { callback = null; }
        var value = getCorrelationIdForCallback(callback, "onGetString", null);
        KASClient.callNativeCommand(KASClient.REASSIGN_JOB_COMMAND, null, value["successCallback"], null);
    }
    KASClient.reassignJob = reassignJob;
    ///////////////////////////////////////////////////////
    function sendResponse(responseJson, responseId, isEditable, showInChatCanvas, isAnonymous, shouldDismiss) {
        if (responseJson === void 0) { responseJson = null; }
        if (responseId === void 0) { responseId = null; }
        if (isEditable === void 0) { isEditable = false; }
        if (showInChatCanvas === void 0) { showInChatCanvas = false; }
        if (isAnonymous === void 0) { isAnonymous = false; }
        if (shouldDismiss === void 0) { shouldDismiss = true; }
        KASClient.callNativeCommand(KASClient.UPDATE_RESPONSE_COMMAND, [responseJson, responseId, isEditable, showInChatCanvas, isAnonymous, shouldDismiss]);
    }
    KASClient.sendResponse = sendResponse;
    ///////////////////////////////////////////////////////
    function sendBatchResponse(responseJson, showInChatCanvas, isAnonymous, shouldDismiss) {
        if (responseJson === void 0) { responseJson = null; }
        if (showInChatCanvas === void 0) { showInChatCanvas = false; }
        if (isAnonymous === void 0) { isAnonymous = false; }
        if (shouldDismiss === void 0) { shouldDismiss = true; }
        KASClient.callNativeCommand(KASClient.UPDATE_BATCH_RESPONSES_COMMAND, [responseJson, showInChatCanvas, isAnonymous, shouldDismiss]);
    }
    KASClient.sendBatchResponse = sendBatchResponse;
    ///////////////////////////////////////////////////////
    function createRequest(surveyJson, payload, shouldInflate, shouldDismiss) {
        if (surveyJson === void 0) { surveyJson = null; }
        if (payload === void 0) { payload = null; }
        if (shouldInflate === void 0) { shouldInflate = false; }
        if (shouldDismiss === void 0) { shouldDismiss = true; }
        KASClient.callNativeCommand(KASClient.CREATE_REQUEST_COMMAND, [JSON.stringify(surveyJson), payload, shouldInflate, shouldDismiss]);
    }
    KASClient.createRequest = createRequest;
    ///////////////////////////////////////////////////////
    function createRequestWithResponses(surveyJson, responses, shouldDismiss, isResponseAnonymous, shouldSendToSubscribers) {
        if (surveyJson === void 0) { surveyJson = null; }
        if (responses === void 0) { responses = null; }
        if (shouldDismiss === void 0) { shouldDismiss = true; }
        if (isResponseAnonymous === void 0) { isResponseAnonymous = false; }
        if (shouldSendToSubscribers === void 0) { shouldSendToSubscribers = true; }
        KASClient.callNativeCommand(KASClient.CREATE_REQUEST_WITH_RESPONSES_COMMAND, [JSON.stringify(surveyJson), responses, shouldDismiss, isResponseAnonymous, shouldSendToSubscribers]);
    }
    KASClient.createRequestWithResponses = createRequestWithResponses;
    //////////////////////////////////////////////////////
    function createRequestV2(surveyJson, shouldDismiss, shouldSendToSubscribers) {
        if (surveyJson === void 0) { surveyJson = null; }
        if (shouldDismiss === void 0) { shouldDismiss = true; }
        if (shouldSendToSubscribers === void 0) { shouldSendToSubscribers = true; }
        KASClient.callNativeCommand(KASClient.CREATE_REQUEST_COMMAND_V2, [JSON.stringify(surveyJson), shouldDismiss, shouldSendToSubscribers]);
    }
    KASClient.createRequestV2 = createRequestV2;
    ///////////////////////////////////////////////////////
    function updateRequest(fields, payload, shouldInflate, boolCallback) {
        if (fields === void 0) { fields = null; }
        if (payload === void 0) { payload = null; }
        if (shouldInflate === void 0) { shouldInflate = false; }
        if (boolCallback === void 0) { boolCallback = null; }
        var value = getCorrelationIdForCallback(boolCallback, "onGetBool");
        KASClient.callNativeCommand(KASClient.UPDATE_REQUEST_COMMAND, [fields], value["successCallback"], value["errorCallback"]);
    }
    KASClient.updateRequest = updateRequest;
    ///////////////////////////////////////////////////////
    function showAlert(message) {
        if (message === void 0) { message = null; }
        KASClient.callNativeCommand(KASClient.SHOW_ALERT_COMMAND, [message]);
    }
    KASClient.showAlert = showAlert;
    ///////////////////////////////////////////////////////
    function customizeNativeToolbar(properties) {
        if (properties === void 0) { properties = null; }
        KASClient.callNativeCommand(KASClient.CUSTOMIZE_NATIVE_TOOLBAR, [properties]);
    }
    KASClient.customizeNativeToolbar = customizeNativeToolbar;
    ///////////////////////////////////////////////////////
    function closeCard() {
        KASClient.callNativeCommand(KASClient.CLOSE_CARD_COMMAND);
    }
    KASClient.closeCard = closeCard;
    ///////////////////////////////////////////////////////
    function editCard() {
        KASClient.callNativeCommand(KASClient.EDIT_CARD_COMMAND);
    }
    KASClient.editCard = editCard;
    ///////////////////////////////////////////////////////
    function showLikesAndCommentsPage(showComments) {
        if (showComments === void 0) { showComments = true; }
        KASClient.callNativeCommand(KASClient.SHOW_LIKES_AND_COMMENTS_PAGE_COMMAND, [showComments]);
    }
    KASClient.showLikesAndCommentsPage = showLikesAndCommentsPage;
    ///////////////////////////////////////////////////////
    function showImageInFullScreen(urls, currentImageIndex) {
        if (urls === void 0) { urls = []; }
        if (currentImageIndex === void 0) { currentImageIndex = 0; }
        KASClient.callNativeCommand(KASClient.SHOW_IMAGE_FULL_SCREEN_COMMAND, [urls, currentImageIndex]);
    }
    KASClient.showImageInFullScreen = showImageInFullScreen;
    ///////////////////////////////////////////////////////
    function openImmersiveViewForAttachment(attachmentObj) {
        if (attachmentObj === void 0) { attachmentObj = null; }
        KASClient.callNativeCommand(KASClient.OPEN_IMMERSIVE_VIEW_FOR_ATTACHMENT, [attachmentObj]);
    }
    KASClient.openImmersiveViewForAttachment = openImmersiveViewForAttachment;
    ///////////////////////////////////////////////////////
    function openHttpLinkInBrowser(urlStr) {
        if (urlStr === void 0) { urlStr = null; }
        KASClient.callNativeCommand(KASClient.OPEN_LINK_IN_BROWSER, [urlStr]);
    }
    KASClient.openHttpLinkInBrowser = openHttpLinkInBrowser;
    ///////////////////////////////////////////////////////
    function hasStorageAccessForType(type, boolCallback) {
        if (type === void 0) { type = KASClient.KASAttachmentType.Image; }
        if (boolCallback === void 0) { boolCallback = null; }
        var value = getCorrelationIdForCallback(boolCallback, "onGetBool");
        KASClient.callNativeCommand(KASClient.CHECK_STORAGE_ACCESS_FOR_ATTACHMENTS, [type], value["successCallback"], value["errorCallback"]);
    }
    KASClient.hasStorageAccessForType = hasStorageAccessForType;
    ///////////////////////////////////////////////////////
    function generateBase64ThumbnailForAttachment(localPath, stringCallback) {
        if (localPath === void 0) { localPath = null; }
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GENERATE_THUMBNAIL_FOR_IMAGE_ATTACHMENT, [localPath], value["successCallback"], value["errorCallback"]);
    }
    KASClient.generateBase64ThumbnailForAttachment = generateBase64ThumbnailForAttachment;
    ///////////////////////////////////////////////////////
    function getFontSizeMultiplier(stringCallback) {
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_FONT_SIZE_MULTIPIER, null, value["successCallback"], value["successCallback"]);
    }
    KASClient.getFontSizeMultiplier = getFontSizeMultiplier;
    ///////////////////////////////////////////////////////
    function respondToSurvey() {
        KASClient.callNativeCommand(KASClient.RESPOND_TO_SURVEY_COMMAND);
    }
    KASClient.respondToSurvey = respondToSurvey;
    ///////////////////////////////////////////////////////
    function sendReminder() {
        KASClient.callNativeCommand(KASClient.SEND_REMINDER_COMMAND);
    }
    KASClient.sendReminder = sendReminder;
    ///////////////////////////////////////////////////////
    function forwardSurvey() {
        KASClient.callNativeCommand(KASClient.FORWARD_SURVEY_COMMAND);
    }
    KASClient.forwardSurvey = forwardSurvey;
    ///////////////////////////////////////////////////////
    function likeSurvey() {
        KASClient.callNativeCommand(KASClient.ADD_LIKE_COMMAND);
    }
    KASClient.likeSurvey = likeSurvey;
    ///////////////////////////////////////////////////////
    function addCommentOnSurvey(comment) {
        if (comment === void 0) { comment = null; }
        KASClient.callNativeCommand(KASClient.ADD_COMMENT_COMMAND, [comment]);
    }
    KASClient.addCommentOnSurvey = addCommentOnSurvey;
    ///////////////////////////////////////////////////////
    function dismissScreen() {
        KASClient.callNativeCommand(KASClient.DISMISS_SCREEN_COMMAND);
    }
    KASClient.dismissScreen = dismissScreen;
    ///////////////////////////////////////////////////////
    function showProgress(text) {
        if (text === void 0) { text = null; }
        KASClient.callNativeCommand(KASClient.SHOW_PROGRESS_BAR_COMMAND, [text]);
    }
    KASClient.showProgress = showProgress;
    ///////////////////////////////////////////////////////
    function hideProgress() {
        KASClient.callNativeCommand(KASClient.HIDE_PROGRESS_BAR_COMMAND);
    }
    KASClient.hideProgress = hideProgress;
    ///////////////////////////////////////////////////////
    function shareSurveyURL(url) {
        if (url === void 0) { url = null; }
        KASClient.callNativeCommand(KASClient.SEND_SURVEY_URL_COMMAND, [url]);
    }
    KASClient.shareSurveyURL = shareSurveyURL;
    ///////////////////////////////////////////////////////
    function logErrorNative(error) {
        if (error === void 0) { error = null; }
        KASClient.callNativeCommand(KASClient.LOG_ERROR_COMMAND, [error]);
    }
    KASClient.logErrorNative = logErrorNative;
    ///////////////////////////////////////////////////////////
    function getPackageProperties(jsonCallback, bypassVersionChecking) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        if (bypassVersionChecking === void 0) { bypassVersionChecking = false; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_PACKAGE_PROPERTIES_COMMAND, null, value["successCallback"], value["errorCallback"], bypassVersionChecking);
    }
    KASClient.getPackageProperties = getPackageProperties;
    ///////////////////////////////////////////////////////////
    function getFormUserCapabilities(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_FORM_USER_CAPABILITIES, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getFormUserCapabilities = getFormUserCapabilities;
    ///////////////////////////////////////////////////////////
    function getClientSupportedSDKVersion(stringCallback, bypassVersionChecking) {
        if (stringCallback === void 0) { stringCallback = null; }
        if (bypassVersionChecking === void 0) { bypassVersionChecking = false; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_CLIENT_SUPPORTED_SDK_VERSION_COMMAND, null, value["successCallback"], value["errorCallback"], bypassVersionChecking);
    }
    KASClient.getClientSupportedSDKVersion = getClientSupportedSDKVersion;
    ///////////////////////////////////////////////////////
    function openStoreLink() {
        KASClient.callNativeCommand(KASClient.OPEN_STORE_LINK_COMMAND);
    }
    KASClient.openStoreLink = openStoreLink;
    ///////////////////////////////////////////////////////////
    function updateSurveyMetadata(args, boolCallback) {
        if (args === void 0) { args = []; }
        if (boolCallback === void 0) { boolCallback = null; }
        var value = getCorrelationIdForCallback(boolCallback, "onGetBool");
        KASClient.callNativeCommand(KASClient.UPDATE_SURVEY_METADATA, args, value["successCallback"], value["errorCallback"]);
    }
    KASClient.updateSurveyMetadata = updateSurveyMetadata;
    ///////////////////////////////////////////////////////////
    function getLocalizedMiniAppStrings(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_LOCALIZED_MINIAPP_STRINGS, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getLocalizedMiniAppStrings = getLocalizedMiniAppStrings;
    ///////////////////////////////////////////////////////////
    function getPackageCustomSettings(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_PACKAGE_CUSTOM_SETTINGS, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getPackageCustomSettings = getPackageCustomSettings;
    ///////////////////////////////////////////////////////////
    function generateUUID(stringCallback) {
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_UUID, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.generateUUID = generateUUID;
    ///////////////////////////////////////////////////////////
    function shouldSeeSurveySummary(boolCallback) {
        if (boolCallback === void 0) { boolCallback = null; }
        var value = getCorrelationIdForCallback(boolCallback, "onGetBool");
        KASClient.callNativeCommand(KASClient.SHOULD_SEE_SURVEY_SUMMARY, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.shouldSeeSurveySummary = shouldSeeSurveySummary;
    ///////////////////////////////////////////////////////////
    function isSubscriber(boolCallback) {
        if (boolCallback === void 0) { boolCallback = null; }
        var value = getCorrelationIdForCallback(boolCallback, "onGetBool");
        KASClient.callNativeCommand(KASClient.IS_SUBSCRIBER, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.isSubscriber = isSubscriber;
    ///////////////////////////////////////////////////////////
    function canRespondToSurvey(boolCallback) {
        if (boolCallback === void 0) { boolCallback = null; }
        var value = getCorrelationIdForCallback(boolCallback, "onGetBool");
        KASClient.callNativeCommand(KASClient.CAN_RESPOND_TO_SURVEY, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.canRespondToSurvey = canRespondToSurvey;
    ///////////////////////////////////////////////////////
    function isTalkBackEnabled(boolCallback) {
        if (boolCallback === void 0) { boolCallback = null; }
        var value = getCorrelationIdForCallback(boolCallback, "onGetBool");
        KASClient.callNativeCommand(KASClient.IS_TALKBACK_ENABLED, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.isTalkBackEnabled = isTalkBackEnabled;
    ///////////////////////////////////////////////////////
    function readTalkBackMessageNative(message) {
        if (message === void 0) { message = null; }
        KASClient.callNativeCommand(KASClient.READ_TALKBACK_MESSAGE, [message]);
    }
    KASClient.readTalkBackMessageNative = readTalkBackMessageNative;
    ///////////////////////////////////////////////////////
    function recordEventNative(eventName, eventType, props) {
        if (eventName === void 0) { eventName = ""; }
        if (eventType === void 0) { eventType = ""; }
        if (props === void 0) { props = JSON.parse("{}"); }
        KASClient.callNativeCommand(KASClient.RECORD_EVENT_COMMAND, [eventName, eventType, JSON.stringify(props)]);
    }
    KASClient.recordEventNative = recordEventNative;
    ///////////////////////////////////////////////////////
    function logToReportNative(data) {
        if (data === void 0) { data = null; }
        KASClient.callNativeCommand(KASClient.LOG_TO_REPORT_COMMAND, [data]);
    }
    KASClient.logToReportNative = logToReportNative;
    ///////////////////////////////////////////////////////
    function isCurrentUserO365Subscribed(boolCallback) {
        if (boolCallback === void 0) { boolCallback = null; }
        var value = getCorrelationIdForCallback(boolCallback, "onGetBool");
        KASClient.callNativeCommand(KASClient.IS_CURRENT_USER_O365_SUBSCRIBED, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.isCurrentUserO365Subscribed = isCurrentUserO365Subscribed;
    ///////////////////////////////////////////////////////////
    function getO365UserDetails(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_O365_USER_DETAILS, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getO365UserDetails = getO365UserDetails;
    ///////////////////////////////////////////////////////
    function getConversationParticipantsCount(stringCallback) {
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_CONVERSATION_PARTICIPANTS_COUNT, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getConversationParticipantsCount = getConversationParticipantsCount;
    ///////////////////////////////////////////////////////////
    function getLocalProperties(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_LOCAL_PROPERTIES, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getLocalProperties = getLocalProperties;
    ///////////////////////////////////////////////////////////
    function updateLocalProperties(properties, boolCallback) {
        if (properties === void 0) { properties = null; }
        if (boolCallback === void 0) { boolCallback = null; }
        var value = getCorrelationIdForCallback(boolCallback, "onGetBool");
        KASClient.callNativeCommand(KASClient.UPDATE_LOCAL_PROPERTIES, [JSON.stringify(properties)], value["successCallback"], value["errorCallback"]);
    }
    KASClient.updateLocalProperties = updateLocalProperties;
    ///////////////////////////////////////////////////////////
    function getPackageCustomProperties(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_PACKAGE_CUSTOM_PROPERTIES, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getPackageCustomProperties = getPackageCustomProperties;
    ///////////////////////////////////////////////////////////
    function updatePackageCustomProperties(properties, boolCallback) {
        if (properties === void 0) { properties = null; }
        if (boolCallback === void 0) { boolCallback = null; }
        var value = getCorrelationIdForCallback(boolCallback, "onGetBool");
        KASClient.callNativeCommand(KASClient.UPDATE_PACKAGE_CUSTOM_PROPERTIES, [JSON.stringify(properties)], value["successCallback"], value["errorCallback"]);
    }
    KASClient.updatePackageCustomProperties = updatePackageCustomProperties;
    ///////////////////////////////////////////////////////////
    function sendNotification(customNotificationMessage, boolCallback) {
        if (boolCallback === void 0) { boolCallback = null; }
        var value = getCorrelationIdForCallback(boolCallback, "onGetBool");
        KASClient.callNativeCommand(KASClient.SEND_NOTIFICATION, [customNotificationMessage], value["successCallback"], value["errorCallback"]);
    }
    KASClient.sendNotification = sendNotification;
    ///////////////////////////////////////////////////////////
    function getClientDetails(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_CLIENT_DETAILS, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getClientDetails = getClientDetails;
    ///////////////////////////////////////////////////////////
    function showLocationMap(locationJSON) {
        KASClient.callNativeCommand(KASClient.SHOW_LOCATION_MAP, [locationJSON]);
    }
    KASClient.showLocationMap = showLocationMap;
    ///////////////////////////////////////////////////////////
    function performAuthentication(authenticationType, boolCallback) {
        if (boolCallback === void 0) { boolCallback = null; }
        var value = getCorrelationIdForCallback(boolCallback, "onGetBool");
        KASClient.callNativeCommand(KASClient.PERFORM_AUTHENTICATION, [authenticationType], value["successCallback"], value["errorCallback"]);
    }
    KASClient.performAuthentication = performAuthentication;
    ///////////////////////////////////////////////////////////
    function isAuthenticationTypeSupported(authenticationType, jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetBool");
        KASClient.callNativeCommand(KASClient.IS_AUTHENTICATION_TYPE_SUPPORTED, [authenticationType], value["successCallback"], value["errorCallback"]);
    }
    KASClient.isAuthenticationTypeSupported = isAuthenticationTypeSupported;
    ///////////////////////////////////////////////////////////
    function performHTTPRequestNative(url, parameters, callback) {
        if (parameters === void 0) { parameters = "{}"; }
        var value = getCorrelationIdForCallback(callback, "onGetString");
        KASClient.callNativeCommand(KASClient.PERFORM_HTTP_REQUEST, [url, parameters], value["successCallback"], value["errorCallback"]);
    }
    KASClient.performHTTPRequestNative = performHTTPRequestNative;
    ///////////////////////////////////////////////////////////
    var currentLocale = null;
    function convertErrorCodeToStringAsync(errorCode, callback) {
        // A block to avoid repetitive code
        var errorBlock = function (errorCode) {
            if (callback) {
                var errorString = getErrorString(errorCode);
                callback(errorString);
            }
        };
        // If locale is not there, fetch it first
        if (currentLocale == null) {
            getAppLocale(function (locale, error) {
                if (error == null) {
                    currentLocale = locale;
                }
                else {
                    currentLocale = "en"; // Default locale
                }
                errorBlock(errorCode);
            });
        }
        else {
            errorBlock(errorCode);
        }
    }
    function getErrorString(errorCode) {
        var locale = currentLocale;
        // Check if we support that language or not
        if (!locale || !errorStrings.hasOwnProperty(locale)) {
            locale = "en";
        }
        if (errorStrings[locale].hasOwnProperty(errorCode)) {
            return errorStrings[locale][errorCode];
        }
        return errorCode;
    }
    var errorStrings = {
        "en": {
            // 100, Network Errors
            "100": "We could not fetch the results due to network error. Please try again later",
            // 200, Internal JSON Parsing Error/ Execution Exception Error
            "200": "Something went wrong, Please try again.",
            // 300, Unknown Error
            "300": "Unknown Error",
            // 400: An invalid operation
            "400": "Wrong Operation",
            // 429: Request failed due to rate limiting. Too many requests.
            "429": "Too many requests in short time. Please try again after some time."
        },
        "hi": {
            "100": "We could not fetch the results due to network error. Please try again later",
            "200": "Something went wrong, Please try again",
            "300": "Unknown Error",
            "400": "Wrong Operation",
            // 429: Request failed due to rate limiting. Too many requests.
            "429": "Too many requests in short time. Please try again after some time."
        },
        "te": {
            "100": "We could not fetch the results due to network error. Please try again later",
            "200": "Something went wrong, please try again",
            "300": "Unknown Error",
            "400": "Wrong Operation",
            // 429: Request failed due to rate limiting. Too many requests.
            "429": "Too many requests in short time. Please try again after some time."
        }
    };
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    function callNativeCommand(command, args, successCallback, errorCallback, bypassVersionChecking) {
        if (args === void 0) { args = null; }
        if (successCallback === void 0) { successCallback = null; }
        if (errorCallback === void 0) { errorCallback = null; }
        if (bypassVersionChecking === void 0) { bypassVersionChecking = false; }
        // Special case to avoid recursion
        if (bypassVersionChecking) {
            callNative(command, args, successCallback, errorCallback);
            return;
        }
        KASClient.Version.commandIsCompatible(command, function (compatible) {
            if (compatible) {
                callNative(command, args, successCallback, errorCallback);
            }
            else if (!__NO_HTML__) {
                KASClient.showIncompatibleScreen();
            }
            else {
                throw "VersionIncompatible";
            }
        });
    }
    KASClient.callNativeCommand = callNativeCommand;
    function callNative(command, args, successCallback, errorCallback) {
        if (args === void 0) { args = null; }
        if (successCallback === void 0) { successCallback = null; }
        if (errorCallback === void 0) { errorCallback = null; }
        if (KASClient.getPlatform() == KASClient.Platform.iOS) {
            KASClient.iOS.callNativeCommand(command, args, successCallback, errorCallback);
        }
        else if (KASClient.getPlatform() == KASClient.Platform.Android) {
            KASClient.Android.callNativeCommand(command, args, successCallback, errorCallback);
        }
        else if (KASClient.getPlatform() == KASClient.Platform.WindowsPhone ||
            KASClient.getPlatform() == KASClient.Platform.WindowsImmersive) {
            KASClient.UWP.callNativeCommand(command, args, successCallback, errorCallback);
        }
        else if (KASClient.isRenderedForActionDesigner()) {
            KASClient.ActionDesigner.callNativeCommand(command, args, successCallback, errorCallback);
        }
        else if (KASClient.isRenderedForWebClient()) {
            KASClient.WebClient.callNativeCommand(command, args, successCallback, errorCallback);
        }
        else if (KASClient.isRenderedForWebApp()) {
            KASClient.WebApp.callNativeCommand(command, args, successCallback, errorCallback);
        }
        else {
            if (!KASClient.shouldMockData()) {
                console.assert(false, "Unknwon platform");
            }
        }
    }
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var iOS;
    (function (iOS) {
        var WebView;
        (function (WebView) {
            WebView[WebView["Unknown"] = 0] = "Unknown";
            WebView[WebView["UIWebView"] = 1] = "UIWebView";
            WebView[WebView["WKWebView"] = 2] = "WKWebView";
        })(WebView = iOS.WebView || (iOS.WebView = {}));
        var webViewToUse = WebView.Unknown;
        function getWebview() {
            var webview = WebView.Unknown;
            var lte9 = /constructor/i.test(window.HTMLElement);
            var idb = !!window.indexedDB;
            var nav = window.navigator;
            var ua = nav.userAgent;
            if (ua.indexOf('Safari') !== -1 && ua.indexOf('Version') !== -1 && !nav.standalone) {
                webview = WebView.WKWebView;
            }
            else if ((!idb && lte9) || !window.statusbar.visible) {
                webview = WebView.UIWebView;
            }
            else if ((window.webkit && window.webkit.messageHandlers) || !lte9 || idb) {
                webview = WebView.WKWebView;
            }
            return webview;
        }
        iOS.getWebview = getWebview;
        function callNativeCommand(command, args, successCallback, errorCallback) {
            if (args === void 0) { args = null; }
            if (successCallback === void 0) { successCallback = null; }
            if (errorCallback === void 0) { errorCallback = null; }
            var callInfo = {
                functionname: command,
                args: args,
                success: successCallback,
                error: errorCallback
            };
            if (webViewToUse == WebView.Unknown)
                webViewToUse = getWebview();
            if (webViewToUse == WebView.WKWebView) {
                callMethodForWKWebView(callInfo);
            }
            else {
                callMethodForUIWebView(callInfo);
            }
        }
        iOS.callNativeCommand = callNativeCommand;
        // Calling WKWebView's user script
        function callMethodForWKWebView(callInfo) {
            window.webkit.messageHandlers.callNative.postMessage(callInfo);
        }
        // Changing window.location, for UIWebView
        function callMethodForUIWebView(callInfo) {
            var url = "surveyjs2objc://";
            url += rfc3986EncodeURIComponent(JSON.stringify(callInfo));
            // Below approach of changing window's location is in case of
            // multiple consecutive requests, these can nullify each other!!!
            // window.location.href = url;
            // So we'll use the iframe approach, so no two calls can overlap
            var iframe = document.createElement("IFRAME");
            iframe.setAttribute("src", url);
            document.documentElement.appendChild(iframe);
            iframe.parentNode.removeChild(iframe);
            iframe = null;
        }
        // encodeURIComponent escapes all characters except: -_.!~*'()
        // But iOS follows RFC3986 encoding which supports these characters.
        // So taking extra care for them!
        function rfc3986EncodeURIComponent(str) {
            return encodeURIComponent(str).replace(/[-_.!~*'()]/g, function (c) {
                return '%' + c.charCodeAt(0).toString(16);
            });
        }
    })(iOS = KASClient.iOS || (KASClient.iOS = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var UWP;
    (function (UWP) {
        function callNativeCommand(command, args, successCallback, errorCallback) {
            if (args === void 0) { args = null; }
            if (successCallback === void 0) { successCallback = null; }
            if (errorCallback === void 0) { errorCallback = null; }
            if (KASClient.Version.clientSupports(KASClient.Version.VERSION_3_1, true /* considerMinorVersion */)) {
                callNativeCommandAsync(command, args, successCallback, errorCallback);
            }
            else {
                callNativeCommandSync(command, args, successCallback, errorCallback);
            }
        }
        UWP.callNativeCommand = callNativeCommand;
        function callNativeCommandAsync(command, args, successCallback, errorCallback) {
            if (args === void 0) { args = null; }
            if (successCallback === void 0) { successCallback = null; }
            if (errorCallback === void 0) { errorCallback = null; }
            switch (command) {
                case KASClient.GET_CLIENT_SUPPORTED_SDK_VERSION_COMMAND:
                case KASClient.OPEN_STORE_LINK_COMMAND:
                case KASClient.SHOW_ALERT_COMMAND:
                case KASClient.UPDATE_RESPONSE_COMMAND:
                case KASClient.CREATE_REQUEST_COMMAND:
                case KASClient.CLOSE_CARD_COMMAND:
                case KASClient.SHOW_LIKES_AND_COMMENTS_PAGE_COMMAND:
                case KASClient.RESPOND_TO_SURVEY_COMMAND:
                case KASClient.SEND_REMINDER_COMMAND:
                case KASClient.FORWARD_SURVEY_COMMAND:
                case KASClient.ADD_LIKE_COMMAND:
                case KASClient.DISMISS_SCREEN_COMMAND:
                case KASClient.SHOW_PROGRESS_BAR_COMMAND:
                case KASClient.HIDE_PROGRESS_BAR_COMMAND:
                case KASClient.SEND_SURVEY_URL_COMMAND:
                case KASClient.SCREEN_CHANGED_COMMAND:
                case KASClient.LOG_ERROR_COMMAND:
                    // For these commands, we don't need an Async API
                    callNativeCommandSync(command, args, successCallback, errorCallback);
                    break;
                case KASClient.GET_SURVEY_JSON_COMMAND:
                    KaizalaPlatform.getValueAsync(successCallback, errorCallback, "surveyJson");
                    return;
                case KASClient.GET_SURVEY_SUMMARY_JSON_COMMAND:
                    KaizalaPlatform.getValueAsync(successCallback, errorCallback, "surveySummaryJson");
                    return;
                case KASClient.GET_SURVEY_RESULT_JSON_COMMAND:
                    KaizalaPlatform.getSurveySummaryResultAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_SURVEY_SUMMARY_WITH_NOTIFY_COMMAND:
                    KaizalaPlatform.getSurveySummaryAsync(args[0], args[1]);
                    return; // As the callbacks are already handled, lets return
                case KASClient.GET_SURVEY_URL_COMMAND:
                    KaizalaPlatform.getSurveyURLAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_RESPONSES_COMMAND:
                    KaizalaPlatform.getValueAsync(successCallback, errorCallback, "frsps");
                    return;
                case KASClient.GET_LIKES_AND_COMMENTS_DATA_COMMAND:
                    KaizalaPlatform.getLikesAndCommentsAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_ASSET_PATHS_COMMAND:
                    KaizalaPlatform.getAssetPathsAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_LOCALIZED_STRINGS_COMMAND:
                    KaizalaPlatform.getLocalizedStringsAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_POLL_STATUS_COMMAND:
                    KaizalaPlatform.getPollStatusAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_CURRENT_LOCATION_COMMAND:
                    KaizalaPlatform.getCurrentLocationAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_USER_DETAILS_COMMAND:
                    KaizalaPlatform.getUserDetailsAsync(successCallback, errorCallback, JSON.stringify(args));
                    return;
                case KASClient.GET_CONVERSATION_NAME_COMMAND:
                    KaizalaPlatform.getConversationNameAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_ATTACHMENT_PATH_COMMAND:
                    KaizalaPlatform.getAttachmentPathAsync(successCallback, errorCallback);
                    return;
                case KASClient.SELECT_ASIGNEES_COMMAND:
                    KaizalaPlatform.selectAssigneeAsync(args, successCallback, errorCallback);
                    return;
                case KASClient.GET_APP_INFO_COMMAND:
                    KaizalaPlatform.getAppInfoAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_MESSAGE_PROPERTIES_COMMAND:
                    KaizalaPlatform.getMessagePropertiesAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_CURRENT_USER_ID_COMMAND:
                    KaizalaPlatform.getUserIdAsync(successCallback, errorCallback);
                    return;
                case KASClient.REASSIGN_JOB_COMMAND:
                    KaizalaPlatform.reassignJobAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_PACKAGE_PROPERTIES_COMMAND:
                    KaizalaPlatform.getPackagePropertiesAsync(successCallback, errorCallback);
                    return;
                case KASClient.UPDATE_SURVEY_METADATA:
                    KaizalaPlatform.updateSurveyMetadata(args, successCallback, errorCallback);
                    return;
                default:
            }
        }
        function callNativeCommandSync(command, args, successCallback, errorCallback) {
            if (args === void 0) { args = null; }
            if (successCallback === void 0) { successCallback = null; }
            if (errorCallback === void 0) { errorCallback = null; }
            var result = null;
            switch (command) {
                case KASClient.GET_CLIENT_SUPPORTED_SDK_VERSION_COMMAND:
                    result = [KaizalaPlatform.getSupportedSDKVersion()];
                    break;
                case KASClient.OPEN_STORE_LINK_COMMAND:
                    KaizalaPlatform.openStoreLink();
                    break;
                case KASClient.GET_SURVEY_JSON_COMMAND:
                    result = [KaizalaPlatform.getValue("surveyJson")];
                    break;
                case KASClient.GET_SURVEY_SUMMARY_JSON_COMMAND:
                    result = [KaizalaPlatform.getValue("surveySummaryJson")];
                    break;
                case KASClient.GET_SURVEY_RESULT_JSON_COMMAND:
                    result = [KaizalaPlatform.getSurveySummaryResult()];
                    // Handling internet off scenario, so that HTML
                    // will load the error page
                    if (result == null || result[0] == null || result[0] == "") {
                        if (errorCallback) {
                            KASClient.executeFunction(errorCallback, ["Could not get required data"]);
                        }
                        return;
                    }
                    break;
                case KASClient.GET_SURVEY_SUMMARY_WITH_NOTIFY_COMMAND:
                    KaizalaPlatform.getSurveySummary(args[0], args[1]);
                    return; // As the callbacks are already handled, lets return
                case KASClient.GET_SURVEY_URL_COMMAND:
                    KaizalaPlatform.getSurveyURL(successCallback, errorCallback);
                    return; // As the callbacks are already handled, lets return
                case KASClient.GET_RESPONSES_COMMAND:
                    result = [KaizalaPlatform.getValue("frsps")];
                    break;
                case KASClient.GET_LIKES_AND_COMMENTS_DATA_COMMAND:
                    result = [KaizalaPlatform.getLikesAndCommentsDataWithError()];
                    break;
                case KASClient.GET_ASSET_PATHS_COMMAND:
                    result = [KaizalaPlatform.getAssetPaths()];
                    break;
                case KASClient.GET_LOCALIZED_STRINGS_COMMAND:
                    result = [KaizalaPlatform.getLocalizedStrings()];
                    break;
                case KASClient.GET_POLL_STATUS_COMMAND:
                    result = [KaizalaPlatform.getPollStatus()];
                    break;
                case KASClient.GET_CURRENT_LOCATION_COMMAND:
                    result = [KaizalaPlatform.getCurrentLocation()];
                    break;
                case KASClient.SHOW_ALERT_COMMAND:
                    KaizalaPlatform.showToast(args[0]);
                    break;
                case KASClient.UPDATE_RESPONSE_COMMAND:
                    KaizalaPlatform.updateMyResponse(JSON.stringify(args[0]), args[1], args[2]);
                    break;
                case KASClient.GET_USER_DETAILS_COMMAND:
                    result = [KaizalaPlatform.getUserDetails(JSON.stringify(args))];
                    break;
                case KASClient.GET_CONVERSATION_NAME_COMMAND:
                    result = [KaizalaPlatform.getConversationName()];
                    break;
                case KASClient.GET_ATTACHMENT_PATH_COMMAND:
                    result = [KaizalaPlatform.getAttachmentPath()];
                    break;
                case KASClient.CREATE_REQUEST_COMMAND:
                    KaizalaPlatform.createRequest(args[0], args[1], args[2]);
                    break;
                case KASClient.CLOSE_CARD_COMMAND:
                    KaizalaPlatform.closeCard();
                    break;
                case KASClient.SELECT_ASIGNEES_COMMAND:
                    result = [KaizalaPlatform.selectAssignee(args[0], args[1], args[2], args[3])];
                    break;
                case KASClient.GET_APP_INFO_COMMAND:
                    result = [KaizalaPlatform.getAppInfo()];
                    break;
                case KASClient.GET_MESSAGE_PROPERTIES_COMMAND:
                    result = [KaizalaPlatform.getMessageProperties()];
                    break;
                case KASClient.SHOW_LIKES_AND_COMMENTS_PAGE_COMMAND:
                    KaizalaPlatform.showLikesAndCommentsPage();
                    break;
                case KASClient.RESPOND_TO_SURVEY_COMMAND:
                    KaizalaPlatform.respondToSurvey();
                    break;
                case KASClient.SEND_REMINDER_COMMAND:
                    KaizalaPlatform.sendReminder();
                    break;
                case KASClient.FORWARD_SURVEY_COMMAND:
                    KaizalaPlatform.forwardSurvey();
                    break;
                case KASClient.GET_CURRENT_USER_ID_COMMAND:
                    result = [KaizalaPlatform.getUserId()];
                    break;
                case KASClient.ADD_LIKE_COMMAND:
                    KaizalaPlatform.addLike();
                    break;
                case KASClient.ADD_COMMENT_COMMAND:
                    KaizalaPlatform.addComment(args[0]);
                    break;
                case KASClient.DISMISS_SCREEN_COMMAND:
                    KaizalaPlatform.dismissActivity();
                    break;
                case KASClient.SHOW_PROGRESS_BAR_COMMAND:
                    KaizalaPlatform.showProgressBar();
                    break;
                case KASClient.HIDE_PROGRESS_BAR_COMMAND:
                    KaizalaPlatform.hideProgressBar();
                    break;
                case KASClient.REASSIGN_JOB_COMMAND:
                    result = [KaizalaPlatform.reassignJob()];
                    break;
                case KASClient.SEND_SURVEY_URL_COMMAND:
                    KaizalaPlatform.sendUrl(args[0]);
                    break;
                case KASClient.SCREEN_CHANGED_COMMAND:
                    KaizalaPlatform.sendScreenChange(args[0]);
                    break;
                case KASClient.LOG_ERROR_COMMAND:
                    KaizalaPlatform.logError(args[0]);
                    break;
                case KASClient.GET_PACKAGE_PROPERTIES_COMMAND:
                    result = [KaizalaPlatform.getPackageProperties()];
                    break;
                default:
            }
            if (successCallback) {
                if (result) {
                    KASClient.executeFunction(successCallback, result);
                }
                else {
                    KASClient.executeFunction(successCallback);
                }
            }
        }
    })(UWP = KASClient.UWP || (KASClient.UWP = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var WebApp;
    (function (WebApp) {
        function callNativeCommand(command, args, successCallback, errorCallback) {
            if (args === void 0) { args = null; }
            if (successCallback === void 0) { successCallback = null; }
            if (errorCallback === void 0) { errorCallback = null; }
            if (command === KASClient.GET_SURVEY_SUMMARY_WITH_NOTIFY_COMMAND) {
                var localCb_1 = args[0];
                var serverCb_1 = args[1];
                args[0] = function (params) {
                    callFunction(localCb_1, params);
                };
                args[1] = function (params) {
                    callFunction(serverCb_1, params);
                };
            }
            window.parent["executeCommand"](command, args, function (result) {
                callFunction(successCallback, result);
            }, function (error) {
                callFunction(errorCallback, error);
            });
        }
        WebApp.callNativeCommand = callNativeCommand;
        function callFunction(func, params) {
            if (params === void 0) { params = null; }
            if (func) {
                if (params) {
                    KASClient.executeFunction(func, params);
                }
                else {
                    KASClient.executeFunction(func);
                }
            }
        }
    })(WebApp = KASClient.WebApp || (KASClient.WebApp = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var WebClient;
    (function (WebClient) {
        function callNativeCommand(command, args, successCallback, errorCallback) {
            if (args === void 0) { args = null; }
            if (successCallback === void 0) { successCallback = null; }
            if (errorCallback === void 0) { errorCallback = null; }
            window.parent["excecuteCommand"](command, args, function (result) {
                callFunction(successCallback, result);
            }, function (error) {
                callFunction(errorCallback, error);
            });
        }
        WebClient.callNativeCommand = callNativeCommand;
        function callFunction(func, params) {
            if (params === void 0) { params = null; }
            if (func) {
                if (params) {
                    KASClient.executeFunction(func, params);
                }
                else {
                    KASClient.executeFunction(func);
                }
            }
        }
    })(WebClient = KASClient.WebClient || (KASClient.WebClient = {}));
})(KASClient || (KASClient = {}));
if (typeof Object.assign != 'function') {
    (function () {
        Object.assign = function (target) {
            if (target === undefined || target === null) {
                target = {};
            }
            var output = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source !== undefined && source !== null) {
                    for (var nextKey in source) {
                        if (source.hasOwnProperty(nextKey)) {
                            output[nextKey] = source[nextKey];
                        }
                    }
                }
            }
            return output;
        };
    })();
}
if (typeof Object.values != 'function') {
    (function () {
        Object.values = function (target) {
            var output = [];
            if (target !== undefined && target !== null) {
                for (var nextKey in target) {
                    if (target.hasOwnProperty(nextKey)) {
                        output.push(target[nextKey]);
                    }
                }
            }
            return output;
        };
    })();
}
var KASClient;
(function (KASClient) {
    var Platform;
    (function (Platform) {
        Platform[Platform["Unknown"] = 0] = "Unknown";
        Platform[Platform["iOS"] = 1] = "iOS";
        Platform[Platform["Android"] = 2] = "Android";
        Platform[Platform["WindowsPhone"] = 3] = "WindowsPhone";
        Platform[Platform["WindowsImmersive"] = 4] = "WindowsImmersive";
    })(Platform = KASClient.Platform || (KASClient.Platform = {}));
    function getPlatform() {
        var userAgent = navigator.userAgent || navigator.vendor || window["KASClient"].opera;
        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return Platform.WindowsPhone;
        }
        if (/WPDesktop/i.test(userAgent)) {
            return Platform.WindowsImmersive;
        }
        if (/android/i.test(userAgent)) {
            return Platform.Android;
        }
        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window["KASClient"].MSStream) {
            return Platform.iOS;
        }
        return Platform.Unknown;
    }
    KASClient.getPlatform = getPlatform;
    // iOS version detection from: https://stackoverflow.com/questions/8348139/
    // Android version detection from: https://stackoverflow.com/questions/7184573/
    function getVersion() {
        if (getPlatform() == Platform.iOS) {
            // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
            var iOSVersion = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            return parseInt(iOSVersion[1], 10);
        }
        else {
            var androidVersion = (navigator.userAgent.toLowerCase()).match(/android\s([0-9\.]*)/);
            return parseFloat(androidVersion ? androidVersion[1] : "0.0");
        }
    }
    KASClient.getVersion = getVersion;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    function parseJsonArray(jsonString) {
        try {
            return JSON.parse(jsonString);
        }
        catch (e) {
            return JSON.parse("[]");
        }
    }
    KASClient.parseJsonArray = parseJsonArray;
    function parseJsonObject(jsonString) {
        try {
            return JSON.parse(jsonString);
        }
        catch (e) {
            return JSON.parse("{}");
        }
    }
    KASClient.parseJsonObject = parseJsonObject;
    function isValidJson(json) {
        try {
            JSON.parse(JSON.stringify(json));
            return true;
        }
        catch (e) {
            return false;
        }
    }
    KASClient.isValidJson = isValidJson;
    // To avoid HTML injections, we sanitize all HTML tags
    // by replacing all '<' with '&lt;' and '>' with '&gt;'
    function sanitizeHtmlTags(string) {
        if (isEmptyString(string))
            return string;
        var tagsToReplace = {
            '<': '&lt;',
            '>': '&gt;'
        };
        var sanitizedString = string.replace(/[&<>]/g, function (tag) {
            return tagsToReplace[tag] || tag;
        });
        return sanitizedString;
    }
    KASClient.sanitizeHtmlTags = sanitizeHtmlTags;
    function executeFunction(funcNameWithNamespaces, args) {
        if (args === void 0) { args = []; }
        var argString = "";
        for (var i = 0; i < args.length; i++) {
            var arg = args[i];
            if (arg != null) {
                // Escape sequencing for strings
                if (typeof arg === "string") {
                    arg = replaceCharacterInString(arg, "\\", "\\\\");
                    arg = replaceCharacterInString(arg, "\'", "\\\'");
                    arg = replaceCharacterInString(arg, "\"", "\\\"");
                }
                if (argString == "") {
                    argString = "\"" + arg + "\"";
                }
                else {
                    argString += ", \"" + arg + "\"";
                }
            }
            else {
                if (argString == "") {
                    argString = "null";
                }
                else {
                    argString += ", null";
                }
            }
        }
        var functionWithArgs;
        if (argString == null || argString == "") {
            functionWithArgs = "return " + funcNameWithNamespaces + "()";
        }
        else {
            functionWithArgs = "return " + funcNameWithNamespaces + "(" + argString + ")";
        }
        var func = new Function(functionWithArgs);
        return func();
    }
    KASClient.executeFunction = executeFunction;
    function replaceCharacterInString(str, oldChar, newChar) {
        return str.split(oldChar).join(newChar);
    }
    KASClient.replaceCharacterInString = replaceCharacterInString;
    function getEllipsizedString(str, maxLength) {
        str = str.trim();
        if (str.length <= maxLength) {
            return str;
        }
        else {
            var lastSpaceIndex = str.lastIndexOf(" ", maxLength);
            if (lastSpaceIndex <= 0) {
                return str.substring(0, maxLength) + "...";
            }
            else {
                return str.substring(0, lastSpaceIndex) + "...";
            }
        }
    }
    KASClient.getEllipsizedString = getEllipsizedString;
    function syntaxHighlightJson(json) {
        addPrettyPrintClasses();
        var jsonStr = JSON.stringify(json, undefined, 2);
        jsonStr = jsonStr.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return jsonStr.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var className = 'numberPretty';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    className = 'keyPretty';
                }
                else {
                    className = 'stringPretty';
                }
            }
            else if (/true|false/.test(match)) {
                className = 'booleanPretty';
            }
            else if (/null/.test(match)) {
                className = 'nullPretty';
            }
            return '<span class="' + className + '">' + match + '</span>';
        });
    }
    KASClient.syntaxHighlightJson = syntaxHighlightJson;
    var prettyPrintClassesAdded = false;
    function addPrettyPrintClasses() {
        if (prettyPrintClassesAdded) {
            return; // Already added
        }
        var style = document.createElement('style');
        style.type = 'text/css';
        var stringClass = '.stringPretty { color: green; } ';
        var numberClass = '.numberPretty { color: darkorange; } ';
        var booleanClass = '.booleanPretty { color: blue; } ';
        var nullClass = '.nullPretty { color: magenta; } ';
        var keyClass = '.keyPretty { color: red; } ';
        style.innerHTML = stringClass + numberClass + booleanClass + nullClass + keyClass;
        document.getElementsByTagName('head')[0].appendChild(style);
        prettyPrintClassesAdded = true;
    }
    function jsonIsArray(json) {
        return Object.prototype.toString.call(json) === '[object Array]';
    }
    KASClient.jsonIsArray = jsonIsArray;
    function isURL(str) {
        return isLocalURL(str) || isRemoteURL(str);
    }
    KASClient.isURL = isURL;
    function isLocalURL(str) {
        if (typeof str === 'string' &&
            str.toLowerCase().lastIndexOf("file://", 0) == 0) {
            return true;
        }
        return false;
    }
    KASClient.isLocalURL = isLocalURL;
    function isRemoteURL(str) {
        if (typeof str === 'string' &&
            (str.toLowerCase().lastIndexOf("http://", 0) == 0 ||
                str.toLowerCase().lastIndexOf("https://", 0) == 0)) {
            return true;
        }
        return false;
    }
    KASClient.isRemoteURL = isRemoteURL;
    function isListOfImageAttachments(str) {
        try {
            var json = JSON.parse(str);
            if (jsonIsArray(json)) {
                for (var i = 0; i < json.length; i++) {
                    if (!isImageAttachment(json[i])) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }
        catch (e) {
            return false;
        }
    }
    KASClient.isListOfImageAttachments = isListOfImageAttachments;
    function isImageAttachment(attachment) {
        try {
            if (attachment.hasOwnProperty('ty') && attachment['ty'] == KASClient.KASAttachmentType.Image) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
    }
    KASClient.isImageAttachment = isImageAttachment;
    function isLocation(response) {
        try {
            var location = parseJsonObject(response);
            if (Object.prototype.toString.call(location) === '[object Object]') {
                return (location.hasOwnProperty("lt") &&
                    location.hasOwnProperty("lg") &&
                    location.hasOwnProperty("n"));
            }
            else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
    }
    KASClient.isLocation = isLocation;
    function getLocationName(response) {
        if (isLocation(response)) {
            var location = parseJsonObject(response);
            return location["n"];
        }
        return null;
    }
    KASClient.getLocationName = getLocationName;
    function truncatedDecimalString(num) {
        return num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
    }
    KASClient.truncatedDecimalString = truncatedDecimalString;
    function getExpiryUntilString(date, forAccessibility) {
        if (forAccessibility === void 0) { forAccessibility = false; }
        var expiryUntil = (date.getTime() - (new Date()).getTime()) / 1000; // seconds
        var expiryString = "";
        var days = 0, hours = 0, minutes = 0, seconds = 0;
        var dayInSeconds = 24 * 60 * 60;
        if (expiryUntil >= dayInSeconds) {
            days = Math.floor(expiryUntil / dayInSeconds);
            expiryUntil -= (days * dayInSeconds);
            if (!forAccessibility) {
                expiryString += days + "d ";
            }
            else {
                expiryString += days + KASClient.App.printf(KASClient.Internal.getKASClientString(days == 1 ? "Day" : "Days")) + " ";
            }
        }
        var hourInSeconds = 60 * 60;
        if (expiryUntil >= hourInSeconds) {
            hours = Math.floor(expiryUntil / hourInSeconds);
            expiryUntil -= (hours * hourInSeconds);
            if (!forAccessibility) {
                expiryString += hours + "h ";
            }
            else {
                expiryString += hours + KASClient.App.printf(KASClient.Internal.getKASClientString(hours == 1 ? "Hour" : "Hours")) + " ";
            }
        }
        var minuteInSeconds = 60;
        if (expiryUntil >= minuteInSeconds) {
            minutes = Math.floor(expiryUntil / minuteInSeconds);
            expiryUntil -= (minutes * minuteInSeconds);
            if (!forAccessibility) {
                expiryString += minutes + "m ";
            }
            else {
                expiryString += minutes + KASClient.App.printf(KASClient.Internal.getKASClientString(minuteInSeconds == 1 ? "Minute" : "Minutes")) + " ";
            }
        }
        seconds = expiryUntil;
        return expiryString;
    }
    KASClient.getExpiryUntilString = getExpiryUntilString;
    function getDateString(date, showDayOfWeek, showTime, showYear) {
        // Format "Mon Aug 15, 12:30 AM"
        if (showDayOfWeek === void 0) { showDayOfWeek = true; }
        if (showTime === void 0) { showTime = true; }
        if (showYear === void 0) { showYear = false; }
        // Mandatory
        var formatParams = { 'day': 'numeric', 'month': 'short' };
        // Optional
        if (showDayOfWeek) {
            formatParams['weekday'] = 'short';
        }
        if (showYear) {
            formatParams['year'] = 'numeric';
        }
        // Optional
        if (showTime) {
            formatParams['hour'] = 'numeric';
            formatParams['minute'] = 'numeric';
            formatParams['hour12'] = !Is24HourFormat;
        }
        return date.toLocaleString(navigator.language, formatParams);
    }
    KASClient.getDateString = getDateString;
    /* convert DateTime object to readable String format
    */
    function getTimeString(date) {
        return date.toLocaleString(navigator.language, { 'hour': 'numeric', 'minute': 'numeric', 'hour12': !Is24HourFormat });
    }
    KASClient.getTimeString = getTimeString;
    /* convert Time object as Number value to readable String format
    */
    function toStringTimeObject(time) {
        var hours = time.split(":")[0];
        var minutes = time.split(":")[1];
        var suffix = '';
        if (!Is24HourFormat) {
            suffix = hours >= 12 ? "pm" : "am";
            hours = hours % 12 || 12;
            hours = hours < 10 ? "0" + hours : hours;
        }
        var displayTime = hours + ":" + minutes + " " + suffix;
        return displayTime;
    }
    KASClient.toStringTimeObject = toStringTimeObject;
    function PrefixZero(n) {
        return ("0" + n).slice(-2);
    }
    /* convert int (number if bytes) into readable format
    * for example 1024*1024 gets converted to 1MB
    */
    function formatSize(bytes) {
        var unit = 1024;
        if (bytes < unit)
            return bytes + " B";
        var exp = parseInt("" + (Math.log(bytes) / Math.log(unit)));
        var pre = "KMGTPE"[exp - 1];
        var retVal = (bytes / Math.pow(unit, exp)).toFixed(1) + " " + pre + "B";
        return retVal;
    }
    KASClient.formatSize = formatSize;
    function isEmptyString(str) {
        return isEmptyObject(str);
    }
    KASClient.isEmptyString = isEmptyString;
    function isEmptyObject(obj) {
        if (obj == undefined || obj == null) {
            return true;
        }
        var isEmpty = false;
        if (typeof obj === "number" || typeof obj === "boolean") {
            isEmpty = false;
        }
        else if (typeof obj === "string") {
            isEmpty = obj.trim().length == 0;
        }
        else if (Array.isArray(obj)) {
            isEmpty = obj.length == 0;
        }
        else if (typeof obj === "object") {
            if (isValidJson(obj)) {
                isEmpty = JSON.stringify(obj) == "{}";
            }
        }
        return isEmpty;
    }
    KASClient.isEmptyObject = isEmptyObject;
    function getJsonFromFileAsync(file, callback) {
        var json = JSON.parse("{}");
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.addEventListener("load", function (e) {
            var allText = rawFile.responseText;
            var error = null;
            try {
                json = JSON.parse(allText);
            }
            catch (e) {
                error = e;
            }
            if (callback) {
                callback(json, error);
            }
        }, false);
        rawFile.send(null);
    }
    KASClient.getJsonFromFileAsync = getJsonFromFileAsync;
    var mockData = false;
    function shouldMockData() {
        return mockData;
    }
    KASClient.shouldMockData = shouldMockData;
    function enableMockData() {
        mockData = true;
    }
    KASClient.enableMockData = enableMockData;
    function isRenderedForActionDesigner() {
        return inIframe() && window.parent.hasOwnProperty("__ACTION_DESIGNER__");
    }
    KASClient.isRenderedForActionDesigner = isRenderedForActionDesigner;
    function isRenderedForWebClient() {
        return window.parent.hasOwnProperty("__WEB_CLIENT__");
    }
    KASClient.isRenderedForWebClient = isRenderedForWebClient;
    function isRenderedForWebApp() {
        return window.parent.hasOwnProperty("__WEB_APP__");
    }
    KASClient.isRenderedForWebApp = isRenderedForWebApp;
    function inIframe() {
        try {
            return window.self !== window.top;
        }
        catch (e) {
            return true;
        }
    }
    /**
     * This function required because in iOS 11, UIWebView has a bug, due to which a blocking scenarios in native app.
     *
     * Bug Description: Edit any contentEditable div/span or text input in HTML which have position fixed div at top. Now when we scroll up, the div disappears.
     *
     * Reporduction path : Open Survey Creation -> Add a Multiple Choice question -> Tap on 2nd option and edit -> Scroll up -> Navigator bar disappears.
     * We can also easily reproduce this in Job, Lets meets and the Htmls where we are using fixed navigation bar.
     *
     * We are tracking this bug with Apple bug ID : 35080721
     */
    function isIOSVersionAbove11() {
        return (KASClient.getPlatform() == KASClient.Platform.iOS && KASClient.getVersion() >= 11 && KASClient.iOS.getWebview() == KASClient.iOS.WebView.UIWebView);
    }
    KASClient.isIOSVersionAbove11 = isIOSVersionAbove11;
    /**
    * returns property bag with error message added
    * gets used to form props for reporting error telemetry event
    */
    function getErrorPropsForTelemetry(errorMsg) {
        var props = {};
        props[KASClient.Constants.TELEMETRY_PROPERTY_ERROR_KEY] = errorMsg;
        return props;
    }
    KASClient.getErrorPropsForTelemetry = getErrorPropsForTelemetry;
    /**
     * Removes an element from the given array at the specified index.
     * Use negative values for index to specify the position from the end of the array.
     *
     * @param array
     * @param index
     */
    function removeElementFromArray(array, index) {
        array.splice(index, 1);
        return array;
    }
    KASClient.removeElementFromArray = removeElementFromArray;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    function length(input) {
        if (input)
            return input.length;
        return 0;
    }
    function match(pattern, input) {
        if (input && pattern)
            return input.match(pattern) ? input.match(pattern).length > 0 : false;
        return false;
    }
    function toInt(input) {
        return Number(input);
    }
    add_operation("len", length);
    add_operation("match", match);
    add_operation("toInt", toInt);
    function add_operation(operatorName, operation) {
        jsonLogic.add_operation(operatorName, operation);
    }
    function isDataValidAgainstRule(rule, responseObj) {
        if (rule === void 0) { rule = JSON.parse("{}"); }
        if (responseObj === void 0) { responseObj = JSON.parse("{}"); }
        var isValid = false;
        try {
            isValid = jsonLogic.apply(rule, responseObj);
        }
        catch (error) {
            KASClient.App.logError("JsonLogic error - " + error);
        }
        return isValid;
    }
    KASClient.isDataValidAgainstRule = isDataValidAgainstRule;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var Version;
    (function (Version) {
        Version.VERSION_0 = "0";
        Version.VERSION_1 = "1";
        Version.VERSION_2 = "2";
        Version.VERSION_3 = "3";
        Version.VERSION_3_1 = "3.1"; // A minor version for Android Async APIs
        Version.VERSION_4 = "4";
        Version.VERSION_5 = "5";
        Version.VERSION_6 = "6";
        Version.VERSION_7 = "7";
        Version.VERSION_8 = "8";
        Version.VERSION_9 = "9";
        Version.VERSION_10 = "10";
        Version.VERSION_11 = "11";
        Version.VERSION_12 = "12";
        Version.VERSION_13 = "13";
        Version.VERSION_14 = "14";
        Version.VERSION_15 = "15";
        Version.VERSION_16 = "16";
        Version.VERSION_17 = "17";
        Version.VERSION_18 = "18";
        Version.VERSION_19 = "19";
        Version.VERSION_20 = "20";
        Version.VERSION_21 = "21"; // Support for validations, dependency and optional questions.
        Version.VERSION_22 = "22";
        Version.VERSION_23 = "23";
        Version.VERSION_24 = "24";
        Version.VERSION_25 = "25";
        Version.VERSION_26 = "26";
        var commandVersion = {};
        // Commands introduced in version-0 SDK
        commandVersion[KASClient.CLOSE_CARD_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.CREATE_REQUEST_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.GET_APP_INFO_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.GET_ASSET_PATHS_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.GET_ATTACHMENT_PATH_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.GET_CURRENT_LOCATION_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.GET_LOCALIZED_STRINGS_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.GET_POLL_STATUS_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.GET_RESPONSES_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.GET_SURVEY_JSON_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.GET_SURVEY_SUMMARY_JSON_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.GET_USER_DETAILS_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.SELECT_ASIGNEES_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.SHOW_ALERT_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.UPDATE_RESPONSE_COMMAND] = Version.VERSION_0;
        // Commands introduced in version-1 SDK
        commandVersion[KASClient.ADD_LIKE_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.DISMISS_SCREEN_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.FORWARD_SURVEY_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.GET_CONVERSATION_NAME_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.GET_CURRENT_USER_ID_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.GET_LIKES_AND_COMMENTS_DATA_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.GET_SURVEY_RESULT_JSON_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.GET_SURVEY_SUMMARY_WITH_NOTIFY_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.GET_SURVEY_URL_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.HIDE_PROGRESS_BAR_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.RESPOND_TO_SURVEY_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.SEND_REMINDER_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.SEND_SURVEY_URL_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.SHOW_LIKES_AND_COMMENTS_PAGE_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.SHOW_PROGRESS_BAR_COMMAND] = Version.VERSION_1;
        // Commands introduced in version-2 SDK
        commandVersion[KASClient.GET_PACKAGE_PROPERTIES_COMMAND] = Version.VERSION_2;
        // Commands introduced in version-3 SDK
        commandVersion[KASClient.GET_CLIENT_SUPPORTED_SDK_VERSION_COMMAND] = Version.VERSION_3;
        commandVersion[KASClient.OPEN_STORE_LINK_COMMAND] = Version.VERSION_3;
        commandVersion[KASClient.UPDATE_SURVEY_METADATA] = Version.VERSION_3;
        commandVersion[KASClient.ADD_COMMENT_COMMAND] = Version.VERSION_3;
        commandVersion[KASClient.GET_SURVEY_AGGREGATED_SUMMARY_JSON_COMMAND] = Version.VERSION_3;
        // Commands introduced in version-4 SDK
        commandVersion[KASClient.GET_LOCALIZED_MINIAPP_STRINGS] = Version.VERSION_4;
        // Commands introduced in version-5 SDK
        commandVersion[KASClient.SHOULD_SEE_SURVEY_SUMMARY] = Version.VERSION_5;
        commandVersion[KASClient.CAN_RESPOND_TO_SURVEY] = Version.VERSION_5;
        // Commands introduced in version-6 SDK
        commandVersion[KASClient.LOG_TO_REPORT_COMMAND] = Version.VERSION_6;
        commandVersion[KASClient.IS_CURRENT_USER_O365_SUBSCRIBED] = Version.VERSION_6;
        // Commands introduced in version-7 SDK
        commandVersion[KASClient.GET_CONVERSATION_PARTICIPANTS_COUNT] = Version.VERSION_7;
        commandVersion[KASClient.SHOW_PLACE_PICKER] = Version.VERSION_7;
        commandVersion[KASClient.SHOW_DURATION_PICKER] = Version.VERSION_7;
        // Commands introduced in version-8 SDK
        commandVersion[KASClient.EDIT_CARD_COMMAND] = Version.VERSION_8;
        commandVersion[KASClient.UPDATE_REQUEST_COMMAND] = Version.VERSION_8;
        // Commands introduced in version-9 SDK
        commandVersion[KASClient.GET_INTEGERATION_SERVICE_TOKEN_COMMAND] = Version.VERSION_9;
        commandVersion[KASClient.IS_TALKBACK_ENABLED] = Version.VERSION_9;
        commandVersion[KASClient.SHOW_IMAGE_FULL_SCREEN_COMMAND] = Version.VERSION_9;
        // Commands introduced in version-10 SDK
        commandVersion[KASClient.READ_TALKBACK_MESSAGE] = Version.VERSION_10;
        commandVersion[KASClient.POPULATE_KASCLIENT_STRINGS] = Version.VERSION_10;
        commandVersion[KASClient.GET_FONT_SIZE_MULTIPIER] = Version.VERSION_10;
        // Commands introduced in version-11 SDK
        commandVersion[KASClient.SELECT_ATTACHMENTS_COMMAND] = Version.VERSION_11;
        commandVersion[KASClient.DOWNLOAD_ATTACHMENT_COMMAND] = Version.VERSION_11;
        commandVersion[KASClient.CANCEL_ATTACHMENT_DOWNLOAD_COMMAND] = Version.VERSION_11;
        // Commands introduced in version-12 SDK
        commandVersion[KASClient.OPEN_IMMERSIVE_VIEW_FOR_ATTACHMENT] = Version.VERSION_12;
        commandVersion[KASClient.GENERATE_THUMBNAIL_FOR_IMAGE_ATTACHMENT] = Version.VERSION_12;
        commandVersion[KASClient.CHECK_STORAGE_ACCESS_FOR_ATTACHMENTS] = Version.VERSION_12;
        commandVersion[KASClient.GET_PACKAGE_CUSTOM_SETTINGS] = Version.VERSION_12;
        // Commands introduced in version-13 SDK
        commandVersion[KASClient.GET_LOCAL_PROPERTIES] = Version.VERSION_13;
        commandVersion[KASClient.UPDATE_LOCAL_PROPERTIES] = Version.VERSION_13;
        commandVersion[KASClient.GET_PACKAGE_CUSTOM_PROPERTIES] = Version.VERSION_13;
        commandVersion[KASClient.UPDATE_PACKAGE_CUSTOM_PROPERTIES] = Version.VERSION_13;
        commandVersion[KASClient.GET_DEVICE_ID_COMMAND] = Version.VERSION_13;
        // Commands introduced in version-14 SDK
        commandVersion[KASClient.GET_UUID] = Version.VERSION_14;
        // Commands introduced in version-15 SDK
        commandVersion[KASClient.IS_ATTACHMENT_DOWNLOADING] = Version.VERSION_15;
        // Commands introduced in version-16 SDK
        commandVersion[KASClient.CUSTOMIZE_NATIVE_TOOLBAR] = Version.VERSION_16;
        // Commands introduced in version-17 SDK
        commandVersion[KASClient.SEND_NOTIFICATION] = Version.VERSION_17;
        commandVersion[KASClient.IS_SUBSCRIBER] = Version.VERSION_17;
        // Commands introduced in version-18 SDK
        commandVersion[KASClient.GET_O365_USER_DETAILS] = Version.VERSION_18;
        // Commands introduced in version-19 SDK
        commandVersion[KASClient.GET_CONVERSATION_TYPE_COMMAND] = Version.VERSION_19;
        commandVersion[KASClient.GET_CLIENT_DETAILS] = Version.VERSION_19;
        // Commands introduced in version-20 SDK
        commandVersion[KASClient.RECORD_EVENT_COMMAND] = Version.VERSION_20;
        commandVersion[KASClient.SHOW_LOCATION_MAP] = Version.VERSION_20;
        // No commands introduced in version-21 SDK
        // Added new fields in Appmodel's question
        // Commands introduced in Version-22 SDK
        commandVersion[KASClient.IS_AUTHENTICATION_TYPE_SUPPORTED] = Version.VERSION_22;
        commandVersion[KASClient.PERFORM_AUTHENTICATION] = Version.VERSION_22;
        commandVersion[KASClient.GET_FORM_USER_CAPABILITIES] = Version.VERSION_22;
        // Commands introduced in Version-23 SDK
        commandVersion[KASClient.OPEN_LINK_IN_BROWSER] = Version.VERSION_23;
        // Commands introduced in Version-24 SDK
        commandVersion[KASClient.PERFORM_SPEECH_TO_TEXT] = Version.VERSION_24;
        commandVersion[KASClient.SET_SECURED_VALUE] = Version.VERSION_24;
        commandVersion[KASClient.GET_SECURED_VALUE] = Version.VERSION_24;
        commandVersion[KASClient.CREATE_REQUEST_COMMAND_V2] = Version.VERSION_24;
        commandVersion[KASClient.PERFORM_HTTP_REQUEST] = Version.VERSION_24;
        // Commands introduced in Version-25 SDK
        commandVersion[KASClient.GET_BATCH_RESPONSES_COMMAND] = Version.VERSION_25;
        commandVersion[KASClient.CREATE_REQUEST_WITH_RESPONSES_COMMAND] = Version.VERSION_25;
        commandVersion[KASClient.UPDATE_BATCH_RESPONSES_COMMAND] = Version.VERSION_25;
        // Commands introduced in Version-26 SDK
        commandVersion[KASClient.SHOW_USER_PROFILE] = Version.VERSION_26;
        commandVersion[KASClient.START_CHAT_COMMAND] = Version.VERSION_26;
        // The below method doesn't consider minor version
        function commandIsCompatible(command, callback) {
            if (!commandVersion.hasOwnProperty(command)) {
                callback(true);
            }
            else {
                getClientSupportedVersion(function (version) {
                    var commandRequiredVersion = parseInt(commandVersion[command]);
                    var clientSupportedVersion = parseInt(version);
                    callback((commandRequiredVersion <= clientSupportedVersion));
                });
            }
        }
        Version.commandIsCompatible = commandIsCompatible;
        var _clientSupportedSDKVersion = null;
        function didReceiveClientSupportedVersion() {
            return (_clientSupportedSDKVersion != null);
        }
        Version.didReceiveClientSupportedVersion = didReceiveClientSupportedVersion;
        function clientSupports(version, considerMinorVersion) {
            if (considerMinorVersion === void 0) { considerMinorVersion = false; }
            var versionToCheck;
            var clientSupportedVersion;
            if (!considerMinorVersion) {
                versionToCheck = parseInt(version);
                clientSupportedVersion = parseInt(_clientSupportedSDKVersion);
            }
            else {
                versionToCheck = parseFloat(version);
                clientSupportedVersion = parseFloat(_clientSupportedSDKVersion);
            }
            return (versionToCheck <= clientSupportedVersion);
        }
        Version.clientSupports = clientSupports;
        function setClientSupportedVersion(version) {
            _clientSupportedSDKVersion = version;
        }
        Version.setClientSupportedVersion = setClientSupportedVersion;
        function getClientSupportedVersion(callback) {
            // If client supported version is already received, no need to query again!
            if (_clientSupportedSDKVersion) {
                callback(_clientSupportedSDKVersion);
            }
            else {
                // Version-3+ representative API
                var version3PlusChecker = function (commandReturned) {
                    KASClient.getClientSupportedSDKVersion(function (version, error) {
                        _clientSupportedSDKVersion = version;
                        commandReturned();
                    }, true /* bypassVersionChecking */);
                };
                // Version-2 representative API
                var version2Checker = function (commandReturned) {
                    KASClient.getPackageProperties(function (properties, error) {
                        if (_clientSupportedSDKVersion == null) {
                            _clientSupportedSDKVersion = Version.VERSION_2;
                            commandReturned();
                        }
                        // Else it's a stale call, cause we've already got the version
                    }, true /* bypassVersionChecking */);
                };
                // Version-1 representative API
                var version1Checker = function (commandReturned) {
                    KASClient.getCurrentUserId(function (userId, error) {
                        if (_clientSupportedSDKVersion == null) {
                            _clientSupportedSDKVersion = Version.VERSION_1;
                            commandReturned();
                        }
                        // Else it's a stale call, cause we've already got the version
                    }, true /* bypassVersionChecking */);
                };
                // If client already supports version-3+ SDK, then we can query
                // for the supported version directly!
                checkIfCommandExists(version3PlusChecker, function (exists) {
                    if (exists) {
                        callback(_clientSupportedSDKVersion);
                    }
                    else {
                        // Else client is older than version-3,
                        // Check for version-2 first, then version-1,
                        // if none is compatible, then it's version-0
                        checkIfCommandExists(version2Checker, function (exists) {
                            if (exists) {
                                callback(_clientSupportedSDKVersion);
                            }
                            else {
                                checkIfCommandExists(version1Checker, function (exists) {
                                    if (exists) {
                                        callback(_clientSupportedSDKVersion);
                                    }
                                    else {
                                        // At this point it's safe to say that the client is primitive
                                        _clientSupportedSDKVersion = Version.VERSION_0;
                                        callback(_clientSupportedSDKVersion);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
        Version.getClientSupportedVersion = getClientSupportedVersion;
        function checkIfCommandExists(commandWrapper, callback) {
            if (KASClient.getPlatform() == KASClient.Platform.iOS) {
                // iOS runs in asynchronous model, so only a timeout
                // can indicate the api doesn't exist in client side
                var callbackCalled = false;
                commandWrapper(function () {
                    callbackCalled = true;
                    callback(true);
                });
                setTimeout(function () {
                    // Timeout occurred
                    if (!callbackCalled) {
                        callback(false);
                    }
                }, 100 /* ms */);
            }
            else {
                // Android runs in synchronous model, so an exception
                // will indicate the api doesn't exist in client side
                try {
                    commandWrapper(function () {
                        callback(true);
                    });
                }
                catch (e) {
                    callback(false);
                }
            }
        }
        Version.checkIfCommandExists = checkIfCommandExists;
    })(Version = KASClient.Version || (KASClient.Version = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var CustomNotificationMessage = /** @class */ (function () {
        function CustomNotificationMessage() {
            // User ids to send the push notification to
            this.userIds = null;
            // Notification Content to be shown in the fallback case
            this.notificationContent = "";
            // Priority with which notification needs to be published
            this.priority = KASClient.NotificationPriority.Low;
        }
        CustomNotificationMessage.prototype.toJSON = function () {
            var object = JSON.parse("{}");
            object["uIds"] = this.userIds;
            object["content"] = this.notificationContent;
            object["p"] = this.priority;
            object["nb"] = this.notificationBag;
            return object;
        };
        return CustomNotificationMessage;
    }());
    KASClient.CustomNotificationMessage = CustomNotificationMessage;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASActionPackageProperties = /** @class */ (function () {
        function KASActionPackageProperties() {
            // Package id of the MiniApp, shouldn't be changed
            this.actionPackageId = "";
        }
        KASActionPackageProperties.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var packageProperties = new KASActionPackageProperties();
            packageProperties.json = object;
            if (object.hasOwnProperty("actionPackageId")) {
                packageProperties.actionPackageId = object["actionPackageId"];
            }
            if (object.hasOwnProperty("properties")) {
                var propertiesObject = JSON.parse(object["properties"]);
                packageProperties.properties = propertiesObject;
            }
            return packageProperties;
        };
        return KASActionPackageProperties;
    }());
    KASClient.KASActionPackageProperties = KASActionPackageProperties;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASActionProperties = /** @class */ (function () {
        function KASActionProperties() {
            // Package id of the MiniApp, shouldn't be changed
            this.actionPackageId = "";
            // Id of a particular action of the mini app
            this.actionId = "";
            // Type of the action properties
            this.actionPropertyType = KASClient.KASActionPropertyType.Local;
        }
        KASActionProperties.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var actionProperties = new KASActionProperties();
            actionProperties.json = object;
            if (object.hasOwnProperty("actionPackageId")) {
                actionProperties.actionPackageId = object["actionPackageId"];
            }
            if (object.hasOwnProperty("actionId")) {
                actionProperties.actionId = object["actionId"];
            }
            if (object.hasOwnProperty("actionPropertyType")) {
                actionProperties.actionPropertyType = object["actionPropertyType"];
            }
            if (object.hasOwnProperty("properties")) {
                var propertiesObject = JSON.parse(object["properties"]);
                actionProperties.properties = propertiesObject;
            }
            return actionProperties;
        };
        return KASActionProperties;
    }());
    KASClient.KASActionProperties = KASActionProperties;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASActionPropertyType;
    (function (KASActionPropertyType) {
        // Server Properties for the action
        KASActionPropertyType[KASActionPropertyType["Server"] = 0] = "Server";
        // Local Properties for the action
        KASActionPropertyType[KASActionPropertyType["Local"] = 1] = "Local";
    })(KASActionPropertyType = KASClient.KASActionPropertyType || (KASClient.KASActionPropertyType = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASAttachment = /** @class */ (function () {
        function KASAttachment() {
            this.type = KASClient.KASAttachmentType.Image;
            this.fileName = "";
            this.size = 0;
            this.localPath = "";
            this.serverPath = "";
            this.attachmentId = "";
        }
        /**
         * The following string keys("ty", "afn", "asb", etc.) MUST be in sync with the Attachment object model representation in iOS and Android code.
         * This is vital for proper serialization and deserialization over the KAS bridge.
         */
        KASAttachment.prototype.toJSON = function () {
            var object = JSON.parse("{}");
            object["ty"] = this.type;
            object["afn"] = this.fileName;
            object["asb"] = this.size;
            object["spu"] = this.serverPath;
            object["lpu"] = this.localPath;
            object["id"] = this.attachmentId;
            return object;
        };
        KASAttachment.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var attachment = new KASAttachment();
            this.populateModelFromJSON(attachment, object);
            return attachment;
        };
        KASAttachment.populateModelFromJSON = function (attachment, object) {
            if (object == null)
                return;
            if (object.hasOwnProperty("ty")) {
                attachment.type = object["ty"];
            }
            if (object.hasOwnProperty("afn")) {
                attachment.fileName = object["afn"];
            }
            if (object.hasOwnProperty("asb")) {
                attachment.size = object["asb"];
            }
            if (object.hasOwnProperty("spu")) {
                attachment.serverPath = object["spu"];
            }
            if (object.hasOwnProperty("lpu")) {
                attachment.localPath = object["lpu"];
            }
            if (object.hasOwnProperty("id")) {
                attachment.attachmentId = object["id"];
            }
        };
        KASAttachment.hasLocalPath = function (obj) {
            return obj != null && !KASClient.isEmptyString(obj.localPath);
        };
        KASAttachment.hasServerPath = function (obj) {
            return obj != null && !KASClient.isEmptyString(obj.serverPath);
        };
        return KASAttachment;
    }());
    KASClient.KASAttachment = KASAttachment;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASAttachmentFactory = /** @class */ (function () {
        function KASAttachmentFactory() {
        }
        KASAttachmentFactory.getObjectOfType = function (type) {
            var obj = null;
            switch (type) {
                case KASClient.KASAttachmentType.Image:
                    obj = new KASClient.KASImageAttachment();
                    break;
                case KASClient.KASAttachmentType.Video:
                    obj = new KASClient.KASVideoAttachment();
                    break;
                case KASClient.KASAttachmentType.Audio:
                case KASClient.KASAttachmentType.Document:
                default:
                    obj = new KASClient.KASAttachment();
                    break;
            }
            return obj;
        };
        KASAttachmentFactory.fromJSON = function (object) {
            if (object == null)
                return null;
            var type = object["ty"];
            var obj = this.getObjectOfType(type);
            switch (type) {
                case KASClient.KASAttachmentType.Image:
                    obj = KASClient.KASImageAttachment.fromJSON(object);
                    break;
                case KASClient.KASAttachmentType.Video:
                    obj = KASClient.KASVideoAttachment.fromJSON(object);
                    break;
                case KASClient.KASAttachmentType.Audio:
                case KASClient.KASAttachmentType.Document:
                default:
                    obj = KASClient.KASAttachment.fromJSON(object);
                    break;
            }
            return obj;
        };
        return KASAttachmentFactory;
    }());
    KASClient.KASAttachmentFactory = KASAttachmentFactory;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASQuestionConfig = /** @class */ (function () {
        function KASQuestionConfig() {
            // Config to denote if a new page should start after the current question
            this.pageBreakEnabled = true;
        }
        KASQuestionConfig.prototype.toJSON = function () {
            var object = JSON.parse("{}");
            object["pb"] = this.pageBreakEnabled;
            return object;
        };
        KASQuestionConfig.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var config = new KASQuestionConfig();
            if (object.hasOwnProperty("pb")) {
                config.pageBreakEnabled = object["pb"];
            }
            return config;
        };
        return KASQuestionConfig;
    }());
    KASClient.KASQuestionConfig = KASQuestionConfig;
})(KASClient || (KASClient = {}));
/// <reference path="./KASQuestionConfig.ts" />
var KASClient;
(function (KASClient) {
    var AttachmentListResponseType;
    (function (AttachmentListResponseType) {
        AttachmentListResponseType[AttachmentListResponseType["GENERIC"] = 0] = "GENERIC";
        AttachmentListResponseType[AttachmentListResponseType["LIST_OF_IMAGES"] = 1] = "LIST_OF_IMAGES";
    })(AttachmentListResponseType = KASClient.AttachmentListResponseType || (KASClient.AttachmentListResponseType = {}));
    var KASAttachmentListQuestionConfig = /** @class */ (function (_super) {
        __extends(KASAttachmentListQuestionConfig, _super);
        function KASAttachmentListQuestionConfig() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.imageSource = KASClient.ImagePickerSource.All;
            _this.maxImageCount = 10;
            _this.attachmentListType = AttachmentListResponseType.GENERIC;
            return _this;
        }
        KASAttachmentListQuestionConfig.prototype.toJSON = function () {
            var object = _super.prototype.toJSON.call(this);
            object[KASAttachmentListQuestionConfig.MAX_IMAGE_COUNT_KEY] = this.maxImageCount;
            object[KASAttachmentListQuestionConfig.IMAGE_SOURCE_KEY] = this.imageSource;
            object[KASAttachmentListQuestionConfig.ATTACHMENT_LIST_TYPE] = this.attachmentListType;
            return object;
        };
        KASAttachmentListQuestionConfig.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var config = KASClient.KASQuestionConfig.fromJSON(object);
            var attachmentListConfig = new KASAttachmentListQuestionConfig();
            attachmentListConfig.pageBreakEnabled = config.pageBreakEnabled;
            if (object.hasOwnProperty(KASAttachmentListQuestionConfig.MAX_IMAGE_COUNT_KEY)) {
                attachmentListConfig.maxImageCount = object[KASAttachmentListQuestionConfig.MAX_IMAGE_COUNT_KEY];
            }
            if (object.hasOwnProperty(KASAttachmentListQuestionConfig.IMAGE_SOURCE_KEY)) {
                attachmentListConfig.imageSource = object[KASClient.KASImageQuestionConfig.IMAGE_SOURCE_KEY];
            }
            if (object.hasOwnProperty(KASAttachmentListQuestionConfig.ATTACHMENT_LIST_TYPE)) {
                attachmentListConfig.attachmentListType = object[KASAttachmentListQuestionConfig.ATTACHMENT_LIST_TYPE];
            }
            return attachmentListConfig;
        };
        // Config to denote what picker sources to show in image type question
        KASAttachmentListQuestionConfig.MAX_IMAGE_COUNT_KEY = "mic";
        KASAttachmentListQuestionConfig.IMAGE_SOURCE_KEY = "is";
        KASAttachmentListQuestionConfig.ATTACHMENT_LIST_TYPE = "alt";
        return KASAttachmentListQuestionConfig;
    }(KASClient.KASQuestionConfig));
    KASClient.KASAttachmentListQuestionConfig = KASAttachmentListQuestionConfig;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASQuestionResult = /** @class */ (function () {
        function KASQuestionResult() {
            // Title of the question
            this.questionTitle = "";
            // Type of the question
            this.questionType = KASClient.KASQuestionType.None;
            // Index of the question
            this.questionId = 0;
        }
        KASQuestionResult.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var questionResult = new KASQuestionResult();
            if (object.hasOwnProperty("QuestionText")) {
                questionResult.questionTitle = object["QuestionText"];
            }
            if (object.hasOwnProperty("Type")) {
                questionResult.questionType = object["Type"];
            }
            if (object.hasOwnProperty("QuestionId")) {
                questionResult.questionId = object["QuestionId"];
            }
            return questionResult;
        };
        return KASQuestionResult;
    }());
    KASClient.KASQuestionResult = KASQuestionResult;
})(KASClient || (KASClient = {}));
/// <reference path="./KASQuestionResult.ts" />
var KASClient;
(function (KASClient) {
    /**
     * This model contains data for every response to an Attachment List Type
     * question.
     */
    var KASAttachmentListQuestionResult = /** @class */ (function (_super) {
        __extends(KASAttachmentListQuestionResult, _super);
        function KASAttachmentListQuestionResult() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * attachmentListType: contains the type of the attachment list response
             */
            _this.attachmentListType = KASClient.AttachmentListResponseType.GENERIC;
            /**
             * userInfo: contains instances of KASUser with details for the respondent
             * for the particular response so that we can show the name and profile
             * picture of the respondent.
             */
            _this.userInfo = [];
            /**
             * timeStamps: contains the response timestamps for every response.
             */
            _this.timeStamps = [];
            /**
             * attachmentsResponseJSONStrings: contains the list of attachments
             * corresponding to every response as a JSON string which is directly
             * available in the questionIdToAnswerMap.
             */
            _this.attachmentsResponseJSONStrings = [];
            return _this;
        }
        return KASAttachmentListQuestionResult;
    }(KASClient.KASQuestionResult));
    KASClient.KASAttachmentListQuestionResult = KASAttachmentListQuestionResult;
})(KASClient || (KASClient = {}));
/**
 * The following enum values MUST be in sync with the AttachmentType enum representation in iOS and Android code.
 * This is vital for proper serialization and deserialization over the KAS bridge.
 */
var KASClient;
(function (KASClient) {
    var KASAttachmentType;
    (function (KASAttachmentType) {
        KASAttachmentType[KASAttachmentType["Image"] = 1] = "Image";
        KASAttachmentType[KASAttachmentType["Audio"] = 2] = "Audio";
        KASAttachmentType[KASAttachmentType["Video"] = 6] = "Video";
        KASAttachmentType[KASAttachmentType["Document"] = 3] = "Document";
        KASAttachmentType[KASAttachmentType["Generic"] = 99] = "Generic";
    })(KASAttachmentType = KASClient.KASAttachmentType || (KASClient.KASAttachmentType = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASAudioAttachment = /** @class */ (function (_super) {
        __extends(KASAudioAttachment, _super);
        function KASAudioAttachment() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.duration = 0;
            return _this;
        }
        KASAudioAttachment.prototype.toJSON = function () {
            var object = _super.prototype.toJSON.call(this);
            object["duration"] = this.duration;
            return object;
        };
        KASAudioAttachment.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var attachment = new KASAudioAttachment();
            this.populateModelFromJSON(attachment, object);
            return attachment;
        };
        KASAudioAttachment.populateModelFromJSON = function (attachment, object) {
            _super.populateModelFromJSON.call(this, attachment, object);
            attachment.type = KASClient.KASAttachmentType.Audio;
            if (object.hasOwnProperty("duration")) {
                attachment.duration = object["duration"];
            }
        };
        return KASAudioAttachment;
    }(KASClient.KASAttachment));
    KASClient.KASAudioAttachment = KASAudioAttachment;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASAuthenticationType;
    (function (KASAuthenticationType) {
        // Default type
        KASAuthenticationType[KASAuthenticationType["None"] = -1] = "None";
        KASAuthenticationType[KASAuthenticationType["Pattern"] = 1] = "Pattern";
        KASAuthenticationType[KASAuthenticationType["Pin"] = 2] = "Pin";
        KASAuthenticationType[KASAuthenticationType["Password"] = 3] = "Password";
        KASAuthenticationType[KASAuthenticationType["FingerPrint"] = 4] = "FingerPrint";
        KASAuthenticationType[KASAuthenticationType["FaceRecognition"] = 5] = "FaceRecognition";
    })(KASAuthenticationType = KASClient.KASAuthenticationType || (KASClient.KASAuthenticationType = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASCountryPhoneCode = /** @class */ (function () {
        function KASCountryPhoneCode() {
        }
        KASCountryPhoneCode.getAllCountryPhoneCodes = function () {
            var countryPhoneCodes = [];
            this.countryPhoneCodeList.forEach(function (element) {
                if (!KASClient.isEmptyObject(element["phoneCode"])) {
                    countryPhoneCodes.push(element["phoneCode"]);
                }
            });
            return countryPhoneCodes;
        };
        KASCountryPhoneCode.getAllFormattedCountryPhoneCodes = function (includeCountryName) {
            var _this = this;
            if (includeCountryName === void 0) { includeCountryName = true; }
            var formattedCountryPhoneCodes = [];
            this.countryPhoneCodeList.forEach(function (element) {
                if (!KASClient.isEmptyObject(element["phoneCode"])) {
                    formattedCountryPhoneCodes.push(_this.getFormattedString(element["phoneCode"], includeCountryName ? element["name_en"] : ""));
                }
            });
            return formattedCountryPhoneCodes;
        };
        KASCountryPhoneCode.getFormattedCountryPhoneCodeForCountry = function (countryPhoneCode, includeCountryName) {
            if (includeCountryName === void 0) { includeCountryName = true; }
            var formattedCountryPhoneCode = null;
            for (var i = 0; i < this.countryPhoneCodeList.length; i++) {
                if (this.countryPhoneCodeList[i]["phoneCode"] == countryPhoneCode) {
                    formattedCountryPhoneCode = this.getFormattedString(this.countryPhoneCodeList[i]["phoneCode"], includeCountryName ? this.countryPhoneCodeList[i]["name_en"] : "");
                    break;
                }
            }
            return formattedCountryPhoneCode;
        };
        KASCountryPhoneCode.getFormattedString = function (countryPhoneCode, countryName) {
            var formattedString = null;
            if (!KASClient.isEmptyString(countryPhoneCode + "")) {
                formattedString = "+" + countryPhoneCode;
                if (!KASClient.isEmptyObject(countryName)) {
                    formattedString = formattedString + " " + countryName;
                }
            }
            return formattedString;
        };
        KASCountryPhoneCode.countryPhoneCodeList = [
            {
                "countryCode": "AF",
                "phoneCode": 93,
                "name_en": "Afghanistan"
            },
            {
                "countryCode": "AX",
                "phoneCode": 358,
                "name_en": "Åland Islands"
            },
            {
                "countryCode": "AL",
                "phoneCode": 355,
                "name_en": "Albania"
            },
            {
                "countryCode": "DZ",
                "phoneCode": 213,
                "name_en": "Algeria"
            },
            {
                "countryCode": "AS",
                "phoneCode": 1,
                "name_en": "American Samoa"
            },
            {
                "countryCode": "AD",
                "phoneCode": 376,
                "name_en": "Andorra"
            },
            {
                "countryCode": "AO",
                "phoneCode": 244,
                "name_en": "Angola"
            },
            {
                "countryCode": "AI",
                "phoneCode": 1,
                "name_en": "Anguilla"
            },
            {
                "countryCode": "AQ",
                "phoneCode": 672,
                "name_en": "Antarctica"
            },
            {
                "countryCode": "AG",
                "phoneCode": 1,
                "name_en": "Antigua and Barbuda"
            },
            {
                "countryCode": "AR",
                "phoneCode": 54,
                "name_en": "Argentina"
            },
            {
                "countryCode": "AM",
                "phoneCode": 374,
                "name_en": "Armenia"
            },
            {
                "countryCode": "AW",
                "phoneCode": 297,
                "name_en": "Aruba"
            },
            {
                "countryCode": "AU",
                "phoneCode": 61,
                "name_en": "Australia"
            },
            {
                "countryCode": "AT",
                "phoneCode": 43,
                "name_en": "Austria"
            },
            {
                "countryCode": "AZ",
                "phoneCode": 994,
                "name_en": "Azerbaijan"
            },
            {
                "countryCode": "BS",
                "phoneCode": 1,
                "name_en": "Bahamas"
            },
            {
                "countryCode": "BH",
                "phoneCode": 973,
                "name_en": "Bahrain"
            },
            {
                "countryCode": "BD",
                "phoneCode": 880,
                "name_en": "Bangladesh"
            },
            {
                "countryCode": "BB",
                "phoneCode": 1,
                "name_en": "Barbados"
            },
            {
                "countryCode": "BY",
                "phoneCode": 375,
                "name_en": "Belarus"
            },
            {
                "countryCode": "BE",
                "phoneCode": 32,
                "name_en": "Belgium"
            },
            {
                "countryCode": "BZ",
                "phoneCode": 501,
                "name_en": "Belize"
            },
            {
                "countryCode": "BJ",
                "phoneCode": 229,
                "name_en": "Benin"
            },
            {
                "countryCode": "BM",
                "phoneCode": 1,
                "name_en": "Bermuda"
            },
            {
                "countryCode": "BT",
                "phoneCode": 975,
                "name_en": "Bhutan"
            },
            {
                "countryCode": "BO",
                "phoneCode": 591,
                "name_en": "Bolivia"
            },
            {
                "countryCode": "BQ",
                "phoneCode": 599,
                "name_en": "Bonaire"
            },
            {
                "countryCode": "BA",
                "phoneCode": 387,
                "name_en": "Bosnia and Herzegovina"
            },
            {
                "countryCode": "BW",
                "phoneCode": 267,
                "name_en": "Botswana"
            },
            {
                "countryCode": "BV",
                "phoneCode": 47,
                "name_en": "Bouvet Island"
            },
            {
                "countryCode": "BR",
                "phoneCode": 55,
                "name_en": "Brazil"
            },
            {
                "countryCode": "IO",
                "phoneCode": 246,
                "name_en": "British Indian Ocean Territory"
            },
            {
                "countryCode": "VG",
                "phoneCode": 1,
                "name_en": "British Virgin Islands"
            },
            {
                "countryCode": "BN",
                "phoneCode": 673,
                "name_en": "Brunei"
            },
            {
                "countryCode": "BG",
                "phoneCode": 359,
                "name_en": "Bulgaria"
            },
            {
                "countryCode": "BF",
                "phoneCode": 226,
                "name_en": "Burkina Faso"
            },
            {
                "countryCode": "BI",
                "phoneCode": 257,
                "name_en": "Burundi"
            },
            {
                "countryCode": "CV",
                "phoneCode": 238,
                "name_en": "Cabo Verde"
            },
            {
                "countryCode": "KH",
                "phoneCode": 855,
                "name_en": "Cambodia"
            },
            {
                "countryCode": "CM",
                "phoneCode": 237,
                "name_en": "Cameroon"
            },
            {
                "countryCode": "CA",
                "phoneCode": 1,
                "name_en": "Canada"
            },
            {
                "countryCode": "KY",
                "phoneCode": 1,
                "name_en": "Cayman Islands"
            },
            {
                "countryCode": "CF",
                "phoneCode": 236,
                "name_en": "Central African Republic"
            },
            {
                "countryCode": "TD",
                "phoneCode": 235,
                "name_en": "Chad"
            },
            {
                "countryCode": "CL",
                "phoneCode": 56,
                "name_en": "Chile"
            },
            {
                "countryCode": "CN",
                "phoneCode": 86,
                "name_en": "China"
            },
            {
                "countryCode": "CX",
                "phoneCode": 61,
                "name_en": "Christmas Island"
            },
            {
                "countryCode": "CC",
                "phoneCode": 61,
                "name_en": "Cocos (Keeling) Islands"
            },
            {
                "countryCode": "CO",
                "phoneCode": 57,
                "name_en": "Colombia"
            },
            {
                "countryCode": "KM",
                "phoneCode": 269,
                "name_en": "Comoros"
            },
            {
                "countryCode": "CG",
                "phoneCode": 242,
                "name_en": "Congo"
            },
            {
                "countryCode": "CD",
                "phoneCode": 243,
                "name_en": "Congo (DRC)"
            },
            {
                "countryCode": "CK",
                "phoneCode": 682,
                "name_en": "Cook Islands"
            },
            {
                "countryCode": "CR",
                "phoneCode": 506,
                "name_en": "Costa Rica"
            },
            {
                "countryCode": "CI",
                "phoneCode": 225,
                "name_en": "Côte d’Ivoire"
            },
            {
                "countryCode": "HR",
                "phoneCode": 385,
                "name_en": "Croatia"
            },
            {
                "countryCode": "CU",
                "phoneCode": 53,
                "name_en": "Cuba"
            },
            {
                "countryCode": "CW",
                "phoneCode": 599,
                "name_en": "Curaçao"
            },
            {
                "countryCode": "CY",
                "phoneCode": 357,
                "name_en": "Cyprus"
            },
            {
                "countryCode": "CZ",
                "phoneCode": 420,
                "name_en": "Czech Republic"
            },
            {
                "countryCode": "DK",
                "phoneCode": 45,
                "name_en": "Denmark"
            },
            {
                "countryCode": "DJ",
                "phoneCode": 253,
                "name_en": "Djibouti"
            },
            {
                "countryCode": "DM",
                "phoneCode": 1,
                "name_en": "Dominica"
            },
            {
                "countryCode": "DO",
                "phoneCode": 1,
                "name_en": "Dominican Republic"
            },
            {
                "countryCode": "EC",
                "phoneCode": 593,
                "name_en": "Ecuador"
            },
            {
                "countryCode": "EG",
                "phoneCode": 20,
                "name_en": "Egypt"
            },
            {
                "countryCode": "SV",
                "phoneCode": 503,
                "name_en": "El Salvador"
            },
            {
                "countryCode": "GQ",
                "phoneCode": 240,
                "name_en": "Equatorial Guinea"
            },
            {
                "countryCode": "ER",
                "phoneCode": 291,
                "name_en": "Eritrea"
            },
            {
                "countryCode": "EE",
                "phoneCode": 372,
                "name_en": "Estonia"
            },
            {
                "countryCode": "ET",
                "phoneCode": 251,
                "name_en": "Ethiopia"
            },
            {
                "countryCode": "FK",
                "phoneCode": 500,
                "name_en": "Falkland Islands"
            },
            {
                "countryCode": "FO",
                "phoneCode": 298,
                "name_en": "Faroe Islands"
            },
            {
                "countryCode": "FJ",
                "phoneCode": 679,
                "name_en": "Fiji"
            },
            {
                "countryCode": "FI",
                "phoneCode": 358,
                "name_en": "Finland"
            },
            {
                "countryCode": "FR",
                "phoneCode": 33,
                "name_en": "France"
            },
            {
                "countryCode": "GF",
                "phoneCode": 594,
                "name_en": "French Guiana"
            },
            {
                "countryCode": "PF",
                "phoneCode": 689,
                "name_en": "French Polynesia"
            },
            {
                "countryCode": "TF",
                "phoneCode": 262,
                "name_en": "French Southern Territories"
            },
            {
                "countryCode": "GA",
                "phoneCode": 241,
                "name_en": "Gabon"
            },
            {
                "countryCode": "GM",
                "phoneCode": 220,
                "name_en": "Gambia"
            },
            {
                "countryCode": "GE",
                "phoneCode": 995,
                "name_en": "Georgia"
            },
            {
                "countryCode": "DE",
                "phoneCode": 49,
                "name_en": "Germany"
            },
            {
                "countryCode": "GH",
                "phoneCode": 233,
                "name_en": "Ghana"
            },
            {
                "countryCode": "GI",
                "phoneCode": 350,
                "name_en": "Gibraltar"
            },
            {
                "countryCode": "GR",
                "phoneCode": 30,
                "name_en": "Greece"
            },
            {
                "countryCode": "GL",
                "phoneCode": 299,
                "name_en": "Greenland"
            },
            {
                "countryCode": "GD",
                "phoneCode": 1,
                "name_en": "Grenada"
            },
            {
                "countryCode": "GP",
                "phoneCode": 590,
                "name_en": "Guadeloupe"
            },
            {
                "countryCode": "GU",
                "phoneCode": 1,
                "name_en": "Guam"
            },
            {
                "countryCode": "GT",
                "phoneCode": 502,
                "name_en": "Guatemala"
            },
            {
                "countryCode": "GG",
                "phoneCode": 44,
                "name_en": "Guernsey"
            },
            {
                "countryCode": "GN",
                "phoneCode": 224,
                "name_en": "Guinea"
            },
            {
                "countryCode": "GW",
                "phoneCode": 245,
                "name_en": "Guinea-Bissau"
            },
            {
                "countryCode": "GY",
                "phoneCode": 592,
                "name_en": "Guyana"
            },
            {
                "countryCode": "HT",
                "phoneCode": 509,
                "name_en": "Haiti"
            },
            {
                "countryCode": "HM",
                "phoneCode": 61,
                "name_en": "Heard Island and McDonald Islands"
            },
            {
                "countryCode": "HN",
                "phoneCode": 504,
                "name_en": "Honduras"
            },
            {
                "countryCode": "HK",
                "phoneCode": 852,
                "name_en": "Hong Kong SAR"
            },
            {
                "countryCode": "HU",
                "phoneCode": 36,
                "name_en": "Hungary"
            },
            {
                "countryCode": "IS",
                "phoneCode": 354,
                "name_en": "Iceland"
            },
            {
                "countryCode": "IN",
                "phoneCode": 91,
                "name_en": "India"
            },
            {
                "countryCode": "ID",
                "phoneCode": 62,
                "name_en": "Indonesia"
            },
            {
                "countryCode": "IR",
                "phoneCode": 98,
                "name_en": "Iran"
            },
            {
                "countryCode": "IQ",
                "phoneCode": 964,
                "name_en": "Iraq"
            },
            {
                "countryCode": "IE",
                "phoneCode": 353,
                "name_en": "Ireland"
            },
            {
                "countryCode": "IM",
                "phoneCode": 44,
                "name_en": "Isle of Man"
            },
            {
                "countryCode": "IL",
                "phoneCode": 972,
                "name_en": "Israel"
            },
            {
                "countryCode": "IT",
                "phoneCode": 39,
                "name_en": "Italy"
            },
            {
                "countryCode": "JM",
                "phoneCode": 1,
                "name_en": "Jamaica"
            },
            {
                "countryCode": "XJ",
                "phoneCode": 47,
                "name_en": "Jan Mayen"
            },
            {
                "countryCode": "JP",
                "phoneCode": 81,
                "name_en": "Japan"
            },
            {
                "countryCode": "JE",
                "phoneCode": 44,
                "name_en": "Jersey"
            },
            {
                "countryCode": "JO",
                "phoneCode": 962,
                "name_en": "Jordan"
            },
            {
                "countryCode": "KZ",
                "phoneCode": 7,
                "name_en": "Kazakhstan"
            },
            {
                "countryCode": "KE",
                "phoneCode": 254,
                "name_en": "Kenya"
            },
            {
                "countryCode": "KI",
                "phoneCode": 686,
                "name_en": "Kiribati"
            },
            {
                "countryCode": "KR",
                "phoneCode": 82,
                "name_en": "Korea"
            },
            {
                "countryCode": "XK",
                "phoneCode": 381,
                "name_en": "Kosovo"
            },
            {
                "countryCode": "KW",
                "phoneCode": 965,
                "name_en": "Kuwait"
            },
            {
                "countryCode": "KG",
                "phoneCode": 996,
                "name_en": "Kyrgyzstan"
            },
            {
                "countryCode": "LA",
                "phoneCode": 856,
                "name_en": "Laos"
            },
            {
                "countryCode": "LV",
                "phoneCode": 371,
                "name_en": "Latvia"
            },
            {
                "countryCode": "LB",
                "phoneCode": 961,
                "name_en": "Lebanon"
            },
            {
                "countryCode": "LS",
                "phoneCode": 266,
                "name_en": "Lesotho"
            },
            {
                "countryCode": "LR",
                "phoneCode": 231,
                "name_en": "Liberia"
            },
            {
                "countryCode": "LY",
                "phoneCode": 218,
                "name_en": "Libya"
            },
            {
                "countryCode": "LI",
                "phoneCode": 423,
                "name_en": "Liechtenstein"
            },
            {
                "countryCode": "LT",
                "phoneCode": 370,
                "name_en": "Lithuania"
            },
            {
                "countryCode": "LU",
                "phoneCode": 352,
                "name_en": "Luxembourg"
            },
            {
                "countryCode": "MO",
                "phoneCode": 853,
                "name_en": "Macao SAR"
            },
            {
                "countryCode": "MK",
                "phoneCode": 389,
                "name_en": "Macedonia, FYRO"
            },
            {
                "countryCode": "MG",
                "phoneCode": 261,
                "name_en": "Madagascar"
            },
            {
                "countryCode": "MW",
                "phoneCode": 265,
                "name_en": "Malawi"
            },
            {
                "countryCode": "MY",
                "phoneCode": 60,
                "name_en": "Malaysia"
            },
            {
                "countryCode": "MV",
                "phoneCode": 960,
                "name_en": "Maldives"
            },
            {
                "countryCode": "ML",
                "phoneCode": 223,
                "name_en": "Mali"
            },
            {
                "countryCode": "MT",
                "phoneCode": 356,
                "name_en": "Malta"
            },
            {
                "countryCode": "MH",
                "phoneCode": 692,
                "name_en": "Marshall Islands"
            },
            {
                "countryCode": "MQ",
                "phoneCode": 596,
                "name_en": "Martinique"
            },
            {
                "countryCode": "MR",
                "phoneCode": 222,
                "name_en": "Mauritania"
            },
            {
                "countryCode": "MU",
                "phoneCode": 230,
                "name_en": "Mauritius"
            },
            {
                "countryCode": "YT",
                "phoneCode": 262,
                "name_en": "Mayotte"
            },
            {
                "countryCode": "MX",
                "phoneCode": 52,
                "name_en": "Mexico"
            },
            {
                "countryCode": "FM",
                "phoneCode": 691,
                "name_en": "Micronesia"
            },
            {
                "countryCode": "MD",
                "phoneCode": 373,
                "name_en": "Moldova"
            },
            {
                "countryCode": "MC",
                "phoneCode": 377,
                "name_en": "Monaco"
            },
            {
                "countryCode": "MN",
                "phoneCode": 976,
                "name_en": "Mongolia"
            },
            {
                "countryCode": "ME",
                "phoneCode": 382,
                "name_en": "Montenegro"
            },
            {
                "countryCode": "MS",
                "phoneCode": 1,
                "name_en": "Montserrat"
            },
            {
                "countryCode": "MA",
                "phoneCode": 212,
                "name_en": "Morocco"
            },
            {
                "countryCode": "MZ",
                "phoneCode": 258,
                "name_en": "Mozambique"
            },
            {
                "countryCode": "MM",
                "phoneCode": 95,
                "name_en": "Myanmar"
            },
            {
                "countryCode": "NA",
                "phoneCode": 264,
                "name_en": "Namibia"
            },
            {
                "countryCode": "NR",
                "phoneCode": 674,
                "name_en": "Nauru"
            },
            {
                "countryCode": "NP",
                "phoneCode": 977,
                "name_en": "Nepal"
            },
            {
                "countryCode": "NL",
                "phoneCode": 31,
                "name_en": "Netherlands"
            },
            {
                "countryCode": "NC",
                "phoneCode": 687,
                "name_en": "New Caledonia"
            },
            {
                "countryCode": "NZ",
                "phoneCode": 64,
                "name_en": "New Zealand"
            },
            {
                "countryCode": "NI",
                "phoneCode": 505,
                "name_en": "Nicaragua"
            },
            {
                "countryCode": "NE",
                "phoneCode": 227,
                "name_en": "Niger"
            },
            {
                "countryCode": "NG",
                "phoneCode": 234,
                "name_en": "Nigeria"
            },
            {
                "countryCode": "NU",
                "phoneCode": 683,
                "name_en": "Niue"
            },
            {
                "countryCode": "NF",
                "phoneCode": 672,
                "name_en": "Norfolk Island"
            },
            {
                "countryCode": "KP",
                "phoneCode": 850,
                "name_en": "North Korea"
            },
            {
                "countryCode": "MP",
                "phoneCode": 1,
                "name_en": "Northern Mariana Islands"
            },
            {
                "countryCode": "NO",
                "phoneCode": 47,
                "name_en": "Norway"
            },
            {
                "countryCode": "OM",
                "phoneCode": 968,
                "name_en": "Oman"
            },
            {
                "countryCode": "PK",
                "phoneCode": 92,
                "name_en": "Pakistan"
            },
            {
                "countryCode": "PW",
                "phoneCode": 680,
                "name_en": "Palau"
            },
            {
                "countryCode": "PS",
                "phoneCode": 970,
                "name_en": "Palestinian Authority"
            },
            {
                "countryCode": "PA",
                "phoneCode": 507,
                "name_en": "Panama"
            },
            {
                "countryCode": "PG",
                "phoneCode": 675,
                "name_en": "Papua New Guinea"
            },
            {
                "countryCode": "PY",
                "phoneCode": 595,
                "name_en": "Paraguay"
            },
            {
                "countryCode": "PE",
                "phoneCode": 51,
                "name_en": "Peru"
            },
            {
                "countryCode": "PH",
                "phoneCode": 63,
                "name_en": "Philippines"
            },
            {
                "countryCode": "PN",
                "phoneCode": 64,
                "name_en": "Pitcairn Islands"
            },
            {
                "countryCode": "PL",
                "phoneCode": 48,
                "name_en": "Poland"
            },
            {
                "countryCode": "PT",
                "phoneCode": 351,
                "name_en": "Portugal"
            },
            {
                "countryCode": "PR",
                "phoneCode": 1,
                "name_en": "Puerto Rico"
            },
            {
                "countryCode": "QA",
                "phoneCode": 974,
                "name_en": "Qatar"
            },
            {
                "countryCode": "RE",
                "phoneCode": 262,
                "name_en": "Réunion"
            },
            {
                "countryCode": "RO",
                "phoneCode": 40,
                "name_en": "Romania"
            },
            {
                "countryCode": "RU",
                "phoneCode": 7,
                "name_en": "Russia"
            },
            {
                "countryCode": "RW",
                "phoneCode": 250,
                "name_en": "Rwanda"
            },
            {
                "countryCode": "XS",
                "phoneCode": 599,
                "name_en": "Saba"
            },
            {
                "countryCode": "BL",
                "phoneCode": 590,
                "name_en": "Saint Barthélemy"
            },
            {
                "countryCode": "KN",
                "phoneCode": 1,
                "name_en": "Saint Kitts and Nevis"
            },
            {
                "countryCode": "LC",
                "phoneCode": 1,
                "name_en": "Saint Lucia"
            },
            {
                "countryCode": "MF",
                "phoneCode": 590,
                "name_en": "Saint Martin"
            },
            {
                "countryCode": "PM",
                "phoneCode": 508,
                "name_en": "Saint Pierre and Miquelon"
            },
            {
                "countryCode": "VC",
                "phoneCode": 1,
                "name_en": "Saint Vincent and the Grenadines"
            },
            {
                "countryCode": "WS",
                "phoneCode": 685,
                "name_en": "Samoa"
            },
            {
                "countryCode": "SM",
                "phoneCode": 378,
                "name_en": "San Marino"
            },
            {
                "countryCode": "ST",
                "phoneCode": 239,
                "name_en": "São Tomé and Príncipe"
            },
            {
                "countryCode": "SA",
                "phoneCode": 966,
                "name_en": "Saudi Arabia"
            },
            {
                "countryCode": "SN",
                "phoneCode": 221,
                "name_en": "Senegal"
            },
            {
                "countryCode": "RS",
                "phoneCode": 381,
                "name_en": "Serbia"
            },
            {
                "countryCode": "SC",
                "phoneCode": 248,
                "name_en": "Seychelles"
            },
            {
                "countryCode": "SL",
                "phoneCode": 232,
                "name_en": "Sierra Leone"
            },
            {
                "countryCode": "SG",
                "phoneCode": 65,
                "name_en": "Singapore"
            },
            {
                "countryCode": "XE",
                "phoneCode": 599,
                "name_en": "Sint Eustatius"
            },
            {
                "countryCode": "SX",
                "phoneCode": 1,
                "name_en": "Sint Maarten"
            },
            {
                "countryCode": "SK",
                "phoneCode": 421,
                "name_en": "Slovakia"
            },
            {
                "countryCode": "SI",
                "phoneCode": 386,
                "name_en": "Slovenia"
            },
            {
                "countryCode": "SB",
                "phoneCode": 677,
                "name_en": "Solomon Islands"
            },
            {
                "countryCode": "SO",
                "phoneCode": 252,
                "name_en": "Somalia"
            },
            {
                "countryCode": "ZA",
                "phoneCode": 27,
                "name_en": "South Africa"
            },
            {
                "countryCode": "GS",
                "phoneCode": 500,
                "name_en": "South Georgia and South Sandwich Islands"
            },
            {
                "countryCode": "SS",
                "phoneCode": 211,
                "name_en": "South Sudan"
            },
            {
                "countryCode": "ES",
                "phoneCode": 34,
                "name_en": "Spain"
            },
            {
                "countryCode": "LK",
                "phoneCode": 94,
                "name_en": "Sri Lanka"
            },
            {
                "countryCode": "SH",
                "phoneCode": 290,
                "name_en": "St Helena, Ascension, Tristan da Cunha"
            },
            {
                "countryCode": "SD",
                "phoneCode": 249,
                "name_en": "Sudan"
            },
            {
                "countryCode": "SR",
                "phoneCode": 597,
                "name_en": "Suriname"
            },
            {
                "countryCode": "SJ",
                "phoneCode": 47,
                "name_en": "Svalbard"
            },
            {
                "countryCode": "SZ",
                "phoneCode": 268,
                "name_en": "Swaziland"
            },
            {
                "countryCode": "SE",
                "phoneCode": 46,
                "name_en": "Sweden"
            },
            {
                "countryCode": "CH",
                "phoneCode": 41,
                "name_en": "Switzerland"
            },
            {
                "countryCode": "SY",
                "phoneCode": 963,
                "name_en": "Syria"
            },
            {
                "countryCode": "TW",
                "phoneCode": 886,
                "name_en": "Taiwan"
            },
            {
                "countryCode": "TJ",
                "phoneCode": 992,
                "name_en": "Tajikistan"
            },
            {
                "countryCode": "TZ",
                "phoneCode": 255,
                "name_en": "Tanzania"
            },
            {
                "countryCode": "TH",
                "phoneCode": 66,
                "name_en": "Thailand"
            },
            {
                "countryCode": "TL",
                "phoneCode": 670,
                "name_en": "Timor-Leste"
            },
            {
                "countryCode": "TG",
                "phoneCode": 228,
                "name_en": "Togo"
            },
            {
                "countryCode": "TK",
                "phoneCode": 690,
                "name_en": "Tokelau"
            },
            {
                "countryCode": "TO",
                "phoneCode": 676,
                "name_en": "Tonga"
            },
            {
                "countryCode": "TT",
                "phoneCode": 1,
                "name_en": "Trinidad and Tobago"
            },
            {
                "countryCode": "TN",
                "phoneCode": 216,
                "name_en": "Tunisia"
            },
            {
                "countryCode": "TR",
                "phoneCode": 90,
                "name_en": "Turkey"
            },
            {
                "countryCode": "TM",
                "phoneCode": 993,
                "name_en": "Turkmenistan"
            },
            {
                "countryCode": "TC",
                "phoneCode": 1,
                "name_en": "Turks and Caicos Islands"
            },
            {
                "countryCode": "TV",
                "phoneCode": 688,
                "name_en": "Tuvalu"
            },
            {
                "countryCode": "UM",
                "phoneCode": 1,
                "name_en": "US Outlying Islands"
            },
            {
                "countryCode": "VI",
                "phoneCode": 1,
                "name_en": "US Virgin Islands"
            },
            {
                "countryCode": "UG",
                "phoneCode": 256,
                "name_en": "Uganda"
            },
            {
                "countryCode": "UA",
                "phoneCode": 380,
                "name_en": "Ukraine"
            },
            {
                "countryCode": "AE",
                "phoneCode": 971,
                "name_en": "United Arab Emirates"
            },
            {
                "countryCode": "GB",
                "phoneCode": 44,
                "name_en": "United Kingdom"
            },
            {
                "countryCode": "US",
                "phoneCode": 1,
                "name_en": "United States"
            },
            {
                "countryCode": "UY",
                "phoneCode": 598,
                "name_en": "Uruguay"
            },
            {
                "countryCode": "UZ",
                "phoneCode": 998,
                "name_en": "Uzbekistan"
            },
            {
                "countryCode": "VU",
                "phoneCode": 678,
                "name_en": "Vanuatu"
            },
            {
                "countryCode": "VA",
                "phoneCode": 379,
                "name_en": "Vatican City"
            },
            {
                "countryCode": "VE",
                "phoneCode": 58,
                "name_en": "Venezuela"
            },
            {
                "countryCode": "VN",
                "phoneCode": 84,
                "name_en": "Vietnam"
            },
            {
                "countryCode": "WF",
                "phoneCode": 681,
                "name_en": "Wallis and Futuna"
            },
            {
                "countryCode": "YE",
                "phoneCode": 967,
                "name_en": "Yemen"
            },
            {
                "countryCode": "ZM",
                "phoneCode": 260,
                "name_en": "Zambia"
            },
            {
                "countryCode": "ZW",
                "phoneCode": 263,
                "name_en": "Zimbabwe"
            }
        ];
        return KASCountryPhoneCode;
    }());
    KASClient.KASCountryPhoneCode = KASCountryPhoneCode;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASForm = /** @class */ (function () {
        function KASForm() {
            // Form id, shouldn't be changed
            this.id = "";
            // Associated conversation id, shouldn't be changed
            this.conversationId = "";
            // Package id of the MiniApp, shouldn't be changed
            this.packageId = "";
            // User id who created the form, shouldn't be changed
            this.creatorId = "";
            // Form title
            this.title = "";
            // If the form is anonymous, default is false
            this.isAnonymous = false;
            // Expiry time of the form
            this.expiry = 0;
            // Version of the form, default value is 2, shouldn't be changed
            this.version = 2;
            // Who can see the summary of the form, default value is All
            this.visibility = KASClient.KASFormResultVisibility.All;
            // Who can send reminder, default value is sender
            this.allowSendReminder = KASClient.KASFormResultVisibility.Sender;
            // Denotes if multiple responses from a user are allowed or not, default is false
            this.isResponseAppended = false;
            // Denotes if participants' location is attached with the response or not, default is false
            this.isLocationRequested = false;
            // Type of the form, default is 20, shouldn't be changed
            this.type = 20;
            // Report Type of survey, default is 0, for job it should be 1
            this.reportType = 0;
            // All the questions associated with the form
            this.questions = [];
            // A list of metadata associated with the form
            this.properties = [];
        }
        KASForm.prototype.toJSON = function () {
            if (KASClient.isRenderedForWebClient()) {
                return this.toAPICompatibleJSON();
            }
            else {
                return this.toClientJSON();
            }
        };
        KASForm.prototype.toClientJSON = function () {
            var object = JSON.parse("{}");
            object["id"] = this.id;
            object["gid"] = this.conversationId;
            object["pid"] = this.packageId;
            object["creatorId"] = this.creatorId;
            object["title"] = this.title;
            object["ann"] = this.isAnonymous;
            object["exp"] = this.expiry;
            object["ver"] = this.version;
            object["vis"] = this.visibility;
            object["asr"] = this.allowSendReminder;
            object["ira"] = this.isResponseAppended;
            object["ilr"] = this.isLocationRequested;
            object["type"] = this.type;
            object["rpt"] = this.reportType;
            var questions = [];
            for (var i = 0; i < this.questions.length; i++) {
                questions.push(this.questions[i].toJSON());
            }
            object["ques"] = questions;
            var properties = [];
            for (var i = 0; i < this.properties.length; i++) {
                properties.push(this.properties[i].toJSON());
            }
            object["smd"] = properties;
            if (this.notificationSpec != null) {
                object["ns"] = JSON.parse("{}");
                if (this.notificationSpec.hasOwnProperty("addRow")) {
                    object["ns"]["addRow"] = (this.notificationSpec["addRow"]).toJSON();
                }
            }
            return object;
        };
        KASForm.prototype.toAPICompatibleJSON = function () {
            var actionBody = JSON.parse("{}");
            actionBody["title"] = this.title;
            actionBody["isAnonymous"] = this.isAnonymous;
            actionBody["expiry"] = this.expiry;
            actionBody["visibility"] = KASClient.KASFormResultVisibility[this.visibility];
            actionBody["isResponseAppended"] = this.isResponseAppended;
            actionBody["type"] = this.type;
            actionBody["reportType"] = this.reportType;
            var questions = [];
            for (var i = 0; i < this.questions.length; i++) {
                questions.push(this.questions[i].toAPICompatibleJSON());
            }
            actionBody["questions"] = questions;
            var properties = [];
            for (var i = 0; i < this.properties.length; i++) {
                properties.push(this.properties[i].toAPICompatibleJSON());
            }
            actionBody["properties"] = properties;
            var object = JSON.parse("{}");
            object["id"] = this.packageId;
            object["actionBody"] = actionBody;
            return object;
        };
        KASForm.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var form = new KASForm();
            form.json = object; // Required for debugging
            if (object.hasOwnProperty("id")) {
                form.id = object["id"];
            }
            if (object.hasOwnProperty("gid")) {
                form.conversationId = object["gid"];
            }
            if (object.hasOwnProperty("pid")) {
                form.packageId = object["pid"];
            }
            if (object.hasOwnProperty("creatorId")) {
                form.creatorId = object["creatorId"];
            }
            if (object.hasOwnProperty("title")) {
                form.title = object["title"];
            }
            if (object.hasOwnProperty("ann")) {
                form.isAnonymous = object["ann"];
            }
            form.expiry = object["exp"];
            if (object.hasOwnProperty("ver")) {
                form.version = object["ver"];
            }
            if (object.hasOwnProperty("vis")) {
                form.visibility = object["vis"];
            }
            if (object.hasOwnProperty("asr")) {
                form.allowSendReminder = object["asr"];
            }
            if (object.hasOwnProperty("ira")) {
                form.isResponseAppended = object["ira"];
            }
            if (object.hasOwnProperty("ilr")) {
                form.isLocationRequested = object["ilr"];
            }
            if (object.hasOwnProperty("type")) {
                form.type = object["type"];
            }
            if (object.hasOwnProperty("rpt")) {
                form.reportType = object["rpt"];
            }
            if (object.hasOwnProperty("ques")) {
                var questions = object["ques"];
                for (var i = 0; i < questions.length; i++) {
                    form.questions.push(KASClient.KASQuestion.fromJSON(questions[i]));
                }
            }
            if (object.hasOwnProperty("smd")) {
                var properties = object["smd"];
                for (var i = 0; i < properties.length; i++) {
                    form.properties.push(KASClient.KASFormProperty.fromJSON(properties[i]));
                }
            }
            if (object.hasOwnProperty("ns")) {
                var notification = object["ns"];
                if (notification.hasOwnProperty("addRow")) {
                    KASForm.addResponseNotificationForAddRow(form, KASClient.KASFormResponseNotificationModel.fromJson(notification["addRow"]));
                }
            }
            return form;
        };
        KASForm.addResponseNotificationForAddRow = function (form, notificationSpec) {
            if (form.notificationSpec == null) {
                form.notificationSpec = JSON.parse("{}");
            }
            form.notificationSpec["addRow"] = notificationSpec;
        };
        return KASForm;
    }());
    KASClient.KASForm = KASForm;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var FormStatus;
    (function (FormStatus) {
        FormStatus[FormStatus["Active"] = 0] = "Active";
        FormStatus[FormStatus["Closed"] = 1] = "Closed";
        FormStatus[FormStatus["Expired"] = 2] = "Expired";
    })(FormStatus = KASClient.FormStatus || (KASClient.FormStatus = {}));
    var KASFormAggregatedSummary = /** @class */ (function () {
        function KASFormAggregatedSummary() {
            // The id of the associated form, shouldn't be changed
            this.formId = "";
            this.formStatus = FormStatus.Active;
            // How many total responses were received for the form, considering multiple responses from one person
            this.totalResponseCount = 0;
            // How many participants responded on it
            this.totalParticipantsCount = 0;
            // How many in the conversation were assigned to respond to this form
            this.targetResponderCount = 0;
            this.result = [];
        }
        KASFormAggregatedSummary.prepareRS = function (object, questions) {
            var rs = [];
            for (var questionId = 0; questionId < questions.length; questionId++) {
                var questionSummary = [];
                for (var optionId = 0; optionId < questions[questionId].options.length; optionId++) {
                    if (object.hasOwnProperty(questionId + "") && object[questionId].hasOwnProperty(optionId + "")) {
                        questionSummary.push(object[questionId][optionId]);
                    }
                    else {
                        questionSummary.push(0);
                    }
                }
                rs.push(questionSummary);
            }
            return rs;
        };
        KASFormAggregatedSummary.fromJSON = function (object, questions) {
            if (object == null) {
                return null;
            }
            var summary = new KASFormAggregatedSummary();
            summary.json = object;
            if (object.hasOwnProperty("id")) {
                summary.formId = object["id"];
            }
            if (object.hasOwnProperty("st")) {
                summary.formStatus = object["st"];
            }
            if (object.hasOwnProperty("rc")) {
                summary.totalResponseCount = object["rc"];
            }
            if (object.hasOwnProperty("pc")) {
                summary.totalParticipantsCount = object["pc"];
            }
            if (object.hasOwnProperty("tc")) {
                summary.targetResponderCount = object["tc"];
            }
            if (object.hasOwnProperty("rs")) {
                summary.result = object["rs"];
            }
            else if (object.hasOwnProperty("rsps")) {
                summary.result = this.prepareRS(object["rsps"], questions);
            }
            else {
                summary.result = this.prepareRS(JSON.parse("{}"), questions);
            }
            return summary;
        };
        return KASFormAggregatedSummary;
    }());
    KASClient.KASFormAggregatedSummary = KASFormAggregatedSummary;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASFormBatchResponseUnit = /** @class */ (function () {
        function KASFormBatchResponseUnit() {
            // A unique response id, required in case of updating an existing response
            this.id = "";
            // Current response is an edit/update to a previous one
            this.isEdit = false;
            // A map of question id to answer
            // Dictionary<QuestionId: number, Answer: string>
            this.questionToAnswerMap = {};
        }
        KASFormBatchResponseUnit.prototype.toJSON = function () {
            var object = JSON.parse("{}");
            object["rid"] = this.id;
            object["iu"] = this.isEdit;
            object["rse"] = this.questionToAnswerMap;
            return object;
        };
        return KASFormBatchResponseUnit;
    }());
    KASClient.KASFormBatchResponseUnit = KASFormBatchResponseUnit;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASFormConversationType;
    (function (KASFormConversationType) {
        KASFormConversationType[KASFormConversationType["ONE_ON_ONE"] = 0] = "ONE_ON_ONE";
        KASFormConversationType[KASFormConversationType["FLAT_GROUP"] = 1] = "FLAT_GROUP";
        KASFormConversationType[KASFormConversationType["FORUM"] = 2] = "FORUM";
        KASFormConversationType[KASFormConversationType["PUBLIC_GROUP"] = 3] = "PUBLIC_GROUP";
    })(KASFormConversationType = KASClient.KASFormConversationType || (KASClient.KASFormConversationType = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASFormFlatSummary = /** @class */ (function () {
        function KASFormFlatSummary() {
            // The id of the associated form, shouldn't be changed
            this.formId = "";
            // The id of the associated conversation, shouldn't be changed
            this.conversationId = "";
            // Dictionary<UserId: string, Respones: Dictionary<QuestionId: number, Answers: Array<string>>>
            this.userIdToResponsesMap = {};
            this.isResponseAppended = false;
        }
        /**
        * Gets all the user ids who responded to the form
        * @return {string[]} list of all the responded user ids
        */
        KASFormFlatSummary.prototype.getRespondedUserIds = function () {
            return Object.keys(this.userIdToResponsesMap);
        };
        /**
        * Gets all the responses of a user against a specific question
        * @param {string} userId the unique id of the user
        * @param {string} questionId the id of the question
        * @return {[]} list of all answers given by the user for that question
        */
        KASFormFlatSummary.prototype.getQuestionResponsesForUserId = function (userId, questionId) {
            var questionResponsesString = this.userIdToResponsesMap[userId][questionId];
            var questionResponses = [];
            if (this.isResponseAppended) {
                questionResponses = JSON.parse(questionResponsesString);
            }
            else {
                questionResponses.push(questionResponsesString);
            }
            return questionResponses;
        };
        /**
        * Gets all the responses of a user to a form
        * @param {string} userId the unique id of the user
        * @return {Dictionary<QuestionId: number, Answers: Array<string>>} question id to list of answers
        */
        KASFormFlatSummary.prototype.getResponsesForUserId = function (userId) {
            var userResponses = {};
            for (var questionId in this.userIdToResponsesMap[userId]) {
                var questionResponses = this.getQuestionResponsesForUserId(userId, parseInt(questionId));
                userResponses[questionId] = questionResponses;
            }
            return userResponses;
        };
        /**
        * Gets all the responses of all the users
        * @return {Dictionary<UserId: string, Responses: Array<<Dictionary<QuestionId: string, Answer: string>>>>}
        */
        KASFormFlatSummary.prototype.getAllResponses = function () {
            var allResponses = JSON.parse("{}");
            var respondedUserIds = this.getRespondedUserIds();
            for (var i = 0; i < respondedUserIds.length; i++) {
                var userId = respondedUserIds[i];
                allResponses[userId] = [];
                // Dictionary<QuestionId: string, Answers: Array<string>>
                var userResponses = this.getResponsesForUserId(userId);
                var questionIds = Object.keys(this.userIdToResponsesMap[userId]);
                var userResponsesForFirstQuestion = this.getQuestionResponsesForUserId(userId, parseInt(questionIds[0]));
                var userResponseCount = userResponsesForFirstQuestion.length;
                for (var r = 0; r < userResponseCount; r++) {
                    var response = {};
                    for (var j = 0; j < questionIds.length; j++) {
                        var questionId = questionIds[j];
                        var answer = userResponses[questionId][r];
                        response[questionId] = answer;
                    }
                    allResponses[userId].push(response);
                }
            }
            return allResponses;
        };
        /**
        * Gets number of all responses by all users
        * @return {number} number of all responses
        */
        KASFormFlatSummary.prototype.getTotalResponseCount = function () {
            var totalResponseCount = 0;
            var allResponses = this.getAllResponses();
            for (var userId in allResponses) {
                totalResponseCount += allResponses[userId].length;
            }
            return totalResponseCount;
        };
        KASFormFlatSummary.fromJSON = function (object, isResponseAppended) {
            if (object == null) {
                return null;
            }
            var summary = new KASFormFlatSummary();
            summary.json = object; // Required for debugging
            if (object.hasOwnProperty("id")) {
                summary.formId = object["id"];
            }
            if (object.hasOwnProperty("gid")) {
                summary.conversationId = object["gid"];
            }
            if (object.hasOwnProperty("frsps")) {
                summary.userIdToResponsesMap = object["frsps"];
            }
            summary.isResponseAppended = isResponseAppended;
            return summary;
        };
        return KASFormFlatSummary;
    }());
    KASClient.KASFormFlatSummary = KASFormFlatSummary;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASFormMessageSendStatus;
    (function (KASFormMessageSendStatus) {
        // Default type
        KASFormMessageSendStatus[KASFormMessageSendStatus["Unknown"] = 0] = "Unknown";
        // Message is in transit
        KASFormMessageSendStatus[KASFormMessageSendStatus["InProgress"] = 1] = "InProgress";
        // Sending is failed
        KASFormMessageSendStatus[KASFormMessageSendStatus["Error"] = 2] = "Error";
        // Message got delivered successfully
        KASFormMessageSendStatus[KASFormMessageSendStatus["Success"] = 3] = "Success";
    })(KASFormMessageSendStatus = KASClient.KASFormMessageSendStatus || (KASClient.KASFormMessageSendStatus = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASFormProcessedSummary = /** @class */ (function () {
        function KASFormProcessedSummary() {
            // How many in the conversation did not respond
            this.nonRespondersInConversation = [];
            // How many in the conversation were assigned to respond to this form
            this.targetResponderCount = 0;
            // How many total responses were received for the form, considering multiple responses from one person
            this.totalResponseCount = 0;
            // Aggregated result for aggregative questions
            // Dictionary<QuestionId: number, Result: KASQuestionResult>
            this.results = {};
        }
        KASFormProcessedSummary.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var result = new KASFormProcessedSummary();
            result.json = object;
            if (object.hasOwnProperty("NonRespondersInGroup")) {
                result.nonRespondersInConversation = object["NonRespondersInGroup"];
            }
            if (object.hasOwnProperty("TargetResponderCount")) {
                result.targetResponderCount = object["TargetResponderCount"];
            }
            if (object.hasOwnProperty("TotalResponseCount")) {
                result.totalResponseCount = object["TotalResponseCount"];
            }
            if (object.hasOwnProperty("Results")) {
                result.results = JSON.parse("{}");
                for (var questionId in object["Results"]) {
                    var questionResult = KASClient.KASQuestionResult.fromJSON(object["Results"][questionId]);
                    if (questionResult.questionType == KASClient.KASQuestionType.SingleSelect ||
                        questionResult.questionType == KASClient.KASQuestionType.MultiSelect ||
                        questionResult.questionType == KASClient.KASQuestionType.SingleSelectExternal) {
                        result.results[questionId] = KASClient.KASOptionQuestionResult.fromJSON(object["Results"][questionId]);
                    }
                    else if (questionResult.questionType == KASClient.KASQuestionType.Numeric) {
                        result.results[questionId] = KASClient.KASNumericQuestionResult.fromJSON(object["Results"][questionId]);
                    }
                }
            }
            return result;
        };
        return KASFormProcessedSummary;
    }());
    KASClient.KASFormProcessedSummary = KASFormProcessedSummary;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASFormProperty = /** @class */ (function () {
        function KASFormProperty() {
            // Name of the metadata
            this.name = "";
            // Type of the metadata
            this.type = KASClient.KASFormPropertyType.Text;
            // Value of the metadata
            this.value = "";
        }
        KASFormProperty.prototype.getAPICompatiblePropertyType = function (type) {
            if (type == "Array") {
                return "StringList";
            }
            if (type == "Set") {
                return "StringSet";
            }
            else {
                return type;
            }
        };
        KASFormProperty.prototype.toJSON = function () {
            if (KASClient.isRenderedForWebClient()) {
                return this.toAPICompatibleJSON();
            }
            else {
                return this.toClientJSON();
            }
        };
        KASFormProperty.prototype.toClientJSON = function () {
            var object = JSON.parse('{}');
            object["n"] = this.name;
            object["t"] = this.type;
            object["v"] = this.value;
            return object;
        };
        KASFormProperty.prototype.toAPICompatibleJSON = function () {
            var object = JSON.parse('{}');
            object["name"] = this.name;
            object["type"] = this.getAPICompatiblePropertyType(KASClient.KASFormPropertyType[this.type]);
            object["value"] = this.value;
            return object;
        };
        KASFormProperty.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var property = new KASFormProperty();
            if (object.hasOwnProperty("n")) {
                property.name = object["n"];
            }
            if (object.hasOwnProperty("t")) {
                property.type = object["t"];
            }
            if (object.hasOwnProperty("v")) {
                property.value = object["v"];
            }
            return property;
        };
        return KASFormProperty;
    }());
    KASClient.KASFormProperty = KASFormProperty;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASFormPropertyFactory = /** @class */ (function () {
        function KASFormPropertyFactory() {
        }
        KASFormPropertyFactory.getAttachmentListProperty = function (selectedAttachments, name) {
            var attachmentProperty = new KASClient.KASFormProperty();
            attachmentProperty.name = name;
            attachmentProperty.type = KASClient.KASFormPropertyType.AttachmentList;
            attachmentProperty.value = JSON.stringify(selectedAttachments);
            return attachmentProperty;
        };
        return KASFormPropertyFactory;
    }());
    KASClient.KASFormPropertyFactory = KASFormPropertyFactory;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASFormPropertyType;
    (function (KASFormPropertyType) {
        // Any text is allowed as the metadata value
        KASFormPropertyType[KASFormPropertyType["Text"] = 0] = "Text";
        // Only numbers are allowed as the metadata value
        KASFormPropertyType[KASFormPropertyType["Numeric"] = 1] = "Numeric";
        // Location type as the metadata value
        KASFormPropertyType[KASFormPropertyType["Location"] = 2] = "Location";
        // Date time as the metadata value
        KASFormPropertyType[KASFormPropertyType["DateTime"] = 3] = "DateTime";
        // Array of strings as the metadata value
        KASFormPropertyType[KASFormPropertyType["Array"] = 4] = "Array";
        // Attachment path as the metadata value
        KASFormPropertyType[KASFormPropertyType["Attachment"] = 5] = "Attachment";
        // Set (unique list) of strings as the metadata value
        KASFormPropertyType[KASFormPropertyType["Set"] = 6] = "Set";
        // List of KASAttachment as metadata value
        KASFormPropertyType[KASFormPropertyType["AttachmentList"] = 7] = "AttachmentList";
    })(KASFormPropertyType = KASClient.KASFormPropertyType || (KASClient.KASFormPropertyType = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    /* THIS FILE SHOULD BE SIMILAR TO Apps/React/React/Storage/datamodels/Survey/SurveyMetadataUpdateFactory.m */
    var KASFormPropertyUpdateFactory = /** @class */ (function () {
        function KASFormPropertyUpdateFactory() {
        }
        KASFormPropertyUpdateFactory.updateValueInProperty = function (newValue, property) {
            var updateInfo = new KASClient.KASFormPropertyUpdateInfo();
            updateInfo.name = property.name;
            updateInfo.type = property.type;
            updateInfo.value = newValue;
            updateInfo.operation = KASClient.KASFormPropertyUpdateOperation.UpdateValue;
            return updateInfo;
        };
        KASFormPropertyUpdateFactory.addProperty = function (property) {
            var updateInfo = new KASClient.KASFormPropertyUpdateInfo();
            updateInfo.name = property.name;
            updateInfo.type = property.type;
            updateInfo.value = property.value;
            updateInfo.operation = KASClient.KASFormPropertyUpdateOperation.AddProperty;
            return updateInfo;
        };
        KASFormPropertyUpdateFactory.deleteProperty = function (property) {
            var updateInfo = new KASClient.KASFormPropertyUpdateInfo();
            updateInfo.name = property.name;
            updateInfo.type = property.type;
            updateInfo.operation = KASClient.KASFormPropertyUpdateOperation.DeleteProperty;
            return updateInfo;
        };
        KASFormPropertyUpdateFactory.replaceEntryInPropertyValue = function (oldEntry, newEntry, property) {
            if (property.type != KASClient.KASFormPropertyType.Array && property.type != KASClient.KASFormPropertyType.Set) {
                return null;
            }
            var updateInfo = new KASClient.KASFormPropertyUpdateInfo();
            updateInfo.name = property.name;
            updateInfo.type = property.type;
            updateInfo.value = JSON.stringify({ "o": oldEntry, "n": newEntry });
            updateInfo.operation = KASClient.KASFormPropertyUpdateOperation.ReplaceEntryInValue;
            return updateInfo;
        };
        KASFormPropertyUpdateFactory.addEntriesInPropertyValue = function (entries, property) {
            if (property.type != KASClient.KASFormPropertyType.Array && property.type != KASClient.KASFormPropertyType.Set) {
                return null;
            }
            var updateInfo = new KASClient.KASFormPropertyUpdateInfo();
            updateInfo.name = property.name;
            updateInfo.type = property.type;
            updateInfo.value = JSON.stringify(entries);
            updateInfo.operation = KASClient.KASFormPropertyUpdateOperation.AddEntriesInValue;
            return updateInfo;
        };
        KASFormPropertyUpdateFactory.deleteEntriesFromPropertyValue = function (entries, property) {
            if (property.type != KASClient.KASFormPropertyType.Array && property.type != KASClient.KASFormPropertyType.Set) {
                return null;
            }
            var updateInfo = new KASClient.KASFormPropertyUpdateInfo();
            updateInfo.name = property.name;
            updateInfo.type = property.type;
            updateInfo.value = JSON.stringify(entries);
            updateInfo.operation = KASClient.KASFormPropertyUpdateOperation.DeleteEntriesFromValue;
            return updateInfo;
        };
        return KASFormPropertyUpdateFactory;
    }());
    KASClient.KASFormPropertyUpdateFactory = KASFormPropertyUpdateFactory;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    /* THIS FILE SHOULD BE SIMILAR TO Apps/React/React/Storage/datamodels/Survey/SurveyMetadataUpdateInfo.m */
    var KASFormPropertyUpdateInfo = /** @class */ (function () {
        function KASFormPropertyUpdateInfo() {
            // Name of the metadata
            this.name = "";
            // Type of the metadata
            this.type = KASClient.KASFormPropertyType.Text;
            // Value for this update
            this.value = "";
            // Operation for this update
            this.operation = KASClient.KASFormPropertyUpdateOperation.UpdateValue;
        }
        KASFormPropertyUpdateInfo.prototype.toJSON = function () {
            var object = JSON.parse('{}');
            object["n"] = this.name;
            object["t"] = this.type;
            object["v"] = this.value;
            object["o"] = this.operation;
            return object;
        };
        return KASFormPropertyUpdateInfo;
    }());
    KASClient.KASFormPropertyUpdateInfo = KASFormPropertyUpdateInfo;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    /* THIS FILE SHOULD BE SIMILAR TO Apps/React/React/Storage/datamodels/Survey/SurveyMetadataUpdateInfo.h */
    var KASFormPropertyUpdateOperation;
    (function (KASFormPropertyUpdateOperation) {
        // Replace the old property value with a new one
        KASFormPropertyUpdateOperation[KASFormPropertyUpdateOperation["UpdateValue"] = 0] = "UpdateValue";
        // Add a whole new property
        KASFormPropertyUpdateOperation[KASFormPropertyUpdateOperation["AddProperty"] = 1] = "AddProperty";
        // Delete a whole property
        KASFormPropertyUpdateOperation[KASFormPropertyUpdateOperation["DeleteProperty"] = 2] = "DeleteProperty";
        // Replace an entry in the property value (Array type) with a new one
        KASFormPropertyUpdateOperation[KASFormPropertyUpdateOperation["ReplaceEntryInValue"] = 3] = "ReplaceEntryInValue";
        // Add entries in the property value (Array type)
        KASFormPropertyUpdateOperation[KASFormPropertyUpdateOperation["AddEntriesInValue"] = 4] = "AddEntriesInValue";
        // Delete entries from the property value (Array type)
        KASFormPropertyUpdateOperation[KASFormPropertyUpdateOperation["DeleteEntriesFromValue"] = 5] = "DeleteEntriesFromValue";
    })(KASFormPropertyUpdateOperation = KASClient.KASFormPropertyUpdateOperation || (KASClient.KASFormPropertyUpdateOperation = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASFormReaction = /** @class */ (function () {
        function KASFormReaction() {
            // Number of likes received for the form
            this.likesCount = 0;
            // Number of comments received for the form
            this.commentsCount = 0;
            // Denotes whether the current user has already liked or not
            this.didILike = false;
            // Denotes whether the current user has already liked or not
            this.didIComment = false;
            // Denotes whether to show comments or not
            this.hideComments = false;
            // Denotes whether to show likes or not
            this.hideLikes = false;
            // Denotes whether to show likes imeersive view or not
            this.hideLikesDetails = false;
        }
        KASFormReaction.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var reaction = new KASFormReaction();
            if (object.hasOwnProperty("hideComments")) {
                reaction.hideComments = object["hideComments"];
            }
            if (object.hasOwnProperty("hideLikes")) {
                reaction.hideLikes = object["hideLikes"];
            }
            // Populate like and comment data only if we have to show it
            if (!reaction.hideLikes) {
                if (object.hasOwnProperty("likesCount")) {
                    reaction.likesCount = object["likesCount"];
                }
                if (object.hasOwnProperty("didILike")) {
                    reaction.didILike = object["didILike"];
                }
                if (object.hasOwnProperty("hideLikesDetails")) {
                    reaction.hideLikesDetails = object["hideLikesDetails"];
                }
            }
            if (!reaction.hideComments) {
                if (object.hasOwnProperty("commentsCount")) {
                    reaction.commentsCount = object["commentsCount"];
                }
                if (object.hasOwnProperty("didIComment")) {
                    reaction.didIComment = object["didIComment"];
                }
            }
            return reaction;
        };
        return KASFormReaction;
    }());
    KASClient.KASFormReaction = KASFormReaction;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASFormResponse = /** @class */ (function () {
        function KASFormResponse() {
            // A unique response id, required in case of updating an existing response
            this.id = "";
            // Response message send status
            this.sendStatus = KASClient.KASFormMessageSendStatus.Unknown;
            // Response send time
            this.sendTime = 0;
            // A map for serverUrl against localUrl of all the image attachments to a response
            // Dictionary<ServerUrl: string, LocalUrl: string>
            this.serverToLocalAssetUrlMap = {};
            // A map of question id to answer
            // Dictionary<QuestionId: number, Answer: string>
            this.questionToAnswerMap = {};
        }
        KASFormResponse.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var response = new KASFormResponse();
            if (object.hasOwnProperty("response_Id_native")) {
                response.id = object["response_Id_native"];
            }
            if (object.hasOwnProperty("response_send_status")) {
                response.sendStatus = object["response_send_status"];
            }
            if (object.hasOwnProperty("response_send_time")) {
                response.sendTime = object["response_send_time"];
            }
            if (object.hasOwnProperty("response_assetmap_native")) {
                response.serverToLocalAssetUrlMap = KASClient.parseJsonObject(object["response_assetmap_native"]);
            }
            if (object.hasOwnProperty("response_payload_native")) {
                response.questionToAnswerMap = KASClient.parseJsonObject(object["response_payload_native"]);
            }
            return response;
        };
        return KASFormResponse;
    }());
    KASClient.KASFormResponse = KASFormResponse;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASFormResponseNotificationTarget;
    (function (KASFormResponseNotificationTarget) {
        KASFormResponseNotificationTarget[KASFormResponseNotificationTarget["CREATOR"] = 1] = "CREATOR";
        KASFormResponseNotificationTarget[KASFormResponseNotificationTarget["OWNERS"] = 2] = "OWNERS";
        KASFormResponseNotificationTarget[KASFormResponseNotificationTarget["GROUP"] = 3] = "GROUP";
    })(KASFormResponseNotificationTarget = KASClient.KASFormResponseNotificationTarget || (KASClient.KASFormResponseNotificationTarget = {}));
    var KASFormResponseNotificationModel = /** @class */ (function () {
        function KASFormResponseNotificationModel(messageTarget, pushTarget, messagePreview) {
            if (messageTarget === void 0) { messageTarget = null; }
            if (pushTarget === void 0) { pushTarget = null; }
            if (messagePreview === void 0) { messagePreview = null; }
            this.messagePreview = "";
            this.messageTarget = messageTarget;
            this.pushTarget = pushTarget;
            this.messagePreview = messagePreview;
        }
        KASFormResponseNotificationModel.fromJson = function (object) {
            if (object == null)
                return null;
            var notificationModel = new KASFormResponseNotificationModel();
            if (object.hasOwnProperty("mt")) {
                notificationModel.messageTarget = object["mt"];
            }
            if (object.hasOwnProperty("pt")) {
                notificationModel.pushTarget = object["pt"];
                if (object.hasOwnProperty("mp")) {
                    notificationModel.messagePreview = object["mp"];
                }
                else {
                    notificationModel.messagePreview = "";
                }
            }
            return notificationModel;
        };
        KASFormResponseNotificationModel.prototype.toJSON = function () {
            if (this.messageTarget == null)
                return null;
            var object = JSON.parse("{}");
            object["mt"] = this.messageTarget;
            if (this.pushTarget != null) {
                object["pt"] = this.pushTarget;
                if (this.messagePreview == null) {
                    object["mp"] = "";
                }
                else {
                    object["mp"] = this.messagePreview;
                }
            }
            return object;
        };
        return KASFormResponseNotificationModel;
    }());
    KASClient.KASFormResponseNotificationModel = KASFormResponseNotificationModel;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASFormResultVisibility;
    (function (KASFormResultVisibility) {
        // Form summary is visible to everyone in the conversation
        KASFormResultVisibility[KASFormResultVisibility["All"] = 0] = "All";
        // Summary is visible to only the creator of the form
        KASFormResultVisibility[KASFormResultVisibility["Sender"] = 1] = "Sender";
        // Summary is visible to all the admins of the conversation
        KASFormResultVisibility[KASFormResultVisibility["Admin"] = 2] = "Admin";
        // Summary is visible to all the member and subscribers of the conversation
        KASFormResultVisibility[KASFormResultVisibility["MembersAndSubscribers"] = 3] = "MembersAndSubscribers";
    })(KASFormResultVisibility = KASClient.KASFormResultVisibility || (KASClient.KASFormResultVisibility = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASFormUserCapabilities = /** @class */ (function () {
        function KASFormUserCapabilities() {
            this.canSendReminder = false;
            this.canRespond = false;
            this.shouldSeeSummary = false;
        }
        KASFormUserCapabilities.prototype.toJSON = function () {
            if (KASClient.isRenderedForWebClient()) {
                return this.toAPICompatibleJSON();
            }
            else {
                return this.toClientJSON();
            }
        };
        KASFormUserCapabilities.prototype.toClientJSON = function () {
            var object = JSON.parse("{}");
            object["ShoudSeeSummary"] = this.shouldSeeSummary;
            object["CanRespondToSurvey"] = this.canRespond;
            object["CanSendReminder"] = this.canSendReminder;
            return object;
        };
        KASFormUserCapabilities.prototype.toAPICompatibleJSON = function () {
            var actionBody = JSON.parse("{}");
            actionBody["ShoudSeeSummary"] = this.shouldSeeSummary;
            actionBody["CanRespondToSurvey"] = this.canRespond;
            actionBody["CanSendReminder"] = this.canSendReminder;
            var object = JSON.parse("{}");
            object["actionBody"] = actionBody;
            return object;
        };
        KASFormUserCapabilities.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var permissions = new KASFormUserCapabilities();
            permissions.json = object; // Required for debugging
            if (object.hasOwnProperty("ShoudSeeSummary")) {
                permissions.shouldSeeSummary = object["ShoudSeeSummary"];
            }
            if (object.hasOwnProperty("CanSendReminder")) {
                permissions.canSendReminder = object["CanSendReminder"];
            }
            if (object.hasOwnProperty("CanRespondToSurvey")) {
                permissions.canRespond = object["CanRespondToSurvey"];
            }
            return permissions;
        };
        return KASFormUserCapabilities;
    }());
    KASClient.KASFormUserCapabilities = KASFormUserCapabilities;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASImageAttachment = /** @class */ (function (_super) {
        __extends(KASImageAttachment, _super);
        function KASImageAttachment() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.hasSetThumbnail = false;
            _this.generateThumbnailServerUrl = false;
            _this.thumbnailServerUrl = "";
            _this.width = 0;
            _this.height = 0;
            _this.thumbnail = "";
            return _this;
        }
        KASImageAttachment.prototype.toJSON = function () {
            var object = _super.prototype.toJSON.call(this);
            object["iw"] = this.width;
            object["ih"] = this.height;
            object["th"] = this.hasSetThumbnail;
            object["turl"] = this.thumbnailServerUrl;
            object["gts"] = this.generateThumbnailServerUrl;
            object["tib"] = this.thumbnail;
            return object;
        };
        KASImageAttachment.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var attachment = new KASImageAttachment();
            this.populateModelFromJSON(attachment, object);
            return attachment;
        };
        KASImageAttachment.populateModelFromJSON = function (attachment, object) {
            _super.populateModelFromJSON.call(this, attachment, object);
            attachment.type = KASClient.KASAttachmentType.Image;
            if (object.hasOwnProperty("tib")) {
                attachment.thumbnail = object["tib"];
            }
            if (object.hasOwnProperty("th")) {
                attachment.hasSetThumbnail = object["th"];
            }
            if (object.hasOwnProperty("turl")) {
                attachment.thumbnailServerUrl = object["turl"];
            }
            if (object.hasOwnProperty("gts")) {
                attachment.generateThumbnailServerUrl = object["gts"];
            }
            if (object.hasOwnProperty("iw")) {
                attachment.width = object["iw"];
            }
            if (object.hasOwnProperty("ih")) {
                attachment.height = object["iw"];
            }
        };
        return KASImageAttachment;
    }(KASClient.KASAttachment));
    KASClient.KASImageAttachment = KASImageAttachment;
})(KASClient || (KASClient = {}));
/// <reference path="./KASQuestionConfig.ts" />
var KASClient;
(function (KASClient) {
    var ImagePickerSource;
    (function (ImagePickerSource) {
        // All sources (Gallery, Camera) will be shown in picker
        ImagePickerSource[ImagePickerSource["All"] = 0] = "All";
        // Only Camera will be shown in picker, by default front camera will launch
        ImagePickerSource[ImagePickerSource["CameraFront"] = 1] = "CameraFront";
        // Only Camera will be shown in picker, by default back camera will launch
        ImagePickerSource[ImagePickerSource["CameraBack"] = 2] = "CameraBack";
    })(ImagePickerSource = KASClient.ImagePickerSource || (KASClient.ImagePickerSource = {}));
    var KASImageQuestionConfig = /** @class */ (function (_super) {
        __extends(KASImageQuestionConfig, _super);
        function KASImageQuestionConfig() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.imageSource = ImagePickerSource.All;
            return _this;
        }
        KASImageQuestionConfig.prototype.toJSON = function () {
            var object = _super.prototype.toJSON.call(this);
            object[KASImageQuestionConfig.IMAGE_SOURCE_KEY] = this.imageSource;
            return object;
        };
        KASImageQuestionConfig.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var config = KASClient.KASQuestionConfig.fromJSON(object);
            var imageConfig = new KASImageQuestionConfig();
            imageConfig.pageBreakEnabled = config.pageBreakEnabled;
            if (object.hasOwnProperty(KASImageQuestionConfig.IMAGE_SOURCE_KEY)) {
                imageConfig.imageSource = object[KASImageQuestionConfig.IMAGE_SOURCE_KEY];
            }
            return imageConfig;
        };
        // Config to denote what picker sources to show in image type question
        KASImageQuestionConfig.IMAGE_SOURCE_KEY = "is";
        return KASImageQuestionConfig;
    }(KASClient.KASQuestionConfig));
    KASClient.KASImageQuestionConfig = KASImageQuestionConfig;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASLocation = /** @class */ (function () {
        function KASLocation() {
            // Latitude of the location
            this.latitude = 0;
            // Longitude of the location
            this.longitude = 0;
            // Name of the location
            this.placeName = "";
            // Address of the location
            this.placeAddress = "";
        }
        KASLocation.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var location = new KASLocation();
            if (object.hasOwnProperty("lt")) {
                location.latitude = object["lt"];
            }
            if (object.hasOwnProperty("lg")) {
                location.longitude = object["lg"];
            }
            if (object.hasOwnProperty("n")) {
                location.placeName = object["n"];
            }
            if (object.hasOwnProperty("a")) {
                location.placeAddress = object["a"];
            }
            return location;
        };
        KASLocation.prototype.toJSON = function () {
            var object = JSON.parse("{}");
            object["lt"] = this.latitude;
            object["lg"] = this.longitude;
            object["n"] = this.placeName;
            object["a"] = this.placeAddress;
            return object;
        };
        return KASLocation;
    }());
    KASClient.KASLocation = KASLocation;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var UrlType;
    (function (UrlType) {
        UrlType[UrlType["Current"] = 0] = "Current";
        UrlType[UrlType["Fixed"] = 1] = "Fixed"; // A fixed url value will be shared irrespective of current window.location
    })(UrlType = KASClient.UrlType || (KASClient.UrlType = {}));
    var UrlAction;
    (function (UrlAction) {
        UrlAction[UrlAction["None"] = 0] = "None";
        UrlAction[UrlAction["Share"] = 1] = "Share";
        UrlAction[UrlAction["OpenInBrowser"] = 2] = "OpenInBrowser"; // 'Open in Browser' option will be available in toolbar actions
    })(UrlAction = KASClient.UrlAction || (KASClient.UrlAction = {}));
    var KASNativeToolbarProperties = /** @class */ (function () {
        function KASNativeToolbarProperties() {
            this.icon = null;
            this.title = null;
            this.subtitle = null;
            this.fixedUrl = null;
            this.urlType = UrlType.Current;
            this.urlAction = UrlAction.None;
        }
        KASNativeToolbarProperties.prototype.toJSON = function () {
            var object = JSON.parse("{}");
            if (this.icon) {
                object["icon"] = this.icon;
            }
            if (this.title) {
                object["title"] = this.title;
            }
            if (this.subtitle) {
                object["subtitle"] = this.subtitle;
            }
            if (this.fixedUrl) {
                object["fixedUrl"] = this.fixedUrl;
            }
            object["urlType"] = this.urlType;
            object["urlAction"] = this.urlAction;
            return object;
        };
        return KASNativeToolbarProperties;
    }());
    KASClient.KASNativeToolbarProperties = KASNativeToolbarProperties;
})(KASClient || (KASClient = {}));
/// <reference path="./KASQuestionResult.ts" />
var KASClient;
(function (KASClient) {
    var KASNumericQuestionResult = /** @class */ (function (_super) {
        __extends(KASNumericQuestionResult, _super);
        function KASNumericQuestionResult() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // For Numeric questions the aggregated result will be sum, and average of all the responses
            _this.sum = 0;
            _this.average = 0;
            return _this;
        }
        KASNumericQuestionResult.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var questionResult = KASClient.KASQuestionResult.fromJSON(object);
            var numericQuestionResult = new KASNumericQuestionResult();
            numericQuestionResult.questionTitle = questionResult.questionTitle;
            numericQuestionResult.questionType = questionResult.questionType;
            numericQuestionResult.questionId = questionResult.questionId;
            if (object.hasOwnProperty("Sum")) {
                numericQuestionResult.sum = object["Sum"];
            }
            if (object.hasOwnProperty("Average")) {
                numericQuestionResult.average = object["Average"];
            }
            return numericQuestionResult;
        };
        return KASNumericQuestionResult;
    }(KASClient.KASQuestionResult));
    KASClient.KASNumericQuestionResult = KASNumericQuestionResult;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASO365User = /** @class */ (function () {
        function KASO365User() {
            this.displayName = "";
            this.givenName = "";
            this.surname = "";
            this.jobTitle = "";
            this.email = "";
            this.mobilePhone = "";
            this.businessPhones = [];
        }
        KASO365User.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var user = new KASO365User();
            if (object.hasOwnProperty("displayName")) {
                user.displayName = object["displayName"];
            }
            if (object.hasOwnProperty("givenName")) {
                user.givenName = object["givenName"];
            }
            if (object.hasOwnProperty("surname")) {
                user.surname = object["surname"];
            }
            if (object.hasOwnProperty("jobTitle")) {
                user.jobTitle = object["jobTitle"];
            }
            if (object.hasOwnProperty("email")) {
                user.email = object["email"];
            }
            if (object.hasOwnProperty("mobilePhone")) {
                user.mobilePhone = object["mobilePhone"];
            }
            if (object.hasOwnProperty("businessPhones")) {
                user.businessPhones = JSON.parse(object["businessPhones"]);
            }
            return user;
        };
        return KASO365User;
    }());
    KASClient.KASO365User = KASO365User;
})(KASClient || (KASClient = {}));
/// <reference path="./KASQuestionResult.ts" />
var KASClient;
(function (KASClient) {
    var KASOptionQuestionResult = /** @class */ (function (_super) {
        __extends(KASOptionQuestionResult, _super);
        function KASOptionQuestionResult() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // For SingleSelect/MultiSelect question, the result will be option id versus their counts
            // Dictionary<OptionId: number, OptionResult: KASOptionResult>
            _this.optionResults = {};
            return _this;
        }
        /**
        * Gets all the option ids sorted in their total responses count (descending)
        * @return {number[]} list of all the option ids
        */
        KASOptionQuestionResult.prototype.getResultsOrder = function () {
            var _this = this;
            var allOptionIds = Object.keys(this.optionResults);
            allOptionIds.sort(function (id1, id2) {
                var responseCount1 = _this.optionResults[id1].totalResponsesCount;
                var responseCount2 = _this.optionResults[id2].totalResponsesCount;
                return (responseCount2 - responseCount1);
            });
            var allOptionIdNumbers = [];
            for (var i = 0; i < allOptionIds.length; i++) {
                allOptionIdNumbers.push(parseInt(allOptionIds[i]));
            }
            return allOptionIdNumbers;
        };
        KASOptionQuestionResult.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var questionResult = KASClient.KASQuestionResult.fromJSON(object);
            var optionQuestionResult = new KASOptionQuestionResult();
            optionQuestionResult.questionTitle = questionResult.questionTitle;
            optionQuestionResult.questionType = questionResult.questionType;
            optionQuestionResult.questionId = questionResult.questionId;
            if (object.hasOwnProperty("OptionResults")) {
                optionQuestionResult.optionResults = JSON.parse("{}");
                for (var optionId in object["OptionResults"]) {
                    optionQuestionResult.optionResults[optionId] = KASClient.KASOptionResult.fromJSON(object["OptionResults"][optionId]);
                }
            }
            return optionQuestionResult;
        };
        return KASOptionQuestionResult;
    }(KASClient.KASQuestionResult));
    KASClient.KASOptionQuestionResult = KASOptionQuestionResult;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASOptionResult = /** @class */ (function () {
        function KASOptionResult() {
            // Title of the option
            this.optionTitle = "";
            // Index of the option
            this.optionId = 0;
            // How many have chosen this option
            this.totalResponsesCount = 0;
            // A map of user ids against their response count
            // Dictionary<UserId: string, ResponseCount: number>
            this.responderToResponseCount = {};
        }
        KASOptionResult.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var optionResult = new KASOptionResult();
            if (object.hasOwnProperty("AnswerText")) {
                optionResult.optionTitle = object["AnswerText"];
            }
            if (object.hasOwnProperty("AnsId")) {
                optionResult.optionId = object["AnsId"];
            }
            if (object.hasOwnProperty("TotalResponsesCount")) {
                optionResult.totalResponsesCount = object["TotalResponsesCount"];
            }
            if (object.hasOwnProperty("Responders")) {
                optionResult.responderToResponseCount = JSON.parse("{}");
                var totalResponsesCount = 0;
                for (var i in object["Responders"]) {
                    var responderJson = object["Responders"][i];
                    var responderId = responderJson["Id"];
                    var responseCount = responderJson["ResponseCount"];
                    totalResponsesCount += responseCount;
                    optionResult.responderToResponseCount[responderId] = responseCount;
                }
                if (totalResponsesCount != optionResult.totalResponsesCount) {
                    optionResult.totalResponsesCount = totalResponsesCount;
                }
            }
            return optionResult;
        };
        return KASOptionResult;
    }());
    KASClient.KASOptionResult = KASOptionResult;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASPhoneNumber = /** @class */ (function () {
        function KASPhoneNumber(countryPhoneCode, phoneNumber) {
            if (countryPhoneCode === void 0) { countryPhoneCode = 0; }
            if (phoneNumber === void 0) { phoneNumber = ""; }
            this.countryPhoneCode = 0;
            this.phoneNumber = "";
            this.countryPhoneCode = countryPhoneCode;
            this.phoneNumber = phoneNumber;
        }
        KASPhoneNumber.fromJSON = function (phoneNumberReponseJSON) {
            if (phoneNumberReponseJSON == null) {
                return null;
            }
            var response = new KASPhoneNumber();
            if (phoneNumberReponseJSON.hasOwnProperty("cc")) {
                response.countryPhoneCode = phoneNumberReponseJSON["cc"];
            }
            if (phoneNumberReponseJSON.hasOwnProperty("pn")) {
                response.phoneNumber = phoneNumberReponseJSON["pn"];
            }
            return response;
        };
        KASPhoneNumber.prototype.toJSON = function () {
            var jsonResponse = JSON.parse("{}");
            jsonResponse["cc"] = this.countryPhoneCode;
            jsonResponse["pn"] = this.phoneNumber;
            return jsonResponse;
        };
        KASPhoneNumber.prototype.toString = function () {
            return "+" + this.countryPhoneCode + " " + this.phoneNumber;
        };
        return KASPhoneNumber;
    }());
    KASClient.KASPhoneNumber = KASPhoneNumber;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASQuestion = /** @class */ (function () {
        function KASQuestion() {
            // Index of the question, starts with 0
            this.id = 0;
            // Title of the question
            this.title = "";
            // Type of the question
            this.type = KASClient.KASQuestionType.None;
            // Configuration/behaviour of a question
            this.config = null;
            // Display type of the question's options
            this.displayType = KASClient.KASQuestionDisplayType.None;
            // Denotes if the question should be invisible to the responder, default is false
            this.isInvisible = false;
            // Denotes if the question can be edited by the responder, default is true
            this.isEditable = true;
            // Denotes if the question will be skipped from all sorts of reporting
            this.isExcludedFromReporting = false;
            // Denotes if it's mandatory to respond to this question
            this.isResponseOptional = false;
            // List of options for the question
            this.options = [];
            // Validation rules of a question - JSON of rule(s), error string and help string
            this.valif = null;
            // Visibility rules of a question - rule string
            this.visif = null;
        }
        KASQuestion.prototype.getAPICompatibleQuestionType = function (type) {
            if (type == "SingleSelect") {
                return "SingleOption";
            }
            if (type == "MultiSelect") {
                return "MultiOption";
            }
            if (type == "SingleSelectExternal") {
                return "SingleOptionExternal";
            }
            if (type == "DateOnly") {
                return "Date";
            }
            else {
                return type;
            }
        };
        KASQuestion.prototype.toJSON = function () {
            if (KASClient.isRenderedForWebClient()) {
                return this.toAPICompatibleJSON();
            }
            else {
                return this.toClientJSON();
            }
        };
        KASQuestion.prototype.toClientJSON = function () {
            var object = JSON.parse("{}");
            object["id"] = this.id;
            object["title"] = this.title;
            object["type"] = this.type;
            object["invis"] = this.isInvisible;
            object["editable"] = this.isEditable;
            object["er"] = this.isExcludedFromReporting;
            object["dt"] = this.displayType;
            object["optl"] = this.isResponseOptional;
            if (this.config != null) {
                object["cfg"] = JSON.stringify(this.config.toJSON());
            }
            if (this.valif != null) {
                object["valif"] = JSON.stringify(this.valif.toJSON());
            }
            if (this.visif != null) {
                object["visif"] = JSON.stringify(this.visif.toJSON());
            }
            if (this.options.length > 0) {
                var questions = [];
                for (var i = 0; i < this.options.length; i++) {
                    questions.push(this.options[i].toJSON());
                }
                object["opts"] = questions;
            }
            return object;
        };
        KASQuestion.prototype.toAPICompatibleJSON = function () {
            var object = JSON.parse("{}");
            object["title"] = this.title;
            object["type"] = this.getAPICompatibleQuestionType(KASClient.KASQuestionType[this.type]);
            object["isInvisible"] = this.isInvisible;
            if (this.options.length > 0) {
                var questions = [];
                for (var i = 0; i < this.options.length; i++) {
                    questions.push(this.options[i].toAPICompatibleJSON());
                }
                object["options"] = questions;
            }
            return object;
        };
        KASQuestion.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var question = new KASQuestion();
            if (object.hasOwnProperty("id")) {
                question.id = object["id"];
            }
            if (object.hasOwnProperty("title")) {
                question.title = object["title"];
            }
            if (object.hasOwnProperty("type")) {
                question.type = object["type"];
            }
            if (object.hasOwnProperty("invis")) {
                question.isInvisible = object["invis"];
            }
            if (object.hasOwnProperty("editable")) {
                question.isEditable = object["editable"];
            }
            if (object.hasOwnProperty("er")) {
                question.isExcludedFromReporting = object["er"];
            }
            if (object.hasOwnProperty("dt")) {
                question.displayType = object["dt"];
            }
            if (object.hasOwnProperty("optl")) {
                question.isResponseOptional = object["optl"];
            }
            if (object.hasOwnProperty("cfg")) {
                var config = JSON.parse(object["cfg"]);
                switch (question.type) {
                    case KASClient.KASQuestionType.Image:
                        question.config = KASClient.KASImageQuestionConfig.fromJSON(config);
                        break;
                    case KASClient.KASQuestionType.AttachmentList:
                        question.config = KASClient.KASAttachmentListQuestionConfig.fromJSON(config);
                        break;
                    default:
                        question.config = KASClient.KASQuestionConfig.fromJSON(config);
                        break;
                }
            }
            else {
                switch (question.type) {
                    case KASClient.KASQuestionType.Image:
                        question.config = new KASClient.KASImageQuestionConfig();
                        break;
                    default:
                        question.config = new KASClient.KASQuestionConfig();
                        break;
                }
            }
            if (object.hasOwnProperty("opts")) {
                var options = object["opts"];
                for (var i = 0; i < options.length; i++) {
                    question.options.push(KASClient.KASQuestionOption.fromJSON(options[i]));
                }
            }
            if (object.hasOwnProperty("valif")) {
                var valObj = JSON.parse(object["valif"]);
                if (Object.keys(valObj).length > 0)
                    question.valif = KASClient.KASValidationRule.fromJSON(valObj);
            }
            if (object.hasOwnProperty("visif")) {
                var visObj = JSON.parse(object["visif"]);
                if (Object.keys(visObj).length > 0)
                    question.visif = KASClient.KASVisibilityRule.fromJSON(visObj);
            }
            return question;
        };
        KASQuestion.prototype.validateResponse = function (response) {
            var validationResponse = new KASQuestionValidationResponse();
            if (this.valif == null || this.valif.rule == null) {
                validationResponse.success = true;
            }
            else {
                var jsonLogicRule = this.valif.rule;
                var responseObj = JSON.parse("{}");
                responseObj.response = response;
                validationResponse.success = KASClient.isDataValidAgainstRule(jsonLogicRule, responseObj);
                if (!validationResponse.success) {
                    validationResponse.errorMsg = this.valif.errorString;
                }
            }
            return validationResponse;
        };
        return KASQuestion;
    }());
    KASClient.KASQuestion = KASQuestion;
    var KASQuestionValidationResponse = /** @class */ (function () {
        function KASQuestionValidationResponse() {
            this.errorMsg = null;
            this.success = false;
        }
        return KASQuestionValidationResponse;
    }());
    KASClient.KASQuestionValidationResponse = KASQuestionValidationResponse;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASQuestionDisplayType;
    (function (KASQuestionDisplayType) {
        // Default type
        KASQuestionDisplayType[KASQuestionDisplayType["None"] = -1] = "None";
        // Options are to be shown in drop-down display style
        KASQuestionDisplayType[KASQuestionDisplayType["DropDown"] = 0] = "DropDown";
        // Multiple options can be selected from the list of options
        KASQuestionDisplayType[KASQuestionDisplayType["RadioButton"] = 1] = "RadioButton";
    })(KASQuestionDisplayType = KASClient.KASQuestionDisplayType || (KASClient.KASQuestionDisplayType = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASQuestionOption = /** @class */ (function () {
        function KASQuestionOption() {
            // Index of the option, starts with 0
            this.id = 0;
            // Title of the option
            this.text = "";
            // Additional image url (optional)
            this.pictureUrl = null;
        }
        KASQuestionOption.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var questionOption = new KASQuestionOption();
            if (object.hasOwnProperty("id")) {
                questionOption.id = object["id"];
            }
            if (object.hasOwnProperty("at")) {
                questionOption.text = object["at"];
            }
            if (object.hasOwnProperty("ap")) {
                questionOption.pictureUrl = object["ap"];
            }
            return questionOption;
        };
        KASQuestionOption.prototype.toJSON = function () {
            if (KASClient.isRenderedForWebClient()) {
                return this.toAPICompatibleJSON();
            }
            else {
                return this.toClientJSON();
            }
        };
        KASQuestionOption.prototype.toClientJSON = function () {
            var object = JSON.parse("{}");
            object["id"] = this.id;
            object["at"] = this.text;
            if (this.pictureUrl) {
                object["ap"] = this.pictureUrl;
            }
            return object;
        };
        KASQuestionOption.prototype.toAPICompatibleJSON = function () {
            var object = JSON.parse("{}");
            object["title"] = this.text;
            if (this.pictureUrl) {
                object["pictureUrl"] = this.pictureUrl;
            }
            return object;
        };
        return KASQuestionOption;
    }());
    KASClient.KASQuestionOption = KASQuestionOption;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASQuestionType;
    (function (KASQuestionType) {
        // Default type
        KASQuestionType[KASQuestionType["None"] = -1] = "None";
        // Only one option can be selected from the list of options
        KASQuestionType[KASQuestionType["SingleSelect"] = 0] = "SingleSelect";
        // Multiple options can be selected from the list of options
        KASQuestionType[KASQuestionType["MultiSelect"] = 1] = "MultiSelect";
        // Any text can be the answer to the question
        KASQuestionType[KASQuestionType["Text"] = 2] = "Text";
        // Only numbers can be a valid answer to the question
        KASQuestionType[KASQuestionType["Numeric"] = 3] = "Numeric";
        // User's current location will be attached as the answer
        KASQuestionType[KASQuestionType["Location"] = 4] = "Location";
        // Date time type answer
        KASQuestionType[KASQuestionType["DateTime"] = 5] = "DateTime";
        // Answer will be an image attachment
        KASQuestionType[KASQuestionType["Image"] = 6] = "Image";
        // Single select type, but each question's options are dependent upon the choice of the previous one
        KASQuestionType[KASQuestionType["SingleSelectExternal"] = 7] = "SingleSelectExternal";
        // Attachment List type answer
        KASQuestionType[KASQuestionType["AttachmentList"] = 8] = "AttachmentList";
        // Phone Number Type
        KASQuestionType[KASQuestionType["PhoneNumber"] = 9] = "PhoneNumber";
        // Date Type
        KASQuestionType[KASQuestionType["DateOnly"] = 10] = "DateOnly";
    })(KASQuestionType = KASClient.KASQuestionType || (KASClient.KASQuestionType = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASUser = /** @class */ (function () {
        function KASUser() {
            // Unique user id
            this.id = "";
            // Name of the user ("You" for the current user)
            this.name = "";
            // Not considering "You"
            this.originalName = "";
            // Profile picture url of the user
            this.pictureUrl = "";
            // Phone number of the user
            this.phoneNumber = "";
            // In case the PictureUrl is not there, we should use the users initials as the profile pic, below two members are for that
            this.pictureBGColor = "";
            this.pictureInitials = "";
        }
        KASUser.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var user = new KASUser();
            var idField = null;
            if (object.hasOwnProperty("id")) {
                idField = object["id"];
            }
            else if (object.hasOwnProperty("uId")) {
                idField = object["uId"];
            }
            if (idField) {
                if (idField.lastIndexOf("USR_", 0) == 0) {
                    user.id = idField.substring(4); // Ignoring USR_
                }
                else {
                    user.id = idField;
                }
            }
            if (object.hasOwnProperty("name")) {
                user.name = object["name"];
            }
            if (object.hasOwnProperty("originalName")) {
                user.originalName = object["originalName"];
            }
            if (object.hasOwnProperty("pictureUrl")) {
                user.pictureUrl = object["pictureUrl"];
            }
            if (object.hasOwnProperty("phoneNumber")) {
                user.phoneNumber = object["phoneNumber"];
            }
            if (object.hasOwnProperty("pictureBGColor")) {
                user.pictureBGColor = object["pictureBGColor"];
            }
            if (object.hasOwnProperty("pictureInitials")) {
                user.pictureInitials = object["pictureInitials"];
            }
            return user;
        };
        return KASUser;
    }());
    KASClient.KASUser = KASUser;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASValidationRule = /** @class */ (function () {
        function KASValidationRule() {
            //sample json - { "rule" : {">" : [2, {"var" : "response"}, 100]},
            // "errMsg" : "<error to display>",
            // "helpTxt" : "<ghost text for the response>",
            // "minValue" : 2
            // "minValue" : 100 }
            //Validation rule definition
            this.rule = {};
            // String to display in case of invalid input - mostly string identifier(optional)
            this.errorString = null;
            // Help text to display(optional)
            this.helpText = null;
            // contains all other attributes like minValue, maxValue, allowOnlyIntegers
            this.attributes = {};
        }
        KASValidationRule.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var validationObj = new KASValidationRule();
            if (object.hasOwnProperty("rule")) {
                validationObj.rule = JSON.parse(JSON.stringify(object["rule"]).replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
            }
            if (object.hasOwnProperty("errMsg")) {
                validationObj.errorString = object["errMsg"];
            }
            if (object.hasOwnProperty("helpText")) {
                validationObj.helpText = object["helpText"];
            }
            if (object.hasOwnProperty("minValue")) {
                validationObj.attributes.minValue = object["minValue"];
            }
            if (object.hasOwnProperty("maxValue")) {
                validationObj.attributes.maxValue = object["maxValue"];
            }
            if (object.hasOwnProperty("allowOnlyIntegers")) {
                validationObj.attributes.allowOnlyIntegers = object["allowOnlyIntegers"];
            }
            return validationObj;
        };
        KASValidationRule.prototype.toJSON = function () {
            var object = JSON.parse("{}");
            object["rule"] = this.rule;
            if (this.errorString)
                object["errMsg"] = this.errorString;
            if (this.helpText)
                object["helpText"] = this.helpText;
            var attributes = JSON.parse(this.attributes);
            object["attributes"] = attributes;
            return object;
        };
        return KASValidationRule;
    }());
    KASClient.KASValidationRule = KASValidationRule;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASVideoAttachment = /** @class */ (function (_super) {
        __extends(KASVideoAttachment, _super);
        function KASVideoAttachment() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.thumbnail = "";
            _this.duration = 0;
            _this.streamingPath = "";
            return _this;
        }
        KASVideoAttachment.prototype.toJSON = function () {
            var object = _super.prototype.toJSON.call(this);
            object["tib"] = this.thumbnail;
            object["adr"] = this.duration;
            object["strpu"] = this.streamingPath;
            return object;
        };
        KASVideoAttachment.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var attachment = new KASVideoAttachment();
            this.populateModelFromJSON(attachment, object);
            return attachment;
        };
        KASVideoAttachment.populateModelFromJSON = function (attachment, object) {
            _super.populateModelFromJSON.call(this, attachment, object);
            attachment.type = KASClient.KASAttachmentType.Video;
            if (object.hasOwnProperty("tib")) {
                attachment.thumbnail = object["tib"];
            }
            if (object.hasOwnProperty("adr")) {
                attachment.duration = object["adr"];
            }
            if (object.hasOwnProperty("strpu")) {
                attachment.streamingPath = object["strpu"];
            }
        };
        return KASVideoAttachment;
    }(KASClient.KASAttachment));
    KASClient.KASVideoAttachment = KASVideoAttachment;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASVisibilityRule = /** @class */ (function () {
        function KASVisibilityRule() {
            //sample json - { "rule" : {"==" : [2, {"var" : "question.1"}]},
            //    "qId" : 1,
            //    "opId" : 2 }
            // ==> make this question visible if Question 1's response is equal to option 2.
            //Visibility rule definition - jsonLogic expression
            this.rule = {};
            // ID of the question the current question is dependent on
            // Currently portal supports only dependency on 1 question at a time - can be extended to array of IDs in future.
            this.dependencyQuestionId = "";
            // Option to be selected for the question ID above to make the current question visible
            this.optionId = "";
        }
        KASVisibilityRule.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var visibilityObj = new KASVisibilityRule();
            if (object.hasOwnProperty("rule")) {
                visibilityObj.rule = JSON.parse(JSON.stringify(object["rule"]).replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
            }
            if (object.hasOwnProperty("qId")) {
                visibilityObj.dependencyQuestionId = object["qId"];
            }
            if (object.hasOwnProperty("opId")) {
                visibilityObj.optionId = object["opId"];
            }
            return visibilityObj;
        };
        KASVisibilityRule.prototype.toJSON = function () {
            var object = JSON.parse("{}");
            object["rule"] = this.rule;
            object["qId"] = this.dependencyQuestionId;
            object["opId"] = this.optionId;
            return object;
        };
        return KASVisibilityRule;
    }());
    KASClient.KASVisibilityRule = KASVisibilityRule;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var NotificationPriority;
    (function (NotificationPriority) {
        NotificationPriority[NotificationPriority["High"] = 0] = "High";
        NotificationPriority[NotificationPriority["Medium"] = 1] = "Medium";
        NotificationPriority[NotificationPriority["Low"] = 2] = "Low";
    })(NotificationPriority = KASClient.NotificationPriority || (KASClient.NotificationPriority = {}));
})(KASClient || (KASClient = {}));
// Below lines will be executed after loading of KASClient SDK.
KASClient.Internal.setDocumentDomain();
KASClient.Internal.setFontSizeMultiplier();
KASClient.Internal.initialiseKASClientStrings();
KASClient.Internal.setTimeFormat();
