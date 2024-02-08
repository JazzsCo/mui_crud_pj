import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const pets = await prisma.pet.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(pets);
  } catch (error) {
    console.log("[PETS_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      pawrent,
      status,
      breed,
      address,
      city,
      township,
      phone,
      birthday,
      gender,
    } = await req.json();

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!pawrent) {
      return new NextResponse("Pawrent is required", { status: 400 });
    }

    if (!status) {
      return new NextResponse("Status is required", { status: 400 });
    }

    if (!breed) {
      return new NextResponse("Breed is required", { status: 400 });
    }

    if (!address) {
      return new NextResponse("Address is required", { status: 400 });
    }

    if (!city) {
      return new NextResponse("City is required", { status: 400 });
    }

    if (!township) {
      return new NextResponse("Township is required", { status: 400 });
    }

    if (!phone) {
      return new NextResponse("Phone is required", { status: 400 });
    }

    if (!birthday) {
      return new NextResponse("Birthday is required", { status: 400 });
    }

    if (!gender) {
      return new NextResponse("Gender is required", { status: 400 });
    }

    const pet = await prisma.pet.create({
      data: {
        name,
        pawrent,
        status,
        breed,
        address,
        city,
        township,
        phone,
        birthday,
        gender,
      },
    });

    return NextResponse.json(pet);
  } catch (error) {
    console.log("[PET_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

// export async function PATCH(
//   req: NextRequest,
//   {
//     params,
//   }: {
//     params: { storeId: string; billboardId: string };
//   }
// ) {
//   try {
//     const { getUser, isAuthenticated } = getKindeServerSession();

//     const body = await req.json();
//     const { name, imageUrl } = body;

//     const user = await getUser();

//     if (!(await isAuthenticated()) && !user) {
//       return new NextResponse("Unauthenticated", { status: 401 });
//     }

//     if (!name) {
//       return new NextResponse("Name is required", { status: 400 });
//     }

//     if (!imageUrl) {
//       return new NextResponse("Image is required", { status: 400 });
//     }

//     const billboard = await prisma.billboard.updateMany({
//       data: {
//         name,
//         imageUrl,
//       },
//       where: {
//         id: params.billboardId,
//         storeId: params.storeId,
//       },
//     });

//     return NextResponse.json(billboard);
//   } catch (error) {
//     console.log("[BILLBOARD_PATCH]", error);
//     return new NextResponse("Internal server error", { status: 500 });
//   }
// }

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new NextResponse("ID is required", { status: 400 });
    }

    const pet = await prisma.pet.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(pet);
  } catch (error) {
    console.log("[PET_DELETE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
