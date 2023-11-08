import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function Home() {
  // console.log(prisma)

  const words = await prisma.word.findMany()
  console.log(words)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      HELLO W????
    </main>
  )
}
