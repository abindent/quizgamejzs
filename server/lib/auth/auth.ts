import { PrismaClient, Member } from "@prisma/client";
import { hash, compare } from "bcryptjs";

const prisma = new PrismaClient();

export async function registerTeam(team: string, category: string, password: string, school: string, members: Member, role: string) {
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
            id: _id,
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


export async function getTeamData(_tid: string){
    const team_Data  = await prisma.team.findUnique({
        where: {
            id: _tid
        },
        include: {
            messages: true
        }
    })
}