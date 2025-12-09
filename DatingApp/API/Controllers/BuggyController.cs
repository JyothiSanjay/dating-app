using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuggyController : BaseApiController
    {
        [HttpGet("auth")]
        public IActionResult GetNotFound()
        {
            return Unauthorized();
        }
        [HttpGet("server-error")]
        public IActionResult GetServerError()
        {
            throw new Exception("This is a server error");
        }
        [HttpGet("bad-request")]
        public IActionResult GetBadRequest()
        {
            throw new BadHttpRequestException("This is a bad request");
        }
    }
}
