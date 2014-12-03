var AcoesImagem = function (url) {
    var _clone = $('.preview.model').clone().removeClass('model').appendTo($('.preview.model'));
    $('.preview.model').after(_clone);
    $(_clone).find('img').PreloadImage({
        'url': url + '?datetime=' + (new Date()).getTime()
    });
    $(_clone).find('a').click(function (event) {
        var _next = $(this).parent().next().not('.model, .trash');
        var _prev = $(this).parent().prev().not('.model, .trash');
        $(this).parent().addClass('trash').stop().fadeOut({
            duration: 300,
            easing: 'swing',
            complete: function () {
                $(this).remove();
            }
        });
        if (_next.length > 0) {
            _next.find('a').focus();
        } else if (_prev.length > 0) {
            _prev.find('a').focus();
        } else {
            $('input:text').focus();
        }
        return false;
    });    
};

jQuery(document).ready(function ($) {
    $('form').submit(function () {
        AcoesImagem($('input:text').val());
        $('input:text').val('').focus();
        return false;
    });
    $('button:reset').click(function () {
        $('.preview a').click();
        $('input:text').focus();
    });
    $('input:text').focus();
});