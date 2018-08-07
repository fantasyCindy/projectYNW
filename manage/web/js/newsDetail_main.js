if (!isMobile) {
    requirejs.config({
        baseUrl: stock_base + "/web/js",
        shim: {
            'bootpag': {
                deps: ['jquery'],

            }
        },
        paths: {
            'domReady': "domReady",
            "jquery": "jquery-1.10.min",
            "template": "template",
            "lodash": "lodash.min",
            'bootpag': "bootpage",
            'news': "newsDetail",
        }
    })

    requirejs(['domReady', "jquery", 'news'], function(doc, $, news) {
        $(document).ready(function() {
            news.init();
        })
    })
}
