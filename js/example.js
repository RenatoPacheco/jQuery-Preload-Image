jQuery(document).ready(function ($) {
    $('button').click(function () {
        $('#imagem').PreloadImage({
            'url': $('input:text').val() + '?datetime=' + (new Date()).getTime()
        });
        return false;
    });
});