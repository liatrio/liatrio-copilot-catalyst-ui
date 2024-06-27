FROM node:20-alpine@sha256:df01469346db2bf1cfc1f7261aeab86b2960efa840fe2bd46d83ff339f463665 AS dev

RUN apk add --no-cache zsh=5.9-r2 curl=8.5.0-r0 wget=1.21.4-r0 git=2.43.0-r0 openssh=9.6_p1-r0 && \
  sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)" && \
  rm -rf /var/cache/apk/*

FROM node:20-alpine@sha256:df01469346db2bf1cfc1f7261aeab86b2960efa840fe2bd46d83ff339f463665 AS builder

ENV NEXT_TELEMETRY_DISABLED 1
WORKDIR /app

COPY package*.json ./

# If authentication is required to install private packages, add the following before the command `npm ci`:
# --mount=type=secret,id=npm,target=/root/.npmrc
RUN  npm ci

COPY src/ src/
COPY public/ public/
COPY tsconfig.json ./
COPY next-env.d.ts ./
COPY next.config.js ./
COPY .eslintrc.js ./

# If authentication is required to install private packages, add the following before the command `npm ci`:
# --mount=type=secret,id=npm,target=/root/.npmrc
RUN npm run validateBuild && \
    npm prune --production


FROM node:20-alpine@sha256:df01469346db2bf1cfc1f7261aeab86b2960efa840fe2bd46d83ff339f463665 AS runner

WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup -g 1001 -S nodejs && \
  adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

USER nextjs
EXPOSE 3000

CMD ["npm", "start"]
