# 📋 Agenda de Pacientes

Aplicación web moderna para gestionar pacientes con acceso directo a WhatsApp, optimizada para iPhone.

## ✨ Características

- 📱 **Diseño responsive** optimizado para iPhone y dispositivos móviles
- 💬 **Botón de WhatsApp** en cada paciente para contacto directo
- ✏️ **CRUD completo** - Crear, leer, actualizar y eliminar pacientes
- 🎨 **Interfaz moderna** con animaciones suaves
- 📲 **PWA** - Se puede instalar como app en iPhone
- 🚀 **API REST** completa con Next.js

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + Next.js 14
- **Backend**: Next.js API Routes
- **Lenguaje**: TypeScript
- **Estilos**: CSS Modules

## 📦 Instalación

```bash
npm install
```

## 🚀 Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📱 Instalación en iPhone

1. Abre la app en Safari
2. Toca el botón de compartir
3. Selecciona "Agregar a pantalla de inicio"
4. ¡Listo! La app aparecerá en tu pantalla como una app nativa

## 🔌 API Endpoints

### GET /api/patients
Obtiene todos los pacientes

### POST /api/patients
Crea un nuevo paciente
```json
{
  "name": "María González",
  "pathology": "Hipertensión",
  "phone": "+34612345678",
  "address": "Calle Mayor 123"
}
```

### GET /api/patients/[id]
Obtiene un paciente específico

### PUT /api/patients/[id]
Actualiza un paciente

### DELETE /api/patients/[id]
Elimina un paciente

## 💡 Características de la Interfaz

- **Tarjetas de pacientes** con toda la información visible
- **Botón de WhatsApp** que abre directamente la conversación
- **Formulario deslizante** para agregar nuevos pacientes
- **Confirmación** antes de eliminar pacientes
- **Diseño adaptable** que funciona perfectamente en iPhone y escritorio

## 🌐 Producción

```bash
npm run build
npm start
```
