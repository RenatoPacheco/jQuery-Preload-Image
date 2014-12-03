var AcoesImagem = function (url) {
    var _clone = $('.preview.model').clone().removeClass('model').appendTo($('.preview.model'));
    $('.preview.model').after(_clone);
    $(_clone).find('img').PreloadImage({
        'url': url + '?datetime=' + (new Date()).getTime()
    });
    $(_clone).find('a').click(function (event) {
        $(this).parent().stop().fadeOut({
            duration: 300,
            easing: 'swing',
            complete: function () {
                $(this).remove();
            }
        });
    });    
};

jQuery(document).ready(function ($) {
    $('form').submit(function () {
        AcoesImagem($('input:text').val());
        $('input:text').val('');
        return false;
    });
    $('button:reset').click(function () {
        $('.preview a').click();
    });
});