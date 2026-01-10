export async function listPoslll() {
  const req = await fetch('/api/poslll/list', {
    method: 'GET',
  });
  const res = await req.json();

  return res;
}
