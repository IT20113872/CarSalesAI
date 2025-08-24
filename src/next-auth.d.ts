import NextAuth, { DefaultSession } from "next-auth"
import { UserType } from "@prisma/client" // import your enum from Prisma schema

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      userType?: UserType | null
      onboardingCompleted: boolean
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    userType?: UserType | null
    onboardingCompleted: boolean
  }
}
