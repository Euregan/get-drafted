import { Page } from 'dystopia'

const NotFound = () => (
  <Page>
    <div>404</div>
    <style jsx>{`
      div {
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 20rem;
      }
    `}</style>
  </Page>
)

export default NotFound
