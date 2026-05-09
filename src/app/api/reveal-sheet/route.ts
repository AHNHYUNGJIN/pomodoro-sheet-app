import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const correctPassword = process.env.APP_PASSWORD;
    const sheetUrl = process.env.GOOGLE_SHEET_URL;

    if (password === correctPassword) {
      return NextResponse.json({ success: true, url: sheetUrl });
    } else {
      return NextResponse.json({ success: false, message: '비밀번호가 틀렸습니다.' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
