using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using TreasureChest.Models;
using TreasureChest.Utils;


namespace TreasureChest.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }
        public User GetByFireBaseUserId(string fireBaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, FireBaseUserId, Name, Email, IsAdmin
                          FROM [User]
                         WHERE FireBaseUserId = @FireBaseUserId";

                    DbUtils.AddParameter(cmd, "@FireBaseUserId", fireBaseUserId);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FireBaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                            IsAdmin = reader.GetBoolean(reader.GetOrdinal("IsAdmin"))
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }
        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO User (FireBaseUserId, Name, Email, IsAdmin)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FireBaseUserId, @Name, 
                                                @Email, @IsAdmin)";
                    DbUtils.AddParameter(cmd, "@FireBaseUserId", user.FireBaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", user.Name);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@IsAdmin", user.IsAdmin);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public List<User> GetAllProfiles()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.Id, u.FireBaseUserId, u.[Name], 
                               u.Email, u.IsAdmin
                          FROM [User] u";
                    List<User> list = new List<User>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        User user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FireBaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                            IsAdmin = reader.GetBoolean(reader.GetOrdinal("IsAdmin"))
                        };
                        list.Add(user);
                    }
                    reader.Close();
                    return list;
                }
            }
        }
    }
}