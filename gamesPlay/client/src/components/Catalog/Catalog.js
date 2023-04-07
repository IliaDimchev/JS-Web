import { useGameContext } from "../../contexts/GameContext";
import { CatalogItem } from "./CatalogItem/CatalogItem";

export const Catalog = () => {
    const {games} = useGameContext();
    
    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            
            {games.map(game => <CatalogItem key={game._id} {...game} />)};

            {games.length === 0 && (
                <h3 className="no-articles">No articles yet</h3>
            )};
        </section>
    );
};