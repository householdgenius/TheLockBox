using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using TreasureChest.Models;
using TreasureChest.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TreasureChest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrivilegeController : ControllerBase
    {
        private readonly IPrivilegeRepository _privilegeRepository;
        private readonly IUserRepository _userRepository;
        public PrivilegeController(IPrivilegeRepository privilegeRepository, IUserRepository userRepository)
        {
            _privilegeRepository = privilegeRepository;
            _userRepository = userRepository;
        }
        // GET: api/<PrivilegeController>
        [HttpGet]
        public IActionResult Get()
        {
            List<Privilege> privileges = _privilegeRepository.GetAllPrivileges();
            return Ok(privileges);
        }

        // GET api/<PrivilegeController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var privilege = _privilegeRepository.GetPrivilegeById(id);
            if (privilege == null)
            {
                return NotFound();
            }
            return Ok(privilege);
        }

        [HttpGet("activePrivileges")]
        public IActionResult GetActive()
        {
            var user = GetCurrentUserProfile();
            var privilege = _privilegeRepository.GetPrivilegesByUserId(user.Id);
            if (privilege == null)
            {
                return NotFound();
            }
            return Ok(privilege);
        }


        // POST api/<PrivilegeController>
        [HttpPost]
        public IActionResult AddPrivilege(Privilege privilege)
        {
            _privilegeRepository.CreatePrivilege(privilege);
            return CreatedAtAction("Get", new { id = privilege.Id }, privilege);
        }

        // PUT api/<PrivilegeController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Privilege privilege)
        {
            if (id != privilege.Id)
            {
                return BadRequest();
            }

            _privilegeRepository.Update(privilege);
            return NoContent();
        }

        // DELETE api/<PrivilegeController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _privilegeRepository.Delete(id);
            return NoContent();
        }
        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFireBaseUserId(firebaseUserId);
        }
    }
}
