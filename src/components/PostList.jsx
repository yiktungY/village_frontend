import Post from "./Post";

const PostList = ({ selectedJobList, searchValue }) => {
  const filteredbyTitleData = selectedJobList.filter((result) => {
    if (searchValue.title === "") {
      return result;
    }
    const input = searchValue.title.toLowerCase().replace(/\s+/g, "");
    return result.title.toLowerCase().replace(/\s+/g, "").indexOf(input) !== -1;
  });

  return (
    <div>
      {filteredbyTitleData.map((post) => (
        <Post key={post.post_id} {...post} />
      ))}
    </div>
  );
};

export default PostList;
