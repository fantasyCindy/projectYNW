/*
 * 滑块
 * 
new track({
    container: $element,
    ratio: 12.5,
    style: "ynui-bg-red"
}).render();

 */

require('./track.css')

var track = function(ops) {
    _.extend(this, ops)
}

track.prototype = {
    container: null,
    ratio: 0,
    height: 8,
    trackColor: "#ddd",
    trainColor: "red",
    style: "",
    render: function() {
        var self = this;
        var id = _.now();
        var tag = function() {
            var fgColor = ""
            if (self.style) {
                fgColor = self.style.replace('bg-', '');
            }
            return `<div class="ynui-track-item">
                        <div class="ynui-track" style="height:${self.height}px;background:${self.trackColor};">
                            <div id="${id}-train" class="ynui-train ${self.style}" style="width:0%;background:${self.trainColor};height:${self.height}px;"></div>
                        </div>
                        <div class="ynui-track-text ${fgColor}" id="${id}-text">${self.ratio}%</div>
                    </div>`
        }()
        this.container.append(tag);
        $("#" + id + "-train").velocity({ 'width': this.ratio + "%" }, { duration: "500" });
    }
}

module.exports = {
    track: track
}
