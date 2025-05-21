# Instrucciones para GitHub Copilot

Este proyecto es una aplicación de gestión de tareas desarrollada con Angular 19, utilizando NgRx para el manejo del estado y TailwindCSS para los estilos.

## Tecnologías y herramientas

- **Framework**: Angular 19
- **Estado global**: NgRx (Store, Effects, Actions, Reducers, Selectors)
- **Estilos**: TailwindCSS
- **Lenguaje**: TypeScript

## Estructura del proyecto

Organizar los archivos de la siguiente manera:

```
src/
├── app/
│   ├── components/
│   │   └── task-list/
│   │       └── task-list.component.ts
│   │       └── task-list.component.html
│   ├── models/
│   │   └── task.model.ts
│   ├── store/
│   │   ├── index.ts                // (Opcional) Barrel file para el estado global
│   │   ├── app.state.ts            // Define la forma del estado global
│   │   └── task/                   // Feature store para Tareas
│   │       ├── task.actions.ts
│   │       ├── task.reducer.ts
│   │       ├── task.selectors.ts
│   │       ├── task.effects.ts     // Si tienes efectos secundarios
│   │       └── task.state.ts       // Define la forma del estado de tareas
│   ├── app.module.ts
│   ├── app.component.ts
│   └── app.component.html
├── index.html
├── styles.css
└── main.ts
```

## Convenciones de codificación

- Utilizar nombres explícitos para las acciones, por ejemplo: `[Tasks] Load Tasks Success`.
- Emplear las funciones `createAction`, `createReducer` y `createEffect` de NgRx.
- Implementar módulos de características y estados de características (e.g., `tasks` feature).
- Separar los archivos en carpetas según su función: `actions`, `reducers`, `effects`, `selectors`.
- Crear interfaces para los estados y modelos (e.g., `Task`).
- Aplicar clases de TailwindCSS en los componentes para estilos simples (evitar CSS tradicionales).

## Funcionalidades principales

- Listar tareas.
- Agregar una nueva tarea.
- Marcar tarea como completada.
- Eliminar tarea.
- Guardar tareas en memoria (sin backend por ahora).
