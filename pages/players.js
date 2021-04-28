import { useState } from 'react'
import Layout from '../components/Layout'
import Card from '../components/Card'

const Players = ({ players }) => {
    const [nameFilter, setNameFilter] = useState('')

    return (
        <Layout>
            <div className="players-page">
                <aside>
                    <input
                        type="text"
                        value={nameFilter}
                        onChange={event => setNameFilter(event.target.value)}
                    />
                </aside>
                <section>
                    <ul className="players">
                        {players
                            .filter(
                                player =>
                                    nameFilter === '' ||
                                    player.fields.name
                                        .toLowerCase()
                                        .includes(nameFilter.toLowerCase())
                            )
                            .map(player => (
                                <li key={player.id}>
                                    <Card>
                                        {player.fields.avatar && (
                                            <img
                                                src={`https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ff/${player.fields.avatar}_medium.jpg`}
                                            />
                                        )}
                                        <h3>{player.fields.name}</h3>
                                    </Card>
                                </li>
                            ))}
                    </ul>
                </section>
                <style jsx>{`
                    .players-page {
                        display: flex;
                        gap: var(--margin);
                    }

                    section {
                        flex-grow: 1;
                    }

                    .players {
                        display: flex;
                        flex-direction: column;
                        align-items: stretch;
                        gap: var(--margin);
                    }

                    aside {
                    }
                `}</style>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const res = await fetch(
        `https://api.airtable.com/v0/${process.env.DATABASE_ID}/players`,
        {
            headers: {
                Authorization: `Bearer ${process.env.DATABASE_AUTH_TOKEN}`
            }
        }
    )
    const players = await res.json()

    return {
        props: {
            players: players.records
        }
    }
}

export default Players
