import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getTeamMessageData(_tid: string) {
    const team_data = await prisma.team.findUnique({
        where: {
            id: _tid
        },
        include: {
            messages: true
        }
    })

    if (!team_data) {
        return null;
    }

    return team_data.messages;
}

export async function pushMessage(_tid: string, type: string, message: string, round: string, qno: string) {
    const _messageData = await prisma.team.update({
        where: {
            id: _tid
        },
        data: {
            messages: {
                create: [
                    { message: message, type: type, round: round, qno: qno },
                ]
            }
        },
        include: {
            messages: true
        },
    })
    return _messageData
}
