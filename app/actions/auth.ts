'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export interface AuthResult {
  success: boolean
  error?: string
  user?: {
    id: string
    email: string
    userId?: string
  }
}

// 로그인 (아이디로만 로그인)
export async function loginAction(userId: string, password: string): Promise<AuthResult> {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('로그인 시도:', { userId })
    }
    const supabase = await createClient()

    // 아이디로 profiles에서 email 찾기
    const { data: userProfile } = await supabase
      .from('profiles')
      .select('email')
      .eq('user_id', userId.trim())
      .single()

    if (!userProfile || !userProfile.email) {
      return {
        success: false,
        error: '아이디 또는 비밀번호가 올바르지 않습니다.',
      }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: userProfile.email.toLowerCase(),
      password,
    })

    if (process.env.NODE_ENV === 'development') {
      console.log('로그인 응답:', { userId: data?.user?.id, error: error?.message })
    }

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('로그인 에러 상세:', {
          message: error.message,
          status: error.status,
          code: error.code,
        })
      }
      
      // 더 친절한 에러 메시지
      let errorMessage = '아이디 또는 비밀번호가 올바르지 않습니다.'
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = '아이디 또는 비밀번호가 올바르지 않습니다.'
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = '이메일 인증이 필요합니다. 이메일을 확인해주세요.'
      }
      
      return {
        success: false,
        error: errorMessage,
      }
    }

    if (!data.user) {
      return {
        success: false,
        error: '로그인에 실패했습니다.',
      }
    }

    // 프로필 정보 가져오기
    const { data: profile } = await supabase
      .from('profiles')
      .select('user_id, role, status')
      .eq('id', data.user.id)
      .single()

    // 마지막 로그인 시간 업데이트
    if (profile) {
      await supabase
        .from('profiles')
        .update({ last_login_at: new Date().toISOString() })
        .eq('id', data.user.id)
    }

    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email || '',
        userId: profile?.user_id,
      },
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Login error:', error)
    }
    return {
      success: false,
      error: '로그인 중 오류가 발생했습니다.',
    }
  }
}

// 회원가입
export async function signupAction(
  userId: string,
  name: string,
  email: string,
  password: string,
  phone?: string
): Promise<AuthResult> {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('Server Action 시작:', { userId, name, email, phone })
    }
    const supabase = await createClient()

    // 아이디 중복 체크
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', userId.trim())
      .single()

    if (existingProfile) {
      return {
        success: false,
        error: '이미 사용 중인 아이디입니다.',
      }
    }

    // 이메일 중복 체크
    const { data: existingEmail } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email.toLowerCase().trim())
      .single()

    if (existingEmail) {
      return {
        success: false,
        error: '이미 사용 중인 이메일입니다.',
      }
    }

    // 회원가입 (metadata 추가)
    if (process.env.NODE_ENV === 'development') {
      console.log('Supabase signUp 호출', { email, phone })
    }
    const metadata: Record<string, any> = {
      user_id: userId,
      name,
      display_name: name, // 이름을 display_name으로 저장
    }
    
    // phone이 있으면 metadata에 추가
    if (phone && phone.trim()) {
      metadata.phone = phone.trim()
    }
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })

    if (process.env.NODE_ENV === 'development') {
      console.log('SignUp 응답:', { 
        userId: data?.user?.id, 
        metadata: data?.user?.user_metadata,
        error 
      })
    }

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('SignUp 에러:', error)
      }
      return {
        success: false,
        error: error.message || '회원가입에 실패했습니다.',
      }
    }

    if (!data.user) {
      if (process.env.NODE_ENV === 'development') {
        console.error('User 데이터 없음')
      }
      return {
        success: false,
        error: '회원가입에 실패했습니다.',
      }
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('프로필 생성 시도:', { userId: data.user.id, user_id: userId, name, email, phone })
    }
    // 프로필 생성 (트리거가 실패할 수 있으므로 직접 생성)
    const phoneValue = phone && phone.trim() ? phone.trim() : null
    if (process.env.NODE_ENV === 'development') {
      console.log('저장할 phone 값:', phoneValue)
    }
    
    const { error: profileError, data: profileData } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        user_id: userId.trim(),
        name: name.trim(),
        email: email.toLowerCase(), // email도 저장 (user_id로 로그인 시 필요)
        phone: phoneValue,
        role: 'member',
        status: 'active',
      })
      .select()

    if (process.env.NODE_ENV === 'development') {
      console.log('프로필 생성 결과:', { profileError, profileData, savedPhone: profileData?.[0]?.phone })
    }

    // 프로필 생성 실패 시 에러 반환
    if (profileError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Profile creation error:', profileError)
      }
      // 사용자는 생성되었지만 프로필 생성 실패
      return {
        success: false,
        error: `프로필 생성 실패: ${profileError.message || '데이터베이스 오류가 발생했습니다.'}`,
      }
    }

    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email || '',
        userId,
      },
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Signup error:', error)
      console.error('Full error details:', JSON.stringify(error, null, 2))
    }
    const errorMessage = error instanceof Error ? error.message : '회원가입 중 오류가 발생했습니다.'
    return {
      success: false,
      error: errorMessage,
    }
  }
}

// 로그아웃
export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  // redirect는 서버에서만 작동하므로 클라이언트에서 호출 시 처리하지 않음
}

// 현재 사용자 정보 가져오기
export async function getCurrentUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  // 프로필 정보 가져오기
  const { data: profile } = await supabase
    .from('profiles')
    .select('user_id, name, email, role, status, phone')
    .eq('id', user.id)
    .single()

  return {
    id: user.id,
    email: profile?.email || user.email || '',
    userId: profile?.user_id,
    name: profile?.name,
    role: profile?.role || 'member',
    status: profile?.status || 'active',
    phone: profile?.phone,
  }
}
