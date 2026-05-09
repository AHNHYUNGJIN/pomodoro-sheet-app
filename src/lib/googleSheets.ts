const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz41JpymvGfqBCe-JXQf-65SD-HC9vbpefD_PNwj9d0ZtmXDBHhVHkaIRfMCuUIZ1GLTA/exec';

export const getTodos = async () => {
  const response = await fetch(SCRIPT_URL);
  if (!response.ok) throw new Error('Failed to fetch from Google Script');
  return response.json();
};

export const appendTodo = async (id: string, text: string) => {
  const response = await fetch(SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'add', id, text }),
  });
  if (!response.ok) throw new Error('Failed to append to Google Script');
};

export const updateTodoStatus = async (id: string, completed: boolean) => {
  const response = await fetch(SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'update', id, completed }),
  });
  if (!response.ok) throw new Error('Failed to update Google Script');
};

export const deleteTodo = async (id: string) => {
  const response = await fetch(SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'delete', id }),
  });
  if (!response.ok) throw new Error('Failed to delete from Google Script');
};
