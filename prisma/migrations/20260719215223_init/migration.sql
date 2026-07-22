-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startsAt" DATETIME NOT NULL,
    "endsAt" DATETIME,
    "posterUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "collaborator" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Event_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stageName" TEXT NOT NULL,
    "bio" TEXT,
    "socialUrl" TEXT,
    "avatarUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "EventArtist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "roleLabel" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "EventArtist_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "EventArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Promotion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "startsAt" DATETIME NOT NULL,
    "endsAt" DATETIME,
    "bannerUrl" TEXT,
    "createdById" TEXT NOT NULL,
    CONSTRAINT "Promotion_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MediaAsset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "altText" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "uploadedById" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MediaAsset_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "MediaAsset_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE INDEX "Event_status_startsAt_idx" ON "Event"("status", "startsAt");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_stageName_key" ON "Artist"("stageName");

-- CreateIndex
CREATE INDEX "EventArtist_eventId_sortOrder_idx" ON "EventArtist"("eventId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "EventArtist_eventId_artistId_key" ON "EventArtist"("eventId", "artistId");
