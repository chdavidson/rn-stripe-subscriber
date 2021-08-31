import React from 'react'
import { CONSTANTS } from '../CONSTANTS';


const TierSelection = ({handleChange}) => {

    return(
        <div className='tier-selection-container'>
            <ul className='tier-list'>
                <li className='tier-item'>
                        <button name='stripe_product' value={CONSTANTS.SUBSCRIPTION_TIER_ONE.stripe_product} onClick={handleChange}>
                            £{CONSTANTS.SUBSCRIPTION_TIER_ONE.price+'/'+CONSTANTS.SUBSCRIPTION_TIER_ONE.increment}
                        </button>
                </li>
                <li className='tier-item'>
                        <button value={CONSTANTS.SUBSCRIPTION_TIER_TWO.stripe_product} name='stripe_product' onClick={handleChange}>
                            £{CONSTANTS.SUBSCRIPTION_TIER_TWO.price+'/'+CONSTANTS.SUBSCRIPTION_TIER_TWO.increment}
                        </button>
                </li>    
                <li className='tier-item'>
                        <button value={CONSTANTS.SUBSCRIPTION_TIER_THREE.stripe_product} name='stripe_product' onClick={handleChange}>
                            £{CONSTANTS.SUBSCRIPTION_TIER_THREE.price+'/'+CONSTANTS.SUBSCRIPTION_TIER_THREE.increment}
                        </button>
                </li>
            </ul>
        </div>
    )
}

export default TierSelection;
