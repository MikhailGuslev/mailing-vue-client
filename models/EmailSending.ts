import { Recipient } from "./Recipient"
import { MessageTemplate } from "./MessageTemplate"

export interface EmailSending {
  emailSendingId: number
  name: string
  recipients: Recipient[]
  messageTemplate: MessageTemplate
}
