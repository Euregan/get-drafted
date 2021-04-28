import Link from 'next/link'

const Layout = ({ children }) => (
    <>
        <header>
            <nav>
                <ul>
                    <li>
                        <Link href="/">
                            <a>
                                <h1>Get Drafted</h1>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/players">
                            <a>Players</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
        <main>{children}</main>
        <style jsx>{`
            nav > ul {
                display: flex;
            }

            h1 {
                color: var(--accent-color);
            }
        `}</style>
        <style>{`
        body {
            background: linear-gradient(to left, #0b0b2b, #210c1e);
            background-color: black;
            color: var(--text-color);

            font-family: sans-serif;

            --padding: 1rem;
            --accent-color: #7ddafe;
            --text-color: white;
            --margin: 2rem;
        }

        body, ul, h1, h2, h3, h4, h5, h6, p {
            margin: 0;
            padding: 0;
        }

        ul {
            list-style: none;
        }

        a {
            text-decoration: none;
            color: var(--text-color);
        }
    `}</style>
    </>
)

export default Layout
