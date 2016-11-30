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
    var names = ['B L A K E Y R A T','Blakeyrat','b?keyrat','blameyrat','Fuck you alex','bläkeyrat','blockyrat','Ulysses','B lALye key RraBlaRAT','B lALye key RraBlaRAT',
                 'Bla-key-rat','blaKEY RaT','CHARLIEMOUSE','TenshiNo','b l a k e y r a t','blakeyrat','BonkeyRatt','BarfyRoot',
                'bakedrat'];
    var contains = '';
    for (var i = 0; i < names.length; i++) {
        if (i > 0) contains += ", ";
        contains += "span.poster:contains('" + names[i] + "')";
    }
    //.comments>.comment { max-height:20em; overflow-y:auto; }
    $(".comments > .comment").css({maxHeight: '20em', overflow: 'auto' });
    //.comments>.comment>div>img{display:none}
    $(".comments > .comment > div > img").css("display", "none");
    $("li.comment").filter(function(index) {
        return (
            $(this).children(contains).length > 0 &&
            $(this).children("span.poster-anon:contains('(unregistered)')").length > 0);
    }).hide();
    $(function(){
        $('*').remove('img[src*="meatspin"]');
    });
})();
