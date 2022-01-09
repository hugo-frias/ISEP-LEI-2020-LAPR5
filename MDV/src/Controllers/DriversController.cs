using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Drivers;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriversController : ControllerBase
    {
        private readonly IDriverService _service;

        public DriversController(IDriverService service)
        {
            _service = service;
        }

        // POST: api/Drivers
        [HttpPost]
        public async Task<IActionResult> Create(CreatingDriverDto obj)
        {
            try
            {
                var dto = DriverMapper.toDTO(obj);
                var driver = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetGetById), new {Id = driver.Id} , driver);
            }
            catch(Exception ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // GET: api/Drivers/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<DriverDto>> GetGetById(Guid id)
        {
            try 
            {
                var driver = await _service.GetByIdAsync(new DriverId(id));

                if (driver == null)
                {
                    return NotFound();
                }

                return driver;

            } 
            catch(Exception ex) 
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // GET: api/Drivers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DriverDto>>> GetAll()
        {
            try 
            {
                return await _service.GetAllAsync();
            }
            catch(Exception ex) 
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
    }
}