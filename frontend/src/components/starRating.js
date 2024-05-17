import styles from "../static/css/star-rating.module.css"

/**
 * 
 * @param {number} value 1-5 depending on number of stars
 * @param {*} onChange callback for when the value changes which takes a value as a param
 * @param {1 | 2 | 3 | 4 | 5 | 6} size the size of this element, the bigger the number the larger
 * @param {boolean} readonly if true, there will be no hover effect, and the star rating cannot be changed, if false, the user can interact with the rating
 * @returns 
 */
const StarRating = ({ value, onChange, size, readonly }) => {
    if (size < 1 || size > 6) {
        throw new Error("StarRating size must fall in the range of 1-6 (inclusive).");
    }

    const Star = ({ filled, onClick }) => {
        const starSymbol = filled ? '\u2605' : '\u2606';
        return <span className={`${styles.star} h${7 - size}`} onClick={onClick}>{starSymbol}</span>;
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