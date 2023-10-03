import { getServerSession } from 'next-auth'
import { hash } from 'bcrypt'
import prisma from '@/lib/db'

async function getAllUsers() {
  const allUsers = await prisma.user.findMany()
  return allUsers
}

async function createUser(email: string, password: string, name?: string) {
  const hashed = await hash(password, 12)
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
    },
  })
  return user
}

export default async function Home() {
  // const user = await createUser('test@test.com', 'test')
  // console.log(user)

  // const allUsers = await getAllUsers()
  // console.log(allUsers)

  const session = await getServerSession()
  console.log({ session })

  return <h1>Home</h1>
}
