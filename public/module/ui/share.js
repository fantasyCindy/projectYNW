var tag = `<div class="bdsharebuttonbox" data-tag="share_questionDetail">
                <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
                <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
                <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
            </div>`

var share = function() {
    return {
        init: function() {
            $('body').append(tag);

            window._bd_share_config = {
                common: {
                    onBeforeClick: function(cmd, config) {
                        config.bdText = + '--【约投顾】';
                        config.bdDesc = + '--【约投顾】';
                        return config
                    },
                    onAfterClick: function(cmd) {
                        $('.bdsharebuttonbox').hide();
                    }
                },
                share: {
                    "bdSize": 24,
                    "bdStyle": 1,
                    "bdCustomStyle": "/public/css/all.css"
                }
            }

        }
    }
}()
