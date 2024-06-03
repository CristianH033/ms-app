import { createRouter, createWebHashHistory } from 'vue-router'
// import { isAuthenticated } from '@/lib/supabase.client'
import NotFoundErrorView from '@/views/NotFoundErrorView.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'
import { defineAsyncComponent } from 'vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: defineAsyncComponent({
        loader: () => import('@/layouts/MainLayout.vue'),
        loadingComponent: LoadingIndicator,
        errorComponent: ErrorComponent,
        delay: 100,
        timeout: 100000
      }),
      redirect: { name: 'home' },
      meta: { requires_auth: true },
      children: [
        {
          path: '/',
          name: 'home',
          component: defineAsyncComponent({
            loader: () => import('@/views/HomeView.vue'),
            loadingComponent: LoadingIndicator,
            errorComponent: ErrorComponent,
            delay: 100,
            timeout: 100000
          }),
          meta: { requires_auth: true }
        },
        {
          path: '/raffles',
          name: 'raffles',
          meta: { requires_auth: true },
          component: defineAsyncComponent({
            loader: () => import('@/views/RafflesView.vue'),
            loadingComponent: LoadingIndicator,
            errorComponent: ErrorComponent,
            delay: 100,
            timeout: 100000
          })
        },
        {
          path: '/raffles/:id',
          name: 'raffle',
          component: defineAsyncComponent({
            loader: () => import('@/views/RaffleView.vue'),
            loadingComponent: LoadingIndicator,
            errorComponent: ErrorComponent,
            delay: 100,
            timeout: 100000
          }),
          meta: { requires_auth: true },
          children: [
            {
              path: '/raffles/:id/tickets',
              name: 'raffle-tickets',
              component: defineAsyncComponent({
                loader: () => import('@/components/TicketsList.vue'),
                loadingComponent: LoadingIndicator,
                errorComponent: ErrorComponent,
                delay: 100,
                timeout: 100000
              }),
              meta: { requires_auth: true }
            }
          ]
        },
        {
          path: '/lotteries',
          name: 'lotteries',
          meta: { requires_auth: true },
          component: defineAsyncComponent({
            loader: () => import('@/views/LotteriesView.vue'),
            loadingComponent: LoadingIndicator,
            errorComponent: ErrorComponent,
            delay: 100,
            timeout: 100000
          })
        },
        {
          path: '/lotteries/:id',
          name: 'lottery',
          component: defineAsyncComponent({
            loader: () => import('@/views/LotteryView.vue'),
            loadingComponent: LoadingIndicator,
            errorComponent: ErrorComponent,
            delay: 100,
            timeout: 100000
          }),
          meta: { requires_auth: true },
          children: [
            {
              path: '/lotteries/:id/draws',
              name: 'lottery-draws',
              component: defineAsyncComponent({
                loader: () => import('@/components/DrawsList.vue'),
                loadingComponent: LoadingIndicator,
                errorComponent: ErrorComponent,
                delay: 100,
                timeout: 100000
              }),
              meta: { requires_auth: true }
            }
          ]
        },
        {
          path: '/draws',
          name: 'draws',
          meta: { requires_auth: true },
          component: defineAsyncComponent({
            loader: () => import('@/views/DrawsView.vue'),
            loadingComponent: LoadingIndicator,
            errorComponent: ErrorComponent,
            delay: 100,
            timeout: 100000
          })
        },
        {
          path: '/draws/:id',
          name: 'draw',
          component: defineAsyncComponent({
            loader: () => import('@/views/DrawView.vue'),
            loadingComponent: LoadingIndicator,
            errorComponent: ErrorComponent,
            delay: 100,
            timeout: 100000
          }),
          meta: { requires_auth: true },
          children: [
            {
              path: '/draws/:id/raffles',
              name: 'draw-raffles',
              component: defineAsyncComponent({
                loader: () => import('@/components/RafflesList.vue'),
                loadingComponent: LoadingIndicator,
                errorComponent: ErrorComponent,
                delay: 100,
                timeout: 100000
              }),
              meta: { requires_auth: true }
            }
          ]
        },
        {
          path: '/sellers',
          name: 'sellers',
          component: defineAsyncComponent({
            loader: () => import('@/views/SellersView.vue'),
            loadingComponent: LoadingIndicator,
            errorComponent: ErrorComponent,
            delay: 100,
            timeout: 100000
          }),
          meta: { requires_auth: true }
        },
        {
          path: '/sellers/:id',
          name: 'seller',
          component: defineAsyncComponent({
            loader: () => import('@/views/SellerView.vue'),
            loadingComponent: LoadingIndicator,
            errorComponent: ErrorComponent,
            delay: 100,
            timeout: 100000
          }),
          meta: { requires_auth: true },
          children: [
            {
              path: '/sellers/:id/tickets',
              name: 'seller-tickets',
              component: defineAsyncComponent({
                loader: () => import('@/components/TicketsList.vue'),
                loadingComponent: LoadingIndicator,
                errorComponent: ErrorComponent,
                delay: 100,
                timeout: 100000
              }),
              meta: { requires_auth: true }
            }
          ]
        },
        {
          path: '/buyers',
          name: 'buyers',
          component: defineAsyncComponent({
            loader: () => import('@/views/CustomersView.vue'),
            loadingComponent: LoadingIndicator,
            errorComponent: ErrorComponent,
            delay: 100,
            timeout: 100000
          }),
          meta: { requires_auth: true }
        },
        {
          path: '/buyers/:id',
          name: 'buyer',
          component: defineAsyncComponent({
            loader: () => import('@/views/CustomerView.vue'),
            loadingComponent: LoadingIndicator,
            errorComponent: ErrorComponent,
            delay: 100,
            timeout: 100000
          }),
          meta: { requires_auth: true },
          children: [
            {
              path: '/buyers/:id/tickets',
              name: 'buyer-tickets',
              component: defineAsyncComponent({
                loader: () => import('@/components/TicketsList.vue'),
                loadingComponent: LoadingIndicator,
                errorComponent: ErrorComponent,
                delay: 100,
                timeout: 100000
              }),
              meta: { requires_auth: true }
            }
          ]
        },
        {
          path: '/calendar',
          name: 'calendar',
          component: defineAsyncComponent({
            loader: () => import('@/views/CalendarView.vue'),
            loadingComponent: LoadingIndicator,
            errorComponent: ErrorComponent,
            delay: 100,
            timeout: 100000
          }),
          meta: { requires_auth: true }
        },
        {
          path: '/notifications',
          name: 'notifications',
          component: defineAsyncComponent({
            loader: () => import('@/views/NotificationsView.vue'),
            loadingComponent: LoadingIndicator,
            errorComponent: ErrorComponent,
            delay: 100,
            timeout: 100000
          }),
          meta: { requires_auth: true }
        },
        {
          path: '/account',
          name: 'account',
          component: defineAsyncComponent({
            loader: () => import('@/views/AccountView.vue'),
            loadingComponent: LoadingIndicator,
            errorComponent: ErrorComponent,
            delay: 100,
            timeout: 100000
          }),
          meta: { requires_auth: true }
        }
      ]
    },
    {
      path: '/',
      name: 'auth',
      component: defineAsyncComponent({
        loader: () => import('@/layouts/AuthLayout.vue'),
        loadingComponent: LoadingIndicator,
        errorComponent: ErrorComponent,
        delay: 100,
        timeout: 100000
      }),
      redirect: { name: 'login' },
      children: [
        {
          path: '/login',
          name: 'login',
          component: defineAsyncComponent({
            loader: () => import('@/views/LoginView.vue'),
            loadingComponent: LoadingIndicator,
            errorComponent: ErrorComponent,
            delay: 100,
            timeout: 100000
          }),
          meta: { requires_auth: false, requires_guest: true }
        },
        {
          path: '/register',
          name: 'register',
          component: defineAsyncComponent({
            loader: () => import('@/views/RegisterView.vue'),
            loadingComponent: LoadingIndicator,
            errorComponent: ErrorComponent,
            delay: 100,
            timeout: 100000
          }),
          meta: { requires_auth: false, requires_guest: true }
        }
      ],
      meta: { requires_auth: false, requires_guest: true }
    },
    {
      path: '/about',
      name: 'about',
      component: defineAsyncComponent({
        loader: () => import('../views/AboutView.vue'),
        loadingComponent: LoadingIndicator,
        errorComponent: ErrorComponent,
        delay: 100,
        timeout: 100000
      })
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFoundErrorView,
      meta: { requires_auth: false, requires_guest: false }
    }
  ]
})

// router.beforeEach(async (to, from, next) => {
//   const userIsAuthenticated = await isAuthenticated()
//   const userIsGuest = !userIsAuthenticated
//   const fromRequiresAuth = from.matched.some((record) => record.meta.requires_auth)
//   const fromRequiresGuest = from.matched.some((record) => record.meta.requires_guest)
//   const toRequiresAuth = to.matched.some((record) => record.meta.requires_auth)
//   const toRequiresGuest = to.matched.some((record) => record.meta.requires_guest)

//   if (fromRequiresAuth && toRequiresGuest && userIsAuthenticated) {
//     next({ name: 'home' })
//     return
//   }

//   if (fromRequiresGuest && toRequiresAuth && userIsGuest) {
//     next({ name: 'login' })
//     return
//   }

//   if (toRequiresAuth && userIsGuest) {
//     next({ name: 'login' })
//     return
//   }

//   if (toRequiresGuest && userIsAuthenticated) {
//     next({ name: 'home' })
//     return
//   }

//   next()
// })

export default router
