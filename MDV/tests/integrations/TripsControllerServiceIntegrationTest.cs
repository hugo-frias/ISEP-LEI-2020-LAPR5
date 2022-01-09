using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.AspNetCore.Mvc;
using Moq;
using DDDSample1.Controllers;
using DDDSample1.Domain.Trips;
using System.Threading.Tasks;
using System;
using DDDSample1.Domain.Shared;
using System.Collections.Generic;

namespace MDVTests
{
    [TestClass]
    public class TripsControllerServiceIntegrationTest
    {

        [TestMethod]
        public async Task Test_Create_Success()
        {
            DateTime initializedDate = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            DateTime leavingHour = initializedDate.AddMilliseconds(1640285718000).ToLocalTime();
            CreatingTripDto request = new CreatingTripDto("codigoAux","Go", "Line:1", "Path:1", 1640285718000);

            TripDto tripDto = new TripDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6", 
            "Go", "Line:1", "Path:1", leavingHour);
            Trip trip = TripMapper.ToDomain(tripDto);


            var mockRepo = new Mock<ITripRepository>();
            mockRepo.Setup(repo => repo.AddAsync(It.IsAny<Trip>()))
            .Returns(Task.FromResult(trip));

            var mockUnitOfWork = new Mock<IUnitOfWork>();

            TripService service = new TripService(mockUnitOfWork
            .Object, mockRepo.Object);

            TripsController controller = new TripsController(service);

            var result = await controller.Create(request);

            mockRepo.Verify(repo => repo.AddAsync(It.IsAny<Trip>()), Times.AtLeastOnce());
            mockUnitOfWork.Verify(unitOfWork => unitOfWork.CommitAsync(), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(ActionResult));

        }

        [TestMethod]
        public async Task Test_Create_Insuccess()
        {
            DateTime initializedDate = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            DateTime leavingHour = initializedDate.AddMilliseconds(1640285718000).ToLocalTime();
            CreatingTripDto request = new CreatingTripDto("codigoAux","Go", "Line:1", "Path:1", 1640285718000);

            TripDto tripDto = new TripDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6", "Go", "Line:1", "Path:1", leavingHour);
            Trip trip = TripMapper.ToDomain(tripDto);

            Exception exception = new Exception("Error");

            var mockRepo = new Mock<ITripRepository>();
            mockRepo.Setup(repo => repo.AddAsync(It.IsAny<Trip>()))
            .Throws(exception);

            var mockUnitOfWork = new Mock<IUnitOfWork>();

            TripService service = new TripService(mockUnitOfWork
            .Object, mockRepo.Object);

            TripsController controller = new TripsController(service);

            var result = await controller.Create(request);

            mockRepo.Verify(repo => repo.AddAsync(It.IsAny<Trip>()), Times.AtLeastOnce());
            mockUnitOfWork.Verify(unitOfWork => unitOfWork.CommitAsync(), Times.Never());

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));

        }

        [TestMethod]
        public async Task Test_GetGetById_Success()
        {
            CreatingTripDto request = new CreatingTripDto("codigoAux","Go", "Line:1", "Path:1", 3400);

            TripDto tripDto = new TripDto("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6", "Go", "Line:1", "Path:1", new DateTime(2040, 12, 12));
            Trip trip = TripMapper.ToDomain(tripDto);

            var mockRepo = new Mock<ITripRepository>();
            mockRepo.Setup(repo => repo.GetByIdAsync(It.IsAny<TripId>()))
            .Returns(Task.FromResult(trip));

            var mockUnitOfWork = new Mock<IUnitOfWork>();

            TripService service = new TripService(mockUnitOfWork
            .Object, mockRepo.Object);

            TripsController controller = new TripsController(service);

            var result = await controller.GetGetById(new Guid("3143bfe6-6d24-439e-9e18-e22bd1cd4ba6"));

            mockRepo.Verify(repo => repo.GetByIdAsync(It.IsAny<TripId>()),
             Times.AtLeastOnce());
            //mockUnitOfWork.Verify(unitOfWork => unitOfWork.CommitAsync(), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(ActionResult<TripDto>));

        }

    }
}