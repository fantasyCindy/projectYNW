var Confirm = require('m/ui/pay-any-package.js');
var createEventHub = function() {
	return {
		hub: Object.create(null),
		emit(event, data) {
			(this.hub[event] || []).forEach((handler) => handler(data));
		},
		on(event, handler) {
			if (!this.hub[event]) this.hub[event] = [];
			this.hub[event].push(handler);
		},
		off(event, handler) {
			const i = (this.hub[event] || []).findIndex((h) => h === handler);
			if (i > -1) this.hub[event].splice(i, 1);
		}
	};
};

var hub = createEventHub();
window.hub = hub;

import Vue from 'vue';
importVueComps();

new Vue({
	el: '#app',
	data() {
		return {};
	},
	methods: {
		askStockSubmit(ops) {
			hub.emit('show-ask-window', { select: ops });
		},
		referSubmit(ops) {
			hub.emit('referOrder', ops);
		}
	},
	mounted() {
		hub.on('click-opinion', (ops) => {
			this.$refs.oppo.getOpinionInfo(ops);
		});
		hub.on('gift-animation', (id) => {
			this.$refs.giftanimate.giftId(id);
		});
		hub.on('click-refer', (id) => {
			this.$refs.referpop.getReferInfo(id);
		});
		hub.on('click-ask', (id) => {
			this.$refs.askpop.queryNoteDetail(id);
		});
		hub.on('zoom-img', (src) => {
			this.$refs.zoom.showModule(src);
		});
	}
});

// chat
new Vue({
	el: '#live-chat',
	data() {
		return {};
	},
	methods: {},
	mounted() {
		hub.on('chat-push', (data) => {
			this.$refs.chat.chatPush(data);
		});
	}
});

// gift
new Vue({
	el: '#gift',
	data() {
		return {};
	},
	methods: {
		giftSubmit(ops) {
			Confirm.payconfirm({
				type: 5,
				price: ops.totalPrice,
				finish: false,
				orderNum: ops.orderNum
			});
		}
	},
	mounted() {
		hub.on('click-gift', () => {
			this.$refs.giftpop.getGiftList();
		});
	}
});
