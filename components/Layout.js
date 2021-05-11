import Link from 'next/link'
import { Page, Crt } from 'dystopia'

const Layout = ({ children }) => (
  <Page
    menu={[
      <Link href="/">
        <a>
          <h1>get Drafted</h1>
        </a>
      </Link>,
      <Link href="/information">
        <a>Information</a>
      </Link>,
      <Link href="/players">
        <a>Players</a>
      </Link>,
      <Link href="/teams">
        <a>Teams</a>
      </Link>,
      <Link href="/matches">
        <a>Matches</a>
      </Link>,
    ]}
    actions={[<Crt init={true} />]}
  >
    {children}
  </Page>
)

export default Layout
