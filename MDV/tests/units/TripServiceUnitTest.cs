using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.AspNetCore.Mvc;
using Moq;
using DDDSample1.Controllers;
using DDDSample1.Domain.Trips;
using DDDSample1.Domain.WorkBlocks;
using System.Threading.Tasks;
using System;
using DDDSample1.Domain.Shared;
using System.Collections.Generic;

namespace MDVTests
{
    [TestClass]
    public class TripServiceUnitTest
    {
        [TestMethod]
        public async Task Test_AddAsync_Success()
        {
            TripDto request = new TripDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6","codigoAux", "Go", "Line:1", "Path:1", new DateTime(2040, 12, 12));

            var mock = new Mock<ITripRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();

            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            mock.Setup(service => service
            .AddAsync(It.IsAny<Trip>()))
            .Returns(Task.FromResult(TripMapper.ToDomain(request)));
            TripService service =
            new TripService(mockUnitOfWork.Object, mock.Object);

            var result = await service.AddAsync(request);

            mock.Verify(service => service.AddAsync(It.IsAny<Trip>()), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(TripDto));

        }

        [TestMethod]
        public async Task Test_AddAsync_Insuccess()
        {
            TripDto request = new TripDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6","codigoAux", "Go", "Line:1", "Path:1", new DateTime(2040, 12, 12));

            var mock = new Mock<ITripRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();


            BusinessRuleValidationException exception =
            new BusinessRuleValidationException("error adding async");


            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            mock.Setup(service => service
            .AddAsync(It.IsAny<Trip>()))
            .Throws(exception);
            TripService service =
            new TripService(mockUnitOfWork.Object, mock.Object);

            await Assert.ThrowsExceptionAsync<BusinessRuleValidationException>(
                async () => await service.AddAsync(request));

            mock.Verify(service => service.AddAsync(It.IsAny<Trip>()), Times.AtLeastOnce());

            // Assert.IsInstanceOfType(result, typeof(VehicleDutyDto));

        }

        [TestMethod]
        public async Task Test_GetByIdAsync_Success()
        {
            TripId request = new TripId("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6");

            TripDto trip = new TripDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6","codigoAux", "Go", "Line:1", "Path:1", new DateTime(2040, 12, 12));

            var mock = new Mock<ITripRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();

            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            mock.Setup(service => service
            .GetByIdAsync(It.IsAny<TripId>()))
            .Returns(Task.FromResult(TripMapper.ToDomain(trip)));
            TripService service =
            new TripService(mockUnitOfWork.Object, mock.Object);

            var result = await service.GetByIdAsync(request);

            mock.Verify(service => service.GetByIdAsync(It.IsAny<TripId>()), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(TripDto));

        }
        [TestMethod]
        public async Task Test_GetByIdAsync_Insuccess()
        {
            TripId request = new TripId("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6");

            TripDto trip = new TripDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6","codigoAux", "Go", "Line:1", "Path:1", new DateTime(2040, 12, 12));

            var mock = new Mock<ITripRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();

            BusinessRuleValidationException exception =
                        new BusinessRuleValidationException("error getting by Id");

            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            mock.Setup(service => service
            .GetByIdAsync(It.IsAny<TripId>()))
            .Throws(exception);
            TripService service =
            new TripService(mockUnitOfWork.Object, mock.Object);

            await Assert.ThrowsExceptionAsync<BusinessRuleValidationException>(
                async () => await service.GetByIdAsync(request));

            mock.Verify(service => service.GetByIdAsync(It.IsAny<TripId>()), Times.AtLeastOnce());

            //Assert.IsInstanceOfType(result, typeof(VehicleDutyDto));

        }

        [TestMethod]
        public async Task Test_GetAllAsync_Success()
        {
            List<Trip> allVehicleDuties = new List<Trip>();

            var mock = new Mock<ITripRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();

            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            mock.Setup(service => service
            .GetAllAsync())
            .Returns(Task.FromResult(allVehicleDuties));
            TripService service =
            new TripService(mockUnitOfWork.Object, mock.Object);

            var result = await service.GetAllAsync();

            mock.Verify(service => service.GetAllAsync(), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(List<TripDto>));

        }

        [TestMethod]
        public async Task Test_GetAllAsync_Insuccess()
        {
            List<Trip> allVehicleDuties = new List<Trip>();

            var mock = new Mock<ITripRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();

            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            BusinessRuleValidationException exception =
                        new BusinessRuleValidationException("error getting vehicle duties");


            mock.Setup(service => service
            .GetAllAsync())
            .Throws(exception);
            TripService service =
            new TripService(mockUnitOfWork.Object, mock.Object);

            await Assert.ThrowsExceptionAsync<BusinessRuleValidationException>(
                async () => await service.GetAllAsync());

            mock.Verify(service => service.GetAllAsync(), Times.AtLeastOnce());



        }

        [TestMethod]
        public async Task Test_GetAllFromLineAsync_Success()
        {
            List<Trip> allVehicleDutiesFromLine = new List<Trip>();
            String lineId = "3142bfe6-6d24-439e-9e18-e22bd1cd4ba6";

            var mock = new Mock<ITripRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();

            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            mock.Setup(service => service
            .GetAllFromLineAsync(lineId))
            .Returns(Task.FromResult(allVehicleDutiesFromLine));
            TripService service =
            new TripService(mockUnitOfWork.Object, mock.Object);

            var result = await service.GetAllFromLineAsync(lineId);

            mock.Verify(service => service.GetAllFromLineAsync(lineId), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(List<TripDto>));

        }

        [TestMethod]
        public async Task Test_GetAllFromLineAsync_Insuccess()
        {
            List<Trip> allVehicleDutiesFromLine = new List<Trip>();
            String lineId = "3142bfe6-6d24-439e-9e18-e22bd1cd4ba6";
            var mock = new Mock<ITripRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();

            BusinessRuleValidationException exception =
                        new BusinessRuleValidationException("error getting from line");



            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            mock.Setup(service => service
            .GetAllFromLineAsync(lineId))
            .Throws(exception);
            TripService service =
            new TripService(mockUnitOfWork.Object, mock.Object);

            await Assert.ThrowsExceptionAsync<BusinessRuleValidationException>(
               async () => await service.GetAllFromLineAsync(lineId));

            mock.Verify(service => service.GetAllFromLineAsync(lineId), Times.AtLeastOnce());


        }

        [TestMethod]
        public async Task Test_AddManyAsync_Success()
        {
            List<TripDto> list = new List<TripDto>();
            TripDto request = new TripDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6", "Go", "Line:1", "Path:1", new DateTime(2040, 12, 12));
            Trip trip = new Trip("codigoAux","Go", "Line:1", "Path:1", new DateTime(2040, 12, 12));

            list.Add(request);

            var mock = new Mock<ITripRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();

            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            mock.Setup(service => service
            .AddAsync(It.IsAny<Trip>()))
            .Returns(Task.FromResult(TripMapper.ToDomain(request)));

            TripService service =
            new TripService(mockUnitOfWork.Object, mock.Object);

            var result = await service.AddManyAsync(list);

            mock.Verify(service => service.AddAsync(It.IsAny<Trip>()), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(List<TripDto>));

        }

        [TestMethod]
        public async Task Test_AddManyAsync_Insuccess()
        {
            List<TripDto> list = new List<TripDto>();
            TripDto request = new TripDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6", "Go", "Line:1", "Path:1", new DateTime(2040, 12, 12));
            Trip trip = new Trip("codigoAux","Go", "Line:1", "Path:1", new DateTime(1000000000000000000));

            list.Add(request);

            var mock = new Mock<ITripRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();

            BusinessRuleValidationException exception =
                        new BusinessRuleValidationException("error adding many");



            mockUnitOfWork.Setup(unitOfWork =>
            unitOfWork.CommitAsync())
            .Returns(Task.FromResult(1));

            mock.Setup(service => service
            .AddAsync(It.IsAny<Trip>()))
            .Throws(exception);
            TripService service =
            new TripService(mockUnitOfWork.Object, mock.Object);

            await Assert.ThrowsExceptionAsync<BusinessRuleValidationException>(
               async () => await service.AddManyAsync(list));

            mock.Verify(service => service.AddAsync(It.IsAny<Trip>()), Times.AtLeastOnce());

        }

    //     [TestMethod]
    //     public async Task Test_getDurationPath_Success()
    //     {
    //         List<TripDto> list = new List<TripDto>();
    //         TripDto request = new TripDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6", "Go", "Line:1", "Path:1", new DateTime(2040, 12, 12));
    //         Trip trip = new Trip("Go", "Line:1", "Path:1", new DateTime(2040, 12, 12));

    //         list.Add(request);

    //         var mock = new Mock<ITripRepository>();
    //         var mockUnitOfWork = new Mock<IUnitOfWork>();

    //         mockUnitOfWork.Setup(unitOfWork =>
    //         unitOfWork.CommitAsync())
    //         .Returns(Task.FromResult(1));

    //         mock.Setup(service => service
    //         .AddAsync(It.IsAny<Trip>()))
    //         .Returns(Task.FromResult(TripMapper.ToDomain(request)));

    //         TripService service =
    //         new TripService(mockUnitOfWork.Object, mock.Object);

    //         var result = await service.AddManyAsync(list);

    //         mock.Verify(service => service.AddAsync(It.IsAny<Trip>()), Times.AtLeastOnce());

    //         Assert.IsInstanceOfType(result, typeof(List<TripDto>));

    //     }

    //     [TestMethod]
    //     public async Task Test_getDurationPath_Insuccess()
    //     {
    //         List<TripDto> list = new List<TripDto>();
    //         TripDto request = new TripDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6", "Go", "Line:1", "Path:1", new DateTime(2040, 12, 12));
    //         Trip trip = new Trip("Go", "Line:1", "Path:1", new DateTime(1000000000000000000));

    //         list.Add(request);

    //         var mock = new Mock<ITripRepository>();
    //         var mockUnitOfWork = new Mock<IUnitOfWork>();

    //         BusinessRuleValidationException exception =
    //                     new BusinessRuleValidationException("error adding many");



    //         mockUnitOfWork.Setup(unitOfWork =>
    //         unitOfWork.CommitAsync())
    //         .Returns(Task.FromResult(1));

    //         mock.Setup(service => service
    //         .AddAsync(It.IsAny<Trip>()))
    //         .Throws(exception);
    //         TripService service =
    //         new TripService(mockUnitOfWork.Object, mock.Object);

    //         await Assert.ThrowsExceptionAsync<BusinessRuleValidationException>(
    //            async () => await service.AddManyAsync(list));

    //         mock.Verify(service => service.AddAsync(It.IsAny<Trip>()), Times.AtLeastOnce());


    //     }

    }
}