import { NextRequest, NextResponse } from 'next/server';
import { getTodos, appendTodo, updateTodoStatus, deleteTodo } from '@/lib/googleSheets';

export async function GET() {
  try {
    const todos = await getTodos();
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { id, text } = await req.json();
    await appendTodo(id, text);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding todo:', error);
    return NextResponse.json({ error: 'Failed to add todo' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, completed } = await req.json();
    await updateTodoStatus(id, completed);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    await deleteTodo(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}
