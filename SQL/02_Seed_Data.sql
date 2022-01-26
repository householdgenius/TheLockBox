USE [TreasureChest]
GO

SET IDENTITY_INSERT [User] ON
INSERT INTO [User] ([ID],[FireBaseUserId],[Email],[Name], [IsAdmin]) VALUES (1,'HrwS2JvpDng855SDU9BRR3c9u123','admin@example.com', 'Admin',1), (2,'K9jnszsx3vaDrRvZ3SN0yjxuWyJ2','user@example.com','Emily', 0);
SET IDENTITY_INSERT [User] OFF


SET IDENTITY_INSERT [Privilege] ON
INSERT INTO [Privilege] ([Id], [Description]) 
VALUES (1, 'Disney+ unlocked'), (2, 'Netflix unlocked'), (3, 'Laptop Use'), (4, 'New Book'), (5, '$20');
SET IDENTITY_INSERT [Privilege] OFF


SET IDENTITY_INSERT [Chore] ON
INSERT INTO [Chore] ([Id], [Name], [PrivilegeId], [DateCompleted])
VALUES (1, 'Take Out The Trash','1', SYSDATETIME()), (2, 'Scoop Cat Box', '2', SYSDATETIME()), (3, 'Sweep Floors', '3', SYSDATETIME()), (4, 'Clean Entire Bathroom', '4', SYSDATETIME());
SET IDENTITY_INSERT [Chore] OFF

SET IDENTITY_INSERT [UserChore] ON
INSERT INTO [UserChore] (
	[Id], [UserId], [ChoreId])
VALUES (1, '1', '1');
SET IDENTITY_INSERT [UserChore] OFF
