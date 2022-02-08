using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using TreasureChest.Models;
using TreasureChest.Repositories;
using System.Linq;
using System.Security.Claims;
using System.Collections.Generic;

namespace TreasureChest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetUser()
        {
            var claim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            return Ok(_userRepository.GetByFireBaseUserId(claim));
        }
        [HttpGet("GetAllProfiles")]
        public IActionResult GetAllProfiles()
        {
            List<User> profiles = _userRepository.GetAllProfiles();
            return Ok(profiles);
        }

        [HttpGet("DoesUserExist/{FireBaseUserId}")]
        public IActionResult DoesUserExist(string fireBaseUserId)
        {
            var user = _userRepository.GetByFireBaseUserId(fireBaseUserId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            user.IsAdmin = false;
            _userRepository.Add(user);
            return CreatedAtAction(
                nameof(GetUser),
                new { firebaseUserId = user.FireBaseUserId },
                user);
        }
        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFireBaseUserId(firebaseUserId);
        }
    }
}