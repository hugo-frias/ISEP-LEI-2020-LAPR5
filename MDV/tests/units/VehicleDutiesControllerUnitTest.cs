using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.AspNetCore.Mvc;
using Moq;    
using DDDSample1.Controllers;
using DDDSample1.Domain.VehicleDuties;
using DDDSample1.Domain.WorkBlocks;
using System.Threading.Tasks;
using System;
using DDDSample1.Domain.Shared;

namespace MDVTests  
{  
    [TestClass]  
    public class VehicleDutiesControllerUnitTest  
    {  
        [TestMethod]  
        public async Task Test_Create_Success()  
        {
            CreatingVehicleDutyDto request = new CreatingVehicleDutyDto("VehicleDuty:02", "nome", "#5f0092");

            var mock = new Mock<IVehicleDutyService>();  
            var mockWorkBlock = new Mock<IWorkBlockService>();
            mock.Setup(service => service.AddAsync(It.IsAny<VehicleDutyDto>())).Returns(Task.FromResult(VehicleDutyMapper.toDTO(request)));  
            VehicleDutiesController controller = new VehicleDutiesController(mock.Object, mockWorkBlock.Object);

            var result = await controller.Create(request);

            mock.Verify(service => service.AddAsync(It.IsAny<VehicleDutyDto>()), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(ActionResult));

        }

        [TestMethod]  
        public async Task Test_Create_FailId()  
        {
            CreatingVehicleDutyDto request = new CreatingVehicleDutyDto(null, "nome", "#5f0092");
            
             BusinessRuleValidationException exception = new BusinessRuleValidationException("The code shouldn't be null");

            var mock = new Mock<IVehicleDutyService>();  
            var mockWorkBlock = new Mock<IWorkBlockService>();
            mock.Setup(service => service.AddAsync(It.IsAny<VehicleDutyDto>())).Throws(exception);  
            VehicleDutiesController controller = new VehicleDutiesController(mock.Object, mockWorkBlock.Object);

            var result = await controller.Create(request);

            mock.Verify(service => service.AddAsync(It.IsAny<VehicleDutyDto>()), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));

        }   

        [TestMethod]  
        public async Task Test_Create_FailNome()  
        {
            CreatingVehicleDutyDto request = new CreatingVehicleDutyDto("VehicleDuty:02", null , "#5f0092");
            
             BusinessRuleValidationException exception = new BusinessRuleValidationException("The name shouldn't be null");

            var mock = new Mock<IVehicleDutyService>();  
            var mockWorkBlock = new Mock<IWorkBlockService>();
            mock.Setup(service => service.AddAsync(It.IsAny<VehicleDutyDto>())).Throws(exception);  
            VehicleDutiesController controller = new VehicleDutiesController(mock.Object, mockWorkBlock.Object);

            var result = await controller.Create(request);

            mock.Verify(service => service.AddAsync(It.IsAny<VehicleDutyDto>()), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));

        }  

        [TestMethod]  
        public async Task Test_Create_FailColor()  
        {
            CreatingVehicleDutyDto request = new CreatingVehicleDutyDto("VehicleDuty:02", "nome", null);
            
             BusinessRuleValidationException exception = new BusinessRuleValidationException("The color shouldn't be null");

            var mock = new Mock<IVehicleDutyService>();  
            var mockWorkBlock = new Mock<IWorkBlockService>();
            mock.Setup(service => service.AddAsync(It.IsAny<VehicleDutyDto>())).Throws(exception);  
            VehicleDutiesController controller = new VehicleDutiesController(mock.Object, mockWorkBlock.Object);

            var result = await controller.Create(request);

            mock.Verify(service => service.AddAsync(It.IsAny<VehicleDutyDto>()), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));

        }  

    }  
}