using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TreasureChest.Models
{
    public class Chore
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int PrivilegeId { get; set; }
        public DateTime DateCompleted { get; set; }
        public Privilege Privilege { get; set; }
        public List <User> Users { get; set; }
    }
}
