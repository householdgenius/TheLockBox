using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public PrivilegeController(IPrivilegeRepository privilegeRepository)
        {
            _privilegeRepository = privilegeRepository;
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

        // POST api/<PrivilegeController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<PrivilegeController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PrivilegeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
