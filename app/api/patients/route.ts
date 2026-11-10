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

export async function GET() {
  return NextResponse.json(patients);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newPatient: Patient = {
    id: Date.now().toString(),
    name: body.name,
    pathology: body.pathology,
    phone: body.phone,
    address: body.address
  };
  patients.push(newPatient);
  return NextResponse.json(newPatient, { status: 201 });
}
