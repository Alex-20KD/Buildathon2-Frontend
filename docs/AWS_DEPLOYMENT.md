# CI/CD de frontend con AWS Amplify

El CI instala dependencias de forma reproducible, ejecuta los comandos
disponibles de lint y pruebas, compila el sitio y conserva el artefacto durante
siete días. Está preparado para npm, pnpm o Yarn. Por defecto espera que el
build quede en `dist`; para Create React App usa `build` y para una exportación
estática de Next.js usa `out`, configurando la variable `FRONTEND_BUILD_DIR`.

El despliegue lo gestiona AWS Amplify. El workflow de GitHub lo inicia solamente
cuando el CI del commit en `main` termina correctamente; después espera el
resultado de Amplify y falla si la publicación falla. El archivo `amplify.yml`
especifica la instalación, el build y los artefactos para que el proceso sea
repetible.

## Configuración inicial de Amplify

1. En AWS Amplify, crea una aplicación y selecciona **GitHub** como repositorio.
2. Autoriza y selecciona `Alex-20KD/Buildathon2-Frontend`, rama `main`.
3. Conserva `amplify.yml` como configuración de build y desactiva **auto build**
   para la rama. GitHub iniciará los releases después de aprobar el CI.
4. Configura las variables de entorno necesarias para el build en **App settings
   → Environment variables**. Para una API Vite, usa `VITE_API_URL`.
5. Completa el alta. Amplify creará el hosting para la rama conectada.

Crea un proveedor OIDC de AWS con emisor
`https://token.actions.githubusercontent.com` y audiencia `sts.amazonaws.com`.
El rol debe permitir `amplify:StartJob` y `amplify:GetJob` solamente sobre la
aplicación y rama de producción de Amplify. Limita la política de confianza al
subject `repo:Alex-20KD/Buildathon2-Frontend:environment:production` y guarda
el ARN del rol como secreto `AWS_AMPLIFY_DEPLOY_ROLE_ARN`.

## Variables y directorio de salida

El CI de GitHub conserva `FRONTEND_BUILD_DIR` como variable para encontrar el
artefacto. Amplify usa `baseDirectory` en `amplify.yml`. Ambos se inicializan en
`dist`. Si el framework genera otra carpeta, cámbialos a la vez:

| Framework | Valor |
| --- | --- |
| Vite / Angular | `dist` (o el subdirectorio configurado por Angular) |
| Create React App | `build` |
| Next.js estático | `out` |

Las variables públicas de API se definen en Amplify, no como secretos de
GitHub. En **Settings → Secrets and variables → Actions → Variables** añade
`AWS_REGION`, `AMPLIFY_APP_ID` y, si no se despliega `main`, `AMPLIFY_BRANCH`.
Cada push a `main` se publica solo después de aprobar la validación de GitHub.
