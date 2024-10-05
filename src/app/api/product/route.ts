import { prismaClient } from "@/lib/db";
import NEXT_AUTH from "@/lib/nextAuth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    const session = await getServerSession(NEXT_AUTH);
    if (!session) {
        return NextResponse.json([]);
    }
    const user = await prismaClient.user.findUnique({
        where: {
            email: session.user?.email ?? ""
        }
    })
    const products = await prismaClient.product.findMany({
        where: {
            userId: user?.id
        }
    });
    console.log(products);
    return NextResponse.json(products);
}

export async function DELETE(req: NextRequest) {
    const data = await req.json();
    await prismaClient.product.delete({
        where: {id: data.id}
    });
    return NextResponse.json({message: "deleted"});
}

export async function PUT(req: NextRequest) {
    const data = await req.json();
    await prismaClient.product.update({
        where: {
            id: data.id,
        },
        data: {
            name: data.name,
            quantity: data.quantity,
        }
    });
    return NextResponse.json({message: "updated"});
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    const session = await getServerSession(NEXT_AUTH);
    console.log(session);
    if (!session) {
        return NextResponse.json({message: "unauthorized"})
    }
    const user = await prismaClient.user.findUnique({
        where: {
            email: session.user?.email ?? ""
        }
    })
    await prismaClient.product.create({
        data: {
            name: data.name,
            quantity: data.quantity,
            image: data.image,
            userId: user?.id ?? ""
        }
    });
    return NextResponse.json({message: "product added"});
}