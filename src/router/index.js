import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'VueLayout',
        component: () => import('@/layout/VueLayout.vue'),
        redirect: "/home",
        children: [
            {
                path: 'home',
                name: 'home',
                // component: () => {
                //     let user = sessionStorage.getItem('user');
                //     let authority = JSON.parse(user).authority;
                //     if (authority == 'SystemManager') return import('@/views/HomeAdmin.vue');
                //     if (authority == 'Counselor') return import('@/views/HomeCounselor.vue');
                //     return import('@/views/HomeSupervisor.vue');
                // }, // to modify 
                component: () => import('@/views/Home.vue'), 
                meta: {
                    roles: ['SystemManager', 'Consultant', 'Supervisor']
                },
            },
            {
                path: 'chat',
                name: 'chat',
                component: () => import('@/views/ChatPart.vue'), // to modify
                meta: {
                    roles: ['Consultant']
                },
            },
            {
                path: 'solve',
                name: 'solve',
                component: () => import('@/views/SolvePart.vue'), // to modify
                meta: {
                    roles: ['Supervisors']
                },
            },
            {
                path: 'assist',
                name: 'assist',
                component: () => import('@/views/AssistPart.vue'),
                meta: {
                    roles: ['Consultant', 'Supervisor']
                },
            },
            {
                path: 'consult-record',
                name: 'consult-record',
                component: () => import('@/views/ConsultRecord.vue'),
                meta: {
                    roles: ['SystemManager', 'Consultant', 'Supervisor']
                },
            },
            {
                path: 'dialog-record',
                name: 'dialog-record',
                component: () => import('@/views/DialogRecord.vue'),
                meta: {
                    roles: ['admin', 'Supervisors']
                },
            },
            {
                path: 'supervisor-management',
                name: 'supervisor-management',
                component: () => import('@/views/SupervisorManagement.vue'),
                meta: {
                    roles: ['SystemManager']
                },
            },
            {
                path: 'visitor-management',
                name: 'visitor-management',
                component: () => import('@/views/VisitorManagement.vue'),
                meta: {
                    roles: ['SystemManager', 'Supervisor']
                },
            },
            {
                path: 'counselor-management',
                name: 'counselor-management',
                component: () => import('@/views/CounselorManagement.vue'),
                meta: {
                    roles: ['SystemManager', 'Supervisor']
                },
            },

            {
                path: 'userspace',
                name: 'userspace',
                component: () => import('@/views/UserSpace.vue'),
                meta: {
                    roles: ['SystemManager', 'Supervisor', 'Consultant']
                },
            },
            {
                path: 'working-schedule',
                name: 'working-schedule',
                component: () => import('@/views/WorkingSchedule.vue'),
                meta: {
                    roles: ['SystemManager', 'Supervisor', 'Consultant']
                },
            },
        ]
    },
    {path: '/login', name: 'login', component: () => import('@/views/Login.vue') },
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        let token = localStorage.getItem('Authorization');
        if (token === 'null' || token === '') {
            next('/login');
        } else {
            let user = sessionStorage.getItem('user')
            if (!user) {
                next('/login')
            }
            next()
            if (to.meta.roles.includes(JSON.parse(user).authority)) {
                next()	//放行
            }
        }
    }
    next('/login')
});
export default router
