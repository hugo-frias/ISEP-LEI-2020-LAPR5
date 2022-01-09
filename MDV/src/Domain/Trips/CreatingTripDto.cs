using System;

namespace DDDSample1.Domain.Trips
{
    public class CreatingTripDto
    {

        public string Code { get; private set; }
        public string Orientation { get; private set; }
        
        public string Line { get; private set; }
    
        public string Path { get; private set; }
        
        public long Time { get; private set; }

        public CreatingTripDto(string code, string orientation, string line, string path, long time)
        {
            this.Code = code;
            this.Orientation = orientation;
            this.Line = line;
            this.Path = path;
            this.Time = time;
        }
    }
}