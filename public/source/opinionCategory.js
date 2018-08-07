var total = __total / 10;
var href = location.href;
var pmatch = href.match(/([0-9])+.htm$/)
var tmatch = href.match(/\/opinion\/category\/([0-9]+)/)
if (!(pmatch && tmatch && _.inRange(pmatch[1], total) && _.inRange(pmatch[1], total))) {
    location.href = '${path}/opinion/category/1/1.htm';
}
$(function() {
    var pagination = yn.bootpag('.left')
    pagination.bootpag({ page: pmatch[1], total: total })
})