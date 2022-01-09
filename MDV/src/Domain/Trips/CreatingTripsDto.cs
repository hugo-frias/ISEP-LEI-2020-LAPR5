using System;

namespace DDDSample1.Domain.Trips
{
    public class CreatingTripsDto
    {
        public int NrViagens {get; private set;}

         public string Line { get; private set; }

         public long Time { get; private set; }

        public int Frequence {get;private set;}

        public string PathIda{get;private set;}

        public string PathVolta {get;private set;}

        public int InParalell {get;private set;}

        public CreatingTripsDto(int nrViagens, int frequence, long time, string line, string pathIda, string pathVolta, int inParalell){
            this.NrViagens = nrViagens;
            this.Frequence = frequence;
            this.Time = time;
            this.Line = line;
            this.PathIda = pathIda;
            this.PathVolta = pathVolta;
            this.InParalell = inParalell;
        }
    }
}