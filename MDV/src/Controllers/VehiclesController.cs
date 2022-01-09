using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Vehicles;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehiclesController : ControllerBase
    {
        private readonly IVehicleService _service;

        public VehiclesController(IVehicleService service)
        {
            _service = service;
        }

        // POST: api/Vehicles
        [HttpPost]
        public async Task<IActionResult> Create(CreatingVehicleDto obj)
        {
            try
            {
                var dto = VehicleMapper.toDTO(obj);
                var vehicle = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetGetById), new { Id = vehicle.Id }, vehicle);

            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // GET: api/Vehicles/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleDto>> GetGetById(Guid id)
        {
            var vehicle = await _service.GetByIdAsync(new VehicleId(id));

            if (vehicle == null)
            {
                return NotFound();
            }
            
            return vehicle;
        }

        // GET: api/Vehicles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VehicleDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }
    }
}