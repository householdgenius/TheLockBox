﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TreasureChest.Models
{
    public class Privilege
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public List <Chore> Chores { get; set; }
        public Chore Chore { get; set; }
        public User User { get; set; }
    }
}
