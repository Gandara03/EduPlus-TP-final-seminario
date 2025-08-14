# EduPlus - Plataforma de Educación Online

Plataforma completa de educación online desarrollada con Next.js 15, React 19, TypeScript y Firebase.

## 🚀 Características

- **Catálogo de Cursos**: Búsqueda, filtros y paginación
- **Sistema de Usuarios**: Registro, login y perfiles personalizados
- **Panel de Administración**: Gestión de cursos y usuarios
- **Seguimiento de Progreso**: Módulos con videos y PDFs
- **Sistema de Favoritos**: Guardado de cursos preferidos
- **Comentarios y Calificaciones**: Sistema de reviews por curso
- **Diseño Responsivo**: Optimizado para todos los dispositivos

## 🛠️ Tecnologías

- **Frontend**: Next.js 15, React 19, TypeScript
- **Estilos**: Tailwind CSS, shadcn/ui, Radix UI
- **Backend**: Next.js API Routes, Firebase
- **Base de Datos**: Firestore
- **Autenticación**: Firebase Auth
- **Storage**: Firebase Storage

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd eduplus-platform
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crear archivo `.env.local` en la raíz del proyecto:
   ```env
   # Firebase Configuration (Cliente - NEXT_PUBLIC_)
   # Obtén estas credenciales desde la consola de Firebase
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
   
   # Firebase Admin Service Account (Servidor)
   FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"tu_proyecto",...}
   FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
   
   # NextAuth Configuration
   NEXTAUTH_SECRET=tu_secreto_aleatorio_aqui
   NEXTAUTH_URL=http://localhost:3000
   ```
   
   **⚠️ IMPORTANTE:** Nunca subas el archivo `.env.local` a GitHub. Ya está incluido en `.gitignore`.

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

5. **Construir para producción**
   ```bash
   npm run build
   npm start
   ```

## 🌐 Despliegue en Vercel

1. **Conectar repositorio de GitHub**
   - Ve a [vercel.com](https://vercel.com)
   - Conecta tu cuenta de GitHub
   - Importa el repositorio `eduplus-platform`

2. **Configurar variables de entorno** en Vercel:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`: Tu API key de Firebase
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: Tu dominio de autenticación de Firebase
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: Tu ID de proyecto de Firebase
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`: Tu bucket de almacenamiento
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: Tu ID de remitente
   - `NEXT_PUBLIC_FIREBASE_APP_ID`: Tu ID de aplicación
   - `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`: Tu ID de medición
   - `FIREBASE_SERVICE_ACCOUNT`: Tu cuenta de servicio de Firebase (JSON completo)
   - `FIREBASE_STORAGE_BUCKET`: Tu bucket de almacenamiento de Firebase
   - `NEXTAUTH_SECRET`: Una cadena secreta aleatoria para NextAuth
   - `NEXTAUTH_URL`: URL de tu aplicación (ej: https://tuapp.vercel.app)

3. **Desplegar automáticamente**
   - Vercel detectará automáticamente que es un proyecto Next.js
   - Se desplegará en cada push a la rama principal
   - Las variables de entorno se aplicarán automáticamente

## 📁 Estructura del Proyecto

```
app/
├── app/                    # App Router de Next.js
│   ├── admin/             # Panel de administración
│   ├── api/               # API Routes
│   ├── auth/              # Autenticación
│   ├── cursos/            # Páginas de cursos
│   ├── perfil/            # Perfil de usuario
│   └── page.tsx           # Página principal
├── components/             # Componentes reutilizables
│   └── ui/                # Componentes de shadcn/ui
├── lib/                    # Utilidades y configuración
├── public/                 # Archivos estáticos
└── styles/                 # Estilos globales
```

## 🧹 Archivos Limpiados para GitHub/Vercel

Los siguientes archivos han sido eliminados por seguridad y optimización:
- `bfg.jar` - Herramienta de desarrollo (14MB)
- `ngrok.exe` - Herramienta de desarrollo (27MB)
- `next-env.d.ts` - Generado automáticamente por Next.js
- `.dockerignore` - No necesario para Vercel
- `.next/` - Carpeta de build (se genera automáticamente)
- `node_modules/` - Dependencias (se instalan automáticamente)

## 🔐 Autenticación

- **Firebase Auth**: Sistema principal de autenticación
- **Verificación de Email**: Requerida para acceder a cursos
- **Sistema de Roles**: Usuarios normales y administradores

## 🛡️ Seguridad

- **Variables de entorno**: Todas las claves sensibles están en variables de entorno
- **Firebase Admin**: Solo se ejecuta en el servidor con credenciales seguras
- **NextAuth**: Configurado con secretos seguros
- **CORS**: Configurado para permitir solo dominios autorizados

### 🚨 **IMPORTANTE - ANTES DE SUBIR A GITHUB:**
- **NUNCA** subas credenciales reales de Firebase
- **NUNCA** subas archivos `.env.local` o `.env`
- **NUNCA** subas claves de API o tokens de acceso
- **Siempre** usa variables de entorno para configuraciones sensibles
- **Verifica** que no haya credenciales hardcodeadas en el código

## 📊 Base de Datos

- **Colección `cursos`**: Información de cursos
- **Colección `users`**: Perfiles de usuarios
- **Subcolecciones por usuario**: Progreso, favoritos, completados

## 🎨 Personalización

- **Tema**: Modo claro/oscuro
- **Componentes**: Sistema de diseño con shadcn/ui
- **Responsive**: Mobile-first design

## 📝 Scripts Disponibles

- `npm run dev`: Desarrollo local
- `npm run build`: Construcción para producción
- `npm run start`: Servidor de producción
- `npm run lint`: Linting del código

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas, contactar a través de issues del repositorio. 