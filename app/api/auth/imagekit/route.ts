import config from "@/lib/config";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const { 
    env: {
        imagekit: { publicKey, privateKey, urlEndpoint }, 
    }, 
} = config;

const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint });
//const imagekit = new ImageKit({ publicKey: publicKey as string, privateKey: privateKey as string, urlEndpoint: urlEndpoint as string });

export async function GET() {
    return NextResponse.json(imagekit.getAuthenticationParameters());
}