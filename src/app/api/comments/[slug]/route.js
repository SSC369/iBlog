//EDITING COMMENT

import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  const { slug } = params;

  try {
    const body = await req.json();

    const comment = await prisma.comment.update({
      where: {
        id: slug,
      },
      data: {
        desc: {
          set: body,
        },
      },
    });

    return new NextResponse(JSON.stringify(comment, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

//DELETING COMMENT

export const DELETE = async (req, { params }) => {
  const { slug } = params;

  try {
    const comment = await prisma.comment.delete({
      where: {
        id: slug,
      },
    });
    return new NextResponse(JSON.stringify(comment, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
