using System.Collections.Generic;
using TreasureChest.Models;

namespace TreasureChest.Repositories
{
    public interface IUserRepository
    {
        void Add(User userProfile);
        User GetByFireBaseUserId(string fireBaseUserId);
        public List<User> GetAllProfiles();
    }
}