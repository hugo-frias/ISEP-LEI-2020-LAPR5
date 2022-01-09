using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Trips;
using Newtonsoft.Json;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripsController : ControllerBase
    {
        private readonly ITripService _service;

        public TripsController(ITripService service)
        {
            _service = service;
        }

        // POST: api/Trips
        [HttpPost]
        public async Task<IActionResult> Create(CreatingTripDto obj)
        {
            try{
            var dto = TripMapper.ToDto(obj);
            var trip = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new {Id = trip.Id} , trip);
            }catch(Exception ex) 
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        //POST: api/Trips
        [HttpPost] 
        [Route("LargeScale")]
        public async Task<List<TripDto>> CreateManyTrips(CreatingTripsDto obj){
            try{
                var num = obj.NrViagens; var count = 0; var numVezes = 1;
            long hour = obj.Time; long hourSec;
            int duracaoPercurso = await _service.getDurationPath(obj.PathIda);
            if((obj.Frequence*60) <= duracaoPercurso && obj.InParalell != null){
                numVezes = obj.InParalell;
            }

            int kj = 0;
            string orientation, path, code;
            TripDto dto = null;
            List<TripDto> list = new List<TripDto>();
            for(var j = 0; j < numVezes; j++){
                hourSec = hour;
                for(var i = 0; i < num; i++){
                    if(count % 2 == 0){
                        path = obj.PathIda; orientation = "Go";
                        kj++;
                        code = "TripMany:" + DateTime.Now.ToString("dd/MM/yy") + DateTime.Now.ToString("hh:mm:ss:ms:sm:mm") + kj;
                        dto = TripMapper.ToDto(obj,code,orientation, path, hour);
                        list.Add(dto);
                        hourSec += duracaoPercurso*1000;
                        count ++;
                    }else{
                        path = obj.PathVolta; orientation = "Return";
                        kj++;
                        code = "TripMany:" + DateTime.Now.ToString("dd/MM/yy") + DateTime.Now.ToString("hh:mm:ss:ms:sm:mm") + kj;
                        
                        dto = TripMapper.ToDto(obj,code,orientation,path,hourSec);
                        list.Add(dto);
                        if(numVezes == 1){
                            hour += obj.Frequence*60000;
                        }else{
                            hour += duracaoPercurso*1000;
                        }
                        count ++;
                    }
                }
                hour = obj.Time + (obj.Frequence * (j+1) * 60000);

                count = 0;
            }
            Console.BackgroundColor = ConsoleColor.White;
            Console.WriteLine(JsonConvert.SerializeObject(list));
            var lista = await _service.AddManyAsync(list);
            return lista;

            }
            catch(Exception ex)
            {
                return null;
            }
            
        }

        // GET: api/Trips/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TripDto>> GetGetById(Guid id)
        {
            var trip = await _service.GetByIdAsync(new TripId(id));

            if (trip == null) {
                return NotFound();
            }

            return trip;
        }

        // GET: api/Trips
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TripDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }
        // GET: api/Trips/FromLine/{lineId}
        [HttpGet("FromLine/{lineId}")]
        public async Task<ActionResult<IEnumerable<TripDto>>> GetGetAllFromLine(string lineId)
        {
            return await _service.GetAllFromLineAsync(lineId);
        }

        // POST: api/Trips/GLX
        [HttpPost]
        [Route("GLX")]
        public async Task<IActionResult> Create(CreatingTripsDtoList obj)
        {

            List<CreatingTripDto> list = new List<CreatingTripDto>(obj.Trips);
            List<TripDto> listTripsDto = new List<TripDto>();
            try{

                foreach(CreatingTripDto trip in list) {
                    var dto = TripMapper.ToDto(trip);                  
                    var tripDto = await _service.AddWithouCommitAsync(dto);
                    listTripsDto.Add(tripDto);
                }

                var value = await _service.CommitChanges();

            return Ok(listTripsDto);

            }catch(Exception ex) 
            {
                return BadRequest(new {Message = ex.Message + "We didn't introduce anything at all."});
            }
        }

    }
}