import ImageKit from 'imagekit';
import dummyBooks from '../dummybooks.json';
import { books } from '@/database/schema';
import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

config({path: '.env.local'});

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

const imageKit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
})

const uploadToImageKit = async (url: string, fileName: string, folder: string) => {
    try {
        const response = await imageKit.upload({
            file: url,
            fileName,
            folder,
        });

        return response.filePath;
    } catch (error) {
        console.error("Error uploading image to ImageKit:", error);
        
    }
};

const seed = async () => {
    console.log("Seeding data ...");

    try {
        for(const book of dummyBooks){
            const cover_url = (await uploadToImageKit(
                book.coverUrl, 
                `${book.title}.jpg`, 
                "/books/covers",
            )) as string;

            const video_url = (await uploadToImageKit(
                book.videoUrl, 
                `${book.title}.mp4`, 
                "/books/videos",
            )) as string;

            await db.insert(books).values({
                ...book,
                coverUrl:cover_url,
                videoUrl:video_url,
            });
        }

        console.log("");
    } catch (error) {
        console.log("Error seeding data:", error);
    }
};

seed();