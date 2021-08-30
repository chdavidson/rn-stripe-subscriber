import React from 'react'
import { CONSTANTS } from '../CONSTANTS';


const TierSelection = () => {

    return(
        <div className='tier-selection-container'>
            <ul className='tier-list'>
                <li className='tier-item'>
                        <button>£{CONSTANTS.SUBSCRIPTION_TIER_ONE}</button>
                </li>
                <li className='tier-item'>
                        <button>£{CONSTANTS.SUBSCRIPTION_TIER_TWO}</button>
                </li>    
                <li className='tier-item'>
                        <button>£{CONSTANTS.SUBSCRIPTION_TIER_THREE}</button>
                </li>
            </ul>
        </div>
    )
}

export default TierSelection;
