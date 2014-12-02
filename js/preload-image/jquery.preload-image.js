var PreloadImage = (function () { var file, folder; try { file = (function () { var scr = document.getElementsByTagName('script'); var file = scr[scr.length - 1].getAttribute("src"); return file; })(); folder = file.substring(0, file.lastIndexOf('/') + 1); } catch (ex) { file = location.pathname; folder = file.substring(0, file.lastIndexOf('/') + 1); } return folder; })();

(function ($) {
    $.fn.PreloadImage = function (options) {

        var folder = PreloadImage;
        var settings = $.extend({
            loader: "~/img/icon/preloader/64.gif",
            width: '',
            height: '',
            url: ''
        }, options);
        var guid = (function () { function key() { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); } return function () { return key() + key() + '-' + key() + '-' + key() + '-' + key() + '-' + key() + key() + key(); }; })();
        var showPreloader = function (element) {
            $(element).stop().hide().fadeIn({
                duration: 300,
                easing: 'swing',
                complete: function () {
                    $(this).stop().show();
                    var _element = $("img[guid='" + $(this).attr('for-guid') + "']");
                    var _img = $(this).attr('img-url');
                    loadPreview(_element, _img);
                }
            });
        };
        var hidePreloader = function (element) {
            $(element).stop().show().fadeOut({
                duration: 300,
                easing: 'swing',
                complete: function () {
                    var _element = $("img[guid='" + $(this).attr('for-guid') + "']");
                    $(this).stop().remove();
                    showPreview(_element);
                }
            });
        };
        var loadPreview = function (element, url) {
            $(element).unbind('load').stop().hide().attr('src', url).bind({
                'load': function (event) {
                    $(this).unbind('load');
                    var _element = $("img[for-guid='" + $(this).attr('guid') + "']");
                    hidePreloader(_element);
                }
            });
        };
        var showPreview = function (element) {
            $(element).unbind('load').stop().hide().fadeIn({
                duration: 300,
                easing: 'swing',
                complete: function () {
                    $(this).stop().show();
                }
            });
        };
        var hidePreview = function (element) {
            $(element).unbind('load').stop().show().fadeOut({
                duration: 300,
                easing: 'swing',
                complete: function () {
                    $(this).hide().stop();
                    var _element = $("img[for-guid='" + $(this).attr('guid') + "']");
                    showPreloader(_element);
                }
            });
        };
        settings.loader = settings.loader.replace('~/', folder);
        return this.each(function () {
            var _attr, _loader, _guid;
            if ($(this).is('img')) {
                _attr = $.trim($(this).attr('guid'));

                if ((typeof _attr !== typeof undefined && _attr !== false) || _attr == '') {
                    $(this).attr('guid', guid());
                }
                _guid = $(this).attr('guid');
                _loader = $("img[for-guid='" + _guid + "']");
                if (_loader.length < 1) {
                    _loader = $(this).clone(true).attr({
                        'src': settings.loader,
                        'width': settings.width,
                        'height': settings.height,
                        'img-url': settings.url,
                        'for-guid': _guid,
                        'guid': ''
                    }).hide().insertAfter($(this));
                } else {
                    _loader = _loader.get(0);
                }
                if ($(this).is(':visible') && $(this).attr('src') != '') {
                    $(_loader).hide();
                    hidePreview($(this));
                } else {
                    $(this).hide();
                    $(_loader).show();
                    loadPreview($(this), settings.url);
                }
            }
        });
    };
}(jQuery));