// This is where it all goes :)

$(document).ready(function () {

    ;( function( $, window, document, undefined )
    {
        'use strict';

        var elSelector      = '#navigation',
            $element        = $( elSelector );

        if( !$element.length ) return true;

        var elHeight        = 0,
            elTop           = 0,
            $document       = $( document ),
            dHeight         = 0,
            $window         = $( window ),
            wHeight         = 0,
            wScrollCurrent  = 0,
            wScrollBefore   = 0,
            wScrollDiff     = 0,
            hasHero         = false;

        $window.on( 'scroll', function()
        {
            elHeight        = $element.outerHeight();
            dHeight         = $document.height();
            wHeight         = $window.height();
            wScrollCurrent  = $window.scrollTop();
            wScrollDiff     = wScrollBefore - wScrollCurrent;
            elTop           = parseInt( $element.css( 'top' ) ) + wScrollDiff;

            hasHero         = $('body').find('.jumbotron.navbar-spacing');

            if( wScrollCurrent <= 0 ) // scrolled to the very top; element sticks to the top
            {
                $element.css( 'top', 0 );
                if(hasHero.length >= 1)
                    $element.addClass('navbar-dark').removeClass('navbar-light navbar-changed');
                else
                    $element.addClass('navbar-light').removeClass('navbar-dark navbar-changed');
            }

            else if( wScrollDiff > 0 ) // scrolled up; element slides in
            {
                $element.css( 'top', elTop > 0 ? 0 : elTop );
                $element.addClass('navbar-light navbar-changed').removeClass('navbar-dark');
                if(hasHero.length >= 1)
                    console.log('if')
                else
                    console.log('else')
                    //$element.addClass('navbar-light').removeClass('navbar-dark navbar-changed');
            }

            else if( wScrollDiff < 0 ) // scrolled down
            {
                if( wScrollCurrent + wHeight >= dHeight - elHeight )  // scrolled to the very bottom; element slides in
                    $element.css( 'top', ( elTop = wScrollCurrent + wHeight - dHeight ) < 0 ? elTop : 0 );

                else // scrolled down; element slides out
                    $element.css( 'top', Math.abs( elTop ) > elHeight ? -elHeight : elTop );
            }

            wScrollBefore = wScrollCurrent;
        });

    })( jQuery, window, document );

});