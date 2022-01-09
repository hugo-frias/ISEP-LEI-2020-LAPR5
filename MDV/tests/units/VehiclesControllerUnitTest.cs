using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.AspNetCore.Mvc;
using Moq;
using DDDSample1.Controllers;
using DDDSample1.Domain.Vehicles;
using System.Threading.Tasks;
using System;
using DDDSample1.Domain.Shared;

namespace MDVTests
{
    [TestClass]
    public class VehiclesControllerUnitTest
    {
        [TestMethod]
        public async Task Test_Create_Success()
        {
            CreatingVehicleDto request = new CreatingVehicleDto("05-21-DT", "vin", "vehicleType", 1231231231);

            var mock = new Mock<IVehicleService>();
            mock.Setup(service => service.AddAsync(It.IsAny<VehicleDto>())).Returns(Task.FromResult(VehicleMapper.toDTO(request)));
            VehiclesController controller = new VehiclesController(mock.Object);

            var result = await controller.Create(request);

            mock.Verify(service => service.AddAsync(It.IsAny<VehicleDto>()), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(ActionResult));

        }

        [TestMethod]
        public async Task Test_Create_FailMatricula()
        {

            CreatingVehicleDto request = new CreatingVehicleDto(null, "vin", "vehicleType", 1231231231);
            var mock = new Mock<IVehicleService>();

            BusinessRuleValidationException exception = new BusinessRuleValidationException("The matricula shouldn't be null");


            mock.Setup(service => service.AddAsync(It.IsAny<VehicleDto>())).Throws(exception);
            VehiclesController controller = new VehiclesController(mock.Object);

            var result = await controller.Create(request);

            mock.Verify(service => service.AddAsync(It.IsAny<VehicleDto>()), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));

        }

        [TestMethod]
        public async Task Test_Create_FailVin()
        {

            CreatingVehicleDto request = new CreatingVehicleDto("05-21-DT", null, "vehicleType", 1231231231);
            var mock = new Mock<IVehicleService>();

            BusinessRuleValidationException exception = new BusinessRuleValidationException("The vin shouldn't be null");


            mock.Setup(service => service.AddAsync(It.IsAny<VehicleDto>())).Throws(exception);
            VehiclesController controller = new VehiclesController(mock.Object);

            var result = await controller.Create(request);

            mock.Verify(service => service.AddAsync(It.IsAny<VehicleDto>()), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));

        }

        [TestMethod]
        public async Task Test_Create_FailVehicleType()
        {

            CreatingVehicleDto request = new CreatingVehicleDto("05-21-DT", "vin", null, 1231231231);


            BusinessRuleValidationException exception = new BusinessRuleValidationException("The vehicleType shouldn't be null");
            var mock = new Mock<IVehicleService>();

            mock.Setup(service => service.AddAsync(It.IsAny<VehicleDto>())).Throws(exception);
            VehiclesController controller = new VehiclesController(mock.Object);

            var result = await controller.Create(request);

            mock.Verify(service => service.AddAsync(It.IsAny<VehicleDto>()), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }


    }
}