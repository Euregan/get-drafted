const Card = ({ children }) => (
    <div className="card">
        {children}
        <style jsx>{`
            .card {
                padding: var(--padding);
                border: white 1px solid;
            }
        `}</style>
    </div>
)

export default Card
