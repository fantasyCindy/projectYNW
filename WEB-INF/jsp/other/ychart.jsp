<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <title>数据分析图</title>
        <link rel="stylesheet" href="/public/manage/ychart/common.css">
        <link rel="stylesheet" href="/public/manage/ychart/ychart.css?v=20170518144011">
    </head>

    <body>
        <div id="ycharts">
            <div class="title-1">约投顾数据统计</div>
            <div class="theme-option">
                <span class="theme-item snow" data-type="snow" title="雪白"></span>
                <span class="theme-item grid" data-type="grid" title="网格"></span>
                <span class="theme-item dark" data-type="dark" title="暗黑"></span>
            </div>
            <div class="data-sum top">
                <table>
                    <thead>
                        <tr class="thead">
                            <td>概况</td>
                            <td>注册用户数</td>
                            <td>订单个数</td>
                            <td>观点个数</td>
                            <td>回答问题</td>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <!-- charts-menu -->
            <div class="charts-menu">
                <div class="item register" data-key="register">注册分析</div>
                <div class="item order" data-key="order">订单分析</div>
                <div class="item live" data-key="live">直播分析</div>
                <div class="item article" data-key="article">观点分析</div>
                <div class="item ask" data-key="ask">问股分析</div>
                <div class="item teacher" data-key="teacher">投顾分析</div>
            </div>
            <div class="charts-detail">
                <!-- 注册分析 -->
                <div class="chart-register charts-detail-child">
                    <div class="chart-info">
                        <div class="detail-title">注册分析</div>
                        <div class="detail-sum">
                            <table>
                                <thead>
                                    <tr class="thead">
                                        <td>累计注册</td>
                                        <td>累计内部</td>
                                        <td>昨日注册</td>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                    <div class="chart-tab"></div>
                    <div id="chart-register-container"></div>
                </div>
                <!-- 订单分析 -->
                <div class="chart-order charts-detail-child">
                    <div class="chart-info">
                        <div class="detail-title">订单分析</div>
                        <div class="detail-sum">
                            <table>
                                <thead>
                                    <tr class="thead">
                                        <td></td>
                                        <td>订单个数</td>
                                        <td>订单金额</td>
                                        <td>人数</td>
                                        <td>人均消费</td>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                    <div class="chart-tab">
                        <div class="tab-items category-type">
                            <div class="tab-item order_cnt active" data-key="order_cnt">订单个数</div>
                            <div class="tab-item actual_price" data-key="actual_price">订单金额</div>
                            <div class="tab-item avg" data-key="avg">人均消费</div>
                        </div>
                    </div>
                    <div id="chart-order-container"></div>
                    <div id="chart-order-pies">
                        <div id="chart-order-pie-1"></div>
                        <div id="chart-order-pie-2"></div>
                    </div>
                </div>
                <!-- 直播分析 -->
                <div class="chart-live charts-detail-child">
                    <div class="chart-info">
                        <div class="detail-title">直播分析</div>
                        <div class="detail-sum">
                            <table>
                                <thead>
                                    <tr class="thead">
                                        <td></td>
                                        <td>直播总数</td>
                                        <td>直播人气</td>
                                        <td>参与人次</td>
                                        <td>互动人数</td>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                    <div class="chart-tab">
                        <div class="tab-items category-type">
                            <div class="tab-item broadcasting_cnt active" data-key="broadcasting_cnt">直播总数</div>
                            <div class="tab-item broadcasting_pv" data-key="broadcasting_pv">直播人气</div>
                            <div class="tab-item member_cnt" data-key="member_cnt">参与人次</div>
                            <div class="tab-item user_cnt" data-key="user_cnt">互动人数</div>
                        </div>
                    </div>
                    <div id="chart-live-container"></div>
                </div>
                <!-- 观点分析 -->
                <div class="chart-article charts-detail-child">
                    <div class="chart-info">
                        <div class="detail-title">观点分析</div>
                        <div class="detail-sum">
                            <table>
                                <thead>
                                    <tr class="thead">
                                        <td></td>
                                        <td>观点总数</td>
                                        <td>打赏比例</td>
                                        <td>打赏金额</td>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                    <div class="chart-tab">
                        <div class="selectBar">
                            <span class="label">观点类型</span>
                            <select>
                                <option value="-1">全部</option>
                                <option value="0">大盘</option>
                                <option value="1">题材</option>
                                <option value="2">个股</option>
                                <option value="3">股票学堂</option>
                                <option value="4">操盘绝学</option>
                                <option value="5">独家内参</option>
                            </select>
                        </div>
                        <div class="tab-items tab2">
                            <div class="tab-item article_cnt active" data-key="article_cnt">观点总数</div>
                            <div class="tab-item payarticle_cnt" data-key="payarticle_cnt">打赏数量</div>
                            <div class="tab-item payarticle_price" data-key="payarticle_price">打赏金额</div>
                        </div>
                    </div>
                    <div id="chart-article-container"></div>
                    <div id="chart-article-pie"></div>
                </div>
                <!-- 问股分析 -->
                <div class="chart-ask charts-detail-child">
                    <div class="chart-info">
                        <div class="detail-title">观点分析</div>
                        <div class="detail-sum">
                            <table>
                                <thead>
                                    <tr class="thead">
                                        <td></td>
                                        <td>回答数量</td>
                                        <td>采纳数量</td>
                                        <td>采纳比例</td>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                    <div class="chart-tab">
                        <div class="selectBar">
                            <span class="label">问股类型</span>
                            <select>
                                <option value="-1">全部</option>
                                <option value="0">大盘</option>
                                <option value="1">题材</option>
                                <option value="2">个股</option>
                                <option value="3">股票学堂</option>
                            </select>
                        </div>
                        <div class="tab-items tab">
                            <div class="tab-item answer_cnt active" data-key="answer_cnt">回答数量</div>
                            <div class="tab-item adopt_cnt" data-key="adopt_cnt">采纳数量</div>
                            <div class="tab-item adopt_ratio" data-key="adopt_ratio">采纳率</div>
                        </div>
                    </div>
                    <div id="chart-ask-container"></div>
                    <div id="chart-ask-pie"></div>
                </div>
                <!-- 投顾分析 -->
                <div class="chart-teacher charts-detail-child">
                    <div class="chart-info">
                        <div class="detail-title">投顾分析</div>
                        <div class="detail-sum">
                            <table>
                                <tr class="thead">
                                    <td>投顾总数</td>
                                    <td>内部投顾</td>
                                    <td>外部投顾</td>
                                </tr>
                                <tr class="tbody">
                                    <td>---</td>
                                    <td>---</td>
                                    <td>---</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="chart-tab"></div>
                    <div class="teacher-data">
                        <table>
                            <thead>
                                <tr>
                                    <td class="width">投顾</td>
                                    <td>回答问题</td>
                                    <td>发表观点</td>
                                    <td>直播人气</td>
                                    <td>新关注人数</td>
                                    <td>打赏金额</td>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                    <div id="chart-teacher-container"></div>
                    <div id="chart-teacher-pie"></div>
                </div>
            </div>
        </div>
        <script src="http://cdn.bootcss.com/jquery/1.12.3/jquery.min.js"></script>
        <script src="https://cdn.bootcss.com/lodash.js/4.17.4/lodash.min.js"></script>
        <script src="http://cdn.bootcss.com/highcharts/5.0.11/highcharts.js"></script>
        <script src="/public/manage/ychart.bundle.js?v=20170518144005"></script>
    </body>

    </html>
