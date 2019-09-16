import { prisma } from './generated/prisma-client'

async function main() {
    const postByUser = await prisma.user({email: 'bob@prisma.io'}).posts()
    console.log(`posts : ${JSON.stringify(postByUser)}`)
}

main().catch(e => console.error(e))
