import { ContentType } from "./ContentType"

export interface MessageTemplate {
  messageTemplateId: number
  subject: string
  body: string
  contentType: ContentType
  modelProvider: Object
  isSubjectStatic: boolean
  isBodyStatic: boolean
}