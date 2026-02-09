# 🛡️ ND Nory Seguros — Web + CRM de Captación de Leads

Sistema web completo para **captación, gestión y seguimiento de leads** enfocado en el sector asegurador.  
Incluye **landing page**, **API backend** y **CRM simple** conectado a **PostgreSQL (Supabase)**.

🔗 Landing (GitHub Pages):  
https://ernott.github.io/ndnoryseguros/

---

## 🎯 Objetivo del proyecto

Diseñar una solución digital que permita a una correduría de seguros:

- Captar leads cualificados desde web (Google / Instagram)
- Centralizar solicitudes en un CRM propio
- Clasificar, dar seguimiento y convertir prospectos
- Escalar sin depender solo de redes sociales

Este proyecto fue desarrollado como **MVP funcional**, con arquitectura preparada para producción.

---

## 🧱 Arquitectura del sistema

Landing Page (HTML + Tailwind)
│
▼
REST API (Node.js + Express)
│
▼
PostgreSQL (Supabase)

## 🖥️ Frontend (Landing Page)

- HTML semántico
- Tailwind CSS
- Optimizada para conversión (CTA + formulario)
- Pensada para tráfico desde:
  - Instagram
  - Google Search (SEO-ready)

📂 Archivo principal:
index.html

---

## ⚙️ Backend (CRM API)

API REST desarrollada con **Node.js + Express**.

### Funcionalidades:

- Crear leads
- Listar leads
- Filtrar por estado, servicio o fuente
- Actualizar estado y notas del lead
- Health check para monitoreo

📂 Ubicación:
crm/backend/

### Endpoints principales:

GET /health
GET /api/leads
POST /api/leads
PATCH /api/leads/:id

---

## 🗄️ Base de datos

- PostgreSQL (Supabase)
- Pooler IPv4 (Session Pooler)
- Esquema optimizado con índices
- Enum para estados del lead

📄 Schema:
crm/crm_schema.sql

### Estados del lead:

- new
- contacted
- qualified
- quoted
- won
- lost

---

## 🔐 Seguridad

- Variables sensibles gestionadas con `.env`
- `.env` y `node_modules` excluidos del repositorio
- Arquitectura preparada para despliegue seguro

---

## 🚀 Tecnologías utilizadas

- HTML5
- Tailwind CSS
- JavaScript
- Node.js
- Express
- PostgreSQL
- Supabase
- Git & GitHub
- GitHub Pages

---

## 📦 Instalación local (Backend)

```bash
cd crm/backend
npm install
npm run dev
```

---

## 👨‍💻 Autor

Javier A. Carbone
Desarrollador Full Stack en formación
Enfoque en soluciones web orientadas a negocio
