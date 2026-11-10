import { NextResponse } from 'next/server';

export interface Patient {
  id: string;
  name: string;
  pathology: string;
  phone: string;
  address: string;
}

let patients: Patient[] = [
  {
    id: '1',
    name: 'María González',
    pathology: 'Hipertensión',
    phone: '+34612345678',
    address: 'Calle Mayor 123, Madrid'
  },
  {
    id: '2',
    name: 'Juan Pérez',
    pathology: 'Diabetes Tipo 2',
    phone: '+34687654321',
    address: 'Av. Libertad 45, Barcelona'
  }
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const patient = patients.find(p => p.id === params.id);
  if (!patient) {
    return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
  }
  return NextResponse.json(patient);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const index = patients.findIndex(p => p.id === params.id);
  if (index === -1) {
    return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
  }
  patients[index] = { ...patients[index], ...body };
  return NextResponse.json(patients[index]);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const index = patients.findIndex(p => p.id === params.id);
  if (index === -1) {
    return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
  }
  patients.splice(index, 1);
  return NextResponse.json({ success: true });
}
