'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { VALID_DEPARTMENTS, VALID_SECTORS, VALID_GRAD_YEARS } from '@/lib/constants/formOptions'

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

export async function login(formData: FormData) {
  const email = (formData.get('email') as string)?.trim()
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Please enter both email and password' }
  }

  if (!isValidEmail(email)) {
    return { error: 'Please enter a valid email address' }
  }

  const supabase = await createClient()

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error || !authData?.user) {
    return { error: error?.message || 'Invalid credentials. Please verify your email and password.' }
  }

  // Query role directly using the authenticated user id
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', authData.user.id)
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
  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const password = formData.get('password') as string
  const role = formData.get('role') as 'STUDENT' | 'RECRUITER' | 'OFFICER'
  const fullName = (formData.get('fullName') as string)?.trim()
  const rollNumber = (formData.get('rollNumber') as string)?.trim().toUpperCase()
  const department = (formData.get('department') as string)?.trim()
  const graduationYearRaw = formData.get('graduationYear')
  
  const companyName = (formData.get('companyName') as string)?.trim()
  const industrySector = (formData.get('industrySector') as string)?.trim()
  const contactPerson = (formData.get('contactPerson') as string)?.trim()
  const companyWebsite = (formData.get('companyWebsite') as string)?.trim()

  // 1. Base Validation
  if (!email || !password || !role) {
    return { error: 'Email, password, and role are required' }
  }

  if (!isValidEmail(email)) {
    return { error: 'Please provide a valid institutional or business email address' }
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters long' }
  }

  if (!['STUDENT', 'RECRUITER', 'OFFICER'].includes(role)) {
    return { error: 'Invalid account role selected' }
  }

  // 2. Student Role Validation
  let graduationYear = 2025
  if (role === 'STUDENT') {
    if (!fullName || fullName.length < 2) {
      return { error: 'Please enter your full first and last name' }
    }

    if (!rollNumber || rollNumber.length < 3 || rollNumber.length > 25) {
      return { error: 'Roll number must be between 3 and 25 characters' }
    }

    if (!department) {
      return { error: 'Please select a valid academic department' }
    }

    graduationYear = Number(graduationYearRaw)
    if (isNaN(graduationYear) || graduationYear < 2020 || graduationYear > 2035) {
      return { error: 'Please select a valid graduation year (2024 - 2030)' }
    }
  }

  // 3. Recruiter Role Validation
  if (role === 'RECRUITER') {
    if (!companyName || companyName.length < 2) {
      return { error: 'Please enter a valid company or organization name' }
    }

    if (!industrySector) {
      return { error: 'Please select an industry sector' }
    }

    if (!contactPerson || contactPerson.length < 2) {
      return { error: 'Please enter a contact person or HR representative name' }
    }

    if (companyWebsite && !companyWebsite.startsWith('http://') && !companyWebsite.startsWith('https://')) {
      return { error: 'Company website must start with http:// or https://' }
    }
  }

  const supabase = await createClient()

  // 4. Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError || !authData.user) {
    return { error: authError?.message || 'Could not create account. Email may already be registered.' }
  }

  // 5. Insert into profiles
  const { error: profileError } = await supabase.from('profiles').insert({
    id: authData.user.id,
    email,
    role,
  })

  if (profileError) {
    return { error: profileError.message }
  }

  // 6. Insert into role-specific table
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
      contact_phone: contactPerson,
      company_website: companyWebsite || null
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
