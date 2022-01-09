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
    public class DriverServiceUnitTest
    {  
        [TestMethod]  
        public async Task Test_Create_Success()  
        {
            string[] array = new string[] {"10"};
            CreatingDriverDto request = new CreatingDriverDto("Driver189", "Diogo", 977598543000, 11122239, 111222339, 933222111, 1640285718000, array, 1607796629000, 0);

            DriverDto driverDto = DriverMapper.toDTO(request);
            Driver driver = DriverMapper.toDomain(driverDto);

            var mockRepo = new Mock<IDriverRepository>();  
            mockRepo.Setup(repo => repo.AddAsync(It.IsAny<Driver>())).Returns(Task.FromResult(driver));

            var mockUnitOfWork = new Mock<IUnitOfWork>();
            
            DriverService service = new DriverService(mockUnitOfWork.Object, mockRepo.Object);

            var result = await service.AddAsync(driverDto);

            mockRepo.Verify(repo => repo.AddAsync(It.IsAny<Driver>()), Times.AtLeastOnce());
            mockUnitOfWork.Verify(unitOfWork => unitOfWork.CommitAsync(), Times.AtLeastOnce());

            Assert.IsInstanceOfType(result, typeof(DriverDto));

        }

        [TestMethod]  
        public async Task Test_Create_Fail()  
        {
            string[] array = new string[] {"10"};
            CreatingDriverDto request = new CreatingDriverDto("Driver189", "Diogo", 977598543000, 11122239, 111222339, 933222111, 1640285718000, array, 1607796629000, 0);

            DriverDto driverDto = DriverMapper.toDTO(request);
            Driver driver = DriverMapper.toDomain(driverDto);

            Exception exception = new Exception("Error");

            var mockRepo = new Mock<IDriverRepository>();  
            mockRepo.Setup(repo => repo.AddAsync(It.IsAny<Driver>())).Throws(exception);

            var mockUnitOfWork = new Mock<IUnitOfWork>();
            mockUnitOfWork.Setup(unitOfWork => unitOfWork.CommitAsync()).Returns(Task.FromResult(1)); 
            DriverService service = new DriverService(mockUnitOfWork.Object, mockRepo.Object);

            await Assert.ThrowsExceptionAsync<Exception>(async () => await service.AddAsync(driverDto));

            mockRepo.Verify(repo => repo.AddAsync(It.IsAny<Driver>()), Times.AtLeastOnce());
            mockUnitOfWork.Verify(unitOfWork => unitOfWork.CommitAsync(), Times.Never());

        }   

    }  
}