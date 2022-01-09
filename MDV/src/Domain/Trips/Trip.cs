using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Trips
{
    public class Trip : Entity<TripId>, IAggregateRoot
    {
        
        public string Code { get; private set; }
        
        public string Orientation { get; private set; }
        
        public string Line { get; private set; }
    
        public string Path { get; private set; }
        
        public DateTime Time { get; private set; }
        private bool Active { get; set; }

        private Trip()
        {
            this.Active = true;
        }
        
        public Trip (string code, string orientation, string line, string path, DateTime time)
        {
            this.Active = true;
            
            this.Id = new TripId(Guid.NewGuid());

            if (code == null || orientation == null || line == null || path == null)
            {
                throw new BusinessRuleValidationException("You can't insert a new trip with null values.");
            }

            this.Code = code;
            this.Orientation = orientation;
            this.Line = line;
            this.Path = path;
            VerifyIfDateIsSuperiorThanActual(time, "Leaving hour shouldn't be null and should be greater than the actual date.");
            this.Time = time;
            
            if (this.Active)
            {
                this.Active = false;
            }
            
        }

        private static void VerifyIfDateIsSuperiorThanActual(DateTime date, string message)
        {
            if (DateTime.Compare(date, DateTime.Now) <= 0)
                throw new BusinessRuleValidationException(message);
        }
        
    }
}