using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TreasureChest.Models
{
    public class UserChore
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ChoreId { get; set; }
        public User User { get; set; }
    }
}
