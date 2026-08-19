import { NextResponse } from "next/server";
import { applicationsAreClosed } from "@/lib/application";

type ApplicationPayload = {
  fullName: string;
  year: string;
  course: string;
  studentNumber: string;
  registrationNumber: string;
  email: string;
  bio: string;
};

const VALID_YEARS = ["Year 1", "Year 2", "Year 3", "Year 4"];

export async function POST(request: Request) {
  try {
    if (applicationsAreClosed()) {
      return NextResponse.json(
        {
          success: false,
          error: "Applications closed on 28 August 2026",
        },
        { status: 410 },
      );
    }

    const body = (await request.json()) as ApplicationPayload;
    console.log("Received application payload:", body);

    const {
      fullName,
      year,
      course,
      studentNumber,
      registrationNumber,
      email,
      bio,
    } = body;

    if (
      typeof fullName !== "string" ||
      !fullName.trim() ||
      typeof year !== "string" ||
      typeof course !== "string" ||
      !course.trim() ||
      typeof studentNumber !== "string" ||
      !studentNumber.trim() ||
      typeof registrationNumber !== "string" ||
      !registrationNumber.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof bio !== "string" ||
      !bio.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "All fields are required",
        },
        { status: 400 },
      );
    }

    if (!VALID_YEARS.includes(year)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid course year",
        },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email address",
        },
        { status: 400 },
      );
    }

    if (bio.trim().length > 2000) {
      return NextResponse.json(
        {
          success: false,
          error: "Bio must be less than 2000 characters",
        },
        { status: 400 },
      );
    }

    const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET;

    if (!appsScriptUrl || !secret) {
      console.error("Google Apps Script environment variables are missing");

      return NextResponse.json(
        {
          success: false,
          error: "Server configuration error",
        },
        { status: 500 },
      );
    }

    const response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        secret,

        fullName: fullName.trim(),
        year,
        course: course.trim(),
        studentNumber: studentNumber.trim(),
        registrationNumber: registrationNumber.trim(),
        email: email.trim().toLowerCase(),
        bio: bio.trim(),
      }),
      redirect: "follow",
    });

    if (!response.ok) {
      console.error(
        "Apps Script request failed:",
        response.status,
        await response.text(),
      );

      return NextResponse.json(
        {
          success: false,
          error: "Unable to submit application",
        },
        { status: 502 },
      );
    }

    const result = await response.json();

    if (!result.success) {
      console.error("Apps Script rejected application:", result);

      return NextResponse.json(
        {
          success: false,
          error: result.error ?? "Unable to submit application",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Application submission error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while submitting the application",
        e: error,
      },
      { status: 500 },
    );
  }
}
