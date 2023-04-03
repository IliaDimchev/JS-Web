import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useService } from '../../hooks/useService';

import { gameServiceFactory } from '../../services/gameService';
import { commentServiceFactory } from '../../services/commentService';
import { AuthContext } from '../../contexts/AuthContext';

export const GameDetails = () => {
    const { userId } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setCommnets] = useState([]);
    const { gameId } = useParams();
    const [game, setGame] = useState({});
    const gameService = useService(gameServiceFactory);
    const commentService = useService(commentServiceFactory);
    const navigate = useNavigate();

    useEffect(() => {
        gameService.getOne(gameId)
            .then(result => {
                setGame(result);
                // return commentSevice.getAll(gameId);
            })
        // .then(result => {
        //     setCommnets(result);
        // });
    }, [gameId]);

    const onCommentSubmit = async (e) => {
        e.preventDefault();

        const result = await gameService.addComment(gameId, {
            username,
            comment
        });

        setGame(state => ({ ...state, comments: { ...state.comments, [result._id]: result } }));

        setUsername('');
        setComment('');
    };

    const isOwner = game._ownerId === userId;

    const onDeleteClick = async () => {
        await gameService.delete(game._id);

        navigate('/catalog');
    };

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">
                    {game.summary}
                </p>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {game.comments && Object.values(game.comments).map(comment => (
                            <li key={comment._id} className="comment">
                                <p>{comment.username}: {comment.comment}</p>
                            </li>
                        ))}
                    </ul>
                    {/* {!Object.values(game.comments).length && (
                        <p className="no-comment">No comments.</p>
                    )} */}
                </div>

                {isOwner && (
                    <div className="buttons">
                        <a href="#" className="button">Edit</a>
                        <button className="button" onClick={onDeleteClick}>Delete</button>
                    </div>
                )}
            </div>

            {/* <!-- Bonus --> */}
            {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={onCommentSubmit}>
                    <input type='text' name='username' placeholder='Username..' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <textarea name="comment" placeholder="Comment......" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>

        </section>
    );
};