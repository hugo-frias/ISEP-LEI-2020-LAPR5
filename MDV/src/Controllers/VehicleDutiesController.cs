using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.VehicleDuties;
using DDDSample1.Domain.WorkBlocks;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleDutiesController : ControllerBase
    {
        private readonly IVehicleDutyService _service;

        private readonly IWorkBlockService _workBlockService;

        public VehicleDutiesController(IVehicleDutyService service, IWorkBlockService workBlockService)
        {
            _service = service;
            _workBlockService = workBlockService;
        }

        // POST: api/VehicleDuty
        [HttpPost]
        public async Task<IActionResult> Create(CreatingVehicleDutyDto obj)
        {
            try{
            var dto = VehicleDutyMapper.toDTO(obj);
            var vehicleDuty = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new {Id = vehicleDuty.Id} , vehicleDuty);

            } catch(Exception ex) 
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // POST: api/VehicleDuties/GLX
        [HttpPost]
        [Route("GLX")]
        public async Task<IActionResult> Create(CreatingVehicleDutiesDtoList obj)
        {
                List<CreatingVehicleDutiesDto> list = new List<CreatingVehicleDutiesDto>(obj.VehicleDuties);
                List<VehicleDutyDto> listVehicleDutiesDto = new List<VehicleDutyDto>();

                try{

                    foreach(CreatingVehicleDutiesDto vehicleDuty in list) {
                        List<string> listWorkBlocksCode = new List<string>();
                        foreach(string workBlockCode in vehicleDuty.WorkBlocks) {
                            listWorkBlocksCode.Add(workBlockCode);
                        }
                        List<WorkBlock> listWorkBlocks = await _workBlockService.GetAllByCodeAsync(listWorkBlocksCode);
                        var dto = VehicleDutyMapper.toDTO(vehicleDuty,listWorkBlocks);               
                        var vehicleDutyDto = await _service.AddWithouCommitAsync(dto);
                        listVehicleDutiesDto.Add(vehicleDutyDto);
                    }
                    var value = await _service.CommitChanges();
                    return Ok(listVehicleDutiesDto);
            }
            catch (Exception ex)
            {
                return BadRequest(new {Message = ex.Message + "We didn't introduce anything at all."});
            }
        }

        // GET: api/VehicleDuty/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleDutyDto>> GetGetById(Guid id)
        {
            var vehicleDuty = await _service.GetByIdAsync(new VehicleDutyId(id));

            if (vehicleDuty == null)
            {
                return NotFound();
            }

            return vehicleDuty;
        }

        // GET: api/VehicleDuty
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VehicleDutyDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }
    }
}