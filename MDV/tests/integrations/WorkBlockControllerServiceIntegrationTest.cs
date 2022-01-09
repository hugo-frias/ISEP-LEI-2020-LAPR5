using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.AspNetCore.Mvc;
using Moq;
using DDDSample1.Controllers;
using DDDSample1.Domain.VehicleDuties;
using DDDSample1.Domain.Vehicles;
using DDDSample1.Domain.WorkBlocks;
using DDDSample1.Domain.Trips;
using System.Threading.Tasks;
using System;
using DDDSample1.Domain.Shared;
using System.Collections.Generic;

namespace MDVTests
{
    [TestClass]
    public class WorkBlockControllerServiceIntegrationTest
    {

        [TestMethod]
        public async Task Test_UpdateAsync_Success()
        {
            DateTime initializedDate = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            DateTime leavingHour = initializedDate.AddMilliseconds(1640285718000).ToLocalTime();
            TripDto tripDto = new TripDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6",
            "Go", "Line:1", "Path:1", leavingHour);
            Trip trip = TripMapper.ToDomain(tripDto);

            string tripCode = "3143bfe6-6d24-439e-9e18-e22bd1cd4ba6";
            string[] array = new string[] { tripCode };
            VehicleDutyId vId = new VehicleDutyId("3143bfe6-6d24-439e-9e18-e22bd1cd4bb6");

            List<WorkBlock> workBlocks = new List<WorkBlock>();
            List<Trip> trips = new List<Trip>();
            trips.Add(trip);
            List<WorkBlock> listResult = new List<WorkBlock>();
            listResult.Add(new WorkBlock(3000, 3060, "ALT", "ALB", true, true, trips));

            CreatingMultiWorkBlocksDto request =
            new CreatingMultiWorkBlocksDto(3000, "ALT", "ALB",
            "3143bfe6-6d24-439e-9e18-e22bd1cd4bb6", array, true, true, 1, 10);

            VehicleDuty vd = new VehicleDuty(vId, "VehicleDuty:02", "nome", "#5f0092", workBlocks);

            var mockRepo = new Mock<IVehicleDutyRepository>();
            var mockRepoWorkBlock = new Mock<IWorkBlockRepository>();
            var mockRepoTrip = new Mock<ITripRepository>();

            mockRepo.Setup(repo => repo.getVehicleDutyWithWorkblocks(It.IsAny<VehicleDutyId>()))
            .Returns(Task.FromResult(vd));

            var mockUnitOfWork = new Mock<IUnitOfWork>();

            VehicleDutyService service = new VehicleDutyService(mockUnitOfWork.Object,
            mockRepo.Object, mockRepoTrip.Object);
            WorkBlockService wbService = new WorkBlockService(mockUnitOfWork.Object, mockRepoWorkBlock.Object, mockRepo.Object);
            TripService serviceTrip = new TripService(mockUnitOfWork
                        .Object, mockRepoTrip.Object);

            WorkBlocksController controller = new WorkBlocksController(service, wbService,serviceTrip);

            var result = await controller.CreateMultiWorkBlocks(request);

            mockRepo.Verify(repo => repo.getVehicleDutyWithWorkblocks(It.IsAny<VehicleDutyId>()),
            Times.AtLeastOnce());
            mockUnitOfWork.Verify(unitOfWork => unitOfWork.CommitAsync(),
             Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(List<WorkBlock>));

        }

        [TestMethod]
        public async Task Test_UpdateAsync_Insuccess()
        {
            DateTime initializedDate = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            DateTime leavingHour = initializedDate.AddMilliseconds(1640285718000).ToLocalTime();
            TripDto tripDto = new TripDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6",
            "Go", "Line:1", "Path:1", leavingHour);
            Trip trip = TripMapper.ToDomain(tripDto);

            string tripCode = "3143bfe6-6d24-439e-9e18-e22bd1cd4ba6";
            string[] array = new string[] { tripCode };
            VehicleDutyId vId = new VehicleDutyId("3143bfe6-6d24-439e-9e18-e22bd1cd4bb6");

            List<WorkBlock> workBlocks = new List<WorkBlock>();
            List<Trip> trips = new List<Trip>();
            trips.Add(trip);
            List<WorkBlock> listResult = new List<WorkBlock>();
            listResult.Add(new WorkBlock(3000, 3060, "ALT", "ALB", true, true, trips));
            CreatingMultiWorkBlocksDto request =
            new CreatingMultiWorkBlocksDto(3000, "ALT", "ALB",
            "3143bfe6-6d24-439e-9e18-e22bd1cd4bb6", array, true, true, 1, 10);

            VehicleDuty vd = new VehicleDuty(vId, "VehicleDuty:02", "nome", "#5f0092", workBlocks);

            Exception exception = new Exception("Error");
            var mockRepo = new Mock<IVehicleDutyRepository>();
            var mockRepoWorkBlock = new Mock<IWorkBlockRepository>();
            var mockRepoTrip = new Mock<ITripRepository>();



            mockRepo.Setup(repo => repo.getVehicleDutyWithWorkblocks(It.IsAny<VehicleDutyId>()))
            .Throws(exception);

            var mockUnitOfWork = new Mock<IUnitOfWork>();

            VehicleDutyService service = new VehicleDutyService(mockUnitOfWork.Object,
            mockRepo.Object, mockRepoTrip.Object);
            WorkBlockService wbService = new WorkBlockService(mockUnitOfWork.Object, mockRepoWorkBlock.Object, mockRepo.Object);
            TripService serviceTrip = new TripService(mockUnitOfWork
                        .Object, mockRepoTrip.Object);

            WorkBlocksController controller = new WorkBlocksController(service, wbService,serviceTrip);

            var result = await controller.CreateMultiWorkBlocks(request);

            mockRepo.Verify(repo => repo.getVehicleDutyWithWorkblocks(It.IsAny<VehicleDutyId>()),
            Times.AtLeastOnce());
            mockUnitOfWork.Verify(unitOfWork => unitOfWork.CommitAsync(),
             Times.Never());

            Assert.AreEqual(result, null);
        }


    }
}