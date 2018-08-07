const hub = createEventHub = () => ({
    hub: Object.create(null),
    emit(event, data) {
        (this.hub[event] || []).forEach(handler => handler(data));
    },
    on(event, handler) {
        if (!this.hub[event]) this.hub[event] = [];
        this.hub[event].push(handler);
    },
    off(event, handler) {
        const i = (this.hub[event] || []).findIndex(h => h === handler);
        if (i > -1) this.hub[event].splice(i, 1);
    }
});


window.hub = createEventHub()



import Vue from 'vue';
import * as Typs from './types'

new Vue({
    el: '#app',
    data() {
        return {
            showOpinion: false
        }
    },
    methods: {

    },
    mounted() {
        hub.on(Typs.CLICK_REFER, data => {
        	this.showOpinion = true;
        })

    }
})
