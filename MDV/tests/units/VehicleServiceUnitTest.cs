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
    public class VehicleServiceUnitTest
    {
        [TestMethod]
        public async Task Test_AddAsync_Success()
        {
            VehicleDto request = new VehicleDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6", "24-PP-03", "1234567890asdfghj", "VehicleType:01", new DateTime(50000));

            var mock = new Mock<IVehicleRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();

            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            mock.Setup(service => service
            .AddAsync(It.IsAny<Vehicle>()))
            .Returns(Task.FromResult(VehicleMapper.toDomain(request)));
            VehicleService service =
            new VehicleService(mockUnitOfWork.Object, mock.Object);

            var result = await service.AddAsync(request);

            mock.Verify(service => service.AddAsync(It.IsAny<Vehicle>()), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(VehicleDto));

        }

        [TestMethod]
        public async Task Test_AddAsync_Insuccess()
        {
            VehicleDto request = new VehicleDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6", "24-PP-03", "1234567890asdfghj", "VehicleType:01", new DateTime(50000));

            var mock = new Mock<IVehicleRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();


            BusinessRuleValidationException exception =
            new BusinessRuleValidationException("error adding async");


            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            mock.Setup(service => service
            .AddAsync(It.IsAny<Vehicle>()))
            .Throws(exception);
            VehicleService service =
            new VehicleService(mockUnitOfWork.Object, mock.Object);

            await Assert.ThrowsExceptionAsync<BusinessRuleValidationException>(
                async () => await service.AddAsync(request));

            mock.Verify(service => service.AddAsync(It.IsAny<Vehicle>()), Times.AtLeastOnce());

            // Assert.IsInstanceOfType(result, typeof(VehicleDutyDto));

        }

        [TestMethod]
        public async Task Test_GetByIdAsync_Success()
        {

            VehicleId request = new VehicleId("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6");

            VehicleDto vehicle = new VehicleDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6", "24-PP-03", "1234567890asdfghj", "VehicleType:01", new DateTime(50000));

            var mock = new Mock<IVehicleRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();

            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            mock.Setup(service => service
            .GetByIdAsync(It.IsAny<VehicleId>()))
            .Returns(Task.FromResult(VehicleMapper.toDomain(vehicle)));
            VehicleService service =
            new VehicleService(mockUnitOfWork.Object, mock.Object);

            var result = await service.GetByIdAsync(request);

            mock.Verify(service => service.GetByIdAsync(It.IsAny<VehicleId>()), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(VehicleDto));

        }
        [TestMethod]
        public async Task Test_GetByIdAsync_Insuccess()
        {
            VehicleId request = new VehicleId("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6");

            VehicleDto vehicle = new VehicleDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6", "24-PP-03", "1234567890asdfghj", "VehicleType:01", new DateTime(50000));

            var mock = new Mock<IVehicleRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();

            BusinessRuleValidationException exception =
                        new BusinessRuleValidationException("error getting by Id");

            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            mock.Setup(service => service
            .GetByIdAsync(It.IsAny<VehicleId>()))
            .Throws(exception);
            VehicleService service =
            new VehicleService(mockUnitOfWork.Object, mock.Object);

            await Assert.ThrowsExceptionAsync<BusinessRuleValidationException>(
                async () => await service.GetByIdAsync(request));

            mock.Verify(service => service.GetByIdAsync(It.IsAny<VehicleId>()), Times.AtLeastOnce());

            //Assert.IsInstanceOfType(result, typeof(VehicleDutyDto));

        }

        [TestMethod]
        public async Task Test_GetAllAsync_Success()
        {
            List<Vehicle> allVehicles = new List<Vehicle>();
            var mock = new Mock<IVehicleRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();

            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            mock.Setup(service => service
            .GetAllAsync())
            .Returns(Task.FromResult(allVehicles));
            VehicleService service =
            new VehicleService(mockUnitOfWork.Object, mock.Object);

            var result = await service.GetAllAsync();

            mock.Verify(service => service.GetAllAsync(), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(List<VehicleDto>));

        }

         [TestMethod]
        public async Task Test_GetAllAsync_Insuccess()
        {
            //List<WorkBlock> workBlocks = new List<WorkBlock>();
            //VehicleDutyId request = new VehicleDutyId("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6");

            //VehicleDutyDto vehicleDuty = new VehicleDutyDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6", "VehicleDuty:02", "nome", "#5f0092", workBlocks);
            List<Vehicle> allVehicleDuties = new List<Vehicle>();
            var mock = new Mock<IVehicleRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();

            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            BusinessRuleValidationException exception =
                        new BusinessRuleValidationException("error getting vehicles");


            mock.Setup(service => service
            .GetAllAsync())
            .Throws(exception);
            VehicleService service =
            new VehicleService(mockUnitOfWork.Object, mock.Object);

            await Assert.ThrowsExceptionAsync<BusinessRuleValidationException>(
                async () => await service.GetAllAsync());

            mock.Verify(service => service.GetAllAsync(), Times.AtLeastOnce());



    }
}
}