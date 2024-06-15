<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { RouterLink } from 'vue-router'
import CibGithub from '~icons/cib/github'
import CibGoogle from '~icons/cib/google'
import SvgSpinnersDotRevolve from '~icons/svg-spinners/dot-revolve'

const authStore = useAuthStore()

const loading = ref(false)
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  loading.value = true
  // await new Promise((resolve) => setTimeout(resolve, 2000))

  authStore
    .login(email.value, password.value)
    .then(() => {})
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <form @submit.prevent="handleLogin" class="w-full" :aria-disabled="loading">
    <fieldset :disabled="loading">
      <Card class="w-full">
        <CardHeader class="space-y-1">
          <CardTitle class="text-2xl"> Iniciar Sesión </CardTitle>
          <CardDescription> Inicia sesión para comenzar. </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div class="grid grid-cols-2 gap-6">
            <Button type="button" variant="outline">
              <CibGithub class="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button type="button" variant="outline">
              <CibGoogle class="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-background px-2 text-muted-foreground">
                O continuar con correo electrónico
              </span>
            </div>
          </div>
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              name="email"
              type="email"
              v-model="email"
              placeholder="mail@example.com"
              required
            />
          </div>
          <div class="grid gap-2">
            <Label for="password">Contraseña</Label>
            <Input name="password" type="password" v-model="password" required />
          </div>
        </CardContent>
        <CardFooter class="flex-col gap-4">
          <Button type="submit" class="w-full">
            <SvgSpinnersDotRevolve v-if="loading" class="mr-2 h-4 w-4" />
            <span>Iniciar sesión</span>
          </Button>
          <Separator />
          <p class="text-left self-end text-sm text-muted-foreground">
            No tienes una cuenta?
            <RouterLink class="underline underline-offset-4" :to="{ name: 'register' }"
              >Registrarse</RouterLink
            >
          </p>
        </CardFooter>
      </Card>
    </fieldset>
  </form>
</template>
