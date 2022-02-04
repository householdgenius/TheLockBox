using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TreasureChest.Models;

namespace TreasureChest.Repositories
{
    public class PrivilegeRepository : BaseRepository, IPrivilegeRepository
    {
        public PrivilegeRepository(IConfiguration configuration) : base(configuration) { }
        public List<Privilege> GetAllPrivileges()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      Select * from Privilege";

                    var privileges = new List<Privilege>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        privileges.Add(new Privilege()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Description = reader.GetString(reader.GetOrdinal("description")),
                        });
                    }
                    reader.Close();
                    return privileges;
                }
            }

        }
        public Privilege GetPrivilegeById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id, p.[Description], c.[Name]
                                        FROM Privilege p
                                        LEFT JOIN Chore c ON p.Id = c.privilegeId
                                         WHERE p.Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    Privilege privilege= null;
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        if (privilege == null)
                        {
                            privilege = new Privilege()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Description = reader.GetString(reader.GetOrdinal("Description")),
                                Chore = new Chore()
                                {
                                    Name = reader.GetString(reader.GetOrdinal("Name"))
                                }
                                    
                            };
                        }
                    }
                    reader.Close();
                    return privilege;
                }
            }
        }
        public void CreatePrivilege(Privilege privilege)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Privilege (Description)
                                                     VALUES (@Description)";
                    cmd.Parameters.AddWithValue("@Description", privilege.Description);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Update(Privilege privilege)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Privilege
                                           SET Description = @description
                                         WHERE id = @id";
                    cmd.Parameters.AddWithValue("@description", privilege.Description);
                    cmd.Parameters.AddWithValue("@id", privilege.Id);
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
                    cmd.CommandText = @"DELETE FROM Privilege WHERE id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
