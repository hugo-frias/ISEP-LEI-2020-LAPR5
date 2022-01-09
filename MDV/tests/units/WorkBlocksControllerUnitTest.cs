using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.AspNetCore.Mvc;
using Moq;
using DDDSample1.Controllers;
using DDDSample1.Domain.WorkBlocks;
using DDDSample1.Domain.VehicleDuties;
using DDDSample1.Domain.Trips;
using System.Threading.Tasks;
using System;
using DDDSample1.Domain.Shared;
using System.Collections.Generic;

namespace MDVTests
{
    [TestClass]
    public class WorkBlocksControllerUnitTest
    {
        [TestMethod]
        public async Task Test_Create_Success()
        {
            DateTime initializedDate = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            DateTime leavingHour = initializedDate.AddMilliseconds(1640285718000).ToLocalTime();
            TripDto tripDto = new TripDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6",
            "Go", "Line:1", "Path:1", leavingHour);
            Trip trip = TripMapper.ToDomain(tripDto);

            string tripCode = "codigo-aaa-aaa";
            string[] array = new string[] { tripCode };

            List<Trip> trips = new List<Trip>();
            trips.Add(trip);
            List<WorkBlock> listResult = new List<WorkBlock>();
            listResult.Add(new WorkBlock(3000, 3060, "ALT", "ALB", true, true, trips));
            CreatingMultiWorkBlocksDto request =
            new CreatingMultiWorkBlocksDto(3000, "ALT", "ALB",
            "vehicledutyid", array, true, true, 1, 10);

            var mock = new Mock<IVehicleDutyService>();
            var mockTrip = new Mock<ITripService>();
            var mockWorkBlock = new Mock<IWorkBlockService>();
            mock.Setup(service => service
            .UpdateAsync(It.IsAny<CreatingMultiWorkBlocksDto>()))
            .Returns(Task.FromResult(listResult));
            WorkBlocksController controller = new WorkBlocksController(mock.Object,mockWorkBlock.Object,mockTrip.Object);

            var result = await controller.CreateMultiWorkBlocks(request);

            mock.Verify(service => service
            .UpdateAsync(It.IsAny<CreatingMultiWorkBlocksDto>()),
            Times.AtLeastOnce());

            Assert.AreEqual(result, listResult);

        }

        [TestMethod]
        public async Task Test_Create_InsucessBlockDuration()
        {
            DateTime initializedDate = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            DateTime leavingHour = initializedDate.AddMilliseconds(1640285718000).ToLocalTime();
            TripDto tripDto = new TripDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6",
            "Go", "Line:1", "Path:1", leavingHour);
            Trip trip = TripMapper.ToDomain(tripDto);

            string tripCode = "codigo-aaa-aaa";
            string[] array = new string[] { tripCode };
            BusinessRuleValidationException exception =
            new BusinessRuleValidationException("block duration shouldn't be bigger then 4h");
            List<Trip> trips = new List<Trip>();
            trips.Add(trip);
            List<WorkBlock> listResult = new List<WorkBlock>();
            //listResult.Add(new WorkBlock(3000, 3060, "ALT", "ALB", true, true,trips));
            CreatingMultiWorkBlocksDto request =
            new CreatingMultiWorkBlocksDto(3000, "ALT", "ALB",
            "vehicledutyid", array, true, true, 1, 4000);

            var mock = new Mock<IVehicleDutyService>();
            var mockWorkBlock = new Mock<IWorkBlockService>();
            var mockTrip = new Mock<ITripService>();
            mock.Setup(service => service
            .UpdateAsync(It.IsAny<CreatingMultiWorkBlocksDto>()))
            .Returns(Task.FromResult(listResult));
            WorkBlocksController controller = new WorkBlocksController(mock.Object,mockWorkBlock.Object, mockTrip.Object);

            List<WorkBlock> result = await controller.CreateMultiWorkBlocks(request);

            mock.Verify(service => service
            .UpdateAsync(It.IsAny<CreatingMultiWorkBlocksDto>()),
            Times.Never());

            Assert.AreEqual(result.Count, 0);

        }

        [TestMethod]
        public async Task Test_Create_InsucessGeneral()
        {
               DateTime initializedDate = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            DateTime leavingHour = initializedDate.AddMilliseconds(1640285718000).ToLocalTime();
            TripDto tripDto = new TripDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6",
            "Go", "Line:1", "Path:1", leavingHour);
            Trip trip = TripMapper.ToDomain(tripDto);
            
            string tripCode = "codigo-aaa-aaa";
            string[] array = new string[] { tripCode };
            BusinessRuleValidationException exception =
            new BusinessRuleValidationException("Insucess at creating workblocks");
            List<Trip> trips = new List<Trip>();
            trips.Add(trip);
            List<WorkBlock> listResult = new List<WorkBlock>();
            listResult.Add(new WorkBlock(3000, 3060, "ALT", "ALB", true, true, trips));
            CreatingMultiWorkBlocksDto request =
            new CreatingMultiWorkBlocksDto(3000, "ALT", "ALB",
            "vehicledutyid", array, true, true, 1, 10);

            var mock = new Mock<IVehicleDutyService>();
            var mockWorkBlock = new Mock<IWorkBlockService>();
            var mockTrip = new Mock<ITripService>();
            mock.Setup(service => service
            .UpdateAsync(It.IsAny<CreatingMultiWorkBlocksDto>()))
            .Throws(exception);
            WorkBlocksController controller = new WorkBlocksController(mock.Object,mockWorkBlock.Object, mockTrip.Object);

            var result = await controller.CreateMultiWorkBlocks(request);

            mock.Verify(service => service
            .UpdateAsync(It.IsAny<CreatingMultiWorkBlocksDto>()),
            Times.AtLeastOnce());

            Assert.AreEqual(result, null);

        }


        // [TestMethod]
        // public async Task Test_CreateManyTrips_Success()
        // {
        //     CreatingTripsDto request = new CreatingTripsDto(1, 2,3400,"Line:1", "Path:1", "Path:2", 1);
        //     List<TripDto> list = new List<TripDto>();
        //     var mock = new Mock<ITripService>();
        //     mock
        //     .Setup(service => service.AddManyAsync(It.IsAny<List<TripDto>>()))
        //     .Returns(Task.FromResult(list));
        //     mock
        //     .Setup(service => service.getDurationPath(It.IsAny<string>()))
        //     .Returns(Task.FromResult(1));
        //     TripsController controller = new TripsController(mock.Object);

        //     var result = await controller.CreateManyTrips(request);

        //     mock.Verify(service => service.AddManyAsync(It.IsAny<List<TripDto>>()), 
        //     Times.AtLeastOnce());

        //     mock.Verify(service => service.getDurationPath(It.IsAny<string>()), 
        //     Times.AtLeastOnce());

        //     Assert.AreEqual(result, list);

        // }


    }
}