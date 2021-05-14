import slugify from 'slugify'

const SmallWeapon = ({ weapon }) => (
  <div className="large-weapon">
    <img src={`/${slugify(weapon.name, { lower: true })}.webp`} />
    {weapon.name}
    <style jsx>{`
      .large-weapon {
        display: flex;
      }

      img {
        width: 2rem;
        height: 1rem;

        filter: grayscale(100%) contrast(0%) brightness(250%);

        margin-right: var(--padding);
      }
    `}</style>
  </div>
)

export default SmallWeapon
