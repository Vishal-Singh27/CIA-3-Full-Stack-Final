export default function FullPost(props) {
    return (
        <div className="card lg:card-side bg-base-100 ">
            <figure>
                <img src={props.data.picture} alt="Post Image" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{props.data.title}</h2>
                <p>{data.description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Listen</button>
                </div>
            </div>
        </div>
    )
}
