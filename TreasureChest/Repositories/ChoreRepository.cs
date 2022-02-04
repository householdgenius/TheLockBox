using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TreasureChest.Models;
using TreasureChest.Utils;

namespace TreasureChest.Repositories
{
    public class ChoreRepository : BaseRepository, IChoreRepository
    {
        public ChoreRepository(IConfiguration configuration) : base(configuration) { }
        public List<Chore> GetAllChores()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      Select * from Chore";

                    var chores = new List<Chore>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        chores.Add(new Chore()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            PrivilegeId = DbUtils.GetInt(reader, "PrivilegeId"),
                            DateCompleted = DbUtils.GetDateTime(reader, "DateCompleted"),
                        });
                    }
                    reader.Close();
                    return chores;
                }
            }

        }
        public Chore GetChoreById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT c.Id, c.[Name], c.PrivilegeId, c.DateCompleted, p.[Description], u.[Name] as UserName, uc.UserId, uc.ChoreId
                                          FROM Chore c 
                                           LEFT JOIN Privilege p ON p.Id = c.PrivilegeId
                                           LEFT JOIN UserChore uc ON uc.ChoreId = c.Id
                                           LEFT JOIN [User] u ON u.Id = uc.UserId
                                         WHERE c.Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    Chore chore = null;
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        if (chore == null)
                        {
                            chore = new Chore()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                PrivilegeId = DbUtils.GetInt(reader, "PrivilegeId"),
                                DateCompleted = DbUtils.GetDateTime(reader, "DateCompleted"),
                                Privilege = new Privilege()
                                {
                                    Description = DbUtils.GetString(reader, "Description")
                                },
                                Users = new List<User>()

                            };
                        }
                        if (DbUtils.IsNotDbNull(reader, "UserId"))
                        {
                            chore.Users.Add(new User
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                Name = DbUtils.GetString(reader, "UserName")
                            });
                        }
                    }
                    reader.Close();
                    return chore;
                }
            }
        }
        public void CreateChore(Chore chore)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Chore (Name, PrivilegeId, DateCompleted)
                                                     VALUES (@Name, @PrivilegeId, @DateCompleted)";
                    cmd.Parameters.AddWithValue("@Name", chore.Name);
                    cmd.Parameters.AddWithValue("@PrivilegeId", chore.PrivilegeId);
                    cmd.Parameters.AddWithValue("@DateCompleted", chore.DateCompleted);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Update(Chore chore)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Chore
                                        SET 
                                            Name = @name,
                                            PrivilegeId = @privilegeId,
                                            DateCompleted = @dateCompleted,
                                        WHERE Id = @id
                                        ";

                    cmd.Parameters.AddWithValue("@name", chore.Name);
                    cmd.Parameters.AddWithValue("@privilegeId", chore.PrivilegeId);
                    cmd.Parameters.AddWithValue("@datecompleted", chore.DateCompleted);
                    cmd.Parameters.AddWithValue("@id", chore.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Delete(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        DELETE FROM Chore
                                        
                                        WHERE Id = @id
                                       ";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();

                }
            }
        }
    }
}
