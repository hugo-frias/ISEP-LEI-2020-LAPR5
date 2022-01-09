using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.AspNetCore.Mvc;
using Moq;
using DDDSample1.Controllers;
using DDDSample1.Domain.VehicleDuties;
using DDDSample1.Domain.Trips;
using DDDSample1.Domain.WorkBlocks;
using System.Threading.Tasks;
using System;
using DDDSample1.Domain.Shared;
using System.Collections.Generic;

namespace MDVTests
{
    [TestClass]
    public class VehicleDutyServiceUnitTest
    {

        
        [TestMethod]
         public async Task Test_AddAsync_Success()
        {
            List<WorkBlock> workBlocks = new List<WorkBlock>();
            VehicleDutyDto request = new VehicleDutyDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6", "VehicleDuty:02", "nome", "#5f0092", workBlocks);

            var mock = new Mock<IVehicleDutyRepository>();
            var mockTrip = new Mock<ITripRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();

            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            mock.Setup(service => service
            .AddAsync(It.IsAny<VehicleDuty>()))
            .Returns(Task.FromResult(VehicleDutyMapper.toDomain(request)));
            VehicleDutyService service =
            new VehicleDutyService(mockUnitOfWork.Object, mock.Object, mockTrip.Object);

            var result = await service.AddAsync(request);

            mock.Verify(service => service.AddAsync(It.IsAny<VehicleDuty>()), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(VehicleDutyDto));

        }

        [TestMethod]
        public async Task Test_AddAsync_Insuccess()
        {
            List<WorkBlock> workBlocks = new List<WorkBlock>();
            VehicleDutyDto request = new VehicleDutyDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6", "VehicleDuty:02", "nome", "#5f0092", workBlocks);

            var mock = new Mock<IVehicleDutyRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();
            var mockTrip = new Mock<ITripRepository>();


            BusinessRuleValidationException exception =
            new BusinessRuleValidationException("error adding async");


            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            mock.Setup(service => service
            .AddAsync(It.IsAny<VehicleDuty>()))
            .Throws(exception);
            VehicleDutyService service =
            new VehicleDutyService(mockUnitOfWork.Object, mock.Object, mockTrip.Object);

            await Assert.ThrowsExceptionAsync<BusinessRuleValidationException>(
                async () => await service.AddAsync(request));

            mock.Verify(service => service.AddAsync(It.IsAny<VehicleDuty>()), Times.AtLeastOnce());

            // Assert.IsInstanceOfType(result, typeof(VehicleDutyDto));

        }

        [TestMethod]
        public async Task Test_GetByIdAsync_Success()
        {
            List<WorkBlock> workBlocks = new List<WorkBlock>();
            VehicleDutyId request = new VehicleDutyId("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6");

            VehicleDutyDto vehicleDuty = new VehicleDutyDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6", "VehicleDuty:02", "nome", "#5f0092", workBlocks);

            var mock = new Mock<IVehicleDutyRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();
            var mockTrip = new Mock<ITripRepository>();

            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            mock.Setup(service => service
            .GetByIdAsync(It.IsAny<VehicleDutyId>()))
            .Returns(Task.FromResult(VehicleDutyMapper.toDomain(vehicleDuty)));
            VehicleDutyService service =
            new VehicleDutyService(mockUnitOfWork.Object, mock.Object, mockTrip.Object);

            var result = await service.GetByIdAsync(request);

            mock.Verify(service => service.GetByIdAsync(It.IsAny<VehicleDutyId>()), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(VehicleDutyDto));

        }
        [TestMethod]
        public async Task Test_GetByIdAsync_Insuccess()
        {
            List<WorkBlock> workBlocks = new List<WorkBlock>();
            VehicleDutyId request = new VehicleDutyId("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6");

            VehicleDutyDto vehicleDuty = new VehicleDutyDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6", "VehicleDuty:02", "nome", "#5f0092", workBlocks);

            var mock = new Mock<IVehicleDutyRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();
            var mockTrip = new Mock<ITripRepository>();

            BusinessRuleValidationException exception =
                        new BusinessRuleValidationException("error getting by Id");

            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            mock.Setup(service => service
            .GetByIdAsync(It.IsAny<VehicleDutyId>()))
            .Throws(exception);
            VehicleDutyService service =
            new VehicleDutyService(mockUnitOfWork.Object, mock.Object, mockTrip.Object);

            await Assert.ThrowsExceptionAsync<BusinessRuleValidationException>(
                async () => await service.GetByIdAsync(request));

            mock.Verify(service => service.GetByIdAsync(It.IsAny<VehicleDutyId>()), Times.AtLeastOnce());

            //Assert.IsInstanceOfType(result, typeof(VehicleDutyDto));

        }

        [TestMethod]
        public async Task Test_GetAllAsync_Success()
        {
            //List<WorkBlock> workBlocks = new List<WorkBlock>();
            //VehicleDutyId request = new VehicleDutyId("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6");

            //VehicleDutyDto vehicleDuty = new VehicleDutyDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6", "VehicleDuty:02", "nome", "#5f0092", workBlocks);
            List<VehicleDuty> allVehicleDuties = new List<VehicleDuty>();
            var mock = new Mock<IVehicleDutyRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();
            var mockTrip = new Mock<ITripRepository>();

            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            mock.Setup(service => service
            .GetAllAsync())
            .Returns(Task.FromResult(allVehicleDuties));
            VehicleDutyService service =
            new VehicleDutyService(mockUnitOfWork.Object, mock.Object, mockTrip.Object);

            var result = await service.GetAllAsync();

            mock.Verify(service => service.GetAllAsync(), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(List<VehicleDutyDto>));

        }

         [TestMethod]
        public async Task Test_GetAllAsync_Insuccess()
        {
            //List<WorkBlock> workBlocks = new List<WorkBlock>();
            //VehicleDutyId request = new VehicleDutyId("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6");

            //VehicleDutyDto vehicleDuty = new VehicleDutyDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6", "VehicleDuty:02", "nome", "#5f0092", workBlocks);
            List<VehicleDuty> allVehicleDuties = new List<VehicleDuty>();
            var mock = new Mock<IVehicleDutyRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();
            var mockTrip = new Mock<ITripRepository>();

            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            BusinessRuleValidationException exception =
                        new BusinessRuleValidationException("error getting vehicle duties");


            mock.Setup(service => service
            .GetAllAsync())
            .Throws(exception);
            VehicleDutyService service =
            new VehicleDutyService(mockUnitOfWork.Object, mock.Object, mockTrip.Object);

            await Assert.ThrowsExceptionAsync<BusinessRuleValidationException>(
                async () => await service.GetAllAsync());

            mock.Verify(service => service.GetAllAsync(), Times.AtLeastOnce());

            

        }

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
            List<WorkBlock> workBlocks = new List<WorkBlock>();
            VehicleDutyId request = new VehicleDutyId("3143bfe6-6d24-439e-9e18-e22bd1cd4bb6");
            VehicleDuty vd = new VehicleDuty(request, "VehicleDuty:02", "nome", "#5f0092", workBlocks);

            List<Trip> trips = new List<Trip>();
            trips.Add(trip);
            List<WorkBlock> listResult = new List<WorkBlock>();
            listResult.Add(new WorkBlock(3000, 3060, "ALT", "ALB", true, true, trips));


            CreatingMultiWorkBlocksDto obj = new CreatingMultiWorkBlocksDto(3000,"ALT","ALB", "3143bfe6-6d24-439e-9e18-e22bd1cd4bb6",array,true,true,1,1);
            
            var mock = new Mock<IVehicleDutyRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();
            var mockTrip = new Mock<ITripRepository>();

            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            mock.Setup(service => service
            .getVehicleDutyWithWorkblocks(request))
            .Returns(Task.FromResult(vd));

            VehicleDutyService service =
            new VehicleDutyService(mockUnitOfWork.Object, mock.Object, mockTrip.Object);

            var result = await service.UpdateAsync(obj);

            mock.Verify(service => service.getVehicleDutyWithWorkblocks(request), Times.AtLeastOnce());
            Console.WriteLine(result);
            Assert.IsInstanceOfType(result, typeof(List<WorkBlock>));

        }

        [TestMethod]
        public async Task Test_UpdateAsync_Insuccess()
        {
            List<WorkBlock> workBlocks = new List<WorkBlock>();
            VehicleDutyId request = new VehicleDutyId("3143bfe6-6d24-439e-9e18-e22bd1cd4bb6");
            VehicleDuty vd = new VehicleDuty(request, "VehicleDuty:02", "nome", "#5f0092", workBlocks);
            string[] trips = {"trip:1"};
            CreatingMultiWorkBlocksDto obj = new CreatingMultiWorkBlocksDto(3000,"nodeStart","nodeEnd", "3143bfe6-6d24-439e-9e18-e22bd1cd4bb6",trips,true,true,2,40);
            
            BusinessRuleValidationException exception =
                        new BusinessRuleValidationException("error getting by Id");

            var mock = new Mock<IVehicleDutyRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();
            var mockTrip = new Mock<ITripRepository>();

            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            mock.Setup(service => service
            .GetByIdAsync(request))
            .Throws(exception);

            VehicleDutyService service =
            new VehicleDutyService(mockUnitOfWork.Object, mock.Object, mockTrip.Object);

             await Assert.ThrowsExceptionAsync<BusinessRuleValidationException>(
                async () => await service.GetByIdAsync(request));

            mock.Verify(service => service.GetByIdAsync(request), Times.AtLeastOnce());

            //Assert.IsInstanceOfType(result, typeof(List<WorkBlock>));

        }


    }
}