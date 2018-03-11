import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/views/index/index';
import errPage from '@/views/404/index';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index,
        },
        {
            path: '*',
            name: 'errPage',
            component: errPage,
        }
    ],
});

export default router;
