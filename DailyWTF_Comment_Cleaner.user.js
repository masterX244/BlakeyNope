// ==UserScript==
// @name         DailyWTF Comment Cleaner
// @namespace    https://github.com/masterX244
// @version      0.3
// @description  Sterilize TDWTF Comments.
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
    var illegalText = ['this website sucks', 'delete this fucking website','FUCKING WEBSITE'];
    var names = ['B L A K E Y R A T','b?keyrat','blameyrat','Fuck you alex','bläkeyrat','blockyrat','Ulysses','B lALye key RraBlaRAT',
                 'Bla-key-rat','blaKEY RaT','CHARLIEMOUSE','blakeyrat','BonkeyRatt','BarfyRoot',
                'bakedrat','b!L ??? Ake ySD RATTT'];
    var nameList = '';
    var i;
    for (i = 0; i < names.length; i++) {
        if (i > 0) nameList += ", ";
        nameList += "span.poster:Contains('" + names[i] + "')";
    }
    $(".comments > .comment").css({maxHeight: '24em', overflow: 'auto' });
    $(".comments > .comment img").css({width: '2px', height: '2px', border: '1px solid blue'});
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
