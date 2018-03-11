import Vue from 'vue';
import router from './router/index';
import App from './app';

var app = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App,
    },
});

