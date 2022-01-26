USE [master]

IF db_id('TreasureChest') IS NULl
  CREATE DATABASE [TreasureChest]
GO

USE [TreasureChest]
GO


DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [Privilege];
DROP TABLE IF EXISTS [Chore];
DROP TABLE IF EXISTS [UserChore];

CREATE TABLE [User] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FireBaseUserId] nvarchar(28) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [IsAdmin] bit NOT NULL DEFAULT (1)
)
GO

CREATE TABLE [Privilege] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Description] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Chore] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [PrivilegeId] int,
  [DateCompleted] datetime NOT NULL
)
GO

CREATE TABLE [UserChore] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [ChoreId] int NOT NULL
)
GO

ALTER TABLE [UserChore] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [UserChore] ADD FOREIGN KEY ([ChoreId]) REFERENCES [Chore] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Chore] ADD FOREIGN KEY ([PrivilegeId]) REFERENCES [Privilege] ([Id]) ON DELETE SET NULL
GO
