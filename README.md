# Padel App

🟩🟩🟩🟩🟩🟩🟩⬛⬛⬛ 70% Completado

## Tabla de contenidos:

- [Demo](#demo)
- [Acerca del Proyecto](#acerca-del-proyecto-)
- [Roles de usuario](#roles-de-usuario-)
- [Tecnologías Usadas](#tecnologías-usadas-%EF%B8%8F--%EF%B8%8F)
- [Setup / Instalación](#setup--instalación-)
- [Status](#status-)
- [Imágenes](#imágenes)
- [Licencia](#licencia-%EF%B8%8F)

## Demo

Puedes ver una demo del proyecto desplegado en Vercel [aqui](https://padel-app-two.vercel.app/)

## Acerca del Proyecto 📚

El proyecto consiste en una aplicación completa de reserva de pistas de pádel. Un tipo de usuarios crean pistas, con sus horarios y precios determinados y otros usuarios pueden reservar estas pistas.

El objetivo principal es eliminar a la persona intermediaria que se encarga de atender a los clientes, reservar las pistas... etc y automatizar el proceso.

## Roles de usuario 🔗

`USER` - La funcionalidad principal de este usuario es poder reservar las pistas que haya disponibles. También puede: Hacer depósitos de fondos / Editar el perfil / Escribir reseñas / Cancelar reservas de pistas / Enviar mensajes de soporte (funcionalidad no implementada todavía)

`ADMIN` - La funcionalidad principal de este usuario es poder crear las pistas que los usuarios con rol `USER` podrán reservar. También puede: Hacer depósitos y retiros / Editar el horario de apertura de las pistas / Añadir y eliminar horarios de reserva de las pisas / Hacer depósitos y retiros de fondos / Editar el perfil / Enviar mensajes de soporte (funcionalidad no implementada todavía)

`SUPERADMIN` - La funcionalidad principal de este usuario es poder editar/borrar y mantener el orden de la aplicación. Por tanto, puede: Editar usuarios y su rol o eliminarlos / Eliminar Pistas / Ver todas las transacciónes y aprobar o denegar los retiros / Responder mensajes de soporte (funcionalidad no implementada todavía)

## Tecnologías Usadas ☕️ 🐍 ⚛️:

`Front-end`: React.js, Next.js, Hooks, Context, Material UI, Animate.css, FullCalendar, Google Maps, Chart.js... entre otras.

`Back-end`: Next.js, NextAuth, Node.js, PostgresSQL, Prisma.js, PaypalApi, NodeMailer... entre otras.

## Setup / Instalación: 💻

1. `npm install` o `yarn install` - Instala las dependencias del proyecto
2. `npm run dev` o `yarn dev` - Abrirá un navegador con el proyecto

## Status: 📶

El proyecto ya es funcional, los usuarios pueden reservar pistas, ingresar dinero, retirar dinero, crear pistas... etc.

Faltan funcionalidades por añadir como serían: Sistema de torneos, Sistema de ranking de nivel de jugador, Recompensas...

## Imágenes

Se incluyen imágenes de las vistas de los 3 tipos de roles.

![Imagen 1](https://i.imgur.com/QlC5hLN.png)
![Imagen 2](https://i.imgur.com/aJPB3U5.png)
![Imagen 3](https://i.imgur.com/DaJspLw.png)
![Imagen 4](https://i.imgur.com/FLY23v9.png)
![Imagen 5](https://i.imgur.com/cw8MZCO.png)
![Imagen 6](https://i.imgur.com/hHuyFzM.png)
![Imagen 7](https://i.imgur.com/vcpBkZx.png)
![Imagen 8](https://i.imgur.com/1JGEIKN.png)
![Imagen 9](https://i.imgur.com/4PUohyT.png)
![Imagen 10](https://i.imgur.com/RCmXDMI.png)
![Imagen 11](https://i.imgur.com/AR1kqcB.png)

## Licencia: ©️

Licencia MIT [@danniiigt](https://github.com/danniiigt)
