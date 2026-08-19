'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // Find their role and redirect accordingly
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unknown error occurred' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role === 'STUDENT') {
    redirect('/student/dashboard')
  } else if (profile?.role === 'RECRUITER') {
    redirect('/recruiter/dashboard')
  } else if (profile?.role === 'OFFICER') {
    redirect('/officer/dashboard')
  }

  // Default redirect if role not matched
  redirect('/student/dashboard')
}

export async function register(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const role = formData.get('role') as 'STUDENT' | 'RECRUITER' | 'OFFICER'
  const fullName = formData.get('fullName') as string
  const rollNumber = formData.get('rollNumber') as string
  const department = formData.get('department') as string
  const graduationYear = Number(formData.get('graduationYear'))
  
  const companyName = formData.get('companyName') as string
  const industrySector = formData.get('industrySector') as string
  const contactPhone = formData.get('contactPhone') as string
  const companyWebsite = formData.get('companyWebsite') as string

  if (!email || !password || !role) {
    return { error: 'Email, password, and role are required' }
  }

  const supabase = await createClient()

  // 1. Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError || !authData.user) {
    return { error: authError?.message || 'Could not create user account' }
  }

  // 2. Insert into profiles
  const { error: profileError } = await supabase.from('profiles').insert({
    id: authData.user.id,
    email,
    role,
  })

  if (profileError) {
    return { error: profileError.message }
  }

  // 3. Insert into role-specific table
  if (role === 'STUDENT') {
    const { error: studentError } = await supabase.from('students').insert({
      user_id: authData.user.id,
      full_name: fullName,
      roll_number: rollNumber,
      department: department,
      graduation_year: graduationYear,
      gpa: 0.00 // Default, can be updated later
    })
    
    if (studentError) {
      return { error: studentError.message }
    }
  } else if (role === 'RECRUITER') {
    const { error: recruiterError } = await supabase.from('recruiters').insert({
      user_id: authData.user.id,
      company_name: companyName,
      industry_sector: industrySector,
      contact_phone: contactPhone,
      company_website: companyWebsite
    })
    
    if (recruiterError) {
      return { error: recruiterError.message }
    }
  }

  // Success, redirect to login
  redirect('/auth/login?registered=true')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/auth/login')
}
