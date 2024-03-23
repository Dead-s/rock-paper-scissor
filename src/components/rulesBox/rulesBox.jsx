import React from 'react'
import rulesStyles from "./rulesBox.module.scss";

const RulesBox = ({ showRules, setrules }) => {
    return (
        showRules &&
        <div className={rulesStyles.container}>
            <div className={rulesStyles.rulesBox}>
                <div className={rulesStyles.header}>
                    <span>Rules</span>
                    <svg onClick={() => setrules(false)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18.5 5.53271L5 19.0327" stroke="black" strokeWidth="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M18.5 19.0327L5 5.53271" stroke="black" strokeWidth="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <img src="./assets/images/image-rules-bonus.svg" alt="" />
            </div>

        </div>
    )
}

export default RulesBox