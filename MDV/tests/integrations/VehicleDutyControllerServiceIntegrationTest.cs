using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.AspNetCore.Mvc;
using Moq;
using DDDSample1.Controllers;
using DDDSample1.Domain.VehicleDuties;
using DDDSample1.Domain.WorkBlocks;
using DDDSample1.Domain.Trips;
using System.Threading.Tasks;
using System;
using DDDSample1.Domain.Shared;
using System.Collections.Generic;

namespace MDVTests
{
    [TestClass]
    public class VehicleDutyControllerServiceIntegrationTest
    {

        [TestMethod]
        public async Task Test_Create_Success()
        {   
            CreatingVehicleDutyDto request = new CreatingVehicleDutyDto("VehicleDuty:02", "nome", "#5f0092");

            VehicleDutyDto vehicleDutyDto = VehicleDutyMapper.toDTO(request);
            VehicleDuty vehicleDuty = VehicleDutyMapper.toDomain(vehicleDutyDto);


            var mockRepo = new Mock<IVehicleDutyRepository>();
            var mockRepoTrip = new Mock<ITripRepository>();
            var mockRepoWorkBlock = new Mock<IWorkBlockRepository>();
            var mockRepoVehicleDuty = new Mock<IVehicleDutyRepository>();
            mockRepo.Setup(repo => repo.AddAsync(It.IsAny<VehicleDuty>()))
            .Returns(Task.FromResult(vehicleDuty));

            var mockUnitOfWork = new Mock<IUnitOfWork>();

            VehicleDutyService service = new VehicleDutyService(mockUnitOfWork
            .Object, mockRepo.Object,mockRepoTrip.Object);
            WorkBlockService serviceWb = new WorkBlockService(mockUnitOfWork
            .Object, mockRepoWorkBlock.Object,  mockRepoVehicleDuty.Object);

            VehicleDutiesController controller = new VehicleDutiesController(service,serviceWb);

            var result = await controller.Create(request);

            mockRepo.Verify(repo => repo.AddAsync(It.IsAny<VehicleDuty>()), Times
            .AtLeastOnce());
            mockUnitOfWork.Verify(unitOfWork => unitOfWork.CommitAsync(), Times
            .AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(ActionResult));

        }

        [TestMethod]
        public async Task Test_Create_Insuccess()
        {
            CreatingVehicleDutyDto request = new CreatingVehicleDutyDto("VehicleDuty:02", "nome", "#5f0092");

            VehicleDutyDto vehicleDutyDto = VehicleDutyMapper.toDTO(request);
            VehicleDuty vehicleDuty = VehicleDutyMapper.toDomain(vehicleDutyDto);

            Exception exception = new Exception("Error");

            var mockRepo = new Mock<IVehicleDutyRepository>();
            var mockRepoTrip = new Mock<ITripRepository>();
            var mockRepoWorkBlock = new Mock<IWorkBlockRepository>();
            var mockRepoVehicleDuty = new Mock<IVehicleDutyRepository>();
            mockRepo.Setup(repo => repo.AddAsync(It.IsAny<VehicleDuty>())).Throws(exception);

            var mockUnitOfWork = new Mock<IUnitOfWork>();

            VehicleDutyService service = new VehicleDutyService(mockUnitOfWork
            .Object, mockRepo.Object,mockRepoTrip.Object);
            WorkBlockService serviceWb = new WorkBlockService(mockUnitOfWork
            .Object, mockRepoWorkBlock.Object,  mockRepoVehicleDuty.Object);

            VehicleDutiesController controller = new VehicleDutiesController(service,serviceWb);

            var result = await controller.Create(request);

            mockRepo.Verify(repo => repo.AddAsync(It.IsAny<VehicleDuty>()), Times.AtLeastOnce());
            mockUnitOfWork.Verify(unitOfWork => unitOfWork.CommitAsync(), Times.Never());

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));

        }

        [TestMethod]
        public async Task Test_GetGetById_Success()
        {
            CreatingVehicleDutyDto request = new CreatingVehicleDutyDto("VehicleDuty:02", "nome", "#5f0092");

            VehicleDutyId vId = new VehicleDutyId("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6");

            VehicleDutyDto vehicleDto = VehicleDutyMapper.toDTO(request);
            VehicleDuty vehicle = VehicleDutyMapper.toDomain(vehicleDto);


            var mockRepo = new Mock<IVehicleDutyRepository>();
            var mockRepoTrip = new Mock<ITripRepository>();
            var mockRepoWorkBlock = new Mock<IWorkBlockRepository>();
            var mockRepoVehicleDuty = new Mock<IVehicleDutyRepository>();
            mockRepo.Setup(repo => repo.GetByIdAsync(It.IsAny<VehicleDutyId>()))
            .Returns(Task.FromResult(vehicle));

            var mockUnitOfWork = new Mock<IUnitOfWork>();

            VehicleDutyService service = new VehicleDutyService(mockUnitOfWork
            .Object, mockRepo.Object,mockRepoTrip.Object);
            WorkBlockService serviceWb = new WorkBlockService(mockUnitOfWork
            .Object, mockRepoWorkBlock.Object,  mockRepoVehicleDuty.Object);

            VehicleDutiesController controller = new VehicleDutiesController(service,serviceWb);

            var result = await controller.GetGetById(new Guid("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6"));

            mockRepo.Verify(repo => repo.GetByIdAsync(It.IsAny<VehicleDutyId>()),
             Times.AtLeastOnce());
            //mockUnitOfWork.Verify(unitOfWork => unitOfWork.CommitAsync(), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(ActionResult<VehicleDutyDto>));

        }

    }
}