// 교회교육 프로그램 타입 정의

export interface EducationProgram {
  id: string
  title: string
  description: string
  schedule: string
  display_order: number
  created_at: string
  updated_at: string
}

export interface CreateEducationProgramInput {
  title: string
  description: string
  schedule: string
  display_order?: number
}

export interface UpdateEducationProgramInput {
  title?: string
  description?: string
  schedule?: string
  display_order?: number
}
