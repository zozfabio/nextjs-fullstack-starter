# syntax=docker/dockerfile:1.4
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn yarn --frozen-lockfile
# ----------------------------------------------------------------------------------------------------------------------
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn prisma generate
RUN yarn build
# ----------------------------------------------------------------------------------------------------------------------
FROM node:18-alpine AS runner
WORKDIR /app
ENV TZ "America/Sao_Paulo"
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/package.json /app/yarn.lock ./
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/next-18next.config.js ./
USER nextjs
EXPOSE 3000
# TODO: pegar Dockerfile CMD de outro projeto
CMD ["yarn", "start"]
