using System.Collections.Generic;
using TreasureChest.Models;

namespace TreasureChest.Repositories
{
    public interface IChoreRepository
    {
        List<Chore> GetAllChores();
    }
}