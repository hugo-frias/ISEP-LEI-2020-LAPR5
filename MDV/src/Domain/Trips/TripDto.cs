using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.Trips
{
    public class TripDto
    {
        public string Id { get; private set;  }
        
        public string Code { get; private set; }
        
        public string Orientation { get; private set; }
        
        public string Line { get; private set; }
    
        public string Path { get; private set; }
        
        public DateTime Time { get; private set; }

        public bool IsGenerated { get; private set; }
        
        public bool IsEmpty { get; private set; }
        
        public TripDto(string code, string orientation, string line, string path, DateTime time)
        {
            this.Code = code;
            this.Orientation = orientation;
            this.Line = line;
            this.Path = path;
            this.Time = time;
        }
        
        public TripDto(string orientation, string line, string path, DateTime time)
        {
            this.Orientation = orientation;
            this.Line = line;
            this.Path = path;
            this.Time = time;
        }
        
        public TripDto (string id, string code, string orientation, string line, string path, DateTime time)
        {
            this.Id = id;
            this.Code = code;
            this.Orientation = orientation;
            this.Line = line;
            this.Path = path;
            this.Time = time;
        }
    }
}