import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    // 解析表单数据
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    // 读取图片数据
    const imageBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);

    // 使用sharp提高图片清晰度
    const enhancedImage = await sharp(buffer)
      .sharpen(1.5, 1.0, 2.0) // sigma, flat, jagged
      .toBuffer();

    // 将Buffer转换为Uint8Array以解决类型问题
    const uint8Array = new Uint8Array(enhancedImage);
    
    // 返回处理后的图片
    return new NextResponse(uint8Array, {
      headers: {
        'Content-Type': imageFile.type,
        'Content-Disposition': `inline; filename="enhanced-${imageFile.name}"`
      }
    });
  } catch (error) {
    console.error('Error enhancing image:', error);
    return NextResponse.json({ error: 'Failed to enhance image' }, { status: 500 });
  }
}
