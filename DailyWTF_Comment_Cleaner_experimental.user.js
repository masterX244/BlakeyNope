// ==UserScript==
// @name         DailyWTF Comment Cleaner
// @namespace    https://github.com/masterX244
// @version      0.1
// @description  Sterilize TDWTF Comments. Experimental Edition with untested changes. May not work
// @author       Mike Unfried
// @match        http://thedailywtf.com/articles/comments/*
// @grant        none
// ==/UserScript==

// Creates a case-insensitive version of the ':contains' selector
jQuery.expr[':'].Contains = jQuery.expr.createPseudo(function(arg) {
    return function ( elem ) {
        return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});
(function() {
    'use strict';
    var names = ['B L A K E Y R A T','b?keyrat','blameyrat','Fuck you alex','bläkeyrat','blockyrat','Ulysses','B lALye key RraBlaRAT',
                 'Bla-key-rat','blaKEY RaT','CHARLIEMOUSE','blakeyrat','BonkeyRatt','BarfyRoot',
                'bakedrat'];
    var nameList = '';
    var i;
    for (i = 0; i < names.length; i++) {
        if (i > 0) nameList += ", ";
        nameList += "span.poster:Contains('" + names[i] + "')";
    }
    var illegalText = ['this website sucks', 'delete this fucking website'];
    var textList = '';
    for(i = 0; i < illegalText.lenth; i++) {
        if (i > 0) textList += ", ";
        textList += "div:Contains('" + illegalText[i] + "')";
    }
    $(".comments > .comment").css({maxHeight: '20em', overflow: 'auto' });
    $(".comments > .comment img").css("display", "none");
    $("li.comment").filter(function(index) {
        var hasIllegalText = false;
        for(var i = 0; i < illegalText.length; i++) {
            if($(this).find(":Contains('" + illegalText[i] + "')").length > 0)
                hasIllegalText = true;
        }
        return (
            ($(this).children(nameList).length > 0 || hasIllegalText) &&
            $(this).children("span.poster-anon:contains('(unregistered)')").length > 0);
    }).hide();
})();
