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
import { Separator } from '@/components/ui/separator'
import { RouterLink } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { AuthError } from '@supabase/supabase-js'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import CibGithub from '~icons/cib/github'
import CibGoogle from '~icons/cib/google'
import SvgSpinnersDotRevolve from '~icons/svg-spinners/dot-revolve'

const authStore = useAuthStore()

const loading = ref(false)

const formSchema = toTypedSchema(
  z.object({
    email: z
      .string({ required_error: 'Email es requerido' })
      .min(5, { message: 'Minimo 5 caracteres' })
      .email({
        message: 'Email invalido'
      }),
    password: z
      .string({ required_error: 'Password es requerido' })
      .min(6, { message: 'Minimo 6 caracteres' })
  })
)

const form = useForm({
  validationSchema: formSchema
})

const handleLogin = form.handleSubmit(async (formData) => {
  loading.value = true
  form.setFieldError('email', '')
  await new Promise((resolve) => setTimeout(resolve, 500))

  authStore
    .login(formData.email, formData.password)
    .then(() => {})
    .catch((e) => {
      if (e instanceof AuthError) {
        form.setFieldError('email', 'Credenciales incorrectas')
      } else {
        console.log('Unknown Error', e)
      }
    })
    .finally(() => {
      loading.value = false
    })
})
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
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="mail@example.com"
                  v-bind="componentField"
                  required
                />
              </FormControl>
              <!-- <FormDescription> This is your public display name. </FormDescription> -->
              <div v-auto-animate>
                <FormMessage />
              </div>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" v-bind="componentField" required />
              </FormControl>
              <!-- <FormDescription> This is your public display name. </FormDescription> -->
              <div v-auto-animate>
                <FormMessage />
              </div>
            </FormItem>
          </FormField>
        </CardContent>
        <CardFooter class="flex-col gap-4">
          <Button type="submit" class="w-full">
            <SvgSpinnersDotRevolve v-if="loading" class="mr-2 h-4 w-4" />
            <span>Iniciar sesión</span>
          </Button>
          <Separator />
          <p class="self-end text-left text-sm text-muted-foreground">
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
