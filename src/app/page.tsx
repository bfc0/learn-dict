import { PrismaClient } from "@prisma/client"
import Quiz from "./components/quiz"

const prisma = new PrismaClient()

export default async function Home() {

  const words = await prisma.word.findMany()

  return (
    <main>
      <Quiz words={words} />
    </main>
  )
}
