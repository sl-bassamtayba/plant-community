using System;
using System.Text.Json.Serialization;

namespace PlantLibrary.Models
{
    public class Reply
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public User User { get; set; }
    }
}
