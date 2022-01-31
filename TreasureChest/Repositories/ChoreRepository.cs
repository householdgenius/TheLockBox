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
                    cmd.CommandText = @"SELECT Id, [Name], PrivilegeId, DateCompleted
                                          FROM Chore
                                         WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    Chore chore = null;
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        if (chore == null)
                        {
                            chore = new Chore()
                            {
                                Id = DbUtils.GetInt(reader,"Id"),
                                Name = DbUtils.GetString(reader,"Name"),
                                PrivilegeId = DbUtils.GetInt(reader,"PrivilegeId"),
                                DateCompleted = DbUtils.GetDateTime(reader, "DateCompleted"),
                            };
                        }
                    }
                    reader.Close();
                    return chore;
                }
            }
        }
    }
}
