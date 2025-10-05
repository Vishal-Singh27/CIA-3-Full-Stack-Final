import { useNavigate } from "react-router";

export function Post({ data }) {
  let navigate = useNavigate();

  return (
    <div
      className="hover:cursor-pointer h-fit"
      onClick={() => navigate(`/post/${data._id}`)}
    >
      <div className="">
        {/* Image: 60% */}
        <figure className="">
          <img
            src={data.picture}
            alt="Post"
            className="h-40 w-60 object-cover rounded-xl"
          />
        </figure>

        {/* Text: 40% */}
        <div className="">
          <h2 className="text-md font-bold mb-1 text-white">{data.title}</h2>
          <hr className="border-gray-400 mb-1" />
          <p className="text-gray-200 text-sm line-clamp-5">{data.description}</p>
        </div>
      </div>
    </div>
  );
}
