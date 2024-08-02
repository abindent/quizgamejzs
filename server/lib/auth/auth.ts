import { PrismaClient } from "@prisma/client";
import { hash, compare } from "bcryptjs";

const prisma = new PrismaClient();

export async function registerTeam(team: string, category: string, password: string, school: string, members: any, role: string) {
    const hashedPassword = await hash(password, 10);
    return prisma.team.create({
        data: {
            team,
            category,
            password: hashedPassword,
            school,
            member: members,
            role: role,

        },
    });
}

export async function verifyTeam(_id: string, password: string) {
    const teamRecord = await prisma.team.findUnique({
        where: {
            id: _id
        },
    });

    if (!teamRecord) {
        return null;
    }

    const isValid = await compare(password, teamRecord.password);
    if (!isValid) {
        return null;
    }

    return teamRecord;
}

export async function getRoomData(_rid: string) {
    const room_data = await prisma.room.findUnique({
        where: {
            id: _rid,
        },
        include: {
            teams: true
        }
    })

    if (!room_data) {
        return null;
    }

    return room_data;

}

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

export async function pushMessage(_tid: string, message: string) {
    return prisma.team.update({
        where: {
            id: _tid
        },
        data: {
            messages: {
                create: {
                    message
                }
            }
        },
        include: {
            messages: true
        },
    })
}
