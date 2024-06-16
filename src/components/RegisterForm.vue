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
import CibGithub from '~icons/cib/github'
import CibGoogle from '~icons/cib/google'
import SvgSpinnersDotRevolve from '~icons/svg-spinners/dot-revolve'
import FormItem from './ui/form/FormItem.vue'
import FormLabel from './ui/form/FormLabel.vue'
import FormControl from './ui/form/FormControl.vue'
import FormMessage from './ui/form/FormMessage.vue'
import { FormField } from './ui/form'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { AuthError } from '@supabase/supabase-js'

const authStore = useAuthStore()

const loading = ref(false)

const formSchema = toTypedSchema(
  z
    .object({
      firstName: z
        .string({ required_error: 'Nombre es requerido' })
        .min(3, { message: 'Minimo 3 caracteres' }),
      lastName: z
        .string({ required_error: 'Apellido es requerido' })
        .min(3, { message: 'Minimo 3 caracteres' }),
      email: z
        .string({ required_error: 'Email es requerido' })
        .min(5, { message: 'Minimo 5 caracteres' })
        .email({
          message: 'Email invalido'
        }),
      password: z
        .string({ required_error: 'Password es requerido' })
        .min(6, { message: 'Minimo 6 caracteres' }),
      repeatPassword: z
        .string({ required_error: 'Confirmar contraseña es requerido' })
        .min(6, { message: 'Minimo 6 caracteres' })
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: 'Las contraseñas no coinciden',
      path: ['repeatPassword']
    })
)

const form = useForm({
  validationSchema: formSchema
})

const handleSignUp = form.handleSubmit(async (formData) => {
  loading.value = true
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  authStore
    .register(formData.firstName, formData.lastName, formData.email, formData.password)
    .then(() => {})
    .catch((error) => {
      console.log(error)
      if (error instanceof AuthError) {
        form.setFieldError('email', 'Credenciales incorrectas')
      } else {
        console.log('Unknown Error', error)
      }
    })
    .finally(() => {
      loading.value = false
    })
})
</script>

<template>
  <form @submit.prevent="handleSignUp" class="w-full" :aria-disabled="loading">
    <fieldset :disabled="loading">
      <Card class="w-full">
        <CardHeader class="space-y-1">
          <CardTitle class="text-2xl"> Crear cuenta </CardTitle>
          <CardDescription> Crea una cuenta para comenzar. </CardDescription>
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
              <span class="bg-background px-2 text-muted-foreground"> O continuar con </span>
            </div>
          </div>
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <FormField v-slot="{ componentField }" name="firstName">
              <FormItem>
                <FormLabel>Nombres</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="john" v-bind="componentField" required />
                </FormControl>
                <!-- <FormDescription> This is your public display name. </FormDescription> -->
                <div v-auto-animate>
                  <FormMessage />
                </div>
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="lastName">
              <FormItem>
                <FormLabel>Apellidos</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="doe" v-bind="componentField" required />
                </FormControl>
                <!-- <FormDescription> This is your public display name. </FormDescription> -->
                <div v-auto-animate>
                  <FormMessage />
                </div>
              </FormItem>
            </FormField>
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
          <FormField v-slot="{ componentField }" name="repeatPassword">
            <FormItem>
              <FormLabel>Repetir contraseña</FormLabel>
              <FormControl>
                <Input type="password" v-bind="componentField" required />
              </FormControl>
              <!-- <FormDescription> This is your public display name. </FormDescription> -->
              <div v-auto-animate>
                <FormMessage />
              </div>
            </FormItem>
          </FormField>
          <!-- <div class="grid gap-2">
        <Label for="repeat-password">Confirmar contraseña</Label>
        <Input id="repeat-password" type="password" />
      </div> -->
        </CardContent>
        <CardFooter class="flex-col gap-4">
          <Button type="submit" class="w-full">
            <SvgSpinnersDotRevolve v-if="loading" class="mr-2 h-4 w-4" />
            <span>Crear cuenta</span>
          </Button>
          <Separator />
          <p class="text-left self-end text-sm text-muted-foreground">
            Ya tienes una cuenta?
            <RouterLink class="underline underline-offset-4" :to="{ name: 'login' }"
              >Iniciar sesión</RouterLink
            >
          </p>
        </CardFooter>
      </Card>
    </fieldset>
  </form>
</template>
