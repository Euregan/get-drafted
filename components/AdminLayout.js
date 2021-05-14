import Link from 'next/link'
import { Card } from 'dystopia'
import Layout from './Layout'

const AdminLayout = ({ title, children }) => (
  <Layout>
    <div className="admin-layout">
      <aside>
        <Card>
          <nav>
            <Link href="/admin">
              <a>Dashboard</a>
            </Link>
            <Link href="/admin/competitions">
              <a>Competitions</a>
            </Link>
            <h3>Airtable</h3>
            <Link href="/admin/airtable/players">
              <a>Players</a>
            </Link>
          </nav>
        </Card>
      </aside>
      <section>
        {title && <h2>{title}</h2>}
        {children}
      </section>
    </div>
    <style jsx>{`
      h2 {
        margin-bottom: var(--margin);
      }

      .admin-layout {
        display: flex;
        gap: var(--margin);
      }

      nav {
        display: flex;
        flex-direction: column;
        gap: var(--padding);
      }

      aside {
        min-width: 12rem;
      }

      section {
        flex-grow: 1;
      }
    `}</style>
  </Layout>
)

export default AdminLayout
