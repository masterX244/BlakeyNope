// ==UserScript==
// @name         DailyWTF Comment Cleaner
// @namespace    https://github.com/masterX244
// @version      0.4.1
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
    var illegalText = ['this website sucks', 'delete this fucking website','FUCKING WEBSITE'];
    var names = ['B L A K E Y R A T','b?keyrat','blameyrat','Fuck you alex','bläkeyrat','blockyrat','B lALye key RraBlaRAT',
                 'Bla-key-rat','blaKEY RaT','CHARLIEMOUSE','blakeyrat','BonkeyRatt','BarfyRoot',
                'bakedrat','b!L ??? Ake ySD RATTT'];
    var nameList = '';
    var i;
    for (i = 0; i < names.length; i++) {
        if (i > 0) nameList += ", ";
        nameList += "span.poster:Contains('" + names[i] + "')";
    }
        // Set max-height for comments (prevents anyone from "taking over" the page with a paste-bomb.
    $(".comments > .comment").css({maxHeight: '24em', overflow: 'auto' });
    // Hides all images, pending a mouse over
    var images = $(".comments > .comment img");
    images.hide();
    images.each(function() {
        //$(this).prop("title", $(this).prop("src"));
        var img = $(this);
        var parent = img.parent();
        img.detach();
        var c = $("<span>", { css: { display: 'inline', position: 'relative' } } );
        var msg = $("<span>", { css: { fontSize: '0.8em', padding: '4px', cursor: 'pointer', border: '1px solid blue' } } );
        msg.append("Image");
        c.append(msg);
        c.append(img);
        parent.append(c);
        var tooltip = $("<span>", { css: { zIndex: '1000', display: 'none', padding: '2px', backgroundColor: 'white', border: '1px solid gray' } } );
        tooltip.append(img.prop("src"));
        c.append(tooltip);
        var msgPos = msg.position();
        var msgHt = msg.outerHeight();
        c.hover(function () {
            tooltip.css( { position: 'absolute', top: msgPos.top + msgHt, left: msgPos.left } );
            tooltip.fadeIn('fast');
        }, function () {
            tooltip.fadeOut('fast');
        });
        msg.on("click", function () {
            msg.slideUp('fast');
            img.slideDown('fast');
        });
    });
    // Now, we're going to "filter" comments containing the garbage that *rat frequently spams.
    var badComments = $("li.comment").filter(function(index) {
        var hasIllegalText = false;
        for(var i = 0; i < illegalText.length; i++) {
            if($(this).find(":Contains('" + illegalText[i] + "')").length > 0)
                hasIllegalText = true;
        }
        return (
            ($(this).children(nameList).length > 0 || hasIllegalText) &&
            $(this).children("span.poster-anon:contains('(unregistered)')").length > 0);
    });
    badComments.each(function(idx, key) {
        var p = $(this);
        var cmt = p.find("div[itemprop='text']");
        cmt.hide();
        var hdnMsg = $("<div>", { css: { padding: '4px', backgroundColor: 'silver', color: 'black', cursor: 'pointer', marginTop: '4px' } } );
        var posterName = p.find("span.poster").text();
        hdnMsg.append('Comment has been hidden due to content or poster name. Click to expand, but do so at your own peril...');
        hdnMsg.appendTo(p);
        hdnMsg.on("click", function() {
            hdnMsg.slideUp('fast');
            cmt.slideDown('fast');
        });
    });
})();
