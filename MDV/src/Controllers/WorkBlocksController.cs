using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.WorkBlocks;
using DDDSample1.Domain.VehicleDuties;
using DDDSample1.Domain.Trips;
using DDDSample1.Domain.Shared;
namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkBlocksController : ControllerBase
    {
        private readonly IVehicleDutyService _vdService;
        private readonly IWorkBlockService _service;
        private readonly ITripService _tripService;

        public WorkBlocksController(IVehicleDutyService vdService, IWorkBlockService service, ITripService tripService)
        {
            _vdService = vdService;
            _service = service;
            _tripService = tripService;
        }

        // POST: api/WorkBlocks/
        [HttpPost]
        public async Task<List<WorkBlock>> CreateMultiWorkBlocks(CreatingMultiWorkBlocksDto obj)
        {
            try
            {
                if (obj.BlockDuration > 4 * 60)
                {
                    return new List<WorkBlock>();
                }

                return await _vdService.UpdateAsync(obj);

            }
            catch (Exception ex)
            {

                Console.WriteLine("****************************************************************************");
                Console.WriteLine(ex);
                Console.WriteLine("****************************************************************************");
                return null;
            }
        }

        // POST: api/WorkBlocks/GLX
        [HttpPost]
        [Route("GLX")]
        public async Task<IActionResult> Create(CreatingWorkBlocksDtoList obj)
        {
                List<CreatingWorkBlocksDto> list = new List<CreatingWorkBlocksDto>(obj.WorkBlocks);
                List<WorkBlockDto> listWorkBlocksDto = new List<WorkBlockDto>();

                try{

                    foreach(CreatingWorkBlocksDto workBlock in list) {
                        List<string> listTripsCode = new List<string>();
                        foreach(string tripCode in workBlock.Trips) {
                            listTripsCode.Add(tripCode);
                        }
                        List<Trip> listTrips = await _tripService.GetAllByCodeAsync(listTripsCode);
                        var dto = WorkBlockMapper.toDTO(workBlock,listTrips);               
                        var workBlockDto = await _service.AddWithouCommitAsync(dto);
                        listWorkBlocksDto.Add(workBlockDto);
                    }
                    var value = await _service.CommitChanges();
                    return Ok(listWorkBlocksDto);
            }
            catch (Exception ex)
            {
                return BadRequest(new {Message = ex.Message + "We didn't introduce anything at all."});
            }
        }

        // GET: api/WorkBlock/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<WorkBlockDto>> GetGetById(Guid id)
        {
            try
            {
                var driverDuty = await _service.GetByIdAsync(new WorkBlockId(id));

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
        // GET: api/WorkBlocks/
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkBlockDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/WorkBlocks/{Workblock A id}
        // gets workblocks of the same vehicle duty and with the same start time as Workblock A's end time
        [HttpGet("Filtered/{id}")]
        public async Task<ActionResult<List<WorkBlockDto>>> getFilteredWorkblocks(string id)
        {
            return await _service.getFilteredWorkblocks(new WorkBlockId(id));

            // return await _service.getFilteredWorkblocks(new VehicleDutyId(id));
        }
    }
}