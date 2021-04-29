import { useState } from 'react'
import Link from 'next/link'

const Layout = ({ children }) => {
  const [crt, setCrt] = useState(true)

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/">
                <a>
                  <h1>get Drafted</h1>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/information">
                <a>Information</a>
              </Link>
            </li>
            <li>
              <Link href="/players">
                <a>Players</a>
              </Link>
            </li>
            <li>
              <Link href="/teams">
                <a>Teams</a>
              </Link>
            </li>
            <li>
              <Link href="/matches">
                <a>Matches</a>
              </Link>
            </li>
          </ul>
        </nav>
        <label>
          CRT
          <input type="checkbox" checked={crt} onChange={() => setCrt(!crt)} />
        </label>
      </header>
      <main className={crt && 'crt'}>{children}</main>
      <style jsx>{`
        header {
          padding: var(--padding);
          margin-bottom: var(--margin);
          border-bottom: var(--border);

          display: flex;
          justify-content: space-between;
        }

        nav > ul {
          display: flex;
          gap: var(--margin);
          align-items: baseline;
        }

        h1 {
          color: var(--accent-color);
        }

        main {
          max-width: 70rem;
          margin: auto;
        }

        /* CRT effect */
        main.crt::before {
          content: ' ';
          display: block;
          position: fixed;
          height: 100vh;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: linear-gradient(
              rgba(18, 16, 16, 0) 50%,
              rgba(0, 0, 0, 0.2) 50%
            ),
            linear-gradient(
              90deg,
              rgba(255, 0, 0, 0.06),
              rgba(0, 255, 0, 0.02),
              rgba(0, 0, 255, 0.06)
            );
          z-index: 2;
          background-size: 100% 2px, 3px 100%;
          pointer-events: none;
        }
      `}</style>
      <style>{`
        body {
            background: linear-gradient(to left, #0b0b2b, #210c1e);
            background-color: black;
            color: var(--text-color);

            font-family: Fira Code;

            --padding: 0.4rem;
            --accent-color: #7ddafe;
            --text-color: white;
            --margin: 2rem;
            --border-color: white;
            --border-width: 1px;
            --border: var(--border-color) var(--border-width) solid;
            --green: #07d674;
            --red: #ff4b2c;
        }

        label,
        [type='checkbox'] {
          cursor: pointer;
        }

        label {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: var(--padding);
        }

        @font-face {
          font-family: 'Fira Code';
          src: url('/woff2/FiraCode-Light.woff2') format('woff2'),
            url("/woff/FiraCode-Light.woff") format("woff");
          font-weight: 300;
          font-style: normal;
        }

        @font-face {
          font-family: 'Fira Code';
          src: url('/woff2/FiraCode-Regular.woff2') format('woff2'),
            url("/woff/FiraCode-Regular.woff") format("woff");
          font-weight: 400;
          font-style: normal;
        }

        @font-face {
          font-family: 'Fira Code';
          src: url('/woff2/FiraCode-Medium.woff2') format('woff2'),
            url("/woff/FiraCode-Medium.woff") format("woff");
          font-weight: 500;
          font-style: normal;
        }

        @font-face {
          font-family: 'Fira Code';
          src: url('/woff2/FiraCode-SemiBold.woff2') format('woff2'),
            url("/woff/FiraCode-SemiBold.woff") format("woff");
          font-weight: 600;
          font-style: normal;
        }

        @font-face {
          font-family: 'Fira Code';
          src: url('/woff2/FiraCode-Bold.woff2') format('woff2'),
            url("/woff/FiraCode-Bold.woff") format("woff");
          font-weight: 700;
          font-style: normal;
        }

        @font-face {
          font-family: 'Fira Code VF';
          src: url('/woff2/FiraCode-VF.woff2') format('woff2-variations'),
               url('/woff/FiraCode-VF.woff') format('woff-variations');
          /* font-weight requires a range: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide#Using_a_variable_font_font-face_changes */
          font-weight: 300 700;
          font-style: normal;
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
}

export default Layout
