using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.AspNetCore.Mvc;
using Moq;
using DDDSample1.Controllers;
using DDDSample1.Domain.Trips;
using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace MDVTests
{
    [TestClass]
    public class TripsControllerUnitTest
    {
        [TestMethod]
        public async Task Test_Create_Success()
        {
            CreatingTripDto request = new CreatingTripDto("codigoAux","Go", "Line:1", "Path:1", 3400);

            var mock = new Mock<ITripService>();
            mock.Setup(service => service.AddAsync(It.IsAny<TripDto>()))
            .Returns(Task.FromResult(TripMapper.ToDto(request)));
            TripsController controller = new TripsController(mock.Object);

            var result = await controller.Create(request);

            mock.Verify(service => service.AddAsync(It.IsAny<TripDto>()), 
            Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(ActionResult));

        }

        [TestMethod]
        public async Task Test_Create_FailOrientation()
        {


            BusinessRuleValidationException exception = new BusinessRuleValidationException("The orientation shouldn't be null");
            
            CreatingTripDto request = new CreatingTripDto("codigoAux",null, "Line:1", "Path:1", 3400);

            var mock = new Mock<ITripService>();
            mock.Setup(service => service.AddAsync(It.IsAny<TripDto>())).Throws(exception);
            TripsController controller = new TripsController(mock.Object);

            var result = await controller.Create(request);

            mock.Verify(service => service.AddAsync(It.IsAny<TripDto>()), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));

        }

        [TestMethod]
        public async Task Test_Create_FailLine()
        {
            
            BusinessRuleValidationException exception = new BusinessRuleValidationException("The line shouldn't be null");
            
            CreatingTripDto request = new CreatingTripDto("codigoAux","Go", null, "Path:1", 3400);

            var mock = new Mock<ITripService>();
            mock.Setup(service => service.AddAsync(It.IsAny<TripDto>())).Throws(exception);
            TripsController controller = new TripsController(mock.Object);

            var result = await controller.Create(request);

            mock.Verify(service => service.AddAsync(It.IsAny<TripDto>()), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        [TestMethod]
        public async Task Test_Create_FailPath()
        {
            
            BusinessRuleValidationException exception = new BusinessRuleValidationException("The path shouldn't be null");
            
            CreatingTripDto request = new CreatingTripDto("codigoAux","Go", "Line:1", null, 3400);

            var mock = new Mock<ITripService>();
            mock.Setup(service => service.AddAsync(It.IsAny<TripDto>())).Throws(exception);
            TripsController controller = new TripsController(mock.Object);

            var result = await controller.Create(request);

            mock.Verify(service => service.AddAsync(It.IsAny<TripDto>()), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));

        }


        [TestMethod]
        public async Task Test_CreateManyTrips_Success()
        {
            CreatingTripsDto request = new CreatingTripsDto(1, 2,3400,"Line:1", "Path:1", "Path:2", 1);
            List<TripDto> list = new List<TripDto>();
            var mock = new Mock<ITripService>();
            mock
            .Setup(service => service.AddManyAsync(It.IsAny<List<TripDto>>()))
            .Returns(Task.FromResult(list));
            mock
            .Setup(service => service.getDurationPath(It.IsAny<string>()))
            .Returns(Task.FromResult(1));
            TripsController controller = new TripsController(mock.Object);

            var result = await controller.CreateManyTrips(request);

            mock.Verify(service => service.AddManyAsync(It.IsAny<List<TripDto>>()), 
            Times.AtLeastOnce());

            mock.Verify(service => service.getDurationPath(It.IsAny<string>()), 
            Times.AtLeastOnce());

            Assert.AreEqual(result, list);

        }

        [TestMethod]
        public async Task Test_CreateManyTrips_InsucessDurationPath()
        {
            CreatingTripsDto request = new CreatingTripsDto(1, 2,3400,"Line:1", "Path:1", "Path:2", 1);
            
            BusinessRuleValidationException exception = 
            new BusinessRuleValidationException("Doesn't find duration path");
            
            List<TripDto> list = new List<TripDto>();
            var mock = new Mock<ITripService>();
            // mock
            // .Setup(service => service.AddManyAsync(It.IsAny<List<TripDto>>()))
            // .Returns(Task.FromResult(list));
            mock
            .Setup(service => service.getDurationPath(It.IsAny<string>()))
            .Throws(exception);
            TripsController controller = new TripsController(mock.Object);

            var result = await controller.CreateManyTrips(request);

            // mock.Verify(service => service.AddManyAsync(It.IsAny<List<TripDto>>()), 
            // Times.AtLeastOnce());

            mock.Verify(service => service.getDurationPath(It.IsAny<string>()), 
            Times.AtLeastOnce());

            Assert.AreEqual(result, null);

        }

        [TestMethod]
        public async Task Test_CreateManyTrips_InsucessAddMany()
        {
            CreatingTripsDto request = new CreatingTripsDto(1, 2,3400,"Line:1", "Path:1", "Path:2", 1);
            
            BusinessRuleValidationException exception = 
            new BusinessRuleValidationException("Doesn't add trips");
            
            List<TripDto> list = new List<TripDto>();
            var mock = new Mock<ITripService>();
            mock
            .Setup(service => service.AddManyAsync(It.IsAny<List<TripDto>>()))
            .Throws(exception);
            mock
            .Setup(service => service.getDurationPath(It.IsAny<string>()))
            .Returns(Task.FromResult(1));
            TripsController controller = new TripsController(mock.Object);

            var result = await controller.CreateManyTrips(request);

            mock.Verify(service => service.AddManyAsync(It.IsAny<List<TripDto>>()), 
            Times.AtLeastOnce());

            mock.Verify(service => service.getDurationPath(It.IsAny<string>()), 
            Times.AtLeastOnce());

            Assert.AreEqual(result, null);

        }

        //   [TestMethod]
        // public async Task Test_Create_FailTime()
        // {
            
        //     BusinessRuleValidationException exception = new BusinessRuleValidationException("The time shouldn't be null");
            
        //     CreatingTripDto request = new CreatingTripDto("Go", "Line:1", "Path:1", null);

        //     var mock = new Mock<ITripService>();
        //     mock.Setup(service => service.AddAsync(It.IsAny<TripDto>())).Throws(exception);
        //     TripsController controller = new TripsController(mock.Object);

        //     var result = await controller.Create(request);

        //     mock.Verify(service => service.AddAsync(It.IsAny<TripDto>()), Times.AtLeastOnce());

        //     Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));

        // }

    }
}