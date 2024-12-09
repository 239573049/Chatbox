namespace Chatbox.Model
{
    public class BaseDataModel
    {
        [Obsolete("This field is deprecated.")]
        public long? CreateAt { get; set; }

        public long CreatedAt { get; set; }

        public string Id { get; set; }

        public MetaData Meta { get; set; }

        [Obsolete("This field is deprecated.")]
        public long? UpdateAt { get; set; }

        public long UpdatedAt { get; set; }
    }

    public class MetaData
    {
        public string? Avatar { get; set; }
        public string? Name { get; set; }
    }
}