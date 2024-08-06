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
    const teamRecord = await prisma.team.findUniqueOrThrow({
        where: {
            id: _id,
        }
    });

    if (!teamRecord) {
        return null;
    }

    const isValid = await compare(password, teamRecord.password);
    if (!isValid) {
        return null;
    }

    const _finalRecord = {
        id: teamRecord.id,
        team: teamRecord.team,
        members: {...teamRecord.member},
        role: teamRecord.role,
        school: teamRecord.school
    }

    return _finalRecord;
}


export async function getTeamData(_tid: string){
    const team_Data  = await prisma.team.findUnique({
        where: {
            id: _tid
        },
    })

    const _finalRecord = {
        id: team_Data?.id,
        team: team_Data?.team,
        members: {...team_Data?.member},
        role: team_Data?.role,
        school: team_Data?.school
    }

    return _finalRecord;
}