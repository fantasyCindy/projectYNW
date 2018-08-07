<template>
    <div class="opinion-detail">
        <div class="titleBar">
            <div class="title-1">{{article.title}}</div>
            <div class="author">
                <div class="avatar"><img class="img" :src="article.image_path"></div>
                <div class="wrap">
                    <div class="line relative">
                        <div class="view-count"><i class="icon-see"></i>（{{article.viewnumber}}）</div>
                        <div class="userName"> {{article.createrName}}</div>
                    </div>
                    <div class="line relative">{{article.create_timeStr}}</div>
                </div>
            </div>
        </div>
        <div class="article-contents" v-html="article.content"></div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                article: {}
            }
        },
        methods: {
            getData(id) {
                $.getJSON(`/live/vipHistoryDetail.htm?article_id=${id}`, back => {
                    this.article = back;
                })
            }
        },
        created() {
            this.$root.menuTop = 2;
            this.$root.menuBottom = -1;
        },
        mounted() {
            this.getData(this.$route.params.id);
            $('.opinion-detail').on('click', 'img', function() {
                var src = $(this).attr('src')
                zoomImage(src)
            })
        }
}
</script>
