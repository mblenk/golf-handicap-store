import './LandingPage.css'
import Navbar from '../../components/Navbar';

export default function LandingPage() {
  return (
    <div className="background">
        <Navbar />
        <div className="landing-content">
            <h2>Welcome to Handicap Store!</h2>
            <h3>A free tool to calculate your handicap and track your progress.</h3>
            <p>To create a free account, please click the Sign Up button in the top right hand corner.</p>
            <p>If you do not wish to create a free account and want a one-off handicap calculation, please visit the link below: </p>
            <p>Link</p>
        </div>
    </div>
  )
}
