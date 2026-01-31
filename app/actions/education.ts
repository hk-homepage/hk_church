'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/app/actions/auth'
import { isAdmin } from '@/lib/utils/permissions'
import { revalidatePath } from 'next/cache'
import type {
  EducationProgram,
  CreateEducationProgramInput,
  UpdateEducationProgramInput,
} from '@/types/education'

export interface EducationProgramResult {
  success: boolean
  error?: string
  id?: string
}

/**
 * 교회교육 프로그램 목록 조회 (공개)
 */
export async function getEducationPrograms(): Promise<EducationProgram[]> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('church_education_programs')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true })

    if (error) {
      console.error('getEducationPrograms error:', error)
      return []
    }

    return (data || []).map((row: Record<string, unknown>) => ({
      id: String(row.id),
      title: String(row.title),
      description: String(row.description ?? ''),
      schedule: String(row.schedule ?? ''),
      display_order: Number(row.display_order ?? 0),
      created_at: String(row.created_at),
      updated_at: String(row.updated_at),
    }))
  } catch (error) {
    console.error('getEducationPrograms error:', error)
    return []
  }
}

/**
 * 교회교육 프로그램 추가 (관리자만)
 */
export async function createEducationProgram(
  input: CreateEducationProgramInput
): Promise<EducationProgramResult> {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { success: false, error: '로그인이 필요합니다.' }
    }
    if (!isAdmin(user)) {
      return { success: false, error: '관리자만 편집할 수 있습니다.' }
    }

    const title = input.title?.trim()
    if (!title) {
      return { success: false, error: '제목을 입력해주세요.' }
    }

    const supabase = await createClient()

    const { data: maxRow } = await supabase
      .from('church_education_programs')
      .select('display_order')
      .order('display_order', { ascending: false })
      .limit(1)
      .single()

    const nextOrder = maxRow?.display_order != null ? Number(maxRow.display_order) + 1 : 0

    const { data, error } = await supabase
      .from('church_education_programs')
      .insert({
        title,
        description: input.description?.trim() ?? '',
        schedule: input.schedule?.trim() ?? '',
        display_order: nextOrder,
      })
      .select('id')
      .single()

    if (error) {
      console.error('createEducationProgram error:', error)
      return { success: false, error: error.message ?? '등록에 실패했습니다.' }
    }

    revalidatePath('/nurturing/education')
    return { success: true, id: data?.id }
  } catch (error) {
    console.error('createEducationProgram error:', error)
    return { success: false, error: '등록 중 오류가 발생했습니다.' }
  }
}

/**
 * 교회교육 프로그램 수정 (관리자만)
 */
export async function updateEducationProgram(
  id: string,
  input: UpdateEducationProgramInput
): Promise<EducationProgramResult> {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { success: false, error: '로그인이 필요합니다.' }
    }
    if (!isAdmin(user)) {
      return { success: false, error: '관리자만 편집할 수 있습니다.' }
    }

    const updates: Record<string, unknown> = {}
    if (input.title !== undefined) updates.title = input.title.trim()
    if (input.description !== undefined) updates.description = input.description.trim()
    if (input.schedule !== undefined) updates.schedule = input.schedule.trim()
    if (Object.keys(updates).length === 0) {
      return { success: true, id }
    }

    const supabase = await createClient()

    const { error } = await supabase
      .from('church_education_programs')
      .update(updates)
      .eq('id', id)

    if (error) {
      console.error('updateEducationProgram error:', error)
      return { success: false, error: error.message ?? '수정에 실패했습니다.' }
    }

    revalidatePath('/nurturing/education')
    return { success: true, id }
  } catch (error) {
    console.error('updateEducationProgram error:', error)
    return { success: false, error: '수정 중 오류가 발생했습니다.' }
  }
}

/**
 * 교회교육 프로그램 표시 순서 변경 (관리자만, 드래그 앤 드롭용)
 */
export async function reorderEducationPrograms(
  orderedIds: string[]
): Promise<EducationProgramResult> {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { success: false, error: '로그인이 필요합니다.' }
    }
    if (!isAdmin(user)) {
      return { success: false, error: '관리자만 순서를 변경할 수 있습니다.' }
    }

    const supabase = await createClient()

    for (let i = 0; i < orderedIds.length; i++) {
      const { error } = await supabase
        .from('church_education_programs')
        .update({ display_order: i })
        .eq('id', orderedIds[i])

      if (error) {
        console.error('reorderEducationPrograms error:', error)
        return { success: false, error: error.message ?? '순서 변경에 실패했습니다.' }
      }
    }

    revalidatePath('/nurturing/education')
    return { success: true }
  } catch (error) {
    console.error('reorderEducationPrograms error:', error)
    return { success: false, error: '순서 변경 중 오류가 발생했습니다.' }
  }
}

/**
 * 교회교육 프로그램 삭제 (관리자만)
 */
export async function deleteEducationProgram(id: string): Promise<EducationProgramResult> {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { success: false, error: '로그인이 필요합니다.' }
    }
    if (!isAdmin(user)) {
      return { success: false, error: '관리자만 삭제할 수 있습니다.' }
    }

    const supabase = await createClient()

    const { error } = await supabase
      .from('church_education_programs')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('deleteEducationProgram error:', error)
      return { success: false, error: error.message ?? '삭제에 실패했습니다.' }
    }

    revalidatePath('/nurturing/education')
    return { success: true, id }
  } catch (error) {
    console.error('deleteEducationProgram error:', error)
    return { success: false, error: '삭제 중 오류가 발생했습니다.' }
  }
}
