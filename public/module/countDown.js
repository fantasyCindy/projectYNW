require('./countDown.css')

///////////////////////////////////////////////////////////////////////////

var create = data => {
    return `<div class="countDown">
        <div class="wrap">
            <div class="times">
                <span class="time day"></span>
                <span class="time hour"></span>
                <span class="time minute"></span>
                <span class="time second"></span>
            </div>
        </div>
    </div>`
}

module.exports = {
    render(container) {
        container.append(create())
        var $wrap = container.find('.countDown')
        var $day = $wrap.find('.day')
        var $hour = $wrap.find('.hour')
        var $minute = $wrap.find('.minute')
        var $second = $wrap.find('.second')


        var last = {} // 上次信息

        var target = Date.parse('2017/04/24 18:00:00')
        if (target < _.now()) return;

        var update = function() {
            var now = _.now()

            if (target < now) return;

            var offset = (target - now) / 1000

            var day = Math.floor(offset / 86400)
            offset -= day * 86400

            var hour = Math.floor(offset / 3600)
            offset -= hour * 3600

            var minute = Math.floor(offset / 60)
            offset -= minute * 60

            var second = Math.floor(offset)

            var val_day = _.padLeft(day, 2, '0');
            var val_hour = _.padLeft(hour, 2, '0');
            var val_minute = _.padLeft(minute, 2, '0');

            if (val_day != last.day) {
                $day.text(val_day)
                last.day = val_day
            }
            if (val_hour != last.hour) {
                $hour.text(val_hour)
                last.hour = val_hour
            }
            if (val_minute != last.minute) {
                $minute.text(val_minute)
                last.minute = val_minute
            }

            $second.text(_.padLeft(second, 2, "0"))
        }

        update()
        setInterval(function() {
            update()
        }, 1000)
    }
}


console.log("---")