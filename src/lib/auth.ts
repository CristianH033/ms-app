import { supabase } from './supabase.client'

export const listenToAuthChanges = () => {
  const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
    console.log(event)

    switch (event) {
      case 'INITIAL_SESSION':
        console.log('User initial session')
        break
      case 'SIGNED_IN':
        console.log('User signed in')
        break
      case 'SIGNED_OUT':
        console.log('User signed out')
        break
      case 'PASSWORD_RECOVERY':
        console.log('User password recovery')
        break
      case 'TOKEN_REFRESHED':
        console.log('User token refreshed')
        break
      case 'USER_UPDATED':
        console.log('User updated')
        break
      default:
        break
    }
  })

  return authListener
}

export const loginWithEmailPassword = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const singupWithEmailPassword = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName
      }
    }
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }

  return true
}

export const checkAuth = async () => {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    throw new Error(error.message)
  }

  if (!data.session) {
    return false
  }

  return true
}
