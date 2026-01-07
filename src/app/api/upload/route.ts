import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('file') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files received.' },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), 'public/uploads/projects');
    
    // Ensure directory exists
    try {
        await fs.access(uploadDir);
    } catch {
        await fs.mkdir(uploadDir, { recursive: true });
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      // Create unique filename to avoid collision
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const ext = path.extname(file.name);
      const filename = `${path.basename(file.name, ext)}-${uniqueSuffix}${ext}`;
      
      const filePath = path.join(uploadDir, filename);
      await fs.writeFile(filePath, buffer);
      
      uploadedUrls.push(`/uploads/projects/${filename}`);
    }

    return NextResponse.json({ 
        success: true,
        urls: uploadedUrls 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Error uploading files.' },
      { status: 500 }
    );
  }
}
