using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.AspNetCore.Mvc;
using Moq;    
using DDDSample1.Controllers;
using DDDSample1.Domain.Drivers;
using System.Threading.Tasks;
using System;
using DDDSample1.Domain.Shared;

namespace MDVTests  
{  
    [TestClass]  
    public class DriversControllerUnitTest  
    {  
        [TestMethod]  
        public async Task Test_Create_Success()  
        {
            string[] array = new string[] {"10"};
            CreatingDriverDto request = new CreatingDriverDto("Driver189", "Diogo", 977598543000, 11122239, 111222339, 933222111, 1640285718000, array, 1607796629000, 0);

            var mock = new Mock<IDriverService>();  
            mock.Setup(service => service.AddAsync(It.IsAny<DriverDto>())).Returns(Task.FromResult(DriverMapper.toDTO(request)));  
            DriversController controller = new DriversController(mock.Object);

            var result = await controller.Create(request);

            mock.Verify(service => service.AddAsync(It.IsAny<DriverDto>()), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(ActionResult));

        }

        [TestMethod]  
        public async Task Test_Create_Fail()  
        {
            string[] array = new string[] {"10"};

            //Mechanographic number is null
            CreatingDriverDto request = new CreatingDriverDto(null, "Diogo", 977598543000, 11122239, 111222339, 933222111, 1640285718000, array, 1607796629000, 0);

            BusinessRuleValidationException exception = new BusinessRuleValidationException("Mechanographic number shouldn't be null and have to match the criteria.");

            var mock = new Mock<IDriverService>();  
            mock.Setup(service => service.AddAsync(It.IsAny<DriverDto>())).Throws(exception);  
            DriversController controller = new DriversController(mock.Object);

            var result = await controller.Create(request);

            mock.Verify(service => service.AddAsync(It.IsAny<DriverDto>()), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));

        }   

    }  
}