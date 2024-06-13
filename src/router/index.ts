import { createRouter, createWebHashHistory } from 'vue-router'
import NotFoundErrorView from '@/views/NotFoundErrorView.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'
import { defineAsyncComponent, type AsyncComponentOptions } from 'vue'
import { useAuthStore } from '@/stores/auth'

type asyncComponentOptions = Omit<AsyncComponentOptions<unknown>, 'loader'>

const defaultOptions: asyncComponentOptions = {
  loadingComponent: LoadingIndicator,
  errorComponent: ErrorComponent,
  delay: 100
  // timeout: 100000
}

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: defineAsyncComponent({
        loader: () => import('@/layouts/MainLayout.vue'),
        ...defaultOptions
      }),
      redirect: { name: 'home' },
      meta: { requires_auth: true },
      children: [
        {
          path: '',
          name: 'home',
          component: defineAsyncComponent({
            loader: () => import('@/views/HomeView.vue'),
            ...defaultOptions
          }),
          meta: { requires_auth: true }
        },
        {
          path: 'loading-page',
          name: 'loading-page',
          component: defineAsyncComponent({
            loader: () => import('@/components/LoadingIndicator.vue'),
            ...defaultOptions
          })
        },
        {
          path: 'raffles',
          name: 'raffles',
          meta: { requires_auth: true },
          component: defineAsyncComponent({
            loader: () => import('@/views/RafflesView.vue'),
            ...defaultOptions
          })
        },
        {
          path: 'raffles/:id',
          name: 'raffle',
          component: defineAsyncComponent({
            loader: () => import('@/views/RaffleView.vue'),
            ...defaultOptions
          }),
          meta: { requires_auth: true },
          children: [
            {
              path: '/raffles/:id/tickets',
              name: 'raffle-tickets',
              component: defineAsyncComponent({
                loader: () => import('@/components/TicketsList.vue'),
                ...defaultOptions
              }),
              meta: { requires_auth: true }
            }
          ]
        },
        {
          path: 'lotteries',
          name: 'lotteries',
          meta: { requires_auth: true },
          component: defineAsyncComponent({
            loader: () => import('@/views/LotteriesView.vue'),
            ...defaultOptions
          })
        },
        {
          path: 'lotteries/:id',
          name: 'lottery',
          component: defineAsyncComponent({
            loader: () => import('@/views/LotteryView.vue'),
            ...defaultOptions
          }),
          meta: { requires_auth: true },
          children: [
            {
              path: '/lotteries/:id/draws',
              name: 'lottery-draws',
              component: defineAsyncComponent({
                loader: () => import('@/components/DrawsList.vue'),
                ...defaultOptions
              }),
              meta: { requires_auth: true }
            }
          ]
        },
        {
          path: 'draws',
          name: 'draws',
          meta: { requires_auth: true },
          component: defineAsyncComponent({
            loader: () => import('@/views/DrawsView.vue'),
            ...defaultOptions
          })
        },
        {
          path: 'draws/:id',
          name: 'draw',
          component: defineAsyncComponent({
            loader: () => import('@/views/DrawView.vue'),
            ...defaultOptions
          }),
          meta: { requires_auth: true },
          children: [
            {
              path: '/draws/:id/raffles',
              name: 'draw-raffles',
              component: defineAsyncComponent({
                loader: () => import('@/components/RafflesList.vue'),
                ...defaultOptions
              }),
              meta: { requires_auth: true }
            }
          ]
        },
        {
          path: 'sellers',
          name: 'sellers',
          component: defineAsyncComponent({
            loader: () => import('@/views/SellersView.vue'),
            ...defaultOptions
          }),
          meta: { requires_auth: true }
        },
        {
          path: 'sellers/:id',
          name: 'seller',
          component: defineAsyncComponent({
            loader: () => import('@/views/SellerView.vue'),
            ...defaultOptions
          }),
          meta: { requires_auth: true },
          children: [
            {
              path: '/sellers/:id/tickets',
              name: 'seller-tickets',
              component: defineAsyncComponent({
                loader: () => import('@/components/TicketsList.vue'),
                ...defaultOptions
              }),
              meta: { requires_auth: true }
            }
          ]
        },
        {
          path: 'buyers',
          name: 'buyers',
          component: defineAsyncComponent({
            loader: () => import('@/views/CustomersView.vue'),
            ...defaultOptions
          }),
          meta: { requires_auth: true }
        },
        {
          path: 'buyers/:id',
          name: 'buyer',
          component: defineAsyncComponent({
            loader: () => import('@/views/CustomerView.vue'),
            ...defaultOptions
          }),
          meta: { requires_auth: true },
          children: [
            {
              path: '/buyers/:id/tickets',
              name: 'buyer-tickets',
              component: defineAsyncComponent({
                loader: () => import('@/components/TicketsList.vue'),
                ...defaultOptions
              }),
              meta: { requires_auth: true }
            }
          ]
        },
        {
          path: 'calendar',
          name: 'calendar',
          component: defineAsyncComponent({
            loader: () => import('@/views/CalendarView.vue'),
            ...defaultOptions
          }),
          meta: { requires_auth: true }
        },
        {
          path: 'notifications',
          name: 'notifications',
          component: defineAsyncComponent({
            loader: () => import('@/views/NotificationsView.vue'),
            ...defaultOptions
          }),
          meta: { requires_auth: true }
        },
        {
          path: 'account',
          name: 'account',
          component: defineAsyncComponent({
            loader: () => import('@/views/AccountView.vue'),
            ...defaultOptions
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
        ...defaultOptions
      }),
      redirect: { name: 'login' },
      children: [
        {
          path: 'login',
          name: 'login',
          component: defineAsyncComponent({
            loader: () => import('@/views/LoginView.vue'),
            ...defaultOptions
          }),
          meta: { requires_auth: false, requires_guest: true }
        },
        {
          path: 'register',
          name: 'register',
          component: defineAsyncComponent({
            loader: () => import('@/views/RegisterView.vue'),
            ...defaultOptions
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
        ...defaultOptions
      })
    },
    {
      path: '/loading',
      name: 'loading',
      component: defineAsyncComponent({
        loader: () => import('@/components/LoadingIndicator.vue'),
        ...defaultOptions
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

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const toRequiresAuth = to.matched.some((record) => record.meta.requires_auth)
  const toRequiresGuest = to.matched.some((record) => record.meta.requires_guest)

  // Asyncronously check if the user is authenticated
  authStore.checkAuth()

  if (toRequiresAuth) {
    if (!authStore.isAuthenticated) {
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }
  }

  if (toRequiresGuest) {
    if (authStore.isAuthenticated) {
      next({ name: 'home' })
      return
    }
  }

  next()
})

export default router
