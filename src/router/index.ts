import { createRouter, createWebHashHistory } from 'vue-router'
import NotFoundErrorView from '@/views/NotFoundErrorView.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'
import { defineAsyncComponent, type AsyncComponentOptions } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'

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
      meta: { title: 'Inicio', requires_auth: true },
      component: defineAsyncComponent({
        loader: () => import('@/layouts/MainLayout.vue'),
        ...defaultOptions
      }),
      redirect: { name: 'home' },
      children: [
        {
          path: 'home',
          meta: { title: 'Inicio', requires_auth: true },
          children: [
            {
              path: '',
              name: 'home',
              meta: { title: 'Inicio', requires_auth: true },
              component: defineAsyncComponent({
                loader: () => import('@/views/HomeView.vue'),
                ...defaultOptions
              })
            },
            {
              path: 'raffles',
              name: 'raffles',
              meta: { title: 'Rifas', requires_auth: true },
              component: defineAsyncComponent({
                loader: () => import('@/views/HomeView.vue'),
                ...defaultOptions
              })
            },
            {
              path: 'raffles/:id',
              name: 'raffle',
              meta: { title: 'Rifas', requires_auth: true },
              component: defineAsyncComponent({
                loader: () => import('@/views/RaffleView.vue'),
                ...defaultOptions
              })
            },
            {
              path: 'raffles/:id/sellers',
              name: 'raffle-sellers',
              meta: { title: 'Vendedores', requires_auth: true },
              component: defineAsyncComponent({
                loader: () => import('@/views/SellersRaffleView.vue'),
                ...defaultOptions
              })
            },
            {
              path: 'raffles/:id/sellers/:seller_id',
              name: 'raffle-seller',
              meta: { title: 'Vendedor', requires_auth: true },
              component: defineAsyncComponent({
                loader: () => import('@/views/SellerRaffleView.vue'),
                ...defaultOptions
              })
            },
            {
              path: 'lotteries',
              name: 'lotteries',
              meta: { title: 'Loterías', requires_auth: true },
              component: defineAsyncComponent({
                loader: () => import('@/views/LotteriesView.vue'),
                ...defaultOptions
              })
            },
            {
              path: 'lotteries/:id',
              name: 'lottery',
              meta: { title: 'Loterías', requires_auth: true },
              component: defineAsyncComponent({
                loader: () => import('@/views/LotteryView.vue'),
                ...defaultOptions
              }),

              children: [
                {
                  path: '/lotteries/:id/draws',
                  name: 'lottery-draws',
                  meta: { title: 'Sorteos', requires_auth: true },
                  component: defineAsyncComponent({
                    loader: () => import('@/components/DrawsList.vue'),
                    ...defaultOptions
                  })
                }
              ]
            },
            {
              path: 'draws',
              name: 'draws',
              meta: { title: 'Sorteos', requires_auth: true },
              component: defineAsyncComponent({
                loader: () => import('@/views/DrawsView.vue'),
                ...defaultOptions
              })
            },
            {
              path: 'draws/:id',
              name: 'draw',
              meta: { title: 'Sorteos', requires_auth: true },
              component: defineAsyncComponent({
                loader: () => import('@/views/DrawView.vue'),
                ...defaultOptions
              }),
              children: [
                {
                  path: '/draws/:id/raffles',
                  name: 'draw-raffles',
                  meta: { title: 'Rifas', requires_auth: true },
                  component: defineAsyncComponent({
                    loader: () => import('@/components/RafflesList.vue'),
                    ...defaultOptions
                  })
                }
              ]
            }
          ]
        },
        {
          path: 'sellers',
          name: 'sellers',
          meta: { title: 'Vendedores', requires_auth: true },
          component: defineAsyncComponent({
            loader: () => import('@/views/SellersView.vue'),
            ...defaultOptions
          })
        },
        {
          path: 'sellers/:id',
          name: 'seller',
          meta: { title: 'Vendedores', requires_auth: true },
          component: defineAsyncComponent({
            loader: () => import('@/views/SellerView.vue'),
            ...defaultOptions
          }),
          children: [
            {
              path: '/sellers/:id/tickets',
              name: 'seller-tickets',
              meta: { title: 'Boletas', requires_auth: true },
              component: defineAsyncComponent({
                loader: () => import('@/components/TicketsList.vue'),
                ...defaultOptions
              })
            }
          ]
        },
        {
          path: 'notifications',
          name: 'notifications',
          meta: { title: 'Notificaciones', requires_auth: true },
          component: defineAsyncComponent({
            loader: () => import('@/views/NotificationsView.vue'),
            ...defaultOptions
          })
        },
        {
          path: 'account',
          name: 'account',
          meta: { title: 'Cuenta', requires_auth: true },
          component: defineAsyncComponent({
            loader: () => import('@/views/AccountView.vue'),
            ...defaultOptions
          })
        },
        {
          path: 'tests',
          name: 'tests',
          meta: { title: 'Cargar imagen', requires_auth: true },
          component: defineAsyncComponent({
            loader: () => import('@/views/TestView.vue'),
            ...defaultOptions
          })
        }
      ]
    },
    {
      path: '/',
      name: 'auth',
      meta: { title: 'Iniciar sesión', requires_auth: false, requires_guest: true },
      component: defineAsyncComponent({
        loader: () => import('@/layouts/AuthLayout.vue'),
        ...defaultOptions
      }),
      redirect: { name: 'login' },
      children: [
        {
          path: 'login',
          name: 'login',
          meta: { title: 'Iniciar sesión', requires_auth: false, requires_guest: true },
          component: defineAsyncComponent({
            loader: () => import('@/views/LoginView.vue'),
            ...defaultOptions
          })
        },
        {
          path: 'register',
          name: 'register',
          meta: { title: 'Registrarse', requires_auth: false, requires_guest: true },
          component: defineAsyncComponent({
            loader: () => import('@/views/RegisterView.vue'),
            ...defaultOptions
          })
        }
      ]
    },
    {
      path: '/empty-page',
      name: 'empty-page',
      meta: { title: 'Página vacía', requires_auth: false, requires_guest: false },
      component: NotFoundErrorView
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
      meta: { title: 'Cargando..', requires_auth: false, requires_guest: false },
      component: defineAsyncComponent({
        loader: () => import('@/components/LoadingIndicator.vue'),
        ...defaultOptions
      })
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      meta: { title: 'Página no encontrada', requires_auth: false, requires_guest: false },
      component: NotFoundErrorView
    }
  ]
})

router.afterEach((to) => {
  const appStore = useAppStore()

  appStore.setAppTitle(to.meta.title ? `${to.meta.title as string}` : 'MS App')
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
