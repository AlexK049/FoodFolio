import styles from "../static/css/star-rating.module.css"

/**
 * 
 * @param {number} value 1-5 depending on number of stars
 * @param {*} onChange callback for when the value changes which takes a value as a param
 * @param size the size of this element in pixels (multiplied by 5)
 * @param {boolean} readonly if true, there will be no hover effect, and the star rating cannot be changed, if false, the user can interact with the rating
 * @returns 
 */
const StarRating = ({ value, onChange, size, readonly }) => {
    const Star = ({ filled, onClick }) => {
        const starSymbol = filled ? '\u2605' : '\u2606';
        return <span className={`${styles.star}`} onClick={onClick} style={{ fontSize: `${size * 5}px` }}>{starSymbol}</span>;
    };

    const handleClick = (starIndex) => {
        if (onChange && !readonly) {
            onChange(starIndex + 1);
        }
    };

    return (
        <div>
            <div className={`${styles.starArea} ${readonly ? '' : styles.hoverableStarArea}`}>
                {
                    Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} filled={i + 1 <= value} onClick={() => handleClick(i)} />
                    ))
                }
            </div>
        </div>
    );
}

export default StarRating;