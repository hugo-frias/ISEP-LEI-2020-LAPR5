using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.DriverDuties;
using DDDSample1.Domain.WorkBlocks;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverDutiesController : ControllerBase
    {
        private readonly IDriverDutyService _service;

        private readonly IWorkBlockService _workBlockService;

        public DriverDutiesController(IDriverDutyService service, IWorkBlockService workBlockService)
        {
            _service = service;
            _workBlockService = workBlockService;
        }

        // POST: api/DriverDuties
        [HttpPost]
        public async Task<IActionResult> Create(CreatingDriverDutyDto obj)
        {
            try
            {         
                var driverDuty = await _service.AddAsync(obj);
                if(driverDuty == null){
                    return null;
                }
                return CreatedAtAction(nameof(GetGetById), new { Id = driverDuty.Id }, driverDuty);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // POST: api/DriverDuties/GLX
        [HttpPost]
        [Route("GLX")]
        public async Task<IActionResult> Create(CreatingDriverDutyDtoList obj)
        {
                List<CreatingDriverDutyDto> list = new List<CreatingDriverDutyDto>(obj.DriverDuties);
                List<DriverDutyDto> listDriverDutiesDto = new List<DriverDutyDto>();

                try{

                    foreach(CreatingDriverDutyDto driverDuty in list) {
                        List<string> listWorkBlocksCode = new List<string>();
                        foreach(string workBlockCode in driverDuty.WorkBlocks) {
                            listWorkBlocksCode.Add(workBlockCode);
                        }
                        List<WorkBlock> listWorkBlocks = await _workBlockService.GetAllByCodeAsync(listWorkBlocksCode);
                        var dto = DriverDutyMapper.toDTO(driverDuty,listWorkBlocks);               
                        var driverDutyDto = await _service.AddWithouCommitAsync(dto);
                        listDriverDutiesDto.Add(driverDutyDto);
                    }
                    var value = await _service.CommitChanges();
                    return Ok(listDriverDutiesDto);
            }
            catch (Exception ex)
            {
                return BadRequest(new {Message = ex.Message + "We didn't introduce anything at all."});
            }
        }

        // GET: api/Drivers/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<DriverDutyDto>> GetGetById(Guid id)
        {
            try
            {
                var driverDuty = await _service.GetByIdAsync(new DriverDutyId(id));

                if (driverDuty == null)
                {
                    return NotFound();
                }

                return driverDuty;

            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }


        // GET: api/DriverDuty
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DriverDutyDto>>> GetAll()
        {
            try{
            return await _service.GetAllAsync();
        }
            catch(Exception ex) 
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
    }
}