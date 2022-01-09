using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.AspNetCore.Mvc;
using Moq;
using DDDSample1.Controllers;
using DDDSample1.Domain.VehicleDuties;
using DDDSample1.Domain.DriverDuties;
using DDDSample1.Domain.Trips;
using DDDSample1.Domain.WorkBlocks;
using System.Threading.Tasks;
using System;
using DDDSample1.Domain.Shared;
using System.Collections.Generic;

namespace MDVTests
{
    [TestClass]
    public class DriverDutyServiceUnitTest
    {

        [TestMethod]
        public async Task Test_AddAsync_Success()
        {
            string[] array = new string[] { "3143bfe6-6d24-439e-9e18-e22bd1cd4ba6" };
            CreatingDriverDutyDto request = new CreatingDriverDutyDto("DriverDuty:01", "nome", "#5f0092", array);
            List<WorkBlock> workBlocks = new List<WorkBlock>();
            DriverDutyDto teste = new DriverDutyDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6", "VehicleDuty:02", "nome", "#5f0092", workBlocks);

            DateTime initializedDate = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            DateTime leavingHour = initializedDate.AddMilliseconds(1640285718000).ToLocalTime();
            TripDto tripDto = new TripDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6",
            "Go", "Line:1", "Path:1", leavingHour);
            Trip trip = TripMapper.ToDomain(tripDto);
            List<Trip> trips = new List<Trip>();
            trips.Add(trip);
            WorkBlock wb = new WorkBlock(3000, 3060, "ALT", "ALB", true, true, trips);

            var mock = new Mock<IDriverDutyRepository>();
            var mockWorkBlock = new Mock<IWorkBlockRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();

            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));
            mockWorkBlock.Setup(repo => repo.GetByIdAsync(It.IsAny<WorkBlockId>()))
                        .Returns(Task.FromResult(wb));
            mock.Setup(service => service
            .AddAsync(It.IsAny<DriverDuty>()))
            .Returns(Task.FromResult(DriverDutyMapper.toDomain(teste)));
            DriverDutyService service =
            new DriverDutyService(mockUnitOfWork.Object, mock.Object, mockWorkBlock.Object);

            var result = await service.AddAsync(request);

            mock.Verify(service => service.AddAsync(It.IsAny<DriverDuty>()), Times.AtLeastOnce());
            mockWorkBlock.Verify(repo => repo.GetByIdAsync(It.IsAny<WorkBlockId>()), Times
                                    .AtLeastOnce());
            Assert.IsInstanceOfType(result, typeof(DriverDutyDto));

        }

        [TestMethod]
        public async Task Test_AddAsync_Insuccess()
        {
            string[] array = new string[] { "3143bfe6-6d24-439e-9e18-e22bd1cd4ba6" };
            CreatingDriverDutyDto request = new CreatingDriverDutyDto("DriverDuty:01", "nome", "#5f0092", array);
            List<WorkBlock> workBlocks = new List<WorkBlock>();
            DriverDutyDto teste = new DriverDutyDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6", "VehicleDuty:02", "nome", "#5f0092", workBlocks);


            BusinessRuleValidationException exception =
            new BusinessRuleValidationException("error adding async");

            DateTime initializedDate = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            DateTime leavingHour = initializedDate.AddMilliseconds(1640285718000).ToLocalTime();
            TripDto tripDto = new TripDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6",
            "Go", "Line:1", "Path:1", leavingHour);
            Trip trip = TripMapper.ToDomain(tripDto);
            List<Trip> trips = new List<Trip>();
            trips.Add(trip);
            WorkBlock wb = new WorkBlock(3000, 3060, "ALT", "ALB", true, true, trips);

            var mock = new Mock<IDriverDutyRepository>();
            var mockWorkBlock = new Mock<IWorkBlockRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();

            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));
            mockWorkBlock.Setup(repo => repo.GetByIdAsync(It.IsAny<WorkBlockId>()))
                        .Returns(Task.FromResult(wb));
            mock.Setup(service => service
            .AddAsync(It.IsAny<DriverDuty>()))
            .Throws(exception);
            DriverDutyService service =
            new DriverDutyService(mockUnitOfWork.Object, mock.Object, mockWorkBlock.Object);

            await Assert.ThrowsExceptionAsync<BusinessRuleValidationException>(
               async () => await service.AddAsync(request));


            mock.Verify(service => service.AddAsync(It.IsAny<DriverDuty>()), Times.AtLeastOnce());
            mockWorkBlock.Verify(repo => repo.GetByIdAsync(It.IsAny<WorkBlockId>()), Times
                                    .AtLeastOnce());
        }

        [TestMethod]
        public async Task Test_GetByIdAsync_Success()
        {
            List<WorkBlock> workBlocks = new List<WorkBlock>();
            DriverDutyId request = new DriverDutyId("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6");

            DriverDutyDto driverDuty = new DriverDutyDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6", "VehicleDuty:02", "nome", "#5f0092", workBlocks);

            var mock = new Mock<IDriverDutyRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();
            var mockWorkBlock = new Mock<IWorkBlockRepository>();

            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            mock.Setup(service => service
            .GetByIdAsync(It.IsAny<DriverDutyId>()))
            .Returns(Task.FromResult(DriverDutyMapper.toDomain(driverDuty)));
            DriverDutyService service =
            new DriverDutyService(mockUnitOfWork.Object, mock.Object, mockWorkBlock.Object);

            var result = await service.GetByIdAsync(request);

            mock.Verify(service => service.GetByIdAsync(It.IsAny<DriverDutyId>()), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(DriverDutyDto));

        }
        [TestMethod]
        public async Task Test_GetByIdAsync_Insuccess()
        {
            List<WorkBlock> workBlocks = new List<WorkBlock>();
            DriverDutyId request = new DriverDutyId("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6");

            DriverDutyDto driverDuty = new DriverDutyDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6", "VehicleDuty:02", "nome", "#5f0092", workBlocks);

            var mock = new Mock<IDriverDutyRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();
            var mockWorkBlock = new Mock<IWorkBlockRepository>();


            BusinessRuleValidationException exception =
                        new BusinessRuleValidationException("error getting by Id");

            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            mock.Setup(service => service
            .GetByIdAsync(It.IsAny<DriverDutyId>()))
            .Throws(exception);
            DriverDutyService service =
            new DriverDutyService(mockUnitOfWork.Object, mock.Object, mockWorkBlock.Object);

               await Assert.ThrowsExceptionAsync<BusinessRuleValidationException>(
                async () => await service.GetByIdAsync(request));

            mock.Verify(service => service.GetByIdAsync(It.IsAny<DriverDutyId>()), Times.AtLeastOnce());

          






        }

        [TestMethod]
        public async Task Test_GetAllAsync_Success()
        {
            List<DriverDuty> allDriverDuties = new List<DriverDuty>();
            var mock = new Mock<IDriverDutyRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();
            var mockWorkBlock = new Mock<IWorkBlockRepository>();

            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            mock.Setup(service => service
            .GetAllAsync())
            .Returns(Task.FromResult(allDriverDuties));
             DriverDutyService service =
            new DriverDutyService(mockUnitOfWork.Object, mock.Object, mockWorkBlock.Object);

            var result = await service.GetAllAsync();

            mock.Verify(service => service.GetAllAsync(), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(List<DriverDutyDto>));

        }

         [TestMethod]
        public async Task Test_GetAllAsync_Insuccess()
        {
            List<DriverDuty> allDriverDuties = new List<DriverDuty>();
            var mock = new Mock<IDriverDutyRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();
            var mockWorkBlock = new Mock<IWorkBlockRepository>();

            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));



            BusinessRuleValidationException exception =
                        new BusinessRuleValidationException("error getting vehicle duties");

            mock.Setup(service => service
            .GetAllAsync())
            .Throws(exception);
             DriverDutyService service =
            new DriverDutyService(mockUnitOfWork.Object, mock.Object, mockWorkBlock.Object);

             await Assert.ThrowsExceptionAsync<BusinessRuleValidationException>(
                async () => await service.GetAllAsync());

            mock.Verify(service => service.GetAllAsync(), Times.AtLeastOnce());

        }

    }
}