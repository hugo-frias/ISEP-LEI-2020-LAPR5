using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.AspNetCore.Mvc;
using Moq;
using DDDSample1.Controllers;
using DDDSample1.Domain.Vehicles;
using System.Threading.Tasks;
using System;
using DDDSample1.Domain.Shared;
using System.Collections.Generic;

namespace MDVTests
{
    [TestClass]
    public class VehiclesControllerServiceIntegrationTest
    {
        
        [TestMethod]
        public async Task Test_Create_Success()
        {
            CreatingVehicleDto request = new CreatingVehicleDto("05-DT-21", "vin", "vehicleType", 1231231231);
            
            VehicleDto vehicleDto = VehicleMapper.toDTO(request);
            Vehicle vehicle = VehicleMapper.toDomain(vehicleDto);


            var mockRepo = new Mock<IVehicleRepository>();
            mockRepo.Setup(repo => repo.AddAsync(It.IsAny<Vehicle>())).Returns(Task.FromResult(vehicle));

            var mockUnitOfWork = new Mock<IUnitOfWork>();

            VehicleService service = new VehicleService(mockUnitOfWork.Object, mockRepo.Object);

            VehiclesController controller = new VehiclesController(service);

            var result = await controller.Create(request);

            mockRepo.Verify(repo => repo.AddAsync(It.IsAny<Vehicle>()), Times.AtLeastOnce());
            mockUnitOfWork.Verify(unitOfWork => unitOfWork.CommitAsync(), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(ActionResult));

        }

      [TestMethod]
        public async Task Test_Create_Insuccess()
        {
            CreatingVehicleDto request = new CreatingVehicleDto("05-DT-21", "vin", "vehicleType", 1231231231);
            
            VehicleDto vehicleDto = VehicleMapper.toDTO(request);
            Vehicle vehicle = VehicleMapper.toDomain(vehicleDto);

            Exception exception = new Exception("Error");

            var mockRepo = new Mock<IVehicleRepository>();
            mockRepo.Setup(repo => repo.AddAsync(It.IsAny<Vehicle>())).Throws(exception);

            var mockUnitOfWork = new Mock<IUnitOfWork>();

            VehicleService service = new VehicleService(mockUnitOfWork.Object, mockRepo.Object);

            VehiclesController controller = new VehiclesController(service);

            var result = await controller.Create(request);

            mockRepo.Verify(repo => repo.AddAsync(It.IsAny<Vehicle>()), Times.AtLeastOnce());
            mockUnitOfWork.Verify(unitOfWork => unitOfWork.CommitAsync(), Times.Never());

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));

        }

        [TestMethod]
        public async Task Test_GetGetById_Success()
        {
            CreatingVehicleDto request = new CreatingVehicleDto("05-DT-21", "vin", "vehicleType", 1231231231);
            
            VehicleId vId = new VehicleId("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6");

            VehicleDto vehicleDto = VehicleMapper.toDTO(request);
            Vehicle vehicle = VehicleMapper.toDomain(vehicleDto);


            var mockRepo = new Mock<IVehicleRepository>();
            mockRepo.Setup(repo => repo.GetByIdAsync(It.IsAny<VehicleId>()))
            .Returns(Task.FromResult(vehicle));

            var mockUnitOfWork = new Mock<IUnitOfWork>();

            VehicleService service = new VehicleService(mockUnitOfWork.Object, mockRepo.Object);

            VehiclesController controller = new VehiclesController(service);

            var result = await controller.GetGetById(new Guid("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6"));

            mockRepo.Verify(repo => repo.GetByIdAsync(It.IsAny<VehicleId>()),
             Times.AtLeastOnce());
            //mockUnitOfWork.Verify(unitOfWork => unitOfWork.CommitAsync(), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(ActionResult<VehicleDto>));

        }

    }
}