using System.Collections.Generic;
using TreasureChest.Models;

namespace TreasureChest.Repositories
{
    public interface IPrivilegeRepository
    {
        List<Privilege> GetAllPrivileges();
        Privilege GetPrivilegeById(int id);
        void CreatePrivilege(Privilege privilege);
        void Update(Privilege privilege);
        public void Delete(int id);

    }
}