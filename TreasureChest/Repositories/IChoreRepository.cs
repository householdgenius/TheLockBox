using System.Collections.Generic;
using TreasureChest.Models;

namespace TreasureChest.Repositories
{
    public interface IChoreRepository
    {
        List<Chore> GetAllChores();
        Chore GetChoreById(int id);
        void CreateChore(Chore chore);
        void Update(Chore chore);
        void Delete(int id);
        void UpdateChoreUsers(UserChore userChore);
    }
}