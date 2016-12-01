// ==UserScript==
// @name         DailyWTF Comment Cleaner
// @namespace    https://github.com/masterX244
// @version      0.1
// @description  Sterilize TDWTF Comments
// @author       Mike Unfried
// @match        http://thedailywtf.com/articles/comments/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $(".comments > .comment").css({maxHeight: '24em', overflow: 'auto' });
    $(".comments > .comment img").css({'height': '2px', 'width': '2px'});
})();
