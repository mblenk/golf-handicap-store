import React, { useState } from 'react'
import expand_more from '../../assets/expand_more.svg'
import expand_less from '../../assets/expand_less.svg'
import delete_icon from '../../assets/delete_icon.svg'
import pending_icon from '../../assets/pending_icon.svg'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useDeleteScore } from '../../hooks/useDeleteScore'
import { useNavigate } from 'react-router-dom'

export default function DataSets({ scores, lastTwenty, counting, handicapData }) {
    const [showHandicap, setShowHandicap] = useState(false)
    const [showScores, setShowScores] = useState(false)
    const [showLastTwentyScores, setShowLastTwentyScores] = useState(false)
    const [showCounting, setShowCounting] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const { user } = useAuthContext()
    const { deleteScore } = useDeleteScore()
    const navigate = useNavigate()

    const handleClick = async (round_id) => {
        setIsPending(true)

        await deleteScore(scores, handicapData, round_id, user._id)

        setIsPending(false)
        navigate(0)
    }

  return (
    <>
        <div className="handicap-block">
            <h2>Last 20 Scores</h2>
            { !showLastTwentyScores && <img 
                src={expand_more} 
                alt="Show more detail icon" 
                onClick={() => setShowLastTwentyScores(true)}
                id="expand"
            />}
            { showLastTwentyScores && <img 
                src={expand_less} 
                alt="Show less detail icon" 
                onClick={() => setShowLastTwentyScores(false)
                }
                id="expand-less"
            />}
            <div className='cards'>
                { showLastTwentyScores && lastTwenty.map(item => (
                    <div className="history-card" key={Math.random() * 10000000}>
                        <div>
                            <p>Date</p>
                            <h4>{item.date}</h4>
                        </div>
                        <div>
                            <p>Score</p>
                            <h4>{item.score}</h4>
                        </div>
                    </div>
                    ))
                }
            </div>
        </div>
        <div className="handicap-block">
            <h2>Counting Scores</h2>
            { !showCounting && <img 
                src={expand_more} 
                alt="Show more detail icon" 
                onClick={() => setShowCounting(true)}
                id="expand"
            />}
            { showCounting && <img 
                src={expand_less} 
                alt="Show less detail icon" 
                onClick={() => setShowCounting(false)
                }
                id="expand-less"
            />}
            <div className='cards'>
                { showCounting && counting.map(item => (
                    <React.Fragment key={Math.random() * 10000000}>
                        { item.combined && 
                        <>
                             <div className="history-card" key={Math.random() * 10000000}>
                                <div>
                                    <p>Date</p>
                                    <h4>{item.roundOne.date}</h4>
                                </div>
                                <div>
                                    <p>Score</p>
                                    <h4>{item.roundOne.score}</h4>
                                </div>
                            </div>
                            <div className="history-card" key={Math.random() * 10000000}>
                                <div>
                                    <p>Date</p>
                                    <h4>{item.roundTwo.date}</h4>
                                </div>
                                <div>
                                    <p>Score</p>
                                    <h4>{item.roundTwo.score}</h4>
                                </div>
                            </div>
                        </>
                        }
                        { !item.combined && 
                            <div className="history-card" key={Math.random() * 10000000}>
                                <div>
                                    <p>Date</p>
                                    <h4>{item.date}</h4>
                                </div>
                                <div>
                                    <p>Score</p>
                                    <h4>{item.score}</h4>
                                </div>
                            </div>
                        }
                        
                    </React.Fragment>
                ))
                }
            </div>
        </div>
        <div className="handicap-block">
            <h2>Handicap History</h2>
            { !showHandicap && <img 
                src={expand_more} 
                alt="Show more detail icon" 
                onClick={() => setShowHandicap(true)}
                id="expand"
            />}
            { showHandicap && <img 
                src={expand_less} 
                alt="Show less detail icon" 
                onClick={() => setShowHandicap(false)
                }
                id="expand-less"
            />}
            <div className='cards'>
                { showHandicap && handicapData.map(item => (
                    <div className="history-card" key={Math.random() * 10000000}>
                    <div>
                        <p>Date</p>
                        <h4>{item.roundData.date}</h4>
                    </div>
                    <div>
                        <p>New Index</p>
                        <h4>{item.newIndex}</h4>
                    </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="handicap-block">
            <h2>Scores History</h2>
            { !showScores && <img 
                src={expand_more} 
                alt="Show more detail icon" 
                onClick={() => setShowScores(true)}
                id="expand"
            />}
            { showScores && <img 
                src={expand_less} 
                alt="Show less detail icon" 
                onClick={() => setShowScores(false)
                }
                id="expand-less"
            />}
            <div className='cards'>
                { showScores && scores.map(item => (
                    <div className="history-card" key={Math.random() * 10000000}>
                        <div>
                            <p>Date</p>
                            <h4>{item.date}</h4>
                        </div>
                        <div>
                            <p>Score</p>
                            <h4>{item.score}</h4>
                        </div>
                        { !isPending && <img 
                            src={delete_icon} 
                            alt="Delete Icon"
                            onClick={() => handleClick(item.round_id)} 
                        />}
                        { isPending && <img 
                            src={pending_icon} 
                            alt="Pending Icon" 
                        />}
                    </div>
                    ))
                }
            </div>
        </div>
    </>

  )
}
