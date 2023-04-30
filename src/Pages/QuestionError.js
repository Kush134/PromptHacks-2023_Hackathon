import React from 'react'
import qError from '../Assets/qError.svg'
import { Link } from 'react-router-dom'
import './Common.css'

const QuestionError = () => {
    return (
        <div className="qerror-page ">
            <div>
                <img src={qError} alt="LeetCoach" />
            </div>
            <div>
                <h3>Hmm, I can't see the question</h3>
                <h4>This could be possibly because:</h4>
                <ul>
                    <li>The page selected doesn't have the problem visible. For example you might have the solution/editorial tab open. Going back to the problem tab and reopening the extension should work</li>
                    <li>The extension was opened before the page fully loaded. Just close and open the extension</li>
                    <li>You are in a live contest. We do not endorse cheating in any manner</li>
                </ul>
                <p>If the probem still persists, please submit an issue <Link to="">here</Link> </p>
            </div>
        </div>
    )
}

export default QuestionError