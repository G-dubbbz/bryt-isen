import { useState } from "react";
import "./Review.css";

const Review = ({stars, creator, text} : {stars: number, creator: string, text: string}) => {
    const [showFullDesc, setShowFullDesc] = useState(false);

    const toggleShowFullDesc = () => {
        setShowFullDesc(!showFullDesc);
    }

    return (
        <div className="reviewDiv">
            <h1>Stars * * * *</h1>
            <h2>User said:</h2>
            {showFullDesc ? (
                <div>
                    {text}
                    <button onClick={toggleShowFullDesc}>Show less</button>
                </div>
            ) : (
                <div>
                    {text.length > 20 ? `${text.slice(0, 20)}...` : text}
                    {text.length > 20 && <button onClick={toggleShowFullDesc}>Show more</button>}
                </div>
            )
            }
        </div>
    );
}

export default Review;