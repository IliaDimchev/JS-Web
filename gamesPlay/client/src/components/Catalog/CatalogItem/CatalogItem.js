export const CatalogItem = ({
    name,
    imageUrl,
    genre   
}) => {
    return (
        <div className="allGames">
            <div className="allGames-info">
                <img src={imageUrl} />
                <h6>{genre}</h6>
                <h2>{name}</h2>
                <a href="#" className="details-button">Details</a>
            </div>
        </div>
    );
};