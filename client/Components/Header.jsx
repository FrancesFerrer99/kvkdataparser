import { Link } from "react-router-dom"

export default function Header() {

    return (
        <header className="header">
            <Link to='/'><h1>KvK Data Visualizer</h1></Link>
            <Link to='/leaderboard'>Leaderboards</Link>
        </header>
    )
}