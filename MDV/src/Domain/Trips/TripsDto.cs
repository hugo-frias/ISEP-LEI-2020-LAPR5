using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.Trips
{
    public class TripsDto
    {
        public string Id { get; private set;  }

        public int NrViagens {get; private set;}

        public int Frequence {get;private set;}
        
        public string Line { get; private set; }
    
        public string PathIda { get; private set; }

        public string PathVolta { get; private set; }
        
        public DateTime Time { get; private set; }
        
        public int InParalell {get; private set;}
        
        public TripsDto(int nrViagens, int frequence, string line, string pathIda, string pathVolta, DateTime time, int paralell)
        {
            this.NrViagens = nrViagens;
            this.Frequence = frequence;
            this.Line = line;
            this.PathIda = pathIda;
            this.PathVolta = pathVolta;
            this.Time = time;
            this.InParalell = paralell;
        }
    }
}