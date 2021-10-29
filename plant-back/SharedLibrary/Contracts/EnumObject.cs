using shared_library.Enums;
using System.Collections.Generic;

namespace SharedLibrary.Contracts
{
    public abstract class EnumObject
    {
        public int ID { get; set; }
        public Dictionary<Langage, string> Labels { get; set; }
        public string EnglishLabel => Labels.ContainsKey(Langage.EN) ? Labels.GetValueOrDefault(Langage.EN) : null;
        public string FrenchLabel => Labels.ContainsKey(Langage.FR) ? Labels.GetValueOrDefault(Langage.FR) : null;
    }
}
