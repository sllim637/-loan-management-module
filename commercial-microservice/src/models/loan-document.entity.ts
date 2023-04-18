import { DocumentState } from "./document-state.enum"

export class LoanDocument {
    id : string
    firstName: string
    lastName: string
    email: string
    amount: number
    devise: string
    createdAt: number
    periodStart: number
    periodEnd: number
    incomeOfTheYear: number
    state : DocumentState
}