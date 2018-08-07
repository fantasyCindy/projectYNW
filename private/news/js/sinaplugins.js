/*新浪股票插件*/
(function ($) {
    $.liveTheStock = {
        StockData: {
            asia: {
                data: [
                ["s_sh000001", "上证综指", "http://image.sinajs.cn/newchart/hollow/small/nsh000001.gif", "cn"],
                ["s_sz399001", "深证成指", "http://image.sinajs.cn/newchart/hollow/small/nsz399001.gif", "cn"],
                ["s_sh000300", "沪深300", "http://image.sinajs.cn/newchart/hollow/small/nsh000300.gif", "cn"],
                ["hkHSI", "恒生指数", "http://image.sinajs.cn/newchart/hk_stock/min_hollow/HSI.gif", "hk"],
                ["b_NKY", "日经指数", "http://image.sinajs.cn/newchart/futures/forex/min5_m_hollow/NIXI.gif", "bb"]
            ], url: "s_sh000001,s_sz399001,s_sh000300,CFF_IF1306,hkHSI,b_NKY"
            }, america: {
                data: [
                    ["gb_dji", "道琼斯", "http://image.sinajs.cn/newchart/usstock/min_idx_py/dji.gif", "us"],
                    ["gb_ixic", "纳斯达克", "http://image.sinajs.cn/newchart/usstock/min_idx_py/ixic.gif", "us"],
                    ["gb_inx", "标普500", "http://image.sinajs.cn/newchart/usstock/min_idx_py/inx.gif", "us"]
                ], url: "gb_dji,gb_ixic,gb_inx"
            }, europe: {
                data: [
                ["b_UKX", "英金融时报指数", "http://image.sinajs.cn/newchart/futures/forex/min5_m_hollow/FT100.gif", "bb"],
                ["b_DAX", "德国DAX指数", "", "bb"],
                ["b_CAC", "法CAC40指数", "", "bb"]
            ], url: "b_UKX,b_DAX,b_CAC"
            }, futures: {
                data: [
                  ["hf_GC", "黄金", "http://image.sinajs.cn/newchart/futures/global/mins_hollow/GC.gif", "fu"],
                  ["hf_CL", "NYMEX原油", "http://image.sinajs.cn/newchart/futures/global/mins_hollow/CL.gif", "fu"],
                  ["hf_CAD", "LME铜", "http://image.sinajs.cn/newchart/futures/global/mins_hollow/CAD.gif", "fu"],
                  ["hf_SI", "白银", "", "fu"],
                  ["hf_S", "CBOT黄豆", "", "fu"]
                ], url: "hf_GC,hf_CL,hf_CAD,hf_SI,hf_S"
            }, forex: {
                data: [
                    ["USDCNY", "美元人民币", "http://image.sinajs.cn/newchart/futures/forex/min30_hollow/USDCNY.gif", "forex"],
                    ["EURUSD", "欧元美元", "", "forex"],
                    ["USDJPY", "美元日元", "", "forex"],
                    ["GBPUSD", "英镑美元", "", "forex"],
                    ["DINIW", "美元指数", "", "forex"]
                ], url: "USDCNY,EURUSD,USDJPY,GBPUSD,DINIW"
            }
        }, willCalculate: function (data, type) {
            var value;
            var riseValue;
            var ratio;
            var type;
            switch (type) {
                case "cn":
                    value = (data[1] * 1).toFixed(2);
                    riseValue = (data[2] * 1) > 0 ? "+" + (data[2] * 1).toFixed(2) : (data[2] * 1).toFixed(2);
                    ratio = (data[3] * 1) > 0 ? "+" + data[3] + "%" : data[3] + "%";
                    type = (data[2] * 1) > 0 ? true : false;
                    break;
                case "hk":
                    value = (data[6] * 1).toFixed(2);
                    riseValue = (data[7] * 1) > 0 ? "+" + (data[7] * 1).toFixed(2) : (data[7] * 1).toFixed(2);
                    ratio = (data[8] * 1) > 0 ? "+" + data[8] + "%" : data[8] + "%";
                    type = (data[7] * 1) > 0 ? true : false;
                    break;
                case "bb":
                    value = (data[1] * 1).toFixed(2);
                    riseValue = (data[2] * 1) > 0 ? "+" + (data[2] * 1).toFixed(2) : (data[2] * 1).toFixed(2);
                    ratio = (data[3] * 1) > 0 ? "+" + data[3] + "%" : data[3] + "%";
                    type = (data[2] * 1) > 0 ? true : false;
                    break;
                case "us":
                    value = (data[1] * 1).toFixed(2);
                    riseValue = (data[4] * 1) > 0 ? "+" + (data[4] * 1).toFixed(2) : (data[4] * 1).toFixed(2);
                    ratio = (data[2] * 1) > 0 ? "+" + data[2] + "%" : data[2] + "%";
                    type = (data[2] * 1) > 0 ? true : false;
                    break;
                case "fu":
                    var change = data[0] - data[7];
                    value = (data[0] * 1).toFixed(2);
                    riseValue = (change * 1) > 0 ? "+" + (change * 1).toFixed(2) : (change * 1).toFixed(2);
                    ratio = (change * 1) > 0 ? ["+", (change / data[7] * 100).toFixed(2), "%"].join("") : [(change / data[7] * 100).toFixed(2), "%"].join("");
                    type = (change * 1) > 0 ? true : false;
                    break;
                case "gzqh":
                    var change = data[3] - data[14];
                    value = (data[3] * 1).toFixed(2);
                    riseValue = (change * 1) > 0 ? "+" + (change * 1).toFixed(2) : (change * 1).toFixed(2);
                    ratio = (change * 1) > 0 ? ["+", (change / data[14] * 100).toFixed(2), "%"].join("") : [(change / data[14] * 100).toFixed(2), "%"].join("");
                    type = (change * 1) > 0 ? true : false;
                    break;
                case "npqh":
                    var change = data[8] - data[10];
                    value = (data[8] * 1).toFixed(2);
                    riseValue = (change * 1) > 0 ? "+" + (change * 1).toFixed(2) : (change * 1).toFixed(2);
                    ratio = (change * 1) > 0 ? ["+", (change / data[10] * 100).toFixed(2), "%"].join("") : [(change / data[10] * 100).toFixed(2), "%"].join("");
                    type = (change * 1) > 0 ? true : false;
                    break;
                case "forex":
                    var change = data[8] - data[3];
                    value = (data[8] * 1).toFixed(2);
                    riseValue = (change * 1) > 0 ? "+" + (change * 1).toFixed(4) : (change * 1).toFixed(4);
                    ratio = (change * 1) > 0 ? ["+", (change / data[3] * 100).toFixed(4), "%"].join("") : [(change / data[3] * 100).toFixed(4), "%"].join("");
                    type = (change * 1) > 0 ? true : false;
                    break;
            }
            return [value, riseValue, ratio, type];
        }, init: function () {
            //加载js数据

            $.ajax({
                dataType: "script",
                cache: true,
                url: "http://hq.sinajs.cn/rn=" + (new Date()).getTime() + "&list=" + $.liveTheStock.StockData.asia.url,
                success: function (data) {

                    $.liveTheStock.generateCode("asia", $.liveTheStock.StockData.asia.data, true);
                }
            });
            //在生成html
            //this.generateCode("america", this.StockData.america.data, false);
            //this.generateCode("europe", this.StockData.europe.data, false);
            //this.generateCode("forex", this.StockData.forex.data, false);
            //this.generateCode("futures", this.StockData.futures.data, false);
        }, generateCode: function (divName, list, show) {
            var length = $("#panel_" + divName).length;
            if (length > 0) {
                return null;
            }
            $("#stockDiv div[stockType='true']").hide();
            /*var html = "<div class=\"market_con\" id=\"panel_" + divName + "\" " + (show ? "" : "style=\"display:none;\"") + " ><ul>";
            $.each(list, function (i, data) {
                var code = window["hq_str_" + data[0]];
                var model = $.liveTheStock.willCalculate(code.split(","), data[3]);
                var calss = model[3] ? "font_red" : "font_green";
                html += "<li class=\"margin_b5\" id=\"code_" + data[0] + "\" stockName=\"" + data[1] + "\" stockType=\"" + data[3] + "\" ><span class=\"width_60\">" + data[1] + "</span>"
                     + "<span class=\"width_60 " + calss + "\">" + model[0] + "</span>"
                     + "<span class=\"width_60 " + calss + "\">" + model[1] + "</span>"
                     + "<span class=\"width_60 " + calss + "\">" + model[2] + "</span>";
                if (data[2] != undefined && data[2].length > 0) {
                    html += "<div class=\"mapdata\" " + ((i == 0 && show) ? "stockType=\"true\"" : "style=\"display:none;\"") + " sUrl=\"" + data[2] + "\"  ><img style=\"width:280px; height:120px;\" src=\"" + data[2] + "?" + (new Date()).getTime() + "\" /></div>";
                }
                html += "</li>";

            });
            html += "</ul><div class=\"clear\"></div></div>";*/
            var html = "<div id=\"keyIndex\" >";
            $.each(list, function (i, data) {
                var code = window["hq_str_" + data[0]];
                var model = $.liveTheStock.willCalculate(code.split(","), data[3]);
                var calss = model[3] ? "value red" : "value green";
	            html += "<div class=\"item\">";
	            html += "<span class=\"title\" id=\"keyIndex_sh\">"+data[1]+"</span>";
	            if(i==0){
		            html += "<div class=\"values select\">";
	            }else{
	            	 html += "<div class=\"values\">";
	            }
	            //html += "<div class=\"value title\">"+data[1]+"</div>";
	            html += "<div class=\""+calss+"\">" + model[0] + "</div>";
	            html += "<div class=\""+calss+"\">" + model[1] + "</div>";
	            html += "<div class=\""+calss+"\">" + model[2] + "</div>";
                if (data[2] != undefined && data[2].length > 0) {
		            html += "<div class=\"imgw\"><img src=\"" + data[2] + "?" + (new Date()).getTime() + "\"></div>";
                }
                 html += "</div>";
	            html += "</div>";
                this._pollingImg = window.setInterval(function () {
                    var stok_this = $("#stockDiv div[stockType='true']");
                    stok_this.attr("sUrl",data[2]);
                    var url = stok_this.attr("sUrl");
                    console.log(url)
                    stok_this.find("img").attr("src", url + "?" + (new Date()).getTime());
                }, 6000);
                
            });
            
            $("#stockDiv").append(html);
        }, getStockData: function (name) {
            switch (name) {
                case "america":
                    return this.StockData.america;
                    break;
                case "europe":
                    return this.StockData.europe;
                    break;
                case "forex":
                    return this.StockData.forex;
                    break;
                case "futures":
                    return this.StockData.futures;
                    break;
                case "asia":
                    return this.StockData.asia;
                    break;
            }
        }
    };

    $.livePolling = {
        _pollingID: null,
        _pollingImg: null,
        init: function () {
            this._pollingID = window.setInterval(function () {
                $.livePolling.incidentPolling();
            }, 6000);
            $("#stockDiv").on("mouseover",".item",function () {
                var _length = $(this).find("img").length;
                if (_length > 0) {
                    $("#stockDiv .item .values").removeAttr("stockType").hide();
                    $(this).find(".values").attr("stockType", "true").show();
                }
            });

            

            $("#stockColumn li").click(function () {
                var _this = $(this);
                var name = _this.attr("id");
                $("#stockColumn li").removeClass("market_tit_stop");
                _this.addClass("market_tit_stop");
                var length = $("#panel_" + name).length;
                if (length <= 0) {
                    var stock = $.liveTheStock;
                    var data = stock.getStockData(name);
                    $.ajax({
                        dataType: "script",
                        cache: true,
                        url: "http://hq.sinajs.cn/rn=" + (new Date()).getTime() + "&list=" + data.url,
                        success: function (model) {
                            stock.generateCode(name, data.data, true);
                            $("#stockDiv .market_con").hide();
                            $("#panel_" + name).show();
                        }
                    });
                } else {
                    $("#stockDiv .market_con").hide();
                    $("#panel_" + name).show();
                    $("#stockDiv div[stockType='true']").hide();
                    $("#panel_" + name).find(".mapdata").eq(0).mouseover();
                    $("#panel_" + name).find(".mapdata").eq(0).show();
                }
            });

        }, clearInit: function () {
            window.clearInterval(this._pollingID);
        }, incidentPolling: function () {
            var _thisColumn = $("#stockDiv .market_tit_stop");
            var _id = _thisColumn.attr("id");
            var list = "";
            var url = "";
            var dataList = new Array();
            var length = $("#panel_" + _id + " li").length;
            if (length <= 0) {
                return null;
            }
            $.each($("#panel_" + _id + " li"), function (i, model) {
                var li_id = $(this).attr("id");
                li_id = li_id.replace("code_", "");
                list += li_id + ",";
                dataList[i] = { id: li_id, type: $(this).attr("stockType"), name: $(this).attr("stockName") };
            });
            if (list != undefined && list != "") {
                url = "http://hq.sinajs.cn/rn=" + (new Date()).getTime() + "&list=" + list;
            } else {
                return null;
            }
            $.ajax({
                dataType: "script",
                cache: true,
                url: url,
                success: function (data) {
                    $.livePolling.stockHtml(dataList);
                }
            });


        }, stockHtml: function (data) {
            $.each(data, function (i, model) {
                var live = $.liveTheStock;
                var code = window["hq_str_" + model.id];
                var itme = live.willCalculate(code.split(","), model.type);
                //更改显示代码
                var calss = itme[3] ? "font_red" : "font_green";
                var html = "<span class=\"width_60\">" + model.name + "</span>"
                     + "<span class=\"width_60 " + calss + "\">" + itme[0] + "</span>"
                     + "<span class=\"width_60 " + calss + "\">" + itme[1] + "</span>"
                     + "<span class=\"width_60 " + calss + "\">" + itme[2] + "</span>";
                $("#code_" + model.id).find("span").remove();
                $("#code_" + model.id).prepend(html);

            });
        }
    };
})(jQuery);

$(function () {
    $.liveTheStock.init();
    $.livePolling.init();
});


