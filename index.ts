import { prisma, Activity, User } from './generated/prisma-client'

async function main() {
    const postByUser: User = await prisma.user({email: "eude"})
    const activities: Activity[] = await prisma.user({email: "eude"}).activities()
    const user: User[] = await prisma.activity({code: "a"}).registered()
    const a = await prisma.updateActivity({where: {code: "a"}, data: {registered: {connect: {id: "5d80d0f324aa9a000872c561"}}}})
    // console.log(`a: ${a}`)
    console.log(`users : ${JSON.stringify(postByUser)}`)
    console.log(`activities : ${JSON.stringify(activities)}`)
    console.log(`users : ${JSON.stringify(user)}`)
}

main().catch(e => console.error(e))
