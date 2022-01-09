using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.AspNetCore.Mvc;
using Moq;
using DDDSample1.Controllers;
using DDDSample1.Domain.VehicleDuties;
using DDDSample1.Domain.DriverDuties;
using DDDSample1.Domain.WorkBlocks;
using DDDSample1.Domain.Trips;
using System.Threading.Tasks;
using System;
using DDDSample1.Domain.Shared;
using System.Collections.Generic;

namespace MDVTests
{
    [TestClass]
    public class DriverDutiesControllerServiceIntegrationTest
    {

        [TestMethod]
        public async Task Test_Create_Success()
        {
            string[] array = new string[] { "3143bfe6-6d24-439e-9e18-e22bd1cd4ba6" };
            CreatingDriverDutyDto request = new CreatingDriverDutyDto("DriverDuty:01", "nome", "#5f0092", array);

            DriverDutyDto driverDutyDto = DriverDutyMapper.toDTO(request);
            DriverDuty driverDuty = DriverDutyMapper.toDomain(driverDutyDto);
            // List<WorkBlock> wbList = new List<WorkBlock>();

            DateTime initializedDate = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            DateTime leavingHour = initializedDate.AddMilliseconds(1640285718000).ToLocalTime();
            TripDto tripDto = new TripDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6",
            "Go", "Line:1", "Path:1", leavingHour);
            Trip trip = TripMapper.ToDomain(tripDto);
            List<WorkBlock> workBlocks = new List<WorkBlock>();
            List<Trip> trips = new List<Trip>();
            trips.Add(trip);
            WorkBlock wb = new WorkBlock(3000, 3060, "ALT", "ALB", true, true, trips);

            var mockRepo = new Mock<IDriverDutyRepository>();
            var mockRepoWorkBlock = new Mock<IWorkBlockRepository>();
            var mockRepoVehicleDuty = new Mock<IVehicleDutyRepository>();

            mockRepo.Setup(repo => repo.AddAsync(It.IsAny<DriverDuty>()))
            .Returns(Task.FromResult(driverDuty));
            mockRepoWorkBlock.Setup(repo => repo.GetByIdAsync(It.IsAny<WorkBlockId>()))
            .Returns(Task.FromResult(wb));

            var mockUnitOfWork = new Mock<IUnitOfWork>();

            DriverDutyService service = new DriverDutyService(mockUnitOfWork
            .Object, mockRepo.Object, mockRepoWorkBlock.Object);
            WorkBlockService serviceWb = new WorkBlockService(mockUnitOfWork
            .Object, mockRepoWorkBlock.Object,  mockRepoVehicleDuty.Object);

            DriverDutiesController controller = new DriverDutiesController(service, serviceWb);

            var result = await controller.Create(request);

            mockRepoWorkBlock.Verify(repo => repo.GetByIdAsync(It.IsAny<WorkBlockId>()), Times
            .AtLeastOnce());
            mockRepo.Verify(repo => repo.AddAsync(It.IsAny<DriverDuty>()), Times
            .AtLeastOnce());
            mockUnitOfWork.Verify(unitOfWork => unitOfWork.CommitAsync(), Times
            .AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(ActionResult));

        }

        [TestMethod]
        public async Task Test_Create_Insuccess()
        {

            string[] array = new string[] { "3143bfe6-6d24-439e-9e18-e22bd1cd4ba6" };
            CreatingDriverDutyDto request = new CreatingDriverDutyDto("DriverDuty:01", "", "#5f0092", array);

            DriverDutyDto driverDutyDto = DriverDutyMapper.toDTO(request);
            DriverDuty driverDuty = DriverDutyMapper.toDomain(driverDutyDto);
            // List<WorkBlock> wbList = new List<WorkBlock>();

            DateTime initializedDate = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            DateTime leavingHour = initializedDate.AddMilliseconds(1640285718000).ToLocalTime();
            TripDto tripDto = new TripDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6",
            "Go", "Line:1", "Path:1", leavingHour);
            Trip trip = TripMapper.ToDomain(tripDto);
            List<WorkBlock> workBlocks = new List<WorkBlock>();
            List<Trip> trips = new List<Trip>();
            trips.Add(trip);
            WorkBlock wb = new WorkBlock(3000, 3060, "ALT", "ALB", true, true, trips);

            Exception exception = new Exception("Error");
            var mockRepo = new Mock<IDriverDutyRepository>();
            var mockRepoWorkBlock = new Mock<IWorkBlockRepository>();
            var mockRepoVehicleDuty = new Mock<IVehicleDutyRepository>();

            mockRepo.Setup(repo => repo.AddAsync(It.IsAny<DriverDuty>()))
            .Throws(exception);
            mockRepoWorkBlock.Setup(repo => repo.GetByIdAsync(It.IsAny<WorkBlockId>()))
            .Returns(Task.FromResult(wb));

            var mockUnitOfWork = new Mock<IUnitOfWork>();

            DriverDutyService service = new DriverDutyService(mockUnitOfWork
            .Object, mockRepo.Object, mockRepoWorkBlock.Object);
            WorkBlockService serviceWb = new WorkBlockService(mockUnitOfWork
            .Object, mockRepoWorkBlock.Object,  mockRepoVehicleDuty.Object);

            DriverDutiesController controller = new DriverDutiesController(service, serviceWb);

            var result = await controller.Create(request);

            mockRepoWorkBlock.Verify(repo => repo.GetByIdAsync(It.IsAny<WorkBlockId>()), Times
            .AtLeastOnce());
            mockRepo.Verify(repo => repo.AddAsync(It.IsAny<DriverDuty>()), Times
            .AtLeastOnce());
            mockUnitOfWork.Verify(unitOfWork => unitOfWork.CommitAsync(), Times
            .Never());

           


            

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));

        }

        [TestMethod]
        public async Task Test_GetGetById_Success()
        {
             string[] array = new string[] { "3143bfe6-6d24-439e-9e18-e22bd1cd4ba6" };
            CreatingDriverDutyDto request = new CreatingDriverDutyDto("DriverDuty:01", "", "#5f0092", array);

            DriverDutyId vId = new DriverDutyId("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6");

            DriverDutyDto driverDutyDto = DriverDutyMapper.toDTO(request);
            DriverDuty driver = DriverDutyMapper.toDomain(driverDutyDto);


            var mockRepo = new Mock<IDriverDutyRepository>();
            var mockRepoWorkBlock = new Mock<IWorkBlockRepository>();
            var mockRepoVehicleDuty = new Mock<IVehicleDutyRepository>();

            mockRepo.Setup(repo => repo.GetByIdAsync(It.IsAny<DriverDutyId>()))
            .Returns(Task.FromResult(driver));

            var mockUnitOfWork = new Mock<IUnitOfWork>();

            DriverDutyService service = new DriverDutyService(mockUnitOfWork
            .Object, mockRepo.Object, mockRepoWorkBlock.Object);
            WorkBlockService serviceWb = new WorkBlockService(mockUnitOfWork
            .Object, mockRepoWorkBlock.Object,  mockRepoVehicleDuty.Object);

            DriverDutiesController controller = new DriverDutiesController(service, serviceWb);

            var result = await controller.GetGetById(new Guid("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6"));

            mockRepo.Verify(repo => repo.GetByIdAsync(It.IsAny<DriverDutyId>()),
             Times.AtLeastOnce());
            //mockUnitOfWork.Verify(unitOfWork => unitOfWork.CommitAsync(), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(ActionResult<DriverDutyDto>));

        }

    }
}