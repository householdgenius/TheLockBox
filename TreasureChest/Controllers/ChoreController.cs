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
    public class ChoreController : ControllerBase
    {
        private readonly IChoreRepository _choreRepository;
        public ChoreController(IChoreRepository choreRepository)
        {
            _choreRepository = choreRepository;
        }
        // GET: api/<ChoreController>
        [HttpGet]
        public IActionResult Get()
        {
            List<Chore> chores = _choreRepository.GetAllChores();
            return Ok(chores);
        }

        // GET api/<ChoreController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var chore = _choreRepository.GetChoreById(id);
            if (chore == null)
            {
                return NotFound();
            }
            return Ok(chore);
        }

        // POST api/<ChoreController>
        [HttpPost]
        public IActionResult AddChore(Chore chore)
        {
            _choreRepository.CreateChore(chore);
            return CreatedAtAction("Get", new { id = chore.Id }, chore);
        }

        // PUT api/<ChoreController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Chore chore)
        {
            if (id != chore.Id)
            {
                return BadRequest();
            }

            _choreRepository.Update(chore);
            return NoContent();
        }

        // DELETE api/<ChoreController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _choreRepository.Delete(id);
            return NoContent();
        }
    }
}
