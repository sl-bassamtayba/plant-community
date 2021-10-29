using PlantLibrary.Enums;
using SharedLibrary.Database;
using System;
using System.Collections.Generic;

namespace PlantLibrary.Models
{
    [BsonCollection("Question")]
    public class Question : Document
    {
        public QuestionType Type { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public bool IsClosed { get; set; } // Default : false
        public List<Reply> Replies { get; set; }

        // PICTURES
        public List<Picture> Pictures { get; set; }

        //RELATIONS
        public User User { get; set; }
        public Plant Plant { get; set; }

    }


}
