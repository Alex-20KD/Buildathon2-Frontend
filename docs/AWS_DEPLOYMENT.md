# CI/CD de frontend Vite con AWS Amplify

El CI usa Node.js 22 y `package-lock.json`. Ejecuta `npm ci`, auditoría de
dependencias de producción, ESLint y `npm run build`; este último verifica
TypeScript con `tsc -b` y genera el sitio estático en `dist/`. Finalmente abre
la vista previa de Vite y exige una respuesta HTTP correcta antes de guardar
el artefacto.

Tras un CI exitoso en `main`, el deploy inicia un release de AWS Amplify y
espera el estado final. El archivo `amplify.yml` instala con npm, compila el
proyecto Vite y publica exactamente `dist/`.

## Configuración inicial de Amplify

1. En AWS Amplify, crea una aplicación y conecta el repositorio
   `Alex-20KD/Buildathon2-Frontend` a la rama `main`.
2. Conserva `amplify.yml` y desactiva **auto build** en esa rama para evitar
   publicaciones duplicadas: GitHub iniciará el release después de aprobar CI.
3. Si el frontend consume una API, configura `VITE_API_URL` en las variables
   de entorno de Amplify. Los valores `VITE_*` se incorporan al build y no
   deben contener secretos.

## Acceso desde GitHub

Crea un proveedor OIDC de AWS con emisor
`https://token.actions.githubusercontent.com` y audiencia `sts.amazonaws.com`.
El rol debe permitir únicamente `amplify:StartJob` y `amplify:GetJob` sobre la
aplicación y rama de producción. Limita la política de confianza al subject
`repo:Alex-20KD/Buildathon2-Frontend:environment:production`.

En GitHub, configura:

- Secreto: `AWS_AMPLIFY_DEPLOY_ROLE_ARN`
- Variables: `AWS_REGION`, `AMPLIFY_APP_ID` y `AMPLIFY_BRANCH=main`

El CI no necesita credenciales de AWS; esas variables se usan solamente por el
workflow de despliegue posterior.
