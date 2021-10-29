using System;
using System.Collections.Generic;

namespace PlantLibrary.Models
{
    public class PlantCare
    {
        public int[] Period { get; set; } // Month from 1 to 12
        public DateTime LastActionDate { get; set; }
        public CareType CareType { get; set; }
        public Frequency Frequency { get; set; }

        public override bool Equals(object obj)
        {
            return obj is PlantCare care &&
                   EqualityComparer<int[]>.Default.Equals(Period, care.Period) &&
                   LastActionDate == care.LastActionDate &&
                   EqualityComparer<CareType>.Default.Equals(CareType, care.CareType) &&
                   EqualityComparer<Frequency>.Default.Equals(Frequency, care.Frequency);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Period, LastActionDate, CareType, Frequency);
        }
    }
}
