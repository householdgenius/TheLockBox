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
    }
}
