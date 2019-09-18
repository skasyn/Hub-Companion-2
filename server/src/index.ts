import { prisma, Activity, User } from './generated/prisma-client'

async function main() {
    const postByUser: User = await prisma.user({token: "abon"})
    const activities: Activity[] = await prisma.user({token: "abon"}).activities()
    const user: User[] = await prisma.activity({code: "a"}).registered()
    const a = await prisma.updateActivity({where: {code: "a"}, data: {registered: {connect: {token: "abon"}}}})
    // console.log(`a: ${a}`)
    console.log(`users : ${JSON.stringify(postByUser)}`)
    console.log(`activities : ${JSON.stringify(activities)}`)
    console.log(`users : ${JSON.stringify(user)}`)
}

main().catch(e => console.error(e))
